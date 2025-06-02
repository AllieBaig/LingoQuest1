
/* 
1) Purpose: Handles logic flow and validation for Echo Expedition mode
2) Features: Loads and filters question levels, manages progression state
3) Depends on: modeHelper.js (safeLoadQuestions, shuffleArray)
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 00:04 | File: js/modes/echoexp/logic.js
*/

import {
  safeLoadQuestions,
  shuffleArray,
  showUserError
} from '../../js/modeHelper.js';

let echoLevels = [];
let usedLevelIDs = new Set();

export async function loadEchoLevels(lang = 'en') {
  const path = `lang/echo-exp.json`;
  const raw = await safeLoadQuestions(path);
  echoLevels = shuffleArray(raw);
  usedLevelIDs.clear();
  return echoLevels;
}

export function getNextEchoLevel() {
  for (const level of echoLevels) {
    if (!usedLevelIDs.has(level.id)) {
      usedLevelIDs.add(level.id);
      return level;
    }
  }
  return null; // All used
}

export function resetEchoProgress() {
  usedLevelIDs.clear();
}

export function echoLevelCount() {
  return echoLevels.length;
}
