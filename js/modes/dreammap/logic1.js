
/* 
1) Purpose: Core logic for DreamMap game mode
2) Function: handleDreamAnswer()
3) Depends on: gameUtils.js, modeHelper.js, xpTracker.js
4) Notes: Validates answers, tracks XP, dispatches next prompt event
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-02 23:47 | File: js/modes/dreammap/logic.js
*/

import { autoCheckMCQ, addXP } from '../../js/modeHelper.js';
import { logEvent } from '../../js/eventLogger.js';

/**
 * handleDreamAnswer
 * Handles user answer, checks if correct, awards XP, and dispatches next question
 * @param {string} selected - User selected option
 * @param {string} correct - Correct answer
 * @param {string} category - One of: name, place, animal, thing
 */
export function handleDreamAnswer(selected, correct, category) {
  const result = autoCheckMCQ(selected, correct);

  logEvent('dreammap_answer', {
    category,
    selected,
    correct,
    isCorrect: result
  });

  if (result) {
    addXP(10);
  }

  setTimeout(() => {
    document.dispatchEvent(new Event('nextQuestion'));
  }, 600);
}
