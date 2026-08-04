import React from 'react';
import IdentityTab from '../../tabs/IdentityTab';
import MemoryStudioTab from '../../tabs/MemoryStudioTab';

export default function Step9_StoryMemory({ character, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 9 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Identity, Backstory & Memory Engine</h2>
        <p className="text-xs text-slate-400 mt-1">Set your companion's name, age (18+), occupation, backstory, and initial memories.</p>
      </div>

      <IdentityTab character={character} onChange={onChange} />
      <MemoryStudioTab character={character} onChange={onChange} />
    </div>
  );
}
