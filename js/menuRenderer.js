/* 
1) Function: renderGameMenu()
2) Purpose: Dynamically renders game mode buttons.
3) Depends on: modeConfig.js
4) Features: Only shows active game modes. Auto-activates clean modes.
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-03 23:10 | File: js/menuRenderer.js
*/

import { gameModes } from './modeConfig.js';

export function renderGameMenu(containerId = 'menuArea') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<h2>🎮 Select a Game Mode</h2>';

  const grid = document.createElement('div');
  grid.className = 'menu-grid';

  Object.values(gameModes)
    .filter(mode => mode.active)
    .forEach(({ id, emoji, title, modeKey }) => {
      const btn = document.createElement('button');
      btn.id = id;
      btn.className = 'mode-button';
      btn.innerHTML = `${emoji} ${title}`;
      btn.dataset.mode = modeKey;

      btn.addEventListener('click', async () => {
        console.log(`🟢 Starting ${title}...`);
        const { loadMode } = await import('./modeLoader.js');
        try {
          const mod = await loadMode(modeKey);
          mod.start();
        } catch (err) {
          console.error(`❌ Failed to start ${modeKey}`, err);
        }
      });

      grid.appendChild(btn);
    });

  container.appendChild(grid);
}
