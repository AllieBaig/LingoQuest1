
/* 
1) Purpose: Load and filter CineQuest questions by decade
2) Features: Supports language + decade filtering, fallback handling
3) Depends on: modeHelper.js (safeLoadQuestions, shuffleArray)
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 00:14 | File: js/modes/cinequest/loader.js
*/

import { safeLoadQuestions, shuffleArray } from '../../js/modeHelper.js';

export async function loadCineQuestQuestions(lang = 'en', decade = 'any') {
  const filePath = `lang/cinequest-${lang}.json`;
  const raw = await safeLoadQuestions(filePath);

  let filtered = raw;

  if (decade !== 'any') {
    filtered = raw.filter(q => q.decade === decade);
    if (filtered.length === 0) {
      console.warn(`No CineQuest entries for decade "${decade}" — using all.`);
      filtered = raw;
    }
  }

  return shuffleArray(filtered);
}
