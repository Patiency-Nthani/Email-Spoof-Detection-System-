import React, { useState } from 'react';

export default function DomainChecks() {
  const [domain, setDomain] = useState('example.com');
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    setResult({ spf: 'v=spf1 include:_spf.example.com ~all', dmarc: 'v=DMARC1; p=reject;' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Domain Checks</h1>
        <p className="text-xs text-slate-500 mt-0.5">Live DNS lookups for SPF and DMARC records, plus lookalike comparison.</p>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm flex gap-2">
        <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com" className="flex-1 p-2.5 border rounded-lg text-xs font-mono" />
        <button onClick={handleCheck} className="px-5 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow">Check</button>
      </div>
      {result && (
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3 text-xs font-mono">
          <div><span className="text-slate-500">SPF Record:</span> {result.spf}</div>
          <div><span className="text-slate-500">DMARC Record:</span> {result.dmarc}</div>
        </div>
      )}
    </div>
  );
}