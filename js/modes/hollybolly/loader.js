
/* 
1) Purpose: Initializes and loads HollyBolly game mode
2) Functions: startHollyBolly, loadNextQuestion, showCompletion
3) Depends on: questionUtils.js, gameUtils.js, renderer.js
4) Notes: Combines static UI logic with dynamic language-based question loading
5) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
6) Timestamp: 2025-06-03 23:59 | File: js/modes/hollybolly/loader.js
*/

import { safeLoadQuestions, verifyQuestionStructure, shuffleArray } from '../../questionUtils.js';
import { logEvent } from '../../eventLogger.js';

import { renderIngameHead, renderIngameFoot } from '../../gameUtils.js';
import { renderHollyBollyQuestion } from './renderer.js';

export let questionPool = [];
export let answeredIDs = new Set();
export let currentQuestion = null;
export let difficulty = localStorage.getItem('game-difficulty') || 'medium';

/**
 * Starts the HollyBolly game (UI setup, question loading)
 */
export async function startHollyBolly() {
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return console.warn('Game area missing');

  gameArea.innerHTML = '';
  gameArea.hidden = false;
  document.getElementById('menuArea').hidden = true;

  renderIngameHead(gameArea);
  renderIngameFoot(gameArea);

  const lang = localStorage.getItem('answer-language') || 'en';
  const rawQuestions = await loadHollyBollyData(lang);
  questionPool = shuffleArray(rawQuestions);
  answeredIDs.clear();

  logEvent('game_start', {
    mode: 'hollybolly',
    difficulty,
    language: lang,
    totalQuestions: questionPool.length
  });

  createSentenceBuilderArea(gameArea);
  loadNextQuestion();
}

