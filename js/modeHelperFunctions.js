
/**
 * Verifies that a question object has all required fields
 * @param {Object} question
 * @param {Array<string>} requiredFields
 * @returns {boolean}
 */
export function verifyQuestionStructure(question, requiredFields = ['id', 'sentence', 'correct', 'options']) {
  if (typeof question !== 'object' || !question) return false;
  return requiredFields.every(field => field in question);
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 * @param {Array} array
 * @returns {Array}
 */
export function shuffleArray(array = []) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Loads questions safely and validates format
 * @param {Function} loaderFunc - async function returning question array
 * @param {string} fallbackMsg - message to show on error
 * @returns {Array}
 */
export async function safeLoadQuestions(loaderFunc, fallbackMsg = 'Failed to load questions.') {
  try {
    const result = await loaderFunc();
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error('Empty or invalid question set');
    }
    return result;
  } catch (err) {
    logError(fallbackMsg, err);
    showUserError(fallbackMsg);
    return [];
  }
}


/**
 * Gets the number of MCQ options based on difficulty
 * @returns {number} Option count (2 for easy, 3 for medium, 4 for hard)
 */
export function optionCount() {
  const diff = localStorage.getItem('game-difficulty') || 'medium';
  if (diff === 'easy') return 2;
  if (diff === 'hard') return 4;
  return 3; // default medium
}

/**
 * Adds XP to the user's profile and updates XP tracker UI
 * @param {number} points - XP points to add
 */
export function addXP(points = 5) {
  const currentXP = parseInt(localStorage.getItem('user-xp') || '0', 10);
  const newXP = currentXP + points;
  localStorage.setItem('user-xp', newXP);

  const bar = document.getElementById('xpTracker');
  if (bar) {
    bar.textContent = `XP: ${newXP}`;
  }
}



// File: js/modeHelper.js

// Import from other modules
import { logEvent, logError } from './eventLogger.js';
import { addXP } from './xpTracker.js';
import { createErrorContainer } from './createErrorContainer.js';
import { safeLoadQuestions, shuffleArray, verifyQuestionStructure, optionCount } from './questionUtils.js';

// Re-export them all
export {
  logEvent,
  logError,
  addXP,
  createErrorContainer,
  safeLoadQuestions,
  shuffleArray,
  verifyQuestionStructure,
  optionCount
};

// You can also define internal helpers here (optional)




