import React from 'react';

export default function HelpDocs() {
  const faqs = [
    { q: 'How do I get email headers?', a: 'Open email in Gmail → click three dots → Show original → Copy to clipboard.' },
    { q: 'What are SPF, DKIM and DMARC?', a: 'Protocols verifying sender server authorization, digital signatures, and policy enforcement.' },
    { q: 'Does a low score mean the email is safe?', a: 'It indicates technical authentication passed, but caution is still required.' },
    { q: 'Why does it say \'unavailable\'?', a: 'Headers did not include explicit authentication results.' },
    { q: 'What data is stored?', a: 'Only extracted header attributes and risk scores in SQLite.' }
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Help & Documentation</h1>
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="group border rounded-lg p-4 cursor-pointer text-xs">
            <summary className="font-medium text-slate-900 flex justify-between">{f.q}<span>⌄</span></summary>
            <p className="mt-2 text-slate-600 border-t pt-2">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}