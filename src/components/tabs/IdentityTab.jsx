import React from 'react';
import { ShieldCheck, User, Sparkles, BookOpen, MessageSquare, HeartHandshake } from 'lucide-react';

export default function IdentityTab({ character, onChange }) {
  const { identity = {}, personality = {}, speech = {}, lifestyle = {}, relationships = {} } = character;

  const updateIdentity = (field, value) => {
    onChange({
      ...character,
      identity: { ...identity, [field]: value }
    });
  };

  const updatePersonality = (field, value) => {
    onChange({
      ...character,
      personality: { ...personality, [field]: value }
    });
  };

  const updateSpeech = (field, value) => {
    onChange({
      ...character,
      speech: { ...speech, [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      {/* 18+ Age & Adult Verification Status */}
      <div className="glass-card p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                18+ Adult Fictional Character Compliance
              </h4>
              <p className="text-xs text-slate-300">
                Age requirement is strictly enforced (&ge; 18 years).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Age:</span>
            <input
              type="number"
              min="18"
              max="120"
              value={identity.age || 24}
              onChange={(e) => {
                const val = Math.max(18, parseInt(e.target.value) || 18);
                updateIdentity('age', val);
              }}
              className="w-16 bg-dark-900 border border-slate-700 text-white font-bold text-center text-sm rounded-lg py-1 px-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Identity Core */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-brand-400" /> Character Core Identity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Character Full Name</label>
            <input
              type="text"
              value={identity.name || ''}
              onChange={(e) => updateIdentity('name', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Lilith Vane"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Gender Identity</label>
            <select
              value={identity.genderIdentity || 'Female'}
              onChange={(e) => updateIdentity('genderIdentity', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none cursor-pointer"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Androgynous">Androgynous</option>
              <option value="Custom">Custom / Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-400 font-medium block mb-1">Archetype & Role</label>
            <input
              type="text"
              value={identity.archetype || ''}
              onChange={(e) => updateIdentity('archetype', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Cybernetic Specialist & Operative"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-400 font-medium block mb-1">Backstory & Context</label>
            <textarea
              rows={3}
              value={identity.backstory || ''}
              onChange={(e) => updateIdentity('backstory', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-brand-500 focus:outline-none"
              placeholder="Describe character origins, motivation, and history..."
            />
          </div>
        </div>
      </div>

      {/* Personality & Speech */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personality */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-accent" /> Personality & Temperament
          </h4>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Temperament</label>
            <input
              type="text"
              value={personality.temperament || ''}
              onChange={(e) => updatePersonality('temperament', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Key Traits (Comma separated)</label>
            <input
              type="text"
              value={Array.isArray(personality.traits) ? personality.traits.join(', ') : ''}
              onChange={(e) => updatePersonality('traits', e.target.value.split(',').map(s => s.trim()))}
              className="w-full bg-dark-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Speech & Voice */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-cyan" /> Voice & Speech Dynamics
          </h4>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Voice Tone</label>
            <input
              type="text"
              value={speech.voiceTone || ''}
              onChange={(e) => updateSpeech('voiceTone', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Accent & Cadence</label>
            <input
              type="text"
              value={speech.accent || ''}
              onChange={(e) => updateSpeech('accent', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
