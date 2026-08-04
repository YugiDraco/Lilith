import { IdentityProfile } from './IdentityProfile.js';

/**
 * Modular Prompt Builder for Lilith V3
 * Compiles Character JSON into structured positive & negative prompts with quality tokens.
 * Never exposes raw prompt strings to end-users during creation.
 */

export class PromptBuilder {
  static buildPrompt(character, shotType = 'portrait') {
    const identityProfile = new IdentityProfile(character);

    const {
      identity = {},
      appearance = {},
      hair = {},
      eyes = {},
      skin = {},
      clothing = {},
      accessories = {},
      emotion = {},
      image = {}
    } = character || {};

    const age = identity.age || 24;
    const archetype = identity.archetype || 'South Asian Quantum Specialist';
    const bodyType = appearance.bodyType || 'Athletic';

    const hairStyle = hair.style || 'Long Waist-Length Straight';
    const hairColor = hair.baseColor || '#1c1917';
    const hairTexture = hair.texture || 'Silky Straight';

    const eyeColor = eyes.color || 'Emerald Green';
    const skinToneName = skin.undertone || 'Warm Golden';

    const activeCategory = clothing.activeCategory || 'Casual';
    const activeOutfit = clothing.outfits?.[activeCategory] || {};
    const outfitStyle = activeOutfit.style || 'Elegant Casual Fashion';
    const primaryColor = activeOutfit.primaryColor || 'Dark Obsidian';

    const mood = emotion.currentMood || 'Focused & Confident';
    const artStyle = image.artStyle || 'Hyperrealistic Photographic';
    const env = image.environmentAssetId || 'Modern Penthouse Studio';
    const lighting = image.lightingAssetId || 'Soft Studio Cinematic';

    let cameraSpec = '85mm portrait lens, f/1.4 aperture, eye-level focus, soft bokeh background';
    if (shotType === 'fullbody') cameraSpec = 'full body shot, 35mm lens, standing posture, full head-to-toe framing';
    else if (shotType === 'selfie') cameraSpec = 'intimate high-angle selfie shot, front-facing camera, natural holding pose';
    else if (shotType === 'profile') cameraSpec = 'side profile portrait shot, sharp jawline focus, cinematic rim lighting';

    const positivePrompt = [
      `masterpiece, best quality, ultra-detailed, 8k resolution, photorealistic portrait of a ${age}-year-old ${archetype} woman`,
      identityProfile.getIdentityToken(),
      `face shape: ${identityProfile.faceShape}, jawline: ${identityProfile.jawline}, eyes: ${eyeColor} ${identityProfile.eyeShape}`,
      `hair: ${hairStyle}, ${hairTexture}, color: ${hairColor}`,
      `skin: smooth natural skin texture, ${skinToneName} tone`,
      `body build: ${bodyType}, posture: confident`,
      `wearing: ${outfitStyle} in ${primaryColor}`,
      `expression: ${mood}, warm smile`,
      `environment: ${env}, lighting: ${lighting}`,
      cameraSpec,
      `style: ${artStyle}, luxury fashion photography, highly detailed eyes and hair`
    ].join(', ');

    const negativePrompt = [
      'deformed, distorted, disfigured, low quality, bad anatomy, bad hands, missing fingers, extra limbs',
      'blurry, pixelated, noise, watermark, signature, text, logo, cropped, out of frame',
      'mannequin, svg, 3d render, vector, drawing, sketch, illustration, cartoon, fake skin'
    ].join(', ');

    return {
      positivePrompt,
      negativePrompt,
      identityToken: identityProfile.getIdentityToken(),
      seed: identityProfile.seed
    };
  }
}
