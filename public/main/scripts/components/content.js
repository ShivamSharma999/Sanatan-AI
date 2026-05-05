"use strict";

import tools from "./fnCall.js";
import { giveInfo } from "../core/config.js";
import { getErrorMessage } from "./elements.js";
import { LiveStream, escapeJSON } from "../utils/utils.js";
import { chatBody, showNotification, stopRespond, isMobile } from "../utils/definitions.js";
import { state, storeAIMemory, deleteAIMemory, saveChatHistory } from "../core/state.js";
import { updateSessionTitle } from "../core/chat-actions.js";
import { updateFilePreview } from "../utils/file-preview.js";
import { convertToHtml } from "../utils/particles.js";
import { md, renderMath } from "../utils/md-extension.js";
import Sanatan from "../core/sanatan.js";
import { t } from "../utils/i18n.js";

const FunctionList = {
  push_memory: storeAIMemory,
  delete_memory: deleteAIMemory,
  name: updateSessionTitle,
  open: (u) => window.open(u, '_blank')
};
let googleTools = [{ urlContext: {} }, { googleSearch: {} }]

export async function generateBotResponse(wasError = false) {
  // Reset typing state for this response.
  state.canIEnd = false;
  if (state.TypingInterval) {
    clearInterval(state.TypingInterval);
    state.TypingInterval = undefined;
  }
  state.typingIndex = 0;
  state.progressInterval = "";

  state.userData.files = [];
  updateFilePreview();
  let answer = "",
    i = state.chatHistory.length - (wasError ? 1 : 0);

  const config = {
    systemInstruction: await giveInfo(),
    tools: state.isGoogle ? googleTools : tools,
    thinkingConfig: {
      thinkingBudget: state.isDeepChat ? 24576 : 5612,
      includeThoughts: false,
    },
  };

  const newMessage = state.chatHistory[state.chatHistory.length - 1];

  let cont = {
    role: "model",
    parts: [{ text: `<lord-icon src="icons/loop.json" style="width: 24px; height: 24px;" colors="primary:#ffffff" trigger="loop"></lord-icon>` }]
  };

  wasError ? (state.chatHistory[i] = cont) : state.chatHistory.push(cont);

  const { botCount } = convertToHtml(state.chatHistory),
    e = document.querySelectorAll(".bot-message"),
    elem = e[botCount - 1].querySelector(".message-text");

  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  const url = `/chat`;
  const body = JSON.stringify({
        sessionId: state.activeSessionId,
        newMessage,
        config: { model: "gemini-2.5-flash", ...config },
      })
  if(!state.activeSessionId) return showNotification(t("pleaseSelectChat"), "error")
  try {
    const data = LiveStream(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    let apiResponseText = "";

    for await (let chunk of data) {
      for (const part1 of escapeJSON(chunk)) {
        for (const part of part1.candidates[0]?.content?.parts) {
          
          if (part.functionCall) {
             const result = await handleFunctionCall(part, i, apiResponseText);
             if (result === 'save') return await save();
          } else if (!part.text) {
            continue;
          } else {
            answer += part.text;
            clearInterval(state.TypingInterval);
            stopRespond.style.display = "flex";
            
            if (state.displayOrNot === "0") {
              apiResponseText += part.text;
              
              // Initialize part if needed (though structure suggests single text part usually)
              state.chatHistory[i] = { role: "model", parts: [] };
              
              apiResponseText.length > 2
                ? state.chatHistory[i].parts.push({ text: apiResponseText })
                : "";
                
              writeAnimate(part.text, true, elem, true, false);
            }
            else save();
          }
        }
      }
    }
    await saveChatHistory();
  } catch (error) {
    elem.innerHTML = "";
    elem.appendChild(getErrorMessage());
    // writeAnimate(wrong, false, elem, true, true);
    console.error(error);
  } finally {
    state.canIEnd = true;
    stopRespond.style.display = "none";
  }
}

async function handleFunctionCall(part, index, currentText) {
    let { name, args } = part.functionCall;
    
    // Update current bot message with function call info
    if (name === "name") {
      state.chatHistory[index] = {
        role: "model",
        parts: [{ text: currentText }, { functionCall: part.functionCall }],
      };
    }

    const responsea = FunctionList[name] 
        ? FunctionList[name](args.memory ? args.memory : args.name)
        : { status: "error", message: "Function not found" };

    if (Sanatan.type(responsea) === "object" && responsea.status) {
      if (responsea.status === "success") {
        state.chatHistory[index] = {
          role: "model",
          parts: [{ text: currentText + "\n\n<div class='memory'>Memory has been updated..</div>" }, { functionCall: part.functionCall }],
        };
      }
      else if (Sanatan.type(responsea) === "string") {
        return 'save';
      }
      else {
        state.chatHistory[index] = {
          role: "model",
          parts: [{ text: currentText + "\n\n<div class='memory'>Error Updating memory</div>" }, { functionCall: part.functionCall }]
        };
      }
    }
    
    // Push function response from user perspective
    const responseData = {
      name: name,
      response: {
        result: responsea.data ? { status: "success" } : responsea,
      },
    };
    
    state.chatHistory.push({
      role: "user",
      parts: [
        {
          functionResponse: responseData,
        },
      ],
    });
    
    return 'save';
}

function writeAnimate(tex, isUpdate, element, isMarked = true, isAutoEnd = false) {
  let cd = tex.length < 10 ? 10 : tex.length < 50 ? 5 : tex.length < 100 ? 3 : 2;
    
  if (isUpdate) {
    state.progressInterval += tex;
  } else {
    state.progressInterval = tex;
  }
  let text = state.progressInterval;
  renderMath(element);
  state.TypingInterval = setInterval(function () {
    let isScrolled = false;
    chatBody.scrollTop + chatBody.clientHeight + 10 >= chatBody.scrollHeight ? (isScrolled = true) : "";
    element.innerHTML = isMarked ? md.render(text.slice(0, state.typingIndex) + "|") : text.slice(0, state.typingIndex) + "|";

    isScrolled ? chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "instant" }) : "";

    if (state.typingIndex === text.length && (state.canIEnd || isAutoEnd)) {
      clearInterval(state.TypingInterval);
      state.TypingInterval = undefined;
      element.innerHTML =
        (isMobile
          ? '<img alt="Sanatan Logo" src="./Resources/images/logo.png"/>'
          : "") + (isMarked ? md.render(text) : text);
      renderMath(element);
      state.typingIndex = 0;
      state.progressInterval = "";
      stopRespond.style.display = "none";
    }
    let remainingWords = text.length - state.typingIndex;
    remainingWords > 50 ? (state.typingIndex += 10) : state.typingIndex++;
    if (state.typingIndex > text.length) {
      state.typingIndex = text.length;
    }
  }, cd);
}

