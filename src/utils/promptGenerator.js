/**
 * Structured Image & Video Prompt Compiler
 * Combines character identity, exact body proportions, facial features, active outfit,
 * accessories, pose, environment, lighting, and camera settings.
 */

export function generateStructuredPrompt(character) {
  if (!character) return { positivePrompt: '', negativePrompt: '' };

  const {
    identity = {},
    appearance = {},
    body = { proportions: {}, upperBody: {}, lowerBody: {} },
    face = {},
    hair = {},
    skin = {},
    clothing = { outfits: {} },
    accessories = {},
    image_settings = {}
  } = character;

  const activeCategory = clothing.activeCategory || 'Casual';
  const outfit = clothing.outfits?.[activeCategory] || {};
  const props = body.proportions || {};

  // Face Identity Anchor Token
  const identityAnchor = `[FACE_IDENTITY_LOCK: ${identity.name || 'Subject'}, ${face.eyeColor || 'defined eyes'}, ${face.shape || 'oval'} face, ${hair.style || 'styled hair'}, ${skin.tone || 'warm skin'}]`;

  // Body proportions string
  const bodyDesc = `${appearance.bodyType || 'Athletic'} body type (${appearance.overallBuild || 'Mesomorph'}, ${appearance.heightCm || 175}cm, posture: ${upperBodyPosture(body.upperBody)}). Proportions: shoulder width ratio ${props.shoulderWidth || 50}/100, waist size ${props.waistSize || 50}/100, hip width ${props.hipWidth || 50}/100, leg length ratio ${props.legLength || 50}/100, chest proportion ${body.upperBody?.chestProportion || 50}/100.`;

  // Facial Details string
  const faceDesc = `Facial structure: ${face.shape || 'oval'} face, ${face.jawline || 50}% defined jawline, ${face.cheekbones || 50}% high cheekbones, ${face.eyeShape || 'almond'} eyes in ${face.eyeColor || 'emerald'}, ${face.lips?.fullness || 60}% full lips with ${face.lips?.cupidBowShape || 'defined'} cupid's bow, ${face.smile || 'subtle smile'}.`;

  // Hair & Skin string
  const hairSkinDesc = `Hairstyle: ${hair.length || 'long'}, ${hair.style || 'straight'}, base color ${hair.baseColor || '#1c1917'} with ${hair.highlights || 'violet'} highlights. Skin: ${skin.tone || 'golden'} tone with ${skin.undertone || 'warm'} undertone, ${skin.tattoos !== 'None' ? 'tattoos: ' + skin.tattoos : 'clean skin'}, ${skin.makeup || 'natural makeup'}.`;

  // Outfit string
  const outfitDesc = `Wearing ${activeCategory} outfit: ${outfit.top || 'top'}, ${outfit.bottom || 'bottom'}, ${outfit.shoes || 'shoes'}, outer layer ${outfit.outer || 'jacket'}, crafted in ${outfit.material || 'quality fabric'} (${outfit.primaryColor || '#000'} / ${outfit.secondaryColor || '#fff'}).`;

  // Accessories string
  const activeAccessories = Object.entries(accessories)
    .filter(([_, val]) => val && val !== 'None')
    .map(([key, val]) => `${key}: ${val}`)
    .join(', ');
  const accDesc = activeAccessories ? `Accessories: ${activeAccessories}.` : '';

  // Scene & Art Direction string
  const sceneDesc = `Pose: ${image_settings.expression || 'confident'}, ${image_settings.pose || 'heroic posture'}. Environment: ${image_settings.environment || 'studio backdrop'}. Lighting: ${image_settings.lightingPreset || 'soft box'}. Camera: ${image_settings.cameraAngle || 'full body shot'}. Art style: ${image_settings.artStyle || 'hyperrealistic photo'}, 8K resolution, masterpiece quality, highly detailed textures.`;

  const positivePrompt = `${identityAnchor}\n\n${bodyDesc}\n\n${faceDesc}\n\n${hairSkinDesc}\n\n${outfitDesc}\n${accDesc}\n\n${sceneDesc}`;

  const negativePrompt = 'deformed anatomy, disfigured body proportions, mutated hands, extra limbs, asymmetrical face, low resolution, blurry, distorted features, child, underage, juvenile features, bad anatomy, duplicate arms, cropped face.';

  return {
    positivePrompt,
    negativePrompt
  };
}

function upperBodyPosture(upperBody = {}) {
  return upperBody.posture || 'Erect Athletic';
}

export function generateVideoMotionPrompt(character) {
  const { identity, video_settings, image_settings } = character;
  const motionId = video_settings?.activeMotion || 'walking';
  const cameraMotion = video_settings?.cameraMotion || 'Slow Pan';
  const duration = video_settings?.durationSeconds || 5;

  return `Cinematic 4K Character Video: ${identity?.name || 'Character'} performing "${motionId}" motion. Camera movement: ${cameraMotion}. Duration: ${duration}s. Retain strict facial identity lock, exact body proportions, costume details, and lighting ambience throughout video generation loop.`;
}
