import React, { useState } from 'react';
import VisualAssetGallery from '../creator/VisualAssetGallery';
import { Eye, Smile, Sparkles } from 'lucide-react';

export default function VisualFaceTab({ character, onChange }) {
  const [subSection, setSubSection] = useState('eyes'); // eyes, eyebrows, nose, lips, ears

  const { face = {}, eyes = {} } = character;

  const handleSelectEyeAsset = (asset) => {
    onChange({
      ...character,
      eyes: {
        ...eyes,
        assetId: asset.id,
        color: asset.name,
        shape: asset.tags?.[1] || eyes.shape
      }
    });
  };

  const handleSelectEyebrowAsset = (asset) => {
    onChange({
      ...character,
      eyes: {
        ...eyes,
        eyebrowsAssetId: asset.id
      }
    });
  };

  const handleSelectNoseAsset = (asset) => {
    onChange({
      ...character,
      face: {
        ...face,
        noseAssetId: asset.id
      }
    });
  };

  const handleSelectLipsAsset = (asset) => {
    onChange({
      ...character,
      face: {
        ...face,
        lipsAssetId: asset.id
      }
    });
  };

  const handleSelectEarsAsset = (asset) => {
    onChange({
      ...character,
      face: {
        ...face,
        earsAssetId: asset.id,
        ears: asset.name
      }
    });
  };

  const updateFaceSlider = (field, val) => {
    onChange({
      ...character,
      face: { ...face, [field]: val }
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub Category Selector */}
      <div className="flex border-b border-slate-800 gap-2">
        {['eyes', 'eyebrows', 'nose', 'lips', 'ears'].map(sub => (
          <button
            key={sub}
            onClick={() => setSubSection(sub)}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl capitalize transition ${
              subSection === sub
                ? 'bg-brand-600 text-white border-t border-x border-brand-500/40'
                : 'text-slate-400 hover:text-white bg-dark-800/40'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {subSection === 'eyes' && (
        <VisualAssetGallery
          category="eyes"
          selectedAssetId={eyes.assetId || 'eyes_emerald_cat'}
          onSelectAsset={handleSelectEyeAsset}
          title="Eye Iris & Shape Gallery"
          description="Select eye color and shape thumbnails dynamically."
        />
      )}

      {subSection === 'eyebrows' && (
        <VisualAssetGallery
          category="eyebrows"
          selectedAssetId={eyes.eyebrowsAssetId || 'brow_arch_01'}
          onSelectAsset={handleSelectEyebrowAsset}
          title="Eyebrow Shape Gallery"
          description="Select eyebrow arch and density presets."
        />
      )}

      {subSection === 'nose' && (
        <VisualAssetGallery
          category="nose"
          selectedAssetId={face.noseAssetId || 'nose_button_01'}
          onSelectAsset={handleSelectNoseAsset}
          title="Nose Contour Gallery"
          description="Select anatomical nose shape presets."
        />
      )}

      {subSection === 'lips' && (
        <VisualAssetGallery
          category="lips"
          selectedAssetId={face.lipsAssetId || 'lips_plump_01'}
          onSelectAsset={handleSelectLipsAsset}
          title="Lips & Cupid's Bow Gallery"
          description="Select lip fullness and shape presets."
        />
      )}

      {subSection === 'ears' && (
        <VisualAssetGallery
          category="ears"
          selectedAssetId={face.earsAssetId || 'ears_pierced_01'}
          onSelectAsset={handleSelectEarsAsset}
          title="Ears & Piercings Gallery"
          description="Select standard or elven ear presets."
        />
      )}

      {/* Facial Fine Structure Sliders */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Smile className="w-4 h-4 text-brand-accent" /> Facial Structure Fine Tuning
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-900/80 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-200">Jawline Sharpness</span>
              <span className="text-xs font-mono text-brand-400 font-bold">{face.jawline || 50}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={face.jawline || 50}
              onChange={(e) => updateFaceSlider('jawline', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-dark-900/80 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-200">Cheekbones Height</span>
              <span className="text-xs font-mono text-brand-400 font-bold">{face.cheekbones || 50}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={face.cheekbones || 50}
              onChange={(e) => updateFaceSlider('cheekbones', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-dark-900/80 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-200">Chin Definition</span>
              <span className="text-xs font-mono text-brand-400 font-bold">{face.chin || 50}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={face.chin || 50}
              onChange={(e) => updateFaceSlider('chin', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
