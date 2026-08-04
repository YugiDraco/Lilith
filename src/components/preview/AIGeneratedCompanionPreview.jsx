import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PreviewApi } from '../../services/image/PreviewApi';
import { imageHistory } from '../../services/image/ImageHistory';
import { Sparkles, ShieldCheck, Heart, Volume2, Lock, RefreshCw, Camera, Download, Bookmark } from 'lucide-react';

export default function AIGeneratedCompanionPreview({ character, activeVariation = 'portrait', onSelectVariation }) {
  const [currentImage, setCurrentImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const {
    identity = {},
    hair = {},
    eyes = {},
    skin = {},
    clothing = {},
    emotion = {},
    relationship = {},
    image = {}
  } = character;

  // 700 ms Debounced AI Preview Queue with 4-stage Framer Motion blur cross-fade
  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);

    PreviewApi.requestPreviewDebounced(character, activeVariation, (res) => {
      if (isMounted) {
        setCurrentImage(res);
        setIsCached(res.isCached);
        setIsGenerating(false);
        imageHistory.addEntry(res);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [
    character.identity?.id, character.image?.seed,
    hair.assetId, hair.style, hair.baseColor, hair.highlights,
    eyes.assetId, eyes.color, skin.assetId, skin.tone,
    clothing.activeCategory, clothing.outfitAssetId,
    image.artStyle, image.environmentAssetId, image.poseAssetId, activeVariation
  ]);

  const name = identity.name || 'Lilith Vane';
  const occupation = identity.occupation || 'Specialist';
  const mood = emotion.currentMood || 'Focused & Confident';
  const relStatus = relationship.status || 'Trusted Partner';
  const voiceTone = character.speech?.voiceTone || 'Contralto';
  const artStyle = image.artStyle || 'Hyperrealistic Photographic';

  const variationOptions = [
    { id: 'portrait', label: 'Portrait' },
    { id: 'fullbody', label: 'Full Body' },
    { id: 'selfie', label: 'Selfie' },
    { id: 'profile', label: 'Side Profile' },
    { id: 'sitting', label: 'Seated' },
    { id: 'coffee', label: 'Coffee Shop' },
    { id: 'gym', label: 'Fitness Gym' },
    { id: 'beach', label: 'Sunset Beach' }
  ];

  const handleDownload = () => {
    if (currentImage?.url) {
      imageHistory.downloadImage(currentImage.url, `${name.toLowerCase().replace(/\s+/g, '_')}_portrait.jpg`);
    }
  };

  const handleToggleFavorite = () => {
    if (currentImage?.url) {
      imageHistory.toggleFavorite(currentImage.hashKey || 'current');
      setIsFavorited(!isFavorited);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-700/60 shadow-2xl flex flex-col h-full relative overflow-hidden glow-brand">
      {/* Ambient Lighting Aura Background */}
      <div
        className="absolute inset-0 opacity-30 blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${hair.highlights || '#6366f1'}, ${skin.tone || '#fcd34d'}, transparent 70%)`
        }}
      />

      {/* Top HUD Status & History Tools */}
      <div className="relative z-10 pb-3 mb-3 border-b border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> 18+ Adult Verified
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
              {artStyle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`p-1.5 rounded-lg border transition ${
                isFavorited
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                  : 'bg-dark-900/80 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Bookmark Favorite Shot"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg bg-dark-900/80 border border-slate-800 text-slate-400 hover:text-white transition"
              title="Download Companion Image"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1 font-mono text-[11px] text-brand-300 ml-1">
              <Lock className="w-3.5 h-3.5 text-brand-400" /> Identity Locked
            </div>
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-2xl font-extrabold font-sans text-white tracking-tight flex items-center gap-2">
              {name}
            </h2>
            <p className="text-xs text-slate-400">{occupation}</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Voice Profile</span>
            <span className="text-xs font-bold text-brand-300 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-brand-400" /> {voiceTone}
            </span>
          </div>
        </div>

        {/* Mood & Relationship Badges */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <div className="bg-dark-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-accent flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold uppercase">Mood State</span>
              <span className="font-bold text-white leading-none">{mood}</span>
            </div>
          </div>

          <div className="bg-dark-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400 flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 block font-semibold uppercase">Relationship</span>
              <span className="font-bold text-pink-300 leading-none">{relStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Companion Preview (4-Stage Framer Motion Blur Cross-Fade Transition) */}
      <div className="relative flex-1 bg-dark-900/95 rounded-2xl border border-slate-800 flex items-center justify-center p-2 min-h-[440px] overflow-hidden group">
        {/* Animated Shimmer Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-30 bg-dark-900/80 flex flex-col items-center justify-center gap-3 text-brand-400"
            >
              <div className="relative flex items-center justify-center">
                <RefreshCw className="w-10 h-10 animate-spin text-brand-400" />
                <Sparkles className="w-4 h-4 text-brand-accent absolute animate-ping" />
              </div>

              <div className="text-center space-y-1">
                <span className="text-xs font-extrabold text-white tracking-widest uppercase font-sans animate-pulse block">
                  Creating your companion...
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Synthesizing Identity Lock & Visual Assets
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 100% Pure AI Rendered Character Portrait Photograph */}
        <AnimatePresence mode="wait">
          {currentImage?.url && (
            <motion.div
              key={currentImage.url}
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full h-full flex flex-col items-center justify-center relative z-10"
            >
              <img
                src={currentImage.url}
                alt={name}
                className="w-full h-full max-h-[440px] object-cover rounded-xl shadow-2xl border border-slate-700/60"
              />

              {/* Cache Indicator Badge */}
              {isCached && (
                <div className="absolute top-3 right-3 bg-dark-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 text-emerald-400" /> Instant Cached Render
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Variation Quick Switcher */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-800 space-y-2">
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Camera className="w-3 h-3 text-brand-cyan" /> Image Variation Slots
          </span>
          <span className="font-mono text-brand-300 font-bold">{activeVariation}</span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {variationOptions.map(v => (
            <button
              key={v.id}
              onClick={() => onSelectVariation && onSelectVariation(v.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition whitespace-nowrap ${
                activeVariation === v.id
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30'
                  : 'bg-dark-900/90 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
