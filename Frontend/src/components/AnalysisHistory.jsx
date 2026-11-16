import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

export default function AnalysisHistory() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(API_URL + '/analyses').then(r => r.json()).then(setList).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analysis History</h1>
        <p className="text-xs text-slate-500 mt-0.5">0 records</p>
      </div>
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-wrap gap-3 items-center text-xs">
        <input type="text" placeholder="Search sender or domain" className="p-2 border rounded-lg flex-1 min-w-[200px]" />
        <select className="p-2 border rounded-lg bg-white"><option>All risk levels</option></select>
        <input type="date" className="p-2 border rounded-lg bg-white" />
        <input type="date" className="p-2 border rounded-lg bg-white" />
        <select className="p-2 border rounded-lg bg-white"><option>Newest first</option></select>
        <button onClick={() => alert('Exporting CSV...')} className="px-3.5 py-2 border rounded-lg bg-white font-semibold">📥 Export CSV</button>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
        {list.length === 0 ? <div className="py-12 text-center text-xs text-slate-400">No analyses match. Analyse an email</div> : list.map(item => (
          <div key={item.id} className="p-4 border rounded-lg flex justify-between items-center bg-slate-50">
            <div><div className="font-bold text-slate-900 text-sm">{item.subject}</div><div className="text-xs text-slate-500">Sender: {item.sender_address} · Score: {item.risk_score}</div></div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.risk_score >= 60 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{item.verdict}</span>
          </div>
        ))}
      </div>
    </div>
  );
}