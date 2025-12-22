import { useState } from 'react';

export default function TestAutomation() {
  const [status, setStatus] = useState('Idle');

  const runTest = async () => {
    setStatus('Sending...');
    try {
      const response = await fetch('/api/line-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          events: [{
            type: 'message',
            source: { userId: 'TEST_USER_123' },
            message: { text: 'Hello from the Test Button!' },
            replyToken: 'test-token'
          }]
        })
      });

      if (response.ok) {
        setStatus('Success! Check your Google Sheet.');
      } else {
        const err = await response.text();
        setStatus(`Error: ${err}`);
      }
    } catch (e) {
      setStatus('Failed to connect to API.');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Automation Tester</h1>
      <button 
        onClick={runTest}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#00b900', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Send Test Order to Sheet
      </button>
      <p>Status: <strong>{status}</strong></p>
    </div>
  );
}
