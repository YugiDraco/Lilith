import React, { useState } from 'react';
import { MemoryEngine } from '../../engines/MemoryEngine';
import { BookOpen, Search, Pin, Plus, Calendar, Tag } from 'lucide-react';

export default function MemoryStudioTab({ character, onChange }) {
  const [activeTier, setActiveTier] = useState('all'); // all, permanent, longTerm, pinned, recent
  const [query, setQuery] = useState('');
  const [newMemoryText, setNewMemoryText] = useState('');
  const [selectedAddTier, setSelectedAddTier] = useState('recent');

  const engine = new MemoryEngine(character.memories || {});
  const filtered = engine.search(query, activeTier);

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;
    const updatedMemories = engine.addMemory(newMemoryText.trim(), selectedAddTier);
    onChange({
      ...character,
      memories: updatedMemories
    });
    setNewMemoryText('');
  };

  const renderMemoryCard = (mem, tierLabel, badgeColor) => (
    <div key={mem.id} className="bg-dark-900/90 p-3.5 rounded-xl border border-slate-800 space-y-1.5 hover:border-slate-700 transition">
      <div className="flex justify-between items-center">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${badgeColor}`}>
          {tierLabel}
        </span>
        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
          <Calendar className="w-3 h-3 text-slate-500" /> {mem.timestamp || '2026-08-04'}
        </span>
      </div>
      <p className="text-xs text-slate-200 font-sans leading-relaxed">{mem.content}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header & Memory Search */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-400" /> Memory Engine Studio
            </h3>
            <p className="text-xs text-slate-400">Search and manage permanent, long-term, pinned, and recent memories.</p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search memories..."
              className="bg-dark-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none w-48"
            />
          </div>
        </div>

        {/* Tier Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'permanent', 'longTerm', 'pinned', 'recent'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTier(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                activeTier === t
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'bg-dark-900/80 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Memory Form */}
      <form onSubmit={handleAddMemory} className="glass-card p-4 rounded-2xl border border-slate-800 flex gap-2 items-center">
        <input
          type="text"
          value={newMemoryText}
          onChange={(e) => setNewMemoryText(e.target.value)}
          placeholder="Record a new memory or event milestone..."
          className="flex-1 bg-dark-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
        />
        <select
          value={selectedAddTier}
          onChange={(e) => setSelectedAddTier(e.target.value)}
          className="bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none cursor-pointer"
        >
          <option value="recent">Recent</option>
          <option value="pinned">Pinned</option>
          <option value="longTerm">Long Term</option>
          <option value="permanent">Permanent</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-3.5 h-3.5" /> Save Memory
        </button>
      </form>

      {/* Memory Cards Display */}
      <div className="space-y-4">
        {filtered.pinned.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Pin className="w-3.5 h-3.5" /> Pinned Memories
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.pinned.map(m => renderMemoryCard(m, 'Pinned', 'bg-amber-500/20 text-amber-300 border border-amber-500/30'))}
            </div>
          </div>
        )}

        {filtered.permanent.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Permanent Core Memories</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.permanent.map(m => renderMemoryCard(m, 'Permanent', 'bg-purple-500/20 text-purple-300 border border-purple-500/30'))}
            </div>
          </div>
        )}

        {filtered.longTerm.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider">Long-Term Memory Vault</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.longTerm.map(m => renderMemoryCard(m, 'Long Term', 'bg-brand-500/20 text-brand-300 border border-brand-500/30'))}
            </div>
          </div>
        )}

        {filtered.recent.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Recent Interactions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.recent.map(m => renderMemoryCard(m, 'Recent', 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
