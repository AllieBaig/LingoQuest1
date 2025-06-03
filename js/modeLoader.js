/*
1) Purpose: Dynamically load game mode scripts
2) Supports fallback to static imports if dynamic fails
3) Auto-activates error-free modes marked with auto: true
4) Depends on: gameModes from modeConfig.js
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-03 23:44 | File: js/modeLoader.js
*/

import { gameModes } from './modeConfig.js';
import { logError, logInfo, logEvent } from './eventLogger.js';

// Load game mode (dynamic with fallback to static)
export async function loadMode(modeKey) {
  if (!gameModes[modeKey]) {
    throw new Error(`Invalid modeKey: ${modeKey}`);
  }

  try {
    return await import(`./modes/${modeKey}/${modeKey}.js`);
  } catch (err) {
    logError(`❌ Failed to dynamically import ${modeKey}`, err);
    try {
      switch (modeKey) {
        case 'mixlingo':
          return await import('./modes/mixlingo/mixlingo.js');
        case 'hollybolly':
          return await import('./modes/hollybolly/hollybolly.js');
        case 'relic':
          return await import('./modes/relic/relic.js');
        case 'echoexp':
          return await import('./modes/echoexp/echo-exp.js');
        case 'dreammap':
          return await import('./modes/dreammap/dreammap.js');
        case 'safari':
          return await import('./modes/safari/safari.js');
        case 'cinequest':
          return await import('./modes/cinequest/cinequest.js');
        default:
          throw new Error(`No static fallback defined for ${modeKey}`);
      }
    } catch (fallbackErr) {
      logError(`⚠️ Static fallback also failed for ${modeKey}`, fallbackErr);
      throw new Error(`Failed to load game mode: ${modeKey}`);
    }
  }
}

// Preload and auto-activate eligible game modes
export async function preloadAndActivateModes() {
  for (const [key, config] of Object.entries(gameModes)) {
    if (config.auto && !config.active) {
      try {
        const mod = await import(`./modes/${key}/${key}.js`);
        if (mod?.start) {
          config.active = true;
          config.auto = false;
          logInfo(`✅ Auto-activated mode: ${key}`);
        }
      } catch (err) {
        logError(`❌ Could not auto-activate ${key}`, err);
      }
    }
  }
}
