
/*
 * Purpose: Provides reusable UI container for displaying errors.
 * Features: Injects error container DOM node and styles if not already present.
 * Depends on: None (pure DOM injection)
 * Related: Used by modeHelper.js for error fallback display
 * MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
 * Timestamp: 2025-06-02 23:59 | File: js/createErrorContainer.js
 */

export function createErrorContainer() {
  const container = document.createElement('div');
  container.id = 'error-container';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    max-width: 400px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  const style = document.createElement('style');
  style.textContent = `
    .error-alert {
      padding: 20px;
      color: #721c24;
      background: #f8d7da;
      border-radius: 8px;
    }
    .error-alert h3 {
      margin: 0 0 10px 0;
      font-size: 16px;
    }
    .error-alert p {
      margin: 5px 0;
      font-size: 14px;
    }
    .retry-button, .close-button {
      margin: 10px 5px 0 0;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }
    .retry-button {
      background: #007bff;
      color: white;
    }
    .retry-button:hover {
      background: #0056b3;
    }
    .close-button {
      background: #6c757d;
      color: white;
    }
    .close-button:hover {
      background: #545b62;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(container);
  return container;
}


