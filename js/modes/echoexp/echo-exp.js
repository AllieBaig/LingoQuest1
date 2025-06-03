
/* 
1) Purpose: Entry point for Echo Expedition game mode
2) Handles game start, progression, and event binding
3) Depends on: loader.js, renderer.js, modeHelper.js, gameUtils.js
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-02 23:58 | File: js/modes/echoexp/echo-exp.js
*/

import { loadEchoExpLevels } from './loader.js';
import { showEchoPrompt } from './renderer.js';
import {
  logEvent,
  renderIngameHead,
  renderIngameFoot,
  showUserError
} from '../../js/modeHelper.js';

let echoLevels = [],
    currentIndex = 0;

export async function startEchoExpedition() {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return showUserError('Missing game container.');

  gameArea.innerHTML = '';
  gameArea.hidden = false;
  document.getElementById('menuArea').hidden = true;

  renderIngameHead(gameArea);
  renderIngameFoot(gameArea);

  const lang = localStorage.getItem('answerLang') || 'en';
  echoLevels = await loadEchoExpLevels(lang);
  currentIndex = 0;

  logEvent('game_start', { mode: 'EchoExpedition', total: echoLevels.length });
  showEchoPrompt(echoLevels[currentIndex], getDifficulty());
}

document.addEventListener('nextQuestion', () => {
  currentIndex++;
  if (currentIndex < echoLevels.length) {
    showEchoPrompt(echoLevels[currentIndex], getDifficulty());
  } else {
    showUserError('🎉 You’ve completed all Echo Expeditions!');
  }
});

function getDifficulty() {
  return localStorage.getItem('game-difficulty') || 'medium';
}
