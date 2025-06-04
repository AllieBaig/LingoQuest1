

/* 
1. Purpose: Core logic handler for HollyBolly game mode
2. Responsibilities: Game flow, question progression, answer handling, rewards
3. Functions: startGame, loadNext, handleAnswer, getXP, updateXPBar, getCorrectStreak
4. Dependencies: modeHelper.js, gameUtils.js, renderer.js, xpTracker.js
5. Related Files: hollybolly/renderer.js, hollybolly/loader.js, hollybolly.js
6. Special Notes: Tracks streaks for multi-tier rewards
7. MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
8. Timestamp: 2025-06-03 23:45 | File: js/modes/hollybolly/logic.js
*/

import {
  logEvent,
  addXP,
  showErrorToUser,
  verifyQuestionStructure,
  shuffleArray,
  optionCount
} from '../../modeHelper.js';

import { autoCheckMCQ } from '../../gameUtils.js';
import { renderXPBar } from '../../xpTracker.js';

import {
  renderHollyBollyQuestion,
  renderReward
} from './renderer.js';

let questionPool = [];
let answeredIDs = new Set();
let currentQuestion = null;
let difficulty = localStorage.getItem('game-difficulty') || 'medium';
let streak = 0;

/**
 * Starts the HollyBolly game with shuffled question pool.
 * @param {Array} pool 
 */
export function startGame(pool) {
  questionPool = shuffleArray(pool);
  answeredIDs.clear();
  streak = 0;
  loadNext();
}

/**
 * Loads the next valid question or ends game.
 */
function loadNext() {
  if (answeredIDs.size >= questionPool.length) {
    return showCompletion(answeredIDs.size);
  }

  let question;
  let tries = 0;
  const maxTries = 40;

  do {
    question = questionPool[Math.floor(Math.random() * questionPool.length)];
    tries++;
    if (tries > maxTries) return showCompletion(answeredIDs.size);
  } while (answeredIDs.has(question.id));

  const required = ['id', 'place', 'animal', 'thing', 'movie', 'bollywood', 'rewards'];
  if (!verifyQuestionStructure(question, required)) {
    answeredIDs.add(question.id);
    return loadNext();
  }

  currentQuestion = question;
  renderHollyBollyQuestion(document.getElementById('sentenceBuilderArea'));
}

/**
 * Handles user answer selection and updates XP and streak.
 * @param {string} selected 
 */
export function handleAnswer(selected) {
  const correct = currentQuestion.movie;
  const isCorrect = selected === correct;

  const buttons = document.querySelectorAll('.mcq-btn');
  const selectedBtn = Array.from(buttons).find(btn => btn.textContent === selected);
  if (selectedBtn) autoCheckMCQ(selectedBtn, isCorrect);

  const xp = getXP();

  if (isCorrect) {
    streak++;
    addXP(xp);
    logEvent('answer_correct', { id: currentQuestion.id, selected, difficulty, xp });

    if (streak === 2 || streak === 3) {
      renderReward(document.getElementById('resultSummary'), currentQuestion.rewards);
    }

  } else {
    streak = 0;
    logEvent('answer_wrong', { id: currentQuestion.id, selected, correct, difficulty });
  }

  answeredIDs.add(currentQuestion.id);
  updateXPBar();

  setTimeout(loadNext, isCorrect ? 1000 : 1500);
}

/**
 * Returns XP based on difficulty.
 */
function getXP() {
  const map = { easy: 3, medium: 5, hard: 8 };
  return map[difficulty] || 5;
}

/**
 * Renders the XP bar.
 */
function updateXPBar() {
  renderXPBar();
}

/**
 * Returns current correct answer streak.
 */
function correctStreak() {
  return streak;
}

export {
  startGame,
  handleAnswer,
  CorrectStreak,
  currentQuestion
};



