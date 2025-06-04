
/* 
1) Purpose: Render CineQuest clues and MCQ interface
2) Features: Displays Place, Animal, Thing clues and validates user guesses
3) Depends on: modeHelper.js (verifyQuestionStructure, autoCheckMCQ, addXP)
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 00:15 | File: js/modes/cinequest/renderer.js
*/

import {
  verifyQuestionStructure,
  autoCheckMCQ,
  addXP,
  showUserError
} from '../../js/modeHelper.js';

export function showCineQuestion(question, difficulty = 'medium') {
  const container = document.getElementById('sentenceBuilderArea');
  if (!container) return showUserError('❌ Missing game container.');

  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = '🎥 Guess the Movie!';
  container.appendChild(heading);

  const clues = document.createElement('ul');
  clues.className = 'cinequest-clues';
  clues.innerHTML = `
    <li>🏞️ Place: <strong>${question.place}</strong></li>
    <li>🐾 Animal: <strong>${question.animal}</strong></li>
    <li>🎁 Thing: <strong>${question.thing}</strong></li>
  `;
  container.appendChild(clues);

  if (!verifyQuestionStructure(question, ['movie', 'options', 'correct'])) {
    return showUserError('❌ Invalid question format.');
  }

  const mcqContainer = document.createElement('div');
  mcqContainer.className = 'mcq-container';

  const maxOptions = {
    easy: 2,
    medium: 3,
    hard: 4
  }[difficulty] || 3;

  const options = question.options.slice(0, maxOptions);

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'mcq-option';
    btn.addEventListener('click', () => {
      autoCheckMCQ(option, question.correct, btn, () => {
        addXP(10);
        setTimeout(() => {
          document.dispatchEvent(new Event('nextQuestion'));
        }, 600);
      });
    });
    mcqContainer.appendChild(btn);
  });

  container.appendChild(mcqContainer);
}
