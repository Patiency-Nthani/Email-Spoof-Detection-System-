import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AnalyzeEmail from './components/AnalyzeEmail';
import AnalysisHistory from './components/AnalysisHistory';
import ThreatReports from './components/ThreatReports';
import Quarantine from './components/Quarantine';
import DomainChecks from './components/DomainChecks';
import Settings from './components/Settings';
import HelpDocs from './components/HelpDocs';
import { ShieldCheck, ArrowRight, Lock, EyeOff, UserCheck, ShieldAlert, Globe, FileText, Search, LayoutDashboard } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('spoof_user') || 'null'));
  const [currentRoute, setCurrentRoute] = useState(window.location.hash.slice(1) || 'home');
  const [authMode, setAuthMode] = useState('login');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (['home', 'features', 'how-it-works', 'about', 'auth'].includes(hash)) {
        setCurrentRoute(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    if (!window.location.hash) window.location.hash = '#/home';
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('spoof_user');
    setUser(null);
    window.location.hash = '#/home';
  };

  const SHIELD_LOGO = (
    <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
      <ShieldCheck className="w-5 h-5" />
    </div>
  );

  if (!user || ['home', 'features', 'how-it-works', 'about', 'auth'].includes(currentRoute)) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        {/* Public Header */}
        <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur h-16 px-6 flex items-center justify-between w-full shadow-sm">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-lg cursor-pointer" onClick={() => { window.location.hash = '#/home'; setCurrentRoute('home'); }}>
              {SHIELD_LOGO}
              <span>Email Spoof <span className="text-sky-500">Detection System</span></span>
            </div>
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
              <a href="#/home" onClick={() => setCurrentRoute('home')} className={`hover:text-blue-600 ${currentRoute === 'home' ? 'text-blue-600 font-bold' : ''}`}>Home</a>
              <a href="#/features" onClick={() => setCurrentRoute('features')} className={`hover:text-blue-600 ${currentRoute === 'features' ? 'text-blue-600 font-bold' : ''}`}>Features</a>
              <a href="#/how-it-works" onClick={() => setCurrentRoute('how-it-works')} className={`hover:text-blue-600 ${currentRoute === 'how-it-works' ? 'text-blue-600 font-bold' : ''}`}>How It Works</a>
              <a href="#/about" onClick={() => setCurrentRoute('about')} className={`hover:text-blue-600 ${currentRoute === 'about' ? 'text-blue-600 font-bold' : ''}`}>About</a>
            </nav>
            <div className="flex items-center gap-3">
              <button onClick={() => { setAuthMode('login'); window.location.hash = '#/auth'; setCurrentRoute('auth'); }} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600">Login</button>
              <button onClick={() => { setAuthMode('signup'); window.location.hash = '#/auth'; setCurrentRoute('auth'); }} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition">Get Started</button>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
          {currentRoute === 'home' && <PublicHome onGetStarted={() => { setAuthMode('signup'); setCurrentRoute('auth'); }} />}
          {currentRoute === 'features' && <PublicFeatures />}
          {currentRoute === 'how-it-works' && <PublicHowItWorks />}
          {currentRoute === 'about' && <PublicAbout />}
          {currentRoute === 'auth' && <AuthScreen authMode={authMode} setAuthMode={setAuthMode} onLoginSuccess={(u) => { setUser(u); setCurrentRoute('dashboard'); }} />}
        </main>

        <footer className="bg-white border-t py-6 px-6 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <div className="flex items-center gap-2">
              {SHIELD_LOGO}
              <span className="font-semibold text-slate-700">Email Spoof Detection System</span>
              <span>·</span>
              <span>Email spoof detection for safer inboxes. A university software engineering project.</span>
            </div>
            <div className="flex gap-6 text-slate-600 font-medium">
              <a href="#/about" onClick={() => setCurrentRoute('about')} className="hover:text-blue-600">About</a>
              <a href="#/how-it-works" onClick={() => setCurrentRoute('how-it-works')} className="hover:text-blue-600">Documentation</a>
              <a href="#/features" onClick={() => setCurrentRoute('features')} className="hover:text-blue-600">Privacy Policy</a>
              <a href="#/contact" className="hover:text-blue-600">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white px-8 flex items-center justify-between shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h2>
          <span className="text-xs text-slate-500 font-medium">{user.email}</span>
        </header>
        <div className="p-8 max-w-7xl w-full mx-auto flex-1">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'analyze' && <AnalyzeEmail />}
          {activeTab === 'history' && <AnalysisHistory />}
          {activeTab === 'reports' && <ThreatReports />}
          {activeTab === 'quarantine' && <Quarantine />}
          {activeTab === 'domains' && <DomainChecks />}
          {activeTab === 'settings' && <Settings user={user} onLogout={handleLogout} />}
          {activeTab === 'help' && <HelpDocs />}
        </div>
      </main>
    </div>
  );
}

