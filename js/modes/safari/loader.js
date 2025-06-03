
/* 
1) Purpose: Loads Word Safari question set
2) Function: loadSafariQuestions()
3) Depends on: gameUtils.js for fetchJSON()
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 00:02 | File: js/modes/safari/loader.js
*/

import { fetchJSON } from '../../js/gameUtils.js';

/**
 * loadSafariQuestions
 * Loads Word Safari question set based on selected language
 * @param {string} lang - Language code like 'en', 'fr', 'de'
 * @returns {Promise<Array>} - Array of Safari questions
 */
export async function loadSafariQuestions(lang = 'en') {
  const url = `./lang/safari-${lang}.json`;
  return await fetchJSON(url);
}
