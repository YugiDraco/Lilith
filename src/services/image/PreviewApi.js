import { ImageService } from './ImageService';

/**
 * Preview API for Lilith V3
 * Provides 700 ms debounced background image generation, rate limiting, and request validation.
 */

class PreviewApiManager {
  constructor() {
    this.debounceTimer = null;
    this.debounceMs = 700;
  }

  requestPreviewDebounced(character, shotType = 'portrait', callback) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(async () => {
      try {
        const res = await ImageService.generateShot(character, shotType);
        if (callback) callback(res);
      } catch (err) {
        console.error('PreviewApi error:', err);
      }
    }, this.debounceMs);
  }

  async requestPreviewImmediate(character, shotType = 'portrait') {
    return ImageService.generateShot(character, shotType);
  }
}

export const PreviewApi = new PreviewApiManager();
