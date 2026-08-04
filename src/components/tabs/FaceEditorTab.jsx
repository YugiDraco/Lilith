import React from 'react';
import { Smile, Eye, Sparkles } from 'lucide-react';

export default function FaceEditorTab({ character, onChange }) {
  const { face = {} } = character;

  const updateFace = (field, val) => {
    onChange({
      ...character,
      face: { ...face, [field]: val }
    });
  };

  const updateNose = (field, val) => {
    onChange({
      ...character,
      face: {
        ...face,
        nose: { ...(face.nose || {}), [field]: val }
      }
    });
  };

  const updateLips = (field, val) => {
    onChange({
      ...character,
      face: {
        ...face,
        lips: { ...(face.lips || {}), [field]: val }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Face Structure */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Smile className="w-4 h-4 text-brand-accent" /> Facial Structure & Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Face Shape</label>
            <select
              value={face.shape || 'Oval Diamond'}
              onChange={(e) => updateFace('shape', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer"
            >
              <option value="Oval Diamond">Oval Diamond</option>
              <option value="Heart Elegant">Heart Elegant</option>
              <option value="Square Chiseled">Square Chiseled</option>
              <option value="Round Soft">Round Soft</option>
              <option value="Elven V-Line">Elven V-Line</option>
            </select>
          </div>

          <div className="bg-dark-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-200">Jawline Sharpness</span>
              <span className="text-xs font-mono text-brand-400 font-bold">{face.jawline || 50}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={face.jawline || 50}
              onChange={(e) => updateFace('jawline', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-dark-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-200">Cheekbones Height</span>
              <span className="text-xs font-mono text-brand-400 font-bold">{face.cheekbones || 50}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={face.cheekbones || 50}
              onChange={(e) => updateFace('cheekbones', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-dark-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-200">Chin Definition</span>
              <span className="text-xs font-mono text-brand-400 font-bold">{face.chin || 50}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={face.chin || 50}
              onChange={(e) => updateFace('chin', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Eyes & Eyebrows */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Eye className="w-4 h-4 text-brand-cyan" /> Eyes, Eyebrows & Eyelashes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Eye Shape</label>
            <input
              type="text"
              value={face.eyeShape || 'Almond Cat-Eye'}
              onChange={(e) => updateFace('eyeShape', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Eye Iris Color</label>
            <input
              type="text"
              value={face.eyeColor || 'Iridescent Emerald Green'}
              onChange={(e) => updateFace('eyeColor', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Eyebrows Style</label>
            <input
              type="text"
              value={face.eyebrows || 'Arch Defined Dark Brown'}
              onChange={(e) => updateFace('eyebrows', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Eyelashes</label>
            <input
              type="text"
              value={face.eyelashes || 'Dense Volumized Dark'}
              onChange={(e) => updateFace('eyelashes', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Ear Profile</label>
            <input
              type="text"
              value={face.ears || 'Standard Pierced'}
              onChange={(e) => updateFace('ears', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Nose, Lips, Teeth & Smile */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-400" /> Nose, Lips, Teeth & Expression
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Nose Tip Shape</label>
            <input
              type="text"
              value={face.nose?.tipShape || 'Button Defined'}
              onChange={(e) => updateNose('tipShape', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="bg-dark-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-200">Lips Fullness</span>
              <span className="text-xs font-mono text-brand-400 font-bold">{face.lips?.fullness || 60}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={face.lips?.fullness || 60}
              onChange={(e) => updateLips('fullness', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Teeth</label>
            <input
              type="text"
              value={face.teeth || 'Aligned White'}
              onChange={(e) => updateFace('teeth', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Default Smile / Expression</label>
            <input
              type="text"
              value={face.smile || 'Confident Smirk'}
              onChange={(e) => updateFace('smile', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
