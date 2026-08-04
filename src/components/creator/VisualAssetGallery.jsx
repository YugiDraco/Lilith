import React from 'react';
import { useAssetLibrary } from '../../hooks/useAssetLibrary';
import { Search, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function VisualAssetGallery({ category, selectedAssetId, onSelectAsset, title, description }) {
  const { assets, searchTerm, setSearchTerm, activeTag, setActiveTag, allTags } = useAssetLibrary(category);

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-sans">
            <Sparkles className="w-4 h-4 text-brand-400" /> {title || `${category} Visual Gallery`}
          </h3>
          <p className="text-xs text-slate-400">{description || `Select a visual ${category} preset thumbnail below`}</p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${category}...`}
            className="bg-dark-900 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none w-48"
          />
        </div>
      </div>

      {/* Filter Tags */}
      {allTags.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition ${
                activeTag === tag
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30'
                  : 'bg-dark-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Asset Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-1">
        {assets.map(item => {
          const isSelected = selectedAssetId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectAsset(item)}
              className={`group relative p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-lg shadow-brand-500/20'
                  : 'bg-dark-900/90 border-slate-800/90 hover:border-slate-700 hover:bg-dark-800/80'
              }`}
            >
              {/* Top Row: Thumbnail Visual & Selected Badge */}
              <div className="flex justify-between items-start mb-2">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-slate-700/60 transition group-hover:scale-105"
                  style={{ backgroundColor: item.previewColor || '#1e293b' }}
                >
                  {item.thumbnail || '✨'}
                </div>

                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Asset Name & Prompt Preview */}
              <div>
                <h4 className={`text-xs font-bold font-sans line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                  {item.name}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-mono">
                  {item.prompt}
                </p>
              </div>

              {/* Bottom Glow bar on hover */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-brand-500 to-brand-accent opacity-0 group-hover:opacity-100 transition" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
