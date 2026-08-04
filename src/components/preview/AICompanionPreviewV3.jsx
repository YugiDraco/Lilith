import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Heart, BookOpen, Volume2, Lock, RefreshCw, Eye } from 'lucide-react';
import { getAssetById } from '../../data/assetsCatalog';

export default function AICompanionPreviewV3({ character, activeTab, setActiveTab }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationKey, setGenerationKey] = useState(0);

  const {
    identity = {},
    appearance = {},
    body = { proportions: {} },
    face = {},
    hair = {},
    eyes = {},
    skin = {},
    clothing = { activeCategory: 'Sci-Fi', outfits: {} },
    accessories = {},
    emotion = {},
    relationship = {},
    memories = {},
    image = {}
  } = character;

  // Trigger simulated smooth AI re-render whenever key visual attributes change
  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setIsGenerating(false);
      setGenerationKey(prev => prev + 1);
    }, 600);
    return () => clearTimeout(timer);
  }, [
    hair.assetId, hair.baseColor, eyes.assetId, face.assetId, skin.assetId,
    clothing.activeCategory, clothing.outfitAssetId, image.environmentAssetId,
    image.poseAssetId, image.artStyle
  ]);

  const activeOutfit = clothing.outfits?.[clothing.activeCategory] || {};
  const hairColor = hair.baseColor || '#1c1917';
  const hairHighlight = hair.highlights || '#6366f1';
  const skinTone = skin.tone || '#fcd34d';
  const primaryColor = activeOutfit.primaryColor || '#090d16';

  const envAsset = getAssetById('backgrounds', image.environmentAssetId || 'bg_rooftop_01');
  const poseAsset = getAssetById('poses', image.poseAssetId || 'pose_heroic_01');
  const exprAsset = getAssetById('expressions', image.expressionAssetId || 'expr_smirk_01');

  const recentMemory = memories.recent?.[0]?.content || memories.pinned?.[0]?.content || 'Calibrated new neural HUD visor in the studio.';

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-700/60 shadow-2xl flex flex-col h-full relative overflow-hidden glow-brand">
      {/* Ambient Lighting Aura Background */}
      <div
        className="absolute inset-0 opacity-25 blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${hairHighlight}, ${primaryColor}, transparent 70%)`
        }}
      />

      {/* Top HUD Bar */}
      <div className="relative z-10 pb-3 mb-3 border-b border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> 18+ Adult Verified
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
              {image.artStyle || 'Hyperrealistic'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-brand-300">
            <Lock className="w-3.5 h-3.5 text-brand-400" /> Identity Locked
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-2xl font-extrabold font-sans text-white tracking-tight">
              {identity.name || 'Lilith Vane'}
            </h2>
            <p className="text-xs text-slate-400">{identity.occupation || 'Specialist'}</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Voice Tone</span>
            <span className="text-xs font-bold text-brand-300 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-brand-400" /> {character.speech?.voiceTone || 'Contralto'}
            </span>
          </div>
        </div>

        {/* Mood & Relationship Badges */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="bg-dark-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-accent flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold uppercase">Current Mood</span>
              <span className="font-bold text-white leading-none">{emotion.currentMood || 'Focused & Confident'}</span>
            </div>
          </div>

          <div className="bg-dark-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400 flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold uppercase">Relationship</span>
              <span className="font-bold text-pink-300 leading-none">{relationship.status || 'Trusted Partner'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main AI Portrait Hero Display with Framer Motion Fade & Generation Shimmer */}
      <div className="relative flex-1 bg-dark-900/95 rounded-2xl border border-slate-800 flex items-center justify-center p-4 min-h-[420px] overflow-hidden group">
        {/* Environment Background Symbol */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 text-8xl pointer-events-none select-none">
          {envAsset?.thumbnail || '🌆'}
        </div>

        {/* AI Generating Indicator Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-dark-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-brand-400"
            >
              <RefreshCw className="w-8 h-8 animate-spin text-brand-400" />
              <span className="text-xs font-bold text-white tracking-wider uppercase font-sans animate-pulse">
                Generating High-Res Portrait...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Companion Portrait View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={generationKey}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10"
          >
            {/* SVG Dynamic Character Rendering */}
            <svg
              viewBox="0 0 300 480"
              className="w-full h-full max-h-[420px] drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            >
              <defs>
                <linearGradient id="skinGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={skinTone} />
                  <stop offset="100%" stopColor={skinTone} stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="hairGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={hairColor} />
                  <stop offset="100%" stopColor={hairHighlight} />
                </linearGradient>
                <linearGradient id="outfitGradV3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={primaryColor} />
                  <stop offset="100%" stopColor={hairHighlight} stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Pedestal Glow */}
              <ellipse cx="150" cy="460" rx="75" ry="12" fill="rgba(99,102,241,0.2)" />

              {/* Legs */}
              <path d="M 125 240 L 125 450" stroke={skinTone} strokeWidth="16" strokeLinecap="round" />
              <path d="M 175 240 L 175 450" stroke={skinTone} strokeWidth="16" strokeLinecap="round" />
              <path d="M 115 240 L 185 240 L 170 340 L 130 340 Z" fill="url(#outfitGradV3)" />

              {/* Arms */}
              <path d="M 95 125 Q 75 180 85 250" stroke={skinTone} strokeWidth="10" strokeLinecap="round" fill="none" />
              <path d="M 205 125 Q 225 180 215 250" stroke={skinTone} strokeWidth="10" strokeLinecap="round" fill="none" />

              {/* Torso & Outfit */}
              <rect x="140" y="90" width="20" height="30" rx="6" fill={skinTone} />
              <path d="M 95 120 Q 150 110 205 120 Q 190 200 180 240 Q 150 250 120 240 Q 110 200 95 120 Z" fill="url(#skinGradV3)" />
              <path d="M 100 125 Q 150 115 200 125 L 180 220 L 120 220 Z" fill="url(#outfitGradV3)" />

              {/* Head & Facial Identity */}
              <ellipse cx="150" cy="65" rx="28" ry="34" fill="url(#hairGradV3)" />
              <ellipse cx="150" cy="70" rx="20" ry="24" fill={skinTone} />
              <ellipse cx="142" cy="68" rx="3.5" ry="2.5" fill="#fff" />
              <ellipse cx="158" cy="68" rx="3.5" ry="2.5" fill="#fff" />
              <circle cx="142" cy="68" r="1.8" fill="#4f46e5" />
              <circle cx="158" cy="68" r="1.8" fill="#4f46e5" />
              <path d="M 145 80 Q 150 83 155 80" stroke="#e11d48" strokeWidth="1.8" fill="none" />
              <path d="M 124 55 Q 150 40 176 55 Q 170 85 130 85 Z" fill="url(#hairGradV3)" />
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Memory Snippet */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-800 space-y-1">
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-brand-400" /> Recent Memory
        </span>
        <p className="text-xs text-slate-200 line-clamp-1 italic bg-dark-900/70 p-2 rounded-xl border border-slate-800/80">
          "{recentMemory}"
        </p>
      </div>
    </div>
  );
}
