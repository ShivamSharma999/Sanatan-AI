import { state } from "../core/state.js";
import { Create, getPopup, getSettings } from "../components/elements.js";
import { evListener } from "../core/config.js";

/**
 * @param {string} query
 * @param {ParentNode} [parentElement]
 * @returns {Element|null}
 */
export function $(query, parentElement = document) {
  return parentElement.querySelector(query);
}

let _initialized = false;

// Live bindings (filled by initDom)
export let stopRespond,
  themeTag,
  synth,
  isPC,
  welcomeContainer,
  steps,
  agreeBtn,
  finishSetupBtn,
  welcomeNameInput,
  menuopen,
  googleLoginBtn,
  isMobile = window.innerWidth < 712,
  menuBar = $('.menuBar'),
  userProfileImg,
  userNameDisplay,
  verificationStatus,
  fullscreen;


export const [chatPopup, chatBody, messageInput, sendMessage, fileInput, filePreview, deepThinkBtn, googleBtn] = getPopup();
export const [nameInput, enterSelect, languageSelector, settingsPopup] = getSettings();

export function closE(query) {
  const el = document.querySelector(query);
  if (el) el.style.display = "none";
}

export function shoW(query, displa = "block") {
  const element = document.querySelector(query);
  if (!element) return;
  element.style.display = displa;
}

export function showAlert(alert, isPerm = false) {
  if (!fullscreen) fullscreen = $(".fullscreen");
  if (!fullscreen) {
    window.alert(alert);
    return;
  }
  let p = Create("p", {}, alert),
    btn, content, chArr = [p];
  if (!isPerm) {
    btn = Create("button.del", {}, "OK", ["click", () => {
      fullscreen.style.display = "none";
      content.remove();
    }]);
    chArr = [p, btn]
  }
  content = Create("div.content", {}, chArr);
  fullscreen.appendChild(content);
  fullscreen.style.display = "flex";
}

/**
 * 
 * @param { String } message 
 * @param { "info"|"error"|"success" } type 
 */
export function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) existingNotification.remove();
  let innerHTML = `<div class="notification-content">
    ${type === "success"
      ? '<span class="sanatan-symbol">check_circle</span>'
      : type === "error"
        ? '<span class="sanatan-symbol">error</span>'
        : '<span class="sanatan-symbol">info</span>'
    }
    <span>${message}</span>
  </div>`;
  const notification = Create(`div.notification.${type}.glass-effect`, {}, innerHTML)
  notification.innerHTML = `

`;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("active");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("active");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

export function initDom() {
  if (_initialized) return;
  _initialized = true;
  synth = window.speechSynthesis;
  isPC = window.innerWidth > 712;
  themeTag = $('meta[name="theme-color"]');
  fullscreen = $('.fullscreen')

  welcomeContainer = $(".welcome");
  steps = document.querySelectorAll(".welcome-step");
  agreeBtn = $("#agree-btn");
  finishSetupBtn = $("#finish-setup-btn");
  welcomeNameInput = $("#welcome-name-input");

  menuopen = $(".menuopen");
  googleLoginBtn = $("#google-login-btn");
  userProfileImg = $("#user-profile-img");
  userNameDisplay = $("#user-name-display");
  verificationStatus = $("#verification-status");

  stopRespond = $(".stopRespond");

  if (enterSelect) enterSelect.value = localStorage.getItem("WhenEnter") || "no";
  if (nameInput) nameInput.value = localStorage.getItem("Name") || "user";

  if (googleBtn) {
    evListener("click", googleBtn, () =>
      window.btnHov ? window.btnHov(googleBtn, state.isGoogle) : null
    );
  }

  if (deepThinkBtn) {
    evListener("click", deepThinkBtn, () =>
      window.btnHov ? window.btnHov(deepThinkBtn, state.isDeepChat) : null
    );
  }

  evListener("contextmenu", document, (e) => e.preventDefault());

  if (languageSelector) {
    evListener("change", languageSelector, (e) => {
      document.documentElement.lang = e.target.value;
    });
  }

  if (menuopen) {
    evListener("click", menuopen, () => {
      document.querySelector(".menuBar")?.classList.toggle("makeSmall");
    });
  }

  setInterval(() => {
    if (chatBody.innerHTML.trim() == "".trim()) {
      document.body.classList.remove("hide-suggestion")
    }
  }, 100);
}

