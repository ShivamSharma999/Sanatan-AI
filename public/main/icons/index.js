var T = Object.defineProperty;
var I = (n, i, e) => i in n ? T(n, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[i] = e;
var r = (n, i, e) => I(n, typeof i != "symbol" ? i + "" : i, e);
var y = (n, i, e) => new Promise((t, s) => {
  var a = (o) => {
    try {
      c(e.next(o));
    } catch (f) {
      s(f);
    }
  }, l = (o) => {
    try {
      c(e.throw(o));
    } catch (f) {
      s(f);
    }
  }, c = (o) => o.done ? t(o.value) : Promise.resolve(o.value).then(a, l);
  c((e = e.apply(n, i)).next());
});
import { Player as E } from "./web.js";
import { Player as B } from "./web.js";
const S = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  "indianred ": "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function k(n) {
  return n.startsWith("#") ? n.length === 4 ? `#${n[1]}${n[1]}${n[2]}${n[2]}${n[3]}${n[3]}` : n : S[n.toLowerCase()] || "#000000";
}
function g(n) {
  return !n || typeof n != "string" ? void 0 : n.split(",").filter((e) => e).map((e) => e.split(":")).filter((e) => e.length == 2).reduce((e, t) => {
    const s = t[0];
    return e[s.toLowerCase()] = k(t[1]), e;
  }, {});
}
function p(n) {
  if (n === "light" || n === 1 || n === "1")
    return 1;
  if (n === "regular" || n === 2 || n === "2")
    return 2;
  if (n === "bold" || n === 3 || n === "3")
    return 3;
}
function _(n) {
  if (typeof n == "string")
    return n;
}
const b = ["click", "mouseenter", "mouseleave"], C = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, v = `
    :host {
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        transform: translate3d(0px, 0px, 0px);
    }

    :host(.current-color) svg path[fill] {
        fill: currentColor;
    }

    :host(.current-color) svg path[stroke] {
        stroke: currentColor;
    }

    svg {
        position: absolute;
        pointer-events: none;
        display: block;
        transform: unset!important;
    }

    ::slotted(*) {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .body.ready ::slotted(*) {
        display: none;
    }
`;
let u = null;
const O = [
  "colors",
  "src",
  "state",
  "trigger",
  "loading",
  "target",
  "stroke",
  "speed"
], d = class d extends HTMLElement {
  constructor() {
    super(...arguments);
    r(this, "_root");
    r(this, "_isConnected", !1);
    r(this, "_ready", !1);
    r(this, "_assignedIconData");
    r(this, "_loadedIconData");
    r(this, "_triggerInstance");
    r(this, "_playerInstance");
    /**
     * Stores a callback for deferred icon loading, used by lazy/interation/delay strategies.
     */
    r(this, "delayedLoading", null);
  }
  /**
   * Returns the current version of the element.
   */
  static get version() {
    return "__BUILD_VERSION__";
  }
  /**
   * Returns the list of attributes to observe for changes.
   */
  static get observedAttributes() {
    return O;
  }
  /**
   * Registers a custom trigger for icon interaction.
   * Triggers define how the icon responds to user actions.
   * @param name The name of the trigger.
   * @param triggerClass The trigger class constructor.
   */
  static defineTrigger(e, t) {
    d._definedTriggers.set(e, t);
  }
  /**
   * Handles changes to observed attributes and delegates to the appropriate handler.
   * @param name The attribute name.
   * @param oldValue The previous value.
   * @param newValue The new value.
   */
  attributeChangedCallback(e, t, s) {
    this[`${e}Changed`].call(this);
  }
  /**
   * Called when the element is added to the DOM.
   * Sets up shadow DOM, styles, and loading strategy.
   */
  connectedCallback() {
    if (this._root || this.createElements(), this.loading === "lazy") {
      let e;
      this.delayedLoading = (s) => {
        e.unobserve(this), e = void 0, this.delayedLoading = null, s || this.createPlayer();
      };
      const t = (s, a) => {
        s.forEach((l) => {
          l.isIntersecting && e && this.delayedLoading && this.delayedLoading();
        });
      };
      e = new IntersectionObserver(t), e.observe(this);
    } else if (this.loading === "interaction") {
      let e;
      this.delayedLoading = (a) => {
        for (const l of b)
          (t || this).removeEventListener(l, s);
        this.delayedLoading = null, a || this.createPlayer().then(() => {
          e && (t || this).dispatchEvent(new Event(e));
        });
      };
      const t = this.target ? this.closest(this.target) : null;
      let s = (a) => {
        const l = a == null ? void 0 : a.type;
        e ? e = l : (e = l, this.delayedLoading && this.delayedLoading());
      };
      s = s.bind(this);
      for (const a of b)
        (t || this).addEventListener(a, s);
    } else if (this.loading === "delay") {
      this.delayedLoading = (t) => {
        this.delayedLoading = null, t || this.createPlayer();
      };
      const e = this.hasAttribute("loading-delay") ? +this.getAttribute("loading-delay") : 0;
      setTimeout(() => {
        this.delayedLoading && this.delayedLoading();
      }, e);
    } else
      this.createPlayer();
    this._isConnected = !0;
  }
  /**
   * Called when the element is removed from the DOM.
   * Cleans up any resources and event listeners.
   */
  disconnectedCallback() {
    this.delayedLoading && this.delayedLoading(!0), this.destroyPlayer(), this._isConnected = !1;
  }
  /**
   * Creates the shadow DOM structure and attaches styles and slots.
   */
  createElements() {
    if (this._root = this.attachShadow({
      mode: "open"
    }), C)
      u || (u = new CSSStyleSheet(), u.replaceSync(v)), this._root.adoptedStyleSheets = [u];
    else {
      const s = document.createElement("style");
      s.innerHTML = v, this._root.appendChild(s);
    }
    const e = document.createElement("div");
    e.classList.add("body"), this._root.appendChild(e);
    const t = document.createElement("slot");
    e.appendChild(t);
  }
  /**
   * Factory method for creating a Player instance.
   * Can be overridden for custom player instantiation.
   */
  playerFactory(e, t, s) {
    return new E(
      e,
      t,
      s,
      {
        autoInit: !1
      }
    );
  }
  /**
   * Instantiates the Player and sets up dynamic styles, triggers, and event listeners.
   * Handles asynchronous icon data loading.
   */
  createPlayer() {
    return y(this, null, function* () {
      if (this.delayedLoading)
        return;
      const e = yield this.loadIconData();
      if (!e)
        return;
      this._playerInstance = this.playerFactory(
        this.animationContainer,
        e,
        {
          state: _(this.state),
          stroke: p(this.stroke),
          colors: g(this.colors),
          // legacy properties
          scale: parseFloat("" + this.getAttribute("scale") || ""),
          axisX: parseFloat("" + this.getAttribute("axis-x") || ""),
          axisY: parseFloat("" + this.getAttribute("axis-y") || "")
        }
      );
      const t = Object.entries(this._playerInstance.colors || {});
      if (t.length) {
        let s = "";
        for (const [l, c] of t)
          s += `
                    :host(:not(.current-color)) svg path[fill].${l} {
                        fill: var(--lord-icon-${l}, var(--lord-icon-${l}-base, #000));
                    }
        
                    :host(:not(.current-color)) svg path[stroke].${l} {
                        stroke: var(--lord-icon-${l}, var(--lord-icon-${l}-base, #000));
                    }
                `;
        const a = document.createElement("style");
        a.innerHTML = s, this.animationContainer.appendChild(a);
      }
      this._playerInstance.init(), this._playerInstance.addEventListener("ready", () => {
        this._triggerInstance && this._triggerInstance.onReady && this._triggerInstance.onReady();
      }), this._playerInstance.addEventListener("refresh", () => {
        this.refresh(), this._triggerInstance && this._triggerInstance.onRefresh && this._triggerInstance.onRefresh();
      }), this._playerInstance.addEventListener("complete", () => {
        this._triggerInstance && this._triggerInstance.onComplete && this._triggerInstance.onComplete();
      }), this._playerInstance.addEventListener("frame", () => {
        this._triggerInstance && this._triggerInstance.onFrame && this._triggerInstance.onFrame();
      }), this.refresh(), this.triggerChanged(), yield new Promise((s, a) => {
        this._playerInstance.ready ? s() : this._playerInstance.addEventListener("ready", s);
      }), this.animationContainer.classList.add("ready"), this._ready = !0, this.dispatchEvent(new CustomEvent("ready"));
    });
  }
  /**
   * Destroys the Player and Trigger instances, cleaning up all resources.
   * Called when the icon data changes or the element is disconnected.
   */
  destroyPlayer() {
    this._ready = !1, this._loadedIconData = void 0, this._triggerInstance && (this._triggerInstance.onDisconnected && this._triggerInstance.onDisconnected(), this._triggerInstance = void 0), this._playerInstance && (this._playerInstance.destroy(), this._playerInstance = void 0, this.animationContainer.classList.remove("ready"));
  }
  /**
   * Loads icon data from the 'src' attribute or uses the assigned icon data.
   * Returns the icon data object or undefined if loading fails.
   */
  loadIconData() {
    return y(this, null, function* () {
      let e = this.icon;
      if (!e && this.src) {
        const t = yield fetch(this.src);
        this._loadedIconData = e = yield t.json();
      }
      return e;
    });
  }
  /**
   * Synchronizes the element's state with the Player instance.
   * Updates CSS variables and other dynamic properties.
   */
  refresh() {
    this.movePaletteToCssVariables();
  }
  /**
   * Updates CSS variables for icon colors based on the Player's palette.
   * CSS variables take precedence over other color assignments.
   */
  movePaletteToCssVariables() {
    for (const [e, t] of Object.entries(this._playerInstance.colors || {}))
      t ? this.animationContainer.style.setProperty(`--lord-icon-${e}-base`, t) : this.animationContainer.style.removeProperty(`--lord-icon-${e}-base`);
  }
  /**
   * Called when the 'target' attribute changes.
   * Reloads the trigger to use the new target element.
   */
  targetChanged() {
    this.triggerChanged();
  }
  /**
   * Called when the 'loading' attribute changes.
   */
  loadingChanged() {
  }
  /**
   * Called when the 'trigger' attribute changes.
   * Disconnects the old trigger and instantiates the new one.
   */
  triggerChanged() {
    var s;
    if (this._triggerInstance && (this._triggerInstance.onDisconnected && this._triggerInstance.onDisconnected(), this._triggerInstance = void 0, (s = this._playerInstance) == null || s.pause()), !this.trigger || !this._playerInstance)
      return;
    const e = d._definedTriggers.get(this.trigger);
    if (!e)
      throw new Error(`Can't use unregistered trigger: '${this.trigger}'!`);
    const t = this.target ? this.closest(this.target) : null;
    this._triggerInstance = new e(
      this._playerInstance,
      this,
      t || this
    ), this._triggerInstance.onConnected && this._triggerInstance.onConnected(), this._playerInstance.ready && this._triggerInstance.onReady && this._triggerInstance.onReady();
  }
  /**
   * Called when the 'colors' attribute changes.
   * Updates the Player's color palette.
   */
  colorsChanged() {
    this._playerInstance && (this._playerInstance.colors = g(this.colors) || null);
  }
  /**
   * Called when the 'stroke' attribute changes.
   * Updates the Player's stroke width.
   */
  strokeChanged() {
    this._playerInstance && (this._playerInstance.stroke = p(this.stroke) || null);
  }
  /**
   * Called when the 'speed' attribute changes.
   * Updates the Player's animation speed.
   */
  speedChanged() {
    if (!this._playerInstance)
      return;
    const e = this.getAttribute("speed");
    if (e) {
      const t = parseFloat(e);
      isNaN(t) ? this._playerInstance.speed = 1 : this._playerInstance.speed = t;
    } else
      this._playerInstance.speed = 1;
  }
  /**
   * Called when the 'state' attribute changes.
   * Updates the Player's animation state.
   */
  stateChanged() {
    var e, t;
    this._playerInstance && (this._playerInstance.state = this.state, (t = (e = this._triggerInstance) == null ? void 0 : e.onState) == null || t.call(e));
  }
  /**
   * Called when the 'icon' attribute changes.
   * Reloads the Player with the new icon.
   */
  iconChanged() {
    this._isConnected && (this.destroyPlayer(), this.createPlayer());
  }
  /**
   * Called when the 'src' attribute changes.
   * Reloads the Player with the new icon source.
   */
  srcChanged() {
    this._isConnected && (this.destroyPlayer(), this.createPlayer());
  }
  /**
   * Directly assigns icon data to the element.
   * Triggers a reload if the data changes.
   */
  set icon(e) {
    e !== this._assignedIconData && (this._assignedIconData = e, this._loadedIconData = void 0, this.iconChanged());
  }
  /**
   * Gets the currently assigned or loaded icon data.
   */
  get icon() {
    return this._assignedIconData || this._loadedIconData;
  }
  /**
   * Sets the 'src' attribute for loading icon data from a URL.
   */
  set src(e) {
    e ? this.setAttribute("src", e) : this.removeAttribute("src");
  }
  /**
   * Gets the current 'src' attribute value.
   */
  get src() {
    return this.getAttribute("src");
  }
  /**
   * Sets the animation state for the icon.
   * You can check available states from the player instance.
   */
  set state(e) {
    e ? this.setAttribute("state", e) : this.removeAttribute("state");
  }
  /**
   * Gets the current animation state.
   */
  get state() {
    return this.getAttribute("state");
  }
  /**
   * Sets the color palette for the icon.
   * Accepts a comma-separated string, e.g. 'primary:#fdd394,secondary:#03a9f4'.
   */
  set colors(e) {
    e ? this.setAttribute("colors", e) : this.removeAttribute("colors");
  }
  /**
   * Gets the current color palette string.
   */
  get colors() {
    return this.getAttribute("colors");
  }
  /**
   * Sets the trigger name for icon interaction.
   * The trigger must be registered beforehand.
   */
  set trigger(e) {
    e ? this.setAttribute("trigger", e) : this.removeAttribute("trigger");
  }
  /**
   * Gets the current trigger name.
   */
  get trigger() {
    return this.getAttribute("trigger");
  }
  /**
   * Sets the loading strategy for the icon.
   * Options: 'lazy', 'interaction', or 'delay'.
   */
  set loading(e) {
    e ? this.setAttribute("loading", e) : this.removeAttribute("loading");
  }
  /**
   * Gets the current loading strategy.
   */
  get loading() {
    if (this.getAttribute("loading")) {
      const e = this.getAttribute("loading").toLowerCase();
      if (e === "lazy")
        return "lazy";
      if (e === "interaction")
        return "interaction";
      if (e === "delay")
        return "delay";
    }
    return null;
  }
  /**
   * Sets the CSS selector for the target element used for event listening.
   */
  set target(e) {
    e ? this.setAttribute("target", e) : this.removeAttribute("target");
  }
  /**
   * Gets the current target selector.
   */
  get target() {
    return this.getAttribute("target");
  }
  /**
   * Sets the stroke style for the icon (e.g., 1, 2, 3, light, regular, bold).
   */
  set stroke(e) {
    e ? this.setAttribute("stroke", e) : this.removeAttribute("stroke");
  }
  /**
   * Gets the current stroke width.
   */
  get stroke() {
    return this.hasAttribute("stroke") ? this.getAttribute("stroke") : null;
  }
  /**
   * Sets the animation speed for the icon.
   * Accepts a number or a string that can be parsed to a number.
   */
  set speed(e) {
    e ? this.setAttribute("speed", String(e)) : this.removeAttribute("speed");
  }
  /**
   * Gets the current animation speed.
   * Returns 1 if not set or invalid.
   */
  get speed() {
    const e = this.getAttribute("speed");
    if (e) {
      const t = parseFloat(e);
      if (!isNaN(t))
        return t;
    }
    return 1;
  }
  /**
   * Returns true if the element is fully initialized and ready for interaction.
   * You can listen for the 'ready' event to detect readiness.
   */
  get ready() {
    return this._ready;
  }
  /**
   * Returns a promise that resolves when the element is ready.
   * Useful for awaiting initialization in external code.
   */
  get readyPromise() {
    return this._ready ? Promise.resolve() : new Promise((e) => {
      this.addEventListener("ready", () => {
        e();
      }, { once: !0 });
    });
  }
  /**
   * Returns the Player instance associated with this element.
   */
  get playerInstance() {
    return this._playerInstance;
  }
  /**
   * Returns the Trigger instance associated with this element.
   */
  get triggerInstance() {
    return this._triggerInstance;
  }
  /**
   * Returns the animation container element inside the shadow DOM.
   */
  get animationContainer() {
    return this._root.lastElementChild;
  }
};
r(d, "_definedTriggers", /* @__PURE__ */ new Map());
let h = d;
class L {
  constructor(i, e, t) {
    /**
     * Animation segments for mouse enter and leave actions.
     * segments[0] - segment for mouse enter
     * segments[1] - segment for mouse leave
     */
    r(this, "segments");
    /**
     * Queue to manage playback requests.
     */
    r(this, "queue", []);
    r(this, "connected", !1);
    r(this, "targetState");
    r(this, "delayTimer", null);
    r(this, "intersectionObserver");
    this.player = i, this.element = e, this.targetElement = t, this.onClick = this.onClick.bind(this), this.onMouseEnter = this.onMouseEnter.bind(this), this.handleState(), this.replay();
  }
  onConnected() {
    this.connected = !0, this.targetElement.addEventListener("click", this.onClick), this.targetElement.addEventListener("mouseenter", this.onMouseEnter), this.targetState && (this.loading ? this.play(!0) : this.initIntersectionObserver());
  }
  onDisconnected() {
    this.connected = !1, this.targetElement.removeEventListener("click", this.onClick), this.targetElement.removeEventListener("mouseenter", this.onMouseEnter), this.cleanup();
  }
  onMouseEnter() {
    this.queue.push(0), this.queue.push(1), this.handleQueue();
  }
  onComplete() {
    this.targetState ? this.resetState() : this.handleQueue();
  }
  onState() {
    this.handleState();
  }
  onClick() {
    this.clickToReplay && this.replay();
  }
  play(i) {
    this.player.playing || this.delayTimer || (i && this.delay > 0 ? this.scheduleDelayedPlay() : this.player.playFromStart());
  }
  replay() {
    this.player.playing || !this.player.state || !this.intro || (this.targetState = this.player.state, this.player.state = this.intro, this.connected && this.play());
  }
  scheduleDelayedPlay() {
    this.resetDelayTimer(), this.delayTimer = setTimeout(() => {
      this.player.playFromStart(), this.delayTimer = null;
    }, this.delay);
  }
  /**
   * Processes the segment queue and plays the next segment if the player is not currently playing.
   */
  handleQueue() {
    var e;
    if (this.player.playing || !this.queue.length)
      return;
    const i = this.queue.shift();
    if (this.segments) {
      const t = (e = this.segments) == null ? void 0 : e[i];
      this.player.direction = 1, this.player.switchSegment(t);
    } else
      this.player.direction = i === 0 ? 1 : -1;
    this.player.play();
  }
  /**
   * Updates the animation segments based on the current player state and parameters.
   */
  handleState() {
    this.segments = void 0;
    const i = this.player.availableStates.find((a) => a.name === this.player.state);
    if (!i)
      return;
    let e = 0;
    if (i.params.length) {
      const a = parseFloat(i.params[0]);
      !isNaN(a) && a > 0 && a <= 1 && (e = a);
    }
    if (!e)
      return;
    const t = [
      i.time,
      i.time + Math.floor((i.duration + 1) * e)
    ], s = [
      t[1],
      i.time + i.duration + 1
    ];
    this.segments = [
      t,
      s
    ];
  }
  initIntersectionObserver() {
    if (this.intersectionObserver)
      return;
    const i = (e) => {
      e.forEach((t) => {
        t.isIntersecting && (this.play(!0), this.resetIntersectionObserver());
      });
    };
    this.intersectionObserver = new IntersectionObserver(i, { threshold: 0.5 }), this.intersectionObserver.observe(this.element);
  }
  resetIntersectionObserver() {
    this.intersectionObserver && (this.intersectionObserver.unobserve(this.element), this.intersectionObserver = void 0);
  }
  resetDelayTimer() {
    this.delayTimer && (clearTimeout(this.delayTimer), this.delayTimer = null);
  }
  resetState() {
    return this.targetState ? (this.player.state = this.targetState, this.targetState = void 0, !0) : !1;
  }
  resetPlayer() {
    this.player.direction = 1, this.segments && (this.player.switchSegment([
      this.segments[0][0],
      this.segments[1][1]
    ]), this.segments = void 0, this.queue = []);
  }
  cleanup() {
    this.resetPlayer(), this.resetIntersectionObserver(), this.resetDelayTimer(), this.resetState();
  }
  get intro() {
    if (!this.element.hasAttribute("intro"))
      return null;
    const e = this.element.getAttribute("intro");
    let t = this.player.availableStates.find((s) => s.name === e);
    return t || (t = this.player.availableStates.find((s) => s.name.startsWith("in-"))), (t == null ? void 0 : t.name) || null;
  }
  get delay() {
    const i = this.element.hasAttribute("delay") ? +(this.element.getAttribute("delay") || 0) : 0;
    return Math.max(i, 0);
  }
  get loading() {
    return this.element.hasAttribute("loading");
  }
  get clickToReplay() {
    return this.element.hasAttribute("click-to-replay");
  }
}
class D {
  constructor(i, e, t) {
    r(this, "connected", !1);
    r(this, "targetState");
    r(this, "delayTimer", null);
    r(this, "intersectionObserver");
    this.player = i, this.element = e, this.targetElement = t, this.onClick = this.onClick.bind(this), this.replay();
  }
  onConnected() {
    this.connected = !0, this.targetElement.addEventListener("click", this.onClick), this.targetState && (this.loading ? this.play(!0) : this.initIntersectionObserver());
  }
  onDisconnected() {
    this.connected = !1, this.targetElement.removeEventListener("click", this.onClick), this.cleanup();
  }
  onComplete() {
    this.resetState();
  }
  onClick() {
    this.player.playing || this.player.playFromStart();
  }
  play(i) {
    this.player.playing || this.delayTimer || (i && this.delay > 0 ? this.scheduleDelayedPlay() : this.player.playFromStart());
  }
  replay() {
    this.player.playing || !this.player.state || !this.intro || (this.targetState = this.player.state, this.player.state = this.intro, this.connected && this.play());
  }
  scheduleDelayedPlay() {
    this.resetDelayTimer(), this.delayTimer = setTimeout(() => {
      this.player.playFromStart(), this.delayTimer = null;
    }, this.delay);
  }
  initIntersectionObserver() {
    if (this.intersectionObserver)
      return;
    const i = (e) => {
      e.forEach((t) => {
        t.isIntersecting && (this.play(!0), this.resetIntersectionObserver());
      });
    };
    this.intersectionObserver = new IntersectionObserver(i, { threshold: 0.5 }), this.intersectionObserver.observe(this.element);
  }
  resetIntersectionObserver() {
    this.intersectionObserver && (this.intersectionObserver.unobserve(this.element), this.intersectionObserver = void 0);
  }
  resetDelayTimer() {
    this.delayTimer && (clearTimeout(this.delayTimer), this.delayTimer = null);
  }
  resetState() {
    this.targetState && (this.player.state = this.targetState, this.targetState = void 0);
  }
  cleanup() {
    this.resetIntersectionObserver(), this.resetDelayTimer(), this.resetState();
  }
  get intro() {
    if (!this.element.hasAttribute("intro"))
      return null;
    const e = this.element.getAttribute("intro");
    let t = this.player.availableStates.find((s) => s.name === e);
    return t || (t = this.player.availableStates.find((s) => s.name.startsWith("in-"))), (t == null ? void 0 : t.name) || null;
  }
  get delay() {
    const i = this.element.hasAttribute("delay") ? +(this.element.getAttribute("delay") || 0) : 0;
    return Math.max(i, 0);
  }
  get loading() {
    return this.element.hasAttribute("loading");
  }
}
class A {
  constructor(i, e, t) {
    r(this, "connected", !1);
    r(this, "targetState");
    r(this, "delayTimer", null);
    r(this, "intersectionObserver");
    this.player = i, this.element = e, this.targetElement = t, this.onHover = this.onHover.bind(this), this.onClick = this.onClick.bind(this), this.replay();
  }
  onConnected() {
    this.connected = !0, this.targetElement.addEventListener("click", this.onClick), this.targetElement.addEventListener("mouseenter", this.onHover), this.targetState && (this.loading ? this.play(!0) : this.initIntersectionObserver());
  }
  onDisconnected() {
    this.connected = !1, this.targetElement.removeEventListener("click", this.onClick), this.targetElement.removeEventListener("mouseenter", this.onHover), this.cleanup();
  }
  onComplete() {
    this.resetState();
  }
  onHover() {
    this.targetState || this.play();
  }
  onClick() {
    this.clickToReplay && this.replay();
  }
  play(i) {
    this.player.playing || this.delayTimer || (i && this.delay > 0 ? this.scheduleDelayedPlay() : this.player.playFromStart());
  }
  replay() {
    this.player.playing || !this.player.state || !this.intro || (this.targetState = this.player.state, this.player.state = this.intro, this.connected && this.play());
  }
  scheduleDelayedPlay() {
    this.resetDelayTimer(), this.delayTimer = setTimeout(() => {
      this.player.playFromStart(), this.delayTimer = null;
    }, this.delay);
  }
  initIntersectionObserver() {
    if (this.intersectionObserver)
      return;
    const i = (e) => {
      e.forEach((t) => {
        t.isIntersecting && (this.play(!0), this.resetIntersectionObserver());
      });
    };
    this.intersectionObserver = new IntersectionObserver(i, { threshold: 0.5 }), this.intersectionObserver.observe(this.element);
  }
  resetIntersectionObserver() {
    this.intersectionObserver && (this.intersectionObserver.unobserve(this.element), this.intersectionObserver = void 0);
  }
  resetDelayTimer() {
    this.delayTimer && (clearTimeout(this.delayTimer), this.delayTimer = null);
  }
  resetState() {
    this.targetState && (this.player.state = this.targetState, this.targetState = void 0);
  }
  cleanup() {
    this.resetIntersectionObserver(), this.resetDelayTimer(), this.resetState();
  }
  get intro() {
    if (!this.element.hasAttribute("intro"))
      return null;
    const e = this.element.getAttribute("intro");
    let t = this.player.availableStates.find((s) => s.name === e);
    return t || (t = this.player.availableStates.find((s) => s.name.startsWith("in-"))), (t == null ? void 0 : t.name) || null;
  }
  get delay() {
    const i = this.element.hasAttribute("delay") ? +(this.element.getAttribute("delay") || 0) : 0;
    return Math.max(i, 0);
  }
  get loading() {
    return this.element.hasAttribute("loading");
  }
  get clickToReplay() {
    return this.element.hasAttribute("click-to-replay");
  }
}
class w {
  constructor(i, e, t) {
    r(this, "connected", !1);
    r(this, "delayTimer", null);
    r(this, "intersectionObserver");
    this.player = i, this.element = e, this.targetElement = t, this.onClick = this.onClick.bind(this);
  }
  onConnected() {
    this.connected = !0, this.targetElement.addEventListener("click", this.onClick), this.loading ? this.play(!0) : this.initIntersectionObserver();
  }
  onDisconnected() {
    this.connected = !1, this.targetElement.removeEventListener("click", this.onClick), this.cleanup();
  }
  onClick() {
    this.clickToReplay && this.play();
  }
  play(i) {
    this.player.playing || this.delayTimer || (i && this.delay > 0 ? this.scheduleDelayedPlay() : this.player.playFromStart());
  }
  scheduleDelayedPlay() {
    this.resetDelayTimer(), this.delayTimer = setTimeout(() => {
      this.player.playFromStart(), this.delayTimer = null;
    }, this.delay);
  }
  initIntersectionObserver() {
    if (this.intersectionObserver)
      return;
    const i = (e) => {
      e.forEach((t) => {
        t.isIntersecting && (this.play(!0), this.resetIntersectionObserver());
      });
    };
    this.intersectionObserver = new IntersectionObserver(i, { threshold: 0.5 }), this.intersectionObserver.observe(this.element);
  }
  resetIntersectionObserver() {
    this.intersectionObserver && (this.intersectionObserver.unobserve(this.element), this.intersectionObserver = void 0);
  }
  resetDelayTimer() {
    this.delayTimer && (clearTimeout(this.delayTimer), this.delayTimer = null);
  }
  cleanup() {
    this.resetIntersectionObserver(), this.resetDelayTimer();
  }
  get delay() {
    const i = this.element.hasAttribute("delay") ? +(this.element.getAttribute("delay") || 0) : 0;
    return Math.max(i, 0);
  }
  get loading() {
    return this.element.hasAttribute("loading");
  }
  get clickToReplay() {
    return this.element.hasAttribute("click-to-replay");
  }
}
class M {
  constructor(i, e, t) {
    r(this, "delayTimer", null);
    this.player = i, this.element = e, this.targetElement = t;
  }
  onReady() {
    this.play();
  }
  onComplete() {
    this.play();
  }
  onDisconnected() {
    this.resetDelayTimer();
  }
  play() {
    this.player.playing || this.delayTimer || (this.delay > 0 ? this.scheduleDelayedPlay() : this.player.playFromStart());
  }
  scheduleDelayedPlay() {
    this.resetDelayTimer(), this.delayTimer = setTimeout(() => {
      this.player.playFromStart(), this.delayTimer = null;
    }, this.delay);
  }
  resetDelayTimer() {
    this.delayTimer && (clearTimeout(this.delayTimer), this.delayTimer = null);
  }
  get delay() {
    const i = this.element.hasAttribute("delay") ? +(this.element.getAttribute("delay") || 0) : 0;
    return Math.max(i, 0);
  }
}
class P {
  constructor(i, e, t) {
    r(this, "delayTimer", null);
    r(this, "mouseIn", !1);
    this.player = i, this.element = e, this.targetElement = t, this.onMouseEnter = this.onMouseEnter.bind(this), this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  onConnected() {
    this.targetElement.addEventListener("mouseenter", this.onMouseEnter), this.targetElement.addEventListener("mouseleave", this.onMouseLeave);
  }
  onDisconnected() {
    this.targetElement.removeEventListener("mouseenter", this.onMouseEnter), this.targetElement.removeEventListener("mouseleave", this.onMouseLeave), this.resetDelayTimer();
  }
  onMouseEnter() {
    this.mouseIn = !0, this.play();
  }
  onMouseLeave() {
    this.mouseIn = !1, this.resetDelayTimer();
  }
  onComplete() {
    this.play();
  }
  play() {
    this.player.playing || this.delayTimer || this.mouseIn && (this.delay > 0 ? this.scheduleDelayedPlay() : this.player.playFromStart());
  }
  scheduleDelayedPlay() {
    this.resetDelayTimer(), this.delayTimer = setTimeout(() => {
      this.player.playFromStart(), this.delayTimer = null;
    }, this.delay);
  }
  resetDelayTimer() {
    this.delayTimer && (clearTimeout(this.delayTimer), this.delayTimer = null);
  }
  get delay() {
    const i = this.element.hasAttribute("delay") ? +(this.element.getAttribute("delay") || 0) : 0;
    return Math.max(i, 0);
  }
}
const F = { attributes: !0, childList: !1, subtree: !1, attributeOldValue: !0 };
class q {
  constructor(i, e, t) {
    /**
     * Animation segments for mouse enter and leave actions.
     * segments[0] - segment for mouse enter
     * segments[1] - segment for mouse leave
     */
    r(this, "segments");
    /**
     * Queue to manage playback requests.
     */
    r(this, "queue", []);
    r(this, "mouseIn", !1);
    r(this, "connected", !1);
    r(this, "targetState");
    r(this, "delayTimer", null);
    r(this, "mutationTimer", null);
    r(this, "intersectionObserver");
    r(this, "observer");
    this.player = i, this.element = e, this.targetElement = t, this.onClick = this.onClick.bind(this), this.onMouseEnter = this.onMouseEnter.bind(this), this.onMouseLeave = this.onMouseLeave.bind(this), this.handleState(), this.replay();
  }
  onConnected() {
    this.connected = !0, this.targetElement.addEventListener("click", this.onClick), this.targetElement.addEventListener("mouseenter", this.onMouseEnter), this.targetElement.addEventListener("mouseleave", this.onMouseLeave), this.mode[0] === "class" && this.initMutationObserver(), this.targetState && (this.loading ? this.play(!0) : this.initIntersectionObserver());
  }
  onDisconnected() {
    this.connected = !1, this.targetElement.removeEventListener("click", this.onClick), this.targetElement.removeEventListener("mouseenter", this.onMouseEnter), this.targetElement.removeEventListener("mouseleave", this.onMouseLeave), this.cleanup();
  }
  onMouseEnter() {
    this.mode[0] === "hover" && (this.mouseIn = !0, this.triggerEnter());
  }
  onMouseLeave() {
    this.mode[0] === "hover" && (this.mouseIn = !1, this.triggerLeave());
  }
  onComplete() {
    this.targetState ? (this.resetState(), this.mouseIn && (this.queue.push(0), this.handleQueue())) : this.handleQueue();
  }
  onState() {
    this.handleState();
  }
  onClick() {
    this.clickToReplay && this.replay();
  }
  play(i) {
    this.player.playing || this.delayTimer || (i && this.delay > 0 ? this.scheduleDelayedPlay() : this.player.playFromStart());
  }
  replay() {
    this.player.playing || !this.player.state || !this.intro || (this.targetState = this.player.state, this.player.state = this.intro, this.connected && this.play());
  }
  triggerEnter() {
    this.queue.push(0), this.handleQueue();
  }
  triggerLeave() {
    this.queue.push(1), this.handleQueue();
  }
  scheduleDelayedPlay() {
    this.resetDelayTimer(), this.delayTimer = setTimeout(() => {
      this.player.playFromStart(), this.delayTimer = null;
    }, this.delay);
  }
  /**
   * Processes the segment queue and plays the next segment if the player is not currently playing.
   */
  handleQueue() {
    var e;
    if (this.player.playing)
      return;
    if (this.queue.length >= 2) {
      const t = Math.floor(this.queue.length / 2) * 2;
      for (let s = 0; s < t; s++)
        this.queue.shift();
    }
    if (!this.queue.length)
      return;
    const i = this.queue.shift();
    if (this.segments) {
      const t = (e = this.segments) == null ? void 0 : e[i];
      this.player.direction = 1, this.player.switchSegment(t);
    } else
      this.player.direction = i === 0 ? 1 : -1;
    this.player.play();
  }
  /**
   * Updates the animation segments based on the current player state and parameters.
   */
  handleState() {
    this.segments = void 0;
    const i = this.player.availableStates.find((l) => l.name === this.player.state);
    if (!i)
      return;
    let e = 0;
    if (i.params.length) {
      const l = parseFloat(i.params[0]);
      !isNaN(l) && l > 0 && l <= 1 && (e = l);
    }
    if (!e)
      return;
    const t = [
      i.time,
      i.time + Math.floor((i.duration + 1) * e)
    ], s = [
      t[1],
      i.time + i.duration + 1
    ];
    this.segments = [
      t,
      s
    ];
    const a = this.mode;
    a[0] === "class" && this.targetElement.classList.contains(a[1]) && (this.player.switchSegment(t), this.player.frame = t[0]);
  }
  initIntersectionObserver() {
    if (this.intersectionObserver)
      return;
    const i = (e) => {
      e.forEach((t) => {
        t.isIntersecting && (this.play(!0), this.resetIntersectionObserver());
      });
    };
    this.intersectionObserver = new IntersectionObserver(i, { threshold: 0.5 }), this.intersectionObserver.observe(this.element);
  }
  resetIntersectionObserver() {
    this.intersectionObserver && (this.intersectionObserver.unobserve(this.element), this.intersectionObserver = void 0);
  }
  initMutationObserver() {
    this.observer || (this.observer = new MutationObserver((i) => {
      const e = this.mode;
      if (e[0] !== "class")
        return;
      const t = e[1] || "";
      for (const s of i)
        if (s.type === "attributes" && ["class"].includes(s.attributeName)) {
          const a = (s.oldValue || "").split(" ").includes(t), l = (this.targetElement.getAttribute("class") || "").split(" ").includes(t);
          a !== l && (clearTimeout(this.mutationTimer), this.mutationTimer = setTimeout(() => {
            l ? this.triggerEnter() : this.triggerLeave();
          }, 10));
        }
    })), this.observer.observe(this.targetElement, F);
  }
  resetMutationObserver() {
    clearTimeout(this.mutationTimer), this.mutationTimer = null, this.observer && (this.observer.disconnect(), this.observer = void 0);
  }
  resetDelayTimer() {
    this.delayTimer && (clearTimeout(this.delayTimer), this.delayTimer = null);
  }
  resetState() {
    return this.targetState ? (this.player.state = this.targetState, this.targetState = void 0, !0) : !1;
  }
  resetPlayer() {
    this.player.direction = 1, this.segments && (this.player.switchSegment([
      this.segments[0][0],
      this.segments[1][1]
    ]), this.segments = void 0, this.queue = []);
  }
  cleanup() {
    this.resetPlayer(), this.resetIntersectionObserver(), this.resetMutationObserver(), this.resetDelayTimer(), this.resetState();
  }
  get intro() {
    if (!this.element.hasAttribute("intro"))
      return null;
    const e = this.element.getAttribute("intro");
    let t = this.player.availableStates.find((s) => s.name === e);
    return t || (t = this.player.availableStates.find((s) => s.name.startsWith("in-"))), (t == null ? void 0 : t.name) || null;
  }
  get delay() {
    const i = this.element.hasAttribute("delay") ? +(this.element.getAttribute("delay") || 0) : 0;
    return Math.max(i, 0);
  }
  get loading() {
    return this.element.hasAttribute("loading");
  }
  get clickToReplay() {
    return this.element.hasAttribute("click-to-replay");
  }
  get mode() {
    if (this.element.hasAttribute("mode")) {
      const i = this.element.getAttribute("mode"), e = (i == null ? void 0 : i.split(":")) || [];
      if (e.length > 0 && ["hover", "class", "manual"].includes(e[0]))
        return e[0] === "class" ? [e[0], e[1] || "active"] : [e[0]];
    }
    return ["hover"];
  }
}
const m = /^\d*(\.\d+)?$/, R = { attributes: !0, childList: !1, subtree: !1 };
class x {
  constructor(i, e, t) {
    r(this, "sequenceIndex", 0);
    r(this, "frameState", null);
    r(this, "frameDelayFirst", null);
    r(this, "frameDelayLast", null);
    r(this, "timer");
    r(this, "observer");
    this.player = i, this.element = e, this.targetElement = t, this.observer = new MutationObserver((s) => {
      for (const a of s)
        a.type === "attributes" && ["sequence", "speed"].includes(a.attributeName) && (this.reset(), this.step());
    });
  }
  onReady() {
    this.step();
  }
  onComplete() {
    this.timer = setTimeout(() => {
      this.timer = null, this.frameDelayLast = null, this.step();
    }, this.frameDelayLast || 0);
  }
  onConnected() {
    this.observer.observe(this.element, R), this.player.speed = this.speed;
  }
  onDisconnected() {
    this.observer.disconnect(), this.timer && (clearTimeout(this.timer), this.timer = null), this.player.speed = 1;
  }
  reset() {
    this.player.pause(), this.player.speed = this.speed, this.sequenceIndex = 0, this.frameState = this.frameDelayFirst = this.frameDelayLast = null, this.timer && (clearTimeout(this.timer), this.timer = null);
  }
  takeStep() {
    const i = this.sequence.split(","), e = i[this.sequenceIndex];
    this.sequenceIndex++, this.sequenceIndex >= i.length && (this.sequenceIndex = 0);
    const [t, ...s] = e.split(":");
    return { action: t, params: s };
  }
  handleStep(i, e) {
    if (i === "play")
      this.frameState !== null && (this.player.state = this.frameState, this.frameState = null), e.includes("reverse") ? (this.player.seekToEnd(), this.player.direction = -1) : (this.player.seekToStart(), this.player.direction = 1), this.timer = setTimeout(() => {
        this.timer = null, this.frameDelayFirst = null, this.player.play();
      }, this.frameDelayFirst || 0);
    else if (i === "frame") {
      this.frameState !== null && (this.player.state = this.frameState, this.frameState = null);
      let t = 0, s = 0;
      e.length >= 1 && e[0].match(m) && (t = +e[0]), e.length >= 2 && e[1].match(m) ? s = Math.max(0, t, +e[1]) : s = t;
      const a = [t, s], l = this.player.availableStates.find((c) => c.name === this.player.state);
      l && (a[0] += l.time, a[1] += l.time), t === s ? (this.player.frame = t, this.timer = setTimeout(() => {
        this.timer = null, this.frameDelayFirst = null, this.step();
      }, this.frameDelayFirst || 0)) : this.timer = setTimeout(() => {
        this.timer = null, this.frameDelayFirst = null, this.player.switchSegment(a), this.player.play();
      }, this.frameDelayFirst || 0);
    } else if (i === "state")
      this.frameState = e[0] || null, this.step();
    else if (i === "delay") {
      let t = null;
      for (const s of e)
        s && s.match(m) && (t = +s);
      t && t > 0 && (e.includes("first") && e.includes("last") ? (this.frameDelayFirst = t, this.frameDelayLast = t) : e.includes("first") ? this.frameDelayFirst = t : e.includes("last") ? this.frameDelayLast = t : this.frameDelayFirst = t), this.step();
    } else if (i !== "idle") throw new Error(`Invalid sequence action: ${i}`);
  }
  step() {
    const { action: i, params: e } = this.takeStep();
    i && this.handleStep(i, e);
  }
  get sequence() {
    return this.element.getAttribute("sequence") || "";
  }
  get speed() {
    return this.element.hasAttribute("speed") ? +(this.element.getAttribute("speed") || 1) : 1;
  }
}
function V() {
  h.defineTrigger("in", w), h.defineTrigger("click", D), h.defineTrigger("hover", A), h.defineTrigger("loop", M), h.defineTrigger("loop-on-hover", P), h.defineTrigger("morph", q), h.defineTrigger("boomerang", L), h.defineTrigger("sequence", x), (!customElements.get || !customElements.get("lord-icon")) && customElements.define("lord-icon", h);
}
export {
  L as Boomerang,
  D as Click,
  h as Element,
  A as Hover,
  w as In,
  M as Loop,
  P as LoopOnHover,
  q as Morph,
  B as Player,
  x as Sequence,
  V as defineElement
};