import React from 'react';

export default function Dashboard({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Security Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Overview of your email analyses</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setActiveTab('analyze')} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow">Analyse email</button>
          <button onClick={() => setActiveTab('reports')} className="px-4 py-2 rounded-lg border bg-white text-slate-900 text-xs font-semibold shadow-sm">Reports</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border shadow-sm"><div className="text-xs text-slate-500">Total analysed</div><div className="text-3xl font-extrabold text-slate-900 mt-1">0</div></div>
        <div className="bg-white p-5 rounded-xl border shadow-sm"><div className="text-xs text-slate-500">Low risk</div><div className="text-3xl font-extrabold text-emerald-600 mt-1">0</div></div>
        <div className="bg-white p-5 rounded-xl border shadow-sm"><div className="text-xs text-slate-500">Suspicious</div><div className="text-3xl font-extrabold text-amber-500 mt-1">0</div></div>
        <div className="bg-white p-5 rounded-xl border shadow-sm"><div className="text-xs text-slate-500">High risk</div><div className="text-3xl font-extrabold text-red-600 mt-1">0</div></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm"><h3 className="font-bold text-slate-900 text-sm mb-4">Risk distribution</h3><div className="h-44 flex items-center justify-center text-slate-400 text-xs border border-dashed rounded-lg bg-slate-50">No analyses yet.</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><h3 className="font-bold text-slate-900 text-sm mb-4">Activity (last 14 days)</h3><div className="h-44 flex items-end justify-between px-4 pb-2 text-[10px] text-slate-400 border-b border-l border-slate-200"><span>10-20</span><span>10-22</span><span>10-24</span><span>10-26</span><span>10-28</span><span>10-30</span><span>11-02</span></div></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm"><h3 className="font-bold text-slate-900 text-sm mb-4">Recent threats</h3><div className="h-28 flex items-center justify-center text-slate-400 text-xs border border-dashed rounded-lg bg-slate-50">No high-risk emails found.</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-4">System status</h3>
          <div className="text-xs space-y-2 text-slate-600">
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"></span>Analysis engine operational</div>
            <div>Last analysis: none yet</div>
          </div>
        </div>
      </div>
    </div>
  );
}