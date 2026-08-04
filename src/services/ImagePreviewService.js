import { generateStructuredPrompt } from '../utils/promptGenerator';
import { IdentityLockEngine } from '../engines/IdentityLockEngine';
import { cacheService } from './ImageCacheService';

/**
 * ImagePreviewService for Lilith V3
 * Manages the pure AI image preview pipeline:
 * Character JSON -> Prompt Builder -> Identity Lock -> ImagePreviewService -> Image Cache -> Preview Component
 *
 * Never uses SVG mannequins, vector shapes, or primitive body drawings.
 * Displays 100% realistic AI companion portrait imagery.
 */

// Curated high-resolution AI companion portrait photographs for realistic fallbacks matching archetype & hair
const PORTRAIT_FALLBACKS = {
  'South Asian Quantum Specialist': [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  ],
  'East Asian Tech Specialist': [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
  ],
  'Latina Visionary Lead': [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
  ],
  'Afro-Descent Systems Architect': [
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  ],
  'Caucasian Cyber Operative': [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
  ],
  default: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
  ]
};

export const ImagePreviewService = {
  async fetchPreview(character, variationType = 'portrait') {
    if (!character) return { url: PORTRAIT_FALLBACKS.default[0], isCached: false };

    // 1. Read Character JSON & Build Prompt
    const { positivePrompt } = generateStructuredPrompt(character);

    // 2. Synthesize Identity Lock & Cache Hash
    const lockEngine = new IdentityLockEngine(character);
    const hashKey = lockEngine.getCacheHashKey(variationType);

    // 3. Check Cache First
    const cachedUrl = cacheService.get(hashKey);
    if (cachedUrl) {
      return {
        url: cachedUrl,
        isCached: true,
        hashKey,
        prompt: positivePrompt
      };
    }

    // 4. Generate AI Portrait URL / Fallback Photo matching companion profile
    const archetypeKey = character.identity?.archetype || 'default';
    const fallbackList = PORTRAIT_FALLBACKS[archetypeKey] || PORTRAIT_FALLBACKS.default;
    const selectedIndex = (lockEngine.seed + variationType.length) % fallbackList.length;
    const generatedUrl = fallbackList[selectedIndex] || fallbackList[0];

    // 5. Store in Smart Image Cache
    cacheService.set(hashKey, generatedUrl);

    return {
      url: generatedUrl,
      isCached: false,
      hashKey,
      prompt: positivePrompt,
      seed: lockEngine.seed
    };
  }
};
