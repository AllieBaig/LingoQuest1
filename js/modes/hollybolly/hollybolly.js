

/**
 * 1) Purpose: Entry point for HollyBolly mode
 * 2) Features: Loads questions, renders UI, handles gameplay flow and rewards
 * 3) Depends on: loader.js, logic.js, renderer.js, modeHandler.js, gameUtils.js
 * 4) Related: XP system, MCQ difficulty, answer language selector, reward levels
 * 5) Special: Includes reward unlocking logic across 3 tiers (boxOffice, actorWorth, directorWorth)
 * 6) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
 * 7) Timestamp: 2025-06-03 22:52 | File: js/modes/hollybolly/hollybolly.js
 */


import { loadHollyBollyData } from './loader.js';
import { validateAnswer, showFinalReward } from './logic.js';
import { renderHollyBollyQuestion } from './renderer.js';

import {
  logEvent,
  renderIngameHead,
  renderIngameFoot,
  addXP,
  showUserError
} from '../../js/gameUtils.js';

import { resetStreak, incrementStreak, getStreak } from '../../js/xpTracker.js';

let currentIndex = 0;
let questions = [];

export async function startHollyBolly() {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return showUserError('Missing game container.');

  gameArea.innerHTML = '';
  gameArea.hidden = false;
  document.getElementById('menuArea').hidden = true;

  renderIngameHead(gameArea);
  renderIngameFoot(gameArea);

  const lang = localStorage.getItem('answerLang') || 'en';
  const difficulty = localStorage.getItem('game-difficulty') || 'medium';

  try {
    questions = await loadHollyBollyData(lang);
    currentIndex = 0;
    logEvent('game_start', { mode: 'HollyBolly', total: questions.length });
    renderHollyBollyQuestion(questions[currentIndex], difficulty);
  } catch (err) {
    showUserError('Failed to load HollyBolly data.');
  }
}

// Handles answer checking and reward logic
document.addEventListener('mcqSelected', async (e) => {
  const selected = e.detail;
  const difficulty = localStorage.getItem('game-difficulty') || 'medium';

  const current = questions[currentIndex];
  const correct = validateAnswer(current, selected);

  if (correct) {
    addXP(difficulty);
    incrementStreak();

    const streak = getStreak();
    showFinalReward(current, streak); // Shows boxOffice, actorWorth, directorWorth progressively
    currentIndex++;

    if (currentIndex < questions.length) {
      setTimeout(() => {
        renderQuestion(questions[currentIndex], difficulty);
      }, 1000);
    } else {
      showUserError('🎉 You completed all HollyBolly questions!');
    }
  } else {
    resetStreak();
    showUserError('❌ Incorrect! Try again.');
  }
});


