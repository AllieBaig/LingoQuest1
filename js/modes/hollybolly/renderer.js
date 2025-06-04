

/**
 * 1) Purpose: Renders HollyBolly questions and rewards
 * 2) Features: Shows MCQ options, validates answer, shows XP + rewards
 * 3) Depends on: logic.js, gameUtils.js, questionsUtils.js
 * 4) Called by: hollybolly.js
 * 5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
 * 6) Timestamp: 2025-06-04 12:33 | File: js/modes/hollybolly/renderer.js
 *
 * Functions:
 * - renderHollyBollyQuestion(q, difficulty)
 * - showHollyBollyReward(tier, rewards)
 */

import { checkHollyBollyAnswer } from './logic.js';
import { showResultFeedback, shuffleOptions } from '../../js/gameUtils.js';
import { logEvent } from '../../js/eventLogger.js';

/**
 * Renders a HollyBolly question with MCQ options.
 * @param {Object} q - Question object
 * @param {string} difficulty - easy | medium | hard
 */
export function renderHollyBollyQuestion(q, difficulty = 'medium') {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return;

  gameArea.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = '🎥 Guess the Movie!';
  gameArea.appendChild(heading);

  const clue = document.createElement('p');
  clue.textContent = q.clue;
  gameArea.appendChild(clue);

  const options = shuffleOptions(q.options, difficulty);
  const optionContainer = document.createElement('div');
  optionContainer.className = 'mcq-options';

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'mcq-button';
    btn.addEventListener('click', () => {
      const { isCorrect, rewardTier } = checkHollyBollyAnswer(option, q.answer);
      showResultFeedback(isCorrect, q.answer);
      if (isCorrect && q.rewards) {
        showHollyBollyReward(rewardTier, q.rewards);
      }
      setTimeout(() => {
        document.dispatchEvent(new Event('nextQuestion'));
      }, 1200);
    });
    optionContainer.appendChild(btn);
  });

  gameArea.appendChild(optionContainer);
}

/**
 * Displays reward info based on reward tier.
 * @param {number} tier - 1, 2, or 3
 * @param {Object} rewards - reward data from question
 */
export function showHollyBollyReward(tier, rewards) {
  const rewardBox = document.createElement('div');
  rewardBox.className = 'reward-box';

  let rewardHTML = '';
  if (tier >= 1 && rewards.boxOffice) {
    rewardHTML += `
      <p>💰 <strong>Box Office</strong><br>
      Hollywood: ${rewards.boxOffice.hollywood}<br>
      Bollywood: ${rewards.boxOffice.bollywood}</p>
    `;
  }
  if (tier >= 2 && rewards.actorWorth) {
    rewardHTML += `
      <p>🎭 <strong>Main Actor Worth</strong><br>
      Hollywood: ${rewards.actorWorth.hollywood}<br>
      Bollywood: ${rewards.actorWorth.bollywood}</p>
    `;
  }
  if (tier >= 3 && rewards.directorWorth) {
    rewardHTML += `
      <p>🎬 <strong>Director Net Worth</strong><br>
      Hollywood: ${rewards.directorWorth.hollywood}<br>
      Bollywood: ${rewards.directorWorth.bollywood}</p>
    `;
  }

  rewardBox.innerHTML = rewardHTML;
  document.getElementById('gameArea').appendChild(rewardBox);
  logEvent('reward_shown', { tier, rewards });
}


