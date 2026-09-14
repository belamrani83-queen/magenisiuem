export interface SheetFileItem {
  id: string;
  name: string;
  webViewLink?: string;
  modifiedTime?: string;
}

export interface OrderRowData {
  orderNumber: string;
  createdAt: string;
  fullName: string;
  phone: string;
  city: string;
  address?: string;
  packageName: string;
  quantity?: number;
  price: number;
  status: string;
  notes?: string;
}

const STATUS_LABELS: Record<string, string> = {
  new: 'جديد (قيد التأكيد)',
  confirmed: 'مؤكد من الزبون',
  shipped: 'قيد التوصيل (مع الموزع)',
  delivered: 'تم التسليم وقبض المبلغ',
  cancelled: 'ملغي / لم يجب',
};

export const SHEET_HEADERS = [
  'رقم الطلب',
  'تاريخ ووقت الطلب',
  'اسم الزبون الكامل',
  'رقم الهاتف',
  'المدينة',
  'العنوان بالتفصيل',
  'العرض / الباقة',
  'الكمية',
  'المبلغ الإجمالي (درهم)',
  'حالة الطلب',
  'ملاحظات إضافية',
];

/**
 * Creates a new Google Sheets spreadsheet with pre-formatted headers
 */
export async function createOrdersSpreadsheet(
  accessToken: string,
  customTitle?: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  const title = customTitle || `طلبيات مكمل المغنيسيوم 2150mg - ${new Date().toLocaleDateString('fr-FR')}`;

  const requestBody = {
    properties: {
      title,
      locale: 'ar',
      autoRecalc: 'ON_CHANGE',
    },
    sheets: [
      {
        properties: {
          title: 'الطلبيات المستلمة',
          gridProperties: {
            frozenRowCount: 1,
            columnCount: 15,
          },
          rightToLeft: true,
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: SHEET_HEADERS.map((header) => ({
                  userEnteredValue: { stringValue: header },
                  userEnteredFormat: {
                    backgroundColor: { red: 0.05, green: 0.45, blue: 0.28 }, // Dark emerald #0d7347
                    textFormat: {
                      bold: true,
                      foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                      fontSize: 11,
                    },
                    horizontalAlignment: 'CENTER',
                  },
                })),
              },
            ],
          },
        ],
      },
    ],
  };

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`تعذر إنشاء جدول Google Sheets: ${errText}`);
  }

  const result = await response.json();
  const spreadsheetId = result.spreadsheetId;
  const spreadsheetUrl = result.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  return { spreadsheetId, spreadsheetUrl };
}

/**
 * Lists user's Google Sheets spreadsheets from Google Drive
 */
export async function listUserSpreadsheets(accessToken: string): Promise<SheetFileItem[]> {
  const url =
    "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet' and trashed=false&orderBy=modifiedTime desc&pageSize=20&fields=files(id,name,webViewLink,modifiedTime)";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`تعذر قراءة ملفات Google Drive: ${err}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Reads existing order IDs from a spreadsheet to avoid duplicates
 */
export async function getExistingOrderIdsInSheet(
  accessToken: string,
  spreadsheetId: string
): Promise<Set<string>> {
  try {
    const encodedRange = encodeURIComponent('A:A');
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!response.ok) return new Set();

    const data = await response.json();
    const rows = data.values || [];
    const ids = new Set<string>();

    for (let i = 1; i < rows.length; i++) {
      const cell = rows[i]?.[0];
      if (cell) ids.add(String(cell).trim());
    }

    return ids;
  } catch {
    return new Set();
  }
}

/**
 * Appends a list of orders to the specified spreadsheet
 */
export async function appendOrdersToGoogleSheet(
  accessToken: string,
  spreadsheetId: string,
  orders: OrderRowData[]
): Promise<{ addedCount: number }> {
  if (orders.length === 0) return { addedCount: 0 };

  // 1. Fetch existing order numbers to prevent duplicates
  const existingIds = await getExistingOrderIdsInSheet(accessToken, spreadsheetId);
  const newOrdersToAdd = orders.filter((o) => !existingIds.has(o.orderNumber));

  if (newOrdersToAdd.length === 0) {
    return { addedCount: 0 };
  }

  // 2. Format rows
  const rows = newOrdersToAdd.map((order) => {
    const dateFormatted = new Date(order.createdAt).toLocaleString('fr-FR', {
      timeZone: 'Africa/Casablanca',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return [
      order.orderNumber,
      dateFormatted,
      order.fullName,
      order.phone,
      order.city,
      order.address || 'غير محدد',
      order.packageName,
      order.quantity || 1,
      `${order.price} DH`,
      STATUS_LABELS[order.status] || order.status,
      order.notes || '',
    ];
  });

  const range = encodeURIComponent('A1');
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: rows,
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`فشل إرسال الطلبيات إلى Google Sheets: ${errText}`);
  }

  return { addedCount: newOrdersToAdd.length };
}
