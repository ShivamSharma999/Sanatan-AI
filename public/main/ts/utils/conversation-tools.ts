import Create from "../lib/create.js";
import { renderChatList } from "../core/app.js";
import { saveChatHistory, saveSessions, setActiveSession, state } from "../core/state.js";
import { convertToHtml, escapeHtml } from "./particles.js";
import { chatBody, showNotification } from "./definitions.js";
import { md, mermaid, renderMath } from "./md-extension.js";

type ExportFormat = "json" | "markdown" | "pdf";

type SearchMatch = {
  element: HTMLElement;
  node: Text;
  start: number;
  length: number;
};

const EXPORT_VERSION = 1;
let searchInput: HTMLInputElement | null = null;
let searchCounter: HTMLElement | null = null;
let searchQuery = "";
let searchMatches: HTMLElement[] = [];
let activeMatchIndex = -1;
let searchRenderTimer: ReturnType<typeof setTimeout> | undefined;

export function initConversationTools() {
  window.exportActiveConversation = exportActiveConversation;
  window.importConversationJson = importConversationJson;
  window.runChatSearch = runChatSearch;
  window.clearChatSearch = clearChatSearch;
  window.moveChatSearch = moveChatSearch;
  window.openChatSearch = openChatSearch;

  searchInput = document.getElementById("chat-search-input") as HTMLInputElement | null;
  searchCounter = document.getElementById("chat-search-counter");

  window.addEventListener("sanatan:chat-rendered", () => {
    if (!searchQuery) return;
    clearTimeout(searchRenderTimer);
    searchRenderTimer = setTimeout(() => runChatSearch(searchQuery, false), 30);
  });
}

export function openChatSearch() {
  const searchBar = document.getElementById("chat-search-bar");
  searchInput = searchInput || (document.getElementById("chat-search-input") as HTMLInputElement | null);
  searchBar?.classList.add("open");
  setTimeout(() => searchInput?.focus(), 0);
}

export async function exportActiveConversation(format: ExportFormat) {
  if (!state.activeSessionId || state.chatHistory.length === 0) {
    showNotification("No messages to export in this chat", "error");
    return;
  }

  const session = getActiveSession();
  const title = safeFileName(session?.title || "Sanatan AI Chat");

  if (format === "json") {
    downloadText(`${title}.json`, "application/json", JSON.stringify(getExportPayload(), null, 2));
    showNotification("Chat exported as JSON", "success");
    return;
  }

  if (format === "markdown") {
    downloadText(`${title}.md`, "text/markdown", buildMarkdownExport());
    showNotification("Chat exported as Markdown", "success");
    return;
  }

  await openPrintableExport();
}

export async function importConversationJson(file?: File) {
  const importFile = file || (document.getElementById("conversation-import-input") as HTMLInputElement | null)?.files?.[0];
  if (!importFile) return;

  try {
    const text = await importFile.text();
    const payload = JSON.parse(text);
    const messages = normalizeImportedMessages(payload);
    const importedTitle = getImportedTitle(payload, messages);
    const id = createImportedSession(importedTitle, messages);

    setActiveSession(id);
    await saveSessions();
    await saveChatHistory();
    renderChatList();
    convertToHtml(state.chatHistory);
    clearChatSearch();
    showNotification("Conversation imported into a new chat", "success");
  } catch (error) {
    console.error("Import failed", error);
    showNotification("Could not import this JSON conversation", "error");
  } finally {
    const input = document.getElementById("conversation-import-input") as HTMLInputElement | null;
    if (input) input.value = "";
  }
}

export function runChatSearch(query?: string, resetIndex = true) {
  searchInput = searchInput || (document.getElementById("chat-search-input") as HTMLInputElement | null);
  searchCounter = searchCounter || document.getElementById("chat-search-counter");

  searchQuery = typeof query === "string" ? query : searchInput?.value || "";
  searchQuery = searchQuery.trim();
  removeSearchHighlights();

  if (!searchQuery) {
    activeMatchIndex = -1;
    searchMatches = [];
    updateSearchCounter();
    return;
  }

  const matches = collectSearchMatches(searchQuery);
  highlightSearchMatches(matches);
  searchMatches = Array.from(chatBody.querySelectorAll(".chat-search-highlight"));
  activeMatchIndex = searchMatches.length === 0 ? -1 : resetIndex ? 0 : clamp(activeMatchIndex, 0, searchMatches.length - 1);
  focusActiveSearchMatch();
}

export function moveChatSearch(direction: number) {
  if (!searchMatches.length) {
    runChatSearch(searchQuery || searchInput?.value || "");
    return;
  }
  activeMatchIndex = (activeMatchIndex + direction + searchMatches.length) % searchMatches.length;
  focusActiveSearchMatch();
}

