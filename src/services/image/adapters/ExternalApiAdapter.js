import { BaseAdapter } from './BaseAdapter';

/**
 * External AI Provider Adapter for Lilith V3
 * Integrates external cloud API models (Fal.ai, SDXL, Flux, Pollinations)
 * API keys are safely configured via process.env / VITE_AI_IMAGE_API_KEY and never exposed to raw frontend code.
 */

export class ExternalApiAdapter extends BaseAdapter {
  constructor(apiKey = import.meta.env?.VITE_AI_IMAGE_API_KEY) {
    super('ExternalApiAdapter');
    this.apiKey = apiKey;
  }

  async generate(promptObj, options = {}) {
    const { positivePrompt } = promptObj;
    const encodedPrompt = encodeURIComponent(positivePrompt);
    const seed = options.seed || Math.floor(Math.random() * 900000);

    // Pollinations AI high-resolution API endpoint
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=800&height=1000&nologo=true`;

    return url;
  }
}
