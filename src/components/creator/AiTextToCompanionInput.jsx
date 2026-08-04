import React, { useState } from 'react';
import { parseNaturalLanguagePrompt } from '../../utils/aiTextToCompanion';
import { Sparkles, Wand2, ArrowRight } from 'lucide-react';

export default function AiTextToCompanionInput({ onGenerateCompanion }) {
  const [promptText, setPromptText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const generatedChar = parseNaturalLanguagePrompt(promptText);
      setIsProcessing(false);
      onGenerateCompanion(generatedChar);
    }, 600);
  };

  const samplePrompts = [
    "32-year-old Indian architect with long black wavy hair, warm brown skin, athletic build, elegant style",
    "24-year-old Cyberpunk Operative with violet hair, almond green eyes, sharp jawline and athletic build",
    "26-year-old High Elf Sorceress with ultra-long platinum hair, glowing eyes and regal demeanor"
  ];

  return (
    <div className="glass-card p-5 rounded-3xl border border-brand-500/30 bg-brand-500/5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-brand-500/20 text-brand-400">
          <Wand2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
            AI Prompt-Assisted Creation <Sparkles className="w-4 h-4 text-brand-accent" />
          </h3>
          <p className="text-xs text-slate-300">
            Type any natural language description to auto-generate matching companion attributes and live AI preview.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="e.g. Create a 28-year-old Latina creative director with long wavy hair..."
          className="flex-1 bg-dark-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isProcessing}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-accent hover:opacity-95 text-white font-extrabold text-xs transition flex items-center gap-1.5 shadow-lg shadow-brand-500/30 whitespace-nowrap"
        >
          {isProcessing ? 'Synthesizing...' : <>Generate Companion <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      {/* Sample Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Try sample prompts:</span>
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPromptText(sample);
                const generatedChar = parseNaturalLanguagePrompt(sample);
                onGenerateCompanion(generatedChar);
              }}
              className="text-[11px] text-slate-300 bg-dark-900/80 hover:bg-dark-800 border border-slate-800 rounded-xl px-3 py-1 text-left transition truncate max-w-xs"
            >
              "{sample}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
