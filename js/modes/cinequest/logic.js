
/* 
1) Purpose: Core logic for CineQuest game mode
2) Features: Handles question filtering by decade, XP, and answer validation
3) Depends on: modeHelper.js, gameUtils.js, logger.js
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 22:20 | File: js/modes/cinequest/logic.js
*/

import {
  addXP,
  autoCheckMCQ,
  showUserError,
  optionCount
} from '../../js/modeHelper.js';

import { logInfo, logWarn, logError } from '../../js/logger.js';

export function filterByDecade(questionPool, selectedDecade) {
  if (!selectedDecade || selectedDecade === 'all') {
    return questionPool;
  }
  const decadePrefix = selectedDecade.slice(0, 3); // '199' for 1990s
  const filtered = questionPool.filter(q => q.id.includes(decadePrefix));
  logInfo(`📅 Filtered questions for decade ${selectedDecade}: ${filtered.length}`);
  return filtered;
}

export function validateAnswer(selected, correct, question) {
  const isCorrect = selected === correct;
  autoCheckMCQ(selected, correct);
  if (isCorrect) {
    addXP(10);
    logInfo(`✅ Correct answer: ${selected} for ${question.id}`);
  } else {
    logWarn(`❌ Incorrect answer: ${selected} | Correct: ${correct}`);
  }
  return isCorrect;
}

export function prepareMCQOptions(correct, pool) {
  const difficulty = localStorage.getItem('game-difficulty') || 'medium';
  const max = optionCount[difficulty] || 3;

  const candidates = pool
    .map(q => q.movie)
    .filter(title => title !== correct);

  const shuffled = [...new Set(candidates)].sort(() => 0.5 - Math.random());
  const options = [correct, ...shuffled.slice(0, max - 1)].sort(() => 0.5 - Math.random());

  return options;
}
