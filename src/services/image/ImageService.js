import { PromptBuilder } from './PromptBuilder';
import { IdentityProfile } from './IdentityProfile';
import { imageCache } from './ImageCache';
import { LocalAiAdapter } from './adapters/LocalAiAdapter';
import { ExternalApiAdapter } from './adapters/ExternalApiAdapter';

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
    if (!character) throw new Error('Character data required');

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

    // 2. Request Deduplication: Return pending promise if identical request is in-flight
    if (imageCache.hasPending(hashKey)) {
      return imageCache.getPending(hashKey);
    }

    // 3. Queue Execution
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
      } finally {
        imageCache.removePending(hashKey);
      }
    })();

    imageCache.setPending(hashKey, generationPromise);
    return generationPromise;
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
