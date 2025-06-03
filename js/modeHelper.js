
/* 
1) Purpose: Helper functions for game mode management
2) Features: Error handling, mode validation, utility functions
3) Depends on: eventLogger.js, createErrorContainer.js
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 22:15 | File: js/modeHelper.js
*/

import { logError, logEvent } from './eventLogger.js';
import { createErrorContainer } from './createErrorContainer.js';

/**
 * Handles errors that occur during game mode loading
 * @param {Error} error - The error that occurred
 * @param {string} modeKey - The mode that failed to load
 */
export function handleGameLoadError(error, modeKey) {
  logError(error, `Loading game mode: ${modeKey}`);

  logEvent(
    'game_load_error',
    {
      mode: modeKey,
      errorMessage: error.message,
      errorType: error.name
    },
    'error'
  );

  showErrorToUser(modeKey, error);
  attemptFallback(modeKey);
}

/**
 * Shows a user-friendly error message
 * @param {string} modeKey - The mode that failed to load
 * @param {Error} error - The original error
 */
function showErrorToUser(modeKey, error) {
  const errorContainer = document.getElementById('error-container') || createErrorContainer();

  const errorMessage = `
    <div class="error-alert">
      <h3>🚨 LingoQuest2 Loading Error</h3>
      <p><strong>Failed to load game mode:</strong> ${modeKey}</p>
      <p><strong>Reason:</strong> ${getErrorMessage(error)}</p>
      <button onclick="location.reload()" class="retry-button">🔄 Try Again</button>
      <button onclick="this.parentElement.remove()" class="close-button">✕ Close</button>
    </div>
  `;

  errorContainer.innerHTML = errorMessage;
  errorContainer.style.display = 'block';
}

/**
 * Gets a user-friendly error message
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
function getErrorMessage(error) {
  if (error.message.includes('Failed to fetch')) {
    return 'Network connection issue or file not found';
  }
  if (error.message.includes('404')) {
    return 'Game mode file not found';
  }
  if (error.message.includes('SyntaxError')) {
    return 'Game mode file has syntax errors';
  }
  return error.message || 'Unknown error occurred';
}

/**
 * Attempts to provide a fallback when a mode fails to load
 * @param {string} modeKey - The mode that failed to load
 */
function attemptFallback(modeKey) {
  logEvent('attempting_fallback', { originalMode: modeKey });
  console.log(`🔄 Attempting fallback for failed mode: ${modeKey}`);
}

/**
 * Validates if a mode key is valid
 * @param {string} modeKey - The mode key to validate
 * @returns {boolean} True if valid
 */
export function isValidModeKey(modeKey) {
  const validModes = ['mixlingo', 'echoexpedition', 'wordrelic', 'cinequest', 'hollybolly'];
  return validModes.includes(modeKey);
}

/**
 * Sanitizes a mode key for safe usage
 * @param {string} modeKey - The mode key to sanitize
 * @returns {string} Sanitized mode key
 */
export function sanitizeModeKey(modeKey) {
  return modeKey.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Loads questions safely with fallback
 * @param {Function} loaderFunc - Async loader function
 * @param {string} fallbackMsg - Fallback error message
 * @returns {Array} Loaded questions or []
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
 * Randomly shuffles an array in-place using Fisher-Yates
 * @param {Array} array
 * @returns {Array} shuffled array
 */
export function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



