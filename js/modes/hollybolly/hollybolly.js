
/* 
1) Purpose: Entry point for HollyBolly game mode
2) Functions: startHollyBolly, getDifficulty
3) Depends on: loader.js, logic.js, renderer.js, gameUtils.js, xpTracker.js
4) Notes: Preserves original function names; handles rendering and MCQ validation
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-04 00:30 | File: js/modes/hollybolly/hollybolly.js
*/

import { loadHollyBollyData } from './loader.js';
import { checkHollyBollyAnswer, getRewardTier } from './logic.js';
import { renderHollyBollyQuestion, renderReward } from './renderer.js';

import {
  logEvent,
  logInfo,
  logError,
  showUserError,
  renderIngameHead,
  renderIngameFoot
} from '../../gameUtils.js';

import { addXP } from '../../xpTracker.js';

let questions = [];
let currentIndex = 0;
let correctStreak = 0;

/**
 * Starts HollyBolly game mode
 */
export async function startHollyBolly() {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return showUserError('Missing game container.');

  gameArea.innerHTML = '';
  gameArea.hidden = false;
  document.getElementById('menuArea').hidden = true;

  renderIngameHead(gameArea);
  renderIngameFoot(gameArea);

  try {
    const lang = localStorage.getItem('answer-language') || 'en';
    questions = await loadHollyBollyData(lang);
    currentIndex = 0;
    correctStreak = 0;

    logEvent('game_start', {
      mode: 'hollybolly',
      total: questions.length,
      difficulty: getDifficulty()
    });

    logInfo(`🎬 Loaded ${questions.length} HollyBolly questions.`);
    renderHollyBollyQuestion(questions[currentIndex]);
  } catch (err) {
    logError('❌ Failed to load HollyBolly questions.', err);
    showUserError('Unable to load HollyBolly questions.');
  }
}

/**
 * Handles question flow after correct answer
 */
document.addEventListener('nextQuestion', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderHollyBollyQuestion(questions[currentIndex]);
  } else {
    showFinalReward();
  }
});

/**
 * Handles MCQ click and game logic
 */
document.addEventListener('mcqSelected', (e) => {
  const selected = e.detail;
  const current = questions[currentIndex];
  const correctAnswer = current.movie;

  const result = checkHollyBollyAnswer(selected, correctAnswer);

  if (result.isCorrect) {
    correctStreak++;
    addXP(getDifficulty());

    renderReward(current.rewards, result.rewardTier);

    currentIndex++;
    if (currentIndex < questions.length) {
      setTimeout(() => {
        renderHollyBollyQuestion(questions[currentIndex]);
      }, 1000);
    } else {
      showFinalReward();
    }
  } else {
    correctStreak = 0;
    showUserError('❌ Incorrect! Try again.');
  }
});

/**
 * Returns difficulty level
 */
function getDifficulty() {
  return localStorage.getItem('game-difficulty') || 'medium';
}


