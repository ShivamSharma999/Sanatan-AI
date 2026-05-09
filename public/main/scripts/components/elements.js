"use strict";
import LordIcon from "../../icons/load.js";
import { checkKey, createNewChat, scrollC } from "../core/app.js";
import Create from "../lib/create.js";
import { closE } from "../utils/definitions.js";
import { enhancePrompt } from "./content.js";
import { t, localeLabels } from "../utils/i18n.js";
export function getPopup() {
    if (document.querySelector('div.chatbot-popup'))
        return;
    const userName = localStorage.getItem('Name') || t('guestName');
    const h3 = Create("h3", {}, `${t('greetingHello')} ${userName}`), h2 = Create("h2.logoTxt.animated-gradient-text.fast-transition", {}, t("searchExplore")), wrapper = Create("div.imgWrapper"), home = Create("div.home", {}, [wrapper, h3, h2]);
    Create("img", {
        src: "/Resources/images/logo.png",
    }, [], [], wrapper);
    const closeOptionsMenu = () => document.getElementById("chat-options-menu")?.classList.remove("show");
    const runMenuAction = (action) => {
        closeOptionsMenu();
        action();
    };
    const searchMenuItem = Create("button.chat-options-item", {}, [
        Create("span.sanatan-symbol", {}, "search"),
        Create("span", {}, "Search in chat")
    ], ["click", () => runMenuAction(() => window.openChatSearch ? window.openChatSearch() : null)]);
    const newChatMenuItem = Create("button.chat-options-item", {}, [
        Create("span.sanatan-symbol", {}, "edit_square"),
        Create("span", {}, "New chat")
    ], ["click", () => runMenuAction(createNewChat)]);
    const exportMenuItem = Create("button.chat-options-item", {}, [
        Create("span.sanatan-symbol", {}, "download"),
        Create("span", {}, "Export chat")
    ]);
    const exportFormats = Create("div.chat-export-formats", {}, [
        Create("button", { type: "button" }, "PDF", ["click", () => runMenuAction(() => window.exportActiveConversation ? window.exportActiveConversation("pdf") : null)]),
        Create("button", { type: "button" }, "MD", ["click", () => runMenuAction(() => window.exportActiveConversation ? window.exportActiveConversation("markdown") : null)]),
        Create("button", { type: "button" }, "JSON", ["click", () => runMenuAction(() => window.exportActiveConversation ? window.exportActiveConversation("json") : null)])
    ]);
    const exportGroup = Create("div.chat-options-export", {}, [exportMenuItem, exportFormats]);
    const deleteMenuItem = Create("button.chat-options-item.danger", {}, [
        Create("span.sanatan-symbol", {}, "delete"),
        Create("span", {}, "Delete chat")
    ], ["click", () => runMenuAction(() => {
            if (window.deleteSession && window.state.activeSessionId)
                window.deleteSession(new Event("click"), window.state.activeSessionId);
        })]);
    const optionsMenu = Create("div.chat-options-menu.glass-dark", { id: "chat-options-menu" }, [searchMenuItem, newChatMenuItem, exportGroup, deleteMenuItem], ["click", (event) => event.stopPropagation()]);
    const optionsBtn = Create("button.chat-options-btn.sanatan-symbol", { type: "button", id: "chat-options-btn" }, "more_vert", ["click", (event) => {
            event.stopPropagation();
            optionsMenu.classList.toggle("show");
        }]);
    document.addEventListener("click", closeOptionsMenu);
    // --- Chat Body ---
    const searchInput = Create("input.chat-search-input", {
        id: "chat-search-input",
        type: "search",
        placeholder: "Search this chat",
        autocomplete: "off"
    }, "", ["input", function () { window.runChatSearch ? window.runChatSearch(this.value) : null; }]);
    const searchPrev = Create("button.chat-search-btn.sanatan-symbol", { type: "button", "data-label": "Previous match" }, "keyboard_arrow_up", ["click", () => window.moveChatSearch ? window.moveChatSearch(-1) : null]);
    const searchNext = Create("button.chat-search-btn.sanatan-symbol", { type: "button", "data-label": "Next match" }, "keyboard_arrow_down", ["click", () => window.moveChatSearch ? window.moveChatSearch(1) : null]);
    const searchClear = Create("button.chat-search-btn.sanatan-symbol", { type: "button", "data-label": "Clear search" }, "close", ["click", () => window.clearChatSearch ? window.clearChatSearch() : null]);
    const searchCounter = Create("span.chat-search-counter", { id: "chat-search-counter", "aria-live": "polite" });
    const searchBar = Create("div.chat-search-bar.glass-panel", { id: "chat-search-bar" }, [searchInput, searchCounter, searchPrev, searchNext, searchClear]);
    const chatBody = Create("div.chat-body.col");
    // Row 1: File Preview
    const filePreview = Create("div.file-preview-mini");
    // Row 2: Input and Controls
    const messageInput = Create("textarea.message-input.capsule-input", {
        id: "message", name: "message", spellcheck: "false", required: "true", placeholder: t("messagePlaceholder")
    }, "", ["keydown", checkKey]);
    // AI Tools Button
    const enhanceBtn = Create("button.capsule-action-btn", { type: "button", id: "enhance-btn", "data-label": t("aiTools") }, [
        Create("lord-icon", { src: "icons/magic.json", trigger: "hover", target: "#enhance-btn", style: "width: 20px; height: 20px;" })
    ], ["click", () => window.toggleEnhanceMenu ? window.toggleEnhanceMenu() : null]);
    // Enhance Menu
    const enhanceMenuItem = Create("button.menu-item", {}, [
        Create("span.sanatan-symbol", {}, "auto_fix_high"),
        Create("span", { "data-i18n": "enhancePrompt" }, t("enhancePrompt"))
    ], ["click", () => enhancePrompt()]);
    const enhanceMenu = Create("div.glass-dark.popover-menu", { id: "enhance-menu", style: "display: none" }, [enhanceMenuItem]);
    // File Upload
    const fileInput = Create("input", { type: "file", value: "", id: "file-input", hidden: "true" });
    const fileUploadBtn = Create("button.capsule-action-btn", { type: "button", id: "file-upload", "data-label": t("uploadFile") }, [
        Create("lord-icon", { src: "icons/file.json", trigger: "hover", target: "#file-upload", style: "width: 20px; height: 20px;" })
    ]);
    // Deep Think
    const deepThinkBtn = Create("button.deepThink.capsule-action-btn", { id: "deep-think-btn", "data-label": t("deepThink") }, LordIcon({ src: "icons/brain.json", stroke: 3, trigger: "hover", target: "#deep-think-btn", style: "width: 24px; height: 24px;" }));
    // Search
    const googleBtn = Create("button.img.capsule-action-btn", { "data-label": t("search"), id: "Google-Btn" }, [
        Create("lord-icon", { src: "icons/google.json", target: "#Google-Btn", stroke: "bold", trigger: "hover", style: "width: 20px; height: 20px;" })
    ]);
    // Voice
    const voiceBtn = Create("button.capsule-action-btn", { type: "button", id: "voice-input", "data-label": t("voice") }, [
        Create("lord-icon", { trigger: "hover", target: "#voice-input", stroke: "bold", style: "width: 20px; height: 20px;", src: "icons/mic.json" })
    ], ["click", function () { window.startRecognisation ? window.startRecognisation(this) : null; }]);
    // Send Button
    const sendMessage = Create("button.send-btn-capsule", { id: "send-message", "data-label": t("send") }, [
        Create("lord-icon", { trigger: "hover", stroke: "bold", colors: "primary:#ffffff", style: "width: 20px; height: 20px;", src: "icons/plane.json" })
    ], ["click", () => window.handleOutgoingMessage ? window.handleOutgoingMessage() : null]);
    const capsuleControls = Create("div.capsule-controls", {}, [enhanceBtn, enhanceMenu, fileInput, fileUploadBtn, deepThinkBtn, googleBtn, voiceBtn, sendMessage]);
    const capsuleContent = Create("div.capsule-content", {}, [messageInput, capsuleControls]);
    const chatCapsule = Create("div.chat-capsule.glass-panel", {}, [filePreview, capsuleContent]);
    const chatFooter = Create("div.chat-footer.center-flex", {}, [chatCapsule]);
    // --- About Button ---
    const aboutBtn = Create("button.about.center-flex", {}, [
        Create("code.sanatan-symbol", {}, "info"),
        Create("span", { "data-i18n-html": true, "data-i18n": "responsesPowered" }, "Responses are powered by <b>Google Gemini</b>, AI Can make mistakes, so please double-check the responses")
    ]);
    // --- Scroll Button ---
    const scrollBtn = document.createElement("scroll-button");
    scrollBtn.onclick = scrollC; // Custom element property, keeping as is
    scrollBtn.appendChild(Create("lord-icon", { src: "icons/down.json", target: "scroll-button", style: "width: 24px; height: 24px;", colors: "primary:#ffffff", trigger: "hover" }));
    const popup = Create("div.chatbot-popup", {}, [optionsBtn, optionsMenu, home, searchBar, chatBody, chatFooter, aboutBtn, scrollBtn]);
    document.body.insertBefore(popup, document.body.firstChild);
    return [popup, chatBody, messageInput, sendMessage, fileInput, filePreview, deepThinkBtn, googleBtn];
}
function getSettings() {
    if (document.querySelector("full-screen.settings"))
        return;
    // --- Header ---
    const h2 = Create("h2.text-gradient", {}, [
        Create("code.sanatan-symbol", {}, "settings"),
        Create("span", {}, ` ${t("settingsTitle")}`)
    ]);
    const closeBtn = Create("button.close-btn", { id: "close-settings", type: "button" }, "✕", ["click", () => closE('full-screen.settings')]);
    const header = Create("div.settings-header", {}, [h2, closeBtn]);
    // Name Input
    const nameLabel = Create("label", { for: "name" }, [
        Create("span", {}, [Create("lord-icon", { src: "icons/avatar.json", target: ".name-input", trigger: "hover" })]),
        Create("code", {}, ` ${t("nameLabel")} `)
    ]);
    const nameInput = Create("input.modern-input", { type: "text", id: "name", value: "user", autocomplete: "true", placeholder: t("enterNameLabel") });
    const nameItem = Create("div.setting-item.name-input.neomorphic", {}, [nameLabel, nameInput]);
    const themeOpts = [
        { val: 'auto', label: 'themeAuto' },
        { val: 'light', label: 'themeLight' },
        { val: 'dark', label: 'themeDark' }
    ].map(({ val, label }) => {
        return Create("option", { value: val, "data-i18n": label }, t(label));
    });
    const themeItem = Create("div.setting-item.neomorphic", {});
    Create("label", { for: "theme-select" }, [
        LordIcon({ src: "icons/theme.json", stroke: 3, target: "div.setting-item.neomorphic", trigger: "hover" }),
        Create("code", {}, ` ${t("themeLabel")} `)
    ], [], themeItem);
    Create("select#theme-select", {}, themeOpts, [], themeItem);
    // Language Select
    const langLabel = Create("label", { for: "languageSelector" }, [
        LordIcon({ src: "icons/language.json", stroke: 3, target: "div.setting-item.neomorphic", trigger: "hover" }),
        Create("code", {}, ` ${t("languageLabel")} `)
    ]);
    const langOpts = Object.entries(localeLabels).map(([val, text]) => {
        const selected = val === localStorage.getItem('sanatan_locale') || (!localStorage.getItem('sanatan_locale') && val === 'en');
        return Create("option", { value: val, ...(selected ? { selected: "true" } : {}) }, text);
    });
    const langSelect = Create("select.modern-select", { id: "languageSelector" }, langOpts);
    const langItem = Create("div.setting-item.neomorphic", {}, [langLabel, langSelect]);
    // Conversation Export
    const exportLabel = Create("label", { for: "conversation-export-format" }, [
        Create("span.sanatan-symbol", {}, "download"),
        Create("code", {}, " Export Chat ")
    ]);
    const exportSelect = Create("select.modern-select", { id: "conversation-export-format" }, [
        Create("option", { value: "pdf" }, "PDF"),
        Create("option", { value: "markdown" }, "Markdown"),
        Create("option", { value: "json" }, "JSON")
    ]);
    const exportBtn = Create("button.btn-gradient.conversation-tool-btn", { type: "button" }, "Export", ["click", () => {
            const format = document.getElementById("conversation-export-format")?.value;
            if (window.exportActiveConversation)
                window.exportActiveConversation(format);
        }]);
    const exportItem = Create("div.setting-item.neomorphic", {}, [exportLabel, exportSelect, exportBtn]);
    // Conversation Import
    const importLabel = Create("label", { for: "conversation-import-input" }, [
        Create("span.sanatan-symbol", {}, "upload_file"),
        Create("code", {}, " Import Chat JSON ")
    ]);
    const importInput = Create("input", { type: "file", id: "conversation-import-input", accept: "application/json,.json" }, "", ["change", function () {
            if (window.importConversationJson)
                window.importConversationJson(this.files?.[0]);
        }]);
    const importItem = Create("div.setting-item.neomorphic", {}, [importLabel, importInput]);
    // Delete Button
    const delBtn = Create("button.center-flex.btn-gradient", { title: t("deleteAllMessagesTooltip"), id: "close-chatbot", "data-i18n-label": "deleteAllMessagesTooltip", "aria-label": t("deleteAllMessagesTooltip") }, [
        Create("code", {}, [Create("lord-icon", { src: "icons/trash.json", target: "#close-chatbot", trigger: "hover" })]),
        Create("span", { "data-i18n": "deleteAllMessages" }, t("deleteAllMessages"))
    ], ["click", () => window.askToDel ? window.askToDel() : null]);
    const delItem = Create("div.setting-item.neomorphic", {}, [delBtn]);
    // Advanced Settings
    const advLabel = Create("label.label.text-gradient", { for: "showMore" }, t("advancedSettings"));
    const advCheckbox = Create("input", { type: "checkbox", name: "show More", id: "showMore" });
    const enterLabel = Create("label.", { for: "Enter-select" }, [Create("code", {}, ` ${t("onPressEnter")} `)]);
    const enterOpts = [
        { val: "yes", text: t("sendMessageOption") },
        { val: "no", text: t("goToNextLine") }
    ].map(optData => Create("option", { value: optData.val }, optData.text));
    const enterSelect = Create("select.modern-select#Enter-select", {}, enterOpts, ["change", window.changeEnter]);
    const advContent = Create("div.setting-item.notShow.neomorphic", {}, [Create("br"), enterLabel, enterSelect]);
    const advancedDiv = Create("div", {}, [advLabel, advCheckbox, advContent]);
    // Memory Manager Button
    const memBtn = Create("button.btn-gradient", { style: "width: 100%;" }, t("manageAIMemory"), ["click", () => {
            closE('full-screen.settings');
            if (window.showMemoryManager)
                window.showMemoryManager();
        }]);
    const memoryBtnComp = Create("div.setting-item.neomorphic", {}, [memBtn]);
    const body = Create("div.settings-body", {}, [nameItem, themeItem, langItem, exportItem, importItem, delItem, memoryBtnComp, advancedDiv]);
    const settingsPopup = Create("div.glass-dark", { id: "settings-popup" }, [header, body]);
    const fullScreen = Create("full-screen.settings", {}, [settingsPopup]);
    document.body.appendChild(fullScreen);
    return [nameInput, enterSelect, langSelect, settingsPopup];
}
export function getErrorMessage() {
    const regBtn = Create("button.btn-gradient", {}, t("regenerateResponse"), ["click", () => window.generateBotResponse ? window.generateBotResponse(true) : null]);
    const content = Create("div.error-content", {}, [
        Create("h3", {}, t("sorrySomethingWrong")),
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
