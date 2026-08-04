import React, { useState } from 'react';
import { generateStructuredPrompt } from '../../utils/promptGenerator';
import { ART_STYLES, CAMERA_ANGLES, LIGHTING_PRESETS } from '../../types/character';
import { Sparkles, Copy, Check, Lock, RefreshCw, Image, Sliders, Layers } from 'lucide-react';

export default function ImageStudioTab({ character, onChange }) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([
    { id: 1, label: 'Current Studio Setup', seed: character.image_settings?.seed || 4829104, style: character.image_settings?.artStyle }
  ]);

  const { image_settings = {} } = character;
  const { positivePrompt, negativePrompt } = generateStructuredPrompt(character);

  const updateImageSettings = (field, val) => {
    onChange({
      ...character,
      image_settings: { ...image_settings, [field]: val }
    });
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(positivePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateVariation = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newSeed = Math.floor(Math.random() * 9000000) + 1000000;
      updateImageSettings('seed', newSeed);
      setGeneratedImages(prev => [
        { id: Date.now(), label: `Variation (Seed: ${newSeed})`, seed: newSeed, style: image_settings.artStyle || 'Hyperrealistic' },
        ...prev
      ]);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Face Identity Lock & Consistency Anchor Banner */}
      <div className="glass-card p-4 rounded-xl border border-brand-500/30 bg-brand-500/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Identity Consistency Lock: Active
            </h4>
            <p className="text-xs text-slate-300">
              Facial identity token & body proportion matrix are preserved automatically across prompt variations.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Seed:</span>
          <span className="text-xs font-mono font-bold bg-dark-900 px-2.5 py-1 rounded-lg border border-slate-700 text-brand-300">
            {image_settings.seed || 4829104}
          </span>
          <button
            onClick={() => updateImageSettings('seed', Math.floor(Math.random() * 9000000) + 1000000)}
            className="p-1.5 rounded-lg bg-dark-800 border border-slate-700 hover:text-white text-slate-400 transition"
            title="Randomize Seed"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Image Settings Controls */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-4 h-4 text-brand-500" /> Image Generation Scene & Style Controls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Art Style</label>
            <select
              value={image_settings.artStyle || 'Hyperrealistic Photographic'}
              onChange={(e) => updateImageSettings('artStyle', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer"
            >
              {ART_STYLES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Camera Framing & Angle</label>
            <select
              value={image_settings.cameraAngle || 'Three-Quarter Angle Standing'}
              onChange={(e) => updateImageSettings('cameraAngle', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer"
            >
              {CAMERA_ANGLES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Lighting Preset</label>
            <select
              value={image_settings.lightingPreset || 'Neon Cyberpunk Dual Tone (Magenta/Cyan)'}
              onChange={(e) => updateImageSettings('lightingPreset', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer"
            >
              {LIGHTING_PRESETS.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-400 font-medium block mb-1">Environment / Setting</label>
            <input
              type="text"
              value={image_settings.environment || ''}
              onChange={(e) => updateImageSettings('environment', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Futuristic Neo-City Rooftop at Night"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Pose & Stance</label>
            <input
              type="text"
              value={image_settings.pose || ''}
              onChange={(e) => updateImageSettings('pose', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="e.g. Heroic Stance with One Hand on Hip"
            />
          </div>
        </div>
      </div>

      {/* Generated Structured Prompt Inspector */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-accent" /> Compiled Structured AI Prompt
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopyPrompt}
              className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition flex items-center gap-1.5 shadow-md shadow-brand-500/20"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Prompt!' : 'Copy Structured Prompt'}
            </button>
            <button
              onClick={handleGenerateVariation}
              disabled={isGenerating}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-accent to-brand-600 hover:opacity-90 text-xs font-bold text-white transition flex items-center gap-1.5 shadow-md shadow-pink-500/20"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Rendering...' : 'Simulate Consistent Render'}
            </button>
          </div>
        </div>

        <div className="bg-dark-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
          {positivePrompt}
        </div>

        <div className="pt-2">
          <span className="text-[11px] text-slate-400 block font-semibold mb-1">Negative Prompt:</span>
          <div className="bg-dark-900/60 border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-rose-300/80">
            {negativePrompt}
          </div>
        </div>
      </div>

      {/* Rendered Variations Gallery Simulation */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Image className="w-4 h-4 text-brand-cyan" /> Consistent Image Render History
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {generatedImages.map((img) => (
            <div key={img.id} className="bg-dark-900 rounded-xl border border-slate-800 p-3 space-y-2 group hover:border-brand-500/40 transition">
              <div className="aspect-[3/4] bg-dark-800 rounded-lg flex flex-col items-center justify-center p-4 border border-slate-800 relative overflow-hidden group-hover:shadow-lg transition">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                <Sparkles className="w-8 h-8 text-brand-400 mb-2 z-10" />
                <span className="text-xs font-bold text-white z-10 text-center">{character.identity?.name || 'Character'}</span>
                <span className="text-[10px] text-slate-400 z-10 text-center">{character.clothing?.activeCategory} Outfit</span>
                <div className="absolute bottom-2 left-2 right-2 text-center z-10">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-900/90 text-brand-300 border border-slate-700">
                    Seed: {img.seed}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>{img.label}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Identity Locked
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
