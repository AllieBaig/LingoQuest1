

/* 
1) Purpose: Bootstraps LingoQuest1 app on load
2) Features: Loads profile, theme, header/footer, routes to main
3) Dependencies: profileManager.js, themeManager.js, uiHeader.js
4) Related: js/profile/, js/ui/, js/main.js
5) Special: Designed for large-button Minimal UI first
6) MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
7) Timestamp: 2025-06-02 23:59 | File: js/app.js
*/

import { initProfile } from './profileManager.js';
import { applyTheme } from './themeManager.js';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('🚀 Starting LingoQuest1 app initialization...');
    
    // Initialize static imports first
    console.log('📋 Initializing profile...');
    initProfile();
    
    console.log('🎨 Applying theme...');
    applyTheme();
    
    // Test dynamic imports one by one
    console.log('📤 Loading header module...');
    const headerModule = await import('./uiHeader.js');
    const { renderAppHeader } = headerModule;
    
    console.log('📥 Loading footer module...');
    const footerModule = await import('./uiFooter.js');
    const { renderAppFooter } = footerModule;
    
    console.log('🏠 Loading main menu module...');
    const mainModule = await import('./main.js');
    const { showMainMenu } = mainModule;
    
    // Render UI components
    console.log('🔧 Rendering header...');
    renderAppHeader();
    
    console.log('🔧 Rendering footer...');
    renderAppFooter();
    
    console.log('🔧 Showing main menu...');
    showMainMenu();
    
    console.log('✅ LingoQuest1 app initialized successfully!');
    
  } catch (error) {
    console.error('⚠️ App initialization failed:', error);
    console.error('📍 Error message:', error.message);
    console.error('📍 Error stack:', error.stack);

    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h2>⚠️ LingoQuest1 Loading Error</h2>
        <a href="errorLog.html" target="_blank">🪲 View Error Log</a>
        <p>Sorry, there was a problem loading the application.</p>
        <details open style="margin-top: 20px;">
          <summary><strong>Technical Details (for developers)</strong></summary>
          
          <!--
          <pre style="text-align: left; background: #f5f5f5; 
          padding: 10px; margin-top: 10px;">
Error Message:
${error.message}
-->

<pre style="text-align: left; background: #f5f5f5; 
padding: 10px; margin-top: 10px; font-size: 0.95em; line-height: 1.4;">
Error Message: 
${error.message}



File/Location:
js/app.js or dynamic import

Suggested Fix:
Check for missing files

Browser Console:
Open DevTools → Console

Click Below:
<a href="javascript:location.reload()">🔄 Reload Application</a>
          </pre>
        </details>
      </div>
    `;
  }
});
