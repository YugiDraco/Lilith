/**
 * Dynamic Emotion Engine for Lilith V2
 * Tracks 9 emotional dimensions: Happy, Sad, Lonely, Stress, Confidence,
 * Energy, Excitement, Curiosity, Embarrassment.
 * Automatically computes overall mood state.
 */

export class EmotionEngine {
  constructor(emotionModule = {}) {
    this.happy = emotionModule.happy ?? 75;
    this.sad = emotionModule.sad ?? 15;
    this.lonely = emotionModule.lonely ?? 20;
    this.stress = emotionModule.stress ?? 30;
    this.confidence = emotionModule.confidence ?? 90;
    this.energy = emotionModule.energy ?? 85;
    this.excitement = emotionModule.excitement ?? 70;
    this.curiosity = emotionModule.curiosity ?? 88;
    this.embarrassment = emotionModule.embarrassment ?? 10;
    this.currentMood = emotionModule.currentMood || this.computeMood();
  }

  /**
   * Computes primary mood based on 9 emotional levels
   */
  computeMood() {
    if (this.confidence > 80 && this.curiosity > 80) return 'Focused & Strategic';
    if (this.happy > 80 && this.excitement > 75) return 'Playful & Ecstatic';
    if (this.happy > 70 && this.confidence > 70) return 'Warm & Flirty';
    if (this.stress > 70 || this.sad > 60) return 'Stressed & Melancholic';
    if (this.lonely > 60) return 'Pensive & Longing';
    return 'Serene & Balanced';
  }

  /**
   * Adjust emotional values
   */
  adjust(dimension, delta) {
    if (this[dimension] !== undefined) {
      this[dimension] = Math.max(0, Math.min(100, this[dimension] + delta));
      this.currentMood = this.computeMood();
    }
    return this.toModule();
  }

  toModule() {
    return {
      happy: this.happy,
      sad: this.sad,
      lonely: this.lonely,
      stress: this.stress,
      confidence: this.confidence,
      energy: this.energy,
      excitement: this.excitement,
      curiosity: this.curiosity,
      embarrassment: this.embarrassment,
      currentMood: this.currentMood
    };
  }
}
