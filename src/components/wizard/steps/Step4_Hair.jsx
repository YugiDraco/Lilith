import React from 'react';
import VisualHairTab from '../../tabs/VisualHairTab';

export default function Step4_Hair({ character, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 4 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Hairstyle & Colors</h2>
        <p className="text-xs text-slate-400 mt-1">Select hairstyle thumbnails and customize base, highlight, and ombre colors.</p>
      </div>

      <VisualHairTab character={character} onChange={onChange} />
    </div>
  );
}
