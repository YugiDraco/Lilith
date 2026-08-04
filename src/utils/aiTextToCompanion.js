import { DEFAULT_CHARACTER_V2 } from '../types/characterV2';

/**
 * AI-Assisted Natural Language Text-to-Companion Parser for Lilith V3
 * Parses user prompts like:
 * "Create a 32-year-old Indian architect with long black wavy hair, warm brown skin, athletic build, elegant style and confident personality."
 * Automatically populates structured character modules and hydrates companion state.
 */

export function parseNaturalLanguagePrompt(promptText) {
  if (!promptText || typeof promptText !== 'string') return DEFAULT_CHARACTER_V2;

  const text = promptText.toLowerCase();
  const baseChar = JSON.parse(JSON.stringify(DEFAULT_CHARACTER_V2));

  // 1. Parse Age (18+)
  const ageMatch = text.match(/(\d{2})[- ]*(year|yr)[- ]*old/) || text.match(/age[- ]*(\d{2})/);
  if (ageMatch && ageMatch[1]) {
    baseChar.identity.age = Math.max(18, parseInt(ageMatch[1]));
  }

  // 2. Parse Name
  const nameMatch = text.match(/named ([a-z]+)/i) || text.match(/name is ([a-z]+)/i);
  if (nameMatch && nameMatch[1]) {
    const rawName = nameMatch[1];
    baseChar.identity.name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  }

  // 3. Parse Occupation / Archetype
  if (text.includes('architect')) baseChar.identity.occupation = 'Architect & Systems Designer';
  else if (text.includes('engineer')) baseChar.identity.occupation = 'Lead Full-Stack Engineer';
  else if (text.includes('doctor') || text.includes('physician')) baseChar.identity.occupation = 'Medical Specialist';
  else if (text.includes('artist') || text.includes('designer')) baseChar.identity.occupation = 'Creative Director';
  else if (text.includes('pilot')) baseChar.identity.occupation = 'Starship Pilot';

  // 4. Parse Heritage / Archetype
  if (text.includes('indian') || text.includes('south asian')) {
    baseChar.identity.archetype = 'South Asian Quantum Specialist';
    baseChar.skin.tone = '#b45309';
    baseChar.skin.undertone = 'Warm Golden Bronze';
    baseChar.hair.baseColor = '#090d16';
  } else if (text.includes('asian') || text.includes('japanese') || text.includes('korean')) {
    baseChar.identity.archetype = 'East Asian Tech Specialist';
    baseChar.skin.tone = '#fef08a';
    baseChar.hair.baseColor = '#1c1917';
  } else if (text.includes('latina') || text.includes('hispanic')) {
    baseChar.identity.archetype = 'Latina Visionary Lead';
    baseChar.skin.tone = '#d97706';
  } else if (text.includes('black') || text.includes('afro')) {
    baseChar.identity.archetype = 'Afro-Descent Systems Architect';
    baseChar.skin.tone = '#451a03';
  }

  // 5. Parse Hair Attributes
  if (text.includes('long')) baseChar.hair.length = 'Long Waist-Length';
  if (text.includes('wavy')) baseChar.hair.texture = 'Soft Waves';
  if (text.includes('curly')) baseChar.hair.texture = 'Beach Curly';
  if (text.includes('straight')) baseChar.hair.texture = 'Silky Straight';
  if (text.includes('blonde')) baseChar.hair.baseColor = '#fef08a';
  if (text.includes('red') || text.includes('auburn')) baseChar.hair.baseColor = '#9f1239';

  // 6. Parse Build & Body Type
  if (text.includes('athletic')) baseChar.appearance.bodyType = 'Athletic';
  else if (text.includes('curvy')) baseChar.appearance.bodyType = 'Curvy';
  else if (text.includes('slim')) baseChar.appearance.bodyType = 'Slim';
  else if (text.includes('muscular')) baseChar.appearance.bodyType = 'Muscular';

  // 7. Parse Aesthetic Style
  if (text.includes('anime') || text.includes('stylized')) baseChar.image.artStyle = 'Anime / Stylized CG';
  else if (text.includes('fantasy')) baseChar.image.artStyle = 'Dark Fantasy Oil Canvas';
  else if (text.includes('cyberpunk')) baseChar.image.artStyle = 'Cyberpunk Neon Sci-Fi';

  // 8. Generate seed from prompt hash
  let seedHash = 0;
  for (let i = 0; i < text.length; i++) {
    seedHash = text.charCodeAt(i) + ((seedHash << 5) - seedHash);
  }
  baseChar.image.seed = Math.abs(seedHash) % 9000000 + 1000000;

  return baseChar;
}
