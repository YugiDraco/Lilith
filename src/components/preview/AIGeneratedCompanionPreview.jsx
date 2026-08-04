import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageService } from '../../services/ImageService';
import { Sparkles, ShieldCheck, Heart, Volume2, Lock, RefreshCw, Layers, Camera } from 'lucide-react';

export default function AIGeneratedCompanionPreview({ character, activeVariation = 'portrait', onSelectVariation }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCached, setIsCached] = useState(false);

  const {
    identity = {},
    appearance = {},
    hair = {},
    eyes = {},
    skin = {},
    clothing = {},
    accessories = {},
    emotion = {},
    relationship = {},
    image = {}
  } = character;

  // Generate or fetch cached AI image preview whenever styling or identity attributes change
  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);

    ImageService.generate(character, activeVariation).then(res => {
      if (isMounted) {
        setImageUrl(res.url);
        setIsCached(res.isCached);
        setIsGenerating(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [
    character.identity?.id,
    hair.assetId, hair.baseColor, eyes.assetId, eyes.color,
    skin.assetId, skin.tone, clothing.activeCategory, clothing.outfitAssetId,
    image.artStyle, image.environmentAssetId, image.poseAssetId, activeVariation
  ]);

  const name = identity.name || 'Lilith Vane';
  const age = identity.age || 24;
  const occupation = identity.occupation || 'Specialist';
  const mood = emotion.currentMood || 'Focused & Confident';
  const relStatus = relationship.status || 'Trusted Companion';
  const voiceTone = character.speech?.voiceTone || 'Contralto';
  const artStyle = image.artStyle || 'Hyperrealistic Photographic';

  const variationOptions = [
    { id: 'portrait', label: 'Portrait' },
    { id: 'fullbody', label: 'Full Body' },
    { id: 'selfie', label: 'Selfie' },
    { id: 'sitting', label: 'Sitting' },
    { id: 'coffee', label: 'Coffee Shop' },
    { id: 'gym', label: 'Gym' },
    { id: 'beach', label: 'Beach' },
    { id: 'bedroom', label: 'Bedroom' }
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-700/60 shadow-2xl flex flex-col h-full relative overflow-hidden glow-brand">
      {/* Ambient Lighting Aura Background */}
      <div
        className="absolute inset-0 opacity-25 blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${hair.highlights || '#6366f1'}, ${skin.tone || '#fcd34d'}, transparent 70%)`
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
              {artStyle}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-brand-300">
            <Lock className="w-3.5 h-3.5 text-brand-400" /> Identity Locked
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

        {/* Mood & Relationship Status Badges */}
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

      {/* Main Photorealistic AI Image Preview Display with Framer Motion Shimmer Loader */}
      <div className="relative flex-1 bg-dark-900/95 rounded-2xl border border-slate-800 flex items-center justify-center p-2 min-h-[440px] overflow-hidden group">
        {/* Animated Loading Shimmer Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-dark-900/85 backdrop-blur-md flex flex-col items-center justify-center gap-3 text-brand-400"
            >
              <RefreshCw className="w-9 h-9 animate-spin text-brand-400" />
              <div className="text-center space-y-1">
                <span className="text-xs font-extrabold text-white tracking-widest uppercase font-sans animate-pulse block">
                  Generating AI Appearance...
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Preserving Facial Identity & Anatomy Lock
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photorealistic AI Rendered Portrait */}
        <AnimatePresence mode="wait">
          {imageUrl && (
            <motion.div
              key={imageUrl}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full h-full flex flex-col items-center justify-center relative z-10"
            >
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full max-h-[440px] object-cover rounded-xl shadow-2xl border border-slate-700/60"
              />

              {/* Cache Indicator Badge */}
              {isCached && (
                <div className="absolute top-3 right-3 bg-dark-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 text-emerald-400" /> Cached Render
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Variation Quick Switcher Bar */}
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
