
/* 
1) Purpose: Helper functions for game mode management
2) Features: Error handling, XP tracking, MCQ utilities
3) Depends on: eventLogger.js, createErrorContainer.js
4) MIT License: https://github.com/AllieBaig/LingoQuest1/blob/main/LICENSE
5) Timestamp: 2025-06-03 22:40 | File: js/modeHelper.js
*/

import { logError, logEvent } from './eventLogger.js';
import { createErrorContainer } from './createErrorContainer.js';

/**
 * Adds XP to user profile and updates XP tracker
 * @param {number} points - Amount of XP to add
 */
function addXP(points = 5) {
  const currentXP = parseInt(localStorage.getItem('user-xp') || '0', 10);
  const newXP = currentXP + points;
  localStorage.setItem('user-xp', newXP);

  const bar = document.getElementById('xpTracker');
  if (bar) {
    bar.textContent = `XP: ${newXP}`;
  }
}

/**
 * Handles game load errors and logs them
 */
function handleGameLoadError(error, modeKey) {
  logError(error, `Loading game mode: ${modeKey}`);
  logEvent('game_load_error', {
    mode: modeKey,
    errorMessage: error.message,
    errorType: error.name
  }, 'error');

  showErrorToUser(modeKey, error);
  attemptFallback(modeKey);
}

/**
 * Displays user-friendly error message
 */
function showErrorToUser(modeKey, error) {
  const errorContainer = document.getElementById('error-container') || createErrorContainer();
  const errorMessage = `
    <div class="error-alert">
      <h3>🚨 LingoQuest1 Loading Error</h3>
      <p><strong>Failed to load game mode:</strong><br/> ${modeKey}</p>
      <p><strong>Reason:</strong><br/> ${getErrorMessage(error)}</p>
      <button onclick="location.reload()" class="retry-button">🔄 Try Again</button>
      <button onclick="this.parentElement.remove()" class="close-button">✕ Close</button>
    </div>
  `;
  errorContainer.innerHTML = errorMessage;
  errorContainer.style.display = 'block';
}

/**
 * Returns readable error message
 */
function getErrorMessage(error) {
  if (error.message.includes('Failed to fetch')) return 'Network connection issue or file not found';
  if (error.message.includes('404')) return 'Game mode file not found';
  if (error.message.includes('SyntaxError')) return 'Game mode file has syntax errors';
  return error.message || 'Unknown error occurred';
}

/**
 * Attempts fallback if mode fails to load
 */
function attemptFallback(modeKey) {
  logEvent('attempting_fallback', { originalMode: modeKey });
  console.log(`🔄 Attempting fallback for failed mode: ${modeKey}`);
}

/**
 * Validates mode key
 */
function isValidModeKey(modeKey) {
  const validModes = ['mixlingo', 'echoexpedition', 'wordrelic', 'cinequest', 'hollybolly'];
  return validModes.includes(modeKey);
}

/**
 * Sanitizes mode key for safe usage
 */
function sanitizeModeKey(modeKey) {
  return modeKey.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Loads question set safely
 */
async function safeLoadQuestions(loaderFunc, fallbackMsg = 'Failed to load questions.') {
  try {
    const result = await loaderFunc();
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error('Empty or invalid question set');
    }
    return result;
  } catch (err) {
    logError(fallbackMsg, err);
    showErrorToUser('questions', err);
    return [];
  }
}

/**
 * Shuffles array in-place
 */
function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Verifies required question fields
 */
function verifyQuestionStructure(question, requiredFields = ['id', 'sentence', 'correct', 'options']) {
  if (typeof question !== 'object' || !question) return false;
  return requiredFields.every(field => field in question);
}

/**
 * Returns MCQ option count based on difficulty
 */
function optionCount() {
  const diff = localStorage.getItem('game-difficulty') || 'medium';
  if (diff === 'easy') return 2;
  if (diff === 'hard') return 4;
  return 3;
}

// 🌟 Centralized export block
export {
  logEvent,
  logError,
  addXP,
  createErrorContainer,
  handleGameLoadError,
  safeLoadQuestions,
  shuffleArray,
  verifyQuestionStructure,
  optionCount,
  isValidModeKey,
  sanitizeModeKey
};


