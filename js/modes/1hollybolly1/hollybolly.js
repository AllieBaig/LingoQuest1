/* 
1) Purpose: Entry point for HollyBolly game mode
2) Loads data, renders UI, manages question flow, and reveals rewards
3) Depends on: loader.js, renderer.js, modeHelper.js, gameUtils.js
4) Special: Supports reward tiers (boxOffice, actorWorth, directorWorth)
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-02 22:45 | File: js/modes/hollybolly/hollybolly.js
*/

import { loadHollyBollyData } from './loader.js';
import { renderHollyBollyQuestion, showFinalReward } from './renderer.js';
import {
  logEvent,
  logInfo,
  logError,
  showUserError,
  renderIngameHead,
  renderIngameFoot
} from '../../modeHelper.js';

let questions = [];
let currentIndex = 0;
let correctStreak = 0;

export async function startHollyBolly() {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return showUserError('Missing game container.');

  gameArea.innerHTML = '';
  gameArea.hidden = false;
  document.getElementById('menuArea').hidden = true;

  renderIngameHead(gameArea);
  renderIngameFoot(gameArea);

  try {
    questions = await loadHollyBollyData();
    currentIndex = 0;
    correctStreak = 0;

    logEvent('game_start', { mode: 'HollyBolly', total: questions.length });
    logInfo(`🎬 Loaded ${questions.length} HollyBolly movie challenges.`);

    renderHollyBollyQuestion(questions[currentIndex], getDifficulty(), correctStreak);
  } catch (err) {
    logError('❌ Failed to load HollyBolly questions.', err);
    showUserError('Unable to load HollyBolly questions.');
  }
}

document.addEventListener('nextQuestion', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderHollyBollyQuestion(questions[currentIndex], getDifficulty(), correctStreak);
  } else {
    showFinalReward(); // End of game
  }
});

document.addEventListener('correctAnswer', () => {
  correctStreak++;
});

document.addEventListener('wrongAnswer', () => {
  correctStreak = 0;
});

function getDifficulty() {
  return localStorage.getItem('game-difficulty') || 'medium';
}
