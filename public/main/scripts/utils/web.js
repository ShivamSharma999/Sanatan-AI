function deleteMessage() {
  chatHistory = [];
  messageInput.focus();
  chatBody.innerHTML = "";
  localStorage.removeItem("sanatan_chat_" + activeSessionId);
  document.body.classList.remove("hide-suggestion");
}

function askToDel() {
  Sanatan.ask("Are you sure To Delete all Messages?").then((response) => {
    if (response) deleteMessage();
  });
}

window.deleteMessage = deleteMessage;
window.askToDel = askToDel;