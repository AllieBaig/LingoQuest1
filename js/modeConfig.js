/* 
1) Purpose: Centralized configuration for all LingoQuest2 game modes.
2) Contains: Metadata like id, emoji, title, i18nKey, folder path, auto activation.
3) Used by: modeLoader.js, menuRenderer.js, settingsPanel, future stats UI.
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-06-03 21:30 | File: js/modeConfig.js
*/

export const gameModes = {
  mixlingo: {
    id: 'btnMixLingo',
    emoji: '🧩',
    title: 'MixLingo',
    i18nKey: 'mixlingo',
    folder: 'mixlingo',
    entry: 'mixlingo.js',
    enabled: false,
    auto: false
  },
  echoexp: {
    id: 'btnEchoExp',
    emoji: '🌌',
    title: 'Echo Expedition',
    i18nKey: 'echoexp',
    folder: 'echoexp',
    entry: 'echo-exp.js',
    enabled: true,
    auto: true
  },
  relic: {
    id: 'btnWordRelic',
    emoji: '🏺',
    title: 'Word Relic',
    i18nKey: 'relic',
    folder: 'relic',
    entry: 'relic.js',
    enabled: false,
    auto: false
  },
  cinequest: {
    id: 'btnCineQuest',
    emoji: '🎬',
    title: 'CineQuest',
    i18nKey: 'cinequest',
    folder: 'cinequest',
    entry: 'cinequest.js',
    enabled: false,
    auto: false
  },
  hollybolly: {
    id: 'btnHollyBolly',
    emoji: '🎞️',
    title: 'HollyBolly',
    i18nKey: 'hollybolly',
    folder: 'hollybolly',
    entry: 'hollybolly.js',
    enabled: true,
    auto: true
  },
  safari: {
    id: 'btnWordSafari',
    emoji: '🦓',
    title: 'Word Safari',
    i18nKey: 'safari',
    folder: 'safari',
    entry: 'safari.js',
    enabled: false,
    auto: false
  },
  dreammap: {
    id: 'btnDreamMap',
    emoji: '🗺️',
    title: 'DreamMap',
    i18nKey: 'dreammap',
    folder: 'dreammap',
    entry: 'dreammap.js',
    enabled: false,
    auto: false
  }
};

