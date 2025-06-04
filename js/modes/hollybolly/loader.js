

/**
 * 1) Purpose: Load HollyBolly questions from language JSON file
 * 2) Features: Loads questions dynamically based on answer language
 * 3) Called by: startHollyBolly() in hollybolly.js
 * 4) Related: lang/hollybolly-en.json
 * 5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
 * 6) Timestamp: 2025-06-03 22:55 | File: js/modes/hollybolly/loader.js
 * 
 * Functions:
 * - loadHollyBollyData(lang)
 */

import { safeLoadQuestions } from '../../js/questionsUtils.js';

/**
 * Load HollyBolly game questions based on selected answer language
 * @param {string} lang - Language code (e.g., "en", "fr")
 * @returns {Promise<Array>} - Array of question objects
 */
export async function loadHollyBollyData(lang = 'en') {
  const path = `lang/hollybolly-${lang}.json`;

  return await safeLoadQuestions(async () => {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return await res.json();
  }, 'HollyBolly questions failed to load.');
}

