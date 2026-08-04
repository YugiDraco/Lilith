import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function Step1_Style({ character, onChange }) {
  const currentStyle = character.image?.artStyle || 'Hyperrealistic Photographic';

  const styles = [
    {
      id: 'Hyperrealistic Photographic',
      name: 'Photorealistic',
      desc: 'Studio lighting, depth of field, natural skin texture & realistic details.',
      badge: 'Realistic',
      icon: '📸'
    },
    {
      id: 'Anime / Stylized CG',
      name: 'Anime & CG',
      desc: 'Vibrant stylized aesthetics, expressive eyes & smooth cel shading.',
      badge: 'Anime',
      icon: '✨'
    },
    {
      id: 'Cyberpunk Neon Sci-Fi',
      name: 'Cyberpunk',
      desc: 'High-tech neon rim lighting, futuristic gear & dark urban backdrop.',
      badge: 'Cyberpunk',
      icon: '🌆'
    },
    {
      id: 'Dark Fantasy Oil Canvas',
      name: 'Dark Fantasy',
      desc: 'Rich oil-painted textures, dramatic lighting & ethereal atmosphere.',
      badge: 'Fantasy',
      icon: '🔮'
    }
  ];

  const handleSelectStyle = (styleObj) => {
    // Generate new random seed on style change for instant fresh companion preview
    const newSeed = Math.floor(Math.random() * 9000000) + 1000000;
    onChange({
      ...character,
      image: {
        ...character.image,
        artStyle: styleObj.id,
        seed: newSeed
      }
    });
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 1 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Art & Visual Style</h2>
        <p className="text-xs text-slate-400 mt-1">Select a visual aesthetic. Your companion is generated immediately.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {styles.map(s => {
          const isSelected = currentStyle === s.id;
          return (
            <button
              key={s.id}
              onClick={() => handleSelectStyle(s)}
              className={`p-5 rounded-3xl border text-left transition flex flex-col justify-between space-y-3 group ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-xl glow-brand'
                  : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:bg-dark-800/80'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-3xl">{s.icon}</span>
                {isSelected ? (
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-brand-400 uppercase tracking-wider">
                    {s.badge}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-white font-sans flex items-center gap-1.5">
                  {s.name} {isSelected && <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
