
/* 
1) Purpose: Loader for DreamMap game mode questions
2) Function: loadDreamMapQuestions()
3) Depends on: dataLoader.js, modeHelper.js
4) Notes: Uses safeLoadQuestions to handle fallbacks gracefully
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-02 23:41 | File: js/modes/dreammap/loader.js
*/

import { fetchJSON } from '../../js/dataLoader.js';
import { safeLoadQuestions } from '../../js/modeHelper.js';

/**
 * loadDreamMapQuestions
 * Loads DreamMap mode questions based on selected language (default 'en')
 * @param {string} lang - Language code (e.g., 'en')
 * @returns {Promise<Array>} - Promise resolving to an array of questions
 */
export async function loadDreamMapQuestions(lang = 'en') {
  const path = `lang/dreammap-${lang}.json`;
  return await safeLoadQuestions(() => fetchJSON(path), 'DreamMap question load failed');
}
