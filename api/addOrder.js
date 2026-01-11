import { google } from 'googleapis';

// Sanitize strings to prevent Google Sheets formula injection
function sanitizeForSheets(value) {
  if (typeof value !== 'string') return value;
  // Prevent formula injection by prefixing with apostrophe
  if (value.match(/^[=+\-@]/)) {
    return "'" + value;
  }
  return value.trim().substring(0, 500); // Limit length
}

// Validate order structure
function validateOrder(body) {
  const { orderId, items, basketTotal, timestamp } = body;
  
  if (!orderId || typeof orderId !== 'string' || orderId.length > 100) {
    return { valid: false, error: 'Invalid orderId' };
  }
  
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return { valid: false, error: 'Invalid items array' };
  }
  
  for (const item of items) {
    if (!item.itemCode || typeof item.itemCode !== 'string') {
      return { valid: false, error: 'Invalid item structure' };
    }
    if (typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > 100) {
      return { valid: false, error: 'Invalid quantity' };
    }
    if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
      return { valid: false, error: 'Invalid unitPrice' };
    }
  }
  
  if (typeof basketTotal !== 'number' || basketTotal < 0) {
    return { valid: false, error: 'Invalid basketTotal' };
  }
  
  if (!timestamp || typeof timestamp !== 'string') {
    return { valid: false, error: 'Invalid timestamp' };
  }
  
  return { valid: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authentication check
  const apiSecret = process.env.API_SECRET;
  if (apiSecret) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${apiSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  try {
    const body = req.body;
    
    // Validate input
    const validation = validateOrder(body);
    if (!validation.valid) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    const {
      orderId,
      items,
      basketTotal,
      timestamp
    } = body;

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GSHEETS_KEY_JSON),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    const sheets = google.sheets({ version: 'v4', auth });

    // Sanitize and map items to rows
    const rows = items.map(item => [
      sanitizeForSheets(timestamp),
      sanitizeForSheets(orderId),
      sanitizeForSheets(item.itemCode),
      item.quantity,
      item.unitPrice,
      item.lineTotal,
      sanitizeForSheets(item.addons?.map(a => a.code).join(',') || ''),
      item.addons?.reduce((sum, a) => sum + a.extraPrice, 0) || 0,
      basketTotal
    ]);

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: 'orders!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rows }
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    // Log detailed error server-side only
    console.error('[ORDER_ERROR]', {
      message: err.message,
      timestamp: new Date().toISOString()
    });
    // Return generic error to client
    res.status(500).json({ error: 'Failed to process order. Please try again.' });
  }
}
