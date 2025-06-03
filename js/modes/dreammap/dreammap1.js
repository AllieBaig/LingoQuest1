
/*
1) Purpose: Entry point for DreamMap mode
2) Loads data, renders dreamlike NPAT prompts with MCQs
3) Depends on: loader.js, renderer.js, logic.js, modeHelper.js, gameUtils.js
4) Related files: js/modes/dreammap/loader.js, logic.js, renderer.js
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-02 23:40 | File: js/modes/dreammap/dreammap.js
*/

import { loadDreamMapData } from './loader.js';
import { renderDreamPrompt } from './renderer.js';
import { processDreamAnswer } from './logic.js';
import {
  logEvent,
  renderIngameHead,
  renderIngameFoot,
  showUserError
} from '../../js/modeHelper.js';

let dreamData = [],
    currentIndex = 0;

export async function startDreamMap() {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return showUserError('Missing game container.');

  gameArea.innerHTML = '';
  gameArea.hidden = false;
  document.getElementById('menuArea').hidden = true;

  renderIngameHead(gameArea);
  renderIngameFoot(gameArea);

  try {
    dreamData = await loadDreamMapData();
    currentIndex = 0;
    logEvent('game_start', { mode: 'DreamMap', total: dreamData.length });
    renderDreamPrompt(dreamData[currentIndex]);
  } catch (err) {
    showUserError('Unable to load dream prompts.');
    console.error('DreamMap load error:', err);
  }
}

document.addEventListener('nextQuestion', () => {
  currentIndex++;
  if (currentIndex < dreamData.length) {
    renderDreamPrompt(dreamData[currentIndex]);
  } else {
    showUserError('🌙 You’ve mapped this dream completely!');
  }
});
