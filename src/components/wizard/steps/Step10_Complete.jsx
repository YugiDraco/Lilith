import React from 'react';
import { MessageSquare, Image, Video, Sparkles, Heart, ShieldCheck, ArrowRight, Brain } from 'lucide-react';

export default function Step10_Complete({ character, onStartChat, onOpenImageStudio, onOpenVideoStudio }) {
  const name = character.identity?.name || 'Lilith Vane';
  const archetype = character.identity?.archetype || 'Quantum Specialist';
  const age = character.identity?.age || 24;

  return (
    <div className="space-y-6 text-center py-4 animate-fadeIn">
      {/* Sparkle Badge */}
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center text-white shadow-2xl shadow-brand-500/40 glow-brand mx-auto">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 inline-flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Identity Locked & Saved
        </span>
        <h2 className="text-3xl font-extrabold text-white font-sans tracking-tight">
          Meet {name}
        </h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
          Your companion is online and ready to communicate. Memory Engine, Emotion Matrix, and Relationship progression are active.
        </p>
      </div>

      {/* Primary Action Button: Start Conversation Immediately */}
      <div className="max-w-md mx-auto space-y-3 pt-2">
        <button
          onClick={onStartChat}
          className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-brand-600 via-brand-500 to-brand-accent text-white shadow-xl shadow-brand-500/30 hover:opacity-95 transition flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-5 h-5" /> Start Conversation with {name} <ArrowRight className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenImageStudio}
            className="p-3.5 rounded-2xl bg-dark-900/90 hover:bg-dark-800 border border-slate-800 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <Image className="w-4 h-4 text-brand-cyan" /> Image Studio
          </button>

          <button
            onClick={onOpenVideoStudio}
            className="p-3.5 rounded-2xl bg-dark-900/90 hover:bg-dark-800 border border-slate-800 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4 text-rose-400" /> Video Studio
          </button>
        </div>
      </div>
    </div>
  );
}
