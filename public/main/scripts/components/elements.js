"use strict"
import { checkKey, createNewChat, scrollC } from "../core/app.js";
import Create from "../lib/create.js";
import { closE } from "../utils/definitions.js";
import { enhancePrompt } from "./content.js";

/**
 * 
 * @returns { [HTMLDivElement, HTMLDivElement, HTMLTextAreaElement, HTMLButtonElement, HTMLInputElement, HTMLDivElement, HTMLButtonElement, HTMLButtonElement] }
 */
export function getPopup() {
    if (document.querySelector('div.chatbot-popup')) return
    const h3 = Create("h3", {}, `Hello! ${localStorage.getItem('Name') || "User"}`),
        h2 = Create("h2.logoTxt.animated-gradient-text.fast-transition", {}, "What should I tell you about?"),
        home = Create("div.home", {}, [h3, h2]),
        newChat = Create("button.new-chat-btn.center-flex", {}, [Create("span", {}, "New Chat"), Create("code.sanatan-symbol", {}, "edit_square")]);

    newChat.onclick = createNewChat;
    // --- Chat Body ---
    const chatBody = Create("div.chat-body.col");

    // Row 1: File Preview
    const filePreview = Create("div.file-preview-mini");

    // Row 2: Input and Controls
    const messageInput = Create("textarea.message-input.capsule-input", {
        id: "message", name: "message", spellcheck: "false", required: "true", placeholder: "Ask generic logic..."
    }, "", ["keydown", checkKey]);


    // AI Tools Button
    const enhanceBtn = Create("button.capsule-action-btn", { type: "button", id: "enhance-btn", "data-label": "AI Tools" }, [
        Create("lord-icon", { src: "icons/magic.json", trigger: "hover", target: "#enhance-btn", style: "width: 20px; height: 20px;" })
    ], ["click", () => window.toggleEnhanceMenu ? window.toggleEnhanceMenu() : null]);

    // Enhance Menu
    const enhanceMenuItem = Create("button.menu-item", {}, [
        Create("span.sanatan-symbol", {}, "auto_fix_high"),
        " Enhance Prompt"
    ], ["click", () => enhancePrompt()]);
    const enhanceMenu = Create("div.glass-dark.popover-menu", { id: "enhance-menu", style: "display: none" }, [enhanceMenuItem]);

    // File Upload
    const fileInput = Create("input", { type: "file", value: "", id: "file-input", hidden: "true" });
    const fileUploadBtn = Create("button.capsule-action-btn", { type: "button", id: "file-upload", "data-label": "Upload File" }, [
        Create("lord-icon", { src: "icons/file.json", trigger: "hover", target: "#file-upload", style: "width: 20px; height: 20px;" })
    ]);

    // Deep Think
    const deepThinkBtn = Create("button.deepThink.sanatan-symbol.capsule-action-btn", { id: "deep-think-btn", "data-label": "Deep Think" }, "neurology");

    // Search
    const googleBtn = Create("button.img.capsule-action-btn", { "data-label": "Search", id: "Google-Btn" }, [
        Create("lord-icon", { src: "icons/google.json", target: "#Google-Btn", stroke: "bold", trigger: "hover", style: "width: 20px; height: 20px;" })
    ]);

    // Voice
    const voiceBtn = Create("button.capsule-action-btn", { type: "button", id: "voice-input", "data-label": "Voice" }, [
        Create("lord-icon", { trigger: "hover", target: "#voice-input", stroke: "bold", style: "width: 20px; height: 20px;", src: "icons/mic.json" })
    ], ["click", function () { window.startRecognisation ? window.startRecognisation(this) : null; }]);

    // Send Button
    const sendMessage = Create("button.send-btn-capsule", { id: "send-message", "data-label": "Send" }, [
        Create("lord-icon", { trigger: "hover", stroke: "bold", colors: "primary:#ffffff", style: "width: 20px; height: 20px;", src: "icons/arrow.json" })
    ], ["click", () => window.handleOutgoingMessage ? window.handleOutgoingMessage() : null]);

    const capsuleControls = Create("div.capsule-controls", {}, [enhanceBtn, enhanceMenu, fileInput, fileUploadBtn, deepThinkBtn, googleBtn, voiceBtn, sendMessage]);
    const capsuleContent = Create("div.capsule-content", {}, [messageInput, capsuleControls]);
    const chatCapsule = Create("div.chat-capsule.glass-panel", {}, [filePreview, capsuleContent]);
    const chatFooter = Create("div.chat-footer.center-flex", {}, [chatCapsule]);

    // --- About Button ---
    const aboutBtn = Create("button.about.center-flex", {}, [
        Create("code.sanatan-symbol", {}, "info"),
        Create("span", {}, "Responses are powered by <b>Google Gemini</b>, AI Can make mistakes, so please double-check the responses")
    ]);

    // --- Scroll Button ---
    const scrollBtn = document.createElement("scroll-button");
    scrollBtn.onclick = scrollC; // Custom element property, keeping as is
    scrollBtn.appendChild(Create("lord-icon", { src: "icons/down.json", target: "scroll-button", style: "width: 24px; height: 24px;", colors: "primary:#ffffff", trigger: "hover" }));

    const popup = Create("div.chatbot-popup", {}, [newChat, home, chatBody, Create("br"), chatFooter, aboutBtn, scrollBtn]);
    document.body.insertBefore(popup, document.body.firstChild);
    return [popup, chatBody, messageInput, sendMessage, fileInput, filePreview, deepThinkBtn, googleBtn];
}


