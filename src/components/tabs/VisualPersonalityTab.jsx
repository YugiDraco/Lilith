import React from 'react';
import { Sliders, Sparkles, Heart } from 'lucide-react';

export default function VisualPersonalityTab({ character, onChange }) {
  const { personality = {} } = character;

  const updatePersonality = (key, val) => {
    onChange({
      ...character,
      personality: { ...personality, [key]: val }
    });
  };

  const spectrums = [
    { key: 'kindness', label: 'Kindness & Warmth' },
    { key: 'humor', label: 'Wit & Humor' },
    { key: 'confidence', label: 'Self-Confidence' },
    { key: 'curiosity', label: 'Intellectual Curiosity' },
    { key: 'sarcasm', label: 'Sarcasm & Banter' },
    { key: 'empathy', label: 'Empathy & Sensitivity' },
    { key: 'romanticInclination', label: 'Romantic Inclination' },
    { key: 'creativity', label: 'Artistic Creativity' },
    { key: 'loyalty', label: 'Loyalty & Devotion' },
    { key: 'patience', label: 'Patience & Composure' },
    { key: 'optimism', label: 'Optimism & Outlook' },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Heart className="w-4 h-4 text-brand-accent" /> 11 Personality Spectrums
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {spectrums.map(item => {
            const val = personality[item.key] ?? 70;
            return (
              <div key={item.key} className="bg-dark-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-800 border border-slate-700 text-brand-300 font-bold">
                    {val}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) => updatePersonality(item.key, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
