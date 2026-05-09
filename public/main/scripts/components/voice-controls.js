import { Create } from "./elements.js";
import { synth } from "../utils/definitions.js";
import { state } from "../core/state.js";
export function showVoiceControls() {
    if (document.querySelector(".voice-controls"))
        return;
    const playPauseBtn = Create("button", { style: "background: none; border: none; color: white; cursor: pointer;" }, `<lord-icon src="icons/pause.json" trigger="hover" style="width: 32px; height: 32px;"></lord-icon>`);
    playPauseBtn.onclick = () => {
        if (state.isSpeaking) {
            if (synth.paused) {
                synth.resume();
                playPauseBtn.innerHTML = `<lord-icon src="icons/pause.json" trigger="hover" style="width: 32px; height: 32px;"></lord-icon>`;
            }
            else {
                synth.pause();
                playPauseBtn.innerHTML = `<code class="sanatan-symbol">play</code>`;
            }
        }
    };
    const stopBtn = Create("button", { style: "background: none; border: none; color: #f44; cursor: pointer;" }, `<code class="sanatan-symbol">stop</code>`, ["click", () => {
            synth.cancel();
            container.remove();
        }]);
    const container = Create("div.voice-controls.glass-panel.row", {
        style: "position: fixed; top: 80px; right: 20px; padding: 10px; border-radius: 20px; align-items: center; gap: 10px; z-index: 1000; animation: slideIn 0.3s ease-out; background: #777"
    }, [playPauseBtn, stopBtn]);
    document.body.appendChild(container);
    // Auto-remove when speaking ends
    const checkInterval = setInterval(() => {
        if (!synth.speaking) {
            container.remove();
            clearInterval(checkInterval);
        }
    }, 500);
}
