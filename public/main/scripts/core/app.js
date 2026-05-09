import "../../icons/load.js";
import { t, setLocale } from "../utils/i18n.js";
import { Sanatan } from "./sanatan.js";
import typed from "../lib/typed.js";
import { convertToHtml } from "../utils/particles.js";
import { state, createNewSessionData, loadSessionData, deleteSessionData, saveChatHistory as saveStateHistory, getUser } from "./state.js";
import { updateSessionTitle as updateSessionTitleAction } from "./chat-actions.js";
import { updateFilePreview as updateFilePreviewUi } from "../utils/file-preview.js";
import "../utils/regenerate.js";
import { generateBotResponse } from "../components/content.js";
import { initDom, menuopen, welcomeContainer, steps, $, chatBody, messageInput, enterSelect, languageSelector, synth, userNameDisplay, sendMessage, userProfileImg, nameInput, welcomeNameInput, agreeBtn, finishSetupBtn, fileInput, menuBar, shoW, showAlert, showNotification } from "../utils/definitions.js";
import { showVoiceControls } from "../components/voice-controls.js";
import { initGestures } from "../utils/gestures.js";
import "../components/memory-manager.js";
import { Create } from "../components/elements.js";
import { evListener } from "./config.js";
// Ensure DOM-created UI exists before app logic runs.
initDom();
bootstrap();
function bootstrap() {
    let uAg = navigator.userAgent;
    if (uAg.includes("Android") || uAg.includes("iOS")) {
        $("meta[property='og:image']").content = "https://sanatan-ai.vercel.app/Resources/images/logo.png";
        $("meta[name='icon']").content = "Resources/images/logo.png";
        let icon = $('link[rel="icon"]');
        icon.type = "image/png";
        icon.href = "Resources/images/logo.png";
    }
    wireIndexHtmlEvents();
    evListener("DOMContentLoaded", document, onDomReady);
    initGestures();
    manageOnboarding();
}
function wireIndexHtmlEvents() {
    // Stop responding button
    const stopBtn = $(".stopRespond");
    evListener("click", stopBtn, stopWriting);
    // Settings open
    const profile = $(".profile-section");
    evListener("click", profile, () => {
        shoW("full-screen.settings");
        menuBar.classList.add("makeSmall");
    });
    // Bhagvat Gita button
    const gitaBtn = $('.menuBar button.action');
    evListener("click", gitaBtn, () => {
        window.open("https://shivamsharma999.github.io/gita", "_blank");
    });
}
function onDomReady() {
    typed(t("samplePrompts"));
    init();
    if (state.chatHistory)
        convertToHtml(state.chatHistory);
}
export function createNewSession(reload = true) {
    const newId = createNewSessionData();
    if (reload && newId) {
        loadSession(newId);
    }
}
export function createNewChat() {
    createNewSession(true);
    if (window.innerWidth < 768) {
        menuBar.classList.add('makeSmall');
    }
}
window.createNewChat = createNewChat;
export function showChatListLoader() {
    const listContainer = document.getElementById("chat-list");
    if (listContainer) {
        listContainer.innerHTML = '<div class="center-flex" style="padding: 20px;"><div class="loading-spinner" style="width: 30px; height: 30px; border-width: 3px;"></div></div>';
    }
}
export async function loadSession(id) {
    if (id === state.activeSessionId && state.chatHistory.length > 0 && chatBody.innerHTML !== "")
        return; // Already loaded
    // Show loader
    chatBody.innerHTML = '<div class="center-flex" style="height: 100%; width: 100%;"><div class="loading-spinner"></div></div>';
    if (await loadSessionData(id)) {
        chatBody.innerHTML = "";
        convertToHtml(state.chatHistory);
    }
}
async function deleteSession(event, id) {
    try {
        event.stopPropagation(); // Prevent triggering loadSession
        if (!(await Sanatan.ask("Are you sure you want to delete this chat?")))
            return;
        const newActiveId = await deleteSessionData(id);
        if (newActiveId) {
            await loadSession(newActiveId);
        }
        else {
            // If we didn't switch sessions (active wasn't deleted), just re-render list
            if (state.activeSessionId === id && state.chatSessions.length === 0) {
                createNewSession(true);
            }
        }
    }
    catch (error) {
        console.error("Error deleting session:", error);
    }
}
window.deleteSession = deleteSession;
export function renderChatList() {
    const listContainer = $("#chat-list");
    if (!listContainer)
        return;
    listContainer.innerHTML = "";
    const groups = {
        today: [],
        yesterday: [],
        last7days: [],
        older: []
    };
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = new Date(today - 864 * 10 ** 5).getTime();
    const last7Days = new Date(today - (864 * 10 ** 5) * 7).getTime();
    state.chatSessions.forEach(session => {
        // Ensure timestamp exists, backfill if needed
        if (!session.timestamp)
            session.timestamp = parseInt(session.id);
        if (session.timestamp >= today) {
            groups.today.push(session);
        }
        else if (session.timestamp >= yesterday) {
            groups.yesterday.push(session);
        }
        else if (session.timestamp >= last7Days) {
            groups.last7days.push(session);
        }
        else {
            groups.older.push(session);
        }
    });
    const renderGroup = (title, sessions) => {
        if (sessions.length === 0)
            return;
        // Add Group Header
        const header = Create("div.chat-group-header", {
            style: {
                cssText: "padding: 10px 15px; font-size: 0.8rem; color: var(--subheading-color); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 10px;"
            }
        }, title);
        listContainer.appendChild(header);
        sessions.forEach(session => {
            const span = Create("span.chat-title", {}, session.title), sId = session.id, button = Create("button.delete-chat", {}, '<code class="sanatan-symbol">delete</code>', ["click", (e) => {
                    deleteSession(e, sId);
                }]), div = Create("div.chat-item.center-flex", {}, [span, button], ["click", () => loadSession(session.id)]);
            session.id === state.activeSessionId ? div.classList.add('active') : '';
            listContainer.appendChild(div);
        });
    };
    renderGroup("Today", groups.today);
    renderGroup("Yesterday", groups.yesterday);
    renderGroup("Previous 7 Days", groups.last7days);
    renderGroup("Older", groups.older);
}
export function updateSessionTitle(text) {
    return updateSessionTitleAction(text);
}
// Onboarding Elements
evListener("online", window, Sanatan.checkNetwork);
evListener("offline", window, Sanatan.checkNetwork);
function manageOnboarding() {
    const setupComplete = localStorage.getItem("setupComplete") === "true";
    menuopen.style.opacity = "0";
    Sanatan.checkNetwork(false);
    if (setupComplete) {
        welcomeContainer.classList.add("noneWelcome");
        menuopen.style.opacity = "1";
        getUser();
        loadChatData();
        updateProfileUI();
        return;
    }
    welcomeContainer.classList.remove("noneWelcome");
    const termsAgreed = localStorage.getItem("termsAgreed") === "true";
    const emailVerified = localStorage.getItem("emailVerified") === "true";
    if (emailVerified) {
        showStep("customize-step");
    }
    else if (termsAgreed) {
        showStep("email-step");
    }
    else {
        showStep("terms-step");
    }
}
function loadChatData() {
    const isLightMode = localStorage.getItem("themeColor") === "light_mode";
    const isDarkMode = localStorage.getItem("themeColor") === "dark_mode";
    Sanatan.setMetaTheme(isLightMode ? "#fff" : "#000");
    if (isLightMode || isDarkMode) {
        document.body.classList.toggle("light_mode", isLightMode);
        document.querySelector("#theme-select").value = isLightMode
            ? "light"
            : "dark";
    }
    else {
        detectTheme();
    }
    messageInput.focus();
}
export function showStep(stepId) {
    steps.forEach((step) => {
        step.classList.remove("active-step");
    });
    document.getElementById(stepId)?.classList.add("active-step");
}
evListener("click", agreeBtn, () => {
    localStorage.setItem("termsAgreed", "true");
    showStep("email-step");
});
export function updateProfileUI() {
    const name = localStorage.getItem("Name");
    const picture = localStorage.getItem("Picture");
    if (userNameDisplay)
        userNameDisplay.textContent = name || "Guest";
    if (userProfileImg && picture)
        userProfileImg.src = picture || "Resources/images/logo.png";
    if (nameInput && name)
        nameInput.value = name;
    if (welcomeNameInput && name)
        welcomeNameInput.value = name;
}
evListener("click", finishSetupBtn, () => {
    const name = welcomeNameInput.value.trim();
    if (name) {
        localStorage.setItem("Name", name);
        nameInput.value = name;
    }
    localStorage.setItem("setupComplete", "true");
    manageOnboarding();
});
function handleOutgoingMessage() {
    state.userData.message = messageInput.value || state.userMessage;
    state.userData.message = state.userData.message.sanatantrim;
    if (state.chatHistory.length === 0)
        updateSessionTitle(state.userData.message);
    if (!state.userData.message) {
        showNotification(t("pleaseWriteMessage"), "error");
        return;
    }
    messageInput.value = "";
    inp();
    chatBody.innerHTML = "";
    const contents = [
        {
            text: state.userData.message ? state.userData.message : "",
        },
    ];
    state.userData.files.forEach((file) => {
        contents.push({
            inlineData: {
                mimeType: file.maindata.file.type.replace("application/json", "text/plain"),
                data: file.maindata.content,
            },
        });
    });
    state.chatHistory.push({
        role: "user",
        parts: contents,
    });
    // convertToHtml(state.chatHistory);
    state.chatHistory = [...state.chatHistory];
    fileInput.value = "";
    generateBotResponse();
}
window.handleOutgoingMessage = handleOutgoingMessage;
function stopWriting() {
    state.displayOrNot = "1";
}
window.stopWriting = stopWriting;
evListener("change", $("#theme-select"), function () {
    const theme = this.value;
    if (theme === "light") {
        document.body.classList.add("light_mode");
        localStorage.setItem("themeColor", "light_mode");
    }
    else if (theme === "dark") {
        document.body.classList.remove("light_mode");
        localStorage.setItem("themeColor", "dark_mode");
    }
    else {
        detectTheme();
        localStorage.setItem("themeColor", "auto");
    }
});
evListener("change", languageSelector, function () {
    setLocale(this.value);
    window.location.reload();
});
evListener("change", fileInput, () => {
    const files = Array.from(fileInput.files);
    if (!files || files.length === 0)
        return;
    a(files);
});
export function updateFilePreview() {
    return updateFilePreviewUi();
}
const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/webp", "text/plain", "application/json", "text/javascript", "text/html", "text/css"];
function a(b) {
    if (state.userData.files.length > 4) {
        showNotification(t("fileLimitExceeded"), "error");
        return;
    }
    b.forEach((file) => {
        let isImage = file.type.startsWith("image/");
        if (allowedExtensions.includes(file.type) ||
            file.type.startsWith("text/")) {
            if (!allowedExtensions.includes(file.type))
                file.type = "text/plain";
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                if (typeof result !== "string")
                    return;
                const c = {
                    maindata: {
                        file: file,
                        type: "base64",
                        content: result.split(",")[1],
                    },
                    filename: file.name,
                    isImage: isImage,
                    wholeData: result,
                };
                if (!state.userData.files.some(f => f.filename === c.filename)) {
                    state.userData.files.push(c);
                    updateFilePreview();
                }
            };
            reader.onerror = () => {
                showAlert("Error reading file");
            };
            reader.readAsDataURL(file);
        }
        else {
            showNotification(`File Type: ${file.type} Not Supported`, "error");
        }
    });
}
function changeTheme(isLightMode = document.body.classList.toggle("light_mode"), isAutoMode = $("#theme-select").value === "auto") {
    if (isAutoMode) {
        detectTheme();
    }
    else {
        localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
        $("#theme-select").value = isLightMode ? "light" : "dark";
        Sanatan.setMetaTheme(isLightMode ? '#fff' : '#000');
    }
}
window.changeTheme = changeTheme;
function detectTheme() {
    if (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.remove("light_mode");
        Sanatan.setMetaTheme("#000");
    }
    else {
        document.body.classList.add("light_mode");
        Sanatan.setMetaTheme("#fff");
    }
    $("#theme-select").value = "auto";
}
export async function copyMessage(index, copyButton) {
    const messageText = state.chatHistory[index].parts[0].text || "";
    try {
        await copy(messageText);
        copyButton.innerText = "done";
        showNotification(t("messageCopied"), "success");
        setTimeout(() => (copyButton.innerText = "content_copy"), 1000);
    }
    catch (err) {
        console.error("Copy failed", err);
    }
}
async function copy(text) {
    try {
        await navigator.clipboard.writeText(text);
    }
    catch (err) {
        showAlert(t("failedCopy"));
        throw err;
    }
}
// Back-compat for markdown/codeblock inline handlers.
window.copy = copy;
/**
 * Enables editing of a user message. Only allows editing the text part, not files.
 * @param editButton - The button that was clicked to trigger the edit.
 * @param i - The index of the message in the chat history.
 */
