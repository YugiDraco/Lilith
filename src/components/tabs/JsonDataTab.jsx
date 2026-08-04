import React, { useState } from 'react';
import { exportCharacterToJSON, parseAndValidateJSON } from '../../utils/jsonExporter';
import { Code, CheckCircle, AlertTriangle, Copy, Check, Download, Layers } from 'lucide-react';

export default function JsonDataTab({ character, onChange }) {
  const [jsonText, setJsonText] = useState(exportCharacterToJSON(character));
  const [copied, setCopied] = useState(false);
  const [validationResult, setValidationResult] = useState(parseAndValidateJSON(jsonText));

  // Sync text when character prop updates externally
  React.useEffect(() => {
    const updated = exportCharacterToJSON(character);
    setJsonText(updated);
    setValidationResult(parseAndValidateJSON(updated));
  }, [character]);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setJsonText(text);
    const res = parseAndValidateJSON(text);
    setValidationResult(res);
    if (res.success && res.data) {
      onChange(res.data);
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Validation Banner */}
      <div className={`glass-card p-4 rounded-xl border flex items-center justify-between gap-4 ${
        validationResult.success
          ? 'border-emerald-500/40 bg-emerald-500/5'
          : 'border-rose-500/40 bg-rose-500/5'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${validationResult.success ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {validationResult.success ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {validationResult.success ? 'Structured JSON Schema Validated' : 'JSON Schema Validation Issues'}
            </h4>
            <p className="text-xs text-slate-300">
              {validationResult.success
                ? 'All 16 core modules (identity, body, face, hair, clothing, etc.) & 18+ age verification are intact.'
                : validationResult.errors.join(' | ')}
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyJSON}
          className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition flex items-center gap-1.5 shadow-md shadow-brand-500/20"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied JSON!' : 'Copy JSON'}
        </button>
      </div>

      {/* Live JSON Code Editor */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4 text-brand-400" /> Interactive Character JSON Data Hub
          </h3>
          <span className="text-[11px] text-slate-400">Edits here instantly hydrate editor tabs</span>
        </div>

        <textarea
          rows={18}
          value={jsonText}
          onChange={handleTextChange}
          className="w-full bg-dark-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-brand-300 focus:border-brand-500 focus:outline-none leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Extensible Architecture Note */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-cyan" /> Modular Architecture & Provider Extension
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          The character storage model uses a decoupled module registry. Additional body attributes, clothing categories, or image/video generator backends (SDXL, Flux, Midjourney, Runway, Sora) can be registered into the JSON schema dynamically without altering core editor logic.
        </p>
      </div>
    </div>
  );
}
