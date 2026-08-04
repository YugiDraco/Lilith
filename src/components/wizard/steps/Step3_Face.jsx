import React from 'react';
import { Check, Sparkles, Smile } from 'lucide-react';

export default function Step3_Face({ character, onChange }) {
  const currentFaceShape = character.face?.shape || 'Oval Diamond';
  const currentRefineVibe = character.face?.aestheticVibe || 'Natural';

  const facePresets = [
    {
      id: 'Oval Diamond',
      name: 'Oval Diamond',
      desc: 'Symmetrical, classic golden-ratio proportions with soft cheekbones.',
      icon: '💎',
      jawline: 'Soft Curved V-Line'
    },
    {
      id: 'Heart Curved',
      name: 'Heart Curved',
      desc: 'Wider forehead, delicate chin, youthful feminine contours.',
      icon: '💖',
      jawline: 'Delicate Pointed'
    },
    {
      id: 'V-Line Sculpted',
      name: 'V-Line Sculpted',
      desc: 'Slender jawline, sharp chin, popular K-fashion aesthetic.',
      icon: '✨',
      jawline: 'Sharp V-Line'
    },
    {
      id: 'High Cheekbone Model',
      name: 'High Cheekbone Model',
      desc: 'Prominent cheekbones, editorial high-fashion bone structure.',
      icon: '👑',
      jawline: 'Chiseled Model'
    },
    {
      id: 'Square Defined',
      name: 'Square Defined',
      desc: 'Strong articulate jawline, confident commanding structure.',
      icon: '🏛️',
      jawline: 'Structured Square'
    },
    {
      id: 'Round Soft',
      name: 'Round Soft',
      desc: 'Gentle rounded cheeks, friendly approachable facial curvature.',
      icon: '🌸',
      jawline: 'Soft Rounded'
    },
    {
      id: 'Regal Classic',
      name: 'Regal Classic',
      desc: 'Aristocratic poise, refined nose bridge, timeless symmetry.',
      icon: '🍷',
      jawline: 'Sculpted Elegance'
    }
  ];

  const refineVibes = [
    { id: 'Cute', name: 'Cute', desc: 'Soft curves, rounded chin & warm eyes', icon: '😊' },
    { id: 'Elegant', name: 'Elegant', desc: 'Refined cheekbones & classic poise', icon: '✨' },
    { id: 'Mature', name: 'Mature', desc: 'Articulate jaw & confident gaze', icon: '📚' },
    { id: 'Youthful', name: 'Youthful', desc: 'Soft features & bright eyes', icon: '🌟' },
    { id: 'Sharp Features', name: 'Sharp Features', desc: 'Defined jawline & high cheekbones', icon: '⚡' },
    { id: 'Soft Features', name: 'Soft Features', desc: 'Smooth contours & delicate chin', icon: '☁️' },
    { id: 'Natural', name: 'Natural', desc: 'Balanced golden ratio', icon: '🌿' },
    { id: 'Model-like', name: 'Model-like', desc: 'Editorial high-fashion symmetry', icon: '💄' }
  ];

  const handleSelectPreset = (preset) => {
    onChange({
      ...character,
      face: {
        ...character.face,
        shape: preset.id,
        jawline: preset.jawline
      }
    });
  };

  const handleSelectVibe = (vibe) => {
    onChange({
      ...character,
      face: {
        ...character.face,
        aestheticVibe: vibe.id
      }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 7 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Facial Structure</h2>
        <p className="text-xs text-slate-400 mt-1">Select a visual face preset. Preview updates immediately without technical sliders.</p>
      </div>

      {/* Visual Face Presets Library */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-sans">
          <Smile className="w-4 h-4 text-brand-400" /> Face Structure Presets
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {facePresets.map(f => {
            const isSelected = currentFaceShape === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleSelectPreset(f)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 group ${
                  isSelected
                    ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-xl glow-brand'
                    : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:bg-dark-800/80'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{f.icon}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-xs text-white font-sans flex items-center gap-1">
                    {f.name} {isSelected && <Sparkles className="w-3 h-3 text-brand-accent" />}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">{f.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* High-Level Refine Face Vibe Selectors */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-sans">
            <Sparkles className="w-4 h-4 text-brand-cyan" /> Refine Facial Aesthetic Vibe (Optional)
          </h3>
          <span className="text-[10px] font-mono text-brand-300 font-bold">{currentRefineVibe}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {refineVibes.map(v => {
            const isSelected = currentRefineVibe === v.id;
            return (
              <button
                key={v.id}
                onClick={() => handleSelectVibe(v)}
                className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-500 text-white shadow-md'
                    : 'bg-dark-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <span className="text-lg">{v.icon}</span>
                <div className="truncate">
                  <span className="text-xs font-bold block truncate leading-tight">{v.name}</span>
                  <span className="text-[9px] text-slate-400 block truncate">{v.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