export function edit(editButton, i) {
    const messageDiv = editButton.parentElement.parentElement;
    const messageTextDiv = $(".message-text", messageDiv);
    // Prevent multiple edit modes
    if ($(".edit-input-wrapper"))
        return;
    const currentText = messageTextDiv.innerText;
    const originalDisplay = messageTextDiv.style.display;
    // Hide original text
    messageTextDiv.style.display = "none";
    // Create Edit Wrapper
    const editWrapper = Create("div.col.edit-input-wrapper");
    editWrapper.style.cssText = "width: 100%; gap: 8px;";
    // Input Field
    const textarea = Create("textarea.modern-textarea", {
        style: {
            cssText: "width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--gradient-2); background: rgba(0,0,0,0.2); color: var(--text-color); resize: none; min-height: 60px;"
        }
    }, currentText, [], editWrapper);
    // Controls
    const controls = Create("div.flex", {}, [], [], editWrapper);
    controls.style.cssText = "justify-content: flex-end; gap: 10px;";
    const cancelBtn = Create("button", {}, "Cancel", ["click", () => {
            messageTextDiv.style.display = originalDisplay;
            editWrapper.remove();
        }], controls);
    cancelBtn.style.cssText = "padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: var(--text-color); cursor: pointer;";
    const saveBtn = Create("button.btn-gradient", {}, "Save & Submit", ["click", saveMsg], controls);
    saveBtn.style.cssText = "padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; border: none; cursor: pointer;";
    async function saveMsg() {
        const newText = textarea.value.trim();
        if (!newText)
            return;
        messageTextDiv.style.display = originalDisplay;
        editWrapper.remove();
        state.chatHistory[i].parts[0].text = newText;
        await saveStateHistory();
        convertToHtml(state.chatHistory);
    }
    messageDiv.insertBefore(editWrapper, messageTextDiv.nextSibling);
    textarea.focus();
}
window.speak = function (speakButton) {
    const sText = speakButton.parentElement.parentElement.querySelector(".message-text").textContent;
    voiceControl(sText);
};
async function deleteMessage() {
    state.chatHistory = [];
    messageInput.focus();
    chatBody.innerHTML = "";
    if (state.activeSessionId) {
        await saveStateHistory();
    }
    document.body.classList.remove("hide-suggestion");
}
// Back-compat for settings inline handler (will be wired via JS later).
window.askToDel = function askToDel() {
    Sanatan.ask(t("deleteAllConfirmation")).then(async (response) => {
        if (response)
            await deleteMessage();
    });
};
export async function deleteChat(i) {
    if (state.chatHistory[i].parts[state.chatHistory[i].parts.length - 1].functionCall &&
        state.chatHistory[i + 1] &&
        state.chatHistory[i + 1].parts[0].functionResponse)
        state.chatHistory.splice(i + 1, 1);
    state.chatHistory.splice(i, 1);
    chatBody.innerHTML = "";
    document.body.classList.remove("hide-suggestion");
    convertToHtml(state.chatHistory);
    state.chatHistory = [...state.chatHistory];
    await saveStateHistory();
}
function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = languageSelector.value;
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    u.pitch = 1;
    synth.speak(u);
    showVoiceControls();
}
const inp = () => {
    let isMessage = messageInput.value !== '';
    sendMessage.style.width = sendMessage.style.height = isMessage ? '40px' : '0';
    messageInput.style.height = "auto";
    messageInput.style.height = isMessage ? `${messageInput.scrollHeight}px` : 'auto';
    document.querySelector(".chat-capsule").style.borderRadius =
        !(isMessage) ? "32px" : "15px";
};
evListener("click", $("#file-upload"), () => fileInput.click());
evListener("input,change,blur,focus", messageInput, inp);
evListener("load", window, () => {
    setTimeout(() => {
        const adDiv = document.querySelector('div[style*="position: fixed !important; bottom: 0px !important;"]');
        if (adDiv) {
            adDiv.remove();
        }
        else {
            setTimeout(() => {
                const adDiv = document.querySelector('div[style*="position: fixed !important; bottom: 0px !important;"]');
                if (adDiv) {
                    adDiv.remove();
                }
            }, 2000);
        }
    }, 5000);
});
evListener("change", nameInput, () => {
    localStorage.setItem("Name", nameInput.value);
});
evListener("keydown", document.body, (event) => {
    if (event.key === "Delete" && chatBody.innerHTML !== "" && !event.shiftKey) {
        Sanatan.ask(t("deleteAllConfirmation")).then((response) => {
            if (response) {
                deleteMessage();
            }
        });
    }
});
const changeEnter = () => localStorage.setItem("WhenEnter", enterSelect.value);
window.changeEnter = changeEnter;
export function checkKey(event) {
    if ((event.key === "Enter" && !event.ctrlKey && enterSelect.value === "yes") ||
        (event.key === "Enter" && event.ctrlKey && enterSelect.value === "no")) {
        if (messageInput.value !== "") {
            event.preventDefault();
            handleOutgoingMessage();
        }
    }
    else if (event.key === "Enter" &&
        event.shiftKey &&
        enterSelect.value === "yes") {
    }
}
function startRecognisation(button) {
    const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
        console.log(event);
        messageInput.value = event.results[0][0].transcript;
    };
    recognition.start();
    recognition.onstart = () => {
        button.innerHTML = `<lord-icon src="icons/pause.json" style="width: 24px; height: 24px;" trigger="hover"></lord-icon>`;
    };
    recognition.onend = () => {
        button.innerHTML = `<lord-icon src="icons/mic.json" style="width: 24px; height: 24px;" trigger="hover"></lord-icon>`;
    };
}
window.startRecognisation = startRecognisation;
let isInited = false;
function init() {
    document.querySelectorAll('.sanatan-symbol').forEach(msB => {
        msB.setAttribute("translate", "no");
    });
    document.querySelectorAll('img').forEach(img => {
        img.draggable = false;
    });
    if (!isInited) {
        addProperty(String, 'sanatantrim', function () {
            let text = this.toString();
            while (text.endsWith('\n')) {
                let broken = text.split('\n');
                text = text.endsWith('\n') ? broken.splice(broken.length - 1) && broken.join('\n') : broken.join('\n');
            }
            while (text.startsWith('\n')) {
                let broken = text.split('\n');
                text = text.startsWith('\n') ? broken.splice(0, 1) && broken.join('\n') : broken.join('\n');
            }
            return text;
        });
    }
    if (!window.location.href.includes("localhost")) {
        const cArgs = Object.keys(console);
        delete window.console;
        window.console = {};
        cArgs.forEach(arg => console[arg] = () => { });
    }
    isInited = true;
}
const addProperty = function (to, prop, func) {
    to.prototype.__defineGetter__(prop, func);
};
window.toggleEnhanceMenu = function () {
    const menu = document.getElementById('enhance-menu');
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
    }
};
evListener("click", document, function (event) {
    const menu = document.getElementById('enhance-menu');
    const btn = document.getElementById('enhance-btn');
    if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
        menu.style.display = 'none';
    }
});
function send(text) {
    messageInput.value = text;
    sendMessage.click();
}
// Back-compat for markdown button plugin.
window.send = send;
// Scroll-to-bottom button in popup.
export function scrollC() {
    if (!chatBody)
        return;
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}
export { init };
