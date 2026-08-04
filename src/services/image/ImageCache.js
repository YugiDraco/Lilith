import { IdentityProfile } from './IdentityProfile.js';

/**
 * Smart Image Cache & Request Deduplication Manager for Lilith V3
 */

class ImageCache {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
  }

  generateHashKey(character, shotType = 'portrait') {
    const profile = new IdentityProfile(character);
    const { hair = {}, clothing = {}, image = {}, emotion = {} } = character || {};

    const hairStyle = hair.style || 'Straight';
    const hairColor = hair.baseColor || '#1c1917';
    const activeCategory = clothing.activeCategory || 'Casual';
    const mood = emotion.currentMood || 'Focused';
    const artStyle = image.artStyle || 'Hyperrealistic';
    const env = image.environmentAssetId || 'Studio';

    return `${profile.getIdentityToken()}_SHOT:${shotType}_HAIR:${hairStyle}_${hairColor}_OUTFIT:${activeCategory}_MOOD:${mood}_STYLE:${artStyle}_ENV:${env}`;
  }

  get(hashKey) {
    return this.cache.get(hashKey) || null;
  }

  set(hashKey, imageDataUrl) {
    this.cache.set(hashKey, imageDataUrl);
    if (this.cache.size > 150) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  hasPending(hashKey) {
    return this.pendingRequests.has(hashKey);
  }

  getPending(hashKey) {
    return this.pendingRequests.get(hashKey);
  }

  setPending(hashKey, promise) {
    this.pendingRequests.set(hashKey, promise);
  }

  removePending(hashKey) {
    this.pendingRequests.delete(hashKey);
  }

  clear() {
    this.cache.clear();
    this.pendingRequests.clear();
  }
}

export const imageCache = new ImageCache();
