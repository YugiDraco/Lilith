import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AIGeneratedCompanionPreview from './components/preview/AIGeneratedCompanionPreview';
import AgeVerificationModal from './components/AgeVerificationModal';

import CharacterLibrary from './components/pages/CharacterLibrary';
import CompanionChatScreen from './components/chat/CompanionChatScreen';
import AiTextToCompanionInput from './components/creator/AiTextToCompanionInput';

import WizardStepContainer from './components/wizard/WizardStepContainer';
import BottomWizardBar from './components/wizard/BottomWizardBar';

import Step1_Style from './components/wizard/steps/Step1_Style';
import Step2_Gender from './components/wizard/steps/Step2_Gender';
import Step3_DescribeAI from './components/wizard/steps/Step3_DescribeAI';
import Step4_Ethnicity from './components/wizard/steps/Step2_Ethnicity';
import Step5_Age from './components/wizard/steps/Step5_Age';
import Step6_BodyType from './components/wizard/steps/Step6_BodyType';
import Step7_Face from './components/wizard/steps/Step3_Face';
import Step8_Hair from './components/wizard/steps/Step4_Hair';
import Step9_Outfit from './components/wizard/steps/Step7_Outfit';
import Step10_PersonalityPresets from './components/wizard/steps/Step10_PersonalityPresets';
import Step10_Complete from './components/wizard/steps/Step10_Complete';

import VisualHairTab from './components/tabs/VisualHairTab';
import VisualFaceTab from './components/tabs/VisualFaceTab';
import VisualSkinTab from './components/tabs/VisualSkinTab';
import VisualOutfitTab from './components/tabs/VisualOutfitTab';
import BodyEditorTab from './components/tabs/BodyEditorTab';
import VisualPersonalityTab from './components/tabs/VisualPersonalityTab';
import MemoryStudioTab from './components/tabs/MemoryStudioTab';
import EmotionRelationshipTab from './components/tabs/EmotionRelationshipTab';
import AccessoriesEditorTab from './components/tabs/AccessoriesEditorTab';
import ImageVariationsTab from './components/tabs/ImageVariationsTab';
import ImageStudioTab from './components/tabs/ImageStudioTab';
import VideoStudioTab from './components/tabs/VideoStudioTab';
import JsonDataTab from './components/tabs/JsonDataTab';

import { DEFAULT_CHARACTER_V2 } from './types/characterV2';
import { CHARACTER_PRESETS } from './data/presets';
import { downloadCharacterJSON, parseAndValidateJSON } from './utils/jsonExporter';
import { Sparkles, MessageSquare, Image, Video, Code, LayoutGrid, SlidersHorizontal, ArrowRight, Wand2, Scissors, Smile, Shirt, Activity, Heart, BookOpen, Drama, Glasses } from 'lucide-react';

