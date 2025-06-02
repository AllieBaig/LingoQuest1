/* 
1) Purpose: Temporarily fallback to static-only loading of all game modes
2) Notes: Disables dynamic `import()` to avoid runtime failures
3) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
4) Timestamp: 2025-06-03 18:55 | File: js/modeLoader.js
*/

import * as mixlingoStatic from './mixlingo/mixlingo.js';
import * as hollybollyStatic from './hollybolly/hollybolly.js';
import * as relicStatic from './relic/relic.js';
//import * as cinequestStatic from './cinequest/cinequest.js';
import * as echoexpStatic from './echoexp/echo-exp.js';

export async function loadMode(modeName) {
  switch (modeName) {
    case 'mixlingo':
      return { start: mixlingoStatic.startMixLingo };

    case 'hollybolly':
      return { start: hollybollyStatic.startHollyBolly };

    case 'relic':
      return { start: relicStatic.startRelic };

  //  case 'cinequest':
    //  return { start: cinequestStatic.startCineQuest };

    case 'echoexp':
      return { start: echoexpStatic.startEchoExpedition };

    default:
      console.warn(`⚠️ Unknown game mode: ${modeName}`);
      return { start: () => {} };
  }
}
