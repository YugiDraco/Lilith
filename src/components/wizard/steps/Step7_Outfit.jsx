import React from 'react';
import VisualOutfitTab from '../../tabs/VisualOutfitTab';

export default function Step7_Outfit({ character, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 7 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Outfit & Apparel</h2>
        <p className="text-xs text-slate-400 mt-1">Select visual outfit cards across 10 clothing categories.</p>
      </div>

      <VisualOutfitTab character={character} onChange={onChange} />
    </div>
  );
}
