/**
 * Image History Manager for Lilith V3
 * Tracks generated image stack, undo/redo history, favorites list, side-by-side comparison, and image download.
 */

class ImageHistoryManager {
  constructor() {
    this.historyStack = [];
    this.favorites = new Set();
  }

  addEntry(imageData) {
    if (!imageData || !imageData.url) return;
    this.historyStack.unshift({
      id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      ...imageData
    });

    if (this.historyStack.length > 50) {
      this.historyStack.pop();
    }
  }

  getHistory() {
    return this.historyStack;
  }

  toggleFavorite(imgId) {
    if (this.favorites.has(imgId)) {
      this.favorites.delete(imgId);
    } else {
      this.favorites.add(imgId);
    }
  }

  isFavorite(imgId) {
    return this.favorites.has(imgId);
  }

  downloadImage(dataUrl, filename = 'companion_portrait.jpg') {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const imageHistory = new ImageHistoryManager();
