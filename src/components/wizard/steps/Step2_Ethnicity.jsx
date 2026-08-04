import React from 'react';
import { Check } from 'lucide-react';

export default function Step2_Ethnicity({ character, onChange }) {
  const currentArchetype = character.identity?.archetype || 'Indian Quantum Specialist';

  const ethnicities = [
    { name: 'Indian Quantum Specialist', tag: 'Indian', icon: '🇮🇳', tone: '#b45309', desc: 'Warm golden-bronze complexion, expressive eyes.' },
    { name: 'Japanese Cyber Specialist', tag: 'Japanese', icon: '🇯🇵', tone: '#fef08a', desc: 'Sleek dark hair, Neo-Tokyo high-tech aesthetic.' },
    { name: 'Korean Creative Lead', tag: 'Korean', icon: '🇰🇷', tone: '#fcd34d', desc: 'Radiant porcelain skin, modern K-fashion.' },
    { name: 'Chinese Systems Architect', tag: 'Chinese', icon: '🇨🇳', tone: '#fde047', desc: 'Elegant features, sophisticated technical cadence.' },
    { name: 'Latina Visionary Leader', tag: 'Latina', icon: '💃', tone: '#d97706', desc: 'Warm olive tone, confident magnetic posture.' },
    { name: 'Afro-Descent Architect', tag: 'Black', icon: '👑', tone: '#451a03', desc: 'Rich ebony radiance, striking regal bone structure.' },
    { name: 'Middle Eastern Scholar', tag: 'Middle Eastern', icon: '✨', tone: '#92400e', desc: 'Warm amber eyes, refined expressive features.' },
    { name: 'European Executive Lead', tag: 'European', icon: '🏛️', tone: '#fef08a', desc: 'Classic features, transatlantic articulate tone.' },
    { name: 'Mixed Heritage Specialist', tag: 'Mixed', icon: '🌐', tone: '#eab308', desc: 'Harmonious blend of global features.' }
  ];

  const handleSelect = (item) => {
    onChange({
      ...character,
      identity: {
        ...character.identity,
        archetype: item.name
      },
      skin: {
        ...character.skin,
        tone: item.tone,
        undertone: item.tag
      }
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 4 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Ethnicity & Heritage</h2>
        <p className="text-xs text-slate-400 mt-1">Select your companion's heritage profile. Preview updates skin tone and identity locks immediately.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ethnicities.map(e => {
          const isSelected = currentArchetype === e.name;
          return (
            <button
              key={e.name}
              onClick={() => handleSelect(e)}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-xl glow-brand'
                  : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:bg-dark-800/80'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl">{e.icon}</span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-xs text-white font-sans">{e.tag}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">{e.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
