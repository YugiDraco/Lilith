import { DEFAULT_CHARACTER_V2 } from '../types/characterV2';

/**
 * Single Source of Truth Character Schema for Lilith V3
 * Shared between JSON Exporter and JSON Importer.
 */

export const CHARACTER_SCHEMA_VERSION = '2.0.0';

export const REQUIRED_MODULE_KEYS = [
  'identity',
  'appearance',
  'body',
  'face',
  'hair',
  'eyes',
  'skin',
  'clothing',
  'accessories',
  'personality',
  'speech',
  'lifestyle',
  'memories',
  'relationship',
  'emotion',
  'image',
  'video',
  'system'
];

/**
 * Legacy Property Key Alias Mappings for Backward Compatibility
 */
export const LEGACY_KEY_MAP = {
  relationships: 'relationship',
  emotions: 'emotion',
  image_settings: 'image',
  video_settings: 'video',
  identity_info: 'identity',
  speech_style: 'speech'
};

/**
 * Validates, normalizes, and hydrates incoming Character JSON payloads.
 * Guaranteed to succeed for any valid exported character payload.
 */
export function validateAndNormalizeCharacterJSON(rawObj) {
  const errors = [];
  const warnings = [];

  if (!rawObj || typeof rawObj !== 'object' || Array.isArray(rawObj)) {
    return {
      valid: false,
      data: null,
      errors: ['Root character payload must be a valid JSON object.']
    };
  }

  // Deep clone to prevent mutating original parameter
  const normalized = JSON.parse(JSON.stringify(rawObj));

  // 1. Backward Compatibility: Map legacy keys to standard V2 keys
  Object.keys(LEGACY_KEY_MAP).forEach((legacyKey) => {
    const standardKey = LEGACY_KEY_MAP[legacyKey];
    if (normalized[legacyKey] !== undefined) {
      if (normalized[standardKey] === undefined) {
        normalized[standardKey] = normalized[legacyKey];
        warnings.push(`Mapped legacy property '${legacyKey}' to standard '${standardKey}'.`);
      }
      delete normalized[legacyKey];
    }
  });

  // 2. Validate Root Identity
  if (!normalized.identity || typeof normalized.identity !== 'object') {
    errors.push("Missing or invalid 'identity' root object.");
  } else if (!normalized.identity.name) {
    warnings.push("Property 'identity.name' was missing; defaulted to 'Companion'.");
    normalized.identity.name = 'Companion';
  }

  // 3. Hydrate missing modules from DEFAULT_CHARACTER_V2 without stripping unknown future fields
  REQUIRED_MODULE_KEYS.forEach((moduleKey) => {
    if (normalized[moduleKey] === undefined || normalized[moduleKey] === null) {
      normalized[moduleKey] = JSON.parse(JSON.stringify(DEFAULT_CHARACTER_V2[moduleKey] || {}));
      warnings.push(`Hydrated missing module '${moduleKey}' with default schema parameters.`);
    } else if (typeof normalized[moduleKey] !== 'object') {
      errors.push(`Module '${moduleKey}' must be a JSON object, received type '${typeof normalized[moduleKey]}'.`);
    } else {
      // Merge default properties if sub-fields are missing
      const defaultModule = DEFAULT_CHARACTER_V2[moduleKey] || {};
      Object.keys(defaultModule).forEach((propKey) => {
        if (normalized[moduleKey][propKey] === undefined) {
          normalized[moduleKey][propKey] = JSON.parse(JSON.stringify(defaultModule[propKey]));
        }
      });
    }
  });

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? normalized : null,
    errors,
    warnings
  };
}
