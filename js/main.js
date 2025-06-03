/* 
1) Purpose: Initializes LingoQuest2, renders game menu, and handles mode launching
2) Features: Auto-activates game modes based on error-free load, fallback-safe
3) Functions:
   - initApp()
   - handleModeSelection()
   - testGameModeLoad()
4) Depends on: modeConfig.js, modeLoader.js, menuRenderer.js
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-03 22:30 | File: js/main.js
*/

import { renderGameMenu } from './menuRenderer.js';
import { loadMode } from './modeLoader.js';
import { gameModes, enableGameMode } from './modeConfig.js';
import { logInfo, logError, logEvent } from './eventLogger.js';

document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
  logInfo('🌐 Initializing LingoQuest2 app...');
  await autoActivateGameModes();
  renderGameMenu();
}

async function autoActivateGameModes() {
  const orderedModes = Object.values(gameModes).sort((a, b) => a.order - b.order);
  for (const mode of orderedModes) {
    try {
      const mod = await loadMode(mode.modeKey, true); // testMode = true
      if (typeof mod.start === 'function') {
        enableGameMode(mode.modeKey);
        logInfo(`✅ Activated: ${mode.title}`);
      } else {
        throw new Error('Missing start()');
      }
    } catch (err) {
      logError(`❌ Skipped ${mode.title}`, err);
    }
  }
}

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('button.mode-button');
  if (!btn) return;

  const modeKey = btn.dataset.mode;
  await handleModeSelection(modeKey);
});

async function handleModeSelection(modeKey) {
  try {
    const { loadMode } = await import('./modeLoader.js');
    const mod = await loadMode(modeKey);
    if (mod && typeof mod.start === 'function') {
      mod.start();
    } else {
      throw new Error('Invalid start function');
    }
  } catch (err) {
    logError(`⚠️ Failed to start mode: ${modeKey}`, err);
    const container = document.getElementById('gameArea');
    if (container) {
      container.innerHTML = `<p style="color: red;">⚠️ Failed to load game mode: ${modeKey}</p>`;
    }
  }
}
