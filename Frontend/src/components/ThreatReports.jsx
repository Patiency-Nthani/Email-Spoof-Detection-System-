import React from 'react';

export default function ThreatReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Threat Reports</h1>
        <p className="text-xs text-slate-500 mt-0.5">Summary of analyses in the selected period</p>
      </div>
      <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between gap-4 text-xs">
        <input type="date" className="p-2 border rounded-lg" defaultValue="2026-10-01" />
        <div className="flex gap-2">
          <button onClick={() => alert('Export CSV')} className="px-3.5 py-2 border rounded-lg font-semibold bg-white">📥 CSV</button>
          <button onClick={() => alert('Export PDF')} className="px-3.5 py-2 border rounded-lg font-semibold bg-white">📄 PDF</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border shadow-sm"><div className="text-xs text-slate-500">Total analysed</div><div className="text-3xl font-extrabold text-slate-900 mt-1">0</div></div>
        <div className="bg-white p-5 rounded-xl border shadow-sm"><div className="text-xs text-slate-500">SPF failures</div><div className="text-3xl font-extrabold text-red-600 mt-1">0</div></div>
        <div className="bg-white p-5 rounded-xl border shadow-sm"><div className="text-xs text-slate-500">DKIM failures</div><div className="text-3xl font-extrabold text-red-600 mt-1">0</div></div>
        <div className="bg-white p-5 rounded-xl border shadow-sm"><div className="text-xs text-slate-500">DMARC failures</div><div className="text-3xl font-extrabold text-red-600 mt-1">0</div></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm"><h3 className="font-bold text-slate-900 text-sm mb-4">Threats by severity</h3><div className="h-44 flex items-center justify-center text-slate-400 text-xs border border-dashed rounded-lg bg-slate-50">No threats recorded.</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-900 text-sm">Trend</h3><div className="flex gap-1 text-[10px]"><button className="px-2.5 py-1 bg-blue-600 text-white rounded">day</button><button className="px-2.5 py-1 bg-slate-100 rounded">week</button><button className="px-2.5 py-1 bg-slate-100 rounded">month</button></div></div>
          <div className="h-44 flex items-center justify-center text-slate-400 text-xs border border-dashed rounded-lg bg-slate-50">No data in this period.</div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm"><h3 className="font-bold text-slate-900 text-sm mb-4">Common suspicious domains</h3><div className="h-28 flex items-center justify-center text-slate-400 text-xs border border-dashed rounded-lg bg-slate-50">No suspicious domains yet.</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">Prototype evaluation</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">Measured on 4 synthetic labelled samples (threshold score ≥ 30). This is prototype performance, not real-world accuracy.</p>
          <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
            <div className="bg-slate-50 p-2 rounded border">Precision: <span className="font-bold">100%</span></div>
            <div className="bg-slate-50 p-2 rounded border">Recall: <span className="font-bold">67%</span></div>
            <div className="bg-slate-50 p-2 rounded border">F1: <span className="font-bold">80%</span></div>
            <div className="bg-slate-50 p-2 rounded border">False-positive rate: <span className="font-bold">0%</span></div>
            <div className="bg-slate-50 p-2 rounded border">False-negative rate: <span className="font-bold">33%</span></div>
            <div className="bg-slate-50 p-2 rounded border">Latency: <span className="font-bold">1.25 ms</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}