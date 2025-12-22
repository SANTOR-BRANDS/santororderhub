import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  // Only allow POST requests (which is what LINE sends)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 1. Get secrets from Vercel environment variables (Hidden from public)
    const secrets = JSON.parse(process.env.GSHEETS_KEY_JSON);
    const lineToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

    // 2. Setup Google Auth
    const serviceAccountAuth = new JWT({
      email: secrets.client_email,
      key: secrets.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // 3. Simple logic to handle a message from LINE
    const event = req.body.events[0];
    if (event && event.type === 'message') {
      await sheet.addRow({
        Date: new Date().toLocaleString(),
        User: event.source.userId,
        Message: event.message.text || 'Image/Other'
      });
    }

    return res.status(200).json({ status: 'Success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
