import React from 'react';
import { Check } from 'lucide-react';

export default function Step2_Ethnicity({ character, onChange }) {
  const currentArchetype = character.identity?.archetype || 'Caucasian Special Operative';

  const archetypes = [
    { name: 'Caucasian Cyber Operative', tag: 'Caucasian', icon: '👤', desc: 'Sharp high-tech features, sleek metropolitan aesthetic.' },
    { name: 'East Asian Tech Specialist', tag: 'East Asian', icon: '👘', desc: 'Graceful refined features, Neo-Tokyo cybernetics.' },
    { name: 'Latina Visionary Lead', tag: 'Latina', icon: '💃', desc: 'Warm olive complexion, bold confident posture.' },
    { name: 'Afro-Descent Systems Architect', tag: 'Afro-Descent', icon: '👑', desc: 'Rich ebony radiance, striking regal features.' },
    { name: 'South Asian Quantum Specialist', tag: 'South Asian', icon: '✨', desc: 'Warm golden complexion, expressive intense eyes.' },
    { name: 'High Elven Sorceress', tag: 'Fantasy Elven', icon: '🧝‍♀️', desc: 'Ethereal luminous features, high-pointed ears.' }
  ];

  const handleSelect = (item) => {
    onChange({
      ...character,
      identity: {
        ...character.identity,
        archetype: item.name
      }
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 2 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Archetype & Heritage</h2>
        <p className="text-xs text-slate-400 mt-1">Select the foundational archetype and heritage profile for your companion.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {archetypes.map(a => {
          const isSelected = currentArchetype === a.name;
          return (
            <button
              key={a.name}
              onClick={() => handleSelect(a)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-xl glow-brand'
                  : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:bg-dark-800/80'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="w-10 h-10 rounded-xl bg-dark-800 border border-slate-700 flex items-center justify-center text-xl">
                  {a.icon}
                </div>

                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-white font-sans">{a.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{a.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
