import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CharacterPreview from './components/CharacterPreview';
import AgeVerificationModal from './components/AgeVerificationModal';

import IdentityTab from './components/tabs/IdentityTab';
import BodyEditorTab from './components/tabs/BodyEditorTab';
import FaceEditorTab from './components/tabs/FaceEditorTab';
import HairEditorTab from './components/tabs/HairEditorTab';
import SkinEditorTab from './components/tabs/SkinEditorTab';
import ClothingEditorTab from './components/tabs/ClothingEditorTab';
import AccessoriesEditorTab from './components/tabs/AccessoriesEditorTab';
import ImageStudioTab from './components/tabs/ImageStudioTab';
import VideoStudioTab from './components/tabs/VideoStudioTab';
import JsonDataTab from './components/tabs/JsonDataTab';

import { DEFAULT_CHARACTER } from './types/character';
import { downloadCharacterJSON, parseAndValidateJSON } from './utils/jsonExporter';
import { User, Activity, Smile, Scissors, Sparkles, Shirt, Glasses, Image, Video, Code, ShieldCheck } from 'lucide-react';

export default function App() {
  const [character, setCharacter] = useState(DEFAULT_CHARACTER);
  const [activeTab, setActiveTab] = useState('body'); // identity, body, face, hair, skin, clothing, accessories, image, video, json
  const [showAgeModal, setShowAgeModal] = useState(true);

  const tabs = [
    { id: 'identity', label: 'Identity (18+)', icon: ShieldCheck },
    { id: 'body', label: 'Body & Proportions', icon: Activity },
    { id: 'face', label: 'Face Editor', icon: Smile },
    { id: 'hair', label: 'Hair Styling', icon: Scissors },
    { id: 'skin', label: 'Skin & Marks', icon: Sparkles },
    { id: 'clothing', label: 'Clothing System', icon: Shirt },
    { id: 'accessories', label: 'Accessories', icon: Glasses },
    { id: 'image', label: 'Image Studio', icon: Image },
    { id: 'video', label: 'Video Generation', icon: Video },
    { id: 'json', label: 'Structured JSON', icon: Code },
  ];

  const handleSelectPreset = (data) => {
    setCharacter(data);
  };

  const handleExportJSON = () => {
    downloadCharacterJSON(character, `${character.identity?.name?.toLowerCase().replace(/\s+/g, '_') || 'character'}_anatomy.json`);
  };

  const handleImportJSON = (jsonString) => {
    const res = parseAndValidateJSON(jsonString);
    if (res.success && res.data) {
      setCharacter(res.data);
      alert('Character JSON successfully imported and validated!');
    } else {
      alert(`Import Failed:\n${res.errors.join('\n')}`);
    }
  };

  const handleReset = () => {
    if (confirm('Reset character to default settings?')) {
      setCharacter(DEFAULT_CHARACTER);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* 18+ Age Verification Modal */}
      <AgeVerificationModal
        isOpen={showAgeModal}
        onConfirm={() => setShowAgeModal(false)}
        currentAge={character.identity?.age}
      />

      {/* Top Navbar */}
      <Navbar
        character={character}
        onSelectPreset={handleSelectPreset}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onReset={handleReset}
      />

      {/* Main Workspace Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Anatomical Mannequin Preview (5 Cols on LG) */}
        <div className="lg:col-span-5 sticky top-20">
          <CharacterPreview
            character={character}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Right Column: Customization & Generation Tabs (7 Cols on LG) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Scrollable Tab Bar */}
          <div className="glass-panel rounded-2xl p-1.5 border border-slate-800 flex items-center gap-1 overflow-x-auto scrollbar-none">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600 to-brand-accent text-white shadow-md shadow-brand-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-dark-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div className="min-h-[500px]">
            {activeTab === 'identity' && <IdentityTab character={character} onChange={setCharacter} />}
            {activeTab === 'body' && <BodyEditorTab character={character} onChange={setCharacter} />}
            {activeTab === 'face' && <FaceEditorTab character={character} onChange={setCharacter} />}
            {activeTab === 'hair' && <HairEditorTab character={character} onChange={setCharacter} />}
            {activeTab === 'skin' && <SkinEditorTab character={character} onChange={setCharacter} />}
            {activeTab === 'clothing' && <ClothingEditorTab character={character} onChange={setCharacter} />}
            {activeTab === 'accessories' && <AccessoriesEditorTab character={character} onChange={setCharacter} />}
            {activeTab === 'image' && <ImageStudioTab character={character} onChange={setCharacter} />}
            {activeTab === 'video' && <VideoStudioTab character={character} onChange={setCharacter} />}
            {activeTab === 'json' && <JsonDataTab character={character} onChange={setCharacter} />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        Lilith Advanced Character Anatomy & Consistent Generation Module &bull; 18+ Adult Character Compliance Enforced
      </footer>
    </div>
  );
}
