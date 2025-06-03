
/* 
1) Purpose: Renders Echo Expedition questions and handles user interaction
2) Features: MCQ rendering, difficulty-aware option slicing, XP & rewards
3) Depends on: modeHelper.js (verifyQuestionStructure, addXP, autoCheckMCQ, optionCount)
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 00:02 | File: js/modes/echoexp/renderer.js
*/

import {
  addXP,
  autoCheckMCQ,
  verifyQuestionStructure,
  showUserError,
  optionCount
} from '../../modeHelper.js';

export function showEchoPrompt(level, difficulty = 'medium') {
  const container = document.getElementById('sentenceBuilderArea');
  if (!container || !level) return showUserError('Missing prompt container or level data.');

  container.innerHTML = ''; // Clear previous

  const { id, letter, theme, name, place, animal, thing, answers, correct } = level;
  const required = ['id', 'letter', 'theme', 'answers', 'correct'];

  if (!verifyQuestionStructure(level, required)) {
    return showUserError(`Invalid level format for Echo Expedition [${id}]`);
  }

  const heading = document.createElement('h2');
  heading.textContent = `🌍 Echo Expedition – ${theme} (Letter: ${letter})`;
  container.appendChild(heading);

  const clues = [
    { label: '👤 Name', value: name },
    { label: '📍 Place', value: place },
    { label: '🐾 Animal', value: animal },
    { label: '🎁 Thing', value: thing }
  ];

  clues.forEach(({ label, value }) => {
    const div = document.createElement('div');
    div.textContent = `${label}: ${value}`;
    container.appendChild(div);
  });

  const mcqBox = document.createElement('div');
  mcqBox.className = 'mcq-box';

  const maxOptions = optionCount[difficulty] || 3;
  const optionsToShow = [...answers].slice(0, maxOptions);

  optionsToShow.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'mcq-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      const isCorrect = autoCheckMCQ(opt, correct);
      if (isCorrect) addXP(5);
      btn.classList.add(isCorrect ? 'correct' : 'incorrect');
      setTimeout(() => {
        document.dispatchEvent(new Event('nextQuestion'));
      }, 900);
    });
    mcqBox.appendChild(btn);
  });

  container.appendChild(mcqBox);
}
