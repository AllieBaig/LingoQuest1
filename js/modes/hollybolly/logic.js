

/**
 * 1) Purpose: Game logic handler for HollyBolly mode
 * 2) Features: Handles answer checking, XP reward, streak-based rewards
 * 3) Called by: hollybolly.js and renderer.js
 * 4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
 * 5) Timestamp: 2025-06-03 23:03 | File: js/modes/hollybolly/logic.js
 *
 * Functions:
 * - checkHollyBollyAnswer(userAnswer, correctAnswer)
 * - getRewardTier(streak)
 */

import { addXP } from '../../js/xpTracker.js';
import { logEvent } from '../../js/eventLogger.js';

let streak = 0;

/**
 * Checks the user answer and updates XP and streak.
 * @param {string} userAnswer - User's selected answer
 * @param {string} correctAnswer - The correct answer
 * @returns {Object} - { isCorrect: boolean, rewardTier: number }
 */
export function checkHollyBollyAnswer(userAnswer, correctAnswer) {
  const isCorrect = userAnswer === correctAnswer;
  if (isCorrect) {
    streak++;
    addXP(10); // Fixed XP per correct answer
    logEvent('answer_correct', { mode: 'hollybolly', streak });
  } else {
    streak = 0;
    logEvent('answer_incorrect', { mode: 'hollybolly' });
  }

  return {
    isCorrect,
    rewardTier: getRewardTier(streak)
  };
}

/**
 * Determines the reward tier based on streak
 * @param {number} streak - Current correct streak
 * @returns {number} - Reward tier (0 = none, 1 = boxOffice, 2 = actorWorth, 3 = directorWorth)
 */
export function getRewardTier(streak) {
  if (streak >= 3) return 3;
  if (streak === 2) return 2;
  if (streak === 1) return 1;
  return 0;
}