export default function App() {
  const [characterList, setCharacterList] = useState([
    DEFAULT_CHARACTER_V2,
    ...CHARACTER_PRESETS.filter(p => p.id !== 'lilith_default').map(p => p.data)
  ]);
  const [activeCharacterId, setActiveCharacterId] = useState(DEFAULT_CHARACTER_V2.identity?.id);
  const [activePage, setActivePage] = useState('welcome'); // welcome, wizard, studio, library, chat, image, video, json
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('hair');
  const [activeVariation, setActiveVariation] = useState('portrait');
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
    setCurrentStep(1);
    setActivePage('wizard');
  };

  const handleAiTextGeneratedCompanion = (generatedChar) => {
    const newId = `char_ai_${Date.now()}`;
    const hydChar = {
      ...generatedChar,
      identity: {
        ...generatedChar.identity,
        id: newId
      }
    };
    setCharacterList(prev => [hydChar, ...prev]);
    setActiveCharacterId(newId);
    setCurrentStep(4);
    setActivePage('wizard');
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
      alert('Character JSON successfully imported into Vault!');
    } else {
      alert(`Import Failed:\n${res.errors.join('\n')}`);
    }
  };

  const handleReset = () => {
    if (confirm('Reset active character to default settings?')) {
      updateActiveCharacter(DEFAULT_CHARACTER_V2);
      setCurrentStep(1);
    }
  };

  const handleWizardNext = () => {
    if (currentStep < 10) {
      setCurrentStep(prev => prev + 1);
    } else {
      setActivePage('chat');
    }
  };

  const handleWizardPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
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

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col">
        {/* Welcome Landing Screen */}
        {activePage === 'welcome' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-8 space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center text-white shadow-2xl shadow-brand-500/40 glow-brand">
              <Sparkles className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30">
                Project Lilith V3 &bull; AI Companion Platform
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
                Create Your Living Digital Companion
              </h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Guided step-by-step companion wizard, instant AI prompt auto-fill, identity-locked photorealistic engine, and interactive chat.
              </p>
            </div>

            {/* AI Prompt Auto-Filler */}
            <div className="w-full text-left">
              <AiTextToCompanionInput onGenerateCompanion={handleAiTextGeneratedCompanion} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full max-w-md">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setActivePage('wizard');
                }}
                className="flex-1 py-3.5 px-6 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-brand-600 via-brand-500 to-brand-accent text-white shadow-xl shadow-brand-500/30 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                Guided Creation Wizard <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActivePage('library')}
                className="py-3.5 px-6 rounded-2xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-slate-200 font-bold text-sm transition flex items-center justify-center gap-2"
              >
                <LayoutGrid className="w-4 h-4 text-brand-cyan" /> Companion Vault
              </button>
            </div>
          </div>
        )}

        {/* Character Library Vault Screen */}
        {activePage === 'library' && (
          <CharacterLibrary
            characters={characterList}
            activeCharacterId={activeCharacterId}
            onSelectCharacter={(c) => {
              setActiveCharacterId(c.identity?.id);
              setCurrentStep(1);
              setActivePage('wizard');
            }}
            onCreateNew={handleCreateNew}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}

        {/* Interactive Companion Chat Screen */}
        {activePage === 'chat' && (
          <CompanionChatScreen
            character={activeCharacter}
            onBackToCreator={() => setActivePage('wizard')}
          />
        )}

        {/* 10-Step Guided Creator Mode (Wizard) */}
        {activePage === 'wizard' && (
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 45% / 5-col: Hero AI Companion Preview */}
              <div className="lg:col-span-5 sticky top-20">
                <AIGeneratedCompanionPreview
                  character={activeCharacter}
                  activeVariation={activeVariation}
                  onSelectVariation={(varId) => setActiveVariation(varId)}
                />
              </div>

              {/* Right 55% / 7-col: Single-Decision Step Container */}
              <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl min-h-[500px]">
                <WizardStepContainer stepKey={currentStep}>
                  {currentStep === 1 && <Step1_Style character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 2 && <Step2_Gender character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 3 && <Step3_DescribeAI character={activeCharacter} onChange={updateActiveCharacter} onNextStep={handleWizardNext} />}
                  {currentStep === 4 && <Step4_Ethnicity character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 5 && <Step5_Age character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 6 && <Step6_BodyType character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 7 && <Step7_Face character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 8 && <Step8_Hair character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 9 && <Step9_Outfit character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 10 && <Step10_PersonalityPresets character={activeCharacter} onChange={updateActiveCharacter} />}
                </WizardStepContainer>
              </div>
            </div>

            {/* Bottom Wizard Bar */}
            <BottomWizardBar
              currentStep={currentStep}
              totalSteps={10}
              onPrev={handleWizardPrev}
              onNext={handleWizardNext}
            />
          </div>
        )}

        {/* Studio Mode (Unlocked Power-User Tools) */}
        {activePage === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 45% / 5-col: Hero AI Companion Preview */}
            <div className="lg:col-span-5 sticky top-20">
              <AIGeneratedCompanionPreview
                character={activeCharacter}
                activeVariation={activeVariation}
                onSelectVariation={(varId) => setActiveVariation(varId)}
              />
            </div>

            {/* Right 55% / 7-col: Studio Customization Tabs */}
            <div className="lg:col-span-7 space-y-5">
              {/* Studio Tab Bar */}
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

              {/* Active Studio Tab Panel */}
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
        Lilith V3 AI Companion Platform &bull; 18+ Adult Fictional Character Compliance Enforced
      </footer>
    </div>
  );
}
