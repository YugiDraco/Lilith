import React from 'react';
import BodyEditorTab from '../../tabs/BodyEditorTab';

export default function Step6_Body({ character, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 6 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Body Type & Proportions</h2>
        <p className="text-xs text-slate-400 mt-1">Select body build presets and fine-tune anatomical proportion sliders.</p>
      </div>

      <BodyEditorTab character={character} onChange={onChange} />
    </div>
  );
}
