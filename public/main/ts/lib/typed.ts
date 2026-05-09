import { messageInput } from "../utils/definitions.js";
/**
 * ## Your typing assistant
 * @param i - The list of Strings to be typed
 */
export default function typed(i: Array<string>): undefined {
    let a = 0, b = 0, c = !1, d = 80, e = 50, f = messageInput;
    function g() {
        let h = i[a];
        if (!c) {
            (f.placeholder = h.substring(0, b + 1)), b++;
            if (b === h.length) {
                (c = !0), setTimeout(g, 1e3);
                return;
            }
        }
        else {
            (f.placeholder = h.substring(0, b - 1)), b--;
            if (b === 0) {
                (c = !1), (a = (a + 1) % i.length);
            }
        }
        setTimeout(g, c ? e : d);
    }
    g();
}
