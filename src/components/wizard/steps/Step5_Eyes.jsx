import React from 'react';
import VisualAssetGallery from '../../creator/VisualAssetGallery';

export default function Step5_Eyes({ character, onChange }) {
  const { eyes = {} } = character;

  const handleSelectEye = (asset) => {
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

  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 5 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Eye Color & Shape</h2>
        <p className="text-xs text-slate-400 mt-1">Select iris color and eye shape thumbnails.</p>
      </div>

      <VisualAssetGallery
        category="eyes"
        selectedAssetId={eyes.assetId || 'eyes_emerald_cat'}
        onSelectAsset={handleSelectEye}
        title="Visual Eye Gallery"
        description="Select eye color and shape thumbnails below."
      />
    </div>
  );
}
