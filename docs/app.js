/* Glove80 keymap cheat sheet + key tester.
 * Vanilla JS, no build step. Reads the global KEYMAP from keymap-data.js.
 *
 * Sections:
 *   1. Constants & helpers
 *   2. Key-type classification
 *   3. Board rendering (keys + combos)
 *   4. Layer tabs
 *   5. event.code -> position map (from the default layer)
 *   6. Tester (keydown/keyup, readout, log)
 *   7. Boot
 */

(function () {
  "use strict";

  /* ---------- 1. Constants & helpers ---------- */

  // px per geometry unit and the drawn key box (kept in sync with CSS).
  const UNIT = 58;
  const KEY = 50;
  const PAD = 14; // inner padding around the board content

  // A hold value in this set means the key is a home-row / thumb modifier.
  const MOD_TOKENS = new Set([
    "LCTL", "RCTL", "LCTRL", "RCTRL",
    "LALT", "RALT", "LGUI", "RGUI",
    "LSFT", "RSFT", "LSHFT", "RSHFT",
  ]);

  const LAYER_SET = new Set(KEYMAP.layerOrder);

  // Mouse speed sublayers are co-active overlays held WHILE in the Mouse layer
  // (they scale cursor speed), not standalone layers you navigate to — so they
  // don't get their own tab.
  const HIDDEN_LAYERS = new Set(["mouse_slow", "mouse_fast", "mouse_warp"]);

  // How you reach each layer. Hand-maintained: update if the thumb assignments
  // change. Keys match KEYMAP.layerOrder.
  const ACTIVATION = {
    default: "Base layer — always active.",
    lower: "Activate: hold the Lower thumb (left inner-bottom); double-tap to lock.",
    magic: "Activate: hold the Magic key (bottom-left corner).",
    factory_test: "Activate: from the Magic layer, press the bottom-right key (manufacturing test).",
    cursor: "Activate: hold the Backspace thumb (left outer-top).",
    mouse: "Activate: hold the Enter thumb (right outer-mid). The Slow / Fast / Warp keys shown here scale cursor speed while held.",
    number: "Activate: hold the Delete thumb (left outer-mid).",
    symbol: "Activate: hold the Space thumb (right outer-top).",
  };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function isEmptyTap(tap) {
    return !tap || tap === "▽" || tap === "none" || tap === "NONE";
  }

  /* ---------- 2. Key-type classification ---------- */

  // Returns "trans" | "held" | "macro" | "layer" | "mod" | "plain".
  function classify(entry) {
    const tap = entry.tap || "";
    const hold = entry.hold;

    if (tap === "(held)") return "held";
    if (isEmptyTap(tap) && !hold) return "trans";
    if (tap.startsWith("&") && tap.length > 1) return "macro"; // not the bare "&" symbol

    // hold is a layer name -> layer access
    if (hold && LAYER_SET.has(hold)) return "layer";
    // bare label that is a layer name (e.g. mouse_fast on the mouse layer)
    if (!hold && LAYER_SET.has(tap)) return "layer";
    // toggle-to-layer holds (e.g. {t: default, h: toggle})
    if (hold === "toggle" && LAYER_SET.has(tap)) return "layer";

    // hold is a modifier
    if (hold && MOD_TOKENS.has(hold)) return "mod";

    return "plain";
  }

  /* ---------- 3. Board rendering ---------- */

  const board = document.getElementById("board");

  // Compute board pixel size from geometry once.
  const geom = KEYMAP.geometry;
  let maxX = 0, maxY = 0;
  for (const g of geom) {
    if (g.x > maxX) maxX = g.x;
    if (g.y > maxY) maxY = g.y;
  }
  const boardW = maxX * UNIT + KEY + PAD * 2;
  const boardH = maxY * UNIT + KEY + PAD * 2;
  board.style.width = boardW + "px";
  board.style.height = boardH + "px";

  // One reusable DOM node per physical position.
  const keyNodes = new Array(80);

  function keyXY(pos) {
    const g = geom[pos];
    return { x: g.x * UNIT + PAD, y: g.y * UNIT + PAD };
  }

  function buildKeys() {
    for (let pos = 0; pos < 80; pos++) {
      const { x, y } = keyXY(pos);
      const node = el("div", "key");
      node.style.left = x + "px";
      node.style.top = y + "px";
      node.dataset.pos = String(pos);

      const tapEl = el("span", "tap");
      const holdEl = el("span", "hold");
      node.appendChild(tapEl);
      node.appendChild(holdEl);

      board.appendChild(node);
      keyNodes[pos] = node;
    }
  }

  function prettyHold(hold) {
    if (!hold) return "";
    if (LAYER_SET.has(hold)) {
      // show the display name for the layer
      const idx = KEYMAP.layerOrder.indexOf(hold);
      return idx >= 0 ? KEYMAP.layerNames[idx] : hold;
    }
    return hold;
  }

  // Combo overlay (SVG lines + HTML badges), rebuilt per layer.
  let comboLayer = null;

  function clearCombos() {
    if (comboLayer) {
      comboLayer.remove();
      comboLayer = null;
    }
  }

  function drawCombos() {
    clearCombos();
    const svgNS = "http://www.w3.org/2000/svg";
    const wrap = el("div", "combo-layer");

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(boardW));
    svg.setAttribute("height", String(boardH));
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    wrap.appendChild(svg);

    for (const combo of KEYMAP.combos) {
      const [a, b] = combo.positions;
      const pa = keyXY(a), pb = keyXY(b);
      const cax = pa.x + KEY / 2, cay = pa.y + KEY / 2;
      const cbx = pb.x + KEY / 2, cby = pb.y + KEY / 2;

      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", String(cax));
      line.setAttribute("y1", String(cay));
      line.setAttribute("x2", String(cbx));
      line.setAttribute("y2", String(cby));
      line.setAttribute("class", "combo-line");
      svg.appendChild(line);

      const badge = el("div", "combo-badge", combo.label);
      badge.style.left = (cax + cbx) / 2 + "px";
      badge.style.top = (cay + cby) / 2 + "px";
      wrap.appendChild(badge);
    }

    board.appendChild(wrap);
  }

  let currentLayer = KEYMAP.layerOrder[0];

  function renderLayer(layerKey) {
    currentLayer = layerKey;
    const entries = KEYMAP.layers[layerKey];

    for (let pos = 0; pos < 80; pos++) {
      const entry = entries[pos];
      const node = keyNodes[pos];
      const type = classify(entry);

      node.className = "key type-" + type;
      node.dataset.type = type;

      const tapEl = node.querySelector(".tap");
      const holdEl = node.querySelector(".hold");

      let tapText = entry.tap || "";
      if (type === "trans") tapText = "▽";
      if (type === "macro") tapText = tapText.replace(/^&/, "");
      if (type === "held") tapText = "held";

      tapEl.textContent = tapText;

      const holdText = prettyHold(entry.hold);
      holdEl.textContent = holdText;
      holdEl.style.display = holdText ? "" : "none";
    }

    // Combos are only meaningful on the default layer.
    if (layerKey === KEYMAP.layerOrder[0]) {
      drawCombos();
    } else {
      clearCombos();
    }
  }

  /* ---------- 4. Layer tabs ---------- */

  const tabsContainer = document.getElementById("layer-tabs");
  const activationEl = document.getElementById("layer-activation");
  const tabButtons = [];

  function buildTabs() {
    KEYMAP.layerOrder.forEach((key, i) => {
      if (HIDDEN_LAYERS.has(key)) return;
      const btn = el("button", "layer-tab", KEYMAP.layerNames[i]);
      btn.type = "button";
      btn.dataset.layer = key;
      btn.addEventListener("click", () => selectLayer(key));
      tabsContainer.appendChild(btn);
      tabButtons.push(btn);
    });
  }

  function selectLayer(key) {
    tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.layer === key));
    renderLayer(key);
    activationEl.textContent = ACTIVATION[key] || "";
  }

  /* ---------- 5. event.code -> position map ---------- */

  // Direct mapping from a normalized key label (as it appears on the default
  // layer) to event.code. Built once, then inverted to code -> position.
  const LABEL_TO_CODE = {
    // letters
    A: "KeyA", B: "KeyB", C: "KeyC", D: "KeyD", E: "KeyE", F: "KeyF",
    G: "KeyG", H: "KeyH", I: "KeyI", J: "KeyJ", K: "KeyK", L: "KeyL",
    M: "KeyM", N: "KeyN", O: "KeyO", P: "KeyP", Q: "KeyQ", R: "KeyR",
    S: "KeyS", T: "KeyT", U: "KeyU", V: "KeyV", W: "KeyW", X: "KeyX",
    Y: "KeyY", Z: "KeyZ",
    // digits
    "0": "Digit0", "1": "Digit1", "2": "Digit2", "3": "Digit3", "4": "Digit4",
    "5": "Digit5", "6": "Digit6", "7": "Digit7", "8": "Digit8", "9": "Digit9",
    // punctuation / symbols (default layer labels)
    "-": "Minus", "=": "Equal",
    "[": "BracketLeft", "]": "BracketRight", "\\": "Backslash",
    ";": "Semicolon", "'": "Quote", ",": "Comma", ".": "Period", "/": "Slash",
    "`": "Backquote",
    // named keys (match the labels keymap-drawer emits)
    TAB: "Tab", BSPC: "Backspace", RET: "Enter", SPACE: "Space",
    ESC: "Escape", DEL: "Delete",
    UP: "ArrowUp", DOWN: "ArrowDown", LEFT: "ArrowLeft", RIGHT: "ArrowRight",
    HOME: "Home", END: "End", "PG UP": "PageUp", "PG DN": "PageDown",
    // function row
    F1: "F1", F2: "F2", F3: "F3", F4: "F4", F5: "F5",
    F6: "F6", F7: "F7", F8: "F8", F9: "F9", F10: "F10",
  };

  // codeToPos: event.code -> physical position (from default layer).
  const codeToPos = {};

  function buildCodeMap() {
    const def = KEYMAP.layers[KEYMAP.layerOrder[0]];
    for (let pos = 0; pos < 80; pos++) {
      const label = def[pos].tap;
      const code = LABEL_TO_CODE[label];
      // First-wins: the default layer has each of these labels once.
      if (code && codeToPos[code] === undefined) {
        codeToPos[code] = pos;
      }
    }
  }

  /* ---------- 6. Tester ---------- */

  const testToggle = document.getElementById("test-toggle");
  const testerSection = document.getElementById("tester");
  const roKey = document.getElementById("ro-key");
  const roCode = document.getElementById("ro-code");
  const modChips = {
    shift: document.querySelector('.mod-chip[data-mod="shift"]'),
    ctrl: document.querySelector('.mod-chip[data-mod="ctrl"]'),
    alt: document.querySelector('.mod-chip[data-mod="alt"]'),
    meta: document.querySelector('.mod-chip[data-mod="meta"]'),
  };
  const eventLog = document.getElementById("event-log");

  let testing = false;
  const logEntries = [];
  const MAX_LOG = 12;

  function setEmptyLog() {
    eventLog.innerHTML = "";
    const li = el("li", "empty", "Press keys to see what your keyboard sent…");
    eventLog.appendChild(li);
  }

  function describeMods(e) {
    const parts = [];
    if (e.shiftKey) parts.push("Shift");
    if (e.ctrlKey) parts.push("Ctrl");
    if (e.altKey) parts.push("Alt");
    if (e.metaKey) parts.push("Meta");
    return parts;
  }

  function updateModChips(e) {
    modChips.shift.classList.toggle("active", e.shiftKey);
    modChips.ctrl.classList.toggle("active", e.ctrlKey);
    modChips.alt.classList.toggle("active", e.altKey);
    modChips.meta.classList.toggle("active", e.metaKey);
  }

  function keyDisplay(e) {
    if (e.key === " ") return "Space";
    if (e.key && e.key.length === 1) return e.key;
    return e.key || "?";
  }

  function pushLog(e) {
    const mods = describeMods(e);
    logEntries.unshift({
      key: keyDisplay(e),
      code: e.code || "(none)",
      mods: mods.join("+"),
    });
    if (logEntries.length > MAX_LOG) logEntries.pop();

    eventLog.innerHTML = "";
    for (const entry of logEntries) {
      const li = el("li");
      li.appendChild(el("span", "ev-key", entry.key));
      li.appendChild(el("span", "ev-code", entry.code));
      li.appendChild(el("span", "ev-mods", entry.mods || "—"));
      eventLog.appendChild(li);
    }
  }

  function litKey(pos) {
    const node = keyNodes[pos];
    if (node) node.classList.add("lit");
  }
  function unlitKey(pos) {
    const node = keyNodes[pos];
    if (node) node.classList.remove("lit");
  }

  function onKeyDown(e) {
    if (!testing) return;
    // Don't swallow refresh/devtools shortcuts; otherwise capture everything.
    e.preventDefault();

    roKey.textContent = keyDisplay(e);
    roCode.textContent = e.code || "(none)";
    updateModChips(e);

    const pos = codeToPos[e.code];
    if (pos !== undefined) litKey(pos);

    if (!e.repeat) pushLog(e);
  }

  function onKeyUp(e) {
    if (!testing) return;
    e.preventDefault();
    updateModChips(e);
    const pos = codeToPos[e.code];
    if (pos !== undefined) unlitKey(pos);
  }

  function clearAllLit() {
    for (let pos = 0; pos < 80; pos++) unlitKey(pos);
  }

  function setTesting(on) {
    testing = on;
    testerSection.hidden = !on;
    document.body.classList.toggle("testing", on);
    if (on) {
      setEmptyLog();
      logEntries.length = 0;
    } else {
      clearAllLit();
      // reset modifier chips
      modChips.shift.classList.remove("active");
      modChips.ctrl.classList.remove("active");
      modChips.alt.classList.remove("active");
      modChips.meta.classList.remove("active");
    }
  }

  testToggle.addEventListener("change", () => setTesting(testToggle.checked));
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  // If focus/visibility is lost while a key is held, clear stuck highlights.
  window.addEventListener("blur", clearAllLit);

  /* ---------- 7. Boot ---------- */

  buildKeys();
  buildTabs();
  buildCodeMap();
  selectLayer(KEYMAP.layerOrder[0]);
  setEmptyLog();
})();
