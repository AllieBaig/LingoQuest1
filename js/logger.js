
/*
 * Purpose: Shared logging utility for all game modes and core modules
 * Features: Standardized console logging: info, warn, error, debug
 * Usage: import { logInfo, logWarn, logError, logDebug } from './logger.js';
 * MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
 * Timestamp: 2025-06-02 23:45 | File: js/logger.js
 */

export function logInfo(...args) {
  console.log('ℹ️ [INFO]:', ...args);
}

export function logWarn(...args) {
  console.warn('⚠️ [WARN]:', ...args);
}

export function logError(...args) {
  console.error('❌ [ERROR]:', ...args);
}

export function logDebug(...args) {
  if (localStorage.getItem('debug-mode') === 'true') {
    console.debug('🐞 [DEBUG]:', ...args);
  }
}

