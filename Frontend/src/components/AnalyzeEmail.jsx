import React, { useState } from 'react';

const API_URL = 'http://localhost:5000/api';

export default function AnalyzeEmail() {
  const [headers, setHeaders] = useState('');

  const handleAnalyze = async () => {
    if (!headers) return alert('Please paste headers first.');
    try {
      const user = JSON.parse(localStorage.getItem('spoof_user'));
      const res = await fetch(API_URL + '/analyses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw_headers: headers, user_id: user.id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);
      alert(`Analysis complete! Risk Score: ${data.risk_score} (${data.verdict})`);
      window.location.hash = '#/history';
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analyse Email</h1>
        <p className="text-xs text-slate-500 mt-0.5">Paste raw headers or upload an .eml file. Links and attachments are never opened.</p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <button onClick={() => setHeaders(`From: Security Team <security@paypa1-update.com>\nAuthentication-Results: spf=fail dkim=fail dmarc=fail\nSubject: URGENT: Account Suspended`)} className="px-3.5 py-2 rounded-lg border bg-white text-xs font-semibold shadow-sm">⚠️ Sample: spoofed (synthetic)</button>
        <button onClick={() => setHeaders(`From: PayPal <service@paypal.com>\nAuthentication-Results: spf=pass dkim=pass dmarc=pass\nSubject: Receipt for your payment`)} className="px-3.5 py-2 rounded-lg border bg-white text-xs font-semibold shadow-sm">🛡️ Sample: legitimate (synthetic)</button>
        <button onClick={() => alert('File upload simulated')} className="px-3.5 py-2 rounded-lg border bg-white text-xs font-semibold shadow-sm">📤 Upload .eml</button>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <textarea value={headers} onChange={e => setHeaders(e.target.value)} className="w-full h-64 p-3 font-mono text-xs border rounded-lg" placeholder="From, Received, Authentication-Results..."></textarea>
        <button onClick={handleAnalyze} className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow">Run Analysis Engine</button>
      </div>
    </div>
  );
}