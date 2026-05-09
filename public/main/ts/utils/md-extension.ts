let md;
import markdownit from '../lib/markdown-it.js';
import { hljs } from '../lib/highlight.js';
import renderMathInElement from "../lib/katex/contrib/auto-render.js";

const mermaidjs = window.mermaid;
mermaidjs.initialize({
  startOnLoad: false,
  theme: localStorage.getItem("themeColor") === "light_mode" ? "default" : "dark",
  securityLevel: "loose",
});

if (typeof markdownit !== 'undefined') {
  md = (markdownit as any)({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str, lang) {
      if (lang === 'mermaid') {
        return `<div class="mermaid">${str}</div>`;
      }
      if (!(lang && hljs.getLanguage(lang))) lang = 'html'
      return `<div class="code-container">
        <div class="code-header">
            <div class="header-left">
                <span style="margin-left:6px">${lang ? lang : "Code"}</span>
            </div>
            <div class="header-right">
                <button class="icon-btn copy" onclick="copy(this.parentElement.parentElement.querySelector('pre').textContent)" title="Copy code"></button>
                <button class="icon-btn minimize" onclick="this.parentElement.parentElement.parentElement.classList.toggle('minimized')" title="Expand/Collapse"></button>
            </div>
        </div>
        <div class="code-content" id="code-content-area">
            <pre><code id="language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>
        </div>
    </div>`
    }
  });

  // Geeta Block Plugin
  md.block.ruler.before('fence', 'geetaBlock', function (state, startLine, endLine, silent) {
    const startPos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    if (state.src.slice(startPos, startPos + 3) !== '#$%') return false;

    let nextLine = startLine + 1;
    let found = false;

    for (; nextLine < endLine; nextLine++) {
      const pos = state.bMarks[nextLine] + state.tShift[nextLine];
      if (state.src.slice(pos, pos + 3) === '#$%') {
        found = true;
        break;
      }
    }

    if (!found) return false;

    if (silent) return true;

    const content = state.getLines(startLine, nextLine + 1, state.tShift[startLine], true);
    const rule = /#\$%([^\n]+)\n\*([\s\S]*?)\n\*([\s\S]*?)\n#\$%/;
    const match = rule.exec(content);

    if (match) {
      const token = state.push('geetaBlock', 'div', 0);
      token.info = {
        title: match[1].trim(),
        body: match[2].trim(),
        meaning: match[3].trim()
      };
      state.line = nextLine + 1;
      return true;
    }

    return false;
  });

  md.renderer.rules.geetaBlock = function (tokens, idx) {
    const info = tokens[idx].info;
    const bodyHtml = `<h2>${info.body}</h2>\n<h3>${info.meaning}</h3>\n`;
    return `<div class='gita'>\n<h1>${info.title}</h1>\n${bodyHtml.replace(/\\n/g, '<br>')}</div>`;
  };

  // Canvas Block Plugin
  md.block.ruler.before('fence', 'canvasBlock', function (state, startLine, endLine, silent) {
    const startPos = state.bMarks[startLine] + state.tShift[startLine];
    if (state.src.slice(startPos, startPos + 6) !== '/`/`/`') return false;

    let nextLine = startLine + 1;
    let found = false;
    for (; nextLine < endLine; nextLine++) {
      const pos = state.bMarks[nextLine] + state.tShift[nextLine];
      if (state.src.slice(pos, pos + 6) === '/`/`/`') {
        found = true;
        break;
      }
    }

    if (!found) return false;
    if (silent) return true;

    const content = state.getLines(startLine + 1, nextLine, state.tShift[startLine], true);
    const token = state.push('canvasBlock', 'div', 0);
    token.content = content.trim();
    state.line = nextLine + 1;
    return true;
  });

  md.renderer.rules.canvasBlock = function (tokens, idx) {
    return `<div class='canvas'>${md.render(tokens[idx].content)}</div>`;
  };

  // Button Inline Plugin
  md.inline.ruler.push('buttonBlock', function (state, silent) {
    const start = state.pos;
    const marker = '[!!btn!!]';
    if (state.src.slice(start, start + marker.length) !== marker) return false;

    const endMarker = '[!!btn!!]';
    const contentStart = start + marker.length;
    const middleIndex = state.src.indexOf('][', contentStart);
    if (middleIndex === -1) return false;

    const endIdx = state.src.indexOf(endMarker, middleIndex);
    if (endIdx === -1) return false;

    if (silent) return true;

    const content = state.src.slice(contentStart + 1, endIdx - 1);
    const token = state.push('buttonBlock', 'button', 0);
    token.content = content;

    state.pos = endIdx + endMarker.length;
    return true;
  });

  md.renderer.rules.buttonBlock = function (tokens, idx) {
    const txt = tokens[idx].content;
    return `<button onclick="send('${txt}')">${txt}</button>`;
  };

} else {
  console.error('markdown-it library not found. Cannot load plugins.');
}

document.addEventListener("DOMContentLoaded", function () {
  renderMathInElement(document.body);
  document.querySelector(".loading").remove();
});

export { md, renderMathInElement as renderMath, mermaidjs as mermaid };




