import React from 'react';
import { Glasses, Watch, ShoppingBag, Sparkles } from 'lucide-react';

export default function AccessoriesEditorTab({ character, onChange }) {
  const { accessories = {} } = character;

  const updateAccessory = (field, val) => {
    onChange({
      ...character,
      accessories: { ...accessories, [field]: val }
    });
  };

  const fields = [
    { key: 'glasses', label: 'Glasses / Eyewear', icon: Glasses, placeholder: 'e.g. Cyberpunk HUD Visor' },
    { key: 'earrings', label: 'Earrings / Piercings', icon: Sparkles, placeholder: 'e.g. Silver Geometric Drops' },
    { key: 'necklaces', label: 'Necklaces & Chokers', icon: Sparkles, placeholder: 'e.g. Choker with Pendant' },
    { key: 'watches', label: 'Watches / Chronographs', icon: Watch, placeholder: 'e.g. Smart Chronograph' },
    { key: 'bracelets', label: 'Bracelets / Bangles', icon: Sparkles, placeholder: 'e.g. Titanium Bangle' },
    { key: 'rings', label: 'Rings', icon: Sparkles, placeholder: 'e.g. Onyx Solitaire Ring' },
    { key: 'hats', label: 'Hats & Headwear', icon: Sparkles, placeholder: 'e.g. Beret or Helmet' },
    { key: 'bags', label: 'Bags & Tactical Gear', icon: ShoppingBag, placeholder: 'e.g. Tactical Holster Bag' }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-400" /> Character Accessories & Gear
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fields.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.key} className="bg-dark-900/60 p-3 rounded-xl border border-slate-800">
                <label className="text-xs text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-brand-400" /> {f.label}
                </label>
                <input
                  type="text"
                  value={accessories[f.key] || ''}
                  onChange={(e) => updateAccessory(f.key, e.target.value)}
                  className="w-full bg-dark-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                  placeholder={f.placeholder}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
