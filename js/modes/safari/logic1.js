
/* 
1) Purpose: Core logic for Word Safari game mode
2) Function: handleSafariAnswer()
3) Depends on: xpTracker.js, modeHelper.js
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 00:04 | File: js/modes/safari/logic.js
*/

import { addXP, autoCheckMCQ } from '../../js/modeHelper.js';
import { logEvent } from '../../js/eventLogger.js';

/**
 * handleSafariAnswer
 * Handles user selection for a Safari MCQ
 * @param {HTMLElement} button - The clicked answer button
 * @param {Object} question - The current question object
 * @param {Function} onNext - Callback to go to next question
 */
export function handleSafariAnswer(button, question, onNext) {
  const selected = button.textContent.trim();
  const correct = question.answer.trim();

  const result = autoCheckMCQ(button, selected, correct);

  if (result.correct) {
    addXP(5);
    logEvent('safari_correct', { id: question.id });
  } else {
    logEvent('safari_wrong', { id: question.id, chosen: selected });
  }

  setTimeout(() => {
    if (typeof onNext === 'function') onNext();
  }, 800);
}

