

/* 
1) Purpose: Handle mode validation, user-friendly error display, and fallbacks
2) Functions: handleGameLoadError, showErrorToUser, attemptFallback, isValidModeKey, sanitizeModeKey
3) Depends on: eventLogger.js
4) Related: Called from modeLoader.js, app.js
5) Notes: Extracted from modeHelper.js to avoid name conflict with errorLogger
6) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
7) Timestamp: 2025-06-03 22:15 | File: js/modeHandler.js
*/

import { logEvent, logError } from './eventLogger.js';
import { createErrorContainer } from './createErrorContainer.js';

// Function: handleGameLoadError
export function handleGameLoadError(error, modeKey) {
  logError(error, `Loading game mode: ${modeKey}`);
  logEvent('game_load_error', {
    mode: modeKey,
    errorMessage: error.message,
    errorType: error.name
  }, 'error');
  showErrorToUser(modeKey, error);
  attemptFallback(modeKey);
}

// Function: showErrorToUser
function showErrorToUser(modeKey, error) {
  const errorContainer =
    document.getElementById('error-container') || createErrorContainer();

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

// Function: getErrorMessage
function getErrorMessage(error) {
  if (error.message.includes('Failed to fetch')) return 'Network connection issue or file not found';
  if (error.message.includes('404')) return 'Game mode file not found';
  if (error.message.includes('SyntaxError')) return 'Game mode file has syntax errors';
  return error.message || 'Unknown error occurred';
}

// Function: attemptFallback
function attemptFallback(modeKey) {
  logEvent('attempting_fallback', { originalMode: modeKey });
  console.log(`🔄 Attempting fallback for failed mode: ${modeKey}`);
  // You can add fallback logic here
}

// Function: isValidModeKey
export function isValidModeKey(modeKey) {
  const validModes = [
    'mixlingo',
    'hollybolly',
    'echoexpedition',
    'wordrelic',
    'dreammap',
    'cinequest',
    'safari'
  ];
  return validModes.includes(modeKey);
}

// Function: sanitizeModeKey
export function sanitizeModeKey(modeKey) {
  return modeKey.toLowerCase().replace(/[^a-z0-9]/g, '');
}


