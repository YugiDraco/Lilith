import React from 'react';
import { Scissors, Palette } from 'lucide-react';

export default function HairEditorTab({ character, onChange }) {
  const { hair = {} } = character;

  const updateHair = (field, val) => {
    onChange({
      ...character,
      hair: { ...hair, [field]: val }
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Scissors className="w-4 h-4 text-brand-accent" /> Hairstyle & Length Controls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Hair Length</label>
            <select
              value={hair.length || 'Long Waist-Length'}
              onChange={(e) => updateHair('length', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer"
            >
              <option value="Pixie / Buzz Short">Pixie / Buzz Short</option>
              <option value="Chin-Length Bob">Chin-Length Bob</option>
              <option value="Shoulder Medium">Shoulder Medium</option>
              <option value="Long Waist-Length">Long Waist-Length</option>
              <option value="Ultra-Long Knees">Ultra-Long Knees</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Hair Style Preset</label>
            <input
              type="text"
              value={hair.style || ''}
              onChange={(e) => updateHair('style', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Sleek Straight with Front Bangs"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Hair Texture</label>
            <select
              value={hair.texture || 'Silky Straight'}
              onChange={(e) => updateHair('texture', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer"
            >
              <option value="Silky Straight">Silky Straight</option>
              <option value="Soft Waves">Soft Waves</option>
              <option value="Beach Curly">Beach Curly</option>
              <option value="Coiled Afros">Coiled Afros</option>
              <option value="Braided Cornrows">Braided Cornrows</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hair Colors, Highlights & Ombre */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-brand-cyan" /> Hair Palette, Highlights & Ombre
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-900/60 p-3 rounded-xl border border-slate-800">
            <label className="text-xs text-slate-400 font-medium block mb-1">Base Hair Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hair.baseColor || '#1c1917'}
                onChange={(e) => updateHair('baseColor', e.target.value)}
                className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={hair.baseColor || '#1c1917'}
                onChange={(e) => updateHair('baseColor', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white uppercase font-mono"
              />
            </div>
          </div>

          <div className="bg-dark-900/60 p-3 rounded-xl border border-slate-800">
            <label className="text-xs text-slate-400 font-medium block mb-1">Highlights Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hair.highlights || '#6366f1'}
                onChange={(e) => updateHair('highlights', e.target.value)}
                className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={hair.highlights || '#6366f1'}
                onChange={(e) => updateHair('highlights', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white uppercase font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Ombre / Gradient</label>
            <input
              type="text"
              value={hair.ombre || 'Magenta Fade Ends'}
              onChange={(e) => updateHair('ombre', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Hair Accessories</label>
            <input
              type="text"
              value={hair.accessories || 'Cybernetic Hair Pins'}
              onChange={(e) => updateHair('accessories', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
