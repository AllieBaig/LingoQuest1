
/* 
1) Purpose: Entry point for Word Safari game mode
2) Function: startSafari()
3) Depends on: loader.js, renderer.js, modeHelper.js, gameUtils.js
4) Related Modules: js/modes/safari/loader.js, renderer.js, logic.js
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-02 23:58 | File: js/modes/safari/safari.js
*/

import { loadSafariQuestions } from './loader.js';
import { showSafariQuestion } from './renderer.js';
import {
  logEvent,
  renderIngameHead,
  renderIngameFoot,
  showUserError
} from '../../js/modeHelper.js';

let safariQuestions = [];
let currentIndex = 0;

/**
 * startSafari
 * Main function to initialize and run Safari mode
 */
export async function startSafari() {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return showUserError('Missing game container.');

  gameArea.innerHTML = '';
  gameArea.hidden = false;
  document.getElementById('menuArea').hidden = true;

  renderIngameHead(gameArea);
  renderIngameFoot(gameArea);

  const lang = localStorage.getItem('answerLang') || 'en';

  try {
    safariQuestions = await loadSafariQuestions(lang);
    currentIndex = 0;

    logEvent('game_start', { mode: 'Safari', total: safariQuestions.length });
    showSafariQuestion(safariQuestions[currentIndex], getDifficulty());
  } catch (err) {
    showUserError('Unable to load Safari questions.');
  }
}

document.addEventListener('nextQuestion', () => {
  currentIndex++;
  if (currentIndex < safariQuestions.length) {
    showSafariQuestion(safariQuestions[currentIndex], getDifficulty());
  } else {
    showUserError('🏁 Safari complete!');
  }
});

/**
 * getDifficulty
 * @returns {string} current difficulty from localStorage
 */
function getDifficulty() {
  return localStorage.getItem('game-difficulty') || 'medium';
}