function PublicHome({ onGetStarted }) {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Banner */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="rounded-full border border-blue-600/30 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1">Email spoof detection</span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 mt-4">
            Protect Your Inbox. Detect Email Spoofing Before It Becomes a Threat.
          </h1>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            Email Spoof Detection System analyses email headers, sender information, domain similarity and authentication results to reveal possible impersonation — with a clear explanation for every finding.
          </p>
          <div className="flex gap-4 mt-8">
            <button onClick={onGetStarted} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 flex items-center gap-2 text-xs">
              Analyse an Email <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => { window.location.hash = '#/features'; }} className="px-6 py-3 rounded-xl border bg-white text-slate-800 font-semibold shadow-sm hover:bg-slate-50 text-xs">
              Explore Features
            </button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1d2757] to-blue-600 p-10 rounded-2xl text-white shadow-xl flex flex-col justify-center items-center min-h-[320px]">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-2xl font-bold">Secure Header Inspection</h3>
          <p className="text-xs text-slate-200 mt-2 text-center max-w-sm">Zero body execution. Cryptographic header validation and explainable risk rules.</p>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
          <div className="font-bold text-slate-900 text-sm">Impersonation warnings</div>
          <p className="text-xs text-slate-600">Flags display names that claim a brand they don't belong to.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
          <div className="font-bold text-slate-900 text-sm">Risk score 0–100</div>
          <p className="text-xs text-slate-600">Every point comes from a documented, explainable rule.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
          <div className="font-bold text-slate-900 text-sm">Reports & monitoring</div>
          <p className="text-xs text-slate-600">Track trends, review quarantine and export results.</p>
        </div>
      </div>

      {/* How It Works Steps */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">How it works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">1</div>
            <div className="font-bold text-slate-900 text-sm">Paste or upload</div>
            <p className="text-xs text-slate-600">Paste raw headers or upload an .eml file.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">2</div>
            <div className="font-bold text-slate-900 text-sm">We inspect</div>
            <p className="text-xs text-slate-600">Headers are parsed and checked against detection rules.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">3</div>
            <div className="font-bold text-slate-900 text-sm">Get a verdict</div>
            <p className="text-xs text-slate-600">See the score, every finding, and what to do next.</p>
          </div>
        </div>
      </div>

      {/* Metrics Counter Bar */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm text-center">
          <div className="text-3xl font-extrabold text-slate-900">0</div>
          <div className="text-xs text-slate-500 mt-1">Emails analysed</div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm text-center">
          <div className="text-3xl font-extrabold text-slate-900">0</div>
          <div className="text-xs text-slate-500 mt-1">Flagged as suspicious or worse</div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm text-center">
          <div className="text-3xl font-extrabold text-slate-900">12</div>
          <div className="text-xs text-slate-500 mt-1">Detection rules</div>
        </div>
      </div>

      {/* What System Checks */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">What Email Spoof Detection System checks</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <div className="font-bold text-slate-900 text-sm">Email header analysis</div>
            <p className="text-xs text-slate-600">Parses From, Reply-To, Return-Path, Received chains and more.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <div className="font-bold text-slate-900 text-sm">SPF, DKIM & DMARC</div>
            <p className="text-xs text-slate-600">Reads authentication results recorded by the receiving server.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <div className="font-bold text-slate-900 text-sm">Lookalike domains</div>
            <p className="text-xs text-slate-600">Spots typos and look-alike characters like paypa1.com.</p>
          </div>
        </div>
      </div>

      {/* Security Banner */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Your email data, handled carefully</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <EyeOff className="w-8 h-8 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Headers only</h3>
            <p className="text-xs text-slate-600">We store extracted header fields and findings — never full email bodies or attachments.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <Lock className="w-8 h-8 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Nothing is executed</h3>
            <p className="text-xs text-slate-600">Links and attachments are never opened. All input is treated as untrusted.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-2">
            <UserCheck className="w-8 h-8 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">You're in control</h3>
            <p className="text-xs text-slate-600">Only you can see your analyses, and you can delete them at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PublicFeatures() {
  const features = [
    { title: 'Email header analysis', desc: 'Parses From, Reply-To, Return-Path, Received chains and more.', icon: Search },
    { title: 'SPF, DKIM & DMARC', desc: 'Reads authentication results recorded by the receiving server.', icon: ShieldCheck },
    { title: 'Lookalike domains', desc: 'Spots typos and look-alike characters like paypa1.com.', icon: Globe },
    { title: 'Impersonation warnings', desc: 'Flags display names that claim a brand they don\'t belong to.', icon: ShieldAlert },
    { title: 'Risk score 0–100', desc: 'Every point comes from a documented, explainable rule.', icon: FileText },
    { title: 'Reports & monitoring', desc: 'Track trends, review quarantine and export results.', icon: LayoutDashboard },
  ];
  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Features</h1>
        <p className="text-slate-600 text-sm mt-1">What Email Spoof Detection System checks</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
              <Icon className="w-8 h-8 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">{f.title}</h3>
              <p className="text-xs text-slate-600">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PublicHowItWorks() {
  const weights = [
    { rule: 'spfFail', weight: -25 },
    { rule: 'spfSoftFail', weight: -12 },
    { rule: 'dkimFail', weight: -20 },
    { rule: 'dmarcFail', weight: -30 },
    { rule: 'authMissing', weight: -10 },
    { rule: 'replyToMismatch', weight: -20 },
    { rule: 'returnPathMismatch', weight: -25 },
    { rule: 'displayNameSpoof', weight: -25 },
    { rule: 'lookalike', weight: '+35' },
    { rule: 'missingFrom', weight: '+30' },
    { rule: 'missingMessageId', weight: -5 },
    { rule: 'missingDate', weight: -5 },
  ];

  return (
    <div className="space-y-10 py-4 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">How It Works</h1>
        <p className="text-slate-600 text-sm mt-1">Step-by-step header inspection and scoring engine</p>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Risk bands</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          0–29 Low · 30–59 Suspicious · 60–79 High · 80–100 Critical. These defaults are configurable and must be validated through testing. Passing authentication never guarantees an email is safe.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Rule weights</h3>
        <div className="border rounded-lg overflow-hidden text-xs">
          {weights.map((w, idx) => (
            <div key={idx} className="flex justify-between p-3 border-b last:border-0 bg-slate-50 even:bg-white">
              <span className="font-mono text-slate-700">{w.rule}</span>
              <span className={`font-bold ${String(w.weight).startsWith('+') ? 'text-red-600' : 'text-emerald-600'}`}>{w.weight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicAbout() {
  return (
    <div className="space-y-6 py-4 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-slate-900">About Email Spoof Detection System</h1>
      <p className="text-xs text-slate-600 leading-relaxed">
        Email Spoof Detection System is a university Software Engineering project that detects email spoofing, fraudulent sender identities, lookalike domains, suspicious headers and authentication failures.
      </p>
      <p className="text-xs text-slate-600 leading-relaxed">
        It inspects the headers you provide. It does not connect to your live inbox, and results recorded from pasted headers reflect what the receiving server reported — not live re-verification.
      </p>
      <p className="text-xs text-slate-600 leading-relaxed">
        Prototype performance is measured on synthetic, labelled samples and should not be read as real-world accuracy.
      </p>
    </div>
  );
}

function AuthScreen({ authMode, setAuthMode, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/signup';
      const body = authMode === 'signup' ? { full_name: fullName, email, password } : { email, password };
      const res = await fetch(API_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed');
      localStorage.setItem('spoof_user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-2xl border shadow-xl max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">{authMode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'signup' && (
            <div>
              <label className="font-semibold text-slate-600">Full Name</label>
              <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="font-semibold text-slate-600">Email address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" placeholder="name@example.com" />
          </div>
          <div>
            <label className="font-semibold text-slate-600">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700">
            {authMode === 'login' ? 'Sign in' : 'Create Account'}
          </button>
        </form>
        <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t">
          <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-blue-600 font-medium hover:underline">
            {authMode === 'login' ? 'Create an account' : 'Back to sign in'}
          </button>
          <a href="#/home" onClick={() => window.location.hash = '#/home'} className="hover:underline">← Back to home</a>
        </div>
      </div>
    </div>
  );
}