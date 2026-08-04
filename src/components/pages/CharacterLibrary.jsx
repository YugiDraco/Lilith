import React from 'react';
import { Plus, Edit3, Copy, Download, Trash2, Sparkles, ShieldCheck, Heart, User } from 'lucide-react';
import { downloadCharacterJSON } from '../../utils/jsonExporter';

export default function CharacterLibrary({ characters, activeCharacterId, onSelectCharacter, onCreateNew, onDuplicate, onDelete }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight flex items-center gap-2">
            Character Vault & Library
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your AI companions, customize anatomical presets, and launch companion studios.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-accent hover:opacity-95 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-brand-500/30"
        >
          <Plus className="w-4 h-4" /> Create New Character
        </button>
      </div>

      {/* Grid of Character Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {characters.map(char => {
          const isSelected = activeCharacterId === char.identity?.id;
          const name = char.identity?.name || 'Unnamed Character';
          const age = char.identity?.age || 24;
          const occ = char.identity?.occupation || char.identity?.archetype || 'Specialist';
          const mood = char.emotion?.currentMood || 'Focused & Confident';
          const outfitCat = char.clothing?.activeCategory || 'Casual';
          const updatedAt = char.system?.updatedAt ? new Date(char.system.updatedAt).toLocaleDateString() : 'Today';

          return (
            <div
              key={char.identity?.id || Math.random()}
              className={`glass-panel rounded-2xl p-5 border transition flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                isSelected
                  ? 'border-brand-500 ring-2 ring-brand-500/30 shadow-xl glow-brand'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Card Header & Badges */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  {/* Avatar Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white font-sans leading-tight group-hover:text-brand-300 transition">
                      {name}
                    </h3>
                    <p className="text-xs text-slate-400">{occ}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> {age} y/o (18+)
                </span>
              </div>

              {/* Status Chips */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-dark-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Mood State</span>
                  <span className="font-bold text-brand-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-accent" /> {mood}
                  </span>
                </div>
                <div className="bg-dark-900/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Active Outfit</span>
                  <span className="font-bold text-slate-200">{outfitCat}</span>
                </div>
              </div>

              {/* Tagline / Archetype */}
              <p className="text-xs text-slate-300 line-clamp-2 italic bg-dark-900/40 p-2.5 rounded-xl border border-slate-800/60">
                "{char.identity?.tagline || char.identity?.backstory || 'No tagline set.'}"
              </p>

              {/* Footer Buttons */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectCharacter(char)}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-brand-500/20"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Studio
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDuplicate(char)}
                    className="p-2 rounded-xl bg-dark-800 border border-slate-700/80 text-slate-400 hover:text-white transition"
                    title="Duplicate Character"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => downloadCharacterJSON(char, `${name.toLowerCase().replace(/\s+/g, '_')}_anatomy.json`)}
                    className="p-2 rounded-xl bg-dark-800 border border-slate-700/80 text-slate-400 hover:text-white transition"
                    title="Export JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  {characters.length > 1 && (
                    <button
                      onClick={() => onDelete(char.identity?.id)}
                      className="p-2 rounded-xl bg-dark-800 border border-slate-700/80 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition"
                      title="Delete Character"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