export function clearChatSearch() {
  searchQuery = "";
  activeMatchIndex = -1;
  searchMatches = [];
  if (searchInput) searchInput.value = "";
  removeSearchHighlights();
  updateSearchCounter();
  document.getElementById("chat-search-bar")?.classList.remove("open");
}

function getExportPayload(): ConversationExportPayload {
  return {
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    session: getActiveSession() || {
      id: state.activeSessionId || Date.now().toString(),
      title: "Sanatan AI Chat",
      timestamp: Date.now()
    },
    messages: state.chatHistory
  };
}

function getExportableMessages(messages: ChatMessage[]) {
  return messages
    .map(message => ({
      ...message,
      parts: message.parts.filter(part => part.text || part.inlineData)
    }))
    .filter(message => message.parts.length > 0);
}

function buildMarkdownExport() {
  const payload = getExportPayload();
  const exportableMessages = getExportableMessages(payload.messages);
  const lines = [
    `# ${payload.session.title || "Sanatan AI Chat"}`,
    "",
    `Exported: ${new Date(payload.exportedAt).toLocaleString()}`,
    ""
  ];

  exportableMessages.forEach((message, index) => {
    const heading = message.role === "user" ? "User" : message.role === "model" ? "Sanatan AI" : message.role;
    lines.push(`## ${heading} ${index + 1}`, "");
    lines.push(messageToPlainText(message) || "_No text content_");
    lines.push("");
  });

  return lines.join("\n");
}

