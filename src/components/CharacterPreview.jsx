import React, { useState } from 'react';
import { User, Eye, Sparkles, Layers, ShieldCheck, Shirt, Scissors, Palette } from 'lucide-react';

export default function CharacterPreview({ character, activeTab, setActiveTab }) {
  const [showHotspots, setShowHotspots] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const {
    identity = {},
    appearance = {},
    body = { proportions: {}, upperBody: {}, lowerBody: {} },
    face = {},
    hair = {},
    skin = {},
    clothing = { activeCategory: 'Casual', outfits: {} },
    accessories = {}
  } = character;

  const props = body.proportions || {};
  const activeOutfit = clothing.outfits?.[clothing.activeCategory] || {};

  // Compute dynamic anatomical geometry factors based on sliders (scale factors 0.7 - 1.3)
  const shoulderFactor = 0.8 + ((props.shoulderWidth || 50) / 100) * 0.5; // 0.8 to 1.3
  const waistFactor = 0.7 + ((props.waistSize || 50) / 100) * 0.6; // 0.7 to 1.3
  const hipFactor = 0.75 + ((props.hipWidth || 50) / 100) * 0.55; // 0.75 to 1.3
  const chestFactor = 0.8 + ((body.upperBody?.chestProportion || 50) / 100) * 0.4;
  const legLenFactor = 0.85 + ((props.legLength || 50) / 100) * 0.3;
  const armThickFactor = 0.8 + ((props.armThickness || 50) / 100) * 0.4;
  const thighFactor = 0.8 + ((props.thighSize || 50) / 100) * 0.45;
  const heightScale = 0.9 + (((appearance.heightCm || 175) - 150) / 50) * 0.2;

  // Base positions in SVG viewBox (0 0 300 520)
  const cx = 150;
  const headY = 65;
  const neckY = 95;
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
  const calfWidth = 11 * (props.calfSize ? (0.8 + (props.calfSize / 100) * 0.4) : 1);

  const skinColor = skin.tone || '#fcd34d';
  const hairColor = hair.baseColor || '#1c1917';
  const hairHighlight = hair.highlights || '#6366f1';
  const outfitPrimary = activeOutfit.primaryColor || '#1e1b4b';
  const outfitSecondary = activeOutfit.secondaryColor || '#ec4899';

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-2xl flex flex-col h-full relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> 18+ Verified Adult
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
              {appearance.bodyType || 'Athletic'}
            </span>
          </div>
          <h2 className="text-xl font-bold font-sans text-white mt-1">
            {identity.name || 'Unnamed Character'}
          </h2>
        </div>
        <button
          onClick={() => setShowHotspots(!showHotspots)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
            showHotspots
              ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30'
              : 'bg-dark-700 text-slate-400 hover:text-white'
          }`}
          title="Toggle Clickable Region Hotspots"
        >
          <Eye className="w-3.5 h-3.5" />
          {showHotspots ? 'Hotspots Active' : 'Hide Hotspots'}
        </button>
      </div>

      {/* Anatomical Canvas / SVG Container */}
      <div className="relative flex-1 bg-dark-900/90 rounded-xl border border-slate-800 flex items-center justify-center p-4 min-h-[440px] overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Hovered Region Badge */}
        {hoveredRegion && (
          <div className="absolute top-3 left-3 bg-dark-800/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-brand-300 border border-brand-500/30 shadow-lg z-20 pointer-events-none flex items-center gap-1.5 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            Click to edit: <span className="font-semibold text-white capitalize">{hoveredRegion}</span>
          </div>
        )}

        <svg
          viewBox="0 0 300 500"
          className="w-full h-full max-h-[460px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-transform duration-300 transform scale-100"
          style={{ transform: `scale(${heightScale})` }}
        >
          <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={skinColor} />
              <stop offset="100%" stopColor={skinColor} stopOpacity="0.82" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={hairColor} />
              <stop offset="100%" stopColor={hairHighlight} />
            </linearGradient>
            <linearGradient id="outfitPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={outfitPrimary} />
              <stop offset="100%" stopColor={outfitSecondary} stopOpacity="0.85" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND GLOW */}
          <ellipse cx={cx} cy={ankleY + 15} rx="65" ry="10" fill="rgba(99,102,241,0.15)" />

          {/* ARMS (Behind Torso) */}
          <g
            className={`cursor-pointer transition-opacity ${hoveredRegion === 'body' ? 'opacity-100' : 'opacity-90'}`}
            onMouseEnter={() => setHoveredRegion('body')}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setActiveTab('body')}
          >
            {/* Left Arm */}
            <path
              d={`M ${cx - shoulderW} ${shoulderY} Q ${cx - shoulderW - 18} ${chestY + 30} ${cx - shoulderW - 12} ${waistY + 40}`}
              stroke={skinColor}
              strokeWidth={armWidth}
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Arm */}
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
            className={`cursor-pointer transition-opacity ${hoveredRegion === 'lowerBody' ? 'opacity-100' : 'opacity-90'}`}
            onMouseEnter={() => setHoveredRegion('lowerBody')}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setActiveTab('body')}
          >
            {/* Left Leg */}
            <path
              d={`M ${cx - hipW + 8} ${hipY} Q ${cx - hipW - 2} ${kneeY} ${cx - 16} ${ankleY}`}
              stroke={skinColor}
              strokeWidth={thighWidth}
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Leg */}
            <path
              d={`M ${cx + hipW - 8} ${hipY} Q ${cx + hipW + 2} ${kneeY} ${cx + 16} ${ankleY}`}
              stroke={skinColor}
              strokeWidth={thighWidth}
              strokeLinecap="round"
              fill="none"
            />

            {/* Pants / Outfit Bottom */}
            <path
              d={`M ${cx - hipW} ${hipY - 5} L ${cx + hipW} ${hipY - 5} L ${cx + 25} ${kneeY - 10} L ${cx - 25} ${kneeY - 10} Z`}
              fill="url(#outfitPrimaryGrad)"
              opacity="0.9"
            />

            {/* Shoes */}
            <ellipse cx={cx - 16} cy={ankleY + 4} rx="9" ry="5" fill="#0f172a" />
            <ellipse cx={cx + 16} cy={ankleY + 4} rx="9" ry="5" fill="#0f172a" />
          </g>

          {/* TORSO & UPPER BODY */}
          <g
            className={`cursor-pointer transition-all ${hoveredRegion === 'torso' ? 'filter drop-shadow(0 0 8px rgba(99,102,241,0.5))' : ''}`}
            onMouseEnter={() => setHoveredRegion('torso')}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setActiveTab('body')}
          >
            {/* Neck */}
            <rect
              x={cx - (10 * (props.neckWidth ? (0.8 + (props.neckWidth / 100) * 0.4) : 1))}
              y={headY + 20}
              width={20 * (props.neckWidth ? (0.8 + (props.neckWidth / 100) * 0.4) : 1)}
              height={25}
              rx="6"
              fill={skinColor}
            />

            {/* Torso Base Body Silhouette */}
            <path
              d={`M ${cx - shoulderW} ${shoulderY} 
                 Q ${cx - chestW} ${chestY} ${cx - waistW} ${waistY} 
                 Q ${cx - hipW} ${hipY} ${cx} ${hipY + 10} 
                 Q ${cx + hipW} ${hipY} ${cx + waistW} ${waistY} 
                 Q ${cx + chestW} ${chestY} ${cx + shoulderW} ${shoulderY} Z`}
              fill="url(#skinGrad)"
            />

            {/* Outfit Top / Armor */}
            <path
              d={`M ${cx - shoulderW + 4} ${shoulderY + 2} 
                 Q ${cx - chestW + 2} ${chestY} ${cx - waistW + 2} ${waistY - 5} 
                 L ${cx + waistW - 2} ${waistY - 5} 
                 Q ${cx + chestW - 2} ${chestY} ${cx + shoulderW - 4} ${shoulderY + 2} Z`}
              fill="url(#outfitPrimaryGrad)"
            />

            {/* Chest Contour Lines */}
            <path
              d={`M ${cx - chestW + 8} ${chestY - 5} Q ${cx} ${chestY + 12} ${cx + chestW - 8} ${chestY - 5}`}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* HEAD & FACE */}
          <g
            className={`cursor-pointer transition-all ${hoveredRegion === 'head' ? 'filter drop-shadow(0 0 10px rgba(236,72,153,0.6))' : ''}`}
            onMouseEnter={() => setHoveredRegion('head')}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setActiveTab('face')}
          >
            {/* Hair Back */}
            <ellipse cx={cx} cy={headY - 5} rx="26" ry="32" fill="url(#hairGrad)" />

            {/* Head Face Shape */}
            <ellipse
              cx={cx}
              cy={headY}
              rx={18 + (face.jawline ? (face.jawline - 50) / 10 : 0)}
              ry={22}
              fill={skinColor}
            />

            {/* Eyes */}
            <ellipse cx={cx - 7} cy={headY - 2} rx="3" ry="2" fill="#fff" />
            <ellipse cx={cx + 7} cy={headY - 2} rx="3" ry="2" fill="#fff" />
            <circle cx={cx - 7} cy={headY - 2} r="1.5" fill="#4f46e5" />
            <circle cx={cx + 7} cy={headY - 2} r="1.5" fill="#4f46e5" />

            {/* Nose */}
            <path d={`M ${cx} ${headY + 1} L ${cx - 1} ${headY + 5} L ${cx + 1.5} ${headY + 5}`} stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />

            {/* Lips */}
            <path d={`M ${cx - 4} ${headY + 9} Q ${cx} ${headY + 12} ${cx + 4} ${headY + 9}`} stroke="#e11d48" strokeWidth="1.5" fill="none" />

            {/* Hair Front Bangs / Style */}
            <path
              d={`M ${cx - 24} ${headY - 12} Q ${cx} ${headY - 26} ${cx + 24} ${headY - 12} Q ${cx + 18} ${headY + 18} ${cx - 18} ${headY + 18} Z`}
              fill="url(#hairGrad)"
              opacity="0.95"
            />
          </g>

          {/* ACCESSORIES (Visor / Glasses) */}
          {accessories.glasses && accessories.glasses !== 'None' && (
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredRegion('accessories')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setActiveTab('accessories')}
            >
              <rect x={cx - 12} y={headY - 5} width="24" height="6" rx="2" fill="#06b6d4" opacity="0.85" filter="url(#glow)" />
            </g>
          )}

          {/* HOTSPOT OVERLAYS */}
          {showHotspots && (
            <g opacity="0.6">
              {/* Head Hotspot */}
              <circle
                cx={cx}
                cy={headY}
                r="28"
                fill="transparent"
                stroke="#ec4899"
                strokeDasharray="3 3"
                className="hover:stroke-white transition cursor-pointer"
                onClick={() => setActiveTab('face')}
              />
              {/* Torso Hotspot */}
              <rect
                x={cx - shoulderW}
                y={shoulderY - 5}
                width={shoulderW * 2}
                height={hipY - shoulderY}
                fill="transparent"
                stroke="#6366f1"
                strokeDasharray="3 3"
                className="hover:stroke-white transition cursor-pointer"
                onClick={() => setActiveTab('body')}
              />
              {/* Legs Hotspot */}
              <rect
                x={cx - hipW}
                y={hipY}
                width={hipW * 2}
                height={ankleY - hipY + 10}
                fill="transparent"
                stroke="#06b6d4"
                strokeDasharray="3 3"
                className="hover:stroke-white transition cursor-pointer"
                onClick={() => setActiveTab('body')}
              />
            </g>
          )}
        </svg>
      </div>

      {/* Anatomy Summary Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
        <div className="bg-dark-800/60 p-2 rounded-lg border border-slate-800 text-center">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Height / Weight</span>
          <span className="font-bold text-white">{appearance.heightCm || 175} cm / {appearance.weightKg || 62} kg</span>
        </div>
        <div className="bg-dark-800/60 p-2 rounded-lg border border-slate-800 text-center">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Body Build</span>
          <span className="font-bold text-white">{appearance.overallBuild || 'Mesomorph'}</span>
        </div>
        <div className="bg-dark-800/60 p-2 rounded-lg border border-slate-800 text-center">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Outfit</span>
          <span className="font-bold text-brand-400">{clothing.activeCategory || 'Casual'}</span>
        </div>
      </div>
    </div>
  );
}
