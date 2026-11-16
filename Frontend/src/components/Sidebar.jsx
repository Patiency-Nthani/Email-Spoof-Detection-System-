import React from 'react';
import { 
  LayoutDashboard, Search, History, FileText, ShieldAlert, 
  Globe, Settings as SettingsIcon, HelpCircle, LogOut, ShieldCheck 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyze', label: 'Analyse Email', icon: Search },
    { id: 'history', label: 'Analysis History', icon: History },
    { id: 'reports', label: 'Threat Reports', icon: FileText },
    { id: 'quarantine', label: 'Quarantine', icon: ShieldAlert },
    { id: 'domains', label: 'Domain Checks', icon: Globe },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'help', label: 'Help & Docs', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-[#1d2757] text-white flex flex-col p-4 border-r border-[#2a3674] select-none">
      <div className="h-16 flex items-center mb-4 cursor-pointer px-2" onClick={() => setActiveTab('dashboard')}>
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-sm leading-tight">Email Spoof Detection</span>
            <span className="text-[10px] text-sky-400 font-semibold">System</span>
          </div>
        </div>
      </div>
      <nav className="space-y-1 flex-1 text-sm">
        {items.map(item => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2.5 ${active ? 'bg-[#2a3674] text-white font-medium' : 'hover:bg-[#2a3674]/50 text-slate-300'}`}>
              <Icon className="w-4 h-4" /><span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <button onClick={onLogout} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 mt-auto font-medium">
        <LogOut className="w-4 h-4" /><span>Logout</span>
      </button>
    </aside>
  );
}