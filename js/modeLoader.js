/* 
1) Purpose: Dynamically and statically import game modes with fallback
2) Features: Dual import support, graceful fallback, and error logging
3) Used by: menuRenderer.js, main.js
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-02 23:40 | File: js/modeLoader.js
*/

import * as mixlingoStatic from './modes/mixlingo/mixlingo.js';
import * as echoExpStatic from './modes/echoexp/echo-exp.js';
import * as relicStatic from './modes/relic/relic.js';
//import * as cinequestStatic from './modes/cinequest/cinequest.js';
import * as hollybollyStatic from './modes/hollybolly/hollybolly.js';

import { handleGameLoadError } from './modeHelper.js';

export async function loadMode(modeName, method = 'dynamic') {
  try {
    switch (modeName) {
      case 'mixlingo':
        if (method === 'static') return { start: mixlingoStatic.startMixLingo };
        return {
          start: (await import('./modes/mixlingo/mixlingo.js')).startMixLingo
        };

      case 'echoexp':
        if (method === 'static') return { start: echoExpStatic.startEchoExpedition };
        return {
          start: (await import('./modes/echoexp/echo-exp.js')).startEchoExpedition
        };

      case 'relic':
        if (method === 'static') return { start: relicStatic.startRelic };
        return {
          start: (await import('./modes/relic/relic.js')).startRelic
        };

      case 'cinequest':
        if (method === 'static') return { start: cinequestStatic.startCineQuest };
        return {
          start: (await import('./modes/cinequest/cinequest.js')).startCineQuest
        };

      case 'hollybolly':
        if (method === 'static') return { start: hollybollyStatic.startHollyBolly };
        return {
          start: (await import('./modes/hollybolly/hollybolly.js')).startHollyBolly
        };

      default:
        throw new Error(`Unknown game mode: ${modeName}`);
    }
  } catch (err) {
    console.warn(`⚠️ Dynamic load failed for mode ${modeName}:`, err);
    handleGameLoadError(modeName);

    // 🔁 Attempt static fallback
    return await loadMode(modeName, 'static').catch(staticErr => {
      console.error(`❌ Static fallback failed for mode ${modeName}:`, staticErr);
      return { start: () => {} };
    });
  }
}
