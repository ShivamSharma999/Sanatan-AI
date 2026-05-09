import { Create } from "./elements.js";
import { state, storeAIMemory, deleteAIMemory } from "../core/state.js";
import { showNotification } from "../utils/definitions.js";
import { t } from "../utils/i18n.js";
export function showMemoryManager() {
    const closeBtn = Create("button", { style: "background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;" }, "✕", ["click", () => container.remove()]);
    const header = Create("div.header.center-flex", { style: "justify-content: space-between;" }, [Create("h3", {}, t("manageAIMemory")), closeBtn]);
    const list = Create("div.memory-list.col", { style: "flex: 1; overflow-y: auto; gap: 8px; max-height: 300px;" });
    const renderList = () => {
        list.innerHTML = "";
        if (state.aiMemory.length === 0) {
            list.innerHTML = `<p style="text-align: center; color: #888;">${t("noMemoriesStored")}</p>`;
            return;
        }
        state.aiMemory.forEach((mem, _) => {
            const delBtn = Create("button.sanatan-symbol", { style: "background: #777; border: none; color: #ff4444; padding: 10px; border-radius: 50%; aspect-ratio: 1/1;" }, "delete", ["click", () => {
                    deleteAIMemory(mem);
                    renderList();
                }]);
            const item = Create("div.memory-item.center-flex", { style: "background: rgba(255,255,255,0.05); padding: 10px; border-radius: 6px; justify-content: space-between;" }, [Create("span", { style: "flex: 1; font-size: 0.9rem;" }, mem), delBtn]);
            list.appendChild(item);
        });
    };
    renderList();
    const input = Create("input", { placeholder: t("addNewMemory"), style: "flex: 1; padding: 8px; border-radius: 6px; border: 1px solid #444; background: #222; color: white;" });
    const addBtn = Create("button", { style: "padding: 8px 15px; background: var(--gradient-1); color: white; border: none; border-radius: 6px; cursor: pointer;" }, t("add"), ["click", () => {
            if (input.value.trim()) {
                storeAIMemory(input.value.trim());
                input.value = "";
                renderList();
                showNotification(t("memoryAdded"), "success");
            }
        }]);
    const inputDiv = Create("div.input-group.flex", { style: "gap: 10px;" }, [input, addBtn]);
    const container = Create("div.memory-manager.glass-dark.col", { style: "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 500px; max-height: 80vh; z-index: 10000; padding: 20px; border-radius: 12px; gap: 15px;" }, [header, list, inputDiv]);
    document.body.appendChild(container);
}
// Expose globally to be called from somewhere (e.g. settings or console)
window.showMemoryManager = showMemoryManager;
