import React from 'react';
import VisualAssetGallery from '../../creator/VisualAssetGallery';

export default function Step3_Face({ character, onChange }) {
  const { face = {} } = character;

  const handleSelectFaceShape = (asset) => {
    onChange({
      ...character,
      face: {
        ...face,
        assetId: asset.id,
        shape: asset.name
      }
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 3 of 10</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Choose Facial Structure</h2>
        <p className="text-xs text-slate-400 mt-1">Select face shape presets. Changing face shape preserves identity consistency.</p>
      </div>

      <VisualAssetGallery
        category="face"
        selectedAssetId={face.assetId || 'face_oval_01'}
        onSelectAsset={handleSelectFaceShape}
        title="Facial Bone Structure Gallery"
        description="Select face contour thumbnails below."
      />
    </div>
  );
}