function getSettings() {
    if (document.querySelector("full-screen.settings")) return
    // --- Header ---
    const h2 = Create("h2.text-gradient", {}, [
        Create("code.sanatan-symbol", {}, "settings"),
        Create("span", {}, " Settings")
    ]);

    const closeBtn = Create("button.close-btn", { id: "close-settings", type: "button" }, "✕", ["click", () => closE('full-screen.settings')]);

    const header = Create("div.settings-header", {}, [h2, closeBtn]);

    // Name Input
    const nameLabel = Create("label", { for: "name" }, [
        Create("span", {}, [Create("lord-icon", { src: "icons/avatar.json", target: ".name-input", trigger: "hover" })]),
        Create("code", {}, " Name: ")
    ]);
    const nameInput = Create("input.modern-input", { type: "text", id: "name", value: "user", autocomplete: "true" });
    const nameItem = Create("div.setting-item.name-input.neomorphic", {}, [nameLabel, nameInput]);

    // Theme Select
    const themeLabel = Create("label", { for: "theme-select" }, [
        Create("span.sanatan-symbol.rotate", {}, "light_mode"),
        Create("code", {}, " Theme: ")
    ]);

    const themeOpts = ["auto", "light", "dark"].map(val => {
        const opt = Create("option", { value: val }, val === "auto" ? "auto" : (val.charAt(0).toUpperCase() + val.slice(1)));
        return opt;
    });
    const themeSelect = Create("select.modern-select", { id: "theme-select" }, themeOpts);
    const themeItem = Create("div.setting-item.neomorphic", {}, [themeLabel, themeSelect]);

    // Language Select
    const langLabel = Create("label", { for: "languageSelector" }, [
        Create("span.sanatan-symbol.rotate", {}, "language"),
        Create("code", {}, " Language: ")
    ]);

    const langOpts = [
        { val: "English", text: "English", selected: true },
        { val: "Hindi", text: "हिन्दी (Hindi)" }
    ].map(optData => {
        const opt = Create("option", { value: optData.val, ...(optData.selected ? { selected: "true" } : {}) }, optData.text);
        return opt;
    });
    const langSelect = Create("select.modern-select", { id: "languageSelector" }, langOpts);
    const langItem = Create("div.setting-item.neomorphic", {}, [langLabel, langSelect]);

    // Delete Button
    const delBtn = Create("button.center-flex.btn-gradient", { title: "Delete All Messages", id: "close-chatbot" }, [
        Create("code", {}, [Create("lord-icon", { src: "icons/trash.json", target: "#close-chatbot", trigger: "hover" })]),
        Create("span", {}, "Delete All Messages")
    ], ["click", () => window.askToDel ? window.askToDel() : null]);
    const delItem = Create("div.setting-item.neomorphic", {}, [delBtn]);

    // Advanced Settings
    const advLabel = Create("label.label.text-gradient", { for: "showMore" }, "Advanced Settings");
    const advCheckbox = Create("input", { type: "checkbox", name: "show More", id: "showMore" });

    const enterLabel = Create("label.", { for: "Enter-select" }, [Create("code", {}, "On Press Enter: ")]);

    const enterOpts = [
        { val: "yes", text: "Send Message" },
        { val: "no", text: "Go to Next Line" }
    ].map(optData => Create("option", { value: optData.val }, optData.text));
    const enterSelect = Create("select.modern-select#Enter-select", {}, enterOpts, ["change", window.changeEnter]);

    const advContent = Create("div.setting-item.notShow.neomorphic", {}, [Create("br"), enterLabel, enterSelect]);
    const advancedDiv = Create("div", {}, [advLabel, advCheckbox, advContent]);

    // Memory Manager Button
    const memBtn = Create("button.btn-gradient", { style: "width: 100%;" }, "Manage AI Memory", ["click", () => {
        closE('full-screen.settings');
        if (window.showMemoryManager) window.showMemoryManager();
    }]);
    const memoryBtnComp = Create("div.setting-item.neomorphic", {}, [memBtn]);

    const body = Create("div.settings-body", {}, [nameItem, themeItem, langItem, delItem, memoryBtnComp, advancedDiv]);
    const settingsPopup = Create("div.glass-dark", { id: "settings-popup" }, [header, body]);
    const fullScreen = Create("full-screen.settings", {}, [settingsPopup]);

    document.body.appendChild(fullScreen);

    return [nameInput, enterSelect, langSelect, settingsPopup]
}

export function getErrorMessage() {
    const regBtn = Create("button.btn-gradient", {}, "Regenerate response?  ", ["click", () => window.generateBotResponse ? window.generateBotResponse(true) : null]);

    const content = Create("div.error-content", {}, [
        Create("h3", {}, "Sorry, Something went wrong"),
        Create("br"),
        regBtn,
        Create("br"),
        Create("br")
    ]);

    const div = Create("div.error-message.glass-dark", {}, [
        Create("div.error-icon", {}, [Create("span.sanatan-symbol", {}, "error")]),
        content
    ]);
    return div;
}

export { getSettings, Create };

window.Create = Create;