/* 
1) Purpose: Renders header with nickname and avatar from profile
2) Features: Uses data-i18n labels and emoji avatar
3) Dependencies: profileManager.js
4) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
5) Timestamp: 2025-05-30 22:00 | File: js/ui/uiHeader.js
*/

import { getUserProfile } from './profileManager.js';
import { renderThemeDropdown } from './themeDropdown.js';

//import { getUserProfile } from './profileManager.js';



export function renderAppHeader() {
  const header = document.getElementById('appHeader');
  if (!header) return;

  //const profile = getProfile() || {};

  const profile = getUserProfile() || {};
  
  const avatar = profile.avatar || '🙂';
  const nickname = profile.nickname || 'Guest';

  header.innerHTML = `
    <div class="header-block">
      <span data-i18n="profile_label">Profile:</span>
      <strong>${avatar} ${nickname}</strong>
    </div>
  `;
}


//renderThemeDropdown();

