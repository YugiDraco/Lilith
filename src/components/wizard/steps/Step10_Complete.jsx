import React from 'react';
import { Sparkles, MessageSquare, Image, Video, Download, ShieldCheck, Heart } from 'lucide-react';
import { downloadCharacterJSON } from '../../../utils/jsonExporter';

export default function Step10_Complete({ character, onStartChat, onOpenImageStudio, onOpenVideoStudio }) {
  const name = character.identity?.name || 'Lilith Vane';
  const mood = character.emotion?.currentMood || 'Focused & Confident';
  const relStatus = character.relationship?.status || 'Trusted Companion';

  return (
    <div className="space-y-6 text-center py-4 animate-fadeIn">
      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center text-white mx-auto shadow-xl shadow-brand-500/30 glow-brand">
        <Sparkles className="w-8 h-8" />
      </div>

      <div>
        <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block font-sans">Step 10 of 10 &bull; Companion Ready</span>
        <h2 className="text-3xl font-extrabold text-white font-sans tracking-tight mt-1">
          {name} Is Fully Created!
        </h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
          Your AI companion identity, body proportions, visual outfit, voice profile, memory engine, and emotion matrix are active and persistent.
        </p>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-2 gap-3 text-left max-w-md mx-auto text-xs">
        <div className="bg-dark-900/90 p-3 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Current Mood</span>
          <span className="font-bold text-brand-400 flex items-center gap-1.5 mt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" /> {mood}
          </span>
        </div>

        <div className="bg-dark-900/90 p-3 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Relationship</span>
          <span className="font-bold text-pink-300 flex items-center gap-1.5 mt-0.5">
            <Heart className="w-3.5 h-3.5 text-pink-400" /> {relStatus}
          </span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3 max-w-md mx-auto pt-2">
        <button
          onClick={onStartChat}
          className="w-full py-3.5 px-5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-brand-600 via-brand-500 to-brand-accent text-white shadow-xl shadow-brand-500/30 hover:opacity-95 transition flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-5 h-5" /> Launch Companion Chat
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenImageStudio}
            className="py-2.5 px-4 rounded-xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-xs font-bold text-white transition flex items-center justify-center gap-2"
          >
            <Image className="w-4 h-4 text-brand-cyan" /> Image Studio
          </button>

          <button
            onClick={onOpenVideoStudio}
            className="py-2.5 px-4 rounded-xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-xs font-bold text-white transition flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4 text-brand-accent" /> Video Studio
          </button>
        </div>

        <button
          onClick={() => downloadCharacterJSON(character, `${name.toLowerCase().replace(/\s+/g, '_')}_anatomy.json`)}
          className="w-full py-2 px-4 rounded-xl bg-dark-900 border border-slate-800 text-xs font-medium text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" /> Export Structured JSON
        </button>
      </div>
    </div>
  );
}
