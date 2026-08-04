import { validateCharacterData } from '../types/character';

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
    const data = JSON.parse(jsonString);
    const validation = validateCharacterData(data);
    return {
      success: validation.valid,
      data: validation.valid ? data : null,
      errors: validation.errors
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      errors: [`JSON Syntax Error: ${err.message}`]
    };
  }
}
