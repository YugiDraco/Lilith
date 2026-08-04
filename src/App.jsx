import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CharacterPreviewAAA from './components/CharacterPreview';
import AgeVerificationModal from './components/AgeVerificationModal';

import CharacterLibrary from './components/pages/CharacterLibrary';

import VisualHairTab from './components/tabs/VisualHairTab';
import VisualFaceTab from './components/tabs/VisualFaceTab';
import VisualSkinTab from './components/tabs/VisualSkinTab';
import VisualOutfitTab from './components/tabs/VisualOutfitTab';
import BodyEditorTab from './components/tabs/BodyEditorTab';
import VisualPersonalityTab from './components/tabs/VisualPersonalityTab';
import MemoryStudioTab from './components/tabs/MemoryStudioTab';
import EmotionRelationshipTab from './components/tabs/EmotionRelationshipTab';
import AccessoriesEditorTab from './components/tabs/AccessoriesEditorTab';
import ImageStudioTab from './components/tabs/ImageStudioTab';
import VideoStudioTab from './components/tabs/VideoStudioTab';
import JsonDataTab from './components/tabs/JsonDataTab';

import { DEFAULT_CHARACTER_V2, validateCharacterV2 } from './types/characterV2';
import { CHARACTER_PRESETS } from './data/presets';
import { downloadCharacterJSON, parseAndValidateJSON } from './utils/jsonExporter';
import { Scissors, Smile, Sparkles, Shirt, Activity, Heart, BookOpen, Drama, Glasses, Image, Video, Code, ShieldCheck } from 'lucide-react';

export default function App() {
  const [characterList, setCharacterList] = useState([
    DEFAULT_CHARACTER_V2,
    ...CHARACTER_PRESETS.filter(p => p.id !== 'lilith_default').map(p => p.data)
  ]);
  const [activeCharacterId, setActiveCharacterId] = useState(DEFAULT_CHARACTER_V2.identity?.id);
  const [activePage, setActivePage] = useState('studio'); // library, studio
  const [activeTab, setActiveTab] = useState('hair'); // hair, face, skin, clothing, body, personality, memory, emotion, accessories, image, video, json
  const [showAgeModal, setShowAgeModal] = useState(true);

  // Active character reference
  const activeCharacter = characterList.find(c => c.identity?.id === activeCharacterId) || characterList[0] || DEFAULT_CHARACTER_V2;

  const updateActiveCharacter = (updatedData) => {
    setCharacterList(prev => prev.map(c => (c.identity?.id === activeCharacterId ? updatedData : c)));
  };

  const handleSelectPreset = (presetData) => {
    const updated = {
      ...presetData,
      identity: {
        ...presetData.identity,
        id: activeCharacterId || `char_${Date.now()}`
      }
    };
    updateActiveCharacter(updated);
  };

  const handleCreateNew = () => {
    const newId = `char_new_${Date.now()}`;
    const newChar = {
      ...DEFAULT_CHARACTER_V2,
      identity: {
        ...DEFAULT_CHARACTER_V2.identity,
        id: newId,
        name: 'New Companion',
        age: 22
      }
    };
    setCharacterList(prev => [newChar, ...prev]);
    setActiveCharacterId(newId);
    setActivePage('studio');
  };

  const handleDuplicate = (targetChar) => {
    const newId = `char_dup_${Date.now()}`;
    const dupChar = {
      ...targetChar,
      identity: {
        ...targetChar.identity,
        id: newId,
        name: `${targetChar.identity?.name || 'Character'} (Copy)`
      }
    };
    setCharacterList(prev => [dupChar, ...prev]);
  };

  const handleDelete = (idToDelete) => {
    if (characterList.length <= 1) return;
    const filtered = characterList.filter(c => c.identity?.id !== idToDelete);
    setCharacterList(filtered);
    if (activeCharacterId === idToDelete) {
      setActiveCharacterId(filtered[0].identity?.id);
    }
  };

  const handleExportJSON = () => {
    downloadCharacterJSON(activeCharacter, `${activeCharacter.identity?.name?.toLowerCase().replace(/\s+/g, '_')}_anatomy.json`);
  };

  const handleImportJSON = (jsonString) => {
    const res = parseAndValidateJSON(jsonString);
    if (res.success && res.data) {
      const imported = {
        ...res.data,
        identity: {
          ...res.data.identity,
          id: res.data.identity?.id || `char_imp_${Date.now()}`
        }
      };
      setCharacterList(prev => [imported, ...prev]);
      setActiveCharacterId(imported.identity.id);
      alert('Character JSON successfully imported into Library!');
    } else {
      alert(`Import Failed:\n${res.errors.join('\n')}`);
    }
  };

  const handleReset = () => {
    if (confirm('Reset active character to default settings?')) {
      updateActiveCharacter(DEFAULT_CHARACTER_V2);
    }
  };

  const studioTabs = [
    { id: 'hair', label: 'Hair Visuals', icon: Scissors },
    { id: 'face', label: 'Face Visuals', icon: Smile },
    { id: 'skin', label: 'Skin Visuals', icon: Sparkles },
    { id: 'clothing', label: 'Outfit Visuals', icon: Shirt },
    { id: 'body', label: 'Body & Proportions', icon: Activity },
    { id: 'personality', label: 'Personality', icon: Heart },
    { id: 'memory', label: 'Memory Engine', icon: BookOpen },
    { id: 'emotion', label: 'Emotions & Status', icon: Drama },
    { id: 'accessories', label: 'Accessories', icon: Glasses },
    { id: 'image', label: 'Image Studio', icon: Image },
    { id: 'video', label: 'Video Generation', icon: Video },
    { id: 'json', label: 'Structured JSON', icon: Code },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* 18+ Adult Compliance Verification Modal */}
      <AgeVerificationModal
        isOpen={showAgeModal}
        onConfirm={() => setShowAgeModal(false)}
        currentAge={activeCharacter.identity?.age}
      />

      {/* Top Navigation Bar */}
      <Navbar
        character={activeCharacter}
        activePage={activePage}
        setActivePage={setActivePage}
        onSelectPreset={handleSelectPreset}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {activePage === 'library' ? (
          <CharacterLibrary
            characters={characterList}
            activeCharacterId={activeCharacterId}
            onSelectCharacter={(c) => {
              setActiveCharacterId(c.identity?.id);
              setActivePage('studio');
            }}
            onCreateNew={handleCreateNew}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: AAA Portrait HUD Preview (5 Cols on LG) */}
            <div className="lg:col-span-5 sticky top-20">
              <CharacterPreviewAAA
                character={activeCharacter}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Right Column: Visual Creator Studio (7 Cols on LG) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Scrollable Visual Tab Bar */}
              <div className="glass-panel rounded-2xl p-1.5 border border-slate-800 flex items-center gap-1 overflow-x-auto scrollbar-none">
                {studioTabs.map((t) => {
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
                {activeTab === 'hair' && <VisualHairTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'face' && <VisualFaceTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'skin' && <VisualSkinTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'clothing' && <VisualOutfitTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'body' && <BodyEditorTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'personality' && <VisualPersonalityTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'memory' && <MemoryStudioTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'emotion' && <EmotionRelationshipTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'accessories' && <AccessoriesEditorTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'image' && <ImageStudioTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'video' && <VideoStudioTab character={activeCharacter} onChange={updateActiveCharacter} />}
                {activeTab === 'json' && <JsonDataTab character={activeCharacter} onChange={updateActiveCharacter} />}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        Lilith V2 Premium AI Companion Platform &bull; 18+ Adult Fictional Character Compliance Enforced
      </footer>
    </div>
  );
}
