
/* 
1) Purpose: Render logic for Word Safari mode (Normal UI)
2) Function: renderSafariQuestion()
3) Depends on: gameUtils.js, safari/logic.js, modeHelper.js
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 00:06 | File: js/modes/safari/renderer.js
*/

import { clearGameUI, renderMCQOptions } from '../../js/gameUtils.js';
import { handleSafariAnswer } from './logic.js';
import { logEvent } from '../../js/eventLogger.js';

/**
 * renderSafariQuestion
 * Displays a Word Safari prompt and MCQ answers
 * @param {Object} question - The question object
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @param {Function} onNext - Callback to load next question
 */
export function renderSafariQuestion(question, difficulty, onNext) {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return;

  clearGameUI();
  const clueBox = document.createElement('div');
  clueBox.className = 'clue-box';

  const clueText = document.createElement('p');
  clueText.textContent = `🌿 Clue: ${question.clue}`;
  clueBox.appendChild(clueText);
  gameArea.appendChild(clueBox);

  logEvent('safari_question_rendered', { id: question.id });

  renderMCQOptions({
    container: gameArea,
    options: question.options,
    correctAnswer: question.answer,
    difficulty,
    onSelect: (btn) => handleSafariAnswer(btn, question, onNext)
  });
}
