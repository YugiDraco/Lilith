import { ImageService } from './ImageService';

/**
 * REST Client Preview API for Lilith V3
 * Delegates requests to Express REST Backend (/api/images/preview, /fullbody, /selfie, /gallery)
 * Enforces 700 ms debouncing and fallback handling.
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
        const endpoint = shotType === 'fullbody' ? '/api/images/fullbody' : shotType === 'selfie' ? '/api/images/selfie' : '/api/images/preview';

        let resData;
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ character, shotType })
          });
          resData = await response.json();
        } catch (fetchErr) {
          // Client-side fallback if Express server is unreachable
          resData = await ImageService.generateShot(character, shotType);
        }

        if (callback) callback(resData);
      } catch (err) {
        console.error('PreviewApi client error:', err);
      }
    }, this.debounceMs);
  }

  async requestGalleryImmediate(character) {
    try {
      const response = await fetch('/api/images/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character })
      });
      return await response.json();
    } catch (err) {
      return ImageService.generateGallery(character);
    }
  }
}

export const PreviewApi = new PreviewApiManager();
