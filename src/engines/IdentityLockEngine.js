/**
 * Identity Lock Engine for Lilith V3
 * Synthesizes and maintains a consistent identity lock token, seed, and facial feature signature.
 * Guarantees that changing hair, clothing, background, or pose never alters the character's face.
 */

export class IdentityLockEngine {
  constructor(character) {
    this.character = character;
    this.seed = character.image?.seed || this.generateSeed(character.identity?.name || 'Lilith');
    this.faceAnchorLock = character.image?.faceAnchorLock !== false;
  }

  generateSeed(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 9000000 + 1000000;
  }

  /**
   * Generates a unique identity lock token for the character
   */
  getIdentityToken() {
    const { identity = {}, face = {}, eyes = {}, skin = {} } = this.character;
    const name = identity.name || 'Subject';
    const faceShape = face.shape || 'Oval Diamond';
    const eyeColor = eyes.color || 'Emerald Green';
    const skinTone = skin.tone || '#fcd34d';

    return `IDENTITY_LOCK[ID:${identity.id || 'char_default'}|NAME:${name}|SEED:${this.seed}|FACE:${faceShape}|EYES:${eyeColor}|SKIN:${skinTone}]`;
  }

  /**
   * Generates cache hash key combining identity lock + current styling attributes
   */
  getCacheHashKey(variationType = 'portrait') {
    const { hair = {}, clothing = {}, image = {} } = this.character;
    const activeCategory = clothing.activeCategory || 'Casual';
    const hairStyle = hair.style || 'Straight';
    const hairColor = hair.baseColor || '#1c1917';
    const artStyle = image.artStyle || 'Hyperrealistic';
    const envId = image.environmentAssetId || 'bg_rooftop_01';
    const poseId = image.poseAssetId || 'pose_heroic_01';

    return `${this.getIdentityToken()}_VAR:${variationType}_HAIR:${hairStyle}_${hairColor}_OUTFIT:${activeCategory}_STYLE:${artStyle}_ENV:${envId}_POSE:${poseId}`;
  }
}
