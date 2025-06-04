

/* 
1) Purpose: Utilities for safely loading and validating question sets
2) Functions: safeLoadQuestions
3) Depends on: eventLogger.js, modeHandler.js
4) Related: Used by all game mode loader.js scripts
5) Notes: Helps centralize question validation and fallback handling
6) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
7) Timestamp: 2025-06-03 22:25 | File: js/questionUtils.js
*/

import { logError } from './eventLogger.js';
import { showErrorToUser } from './modeHandler.js';

// Function: safeLoadQuestions
export async function safeLoadQuestions(loaderFunc, fallbackMsg = '❌ Failed to load questions.') {
  try {
    const result = await loaderFunc();
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error('Empty or invalid question set');
    }
    return result;
  } catch (err) {
    logError(fallbackMsg, err);
    showErrorToUser(fallbackMsg);
    return [];
  }
}



/**
 * Shuffles array in-place
 */
export function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


/**
 * Verifies required question fields
 */
export function verifyQuestionStructure(question, requiredFields = ['id', 'sentence', 'correct', 'options']) {
  if (typeof question !== 'object' || !question) return false;
  return requiredFields.every(field => field in question);
}




  
