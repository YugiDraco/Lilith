import React, { useState } from 'react';
import { BODY_TYPES, OVERALL_BUILDS } from '../../types/character';
import { Sliders, Maximize2, Activity, ChevronRight } from 'lucide-react';

export default function BodyEditorTab({ character, onChange }) {
  const [subSection, setSubSection] = useState('proportions'); // proportions, upper, lower

  const { appearance = {}, body = { proportions: {}, upperBody: {}, lowerBody: {} } } = character;
  const props = body.proportions || {};
  const upper = body.upperBody || {};
  const lower = body.lowerBody || {};

  const updateAppearance = (field, val) => {
    onChange({
      ...character,
      appearance: { ...appearance, [field]: val }
    });
  };

  const updateProportion = (sliderKey, val) => {
    onChange({
      ...character,
      body: {
        ...body,
        proportions: { ...props, [sliderKey]: val }
      }
    });
  };

  const updateUpperBody = (field, val) => {
    onChange({
      ...character,
      body: {
        ...body,
        upperBody: { ...upper, [field]: val }
      }
    });
  };

  const updateLowerBody = (field, val) => {
    onChange({
      ...character,
      body: {
        ...body,
        lowerBody: { ...lower, [field]: val }
      }
    });
  };

  const proportionSliders = [
    { key: 'shoulderWidth', label: 'Shoulder Width' },
    { key: 'neckWidth', label: 'Neck Width' },
    { key: 'armLength', label: 'Arm Length' },
    { key: 'armThickness', label: 'Arm Thickness' },
    { key: 'forearmSize', label: 'Forearm Size' },
    { key: 'wristSize', label: 'Wrist Size' },
    { key: 'handSize', label: 'Hand Size' },
    { key: 'torsoLength', label: 'Torso Length' },
    { key: 'waistSize', label: 'Waist Size' },
    { key: 'hipWidth', label: 'Hip Width' },
    { key: 'legLength', label: 'Leg Length' },
    { key: 'thighSize', label: 'Thigh Size' },
    { key: 'calfSize', label: 'Calf Size' },
    { key: 'ankleSize', label: 'Ankle Size' },
    { key: 'footSize', label: 'Foot Size' },
  ];

  return (
    <div className="space-y-6">
      {/* General Body Parameters */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-500" /> General Body Characteristics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Body Type</label>
            <select
              value={appearance.bodyType || 'Athletic'}
              onChange={(e) => updateAppearance('bodyType', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer font-medium"
            >
              {BODY_TYPES.map(bt => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Overall Build</label>
            <select
              value={appearance.overallBuild || 'Mesomorph'}
              onChange={(e) => updateAppearance('overallBuild', e.target.value)}
              className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none cursor-pointer font-medium"
            >
              {OVERALL_BUILDS.map(ob => (
                <option key={ob} value={ob}>{ob}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-slate-400 font-medium">Height (cm)</label>
              <span className="text-xs font-bold text-brand-400">{appearance.heightCm || 175} cm</span>
            </div>
            <input
              type="range"
              min="140"
              max="215"
              value={appearance.heightCm || 175}
              onChange={(e) => updateAppearance('heightCm', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-slate-400 font-medium">Weight (kg)</label>
              <span className="text-xs font-bold text-brand-400">{appearance.weightKg || 62} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="140"
              value={appearance.weightKg || 62}
              onChange={(e) => updateAppearance('weightKg', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Sub-Section Navigation */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setSubSection('proportions')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition ${
            subSection === 'proportions'
              ? 'bg-brand-600 text-white border-t border-x border-brand-500/40'
              : 'text-slate-400 hover:text-white bg-dark-800/40'
          }`}
        >
          Detailed Proportions (15 Sliders)
        </button>
        <button
          onClick={() => setSubSection('upper')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition ${
            subSection === 'upper'
              ? 'bg-brand-600 text-white border-t border-x border-brand-500/40'
              : 'text-slate-400 hover:text-white bg-dark-800/40'
          }`}
        >
          Upper Body Shape
        </button>
        <button
          onClick={() => setSubSection('lower')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition ${
            subSection === 'lower'
              ? 'bg-brand-600 text-white border-t border-x border-brand-500/40'
              : 'text-slate-400 hover:text-white bg-dark-800/40'
          }`}
        >
          Lower Body & Definition
        </button>
      </div>

      {/* Sub-Section Content */}
      {subSection === 'proportions' && (
        <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-400" /> Anatomical Proportion Sliders
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {proportionSliders.map(item => {
              const val = props[item.key] ?? 50;
              return (
                <div key={item.key} className="bg-dark-900/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-800 border border-slate-700 text-brand-300">
                      {val}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={(e) => updateProportion(item.key, parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {subSection === 'upper' && (
        <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Upper Body Parameters
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-dark-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-200">Chest Proportion</span>
                <span className="text-xs font-mono text-brand-400 font-bold">{upper.chestProportion || 50}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={upper.chestProportion || 50}
                onChange={(e) => updateUpperBody('chestProportion', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="bg-dark-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-200">Back Width</span>
                <span className="text-xs font-mono text-brand-400 font-bold">{upper.backWidth || 50}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={upper.backWidth || 50}
                onChange={(e) => updateUpperBody('backWidth', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Shoulder Shape</label>
              <input
                type="text"
                value={upper.shoulderShape || 'Toned Squared'}
                onChange={(e) => updateUpperBody('shoulderShape', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Posture Profile</label>
              <input
                type="text"
                value={upper.posture || 'Erect Athletic'}
                onChange={(e) => updateUpperBody('posture', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {subSection === 'lower' && (
        <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Lower Body & Muscular Definition
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-dark-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-200">Glute Proportion</span>
                <span className="text-xs font-mono text-brand-400 font-bold">{lower.gluteProportion || 50}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={lower.gluteProportion || 50}
                onChange={(e) => updateLowerBody('gluteProportion', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="bg-dark-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-200">Leg & Muscle Definition</span>
                <span className="text-xs font-mono text-brand-400 font-bold">{lower.legDefinition || 50}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={lower.legDefinition || 50}
                onChange={(e) => updateLowerBody('legDefinition', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Hip Contour Shape</label>
              <input
                type="text"
                value={lower.hipShape || 'Hourglass Curves'}
                onChange={(e) => updateLowerBody('hipShape', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Glute & Thigh Contour</label>
              <input
                type="text"
                value={lower.gluteShape || 'Firm Sculpted'}
                onChange={(e) => updateLowerBody('gluteShape', e.target.value)}
                className="w-full bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
