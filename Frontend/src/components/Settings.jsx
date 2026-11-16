import React, { useState } from 'react';

export default function Settings({ user, onLogout }) {
  const [notify, setNotify] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
      
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Profile</h3>
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-500 font-medium">Email</label>
            <input type="text" disabled value={user.email} className="w-full mt-1 p-2.5 border rounded-lg bg-slate-100 text-slate-500" />
          </div>
          <div>
            <label className="text-slate-500 font-medium">Full name</label>
            <input type="text" placeholder="Full name" className="w-full mt-1 p-2.5 border rounded-lg" />
          </div>
          <div>
            <label className="text-slate-500 font-medium">Username</label>
            <input type="text" placeholder="Username" className="w-full mt-1 p-2.5 border rounded-lg" />
          </div>
          <button onClick={() => alert('Profile saved')} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow">Save profile</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Account security</h3>
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-500 font-medium">Current password</label>
            <input type="password" value="••••••••" disabled className="w-full mt-1 p-2.5 border rounded-lg bg-slate-100" />
          </div>
          <div>
            <label className="text-slate-500 font-medium">New password</label>
            <input type="password" placeholder="New password" className="w-full mt-1 p-2.5 border rounded-lg" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => alert('Password changed')} className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg">Change password</button>
            <button onClick={onLogout} className="px-4 py-2 border border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50">Log out of this session</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Preferences</h3>
        <div className="flex items-center justify-between text-xs">
          <span>Notify me about high-risk results</span>
          <input type="checkbox" checked={notify} onChange={() => setNotify(!notify)} className="w-4 h-4 text-blue-600 rounded" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Data retention</h3>
        <p className="text-xs text-slate-500">Only extracted headers and findings are stored. You can permanently remove all of your analyses.</p>
        <button onClick={() => alert('All analyses deleted')} className="px-4 py-2 bg-red-600 text-white font-semibold text-xs rounded-lg shadow hover:bg-red-700">Delete all my analyses</button>
      </div>
    </div>
  );
}