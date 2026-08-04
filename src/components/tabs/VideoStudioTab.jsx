import React, { useState, useEffect } from 'react';
import { VIDEO_ANIMATIONS } from '../../types/character';
import { generateVideoMotionPrompt } from '../../utils/promptGenerator';
import { Video, Play, Pause, RotateCcw, Clapperboard, Sparkles, Lock, Film } from 'lucide-react';

export default function VideoStudioTab({ character, onChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const { video_settings = {} } = character;
  const activeMotion = video_settings.activeMotion || 'walking';

  const updateVideoSettings = (field, val) => {
    onChange({
      ...character,
      video_settings: { ...video_settings, [field]: val }
    });
  };

  // Frame animation loop simulation (12 frames)
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % 12);
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const cameraOptions = [
    'Dynamic Slow Pan In',
    'Dolly Zoom (Vertigo Effect)',
    'Orbital 360 Rotation',
    'Crane Low-Angle Rise',
    'Static Cinematic Tripod'
  ];

  const videoPrompt = generateVideoMotionPrompt(character);

  return (
    <div className="space-y-6">
      {/* Motion Preset Cards Grid */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Clapperboard className="w-4 h-4 text-brand-500" /> Character Motion Animation Presets
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {VIDEO_ANIMATIONS.map(anim => {
            const selected = activeMotion === anim.id;
            return (
              <button
                key={anim.id}
                onClick={() => {
                  updateVideoSettings('activeMotion', anim.id);
                  setCurrentFrame(0);
                }}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  selected
                    ? 'bg-brand-600/20 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'bg-dark-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs">{anim.name}</span>
                    {selected && <Sparkles className="w-3.5 h-3.5 text-brand-400" />}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{anim.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frame Animation Player Simulator & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Video Player Canvas */}
        <div className="md:col-span-2 glass-card p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Film className="w-4 h-4 text-brand-cyan" /> Video Motion Keyframe Simulator
            </h4>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Identity & Anatomy Locked
            </span>
          </div>

          <div className="relative aspect-video bg-dark-900 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Visual Frame Simulation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]" />

            <div className="text-center space-y-2 z-10">
              <div
                className="w-16 h-16 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center mx-auto text-brand-400 transition-transform duration-150"
                style={{
                  transform: `translateY(${Math.sin((currentFrame / 12) * Math.PI * 2) * 8}px) rotate(${Math.sin((currentFrame / 12) * Math.PI) * 4}deg)`
                }}
              >
                <Clapperboard className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-white capitalize">
                {character.identity?.name || 'Character'} — {activeMotion} Motion
              </p>
              <p className="text-xs text-slate-400">
                Frame {currentFrame + 1} / 12 (30 FPS) • {video_settings.cameraMotion || 'Slow Pan'}
              </p>
            </div>

            {/* Frame Progress Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex gap-1">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    idx === currentFrame ? 'bg-brand-400 shadow-md shadow-brand-400/50 scale-y-125' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-md shadow-brand-500/30"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause Simulation' : 'Play Motion Preview'}
              </button>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentFrame(0);
                }}
                className="p-2 rounded-xl bg-dark-800 border border-slate-700 text-slate-400 hover:text-white transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <span>Duration: <strong>{video_settings.durationSeconds || 5}s</strong></span>
              <span>FPS: <strong>{video_settings.fps || 30}</strong></span>
            </div>
          </div>
        </div>

        {/* Motion Camera Settings */}
        <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Camera & Video Render Settings
          </h4>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Camera Movement</label>
            <select
              value={video_settings.cameraMotion || 'Dynamic Slow Pan In'}
              onChange={(e) => updateVideoSettings('cameraMotion', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer"
            >
              {cameraOptions.map(cam => (
                <option key={cam} value={cam}>{cam}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Video Duration (Seconds)</label>
            <input
              type="range"
              min="3"
              max="15"
              value={video_settings.durationSeconds || 5}
              onChange={(e) => updateVideoSettings('durationSeconds', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>3 sec</span>
              <span>15 sec</span>
            </div>
          </div>

          <div className="pt-2">
            <label className="text-[11px] text-slate-400 font-semibold block mb-1">Video Generation Prompt</label>
            <div className="bg-dark-900 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300 leading-relaxed max-h-32 overflow-y-auto">
              {videoPrompt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
