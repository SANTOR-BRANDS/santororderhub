import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Sanitize strings to prevent Google Sheets formula injection
function sanitizeForSheets(value) {
  if (typeof value !== 'string') return String(value);
  // Prevent formula injection by prefixing with apostrophe
  if (value.match(/^[=+\-@]/)) {
    return "'" + value;
  }
  return value.trim().substring(0, 500); // Limit length
}

export default async function handler(req, res) {
  // Only allow POST requests
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
    // Validate request body structure
    if (!req.body || !Array.isArray(req.body.events) || req.body.events.length === 0) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Get secrets and handle the common Vercel private key formatting issue
    const secrets = JSON.parse(process.env.GSHEETS_KEY_JSON);
    const privateKey = secrets.private_key.replace(/\\n/g, '\n');

    // Setup Google Auth
    const serviceAccountAuth = new JWT({
      email: secrets.client_email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Targets the first tab (Sheet1)

    // Process the incoming test/message event
    const event = req.body.events[0];
    if (event && event.type === 'message') {
      // Validate event structure
      if (!event.message || typeof event.message.text !== 'string') {
        return res.status(400).json({ error: 'Invalid event structure' });
      }

      // Sanitize user input before writing to sheet
      const sanitizedText = sanitizeForSheets(event.message.text);
      
      // Every key here MUST match your Row 1 headers exactly (Case-Sensitive)
      await sheet.addRow({
        Timestamp: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' }),
        OrderID: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
        ItemCode: 'TEST_BUTTON',
        QTY: '1',
        unitPrice: '0',
        lineTOTAL: '0',
        addons: sanitizedText,
        addonsPrice: '0',
        basketTotal: '0'
      });
    }

    return res.status(200).json({ status: 'Success' });
  } catch (err) {
    // Log the error to server logs only
    console.error('[WEBHOOK_ERROR]', {
      message: err.message,
      timestamp: new Date().toISOString()
    });
    // Return generic error to client
    return res.status(500).json({ error: 'Failed to process request. Please try again.' });
  }
}
