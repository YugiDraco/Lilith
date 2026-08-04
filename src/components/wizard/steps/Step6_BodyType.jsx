import React from 'react';
import { Check } from 'lucide-react';

export default function Step6_BodyType({ character, onChange }) {
  const currentBodyType = character.appearance?.bodyType || 'Athletic';

  const bodyTypes = [
    { name: 'Petite', icon: '💃', desc: 'Slender graceful frame, delicate height.' },
    { name: 'Slim', icon: '🧘‍♀️', desc: 'Lean elegant build, long lines.' },
    { name: 'Athletic', icon: '🏃‍♀️', desc: 'Toned sculpted muscle, active posture.' },
    { name: 'Curvy', icon: '⌛', desc: 'Voluptuous hourglass curves, defined waist.' },
    { name: 'Plus Size', icon: '✨', desc: 'Full confident silhouette, soft beauty.' },
    { name: 'Tall', icon: '🦒', desc: 'Statuesque height, long slender limbs.' }
  ];

  const handleSelect = (b) => {
    onChange({
      ...character,
      appearance: {
        ...character.appearance,
        bodyType: b.name
      }
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 6 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Body Silhouette</h2>
        <p className="text-xs text-slate-400 mt-1">Select body preset cards. Detailed anatomical sliders unlock in Studio Mode.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {bodyTypes.map(b => {
          const isSelected = currentBodyType === b.name;
          return (
            <button
              key={b.name}
              onClick={() => handleSelect(b)}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-xl glow-brand'
                  : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:bg-dark-800/80'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl">{b.icon}</span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-xs text-white font-sans">{b.name}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">{b.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
