import { validateAndNormalizeCharacterJSON } from '../schemas/CharacterSchema';

/**
 * Character JSON Exporter & Importer Utility for Lilith V3
 * Uses CharacterSchema.js as the SINGLE source of truth for both export & import validation.
 */

export function exportCharacterToJSON(character) {
  return JSON.stringify(character, null, 2);
}

export function downloadCharacterJSON(character, filename = 'character_anatomy.json') {
  const jsonStr = exportCharacterToJSON(character);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${character?.identity?.name?.toLowerCase().replace(/\s+/g, '_') || 'character'}_anatomy.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseAndValidateJSON(jsonString) {
  try {
    const rawObj = JSON.parse(jsonString);
    const result = validateAndNormalizeCharacterJSON(rawObj);
    return {
      success: result.valid,
      data: result.data,
      errors: result.errors,
      warnings: result.warnings || []
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      errors: [`JSON Syntax Error: ${err.message}`],
      warnings: []
    };
  }
}
