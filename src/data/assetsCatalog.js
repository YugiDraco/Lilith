/**
 * Dynamic Asset Management System Catalog
 * Contains asset metadata for visual asset galleries across all customization categories.
 * Each asset includes: { id, name, category, thumbnail, prompt, previewColor, tags }
 */

export const ASSET_CATALOG = {
  hair: [
    {
      id: 'hair_021',
      name: 'Long Wavy Bangs',
      category: 'hair',
      thumbnail: '💇‍♀️',
      prompt: 'long sleek wavy dark hair with front bangs',
      previewColor: '#1c1917',
      tags: ['long', 'wavy', 'bangs', 'sleek']
    },
    {
      id: 'hair_002',
      name: 'Asymmetrical Cyber Bob',
      category: 'hair',
      thumbnail: '💇',
      prompt: 'asymmetrical angular bob cut hair with neon highlights',
      previewColor: '#ec4899',
      tags: ['short', 'bob', 'cyberpunk', 'angular']
    },
    {
      id: 'hair_003',
      name: 'Platinum High Elf Braids',
      category: 'hair',
      thumbnail: '🧝‍♀️',
      prompt: 'ultra-long platinum white braided hair with golden runes',
      previewColor: '#f8fafc',
      tags: ['long', 'braided', 'fantasy', 'platinum']
    },
    {
      id: 'hair_004',
      name: 'Textured Executive Fade',
      category: 'hair',
      thumbnail: '💇‍♂️',
      prompt: 'short textured taper fade hairstyle with side part',
      previewColor: '#334155',
      tags: ['short', 'fade', 'modern', 'masculine']
    },
    {
      id: 'hair_005',
      name: 'Voluminous Beach Waves',
      category: 'hair',
      thumbnail: '👩',
      prompt: 'shoulder-length voluminous messy beach waves hair',
      previewColor: '#d97706',
      tags: ['medium', 'waves', 'casual', 'volume']
    },
    {
      id: 'hair_006',
      name: 'Cornrows & Braids',
      category: 'hair',
      thumbnail: '👩‍🦱',
      prompt: 'intricate braided cornrows hair gathered into a high ponytail',
      previewColor: '#090d16',
      tags: ['braided', 'updo', 'intricate']
    }
  ],

  eyes: [
    {
      id: 'eyes_emerald_cat',
      name: 'Iridescent Emerald',
      category: 'eyes',
      thumbnail: '👁️',
      prompt: 'glowing iridescent emerald green eyes with sharp almond shape',
      previewColor: '#10b981',
      tags: ['emerald', 'cat-eye', 'green']
    },
    {
      id: 'eyes_steel_blue',
      name: 'Steel Blue Gray',
      category: 'eyes',
      thumbnail: '👁️',
      prompt: 'piercing steel blue eyes with dark iris ring',
      previewColor: '#0284c7',
      tags: ['blue', 'steel', 'intense']
    },
    {
      id: 'eyes_violet_gold',
      name: 'Violet Luminous Gold',
      category: 'eyes',
      thumbnail: '✨',
      prompt: 'mystical luminous violet eyes with golden flecks',
      previewColor: '#8b5cf6',
      tags: ['violet', 'fantasy', 'luminous']
    },
    {
      id: 'eyes_dark_amber',
      name: 'Deep Warm Amber',
      category: 'eyes',
      thumbnail: '👁️',
      prompt: 'deep honey amber eyes with warm golden highlights',
      previewColor: '#f59e0b',
      tags: ['amber', 'brown', 'warm']
    }
  ],

  eyebrows: [
    { id: 'brow_arch_01', name: 'High Arch Defined', category: 'eyebrows', thumbnail: '🤨', prompt: 'sharply arched defined eyebrows', previewColor: '#1e293b' },
    { id: 'brow_straight_01', name: 'Soft Straight Natural', category: 'eyebrows', thumbnail: '😐', prompt: 'soft straight natural eyebrows', previewColor: '#334155' },
    { id: 'brow_thick_01', name: 'Thick Structured', category: 'eyebrows', thumbnail: '😠', prompt: 'bold thick structured eyebrows', previewColor: '#0f172a' }
  ],

  nose: [
    { id: 'nose_button_01', name: 'Button Nose Defined', category: 'nose', thumbnail: '👃', prompt: 'delicate button nose with defined tip' },
    { id: 'nose_aquiline_01', name: 'Aquiline Sharp Bridge', category: 'nose', thumbnail: '👃', prompt: 'noble aquiline nose with straight sharp bridge' },
    { id: 'nose_petite_01', name: 'Petite Soft Contour', category: 'nose', thumbnail: '👃', prompt: 'petite soft contoured nose' }
  ],

  lips: [
    { id: 'lips_plump_01', name: 'Full Rose Gloss', category: 'lips', thumbnail: '💋', prompt: 'full plush lips with rose satin gloss', previewColor: '#e11d48' },
    { id: 'lips_defined_01', name: 'Pronounced Cupid Bow', category: 'lips', thumbnail: '👄', prompt: 'defined lips with sharp cupid bow', previewColor: '#f43f5e' },
    { id: 'lips_nude_01', name: 'Natural Nude Matte', category: 'lips', thumbnail: '💋', prompt: 'natural nude tone matte lips', previewColor: '#fb7185' }
  ],

  ears: [
    { id: 'ears_pierced_01', name: 'Standard Pierced', category: 'ears', thumbnail: '👂', prompt: 'pierced ears with subtle silver studs' },
    { id: 'ears_elven_01', name: 'High Elven Pointed', category: 'ears', thumbnail: '🧝', prompt: 'graceful pointed elven ears with ear cuffs' }
  ],

  skin: [
    { id: 'skin_porcelain', name: 'Porcelain Fair', category: 'skin', thumbnail: '⚪', prompt: 'porcelain fair skin with cool rosy undertones', previewColor: '#fef08a' },
    { id: 'skin_beige_01', name: 'Warm Beige Olive', category: 'skin', thumbnail: '🟡', prompt: 'smooth warm beige skin with golden olive undertone', previewColor: '#fcd34d' },
    { id: 'skin_bronze_01', name: 'Golden Bronze', category: 'skin', thumbnail: '🟠', prompt: 'sun-kissed golden bronze skin', previewColor: '#d97706' },
    { id: 'skin_deep_01', name: 'Deep Ebony Mocha', category: 'skin', thumbnail: '🟤', prompt: 'rich deep mocha skin with radiance', previewColor: '#451a03' }
  ],

  outfits: [
    { id: 'outfit_scifi_01', name: 'Exo-Armor Bodysuit', category: 'outfits', clothingCategory: 'Sci-Fi', thumbnail: '🥼', prompt: 'futuristic high-tech exo-armor bodysuit with holographic trench coat', previewColor: '#6366f1' },
    { id: 'outfit_fantasy_01', name: 'Arch-Mage Vestments', category: 'outfits', clothingCategory: 'Fantasy', thumbnail: '🦹‍♀️', prompt: 'ornate embroidered silk tunic with leather harness and traveler cloak', previewColor: '#d97706' },
    { id: 'outfit_streetwear_01', name: 'Tokyo Streetwear Tech', category: 'outfits', clothingCategory: 'Streetwear', thumbnail: '🧥', prompt: 'oversized graphic tee, cargo pants, chunky sneakers and puffer coat', previewColor: '#84cc16' },
    { id: 'outfit_business_01', name: 'Executive Power Suit', category: 'outfits', clothingCategory: 'Business', thumbnail: '👔', prompt: 'tailored sharp suit blazer with silk blouse and pencil skirt', previewColor: '#0f172a' },
    { id: 'outfit_formal_01', name: 'Velvet Evening Gown', category: 'outfits', clothingCategory: 'Formal', thumbnail: '👗', prompt: 'floor-length velvet evening gown with thigh slit and satin heels', previewColor: '#312e81' },
    { id: 'outfit_sportswear_01', name: 'Compressive Athletics', category: 'outfits', clothingCategory: 'Sportswear', thumbnail: '🏃‍♀️', prompt: 'athletic sports bra, high-waist compressive leggings and trainers', previewColor: '#0284c7' }
  ],

  accessories: [
    { id: 'acc_glasses_01', name: 'Cyberpunk HUD Visor', category: 'accessories', thumbnail: '🥽', prompt: 'glowing holographic cyberpunk HUD visor glasses' },
    { id: 'acc_earrings_01', name: 'Silver Geometric Drops', category: 'accessories', thumbnail: '💎', prompt: 'silver geometric drop earrings' },
    { id: 'acc_choker_01', name: 'Titanium Choker', category: 'accessories', thumbnail: '📿', prompt: 'sleek titanium choker necklace with glowing pendant' },
    { id: 'acc_watch_01', name: 'Smart Chronograph', category: 'accessories', thumbnail: '⌚', prompt: 'holographic smart chronograph watch' }
  ],

  backgrounds: [
    { id: 'bg_rooftop_01', name: 'Neo-City Rooftop Night', category: 'backgrounds', thumbnail: '🌃', prompt: 'futuristic neo-city skyline at night with neon holographic advertisements' },
    { id: 'bg_sanctuary_01', name: 'Crystal Magic Sanctuary', category: 'backgrounds', thumbnail: '🏛️', prompt: 'ancient elven crystal sanctuary garden with floating glowing runes' },
    { id: 'bg_penthouse_01', name: 'Skyline Penthouse Office', category: 'backgrounds', thumbnail: '🏢', prompt: 'modern luxury penthouse office with floor-to-ceiling glass skyline view' },
    { id: 'bg_studio_01', name: 'Pro Studio Dual-Tone', category: 'backgrounds', thumbnail: '📸', prompt: 'professional studio backdrop with magenta and cyan rim lighting' }
  ],

  poses: [
    { id: 'pose_heroic_01', name: 'Heroic Hand on Hip', category: 'poses', thumbnail: '💃', prompt: 'poised heroic stance with one hand on hip, looking confidently at camera' },
    { id: 'pose_relaxed_01', name: 'Seated Casual Cross-Leg', category: 'poses', thumbnail: '🧘', prompt: 'relaxed cross-legged posture with slight tilt' },
    { id: 'pose_action_01', name: 'Dynamic Low Angle Stance', category: 'poses', thumbnail: '🤺', prompt: 'dynamic action stance low camera angle' }
  ],

  expressions: [
    { id: 'expr_smirk_01', name: 'Confident Smirk', category: 'expressions', thumbnail: '😏', prompt: 'subtle confident smirk with sharp focused eyes' },
    { id: 'expr_smile_01', name: 'Warm Welcoming Smile', category: 'expressions', thumbnail: '😊', prompt: 'warm genuine smile with bright glowing eyes' },
    { id: 'expr_intense_01', name: 'Intense Strategic Focus', category: 'expressions', thumbnail: '🤨', prompt: 'intense analytical expression with arched eyebrow' }
  ]
};

/**
 * Utility to fetch asset by ID
 */
export function getAssetById(category, assetId) {
  const items = ASSET_CATALOG[category] || [];
  return items.find(a => a.id === assetId) || items[0] || null;
}
