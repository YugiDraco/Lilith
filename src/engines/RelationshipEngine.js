/**
 * Relationship Engine for Lilith V2
 * Tracks 6 relationship metrics: Trust, Affection, Comfort, Friendship, Respect, Attachment.
 * Computes relationship status progression matrix.
 */

export class RelationshipEngine {
  constructor(relModule = {}) {
    this.trust = relModule.trust ?? 85;
    this.affection = relModule.affection ?? 80;
    this.comfort = relModule.comfort ?? 78;
    this.friendship = relModule.friendship ?? 88;
    this.respect = relModule.respect ?? 92;
    this.attachment = relModule.attachment ?? 75;
    this.status = relModule.status || this.computeStatus();
  }

  computeStatus() {
    const avg = (this.trust + this.affection + this.comfort + this.friendship + this.respect + this.attachment) / 6;
    if (avg >= 85) return 'Confidante & Soulmate';
    if (avg >= 70) return 'Trusted Companion & Partner';
    if (avg >= 55) return 'Warm Ally & Friend';
    if (avg >= 40) return 'Casual Friend';
    return 'Acquaintance';
  }

  adjust(metric, delta) {
    if (this[metric] !== undefined) {
      this[metric] = Math.max(0, Math.min(100, this[metric] + delta));
      this.status = this.computeStatus();
    }
    return this.toModule();
  }

  toModule() {
    return {
      trust: this.trust,
      affection: this.affection,
      comfort: this.comfort,
      friendship: this.friendship,
      respect: this.respect,
      attachment: this.attachment,
      status: this.status
    };
  }
}
