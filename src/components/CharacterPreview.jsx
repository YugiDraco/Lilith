import React, { useState } from 'react';
import { User, Eye, Sparkles, ShieldCheck, Heart, BookOpen, Activity, Lock } from 'lucide-react';

export default function CharacterPreviewAAA({ character, activeTab, setActiveTab }) {
  const [showHotspots, setShowHotspots] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const {
    identity = {},
    appearance = {},
    body = { proportions: {}, upperBody: {}, lowerBody: {} },
    face = {},
    hair = {},
    skin = {},
    clothing = { activeCategory: 'Sci-Fi', outfits: {} },
    accessories = {},
    emotion = {},
    relationship = {},
    memories = {}
  } = character;

  const props = body.proportions || {};
  const activeOutfit = clothing.outfits?.[clothing.activeCategory] || {};

  // Compute dynamic anatomical geometry factors based on sliders (scale factors 0.7 - 1.3)
  const shoulderFactor = 0.8 + ((props.shoulderWidth || 50) / 100) * 0.5;
  const waistFactor = 0.7 + ((props.waistSize || 50) / 100) * 0.6;
  const hipFactor = 0.75 + ((props.hipWidth || 50) / 100) * 0.55;
  const chestFactor = 0.8 + ((body.upperBody?.chestProportion || 50) / 100) * 0.4;
  const legLenFactor = 0.85 + ((props.legLength || 50) / 100) * 0.3;
  const armThickFactor = 0.8 + ((props.armThickness || 50) / 100) * 0.4;
  const thighFactor = 0.8 + ((props.thighSize || 50) / 100) * 0.45;
  const heightScale = 0.9 + (((appearance.heightCm || 175) - 150) / 50) * 0.2;

  // Base positions in SVG viewBox (0 0 300 520)
  const cx = 150;
  const headY = 65;
  const shoulderY = 115;
  const chestY = 145;
  const waistY = 195;
  const hipY = 230;
  const kneeY = 230 + 110 * legLenFactor;
  const ankleY = kneeY + 100 * legLenFactor;

  // Width calculation
  const shoulderW = 45 * shoulderFactor;
  const waistW = 28 * waistFactor;
  const hipW = 38 * hipFactor;
  const chestW = (32 + (chestFactor * 8)) * shoulderFactor;
  const armWidth = 9 * armThickFactor;
  const thighWidth = 14 * thighFactor;

  const skinColor = skin.tone || '#fcd34d';
  const hairColor = hair.baseColor || '#1c1917';
  const hairHighlight = hair.highlights || '#6366f1';
  const outfitPrimary = activeOutfit.primaryColor || '#090d16';
  const outfitSecondary = activeOutfit.secondaryColor || '#6366f1';

  const recentMemorySnippet = memories.recent?.[0]?.content || memories.pinned?.[0]?.content || 'Calibrated new holographic vision HUD accessories in the studio.';

  return (
    <div className="glass-panel rounded-3xl p-5 border border-slate-700/60 shadow-2xl flex flex-col h-full relative overflow-hidden glow-brand">
      {/* AAA Portrait Header HUD */}
      <div className="pb-4 mb-4 border-b border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> 18+ Adult Verified
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
              {appearance.bodyType || 'Athletic'}
            </span>
          </div>

          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition flex items-center gap-1 ${
              showHotspots ? 'bg-brand-600 text-white' : 'bg-dark-800 text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> {showHotspots ? 'Hotspots On' : 'Hotspots Off'}
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold font-sans text-white tracking-tight flex items-center gap-2">
            {identity.name || 'Lilith Vane'}
          </h2>
          <p className="text-xs text-slate-400">{identity.occupation || 'Specialist'}</p>
        </div>

        {/* Current Mood & Relationship Status Chips */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="bg-dark-900/80 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-accent flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold uppercase">Current Mood</span>
              <span className="font-bold text-white leading-none">{emotion.currentMood || 'Focused'}</span>
            </div>
          </div>

          <div className="bg-dark-900/80 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400 flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold uppercase">Relationship</span>
              <span className="font-bold text-pink-300 leading-none">{relationship.status || 'Companion'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Anatomical Mannequin Canvas Container */}
      <div className="relative flex-1 bg-dark-900/90 rounded-2xl border border-slate-800 flex items-center justify-center p-3 min-h-[400px] overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {hoveredRegion && (
          <div className="absolute top-3 left-3 bg-dark-800/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-brand-300 border border-brand-500/30 z-20 pointer-events-none flex items-center gap-1.5 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            Click to edit: <span className="font-semibold text-white capitalize">{hoveredRegion}</span>
          </div>
        )}

        <svg
          viewBox="0 0 300 500"
          className="w-full h-full max-h-[440px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-transform duration-300"
          style={{ transform: `scale(${heightScale})` }}
        >
          <defs>
            <linearGradient id="skinGradAAA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={skinColor} />
              <stop offset="100%" stopColor={skinColor} stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="hairGradAAA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={hairColor} />
              <stop offset="100%" stopColor={hairHighlight} />
            </linearGradient>
            <linearGradient id="outfitPrimaryGradAAA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={outfitPrimary} />
              <stop offset="100%" stopColor={outfitSecondary} stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* BACKGROUND GLOW */}
          <ellipse cx={cx} cy={ankleY + 15} rx="65" ry="10" fill="rgba(99,102,241,0.15)" />

          {/* ARMS */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredRegion('body')}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setActiveTab('body')}
          >
            <path
              d={`M ${cx - shoulderW} ${shoulderY} Q ${cx - shoulderW - 18} ${chestY + 30} ${cx - shoulderW - 12} ${waistY + 40}`}
              stroke={skinColor}
              strokeWidth={armWidth}
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M ${cx + shoulderW} ${shoulderY} Q ${cx + shoulderW + 18} ${chestY + 30} ${cx + shoulderW + 12} ${waistY + 40}`}
              stroke={skinColor}
              strokeWidth={armWidth}
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* LEGS */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredRegion('lowerBody')}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setActiveTab('body')}
          >
            <path
              d={`M ${cx - hipW + 8} ${hipY} Q ${cx - hipW - 2} ${kneeY} ${cx - 16} ${ankleY}`}
              stroke={skinColor}
              strokeWidth={thighWidth}
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M ${cx + hipW - 8} ${hipY} Q ${cx + hipW + 2} ${kneeY} ${cx + 16} ${ankleY}`}
              stroke={skinColor}
              strokeWidth={thighWidth}
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M ${cx - hipW} ${hipY - 5} L ${cx + hipW} ${hipY - 5} L ${cx + 25} ${kneeY - 10} L ${cx - 25} ${kneeY - 10} Z`}
              fill="url(#outfitPrimaryGradAAA)"
              opacity="0.9"
            />
            <ellipse cx={cx - 16} cy={ankleY + 4} rx="9" ry="5" fill="#0f172a" />
            <ellipse cx={cx + 16} cy={ankleY + 4} rx="9" ry="5" fill="#0f172a" />
          </g>

          {/* TORSO & UPPER BODY */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredRegion('torso')}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setActiveTab('body')}
          >
            <rect x={cx - 10} y={headY + 20} width={20} height={25} rx="6" fill={skinColor} />
            <path
              d={`M ${cx - shoulderW} ${shoulderY} 
                 Q ${cx - chestW} ${chestY} ${cx - waistW} ${waistY} 
                 Q ${cx - hipW} ${hipY} ${cx} ${hipY + 10} 
                 Q ${cx + hipW} ${hipY} ${cx + waistW} ${waistY} 
                 Q ${cx + chestW} ${chestY} ${cx + shoulderW} ${shoulderY} Z`}
              fill="url(#skinGradAAA)"
            />
            <path
              d={`M ${cx - shoulderW + 4} ${shoulderY + 2} 
                 Q ${cx - chestW + 2} ${chestY} ${cx - waistW + 2} ${waistY - 5} 
                 L ${cx + waistW - 2} ${waistY - 5} 
                 Q ${cx + chestW - 2} ${chestY} ${cx + shoulderW - 4} ${shoulderY + 2} Z`}
              fill="url(#outfitPrimaryGradAAA)"
            />
          </g>

          {/* HEAD & FACE */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredRegion('head')}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setActiveTab('face')}
          >
            <ellipse cx={cx} cy={headY - 5} rx="26" ry="32" fill="url(#hairGradAAA)" />
            <ellipse cx={cx} cy={headY} rx={18} ry={22} fill={skinColor} />
            <ellipse cx={cx - 7} cy={headY - 2} rx="3" ry="2" fill="#fff" />
            <ellipse cx={cx + 7} cy={headY - 2} rx="3" ry="2" fill="#fff" />
            <circle cx={cx - 7} cy={headY - 2} r="1.5" fill="#4f46e5" />
            <circle cx={cx + 7} cy={headY - 2} r="1.5" fill="#4f46e5" />
            <path d={`M ${cx - 4} ${headY + 9} Q ${cx} ${headY + 12} ${cx + 4} ${headY + 9}`} stroke="#e11d48" strokeWidth="1.5" fill="none" />
            <path
              d={`M ${cx - 24} ${headY - 12} Q ${cx} ${headY - 26} ${cx + 24} ${headY - 12} Q ${cx + 18} ${headY + 18} ${cx - 18} ${headY + 18} Z`}
              fill="url(#hairGradAAA)"
              opacity="0.95"
            />
          </g>

          {/* HOTSPOT OVERLAYS */}
          {showHotspots && (
            <g opacity="0.5">
              <circle cx={cx} cy={headY} r="28" fill="transparent" stroke="#ec4899" strokeDasharray="3 3" className="cursor-pointer" onClick={() => setActiveTab('face')} />
              <rect x={cx - shoulderW} y={shoulderY - 5} width={shoulderW * 2} height={hipY - shoulderY} fill="transparent" stroke="#6366f1" strokeDasharray="3 3" className="cursor-pointer" onClick={() => setActiveTab('body')} />
            </g>
          )}
        </svg>
      </div>

      {/* Recent Memory Snippet Footer HUD */}
      <div className="mt-4 pt-3 border-t border-slate-800 space-y-1">
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
          <BookOpen className="w-3 h-3 text-brand-400" /> Recent Companion Memory
        </span>
        <p className="text-xs text-slate-200 line-clamp-1 italic bg-dark-900/60 p-2 rounded-xl border border-slate-800/80">
          "{recentMemorySnippet}"
        </p>
      </div>
    </div>
  );
}
