/**
 * Smart Image Cache Service for Lilith V3
 * Hashes character styling parameters and identity lock tokens.
 * Caches generated preview images in memory to instantly re-display previously generated combinations without redundant re-renders.
 */

class ImageCacheService {
  constructor() {
    this.cache = new Map();
  }

  get(hashKey) {
    return this.cache.get(hashKey) || null;
  }

  set(hashKey, imageDataUrl) {
    this.cache.set(hashKey, imageDataUrl);
    // Maintain maximum 100 cached renders in memory
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  clear() {
    this.cache.clear();
  }
}

export const cacheService = new ImageCacheService();
