
/*
 * Purpose: Compares two remote GitHub file URLs and highlights line-by-line differences.
 * Features: Side-by-side diff viewer, highlighting insertions, deletions, and changes.
 * Depends on: None (pure DOM/JS based).
 * Related: filediff.html
 * MIT License: https://github.com/AllieBaig/LingoQuest2/blob/main/LICENSE
 * Timestamp: 2025-06-02 23:15 | File: js/filediff.js
 */

const leftTextArea = document.getElementById('leftFile');
const rightTextArea = document.getElementById('rightFile');
const diffOutput = document.getElementById('diffOutput');
const compareBtn = document.getElementById('compareBtn');

compareBtn.addEventListener('click', async () => {
  const leftURL = document.getElementById('url1').value.trim();
  const rightURL = document.getElementById('url2').value.trim();

  try {
    const [leftText, rightText] = await Promise.all([
      fetch(leftURL).then(res => res.text()),
      fetch(rightURL).then(res => res.text())
    ]);

    const leftLines = leftText.split('\n');
    const rightLines = rightText.split('\n');
    const maxLines = Math.max(leftLines.length, rightLines.length);

    let html = '<div class="diff-row-container">';
    for (let i = 0; i < maxLines; i++) {
      const left = leftLines[i] || '';
      const right = rightLines[i] || '';
      const leftEsc = escapeHTML(left);
      const rightEsc = escapeHTML(right);

      let leftClass = '', rightClass = '';
      if (left !== right) {
        leftClass = left && !right ? 'deleted' : 'changed';
        rightClass = right && !left ? 'inserted' : 'changed';
      }

      html += `
        <div class="diff-row">
          <pre class="left ${leftClass}">${leftEsc}</pre>
          <pre class="right ${rightClass}">${rightEsc}</pre>
        </div>
      `;
    }
    html += '</div>';
    diffOutput.innerHTML = html;
  } catch (err) {
    diffOutput.innerHTML = `<div class="error">❌ Failed to fetch files: ${err.message}</div>`;
  }
});

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag]));
}


