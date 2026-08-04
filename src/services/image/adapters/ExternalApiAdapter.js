import { BaseAdapter } from './BaseAdapter.js';

/**
 * External AI Provider Adapter for Lilith V3
 * Integrates cloud API models (Fal.ai, SDXL, Flux, Pollinations)
 * API keys are safely configured via import.meta.env.VITE_* in Vite frontend environments.
 * Uses NO Node.js process.env globals to prevent browser runtime crashes.
 */

export class ExternalApiAdapter extends BaseAdapter {
  constructor(apiKey = null) {
    super('ExternalApiAdapter');
    this.apiKey = apiKey;
  }

  getApiKey() {
    if (this.apiKey) return this.apiKey;
    try {
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env.VITE_AI_IMAGE_API_KEY || null;
      }
    } catch (e) {
      // Safe fallback
    }
    return null;
  }

  async generate(promptObj, options = {}) {
    try {
      const { positivePrompt } = promptObj || {};
      const safePrompt = positivePrompt || 'photorealistic portrait of a young woman';
      const encodedPrompt = encodeURIComponent(safePrompt);
      const seed = options.seed || Math.floor(Math.random() * 900000);

      // Pollinations AI high-resolution API endpoint
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=800&height=1000&nologo=true`;

      return url;
    } catch (err) {
      console.warn('ExternalApiAdapter generation error:', err);
      throw err;
    }
  }
}
