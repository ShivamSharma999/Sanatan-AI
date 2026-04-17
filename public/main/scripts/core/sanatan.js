import { sendMessage, themeTag, $, showAlert } from "../utils/definitions.js";
import { Create } from "../components/elements.js";

let isOfflineBefore = false;

export var Sanatan = {
  ask: function (message) {
    return new Promise((resolve) => {
        const text = Create("p", {
              style: {
                marginBottom: "20px"
              }
            }, message);
        const backButton =  Create("button.del", {}, "Cancel", ["click", () => {
          document.body.removeChild(overlay);
          resolve(!1);
        }]);
      const okButton = Create("button.del", {}, "OK", ["click", () => {
               document.body.removeChild(overlay);
               resolve(!0);
             }]);
      const buttonsDiv = Create("div.space-between.flex", {}, [backButton, okButton]);
      const dialog = Create("div", {
        style: {
          background: "var(--secondary-color)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          width: "300px"
        },
        color: "var(--text-color)"
      }, "", [text, buttonsDiv]);
      const overlay = Create("div.center-flex", {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999
        }
      }, "", [dialog]);
        document.body.appendChild(overlay);
    });
  },
  checkNetwork: function (isAlert = isOfflineBefore) {
    let abc;
    abc = navigator.onLine;
    if (abc) {
      sendMessage.removeAttribute('disabled');
      if (isAlert) {
        showAlert("Your device is Online again, enjoy Chatting😊😀...");
        isOfflineBefore = false
      }
    } else
    isOfflineBefore = true;
    return abc;
  },
  type: (typ) => typeof typ,
  setMetaTheme: function (color) {
    if(themeTag) themeTag.content = color;
    else if($) $('meta[name="theme-color"]').content = color;
  }
};

export { Sanatan as default };