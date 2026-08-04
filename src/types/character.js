/**
 * Character Data Architecture & Core Schema for Advanced Character Anatomy System
 * All character data is strictly stored in structured JSON.
 * Age validation requires character age >= 18.
 */

export const BODY_TYPES = [
  'Petite',
  'Slim',
  'Average',
  'Athletic',
  'Muscular',
  'Curvy',
  'Plus Size'
];

export const OVERALL_BUILDS = [
  'Ectomorph',
  'Mesomorph',
  'Endomorph',
  'Slender-Athletic',
  'Voluptuous',
  'Heavyweight'
];

export const CLOTHING_CATEGORIES = [
  'Casual',
  'Business',
  'Streetwear',
  'Fantasy',
  'Sci-Fi',
  'Traditional',
  'Formal',
  'Sportswear',
  'Sleepwear',
  'Seasonal'
];

export const VIDEO_ANIMATIONS = [
  { id: 'idle', name: 'Custom Idle', icon: 'UserCheck', description: 'Subtle breathing and natural posture micro-movements' },
  { id: 'walking', name: 'Walking', icon: 'Footprints', description: 'Confident rhythmic stride with natural arm swing' },
  { id: 'sitting', name: 'Sitting', icon: 'Armchair', description: 'Relaxed seated pose with minor adjustment shifts' },
  { id: 'standing', name: 'Standing', icon: 'User', description: 'Poised static posture facing camera' },
  { id: 'smiling', name: 'Smiling', icon: 'Smile', description: 'Warm facial smile transition with eye glint' },
  { id: 'waving', name: 'Waving', icon: 'Hand', description: 'Friendly hand gesture greeting' },
  { id: 'reading', name: 'Reading', icon: 'BookOpen', description: 'Attentive gaze moving across book/tablet' },
  { id: 'coffee', name: 'Drinking Coffee', icon: 'Coffee', description: 'Lifting cup, sipping, and relaxing' },
  { id: 'looking', name: 'Looking Around', icon: 'Eye', description: 'Curious head turns observing environment' },
  { id: 'talking', name: 'Talking', icon: 'MessageSquare', description: 'Natural lip movement and conversational gestures' }
];

export const ART_STYLES = [
  'Hyperrealistic Photographic',
  'Cinematic 8K 3D Render',
  'Anime / Stylized CG',
  'Digital Concept Painting',
  'Dark Fantasy Oil Canvas',
  'Cyberpunk Neon Sci-Fi'
];

export const CAMERA_ANGLES = [
  'Full Body Shot (Front View)',
  'Three-Quarter Angle Standing',
  'Medium Close-Up (Torso & Face)',
  'Dramatic Low-Angle Shot',
  'Cinematic Eye-Level Portrait',
  'Dynamic Action Angle'
];

export const LIGHTING_PRESETS = [
  'Studio Softbox Key Light',
  'Golden Hour Sunset Flare',
  'Neon Cyberpunk Dual Tone (Magenta/Cyan)',
  'Moody Dramatic Chiaroscuro',
  'Natural Direct Sunlight',
  'Cinematic Rim & Backlighting'
];

