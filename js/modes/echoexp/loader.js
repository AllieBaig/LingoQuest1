
/* 
1) Purpose: Loads Echo Expedition question set from JSON
2) Features: Language-aware dynamic import, fallback-safe
3) Depends on: modeHelper.js (safeLoadQuestions)
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 00:00 | File: js/modes/echoexp/loader.js
*/

import { safeLoadQuestions } from '../../modeHelper.js';

export async function loadEchoExpLevels(lang = 'en') {
  const path = `lang/echo-exp.json`; // Currently not language-specific
  const levels = await safeLoadQuestions(path);
  return Array.isArray(levels) ? levels : [];
}
