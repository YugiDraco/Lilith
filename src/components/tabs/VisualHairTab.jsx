import React from 'react';
import VisualAssetGallery from '../creator/VisualAssetGallery';
import { Palette, Scissors } from 'lucide-react';

export default function VisualHairTab({ character, onChange }) {
  const { hair = {} } = character;

  const handleSelectHairAsset = (asset) => {
    onChange({
      ...character,
      hair: {
        ...hair,
        assetId: asset.id,
        style: asset.name,
        baseColor: asset.previewColor || hair.baseColor
      }
    });
  };

  const updateHair = (field, val) => {
    onChange({
      ...character,
      hair: { ...hair, [field]: val }
    });
  };

  return (
    <div className="space-y-6">
      {/* Hair Visual Gallery */}
      <VisualAssetGallery
        category="hair"
        selectedAssetId={hair.assetId || 'hair_021'}
        onSelectAsset={handleSelectHairAsset}
        title="Visual Hairstyle Selection"
        description="Select a visual thumbnail preset below. Selecting an asset updates character hair instantly."
      />

      {/* Hair Colors, Highlights & Ombre */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-brand-cyan" /> Hair Palette & Highlights Customization
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-900/80 p-3 rounded-xl border border-slate-800">
            <label className="text-xs text-slate-400 font-medium block mb-1">Base Hair Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hair.baseColor || '#1c1917'}
                onChange={(e) => updateHair('baseColor', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
              />
              <input
                type="text"
                value={hair.baseColor || '#1c1917'}
                onChange={(e) => updateHair('baseColor', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white uppercase font-mono"
              />
            </div>
          </div>

          <div className="bg-dark-900/80 p-3 rounded-xl border border-slate-800">
            <label className="text-xs text-slate-400 font-medium block mb-1">Highlights Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hair.highlights || '#6366f1'}
                onChange={(e) => updateHair('highlights', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
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
            <label className="text-xs text-slate-400 font-medium block mb-1">Ombre Fade</label>
            <input
              type="text"
              value={hair.ombre || ''}
              onChange={(e) => updateHair('ombre', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Magenta Fade Ends"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Hair Accessories</label>
            <input
              type="text"
              value={hair.accessories || ''}
              onChange={(e) => updateHair('accessories', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Cybernetic Hair Pins"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
