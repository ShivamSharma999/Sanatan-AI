import { renderChatList } from "./app.js";
import { updateSessionTitleData } from "./state.js";
export function updateSessionTitle(text) {
    const newTitle = updateSessionTitleData(text);
    renderChatList();
    return newTitle;
}
