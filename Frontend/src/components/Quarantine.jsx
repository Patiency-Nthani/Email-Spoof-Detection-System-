import React from 'react';

export default function Quarantine() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Quarantine</h1>
        <p className="text-xs text-slate-500 mt-0.5">Emails scoring 60+ from your analysed samples. This prototype does not intercept a live inbox.</p>
      </div>
      <div className="bg-white p-12 rounded-xl border shadow-sm text-center text-xs text-slate-400">Nothing in quarantine.</div>
    </div>
  );
}