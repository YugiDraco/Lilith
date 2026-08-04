import React, { useState } from 'react';
import { Camera, Lock, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ImageService } from '../../services/ImageService';

export default function ImageVariationsTab({ character, onSelectVariation }) {
  const [selectedSlot, setSelectedSlot] = useState('portrait');

  const variationSlots = [
    { id: 'portrait', name: 'Studio Portrait', icon: '📸', desc: 'High-res close-up portrait shot' },
    { id: 'fullbody', name: 'Full Body Standing', icon: '🧍‍♀️', desc: 'Full length posture view' },
    { id: 'selfie', name: 'Casual Selfie', icon: '🤳', desc: 'Close intimate angle selfie' },
    { id: 'profile', name: 'Side Profile', icon: '👤', desc: 'Detailed side profile silhouette' },
    { id: 'sitting', name: 'Seated Pose', icon: '🪑', desc: 'Relaxed seated position' },
    { id: 'walking', name: 'City Walking', icon: '🚶‍♀️', desc: 'Dynamic outdoor stride' },
    { id: 'smiling', name: 'Warm Smile', icon: '😊', desc: 'Genuine smiling facial expression' },
    { id: 'formal', name: 'Formal Gala', icon: '👗', desc: 'Evening wear posture' },
    { id: 'casual', name: 'Lounge Casual', icon: '☕', desc: 'Comfortable relaxed setting' },
    { id: 'sleeping', name: 'Peaceful Rest', icon: '🌙', desc: 'Quiet sleeping state' },
    { id: 'reading', name: 'Attentive Reading', icon: '📖', desc: 'Reading tablet or book' },
    { id: 'coffee', name: 'Coffee Shop', icon: '☕', desc: 'Seated at urban cafe table' },
    { id: 'bedroom', name: 'Cozy Bedroom', icon: '🛌', desc: 'Private interior atmosphere' },
    { id: 'office', name: 'Executive Office', icon: '🏢', desc: 'Professional workplace setting' },
    { id: 'gym', name: 'Fitness Gym', icon: '🏋️‍♀️', desc: 'Athletic workout stance' },
    { id: 'beach', name: 'Sunset Beach', icon: '🏖️', desc: 'Golden hour coastline backdrop' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-sans">
            <Camera className="w-4 h-4 text-brand-400" /> Identity-Locked Image Variations
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            All 16 variation slots maintain strict identity lock for {character.identity?.name || 'companion'}.
          </p>
        </div>

        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          <Lock className="w-3.5 h-3.5" /> Identity Locked
        </span>
      </div>

      {/* Grid of Variation Slots */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
        {variationSlots.map(slot => {
          const isSelected = selectedSlot === slot.id;
          return (
            <button
              key={slot.id}
              onClick={() => {
                setSelectedSlot(slot.id);
                if (onSelectVariation) onSelectVariation(slot.id);
              }}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 group ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-600/30 to-brand-accent/20 border-brand-500 ring-2 ring-brand-500/40 shadow-xl glow-brand'
                  : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:bg-dark-800/80'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl">{slot.icon}</span>
                {isSelected && <Sparkles className="w-4 h-4 text-brand-400" />}
              </div>

              <div>
                <h4 className="font-bold text-xs text-white font-sans">{slot.name}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-1">{slot.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
