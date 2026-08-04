import { PromptBuilder } from './PromptBuilder.js';
import { IdentityProfile } from './IdentityProfile.js';
import { imageCache } from './ImageCache.js';
import { LocalAiAdapter } from './adapters/LocalAiAdapter.js';
import { ExternalApiAdapter } from './adapters/ExternalApiAdapter.js';

/**
 * Master ImageService for Lilith V3
 * Public API:
 * - ImageService.generatePreview(character)
 * - ImageService.generatePortrait(character)
 * - ImageService.generateSelfie(character)
 * - ImageService.generateFullBody(character)
 * - ImageService.generateGallery(character)
 */

class ImageServiceManager {
  constructor() {
    this.localAdapter = new LocalAiAdapter();
    this.externalAdapter = new ExternalApiAdapter();
    this.activeAdapter = this.localAdapter;
  }

  setAdapter(adapterInstance) {
    this.activeAdapter = adapterInstance;
  }

  async generateShot(character, shotType = 'portrait') {
    if (!character) {
      return {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        isCached: false,
        hashKey: 'default',
        prompt: 'portrait',
        seed: 12345
      };
    }

    try {
      const promptObj = PromptBuilder.buildPrompt(character, shotType);
      const hashKey = imageCache.generateHashKey(character, shotType);

      // 1. Check Smart Cache
      const cachedUrl = imageCache.get(hashKey);
      if (cachedUrl) {
        return {
          url: cachedUrl,
          isCached: true,
          hashKey,
          prompt: promptObj.positivePrompt,
          seed: promptObj.seed
        };
      }

      // 2. Request Deduplication
      if (imageCache.hasPending(hashKey)) {
        return imageCache.getPending(hashKey);
      }

      // 3. Queue Execution with Try/Catch Fallback
      const generationPromise = (async () => {
        try {
          let imageUrl;
          try {
            imageUrl = await this.activeAdapter.generate(promptObj, { character, shotType, seed: promptObj.seed });
          } catch (err) {
            console.warn('Primary adapter failed, falling back to LocalAiAdapter:', err);
            imageUrl = await this.localAdapter.generate(promptObj, { character, shotType, seed: promptObj.seed });
          }

          imageCache.set(hashKey, imageUrl);
          return {
            url: imageUrl,
            isCached: false,
            hashKey,
            prompt: promptObj.positivePrompt,
            seed: promptObj.seed
          };
        } catch (innerErr) {
          console.error('ImageService generation failed:', innerErr);
          const fallbackUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
          return {
            url: fallbackUrl,
            isCached: false,
            hashKey,
            prompt: promptObj.positivePrompt,
            seed: promptObj.seed
          };
        } finally {
          imageCache.removePending(hashKey);
        }
      })();

      imageCache.setPending(hashKey, generationPromise);
      return generationPromise;
    } catch (err) {
      console.error('ImageService outer error:', err);
      return {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        isCached: false,
        hashKey: 'fallback',
        prompt: 'portrait',
        seed: 12345
      };
    }
  }

  async generatePreview(character) {
    return this.generateShot(character, 'portrait');
  }

  async generatePortrait(character) {
    return this.generateShot(character, 'portrait');
  }

  async generateSelfie(character) {
    return this.generateShot(character, 'selfie');
  }

  async generateFullBody(character) {
    return this.generateShot(character, 'fullbody');
  }

  async generateGallery(character) {
    const shotTypes = ['portrait', 'fullbody', 'selfie', 'profile'];
    const results = await Promise.all(shotTypes.map(st => this.generateShot(character, st)));
    return results;
  }
}

export const ImageService = new ImageServiceManager();
