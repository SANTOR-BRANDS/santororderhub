import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const body = req.body;
  const {
    orderId,
    items,
    basketTotal,
    timestamp
  } = body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GSHEETS_KEY_JSON),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    const sheets = google.sheets({ version: 'v4', auth });

    // For each line item in order → push to sheet
    const rows = items.map(item => [
      timestamp,
      orderId,
      item.itemCode,
      item.quantity,
      item.unitPrice,
      item.lineTotal,
      item.addons?.map(a => a.code).join(','),
      item.addons?.reduce((sum,a)=>sum+a.extraPrice,0) || 0,
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
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
