import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Step5_Age({ character, onChange }) {
  const age = character.identity?.age || 24;

  const handleAgeChange = (val) => {
    onChange({
      ...character,
      identity: {
        ...character.identity,
        age: Math.max(18, val)
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 5 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Companion Age</h2>
        <p className="text-xs text-slate-400 mt-1">Set character age (&ge; 18 years only). Live preview updates immediately.</p>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" /> 18+ Adult Compliant
          </span>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Selected Age</span>
            <span className="text-3xl font-extrabold font-mono text-brand-300">{age} <span className="text-sm font-sans font-normal text-slate-400">years</span></span>
          </div>
        </div>

        {/* Premium Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="18"
            max="60"
            value={age}
            onChange={(e) => handleAgeChange(parseInt(e.target.value))}
            className="w-full h-3"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>18 y/o</span>
            <span>30 y/o</span>
            <span>45 y/o</span>
            <span>60 y/o</span>
          </div>
        </div>
      </div>
    </div>
  );
}
