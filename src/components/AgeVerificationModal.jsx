import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

export default function AgeVerificationModal({ isOpen, onConfirm, currentAge }) {
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleVerify = () => {
    if (!confirmed) {
      setErrorMsg('You must check the confirmation box to proceed.');
      return;
    }
    setErrorMsg('');
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/90 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel max-w-md w-full rounded-2xl p-6 border border-brand-500/40 shadow-2xl glow-brand relative">
        <div className="w-14 h-14 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center mx-auto mb-4 text-brand-400">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold font-sans text-white text-center">
          Adult Character System Verification
        </h2>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 my-4 text-xs text-amber-200 leading-relaxed">
          <p className="font-semibold mb-1 flex items-center gap-1.5 text-amber-300">
            <Lock className="w-4 h-4" /> 18+ Fictional Character Compliance
          </p>
          This module is designed exclusively for customizing 18+ adult fictional characters with detailed realistic body proportions, anatomy, and generation settings.
        </div>

        <div className="space-y-3 my-4">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-dark-800/80 border border-slate-700/80 cursor-pointer hover:border-slate-600 transition">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => {
                setConfirmed(e.target.checked);
                if (e.target.checked) setErrorMsg('');
              }}
              className="mt-1 w-4 h-4 text-brand-600 bg-dark-900 border-slate-600 rounded focus:ring-brand-500"
            />
            <span className="text-xs text-slate-300">
              I confirm that all characters created in this system represent <strong className="text-white">adult fictional characters aged 18 or older</strong>.
            </span>
          </label>
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-400 font-medium mb-3 text-center">
            {errorMsg}
          </p>
        )}

        <button
          onClick={handleVerify}
          className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 to-brand-accent text-white shadow-lg shadow-brand-500/30 hover:opacity-95 transition flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> Verify & Access Character Studio
        </button>
      </div>
    </div>
  );
}
