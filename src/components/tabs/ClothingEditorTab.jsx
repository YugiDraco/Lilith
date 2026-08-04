import React from 'react';
import { CLOTHING_CATEGORIES } from '../../types/character';
import { Shirt, Sparkles, Palette } from 'lucide-react';

export default function ClothingEditorTab({ character, onChange }) {
  const { clothing = { activeCategory: 'Casual', outfits: {} } } = character;
  const activeCat = clothing.activeCategory || 'Casual';
  const currentOutfit = clothing.outfits?.[activeCat] || {};

  const setActiveCategory = (cat) => {
    onChange({
      ...character,
      clothing: {
        ...clothing,
        activeCategory: cat
      }
    });
  };

  const updateOutfitItem = (field, val) => {
    onChange({
      ...character,
      clothing: {
        ...clothing,
        outfits: {
          ...clothing.outfits,
          [activeCat]: {
            ...currentOutfit,
            [field]: val
          }
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Category Pills Header */}
      <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Shirt className="w-4 h-4 text-brand-500" /> Outfit Category Selector
        </h3>

        <div className="flex flex-wrap gap-2">
          {CLOTHING_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeCat === cat
                  ? 'bg-gradient-to-r from-brand-600 to-brand-accent text-white shadow-md shadow-brand-500/30'
                  : 'bg-dark-900 border border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Independent Item Editing Form */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            Editing Outfit: <span className="text-brand-400 font-extrabold">{activeCat}</span>
          </h4>
          <span className="text-[11px] text-slate-400">All items independently customizable</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Top / Shirt / Bodysuit</label>
            <input
              type="text"
              value={currentOutfit.top || ''}
              onChange={(e) => updateOutfitItem('top', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Bottom / Skirt / Pants</label>
            <input
              type="text"
              value={currentOutfit.bottom || ''}
              onChange={(e) => updateOutfitItem('bottom', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Outer Layer / Jacket / Cloak</label>
            <input
              type="text"
              value={currentOutfit.outer || ''}
              onChange={(e) => updateOutfitItem('outer', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Footwear / Boots</label>
            <input
              type="text"
              value={currentOutfit.shoes || ''}
              onChange={(e) => updateOutfitItem('shoes', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Fabric & Material Composition</label>
            <input
              type="text"
              value={currentOutfit.material || ''}
              onChange={(e) => updateOutfitItem('material', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Kevlar & Carbon Fiber"
            />
          </div>

          <div className="bg-dark-900/60 p-3 rounded-xl border border-slate-800">
            <label className="text-xs text-slate-400 font-medium block mb-1">Primary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentOutfit.primaryColor || '#1e1b4b'}
                onChange={(e) => updateOutfitItem('primaryColor', e.target.value)}
                className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={currentOutfit.primaryColor || '#1e1b4b'}
                onChange={(e) => updateOutfitItem('primaryColor', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono uppercase"
              />
            </div>
          </div>

          <div className="bg-dark-900/60 p-3 rounded-xl border border-slate-800">
            <label className="text-xs text-slate-400 font-medium block mb-1">Secondary Accent Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentOutfit.secondaryColor || '#ec4899'}
                onChange={(e) => updateOutfitItem('secondaryColor', e.target.value)}
                className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={currentOutfit.secondaryColor || '#ec4899'}
                onChange={(e) => updateOutfitItem('secondaryColor', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono uppercase"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
