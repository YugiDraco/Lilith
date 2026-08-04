import React, { useState } from 'react';
import { Smile, Sparkles, Check, ChevronDown, ChevronUp, Sliders } from 'lucide-react';

export default function VisualFaceTab({ character, onChange }) {
  const [showAdvancedSliders, setShowAdvancedSliders] = useState(false);
  const currentFaceShape = character.face?.shape || 'Oval Diamond';
  const currentRefineVibe = character.face?.aestheticVibe || 'Natural';

  const facePresets = [
    { id: 'Oval Diamond', name: 'Oval Diamond', desc: 'Symmetrical, classic golden-ratio proportions.', icon: '💎', jawline: 'Soft Curved V-Line' },
    { id: 'Heart Curved', name: 'Heart Curved', desc: 'Wider forehead, delicate chin, youthful feminine contours.', icon: '💖', jawline: 'Delicate Pointed' },
    { id: 'V-Line Sculpted', name: 'V-Line Sculpted', desc: 'Slender jawline, sharp chin, popular K-fashion aesthetic.', icon: '✨', jawline: 'Sharp V-Line' },
    { id: 'High Cheekbone Model', name: 'High Cheekbone Model', desc: 'Prominent cheekbones, editorial high-fashion bone structure.', icon: '👑', jawline: 'Chiseled Model' },
    { id: 'Square Defined', name: 'Square Defined', desc: 'Strong articulate jawline, confident commanding structure.', icon: '🏛️', jawline: 'Structured Square' },
    { id: 'Round Soft', name: 'Round Soft', desc: 'Gentle rounded cheeks, friendly approachable facial curvature.', icon: '🌸', jawline: 'Soft Rounded' },
    { id: 'Regal Classic', name: 'Regal Classic', desc: 'Aristocratic poise, refined nose bridge, timeless symmetry.', icon: '🍷', jawline: 'Sculpted Elegance' }
  ];

  const refineVibes = [
    { id: 'Cute', name: 'Cute', desc: 'Soft curves & warm eyes', icon: '😊' },
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
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-sans">
            <Smile className="w-4 h-4 text-brand-400" /> Visual Face Preset Library
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select visual face profiles or refine aesthetic vibes. Changes update the AI preview instantly.
          </p>
        </div>
      </div>

      {/* Face Presets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {facePresets.map(f => {
          const isSelected = currentFaceShape === f.id;
          return (
            <button
              key={f.id}
              onClick={() => handleSelectPreset(f)}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
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
                <h4 className="font-bold text-xs text-white font-sans">{f.name}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">{f.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Refine Face Vibes */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-sans">
          <Sparkles className="w-4 h-4 text-brand-cyan" /> Refine Facial Aesthetic Vibe
        </h4>

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

      {/* Collapsed Advanced 3D Facial Anatomy Sliders (For Power Users in Studio Mode ONLY) */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={() => setShowAdvancedSliders(!showAdvancedSliders)}
          className="w-full p-3 rounded-2xl bg-dark-900/80 hover:bg-dark-800 border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-400" /> 🔧 Advanced 3D Facial Anatomy Sliders (Studio Power Users)
          </span>
          {showAdvancedSliders ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvancedSliders && (
          <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800/80 mt-3 space-y-4 animate-fadeIn">
            <p className="text-[11px] text-slate-400">
              Low-level 3D facial bone structure parameters. These settings refine micro-anatomy in Studio Mode.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>Jaw Width</span>
                  <span>50%</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>Cheekbone Prominence</span>
                  <span>65%</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="65" className="w-full h-2" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>Chin Length & Projection</span>
                  <span>45%</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="45" className="w-full h-2" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>Nose Bridge Depth</span>
                  <span>55%</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="55" className="w-full h-2" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
