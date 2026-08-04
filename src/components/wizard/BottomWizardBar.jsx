import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function BottomWizardBar({ currentStep, totalSteps = 10, onPrev, onNext }) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="glass-panel sticky bottom-0 z-40 border-t border-slate-800 p-4 rounded-b-3xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentStep <= 1}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            currentStep <= 1
              ? 'opacity-40 cursor-not-allowed text-slate-500 bg-dark-900 border border-slate-800'
              : 'bg-dark-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        {/* Animated Progress Bar & Counter */}
        <div className="flex-1 max-w-md w-full px-2">
          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 mb-1">
            <span>Step {currentStep} of {totalSteps}</span>
            <span className="font-mono text-brand-300">{progressPercent}% Completed</span>
          </div>
          <div className="w-full bg-dark-900 h-2 rounded-full overflow-hidden border border-slate-800/80">
            <motion.div
              className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-accent h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Next / Complete Button */}
        <button
          onClick={onNext}
          className="px-5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-brand-600 to-brand-accent hover:opacity-95 text-white transition flex items-center gap-1.5 shadow-md shadow-brand-500/25"
        >
          {currentStep >= totalSteps ? (
            <>Complete <CheckCircle2 className="w-4 h-4" /></>
          ) : (
            <>Next Step <ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
