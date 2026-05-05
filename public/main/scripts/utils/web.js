import { t } from "./i18n.js";

function deleteMessage() {
  chatHistory = [];
  messageInput.focus();
  chatBody.innerHTML = "";
  localStorage.removeItem("sanatan_chat_" + activeSessionId);
  document.body.classList.remove("hide-suggestion");
}

function askToDel() {
  Sanatan.ask(t("deleteAllConfirmation")).then((response) => {
    if (response) deleteMessage();
  });
}

window.deleteMessage = deleteMessage;
window.askToDel = askToDel;