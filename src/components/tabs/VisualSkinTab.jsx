import React from 'react';
import VisualAssetGallery from '../creator/VisualAssetGallery';
import { Sparkles, Palette } from 'lucide-react';

export default function VisualSkinTab({ character, onChange }) {
  const { skin = {} } = character;

  const handleSelectSkinAsset = (asset) => {
    onChange({
      ...character,
      skin: {
        ...skin,
        assetId: asset.id,
        tone: asset.previewColor || skin.tone,
        undertone: asset.name
      }
    });
  };

  const updateSkin = (field, val) => {
    onChange({
      ...character,
      skin: { ...skin, [field]: val }
    });
  };

  return (
    <div className="space-y-6">
      {/* Skin Tone Visual Gallery */}
      <VisualAssetGallery
        category="skin"
        selectedAssetId={skin.assetId || 'skin_beige_01'}
        onSelectAsset={handleSelectSkinAsset}
        title="Skin Tone & Radiance Swatches"
        description="Select skin tone presets visually."
      />

      {/* Tattoos, Scars & Special Marks */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
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

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Makeup Palette</label>
            <input
              type="text"
              value={skin.makeup || ''}
              onChange={(e) => updateSkin('makeup', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Smokey Eyeliner & Rose Gloss"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
