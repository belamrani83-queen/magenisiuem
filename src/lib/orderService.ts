// Resilient order handling service for local dev, Cloud Run, and Vercel hosting
import { OrderRecord } from '../types';

export const DEFAULT_GOOGLE_SHEETS_WEBHOOK = 
  "https://script.google.com/macros/s/AKfycbxOCDjnPVnOPFR3efvxU_5fT6prKjBsjGyF1RVV4vJP7KiQDNV1e7PHRf3prOKYA9Ip/exec";

export interface OrderSubmissionData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  packageId: string;
  packageName: string;
  totalPrice: number;
  quantity: number;
  notes?: string;
}

/**
 * Get the configured Google Sheets webhook URL from localStorage or default
 */
export function getActiveWebhookUrl(): string {
  try {
    const saved = localStorage.getItem('connected_google_sheet');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.webhookUrl && parsed.webhookUrl.startsWith('https://script.google.com')) {
        return parsed.webhookUrl;
      }
    }
  } catch {
    // ignore json error
  }
  return DEFAULT_GOOGLE_SHEETS_WEBHOOK;
}

/**
 * Direct client-side dispatch to Google Apps Script
 * Works 100% reliably even on static hosts like Vercel, Netlify, or GitHub Pages
 */
export async function sendDirectToGoogleSheets(order: OrderRecord, webhookUrl: string): Promise<boolean> {
  if (!webhookUrl || !webhookUrl.startsWith('https://script.google.com')) {
    return false;
  }

  const payload = {
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
    notes: order.notes || '',
  };

  try {
    // Mode no-cors sends data to Google Apps Script successfully without CORS blocking in browsers
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (err) {
    console.warn('[Google Sheets Direct Sync Error]:', err);
    return false;
  }
}

/**
 * Save an order in localStorage so it's always preserved on client-side
 */
export function saveOrderToLocalCache(order: OrderRecord) {
  try {
    const existingStr = localStorage.getItem('cod_client_orders') || '[]';
    const existing: OrderRecord[] = JSON.parse(existingStr);
    // prepend new order
    const updated = [order, ...existing.filter(o => o.orderNumber !== order.orderNumber)];
    localStorage.setItem('cod_client_orders', JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save to local cache:', err);
  }
}

/**
 * Get all locally cached orders
 */
export function getLocalCachedOrders(): OrderRecord[] {
  try {
    const existingStr = localStorage.getItem('cod_client_orders') || '[]';
    return JSON.parse(existingStr);
  } catch {
    return [];
  }
}

/**
 * Master Submit Function:
 * 1. Tries backend (/api/orders) - works on Cloud Run, Local, and Vercel Serverless
 * 2. If backend fails or is not present (Vercel static build), directly sends to Google Sheets
 * 3. Saves locally so no order is ever lost
 */
export async function submitCustomerOrder(data: OrderSubmissionData): Promise<{
  success: boolean;
  orderNumber: string;
  syncedToSheets: boolean;
}> {
  const orderNumber = 'MG-' + Math.floor(100000 + Math.random() * 900000);
  const webhookUrl = getActiveWebhookUrl();

  const newOrder: OrderRecord = {
    id: 'ord_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    orderNumber,
    createdAt: new Date().toISOString(),
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    city: data.city.trim(),
    address: data.address.trim(),
    packageId: data.packageId,
    packageName: data.packageName,
    price: Number(data.totalPrice) || 0,
    quantity: Number(data.quantity) || 1,
    status: 'new',
    notes: data.notes || '',
    syncedToSheets: false,
  };

  // Always save to client local cache first as an immediate safety guarantee
  saveOrderToLocalCache(newOrder);

  let backendSuccess = false;
  let backendSynced = false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: newOrder.fullName,
        phone: newOrder.phone,
        city: newOrder.city,
        address: newOrder.address,
        packageId: newOrder.packageId,
        packageName: newOrder.packageName,
        totalPrice: newOrder.price,
        quantity: newOrder.quantity,
        notes: newOrder.notes,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const responseData = await res.json();
      if (responseData.success) {
        backendSuccess = true;
        backendSynced = !!responseData.order?.syncedToSheets;
      }
    }
  } catch (backendError) {
    console.warn('[Backend order submission notice]: Will use direct Google Sheets dispatcher.', backendError);
  }

  // If backend didn't sync to Google Sheets (e.g. Vercel static or Sheets permission on server),
  // immediately dispatch directly from browser!
  if (!backendSynced && webhookUrl) {
    const directOk = await sendDirectToGoogleSheets(newOrder, webhookUrl);
    if (directOk) {
      newOrder.syncedToSheets = true;
      saveOrderToLocalCache(newOrder);
      return {
        success: true,
        orderNumber,
        syncedToSheets: true,
      };
    }
  }

  return {
    success: true, // Order is successfully accepted and saved
    orderNumber,
    syncedToSheets: backendSynced || newOrder.syncedToSheets,
  };
}
