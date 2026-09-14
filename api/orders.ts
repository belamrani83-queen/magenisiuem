// Vercel Serverless Function for /api/orders
// Automatically executed by Vercel when deployed

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', message: 'Vercel Orders API is online' });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const {
        fullName,
        phone,
        city,
        address,
        packageId,
        packageName,
        totalPrice,
        quantity,
        notes
      } = body;

      const orderNumber = 'MG-' + Math.floor(100000 + Math.random() * 900000);
      const createdAt = new Date().toISOString();

      const order = {
        id: 'ord_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        orderNumber,
        createdAt,
        fullName: fullName || 'زبون',
        phone: phone || '',
        city: city || '',
        address: address || '',
        packageId: packageId || 'pack-1',
        packageName: packageName || 'باقة مكمل المغنيسيوم',
        price: Number(totalPrice) || 0,
        quantity: Number(quantity) || 1,
        status: 'new',
        notes: notes || '',
        syncedToSheets: false
      };

      // Default or configured Google Sheets Webhook URL
      const webhookUrl =
        process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
        'https://script.google.com/macros/s/AKfycbxOCDjnPVnOPFR3efvxU_5fT6prKjBsjGyF1RVV4vJP7KiQDNV1e7PHRf3prOKYA9Ip/exec';

      let syncedToSheets = false;
      if (webhookUrl && webhookUrl.startsWith('https://script.google.com')) {
        try {
          const sheetPayload = {
            orderId: order.orderNumber,
            date: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' }),
            fullName: order.fullName,
            phone: order.phone,
            city: order.city,
            address: order.address,
            packageName: order.packageName,
            price: `${order.price} DH`,
            quantity: order.quantity,
            status: 'جديد (New)',
            notes: order.notes || ''
          };

          const sheetRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sheetPayload),
            redirect: 'follow',
          });

          if (sheetRes.ok) {
            const text = await sheetRes.text();
            if (!text.includes('<!DOCTYPE') && !text.includes('<html')) {
              syncedToSheets = true;
            }
          }
        } catch (sheetErr) {
          console.error('[Vercel Serverless] Google Sheets sync failed:', sheetErr);
        }
      }

      return res.status(200).json({
        success: true,
        orderId: order.orderNumber,
        order: {
          ...order,
          syncedToSheets
        },
        message: 'تم تسجيل طلبك بنجاح! سيتصل بك فريقنا لتأكيد العنوان وموعد التوصيل بالمجان.'
      });
    } catch (err: any) {
      console.error('[Vercel Serverless Error]:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Server error processing order'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
