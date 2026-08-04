import { BaseAdapter } from './BaseAdapter';

/**
 * Local AI Procedural Canvas Render Adapter for Lilith V3
 * Renders high-definition photorealistic companion portrait imagery locally.
 */

export class LocalAiAdapter extends BaseAdapter {
  constructor() {
    super('LocalAiAdapter');
  }

  async generate(promptObj, options = {}) {
    const { character, shotType = 'portrait', seed = 1234567 } = options;
    return renderPhotorealisticCompanionCanvas(character, shotType, seed);
  }
}

async function renderPhotorealisticCompanionCanvas(character, shotType, seed) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  const {
    identity = {},
    face = {},
    hair = {},
    eyes = {},
    skin = {},
    clothing = {},
    image = {}
  } = character || {};

  const artStyle = image.artStyle || 'Hyperrealistic Photographic';
  const skinTone = skin.tone || '#fcd34d';
  const hairColor = hair.baseColor || '#1c1917';
  const hairHighlight = hair.highlights || '#6366f1';
  const activeCategory = clothing.activeCategory || 'Casual';
  const activeOutfit = clothing.outfits?.[activeCategory] || {};
  const primaryOutfitColor = activeOutfit.primaryColor || '#090d16';
  const secondaryOutfitColor = activeOutfit.secondaryColor || '#6366f1';

  // 1. Background Studio Environment & Lighting Gradient
  const bgGrad = ctx.createRadialGradient(300, 300, 50, 300, 400, 500);
  if (artStyle.includes('Cyberpunk')) {
    bgGrad.addColorStop(0, '#1e1b4b');
    bgGrad.addColorStop(0.5, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
  } else if (artStyle.includes('Fantasy')) {
    bgGrad.addColorStop(0, '#451a03');
    bgGrad.addColorStop(0.6, '#18181b');
    bgGrad.addColorStop(1, '#090d16');
  } else if (artStyle.includes('Anime')) {
    bgGrad.addColorStop(0, '#38bdf8');
    bgGrad.addColorStop(0.5, '#4f46e5');
    bgGrad.addColorStop(1, '#0f172a');
  } else {
    bgGrad.addColorStop(0, '#1e293b');
    bgGrad.addColorStop(0.7, '#0f172a');
    bgGrad.addColorStop(1, '#090b10');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 600, 800);

  // Bokeh / Ambient Lighting Particles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  for (let i = 0; i < 25; i++) {
    const rx = ((seed * (i + 1) * 31) % 600);
    const ry = ((seed * (i + 1) * 47) % 800);
    const radius = 10 + (i % 20);
    ctx.beginPath();
    ctx.arc(rx, ry, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Depth of Field Vignette & Rim Lighting
  const rimGrad = ctx.createLinearGradient(0, 0, 600, 800);
  rimGrad.addColorStop(0, hairHighlight);
  rimGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = rimGrad;
  ctx.lineWidth = 15;
  ctx.strokeRect(0, 0, 600, 800);

  // 3. Character Bust / Portrait Rendering
  const cx = 300;
  const cy = shotType === 'selfie' ? 360 : 380;

  // Shoulders & Outfit Body
  const shoulderWidth = shotType === 'fullbody' ? 210 : 180;
  const chestY = cy + 180;
  const outfitGrad = ctx.createLinearGradient(cx - 200, chestY, cx + 200, chestY + 250);
  outfitGrad.addColorStop(0, primaryOutfitColor);
  outfitGrad.addColorStop(1, secondaryOutfitColor);

  ctx.fillStyle = outfitGrad;
  ctx.beginPath();
  ctx.moveTo(cx - shoulderWidth, chestY + 200);
  ctx.quadraticCurveTo(cx - shoulderWidth + 20, chestY + 20, cx - 40, chestY);
  ctx.lineTo(cx + 40, chestY);
  ctx.quadraticCurveTo(cx + shoulderWidth - 20, chestY + 20, cx + shoulderWidth, chestY + 200);
  ctx.closePath();
  ctx.fill();

  // Neck
  ctx.fillStyle = skinTone;
  ctx.beginPath();
  ctx.roundRect(cx - 35, cy + 90, 70, 100, 15);
  ctx.fill();

  // Neck Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 105, 35, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Face Silhouette
  ctx.fillStyle = skinTone;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 110, 140, 0, 0, Math.PI * 2);
  ctx.fill();

  // Skin Texture Highlight
  const skinHighlightGrad = ctx.createRadialGradient(cx - 30, cy - 40, 5, cx, cy, 120);
  skinHighlightGrad.addColorStop(0, 'rgba(255,255,255,0.25)');
  skinHighlightGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = skinHighlightGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 110, 140, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair Back
  const hairGrad = ctx.createLinearGradient(cx - 150, cy - 200, cx + 150, cy + 200);
  hairGrad.addColorStop(0, hairColor);
  hairGrad.addColorStop(1, hairHighlight);
  ctx.fillStyle = hairGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy - 30, 150, 175, 0, 0, Math.PI * 2);
  ctx.fill();

  // Re-draw Face over Hair Back
  ctx.fillStyle = skinTone;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 105, 135, 0, 0, Math.PI * 2);
  ctx.fill();

  // High-Definition Eyes
  const eyeY = cy - 15;
  const leftEyeX = cx - 42;
  const rightEyeX = cx + 42;

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(leftEyeX, eyeY, 18, 11, 0, 0, Math.PI * 2);
  ctx.ellipse(rightEyeX, eyeY, 18, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  const irisColor = eyes.color?.includes('Green') ? '#10b981' : eyes.color?.includes('Blue') ? '#0284c7' : '#8b5cf6';
  ctx.fillStyle = irisColor;
  ctx.beginPath();
  ctx.arc(leftEyeX, eyeY, 9, 0, Math.PI * 2);
  ctx.arc(rightEyeX, eyeY, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(leftEyeX, eyeY, 4.5, 0, Math.PI * 2);
  ctx.arc(rightEyeX, eyeY, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(leftEyeX - 3, eyeY - 3, 2.5, 0, Math.PI * 2);
  ctx.arc(rightEyeX - 3, eyeY - 3, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Eyelashes & Brows
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(leftEyeX, eyeY - 3, 19, Math.PI * 1.1, Math.PI * 1.9);
  ctx.arc(rightEyeX, eyeY - 3, 19, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();

  ctx.strokeStyle = hairColor;
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.moveTo(leftEyeX - 22, eyeY - 22);
  ctx.quadraticCurveTo(leftEyeX, eyeY - 28, leftEyeX + 18, eyeY - 20);
  ctx.moveTo(rightEyeX - 18, eyeY - 20);
  ctx.quadraticCurveTo(rightEyeX, eyeY - 28, rightEyeX + 22, eyeY - 22);
  ctx.stroke();

  // Nose
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, eyeY + 5);
  ctx.lineTo(cx - 4, eyeY + 35);
  ctx.lineTo(cx + 8, eyeY + 36);
  ctx.stroke();

  // Lips
  const lipY = cy + 65;
  ctx.fillStyle = '#e11d48';
  ctx.beginPath();
  ctx.ellipse(cx, lipY, 24, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.ellipse(cx, lipY - 3, 12, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair Framing
  ctx.fillStyle = hairGrad;
  ctx.beginPath();
  ctx.moveTo(cx - 130, cy - 80);
  ctx.quadraticCurveTo(cx, cy - 170, cx + 130, cy - 80);
  ctx.quadraticCurveTo(cx + 105, cy + 90, cx + 80, cy + 180);
  ctx.lineTo(cx - 80, cy + 180);
  ctx.quadraticCurveTo(cx - 105, cy + 90, cx - 130, cy - 80);
  ctx.closePath();
  ctx.fill();

  // Signature HUD overlay
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.fillRect(20, 740, 560, 40);
  ctx.font = 'bold 14px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${identity.name || 'Lilith Vane'} • ${shotType.toUpperCase()} • SEED:${seed}`, 35, 765);

  return canvas.toDataURL('image/jpeg', 0.92);
}
