import React, { useState } from 'react';
import { parseNaturalLanguagePrompt } from '../../../utils/aiTextToCompanion';
import { Wand2, Sparkles, ArrowRight } from 'lucide-react';

export default function Step3_DescribeAI({ character, onChange, onNextStep }) {
  const [promptText, setPromptText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSynthesize = (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const parsed = parseNaturalLanguagePrompt(promptText);
      setIsProcessing(false);
      onChange(parsed);
      if (onNextStep) onNextStep();
    }, 600);
  };

  const samplePrompts = [
    "Create a confident 28-year-old Indian software engineer with long black wavy hair, elegant fashion and a warm personality.",
    "A 24-year-old Japanese cyber specialist with sleek black bob hair, emerald eyes, athletic build and witty personality.",
    "A 30-year-old Latina creative director with long wavy hair, sun-kissed skin, bold style and charming smile."
  ];

  return (
    <div className="space-y-5">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 3 of 10 &bull; Optional AI Prompt</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Describe Your Companion</h2>
        <p className="text-xs text-slate-400 mt-1">Describe your ideal companion in natural language. The AI auto-fills missing attributes and updates the preview immediately.</p>
      </div>

      <form onSubmit={handleSynthesize} className="space-y-4">
        <textarea
          rows={4}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="e.g. Create a confident 28-year-old Indian software engineer with long black wavy hair, elegant fashion and a warm personality..."
          className="w-full bg-dark-900 border border-slate-700/80 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none leading-relaxed"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={!promptText.trim() || isProcessing}
            className={`py-3 px-5 rounded-2xl font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-lg ${
              promptText.trim()
                ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-accent text-white shadow-brand-500/30 hover:opacity-95'
                : 'bg-dark-900 text-slate-500 border border-slate-800 cursor-not-allowed'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            {isProcessing ? 'Auto-Filling Attributes...' : 'Auto-Fill & Generate Companion'}
          </button>
        </div>
      </form>

      {/* Sample Quick Ideas */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Try sample descriptions:</span>
        <div className="space-y-1.5">
          {samplePrompts.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPromptText(s);
                const parsed = parseNaturalLanguagePrompt(s);
                onChange(parsed);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-dark-900/80 hover:bg-dark-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition line-clamp-2"
            >
              "{s}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
