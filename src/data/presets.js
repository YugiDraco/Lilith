import { DEFAULT_CHARACTER } from '../types/character';

export const CHARACTER_PRESETS = [
  {
    id: 'lilith_default',
    name: 'Lilith Vane (Cyber Operative)',
    badge: 'Sci-Fi Cyberpunk',
    description: 'Athletic, high-tech specialist with midnight obsidian hair and bionic accents.',
    data: DEFAULT_CHARACTER
  },
  {
    id: 'elena_fantasy',
    name: 'Elena Sunstrider (Arch-Mage)',
    badge: 'High Fantasy',
    description: 'Graceful, high-elf sorceress with flowing platinum blonde hair and enchanted vestments.',
    data: {
      ...DEFAULT_CHARACTER,
      identity: {
        ...DEFAULT_CHARACTER.identity,
        name: 'Elena Sunstrider',
        age: 26,
        archetype: 'High Sorceress of Aethelgard',
        backstory: 'Master of arcane elementals and guardian of ancient mystical sanctuaries.'
      },
      appearance: {
        heightCm: 180,
        weightKg: 58,
        overallBuild: 'Slender-Athletic',
        bodyType: 'Petite',
        postureScore: 95
      },
      body: {
        proportions: {
          ...DEFAULT_CHARACTER.body.proportions,
          shoulderWidth: 48,
          waistSize: 38,
          hipWidth: 55,
          legLength: 75,
          thighSize: 45
        },
        upperBody: {
          chestProportion: 45,
          shoulderShape: 'Petite Graceful',
          backWidth: 42,
          posture: 'Regal Erect'
        },
        lowerBody: {
          hipShape: 'Slender Elegant',
          gluteShape: 'Firm Toned',
          gluteProportion: 50,
          thighShape: 'Slim Long',
          legDefinition: 60
        }
      },
      face: {
        ...DEFAULT_CHARACTER.face,
        shape: 'Heart Elegant',
        eyeColor: 'Violet Luminous Gold',
        eyeShape: 'Elven High Arch',
        ears: 'Elven Pointed'
      },
      hair: {
        length: 'Ultra-Long Knees',
        style: 'Braid-Adorned Flowing Platinum Hair',
        baseColor: '#f8fafc',
        highlights: '#e0e7ff',
        ombre: 'Golden Glow Tips',
        texture: 'Silky Waves',
        accessories: 'Sunsteel Circlet Crown'
      },
      clothing: {
        ...DEFAULT_CHARACTER.clothing,
        activeCategory: 'Fantasy'
      },
      image_settings: {
        ...DEFAULT_CHARACTER.image_settings,
        artStyle: 'Dark Fantasy Oil Canvas',
        environment: 'Ancient Crystal Sanctuary Garden with Floating Runes',
        lightingPreset: 'Golden Hour Sunset Flare'
      }
    }
  },
  {
    id: 'marcus_executive',
    name: 'Marcus Sterling (Executive)',
    badge: 'Modern Business',
    description: 'Muscular, sharp executive with tailored business attire and silver-charcoal hair.',
    data: {
      ...DEFAULT_CHARACTER,
      identity: {
        ...DEFAULT_CHARACTER.identity,
        name: 'Marcus Sterling',
        age: 34,
        genderIdentity: 'Male',
        archetype: 'Venture Capitalist & Tech Executive',
        backstory: 'A visionary entrepreneur transforming renewable energy and global infrastructure.'
      },
      appearance: {
        heightCm: 188,
        weightKg: 85,
        overallBuild: 'Mesomorph',
        bodyType: 'Muscular',
        postureScore: 90
      },
      body: {
        proportions: {
          shoulderWidth: 80,
          neckWidth: 65,
          armLength: 65,
          armThickness: 70,
          forearmSize: 68,
          wristSize: 55,
          handSize: 62,
          torsoLength: 68,
          waistSize: 52,
          hipWidth: 58,
          legLength: 72,
          thighSize: 65,
          calfSize: 62,
          ankleSize: 50,
          footSize: 60
        },
        upperBody: {
          chestProportion: 78,
          shoulderShape: 'Broad Squared Muscular',
          backWidth: 75,
          posture: 'Powerful Executive Posture'
        },
        lowerBody: {
          hipShape: 'Athletic V-Taper',
          gluteShape: 'Sculpted Powerful',
          gluteProportion: 65,
          thighShape: 'Muscular Quad-Defined',
          legDefinition: 80
        }
      },
      face: {
        ...DEFAULT_CHARACTER.face,
        shape: 'Square Chiseled',
        jawline: 90,
        chin: 75,
        cheekbones: 80,
        eyeColor: 'Steel Blue Gray',
        eyebrows: 'Thick Structured Dark'
      },
      hair: {
        length: 'Short Cropped',
        style: 'Textured Side Part Fade',
        baseColor: '#334155',
        highlights: '#94a3b8',
        ombre: 'Silver Temples',
        texture: 'Wavy Crisp',
        accessories: 'None'
      },
      clothing: {
        ...DEFAULT_CHARACTER.clothing,
        activeCategory: 'Business'
      },
      image_settings: {
        ...DEFAULT_CHARACTER.image_settings,
        artStyle: 'Hyperrealistic Photographic',
        environment: 'Penthouse High-Rise Glass Office Overlooking Skyline',
        lightingPreset: 'Studio Softbox Key Light'
      }
    }
  },
  {
    id: 'sora_streetwear',
    name: 'Sora Tanaka (Streetwear Trendsetter)',
    badge: 'Urban Streetwear',
    description: 'Curvy fashion icon with pastel hair, bold tattoos, and modern streetwear aesthetic.',
    data: {
      ...DEFAULT_CHARACTER,
      identity: {
        ...DEFAULT_CHARACTER.identity,
        name: 'Sora Tanaka',
        age: 22,
        archetype: 'Creative Director & Designer',
        backstory: 'Tokyo-born designer merging underground street culture with high-fashion apparel.'
      },
      appearance: {
        heightCm: 168,
        weightKg: 60,
        overallBuild: 'Voluptuous',
        bodyType: 'Curvy',
        postureScore: 82
      },
      body: {
        proportions: {
          ...DEFAULT_CHARACTER.body.proportions,
          shoulderWidth: 55,
          waistSize: 42,
          hipWidth: 75,
          legLength: 62,
          thighSize: 68
        },
        upperBody: {
          chestProportion: 65,
          shoulderShape: 'Soft Rounded',
          backWidth: 50,
          posture: 'Relaxed Casual'
        },
        lowerBody: {
          hipShape: 'Full Hourglass',
          gluteShape: 'Voluptuous Round',
          gluteProportion: 78,
          thighShape: 'Full Curved',
          legDefinition: 55
        }
      },
      hair: {
        length: 'Medium Shoulder Bob',
        style: 'Asymmetrical Bob with Side Sweep',
        baseColor: '#ec4899',
        highlights: '#38bdf8',
        ombre: 'Pastel Lilac Dip',
        texture: 'Soft Wavy',
        accessories: 'Designer Beanie Clip'
      },
      clothing: {
        ...DEFAULT_CHARACTER.clothing,
        activeCategory: 'Streetwear'
      },
      image_settings: {
        ...DEFAULT_CHARACTER.image_settings,
        artStyle: 'Cinematic 8K 3D Render',
        environment: 'Shibuya Neon Street Crossing with Rain Reflections',
        lightingPreset: 'Neon Cyberpunk Dual Tone (Magenta/Cyan)'
      }
    }
  }
];
