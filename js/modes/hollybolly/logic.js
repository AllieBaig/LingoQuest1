
/* 
1) Purpose: Core logic handler for HollyBolly game mode
2) Functions: startGame, handleAnswer, correctStreak, getXP, updateXPBar, checkHollyBollyAnswer
3) Depends on: modeHelper.js, gameUtils.js, renderer.js
4) Related Files: hollybolly/renderer.js, hollybolly.js
5) Notes: Tracks streaks and rewards based on correct answer streak
6) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
7) Timestamp: 2025-06-03 23:55 | File: js/modes/hollybolly/logic.js
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
function startGame(pool) {
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
function handleAnswer(selected) {
  const correct = currentQuestion.movie;
  const result = checkHollyBollyAnswer(selected, correct);

  const buttons = document.querySelectorAll('.mcq-btn');
  const selectedBtn = Array.from(buttons).find(btn => btn.textContent === selected);
  if (selectedBtn) autoCheckMCQ(selectedBtn, result.isCorrect);

  if (result.rewardTier > 0) {
    renderReward(document.getElementById('resultSummary'), currentQuestion.rewards);
  }

  answeredIDs.add(currentQuestion.id);
  updateXPBar();

  setTimeout(loadNext, result.isCorrect ? 1000 : 1500);
}

/**
 * Determines XP based on difficulty.
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

/**
 * Checks the user answer and updates XP and streak.
 * @param {string} userAnswer 
 * @param {string} correctAnswer 
 * @returns {Object} { isCorrect, rewardTier }
 */
function checkHollyBollyAnswer(userAnswer, correctAnswer) {
  const isCorrect = userAnswer === correctAnswer;
  if (isCorrect) {
    streak++;
    addXP(getXP());
    logEvent('answer_correct', { mode: 'hollybolly', userAnswer, streak });
  } else {
    streak = 0;
    logEvent('answer_wrong', { mode: 'hollybolly', userAnswer, correctAnswer });
  }

  return {
    isCorrect,
    rewardTier: getRewardTier(streak)
  };
}

/**
 * Determines the reward tier based on streak.
 * @param {number} streak 
 * @returns {number}
 */
function getRewardTier(streak) {
  if (streak >= 3) return 3;
  if (streak === 2) return 2;
  if (streak === 1) return 1;
  return 0;
}

export {
  startGame,
  handleAnswer,
  correctStreak,
  currentQuestion
};



