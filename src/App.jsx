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
import Step2_Ethnicity from './components/wizard/steps/Step2_Ethnicity';
import Step3_Face from './components/wizard/steps/Step3_Face';
import Step4_Hair from './components/wizard/steps/Step4_Hair';
import Step5_Eyes from './components/wizard/steps/Step5_Eyes';
import Step6_Body from './components/wizard/steps/Step6_Body';
import Step7_Outfit from './components/wizard/steps/Step7_Outfit';
import Step8_PersonalityVoice from './components/wizard/steps/Step8_PersonalityVoice';
import Step9_StoryMemory from './components/wizard/steps/Step9_StoryMemory';
import Step10_Complete from './components/wizard/steps/Step10_Complete';

import ImageVariationsTab from './components/tabs/ImageVariationsTab';
import ImageStudioTab from './components/tabs/ImageStudioTab';
import VideoStudioTab from './components/tabs/VideoStudioTab';
import JsonDataTab from './components/tabs/JsonDataTab';

import { DEFAULT_CHARACTER_V2 } from './types/characterV2';
import { CHARACTER_PRESETS } from './data/presets';
import { downloadCharacterJSON, parseAndValidateJSON } from './utils/jsonExporter';
import { Sparkles, MessageSquare, Image, Video, Code, LayoutGrid, SlidersHorizontal, ArrowRight, Wand2, Camera } from 'lucide-react';

export default function App() {
  const [characterList, setCharacterList] = useState([
    DEFAULT_CHARACTER_V2,
    ...CHARACTER_PRESETS.filter(p => p.id !== 'lilith_default').map(p => p.data)
  ]);
  const [activeCharacterId, setActiveCharacterId] = useState(DEFAULT_CHARACTER_V2.identity?.id);
  const [activePage, setActivePage] = useState('welcome'); // welcome, wizard, library, chat, image, video, variations, json
  const [currentStep, setCurrentStep] = useState(1);
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
    setCurrentStep(3); // Jump to Face / Hair creator fine-tuning
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
        activePage={activePage === 'wizard' ? 'studio' : activePage}
        setActivePage={(p) => {
          if (p === 'studio') {
            setActivePage('wizard');
          } else {
            setActivePage(p);
          }
        }}
        onSelectPreset={handleSelectPreset}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onReset={handleReset}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col">
        {/* Welcome Screen with AI Natural Language Generator Prompt Input */}
        {activePage === 'welcome' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-8 space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-accent flex items-center justify-center text-white shadow-2xl shadow-brand-500/40 glow-brand">
              <Sparkles className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30">
                Project Lilith V3 &bull; Live AI Character Engine
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
                Create Your Living AI Companion
              </h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Experience identity-locked AI character creation, instant natural language generation, companion memory, and interactive conversation.
              </p>
            </div>

            {/* Natural Language Text-to-Companion Generator Input */}
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
                Guided Visual Studio <ArrowRight className="w-4 h-4" />
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

        {/* Character Library Screen */}
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

        {/* Image Variations Gallery */}
        {activePage === 'variations' && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <ImageVariationsTab
              character={activeCharacter}
              onSelectVariation={(varId) => setActiveVariation(varId)}
            />
          </div>
        )}

        {/* Image Studio Standalone Screen */}
        {activePage === 'image' && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <ImageStudioTab character={activeCharacter} onChange={updateActiveCharacter} />
          </div>
        )}

        {/* Video Studio Standalone Screen */}
        {activePage === 'video' && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <VideoStudioTab character={activeCharacter} onChange={updateActiveCharacter} />
          </div>
        )}

        {/* JSON Data Hub Standalone Screen */}
        {activePage === 'json' && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <JsonDataTab character={activeCharacter} onChange={updateActiveCharacter} />
          </div>
        )}

        {/* 10-Step Guided Creator Flow with Live AI Character Engine */}
        {activePage === 'wizard' && (
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 45% / 5-col: Dominant Live AI Companion Preview (No Mannequin) */}
              <div className="lg:col-span-5 sticky top-20">
                <AIGeneratedCompanionPreview
                  character={activeCharacter}
                  activeVariation={activeVariation}
                  onSelectVariation={(varId) => setActiveVariation(varId)}
                />
              </div>

              {/* Right 55% / 7-col: Focused Single-Decision Wizard Step Container */}
              <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl min-h-[500px]">
                <WizardStepContainer stepKey={currentStep}>
                  {currentStep === 1 && <Step1_Style character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 2 && <Step2_Ethnicity character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 3 && <Step3_Face character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 4 && <Step4_Hair character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 5 && <Step5_Eyes character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 6 && <Step6_Body character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 7 && <Step7_Outfit character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 8 && <Step8_PersonalityVoice character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 9 && <Step9_StoryMemory character={activeCharacter} onChange={updateActiveCharacter} />}
                  {currentStep === 10 && (
                    <Step10_Complete
                      character={activeCharacter}
                      onStartChat={() => setActivePage('chat')}
                      onOpenImageStudio={() => setActivePage('image')}
                      onOpenVideoStudio={() => setActivePage('video')}
                    />
                  )}
                </WizardStepContainer>
              </div>
            </div>

            {/* Bottom Wizard Bar Navigation */}
            <BottomWizardBar
              currentStep={currentStep}
              totalSteps={10}
              onPrev={handleWizardPrev}
              onNext={handleWizardNext}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        Lilith V3 Live AI Character Engine Platform &bull; 18+ Adult Fictional Character Compliance Enforced
      </footer>
    </div>
  );
}