async function openPrintableExport() {
  const payload = getExportPayload();
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    showNotification("Please allow popups to export PDF", "error");
    return;
  }

  const exportableMessages = getExportableMessages(payload.messages);
  const body = await renderPrintableHtml(exportableMessages);
  const katexCssUrl = getExportResourceUrl("./scripts/lib/katex/katex.css");

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(payload.session.title || "Sanatan AI Chat")}</title>
  <link rel="stylesheet" href="${katexCssUrl}" />
  <style>
    @page { margin: 18mm; }
    * { box-sizing: border-box; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    body {
      margin: 0;
      color: #161616;
      background: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 13px;
      line-height: 1.55;
    }
    .export-header {
      padding-bottom: 18px;
      margin-bottom: 22px;
      border-bottom: 2px solid #dedede;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .brand img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #050505;
      padding: 6px;
    }
    h1 {
      margin: 0;
      color: #111827;
      font-size: 26px;
      line-height: 1.2;
    }
    .meta {
      color: #666;
      font-size: 12px;
    }
    .message {
      break-inside: avoid;
      page-break-inside: avoid;
      margin: 0 0 18px;
      padding: 0;
    }
    .message-role {
      margin-bottom: 6px;
      color: #4b5563;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .message-content {
      max-width: 100%;
      padding: 14px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: #f8fafc;
      overflow-wrap: anywhere;
    }
    .user-message .message-content {
      margin-left: auto;
      max-width: 82%;
      color: #ffffff;
      border-color: #d88d1d;
      background: #ffd483;
      border-bottom-right-radius: 4px;
    }
    .model-message .message-content {
      max-width: 92%;
      background: #ffffff;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
    }
    p { margin: 0 0 10px; }
    p:last-child { margin-bottom: 0; }
    h2, h3, h4 {
      margin: 16px 0 8px;
      color: #111827;
      line-height: 1.25;
    }
    h2 { font-size: 20px; }
    h3 { font-size: 17px; }
    h4 { font-size: 15px; }
    ul, ol {
      margin: 8px 0 12px 22px;
      padding: 0;
    }
    li { margin: 4px 0; }
    blockquote {
      margin: 12px 0;
      padding: 10px 14px;
      border-left: 4px solid #f1d063;
      background: #eef2ff;
      color: #812e2e;
    }
    table {
      width: 100%;
      margin: 12px 0;
      border-collapse: collapse;
      font-size: 12px;
    }
    th, td {
      padding: 8px 10px;
      border: 1px solid #d1d5db;
      vertical-align: top;
    }
    th {
      background: #f3f4f6;
      color: #111827;
      font-weight: 700;
    }
    code {
      padding: 2px 5px;
      border-radius: 5px;
      background: #eef2f7;
      color: #111827;
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.92em;
    }
    pre {
      margin: 10px 0;
      padding: 12px;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      background: #111827;
      color: #f9fafb;
      overflow-wrap: anywhere;
      white-space: pre-wrap;
    }
    pre code {
      padding: 0;
      background: transparent;
      color: inherit;
    }
    .code-container {
      margin: 12px 0;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      overflow: hidden;
    }
    .code-header {
      display: flex;
      justify-content: space-between;
      padding: 7px 10px;
      background: #374151;
      color: #f9fafb;
      font-size: 11px;
    }
    .header-right,
    .icon-btn {
      display: none !important;
    }
    .code-content pre {
      margin: 0;
      border: none;
      border-radius: 0;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
    }
    .attachment-placeholder,
    .function-placeholder {
      display: inline-flex;
      margin: 4px 0;
      padding: 7px 10px;
      border-radius: 8px;
      background: #eef2f7;
      color: #374151;
      font-size: 12px;
      font-weight: 600;
    }
    .user-message .attachment-placeholder,
    .user-message .function-placeholder {
      background: rgba(255, 255, 255, 0.18);
      color: #ffffff;
    }
    hr {
      border: 0;
      border-top: 1px solid #e5e7eb;
      margin: 16px 0;
    }
    a {
      color: #1d4ed8;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <header class="export-header">
    <div class="brand">
      <img src="./Resources/images/logo.png" alt="Sanatan AI" />
      <div>
        <h1>${escapeHtml(payload.session.title || "Sanatan AI Chat")}</h1>
        <div class="meta">Exported from Sanatan AI on ${new Date(payload.exportedAt).toLocaleString()}</div>
      </div>
    </div>
  </header>
  ${body}
  <script>window.onload = () => { setTimeout(() => window.print(), 150); };</script>
</body>
</html>`);
  printWindow.document.close();
  showNotification("PDF export opened in print view", "success");
}

function downloadText(fileName: string, type: string, content: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = Create("a", { href: url, download: fileName }) as HTMLAnchorElement;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function normalizeImportedMessages(payload: any): ChatMessage[] {
  const messages = Array.isArray(payload) ? payload : payload?.messages;
  if (!Array.isArray(messages)) throw new Error("Import payload does not contain messages");

  const normalized = messages.map(message => {
    if (!message || typeof message !== "object" || typeof message.role !== "string" || !Array.isArray(message.parts)) {
      throw new Error("Invalid message shape");
    }
    return {
      role: message.role,
      parts: message.parts.map(normalizePart)
    };
  });

  if (normalized.length === 0) throw new Error("Imported conversation is empty");
  return normalized;
}

function normalizePart(part: any): ChatPart {
  if (!part || typeof part !== "object") throw new Error("Invalid message part");
  const normalized: ChatPart = {};
  if (typeof part.text === "string") normalized.text = part.text;
  if (part.inlineData && typeof part.inlineData.mimeType === "string" && typeof part.inlineData.data === "string") {
    normalized.inlineData = { mimeType: part.inlineData.mimeType, data: part.inlineData.data };
  }
  if (part.functionCall && typeof part.functionCall.name === "string") {
    normalized.functionCall = { name: part.functionCall.name, args: part.functionCall.args || {} };
  }
  if (part.functionResponse) normalized.functionResponse = part.functionResponse;
  if (!normalized.text && !normalized.inlineData && !normalized.functionCall && !normalized.functionResponse) {
    throw new Error("Empty message part");
  }
  return normalized;
}

function createImportedSession(title: string, messages: ChatMessage[]) {
  let id = Date.now().toString();
  while (state.chatSessions.some(session => session.id === id)) id = (Number(id) + 1).toString();

  state.chatSessions.unshift({
    id,
    title: trimTitle(title),
    timestamp: Date.now()
  });
  state.chatHistory = messages;
  return id;
}

function getImportedTitle(payload: any, messages: ChatMessage[]) {
  if (payload?.session?.title && typeof payload.session.title === "string") return payload.session.title;
  const firstUserText = messages.find(message => message.role === "user")?.parts.find(part => part.text)?.text;
  return firstUserText || "Imported Chat";
}

function getActiveSession() {
  return state.chatSessions.find(session => session.id === state.activeSessionId);
}

function messageToPlainText(message: ChatMessage) {
  const parts = message.parts.map(part => {
    if (part.text) return part.text;
    if (part.inlineData) return `[Attachment: ${part.inlineData.mimeType}]`;
    if (part.functionCall) return `[Function call: ${part.functionCall.name}]`;
    if (part.functionResponse) return "[Function response]";
    return "";
  });
  return parts.filter(Boolean).join("\n\n").trim();
}

function messageToPrintableHtml(message: ChatMessage) {
  const parts = message.parts.map(part => {
    if (part.text) {
      return md.render(part.text);
    }
    if (part.inlineData) {
      return `<span class="attachment-placeholder">Attachment: ${escapeHtml(part.inlineData.mimeType)}</span>`;
    }
    if (part.functionCall) {
      return `<span class="function-placeholder">Function call: ${escapeHtml(part.functionCall.name)}</span>`;
    }
    if (part.functionResponse) {
      return `<span class="function-placeholder">Function response</span>`;
    }
    return "";
  });

  return parts.filter(Boolean).join("") || "<em>No text content</em>";
}

function getExportResourceUrl(resourcePath: string) {
  try {
    return new URL(resourcePath, window.location.href).href;
  } catch {
    return resourcePath;
  }
}

async function renderPrintableHtml(messages: ChatMessage[]) {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-99999px";
  container.style.top = "0";
  container.style.width = "1px";
  container.style.height = "1px";
  container.style.overflow = "hidden";
  container.style.visibility = "hidden";
  document.body.appendChild(container);

  container.innerHTML = messages.map(message => {
    const role = message.role === "user" ? "User" : message.role === "model" ? "Sanatan AI" : message.role;
    const messageClass = message.role === "user" ? "user-message" : "model-message";
    return `<section class="message ${messageClass}">
      <div class="message-role">${escapeHtml(role)}</div>
      <div class="message-content">${messageToPrintableHtml(message)}</div>
    </section>`;
  }).join("");

  try {
    await mermaid.run({ nodes: Array.from(container.querySelectorAll('.mermaid')) });
  } catch (error) {
    console.error('Mermaid render failed for export', error);
  }

  renderMath(container);
  const html = container.innerHTML;
  container.remove();
  return html;
}

function collectSearchMatches(query: string) {
  const loweredQuery = query.toLowerCase();
  const matches: SearchMatch[] = [];
  const elements = Array.from(chatBody.querySelectorAll(".message-text")) as HTMLElement[];

  elements.forEach(element => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    let node = walker.nextNode() as Text | null;
    while (node) {
      const text = node.textContent || "";
      let from = 0;
      let index = text.toLowerCase().indexOf(loweredQuery, from);
      while (index !== -1) {
        matches.push({ element, node, start: index, length: query.length });
        from = index + query.length;
        index = text.toLowerCase().indexOf(loweredQuery, from);
      }
      node = walker.nextNode() as Text | null;
    }
  });

  return matches;
}

function highlightSearchMatches(matches: SearchMatch[]) {
  const byNode = new Map<Text, SearchMatch[]>();
  matches.forEach(match => {
    const nodeMatches = byNode.get(match.node) || [];
    nodeMatches.push(match);
    byNode.set(match.node, nodeMatches);
  });

  byNode.forEach((nodeMatches, node) => {
    const text = node.textContent || "";
    const fragment = document.createDocumentFragment();
    let cursor = 0;

    nodeMatches.sort((a, b) => a.start - b.start).forEach(match => {
      if (match.start > cursor) fragment.appendChild(document.createTextNode(text.slice(cursor, match.start)));
      const mark = Create("mark.chat-search-highlight", {}, text.slice(match.start, match.start + match.length));
      fragment.appendChild(mark);
      cursor = match.start + match.length;
    });

    if (cursor < text.length) fragment.appendChild(document.createTextNode(text.slice(cursor)));
    node.parentNode?.replaceChild(fragment, node);
  });
}

function removeSearchHighlights() {
  const highlights = Array.from(chatBody.querySelectorAll(".chat-search-highlight"));
  highlights.forEach(highlight => {
    const text = document.createTextNode(highlight.textContent || "");
    highlight.parentNode?.replaceChild(text, highlight);
    text.parentElement?.normalize();
  });
}

function focusActiveSearchMatch() {
  searchMatches.forEach(match => match.classList.remove("active"));
  if (activeMatchIndex >= 0 && searchMatches[activeMatchIndex]) {
    const active = searchMatches[activeMatchIndex];
    active.classList.add("active");
    active.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  updateSearchCounter();
}

function updateSearchCounter() {
  if (!searchCounter) return;
  if (!searchQuery) {
    searchCounter.textContent = "";
  } else if (searchMatches.length === 0) {
    searchCounter.textContent = "0/0";
  } else {
    searchCounter.textContent = `${activeMatchIndex + 1}/${searchMatches.length}`;
  }
}

function safeFileName(name: string) {
  return trimTitle(name).replace(/[\\/:*?"<>|]/g, "-") || "Sanatan AI Chat";
}

function trimTitle(title: string) {
  const cleanTitle = title.trim() || "Imported Chat";
  return cleanTitle.substring(0, 30) + (cleanTitle.length > 30 ? "..." : "");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
