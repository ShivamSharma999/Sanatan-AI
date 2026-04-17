import { state, saveChatHistory } from "../core/state.js";
import { showNotification } from "./definitions.js";
import { generateBotResponse } from "../components/content.js";
import { convertToHtml } from "./particles.js";

/**
 * Regenerate AI response for a given message index
 * @param {number} messageIndex - Index of the bot message to regenerate
 */
export async function regenerateResponse(messageIndex) {
  if (messageIndex <= 0 || messageIndex >= state.chatHistory.length + 1) {
    showNotification("Cannot regenerate this message", "error");
    return;
  }

  const userMessageIndex = messageIndex - 1;
  if (state.chatHistory[userMessageIndex].role !== "user") {
    showNotification("Cannot find the original user message", "error");
    return;
  }
  state.chatHistory.splice(userMessageIndex + 1);
  await saveChatHistory();
  convertToHtml(state.chatHistory);
  generateBotResponse();

  showNotification("Regenerating response...", "info");
}

window.regenerateResponse = regenerateResponse;