export const DEFAULT_CHARACTER = {
  identity: {
    name: 'Lilith Vane',
    age: 24, // Strictly 18+
    isVerifiedAdult: true,
    genderIdentity: 'Female',
    archetype: 'Cybernetic Specialist & Operative',
    backstory: 'An enigmatic operative working in futuristic high-tech metropolises, known for strategic brilliance and composure under fire.'
  },
  appearance: {
    heightCm: 175,
    weightKg: 62,
    overallBuild: 'Mesomorph',
    bodyType: 'Athletic',
    postureScore: 85 // 0-100 (Slouched -> Straight)
  },
  body: {
    proportions: {
      shoulderWidth: 62, // 0-100
      neckWidth: 45,
      armLength: 58,
      armThickness: 50,
      forearmSize: 48,
      wristSize: 42,
      handSize: 46,
      torsoLength: 60,
      waistSize: 44,
      hipWidth: 65,
      legLength: 68,
      thighSize: 56,
      calfSize: 52,
      ankleSize: 40,
      footSize: 48
    },
    upperBody: {
      chestProportion: 58,
      shoulderShape: 'Toned Squared', // Rounded, Broad, Squared, Petite
      backWidth: 55,
      posture: 'Erect Athletic'
    },
    lowerBody: {
      hipShape: 'Hourglass Curves', // Hourglass, Diamond, Pear, Athletic Straight
      gluteShape: 'Firm Sculpted',
      gluteProportion: 62,
      thighShape: 'Toned Athletic',
      legDefinition: 72
    }
  },
  face: {
    shape: 'Oval Diamond', // Oval, Heart, Square, Round, Diamond
    jawline: 65, // 0-100 Sharpness
    chin: 50,
    cheekbones: 75,
    nose: {
      bridgeWidth: 42,
      length: 50,
      tipShape: 'Button Defined'
    },
    lips: {
      fullness: 68,
      cupidBowShape: 'Pronounced Accent'
    },
    eyeShape: 'Almond Cat-Eye',
    eyeColor: 'Iridescent Emerald Green',
    eyebrows: 'Arch Defined Dark Brown',
    eyelashes: 'Dense Volumized Dark',
    ears: 'Standard Pierced',
    teeth: 'Aligned White',
    smile: 'Confident Smirk'
  },
  hair: {
    length: 'Long Waist-Length', // Short, Bob, Medium, Long, Ultra-Long
    style: 'Sleek Straight with Front Bangs',
    baseColor: '#1c1917', // Midnight Obsidian
    highlights: '#6366f1', // Electric Violet
    ombre: 'Magenta Fade Ends',
    texture: 'Silky Straight',
    accessories: 'Cybernetic Hair Pins'
  },
  skin: {
    tone: '#fcd34d', // Warm Beige / Golden
    undertone: 'Warm Golden-Olive',
    freckles: 'Subtle Nose Bridge',
    beautyMarks: 'Left Cheek Mole',
    birthmarks: 'None',
    scars: 'Minor Faint Shoulder Line Scar',
    tattoos: 'Bionic Circuitry Pattern on Right Arm',
    makeup: 'Smokey Eyeliner & Rose Gloss'
  },
  clothing: {
    activeCategory: 'Sci-Fi',
    outfits: {
      Casual: { top: 'Cropped Hoodie', bottom: 'Cargo Joggers', shoes: 'High-Top Sneakers', outer: 'Denim Jacket', material: 'Cotton Blend', primaryColor: '#1e1b4b', secondaryColor: '#ec4899' },
      Business: { top: 'Tailored Silk Blouse', bottom: 'Pencil Skirt', shoes: 'Pointed Heels', outer: 'Blazer Jacket', material: 'Italian Wool & Silk', primaryColor: '#0f172a', secondaryColor: '#94a3b8' },
      Streetwear: { top: 'Oversized Graphic Tee', bottom: 'Baggy Denim', shoes: 'Chunky Runners', outer: 'Puffer Coat', material: 'Heavy Tech-Cotton', primaryColor: '#18181b', secondaryColor: '#84cc16' },
      Fantasy: { top: 'Leather Corset Harness', bottom: 'Layered Tunic Skirt', shoes: 'Riding Boots', outer: 'Hooded Traveler Cloak', material: 'Burnished Leather & Linen', primaryColor: '#451a03', secondaryColor: '#d97706' },
      'Sci-Fi': { top: 'Exo-Armor Bodysuit', bottom: 'Reinforced Combat Pants', shoes: 'Mag-Lock Boots', outer: 'Holographic Trench Coat', material: 'Kevlar & Carbon Fiber', primaryColor: '#090d16', secondaryColor: '#6366f1' },
      Traditional: { top: 'Embroidered Silk Kimono', bottom: 'Hakama Trousers', shoes: 'Zori Sandals', outer: 'Haori Robe', material: 'Raw Silk & Satin', primaryColor: '#881337', secondaryColor: '#fef08a' },
      Formal: { top: 'Off-Shoulder Evening Dress', bottom: 'Floor-Length Slit Skirt', shoes: 'Stiletto Sandals', outer: 'Fur Stole', material: 'Velvet & Satin', primaryColor: '#312e81', secondaryColor: '#fbbf24' },
      Sportswear: { top: 'Athletic Sports Bra', bottom: 'Compressive Leggings', shoes: 'Cross-Trainers', outer: 'Windbreaker', material: 'Spandex & Nylon', primaryColor: '#0284c7', secondaryColor: '#f43f5e' },
      Sleepwear: { top: 'Silk Camisole', bottom: 'Lace Shorts', shoes: 'Soft Slippers', outer: 'Satin Robe', material: 'Pure Mulberry Silk', primaryColor: '#f472b6', secondaryColor: '#ffffff' },
      Seasonal: { top: 'Knit Turtleneck Sweater', bottom: 'Thermal Trousers', shoes: 'Winter Snow Boots', outer: 'Overcoat', material: 'Cashmere Wool', primaryColor: '#78350f', secondaryColor: '#e0e7ff' }
    }
  },
  accessories: {
    glasses: 'Cyberpunk HUD Visor',
    earrings: 'Silver Geometric Drops',
    necklaces: 'Choker with Pendant',
    watches: 'Smart Chronograph',
    bracelets: 'Titanium Bangle',
    rings: 'Onyx Solitaire Ring',
    hats: 'None',
    bags: 'Tactical Holster Bag'
  },
  personality: {
    traits: ['Analytical', 'Resilient', 'Loyal', 'Enigmatic'],
    temperament: 'Calm & Strategic under stress',
    quirks: 'Spins a coin between fingers when contemplating complex solutions',
    values: 'Autonomy, Truth, Innovation'
  },
  speech: {
    voiceTone: 'Silky Alt-Contralto',
    accent: 'Neutral Transatlantic',
    cadence: 'Measured & Articulate',
    vocabulary: 'Sophisticated Technical'
  },
  lifestyle: {
    occupation: 'Lead Cybernetics Systems Architect',
    hobbies: ['Quantum Coding', 'Neural Music Synthesizers', 'Martial Arts'],
    routine: 'Early morning conditioning, intensive R&D, night city patrols'
  },
  memories: {
    keyMilestones: [
      'Graduated top of class in Applied Cybernetics at Neo-Tokyo Institute',
      'Engineered first neural-interface exoskeleton',
      'Formed independent security collective'
    ]
  },
  emotions: {
    baselineMood: 'Focused & Composed',
    expressionStyle: 'Subtle warm smiles, sharp intense focus eyes'
  },
  relationships: {
    allies: 'Neo-Tokyo Tech Guild, Operative Kael',
    rivals: 'Vanguard Cyber-Corp',
    affiliations: 'Lilith Autonomous Initiative'
  },
  image_settings: {
    promptTemplate: 'High precision 8K render, face identity lock, consistent anatomical proportions',
    artStyle: 'Hyperrealistic Photographic',
    cameraAngle: 'Three-Quarter Angle Standing',
    lightingPreset: 'Neon Cyberpunk Dual Tone (Magenta/Cyan)',
    environment: 'Futuristic Neo-City Rooftop at Night',
    expression: 'Confident Subtle Smirk',
    pose: 'Poised Heroic Stance with One Hand on Hip',
    seed: 4829104,
    faceAnchorLock: true
  },
  video_settings: {
    activeMotion: 'walking',
    cameraMotion: 'Dynamic Slow Pan In',
    durationSeconds: 5,
    fps: 30,
    loop: true
  }
};

/**
 * Validates character JSON data to enforce 18+ age requirement and required keys
 */
export function validateCharacterData(data) {
  const errors = [];
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid JSON object data structure.'] };
  }

  if (!data.identity) {
    errors.push('Missing "identity" block.');
  } else {
    if (typeof data.identity.age !== 'number' || data.identity.age < 18) {
      errors.push(`Age violation: Character age must be an adult (>= 18). Found: ${data.identity.age}`);
    }
    if (!data.identity.isVerifiedAdult) {
      errors.push('Identity must be flagged as isVerifiedAdult: true.');
    }
  }

  const requiredBlocks = [
    'appearance', 'body', 'face', 'hair', 'skin',
    'clothing', 'accessories', 'personality', 'speech',
    'lifestyle', 'memories', 'emotions', 'relationships',
    'image_settings', 'video_settings'
  ];

  requiredBlocks.forEach(block => {
    if (!data[block]) {
      errors.push(`Missing structured JSON module: "${block}"`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}
