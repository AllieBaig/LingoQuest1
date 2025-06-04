

/* 
1) Purpose: Loads game mode scripts dynamically
2) Features: Dynamic + fallback loading, error handling, validation
3) Depends on: modeHandler.js, modeValidator.js
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 23:59 | File: js/modeLoader.js
*/

import { handleGameLoadError } from './modeHandler.js';
import { isValidModeKey, sanitizeModeKey } from './modeValidator.js';

export async function loadMode(modeKey) {
  modeKey = sanitizeModeKey(modeKey);
  if (!isValidModeKey(modeKey)) {
    handleGameLoadError(new Error('Invalid game mode key'), modeKey);
    return { start: () => {} };
  }

  try {
    switch (modeKey) {
      case 'mixlingo':
        return { start: (await import('./modes/mixlingo/mixlingo.js')).startMixLingo };
      case 'hollybolly':
        return { start: (await import('./modes/hollybolly/hollybolly.js')).startHollyBolly };
      case 'relic':
        return { start: (await import('./modes/relic/relic.js')).startRelic };
      case 'echoexp':
        return { start: (await import('./modes/echoexp/echo-exp.js')).startEchoExp };
      case 'cinequest':
        return { start: (await import('./modes/cinequest/cinequest.js')).startCineQuest };
      case 'safari':
        return { start: (await import('./modes/safari/safari.js')).startSafari };
      case 'dreammap':
        return { start: (await import('./modes/dreammap/dreammap.js')).startDreamMap };
      default:
        throw new Error('Mode not supported');
    }
  } catch (err) {
    handleGameLoadError(err, modeKey);
    return { start: () => {} };
  }
}

