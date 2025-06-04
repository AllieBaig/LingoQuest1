
/* 
1) Purpose: Validate mode keys and sanitize unsafe inputs
2) Functions: isValidModeKey, sanitizeModeKey
3) Depends on: none
4) Related: Used by modeLoader.js, modeHandler.js, app.js
5) Notes: Split from modeHandler.js to isolate validation logic
6) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
7) Timestamp: 2025-06-03 22:20 | File: js/modeValidator.js
*/

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
