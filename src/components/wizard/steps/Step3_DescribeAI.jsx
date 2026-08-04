import React, { useState } from 'react';
import { parseNaturalLanguagePrompt } from '../../../utils/aiTextToCompanion';
import { Wand2, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function Step3_DescribeAI({ character, onChange, onNextStep }) {
  const [promptText, setPromptText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSynthesize = (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const parsed = parseNaturalLanguagePrompt(promptText);
      setIsProcessing(false);
      setIsDone(true);
      onChange(parsed);
    }, 500);
  };

  const samplePrompts = [
    "Create a confident Indian architect with long black wavy hair, warm brown skin and elegant fashion.",
    "A 24-year-old Japanese cyber operative with violet hair, almond eyes, athletic build and witty personality.",
    "A 26-year-old Latina creative director with long wavy hair, sun-kissed skin and charming smile."
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">Step 3 of 10 &bull; Natural Language AI</span>
        <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">Describe Your Companion</h2>
        <p className="text-xs text-slate-400 mt-1">Describe your companion in natural language. AI understands and auto-hydrates their appearance immediately.</p>
      </div>

      <form onSubmit={handleSynthesize} className="space-y-4">
        <textarea
          rows={4}
          value={promptText}
          onChange={(e) => {
            setPromptText(e.target.value);
            setIsDone(false);
          }}
          placeholder="e.g. Create a confident Indian architect with long black wavy hair, warm brown skin and elegant fashion..."
          className="w-full bg-dark-900 border border-slate-700/80 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none leading-relaxed"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={!promptText.trim() || isProcessing}
            className={`py-3.5 px-6 rounded-2xl font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-lg ${
              promptText.trim()
                ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-accent text-white shadow-brand-500/30 hover:opacity-95'
                : 'bg-dark-900 text-slate-500 border border-slate-800 cursor-not-allowed'
            }`}
          >
            {isDone ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Companion Hydrated!
              </>
            ) : isProcessing ? (
              <>
                <Wand2 className="w-4 h-4 animate-spin" /> Understanding Prompt...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" /> Synthesize Companion
              </>
            )}
          </button>
        </div>
      </form>

      {/* Sample Quick Prompts */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Try sample prompt ideas:</span>
        <div className="space-y-1.5">
          {samplePrompts.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPromptText(s);
                setIsDone(true);
                const parsed = parseNaturalLanguagePrompt(s);
                onChange(parsed);
              }}
              className="w-full text-left p-3 rounded-xl bg-dark-900/80 hover:bg-dark-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition line-clamp-2"
            >
              "{s}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
