import React from 'react';
import { Sparkles, Palette } from 'lucide-react';

export default function SkinEditorTab({ character, onChange }) {
  const { skin = {} } = character;

  const updateSkin = (field, val) => {
    onChange({
      ...character,
      skin: { ...skin, [field]: val }
    });
  };

  const presetTones = [
    { label: 'Porcelain', code: '#fef08a' },
    { label: 'Warm Beige', code: '#fcd34d' },
    { label: 'Golden Olive', code: '#d97706' },
    { label: 'Bronze', code: '#92400e' },
    { label: 'Deep Mocha', code: '#451a03' },
  ];

  return (
    <div className="space-y-6">
      {/* Skin Tone & Undertone */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-brand-400" /> Skin Tone & Undertone Palette
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-dark-900/60 p-3.5 rounded-xl border border-slate-800">
            <label className="text-xs text-slate-400 font-medium block mb-1">Base Skin Tone</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="color"
                value={skin.tone || '#fcd34d'}
                onChange={(e) => updateSkin('tone', e.target.value)}
                className="w-10 h-10 rounded border-none cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={skin.tone || '#fcd34d'}
                onChange={(e) => updateSkin('tone', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase font-mono"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {presetTones.map(t => (
                <button
                  key={t.code}
                  onClick={() => updateSkin('tone', t.code)}
                  className="w-6 h-6 rounded-full border border-slate-600 shadow-sm hover:scale-110 transition"
                  style={{ backgroundColor: t.code }}
                  title={t.label}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Undertone</label>
            <select
              value={skin.undertone || 'Warm Golden-Olive'}
              onChange={(e) => updateSkin('undertone', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer"
            >
              <option value="Warm Golden-Olive">Warm Golden-Olive</option>
              <option value="Cool Rosy Pink">Cool Rosy Pink</option>
              <option value="Neutral Beige">Neutral Beige</option>
              <option value="Deep Red undertone">Deep Red undertone</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Makeup Palette</label>
            <input
              type="text"
              value={skin.makeup || 'Smokey Eyeliner & Rose Gloss'}
              onChange={(e) => updateSkin('makeup', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Marks, Scars & Tattoos */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-accent" /> Tattoos, Scars & Special Marks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Tattoos & Body Art</label>
            <input
              type="text"
              value={skin.tattoos || ''}
              onChange={(e) => updateSkin('tattoos', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Bionic Circuitry Pattern on Right Arm"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Scars</label>
            <input
              type="text"
              value={skin.scars || ''}
              onChange={(e) => updateSkin('scars', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Minor Faint Shoulder Line Scar"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Freckles & Beauty Marks</label>
            <input
              type="text"
              value={skin.freckles || ''}
              onChange={(e) => updateSkin('freckles', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Subtle Nose Bridge Freckles"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
