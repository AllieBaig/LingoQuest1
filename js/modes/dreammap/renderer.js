
/* 
1) Purpose: Renders DreamMap game UI elements
2) Function: renderDreamPrompt()
3) Depends on: gameUtils.js, modeHelper.js
4) Notes: Shows prompt per category with difficulty-aware MCQ
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-02 23:49 | File: js/modes/dreammap/renderer.js
*/

import { shuffleArray, optionCount } from '../../js/modeHelper.js';
import { handleDreamAnswer } from './logic.js';

/**
 * renderDreamPrompt
 * Renders a single NPAT dream prompt
 * @param {Object} prompt - Contains clue, correct answer, and options
 * @param {string} category - One of: name, place, animal, thing
 * @param {string} difficulty - easy | medium | hard
 */
export function renderDreamPrompt(prompt, category, difficulty) {
  const container = document.getElementById('gameArea');
  if (!container) return;

  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = `💤 ${prompt.clue}`;
  container.appendChild(heading);

  const choices = shuffleArray([prompt.answer, ...prompt.options])
    .slice(0, optionCount[difficulty]);

  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.className = 'mcq-button';
    btn.addEventListener('click', () => {
      handleDreamAnswer(choice, prompt.answer, category);
    });
    container.appendChild(btn);
  });
}