window.writeAnimate = writeAnimate;
window.generateBotResponse = generateBotResponse;

async function save() {
  state.canIEnd = true;
  if (state.TypingInterval) {
    clearInterval(state.TypingInterval);
    state.TypingInterval = undefined;
  }
  state.typingIndex = 0;
  state.progressInterval = "";

  convertToHtml(state.chatHistory);
  stopRespond.style.display = "none";
  await saveChatHistory();
}

export async function enhancePrompt() {
  const input = document.getElementById("message");
  const text = input.value;
  if (!text) {
    showNotification(t("pleaseEnterTextToEnhance"), "error");
    return;
  }

  const btn = document.getElementById("enhance-btn");
  const originalIcon = btn.innerHTML;
  btn.innerHTML = `<div style="animation: rotate 1s linear infinite; border-radius: 50%; border: 2px solid var(--text-color); border-top-color: transparent; width: 20px; height: 20px;"></div>`;

  try {
    const requestOptions = {
      model: "gemini-2.5-flash",
      contents: [{
        role: "user",
        parts: [{ text: `Original prompt: "${text}"` }]
      }],
      config: {
        thinkingConfig: {
          includeThoughts: false,
          thinkingBudget: 1024,
        },
        systemInstruction: `Enhance the given prompt to be more clear and effective for an AI assistant. Only provide the enhanced prompt text, nothing else like 'New prompt:', 'Enhanced version', 'Sure,', etc.
        Remember that the AI assistant mentioned above assists about Sanatan Dharma. Do not provide a long lasting prompt, just understand it, think about it, enhance it and answer it.`
      }
    };

    const data = await LiveStream("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestOptions }),
    });

    let enhancedText = "";
    for await (let chunk of data) {
      for (const part1 of escapeJSON(chunk)) {
        const content = part1.candidates[0]?.content?.parts[0]?.text;
        if (content) enhancedText += content;
      }
    }

    if (enhancedText) {
      input.value = enhancedText.trim();
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
    }

  } catch (error) {
    console.error("Error enhancing prompt:", error);
    showNotification(t("failedToEnhancePrompt"), "error");
  } finally {
    btn.innerHTML = originalIcon;
    const menu = document.getElementById("enhance-menu");
    if (menu) menu.style.display = "none";
  }
}
