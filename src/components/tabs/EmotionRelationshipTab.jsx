import React from 'react';
import { EmotionEngine } from '../../engines/EmotionEngine';
import { RelationshipEngine } from '../../engines/RelationshipEngine';
import { Sparkles, Heart, Activity, ShieldCheck } from 'lucide-react';

export default function EmotionRelationshipTab({ character, onChange }) {
  const emotionEng = new EmotionEngine(character.emotion || {});
  const relEng = new RelationshipEngine(character.relationship || {});

  const updateEmotion = (dim, delta) => {
    const updated = emotionEng.adjust(dim, delta);
    onChange({
      ...character,
      emotion: updated
    });
  };

  const updateRelationship = (metric, delta) => {
    const updated = relEng.adjust(metric, delta);
    onChange({
      ...character,
      relationship: updated
    });
  };

  const emotionsList = [
    { key: 'happy', label: 'Happiness' },
    { key: 'sad', label: 'Sadness' },
    { key: 'lonely', label: 'Loneliness' },
    { key: 'stress', label: 'Stress Level' },
    { key: 'confidence', label: 'Self-Confidence' },
    { key: 'energy', label: 'Vitality & Energy' },
    { key: 'excitement', label: 'Excitement' },
    { key: 'curiosity', label: 'Curiosity' },
    { key: 'embarrassment', label: 'Embarrassment' }
  ];

  const metricsList = [
    { key: 'trust', label: 'Trust' },
    { key: 'affection', label: 'Affection' },
    { key: 'comfort', label: 'Comfort' },
    { key: 'friendship', label: 'Friendship' },
    { key: 'respect', label: 'Respect' },
    { key: 'attachment', label: 'Attachment' }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Status Banner */}
      <div className="glass-card p-5 rounded-2xl border border-brand-500/30 bg-brand-500/5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-brand-500/20 text-brand-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Computed Mood State</span>
            <h4 className="text-lg font-bold text-white font-sans">{emotionEng.currentMood}</h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Relationship Status</span>
            <h4 className="text-lg font-bold text-white font-sans">{relEng.status}</h4>
          </div>
        </div>
      </div>

      {/* Emotion Engine Matrix (9 Dimensions) */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-500" /> Emotion Engine Matrix (9 Dimensions)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emotionsList.map(e => {
            const val = emotionEng[e.key] ?? 50;
            return (
              <div key={e.key} className="bg-dark-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">{e.label}</span>
                  <span className="font-mono font-bold text-brand-400">{val}%</span>
                </div>
                <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-brand-500 to-brand-accent h-full transition-all duration-300"
                    style={{ width: `${val}%` }}
                  />
                </div>
                <div className="flex justify-between gap-1 pt-1">
                  <button
                    onClick={() => updateEmotion(e.key, -10)}
                    className="px-2 py-0.5 rounded bg-dark-800 text-[10px] text-slate-400 hover:text-white"
                  >
                    -10
                  </button>
                  <button
                    onClick={() => updateEmotion(e.key, +10)}
                    className="px-2 py-0.5 rounded bg-dark-800 text-[10px] text-brand-300 hover:text-white"
                  >
                    +10
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Relationship Engine Metrics (6 Dimensions) */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-400" /> Relationship Engine Matrix (6 Metrics)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metricsList.map(m => {
            const val = relEng[m.key] ?? 70;
            return (
              <div key={m.key} className="bg-dark-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">{m.label}</span>
                  <span className="font-mono font-bold text-pink-400">{val}%</span>
                </div>
                <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-300"
                    style={{ width: `${val}%` }}
                  />
                </div>
                <div className="flex justify-between gap-1 pt-1">
                  <button
                    onClick={() => updateRelationship(m.key, -10)}
                    className="px-2 py-0.5 rounded bg-dark-800 text-[10px] text-slate-400 hover:text-white"
                  >
                    -10
                  </button>
                  <button
                    onClick={() => updateRelationship(m.key, +10)}
                    className="px-2 py-0.5 rounded bg-dark-800 text-[10px] text-pink-300 hover:text-white"
                  >
                    +10
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
