import React from 'react';
import { ART_STYLES } from '../../../types/character';
import { Sparkles, Check } from 'lucide-react';

export default function Step1_Style({ character, onChange }) {
  const currentStyle = character.image?.artStyle || 'Hyperrealistic Photographic';

  const styles = [
    { name: 'Hyperrealistic Photographic', desc: 'Photorealistic 8K camera detail, natural lighting, studio quality.', icon: '📸', color: '#6366f1' },
    { name: 'Cinematic 8K 3D Render', desc: 'AAA video game CG quality, dramatic rim lighting, detailed textures.', icon: '🎮', color: '#ec4899' },
    { name: 'Anime / Stylized CG', desc: 'Vibrant stylized anime rendering, expressive eyes, sleek linework.', icon: '✨', color: '#38bdf8' },
    { name: 'Dark Fantasy Oil Canvas', desc: 'Moody atmospheric fantasy artwork, painterly brushwork.', icon: '🗡️', color: '#d97706' },
    { name: 'Cyberpunk Neon Sci-Fi', desc: 'Futuristic neon aesthetics, cyan/magenta contrast, sci-fi accents.', icon: '🌆', color: '#06b6d4' }
  ];

  const handleSelectStyle = (styleName) => {
    onChange({
      ...character,
      image: {
        ...character.image,
        artStyle: styleName
      }
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 1 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Aesthetic & Art Style</h2>
        <p className="text-xs text-slate-400 mt-1">Select the overall visual fidelity and art direction for your AI companion.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {styles.map(s => {
          const isSelected = currentStyle === s.name;
          return (
            <button
              key={s.name}
              onClick={() => handleSelectStyle(s.name)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-xl glow-brand'
                  : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:bg-dark-800/80'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-slate-700/60"
                  style={{ backgroundColor: s.color }}
                >
                  {s.icon}
                </div>

                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-white font-sans">{s.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
