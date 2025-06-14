
/* 
1) Purpose: Renders questions and rewards for HollyBolly mode
2) Functions: renderHollyBollyQuestion, renderReward
3) Depends on: logic.js, gameUtils.js, modeHelper.js
4) Notes: Preserves original function names from older version
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-04 00:45 | File: js/modes/hollybolly/renderer.js
*/

import {
  currentQuestion,
  correctStreak,
  checkHollyBollyAnswer,
  handleAnswer
} from './logic.js';


import {
  optionCount,
  shuffleArray,
  showErrorToUser
} from '../../modeHelper.js';

const difficulty = localStorage.getItem('game-difficulty') || 'medium';
const maxOptions = optionCount[difficulty] || 3;

/**
 * Renders the current HollyBolly question in the UI.
 * @param {HTMLElement} container - Target DOM element
 */
function renderHollyBollyQuestion(container) {
  if (!currentQuestion || !container) return showUserError('No question to display.');

  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = '🎥 Guess the Movie!';
  container.appendChild(heading);

  const clues = document.createElement('div');
  clues.className = 'clue-box';
  clues.innerHTML = `
    <p>🏞️ <strong>Place:</strong> ${currentQuestion.place}</p>
    <p>🐾 <strong>Animal:</strong> ${currentQuestion.animal}</p>
    <p>🎁 <strong>Thing:</strong> ${currentQuestion.thing}</p>
  `;
  container.appendChild(clues);

  const options = [currentQuestion.movie, currentQuestion.bollywood];
  const shown = shuffleArray(options).slice(0, maxOptions);

  const mcqContainer = document.createElement('div');
  mcqContainer.className = 'mcq-options-container';

  shown.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'mcq-btn';
    btn.addEventListener('click', () => handleAnswer(option));
    mcqContainer.appendChild(btn);
  });

  container.appendChild(mcqContainer);
}

/**
 * Renders reward info based on current streak.
 * @param {HTMLElement} container - DOM container to show rewards
 * @param {Object} rewards - Reward data object
 */
function renderReward(container, rewards) {
  if (!container || !rewards) return;

  const rewardBox = document.createElement('div');
  rewardBox.className = 'reward-box';

  if (correctStreak >= 1 && rewards.boxOffice) {
    rewardBox.innerHTML += `
      <p>💰 <strong>Box Office:</strong><br>
      Hollywood: ${rewards.boxOffice.hollywood}<br>
      Bollywood: ${rewards.boxOffice.bollywood}</p>
    `;
  }

  if (correctStreak >= 2 && rewards.actorWorth) {
    rewardBox.innerHTML += `
      <p>🎭 <strong>Main Actor Net Worth:</strong><br>
      Hollywood: ${rewards.actorWorth.hollywood}<br>
      Bollywood: ${rewards.actorWorth.bollywood}</p>
    `;
  }

  if (correctStreak >= 3 && rewards.directorWorth) {
    rewardBox.innerHTML += `
      <p>🎬 <strong>Director Net Worth:</strong><br>
      Hollywood: ${rewards.directorWorth.hollywood}<br>
      Bollywood: ${rewards.directorWorth.bollywood}</p>
    `;
  }

  container.appendChild(rewardBox);
}

export {
  renderHollyBollyQuestion,
  renderReward
};


