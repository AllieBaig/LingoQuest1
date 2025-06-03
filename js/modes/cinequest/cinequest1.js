
/* 
1) Purpose: Entry point for CineQuest mode
2) Loads questions, initializes UI, manages game flow
3) Depends on: loader.js, renderer.js, modeHelper.js
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-02 23:45 | File: js/modes/cinequest/cinequest.js
*/

import { loadCineQuestQuestions } from './loader.js';
import { showCineQuestQuestion } from './renderer.js';
import {
  logEvent,
  renderIngameHead,
  renderIngameFoot,
  showUserError
} from '../../js/modeHelper.js';

let cineQuestions = [],
    currentIndex = 0;

export async function startCineQuest() {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return showUserError('Missing game container.');

  gameArea.innerHTML = '';
  gameArea.hidden = false;
  document.getElementById('menuArea').hidden = true;

  renderIngameHead(gameArea);
  renderIngameFoot(gameArea);

  const lang = localStorage.getItem('answerLang') || 'en';
  const decade = localStorage.getItem('cinequest-decade') || 'any';

  cineQuestions = await loadCineQuestQuestions(lang, decade);
  currentIndex = 0;

  logEvent('game_start', { mode: 'CineQuest', total: cineQuestions.length });
  showCineQuestQuestion(cineQuestions[currentIndex], getDifficulty());
}

document.addEventListener('nextQuestion', () => {
  currentIndex++;
  if (currentIndex < cineQuestions.length) {
    showCineQuestQuestion(cineQuestions[currentIndex], getDifficulty());
  } else {
    showUserError('🎉 You completed all movie clues!');
  }
});

function getDifficulty() {
  return localStorage.getItem('game-difficulty') || 'medium';
}
