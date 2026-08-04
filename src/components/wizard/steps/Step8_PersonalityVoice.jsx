import React from 'react';
import VisualPersonalityTab from '../../tabs/VisualPersonalityTab';
import { Volume2, Sparkles } from 'lucide-react';

export default function Step8_PersonalityVoice({ character, onChange }) {
  const { speech = {} } = character;

  const voices = [
    { name: 'Silky Alt-Contralto', desc: 'Warm, deep, articulate tone with quiet confidence.' },
    { name: 'Soprano Crystal', desc: 'Bright, energetic, melodious soprano pitch.' },
    { name: 'Velvet Soft Mid-Tone', desc: 'Calm, soothing, intimate conversational tone.' },
    { name: 'Resonant Executive Baritone', desc: 'Deep, authoritative, reassuring cadence.' }
  ];

  const handleSelectVoice = (voiceName) => {
    onChange({
      ...character,
      speech: {
        ...speech,
        voiceTone: voiceName
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 8 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Configure Personality & Voice Profile</h2>
        <p className="text-xs text-slate-400 mt-1">Configure your companion's core temperament, empathy, wit, and voice profile.</p>
      </div>

      {/* Voice Selection Cards */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-brand-cyan" /> Voice Profile Preset
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {voices.map(v => {
            const isSelected = speech.voiceTone === v.name;
            return (
              <button
                key={v.name}
                onClick={() => handleSelectVoice(v.name)}
                className={`p-3 rounded-xl border text-left transition ${
                  isSelected
                    ? 'bg-brand-600/20 border-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'bg-dark-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <h4 className="font-bold text-xs flex items-center justify-between">
                  {v.name}
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-brand-400" />}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{v.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Personality Spectrums */}
      <VisualPersonalityTab character={character} onChange={onChange} />
    </div>
  );
}
