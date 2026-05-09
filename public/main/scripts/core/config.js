import { state } from "./state.js";
import { languageSelector, chatBody, deepThinkBtn, fileInput, $, closE, shoW, showNotification, welcomeNameInput } from "../utils/definitions.js";
import { t } from "../utils/i18n.js";
import { getCurrentTimeAndDate } from "../utils/utils.js";
import { showStep, updateProfileUI } from "./app.js";
let systemInstruction = '';
/**
 * Gives system instruction of bot.
 * @returns { Promise<string> }
 */
export async function giveInfo() {
    if (systemInstruction === '') {
        const res = await fetch('../../Resources/systemPrompt.md'), txt = await res.text();
        return txt.replace('sanatan_user', localStorage.getItem('Name') || 'User')
            .replace('getcurrenttime&date', getCurrentTimeAndDate())
            .replace(/langselectorval/g, languageSelector.value)
            .replace('currentmemories', state.aiMemory.length === 0 ? "" : "Saved Memories: " + state.aiMemory.join(" ,\n"));
    }
    else {
        return systemInstruction;
    }
}
const getHeight = () => chatBody.scrollHeight;
export function checkHeight() {
    let isScrolled = chatBody.clientHeight + chatBody.scrollTop + 10 >= getHeight();
    const scrollBtn = $('scroll-button');
    if (isScrolled) {
        scrollBtn.classList.add('hide');
        setTimeout(() => { closE('scroll-button'); }, 100);
    }
    else {
        scrollBtn.classList.remove('hide');
        shoW('scroll-button', "flex");
    }
}
export function btnHov(btn, isActive) {
    let isDeep = btn === deepThinkBtn;
    let icon = isDeep
        ? '<lord-icon src="icons/brain.json" target="#deep-think-btn" stroke="bold" trigger="hover" style="width: 24px; height: 24px;"></lord-icon>'
        : `<lord-icon src="icons/google.json" target="#Google-Btn" stroke="bold" trigger="hover" style="width: 24px; height: 24px;"></lord-icon>`;
    isDeep ? (state.isDeepChat = !isActive) : (state.isGoogle = !isActive);
    isActive = !isActive;
    btn.style.background = isActive ? (isDeep ? "rgba(241, 196, 15, 0.15)" : "rgba(0, 102, 255, 0.17)") : "transparent";
    btn.classList.remove("selected");
    btn.classList.remove("abcd");
    btn.innerHTML = icon;
    isActive ? btn.classList.add("selected") : null;
}
export async function getFiles() {
    state.allowedExtensions = await fetch("Resources/supportedfiles.json").then((response) => response.json());
    fileInput.accept = Array.isArray(state.allowedExtensions) ? state.allowedExtensions.join(",") : state.allowedExtensions;
}
window.onload = function () {
    const isElectron = window.electronAPI && window.electronAPI.isElectron();
    if (isElectron) {
        // For Electron: Use custom authentication flow with sanatanai:// protocol
        const googleLoginBtn = $("#google-login-btn");
        if (googleLoginBtn) {
            googleLoginBtn.innerHTML = `<span class="google">${t('googleLogin')}</span>`;
            googleLoginBtn.addEventListener('click', () => {
                initiateElectronGoogleAuth();
            });
        }
        // Listen for OAuth code from main process
        if (window.electronAPI) {
            window.electronAPI.onOAuthCode((data) => {
                handleElectronGoogleAuth(data.code);
            });
            window.electronAPI.onOAuthError((data) => {
                console.error('OAuth Error:', data.error);
                showNotification(t('authenticationFailed'), 'error');
            });
        }
    }
    else {
        google?.accounts.id.initialize({
            client_id: "73023901870-kpftpubi3f7rls5mgcr9malj9purp9l5.apps.googleusercontent.com",
            callback: handleGoogleLogin,
            redirect_uri: window.location.origin + '/auth'
        });
        google?.accounts.id.renderButton(document.getElementById("google-login-btn"), { theme: "outline", size: "large", type: "standard", shape: "pill", text: "signin_with", logo_alignment: "left" });
    }
};
// Electron-specific Google authentication handlers
function initiateElectronGoogleAuth() {
    const clientId = "73023901870-kpftpubi3f7rls5mgcr9malj9purp9l5.apps.googleusercontent.com";
    let redirectUri = "http://localhost:5612/auth";
    if (window.electronAPI && window.electronAPI.getOAuthRedirectUri) {
        redirectUri = window.electronAPI.getOAuthRedirectUri();
    }
    const scope = "openid email profile";
    const responseType = "code";
    // Google OAuth endpoint
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(clientId)}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=${encodeURIComponent(responseType)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `access_type=offline`;
    window.open(authUrl, '_blank');
}
async function handleElectronGoogleAuth(code) {
    try {
        showNotification(t('completingAuthentication'), "info");
        // Send authorization code to backend for secure token exchange
        const response = await fetch('/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
                platform: 'electron'
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Authentication failed');
        }
        const data = await response.json();
        // Store user data
        localStorage.setItem("Name", data.name);
        localStorage.setItem("Email", data.email);
        localStorage.setItem("Picture", data.picture || "");
        localStorage.setItem("emailVerified", "true");
        localStorage.setItem("termsAgreed", "true");
        if (welcomeNameInput)
            welcomeNameInput.value = data.name;
        showNotification(t('loggedInAs', { name: data.name }), "success");
        updateProfileUI();
        showStep("customize-step");
    }
    catch (error) {
        console.error("Electron Google Auth Error:", error);
        showNotification(t('authenticationFailed'), "error");
    }
}
async function handleGoogleLogin(response) {
    try {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        localStorage.setItem("Name", payload.name);
        localStorage.setItem("Email", payload.email);
        localStorage.setItem("Picture", payload.picture);
        localStorage.setItem("emailVerified", "true");
        localStorage.setItem("termsAgreed", "true");
        if (welcomeNameInput)
            welcomeNameInput.value = payload.name;
        showNotification(t('loggedInAs', { name: payload.name }), "success");
        updateProfileUI();
        showStep("customize-step");
    }
    catch (error) {
        console.error("Google Login Error:", error);
        showNotification(t('loginFailed'), "error");
    }
}
export { evListener } from "../lib/create.js";
