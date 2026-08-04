/**
 * Identity Profile Object for Lilith V3
 * Reused for every generation request to guarantee strict identity lock.
 * Preserves face structure, eye shape/color, jawline, nose, lips, skin tone, hairline, and seed signature.
 */

export class IdentityProfile {
  constructor(character) {
    const { identity = {}, face = {}, hair = {}, eyes = {}, skin = {}, image = {} } = character || {};

    this.id = identity.id || 'char_default';
    this.name = identity.name || 'Lilith Vane';
    this.seed = image.seed || this.synthesizeSeed(this.name);

    this.faceShape = face.shape || 'Oval Diamond';
    this.jawline = face.jawline || 'Soft Curved V-Line';
    this.noseShape = face.noseShape || 'Straight Refined';
    this.lipShape = face.lipShape || 'Full Glossy';

    this.eyeColor = eyes.color || 'Emerald Green';
    this.eyeShape = eyes.shape || 'Almond Lifted';

    this.skinTone = skin.tone || '#fcd34d';
    this.skinUndertone = skin.undertone || 'Warm Golden';

    this.hairline = hair.hairline || 'Natural Rounded';
  }

  synthesizeSeed(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 9000000 + 1000000;
  }

  getIdentityToken() {
    return `IDENTITY_LOCK[ID:${this.id}|NAME:${this.name}|SEED:${this.seed}|FACE:${this.faceShape}|EYES:${this.eyeColor}|SKIN:${this.skinTone}]`;
  }
}
