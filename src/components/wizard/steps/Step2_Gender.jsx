import React from 'react';
import { Check } from 'lucide-react';

export default function Step2_Gender({ character, onChange }) {
  const currentGender = character.identity?.genderIdentity || 'Female';

  const genders = [
    { name: 'Female', icon: '👩', desc: 'Feminine presentation, graceful posture, elegant contours.' },
    { name: 'Male', icon: '👨', desc: 'Masculine presentation, broad shoulders, structured jawline.' },
    { name: 'Non-binary', icon: '🧑', desc: 'Androgynous presentation, balanced fluid features.' }
  ];

  const handleSelect = (genderName) => {
    onChange({
      ...character,
      identity: {
        ...character.identity,
        genderIdentity: genderName
      }
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 2 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Gender Identity</h2>
        <p className="text-xs text-slate-400 mt-1">Select your companion's presentation and gender identity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {genders.map(g => {
          const isSelected = currentGender === g.name;
          return (
            <button
              key={g.name}
              onClick={() => handleSelect(g.name)}
              className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-xl glow-brand'
                  : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:bg-dark-800/80'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-3xl">{g.icon}</span>
                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-base text-white font-sans">{g.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{g.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
