import { evListener } from "../core/config.js";
export function initGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    const sidebar = document.querySelector(".menuBar"); // Adjust selector if needed
    evListener("touchstart", document, e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    evListener("touchend", document, e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    function handleSwipe() {
        if (!sidebar)
            return;
        const SWIPE_THRESHOLD = 50;
        // Swipe Left (Close Sidebar)
        if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
            // Check if sidebar is open
            if (sidebar.classList.contains("show")) { // Check app logic for 'show' class
                sidebar.classList.remove("show");
            }
        }
        // Swipe Right (Open Sidebar - optional)
        if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
            // Maybe open sidebar if swipe starts from left edge
            if (touchStartX < 30) {
                sidebar.classList.add("show");
            }
        }
    }
    // Click outside to close (Mobile)
    evListener("click", document, (e) => {
        if (sidebar && !sidebar.classList.contains("makeSmall")) {
            if (!sidebar.contains(e.target) && !e.target.closest('.menuopen')) {
                sidebar.classList.add("makeSmall");
            }
        }
    });
}
