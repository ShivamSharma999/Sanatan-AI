import { convertToHtml } from "../utils/particles.js";
import {createNewSession, loadSession, renderChatList, showChatListLoader} from "./app.js";
import { t } from "../utils/i18n.js";

export const state = {
    activeSessionId: localStorage.getItem("sanatan_active_session"),
    typingIndex: 0,
    displayOrNot: "0",
    isDeepChat: false,
    progressInterval: "",
    userMessage: undefined,
    TypingInterval: undefined,
    isGoogle: false,
    LastHeight: 0,
    allowedExtensions: "",
    userData: { message: null, files: [] },
    canIEnd: false,
    userName: localStorage.getItem("Email") || null,
    aiMemory: [],
    chatSessions: [],
};
window.state = state;
let _chatHistory = [];
Object.defineProperty(state, 'chatHistory', {
    get() { return _chatHistory; },
    set(val) { 
        _chatHistory = val;
    }
});

export async function getUser() {
    if(!state.userName && !localStorage.getItem("Email")) return initApp()
    else if (!state.userName && localStorage.getItem("Email")) state.userName = localStorage.getItem("Email");

    showChatListLoader(); // Show loader before fetching
    const res = await fetch(`/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: state.userName })
    });

    if(res.ok) {
        const data = await res.json();
        state.aiMemory = data.aiMemory;
        state.chatSessions = data.chatSessions;
        if(!state.activeSessionId) state.activeSessionId = state.chatSessions[0].id;
        await  loadSessionData(state.activeSessionId);
        await loadSession(state.activeSessionId);
    }
    initApp();
}


async function initApp() {
    if (state.chatSessions.length === 0) {
        createNewSession(false);
    } else if (!state.activeSessionId) {
        await loadSession(state.chatSessions[0].id);
    } else {
        // If active session exists but history not loaded, load it
        if (state.chatHistory.length === 0) {
            if (state.activeSessionId) await loadSession(state.activeSessionId);
        }
    }
}

export async function saveChatHistory() {
    if (!state.activeSessionId || !state.userName) return;
        try {
            await fetch(`/chat/history/${state.activeSessionId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ history: state.chatHistory }),
            });
            convertToHtml(state.chatHistory);
        } catch (e) {
            console.warn("Failed to save chat history to server", e);
            localStorage.setItem("sanatan_chat_" + state.activeSessionId, JSON.stringify(state.chatHistory));
        }
}

export async function saveAIMemory() {
    try {
        await fetch(`/memory`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ memory: state.aiMemory, username: state.userName })
        });
    } catch (e) {
        console.warn("Failed to sync memory with server");
    }
}

// Session Management Functions

export async function saveSessions() {
    if (!state.userName) {
        console.warn("Cannot save sessions: user not logged in");
        return;
    }
    try {
        await fetch(`/user/sessions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessions: state.chatSessions, user: state.userName })
        });
    } catch (e) {
        console.error("Failed to save sessions:", e);
    }
}

export function setActiveSession(id) {
    state.activeSessionId = id;
    localStorage.setItem("sanatan_active_session", id);
}

export function createNewSessionData() {
    const id = Date.now().toString();
    const newSession = { id, title: t("newChat"), timestamp: Date.now() };
    
    // Prevent duplicates (unlikely with timestamp id but good practice)
    if (state.chatSessions.some(s => s.id === id)) return state.activeSessionId;

    state.chatSessions.unshift(newSession);
    saveSessions();
    setActiveSession(id);
    state.chatHistory = [];
    saveChatHistory();
    
    return id;
}

export async function loadSessionData(id) {
    if (!id) return false;
    setActiveSession(id);
    renderChatList();
        try {
            const res = await fetch(`/chat/history/${id}`);
            if (res.ok) {
                const data = await res.json();
                state.chatHistory = Array.isArray(data) ? data : [];
                return true;
            }
        } catch (e) {
            console.warn("Failed to load chat history from server", e);
        }
    return true;
}

function all() {
    saveSessions();
    saveChatHistory();
    saveAIMemory();
    return null
}

export async function deleteSessionData(id) {
    state.chatSessions = state.chatSessions.filter(s => s.id !== id);
    saveSessions();
        try {
            await fetch(`/chat/history/${id}`, { method: "DELETE" });
        } catch (e) {
            console.warn("Failed to delete chat history on server", e);
    }

    if (state.activeSessionId === id) {
        if (state.chatSessions.length > 0) {
            return await loadSessionData(state.chatSessions[0].id);
        } else {
            return createNewSessionData(); // Returns new ID
        }
    }
    return all(); // Active session didn't change
}

export function updateSessionTitleData(text) {
    if (!text || !state.activeSessionId) return t("newChat");
    const session = state.chatSessions.find(s => s.id === state.activeSessionId);
    if (session) {
        session.title = text.substring(0, 30) + (text.length > 30 ? "..." : "");
        saveSessions();
        return session.title;
    }
    return t("newChat");
}

export function storeAIMemory(data) {
  const str = data.trim().toLowerCase();
  if (!state.aiMemory.includes(str)) state.aiMemory.push(str);

  if (state.aiMemory.length > 50) {
    state.aiMemory.shift();
  }
  saveAIMemory();
  return { status: "success" };
}

export function deleteAIMemory(memory) {
  const index = state.aiMemory.indexOf(memory.trim().toLowerCase());
  if (index !== -1) {
    console.log("Deleting Memory: ", state.aiMemory[index]);
    state.aiMemory.splice(index, 1);
    saveAIMemory();
    return { status: "success" };
  } 
  return { status: "failed" };
}

