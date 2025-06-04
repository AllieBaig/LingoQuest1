/* 
1) Function: initializeApp()
2) Purpose: Main entry point for LingoQuest2 app setup
3) Responsibilities: Theme, UI mode, settings, font scaler, game menu
4) Depends on: themeManager.js, uiModeManager.js, fontScaler.js, uiSettingsPanel.js, menuRenderer.js
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-03 23:18 | File: js/app.js
*/

import { applyTheme } from './themeManager.js';
import { applyUIMode } from './uiModeManager.js';
import { renderFontScaler } from './fontScaler.js';
import { renderSettingsPanel } from './uiSettingsPanel.js';
import { renderGameMenu } from './menuRenderer.js';

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  console.log('🚀 Initializing LingoQuest2 App...');

  try {
    applyTheme();                  // 🌗 Theme setup
    applyUIMode();                 // 🖼 UI Mode setup (minimal, ASCII)
    initFontScaler();             // 🔠 Font size scaling
    initSettingsPanel();         // ⚙️ Settings panel
    renderGameMenu();            // 🎮 Game Mode Menu

    console.log('✅ App initialized successfully.');
  } catch (err) {
    console.error('❌ Error during app initialization:', err);
    showGlobalInitError();
  }
}

// Optional global error message display
function showGlobalInitError() {
  const container = document.getElementById('menuArea');
  if (container) {
    container.innerHTML = `
      <div class="error-alert">
        <h3>⚠️ Initialization Failed</h3>
        <p>There was a problem starting the app. Please try refreshing.</p>
      </div>
    `;
  }
}
