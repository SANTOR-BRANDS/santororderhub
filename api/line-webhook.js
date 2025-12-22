import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 1. Get secrets and handle the common Vercel private key formatting issue
    const secrets = JSON.parse(process.env.GSHEETS_KEY_JSON);
    const privateKey = secrets.private_key.replace(/\\n/g, '\n');

    // 2. Setup Google Auth
    const serviceAccountAuth = new JWT({
      email: secrets.client_email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Targets the first tab (Sheet1)

    // 3. Process the incoming test/message event
    const event = req.body.events[0];
    if (event && event.type === 'message') {
      
      // *** ADD THIS LINE BELOW ***
      const userId = event.source.userId || 'Unknown User';

      // Every key here MUST match your Row 1 headers exactly (Case-Sensitive)
      await sheet.addRow({
        Timestamp: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' }),
        OrderID: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
        LineID: userId, // Now this will work!
        ItemCode: 'TEST_BUTTON',
        QTY: '1',
        unitPrice: '0',
        lineTOTAL: '0',
        addons: event.message.text || 'Test Click',
        addonsPrice: '0',
        basketTotal: '0'
      });
    }

    return res.status(200).json({ status: 'Success' });
  } catch (err) {
    // Log the error to Vercel console so we can see it if it fails
    console.error("SHEETS_ERROR:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
