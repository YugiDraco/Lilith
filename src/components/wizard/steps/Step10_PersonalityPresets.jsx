import React from 'react';
import { Heart, Check, Sparkles } from 'lucide-react';

export default function Step10_PersonalityPresets({ character, onChange }) {
  const currentArchetype = character.personality?.activePreset || 'Confident';

  const presets = [
    { name: 'Sweet', icon: '💖', desc: 'Warm, affectionate, deeply empathetic, gentle voice.', kindness: 95, confidence: 70, humor: 60, voice: 'Velvet Soft Mid-Tone' },
    { name: 'Confident', icon: '✨', desc: 'Analytical, self-assured, charismatic leader.', kindness: 70, confidence: 92, humor: 75, voice: 'Silky Alt-Contralto' },
    { name: 'Shy', icon: '🥺', desc: 'Soft-spoken, sweet, thoughtful, reserved warmth.', kindness: 88, confidence: 45, humor: 40, voice: 'Velvet Soft Mid-Tone' },
    { name: 'Playful', icon: '🎉', desc: 'Witty, energetic, spontaneous, loves banter.', kindness: 80, confidence: 85, humor: 95, voice: 'Soprano Crystal' },
    { name: 'Elegant', icon: '🍷', desc: 'Sophisticated, composed, refined taste.', kindness: 75, confidence: 90, humor: 60, voice: 'Silky Alt-Contralto' },
    { name: 'Protective', icon: '🛡️', desc: 'Fiercely loyal, reliable, supportive guardian.', kindness: 85, confidence: 88, humor: 50, voice: 'Resonant Executive Baritone' },
    { name: 'Tsundere', icon: '😏', desc: 'Feisty sarcasm hiding deep hidden warmth.', kindness: 60, confidence: 85, humor: 80, voice: 'Soprano Crystal' },
    { name: 'Kuudere', icon: '🧊', desc: 'Calm, cool, quiet intelligence, steady presence.', kindness: 65, confidence: 88, humor: 35, voice: 'Silky Alt-Contralto' },
    { name: 'Energetic', icon: '⚡', desc: 'Passionate, optimistic, vibrant enthusiasm.', kindness: 85, confidence: 80, humor: 85, voice: 'Soprano Crystal' },
    { name: 'Mature', icon: '📚', desc: 'Wise, nurturing, patient, deeply comforting.', kindness: 90, confidence: 85, humor: 65, voice: 'Silky Alt-Contralto' }
  ];

  const handleSelectPreset = (p) => {
    onChange({
      ...character,
      personality: {
        ...character.personality,
        activePreset: p.name,
        kindness: p.kindness,
        confidence: p.confidence,
        humor: p.humor
      },
      speech: {
        ...character.speech,
        voiceTone: p.voice
      }
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 10 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Companion Personality</h2>
        <p className="text-xs text-slate-400 mt-1">Select a personality archetype. Underlying spectrums & voice tone are auto-calculated.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {presets.map(p => {
          const isSelected = currentArchetype === p.name;
          return (
            <button
              key={p.name}
              onClick={() => handleSelectPreset(p)}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-xl glow-brand'
                  : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:bg-dark-800/80'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl">{p.icon}</span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-xs text-white font-sans">{p.name}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">{p.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
