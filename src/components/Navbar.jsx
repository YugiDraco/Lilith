import React from 'react';
import { ShieldCheck, Download, Upload, RotateCcw, Sparkles, LayoutGrid, SlidersHorizontal, UserCheck } from 'lucide-react';
import { CHARACTER_PRESETS } from '../data/presets';

export default function Navbar({ character, activePage, setActivePage, onSelectPreset, onExportJSON, onImportJSON, onReset }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      onImportJSON(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <header className="glass-panel sticky top-0 z-40 border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Page Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-white font-sans tracking-tight flex items-center gap-2">
                Lilith V2 <span className="text-[10px] font-semibold text-brand-400 bg-brand-500/20 px-2 py-0.5 rounded border border-brand-500/30">AI Companion</span>
              </h1>
              <p className="text-[11px] text-slate-400">AAA Game-Quality Character Platform (18+)</p>
            </div>
          </div>

          {/* View Switcher: Library vs Studio */}
          <div className="hidden sm:flex items-center bg-dark-900/90 border border-slate-800 p-1 rounded-xl gap-1">
            <button
              onClick={() => setActivePage('library')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activePage === 'library'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Library
            </button>
            <button
              onClick={() => setActivePage('studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activePage === 'studio'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Creator Studio
            </button>
          </div>
        </div>

        {/* Presets & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Selector */}
          <div className="flex items-center gap-1.5 bg-dark-800 border border-slate-700/80 rounded-xl px-2.5 py-1.5">
            <UserCheck className="w-4 h-4 text-brand-400" />
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Preset:</span>
            <select
              onChange={(e) => {
                const found = CHARACTER_PRESETS.find(p => p.id === e.target.value);
                if (found) onSelectPreset(found.data);
              }}
              className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
            >
              {CHARACTER_PRESETS.map(p => (
                <option key={p.id} value={p.id} className="bg-dark-900 text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Import JSON */}
          <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-dark-800 border border-slate-700/80 hover:border-slate-600 text-xs font-medium text-slate-300 hover:text-white transition flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-brand-400" /> Import JSON
            <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          </label>

          {/* Export JSON */}
          <button
            onClick={onExportJSON}
            className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-medium text-white transition flex items-center gap-1.5 shadow-md shadow-brand-500/20"
          >
            <Download className="w-3.5 h-3.5" /> Export JSON
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-dark-800 border border-slate-700/80 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition"
            title="Reset to Default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
