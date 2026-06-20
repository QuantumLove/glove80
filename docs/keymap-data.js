// Seeded once from docs/keymap.yaml (keymap-drawer), then hand-maintained.
// Shifted keys are shown as the symbol they produce (e.g. Shift+4 -> $).
// Keep in sync with config/glove80.keymap; see AGENTS.md.
const KEYMAP = {
  "layerOrder": [
    "default",
    "lower",
    "magic",
    "factory_test",
    "cursor",
    "mouse",
    "mouse_slow",
    "mouse_fast",
    "mouse_warp",
    "number",
    "symbol"
  ],
  "layerNames": [
    "Default",
    "Lower",
    "Magic",
    "Factory Test",
    "Cursor",
    "Mouse",
    "Mouse Slow",
    "Mouse Fast",
    "Mouse Warp",
    "Number",
    "Symbol"
  ],
  "layers": {
    "default": [
      {
        "tap": "F1",
        "hold": null
      },
      {
        "tap": "F2",
        "hold": null
      },
      {
        "tap": "F3",
        "hold": null
      },
      {
        "tap": "F4",
        "hold": null
      },
      {
        "tap": "F5",
        "hold": null
      },
      {
        "tap": "F6",
        "hold": null
      },
      {
        "tap": "F7",
        "hold": null
      },
      {
        "tap": "F8",
        "hold": null
      },
      {
        "tap": "F9",
        "hold": null
      },
      {
        "tap": "F10",
        "hold": null
      },
      {
        "tap": "=",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "-",
        "hold": null
      },
      {
        "tap": "TAB",
        "hold": null
      },
      {
        "tap": "Q",
        "hold": null
      },
      {
        "tap": "W",
        "hold": null
      },
      {
        "tap": "E",
        "hold": null
      },
      {
        "tap": "R",
        "hold": null
      },
      {
        "tap": "T",
        "hold": null
      },
      {
        "tap": "Y",
        "hold": null
      },
      {
        "tap": "U",
        "hold": null
      },
      {
        "tap": "I",
        "hold": null
      },
      {
        "tap": "O",
        "hold": null
      },
      {
        "tap": "P",
        "hold": null
      },
      {
        "tap": "\\",
        "hold": null
      },
      {
        "tap": "ESC",
        "hold": null
      },
      {
        "tap": "A",
        "hold": "LCTL"
      },
      {
        "tap": "S",
        "hold": "LALT"
      },
      {
        "tap": "D",
        "hold": "LGUI"
      },
      {
        "tap": "F",
        "hold": "LSFT"
      },
      {
        "tap": "G",
        "hold": null
      },
      {
        "tap": "H",
        "hold": null
      },
      {
        "tap": "J",
        "hold": "LSFT"
      },
      {
        "tap": "K",
        "hold": "LGUI"
      },
      {
        "tap": "L",
        "hold": "LALT"
      },
      {
        "tap": ";",
        "hold": "LCTL"
      },
      {
        "tap": "'",
        "hold": null
      },
      {
        "tap": "`",
        "hold": null
      },
      {
        "tap": "Z",
        "hold": null
      },
      {
        "tap": "X",
        "hold": null
      },
      {
        "tap": "C",
        "hold": null
      },
      {
        "tap": "V",
        "hold": null
      },
      {
        "tap": "B",
        "hold": null
      },
      {
        "tap": "LSHFT",
        "hold": "Ctl+Sft+Gui+LALT"
      },
      {
        "tap": "LCTRL",
        "hold": null
      },
      {
        "tap": "&layer_td",
        "hold": null
      },
      {
        "tap": "LGUI",
        "hold": null
      },
      {
        "tap": "RCTRL",
        "hold": null
      },
      {
        "tap": "Gui+F19",
        "hold": "Gui+F18"
      },
      {
        "tap": "N",
        "hold": null
      },
      {
        "tap": "M",
        "hold": null
      },
      {
        "tap": ",",
        "hold": null
      },
      {
        "tap": ".",
        "hold": null
      },
      {
        "tap": "/",
        "hold": null
      },
      {
        "tap": "PG UP",
        "hold": null
      },
      {
        "tap": "&rgb_ug_status_macro",
        "hold": "magic"
      },
      {
        "tap": "HOME",
        "hold": null
      },
      {
        "tap": "END",
        "hold": null
      },
      {
        "tap": "LEFT",
        "hold": null
      },
      {
        "tap": "RIGHT",
        "hold": null
      },
      {
        "tap": "BSPC",
        "hold": "cursor"
      },
      {
        "tap": "DEL",
        "hold": "number"
      },
      {
        "tap": "LALT",
        "hold": null
      },
      {
        "tap": "RALT",
        "hold": null
      },
      {
        "tap": "RET",
        "hold": "mouse"
      },
      {
        "tap": "SPACE",
        "hold": "symbol"
      },
      {
        "tap": "UP",
        "hold": null
      },
      {
        "tap": "DOWN",
        "hold": null
      },
      {
        "tap": "[",
        "hold": null
      },
      {
        "tap": "]",
        "hold": null
      },
      {
        "tap": "PG DN",
        "hold": null
      }
    ],
    "lower": [
      {
        "tap": "BRI DN",
        "hold": null
      },
      {
        "tap": "BRI UP",
        "hold": null
      },
      {
        "tap": "PREV",
        "hold": null
      },
      {
        "tap": "NEXT",
        "hold": null
      },
      {
        "tap": "PP",
        "hold": null
      },
      {
        "tap": "MUTE",
        "hold": null
      },
      {
        "tap": "VOL DN",
        "hold": null
      },
      {
        "tap": "VOL UP",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "PAUSE BREAK",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "HOME",
        "hold": null
      },
      {
        "tap": "(",
        "hold": null
      },
      {
        "tap": "KP NUM",
        "hold": null
      },
      {
        "tap": "KP EQUAL",
        "hold": null
      },
      {
        "tap": "KP DIVIDE",
        "hold": null
      },
      {
        "tap": "KP MULTIPLY",
        "hold": null
      },
      {
        "tap": "PSCRN",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "UP",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "END",
        "hold": null
      },
      {
        "tap": ")",
        "hold": null
      },
      {
        "tap": "KP 7",
        "hold": null
      },
      {
        "tap": "KP 8",
        "hold": null
      },
      {
        "tap": "KP 9",
        "hold": null
      },
      {
        "tap": "KP MINUS",
        "hold": null
      },
      {
        "tap": "SLCK",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "LEFT",
        "hold": null
      },
      {
        "tap": "DOWN",
        "hold": null
      },
      {
        "tap": "RIGHT",
        "hold": null
      },
      {
        "tap": "PG UP",
        "hold": null
      },
      {
        "tap": "%",
        "hold": null
      },
      {
        "tap": "KP 4",
        "hold": null
      },
      {
        "tap": "KP 5",
        "hold": null
      },
      {
        "tap": "KP 6",
        "hold": null
      },
      {
        "tap": "KP PLUS",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "CMENU",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "F11",
        "hold": null
      },
      {
        "tap": "F12",
        "hold": null
      },
      {
        "tap": "PG DN",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "default",
        "hold": "toggle"
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": ",",
        "hold": null
      },
      {
        "tap": "KP 1",
        "hold": null
      },
      {
        "tap": "KP 2",
        "hold": null
      },
      {
        "tap": "KP 3",
        "hold": null
      },
      {
        "tap": "KP ENTER",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "CAPS",
        "hold": null
      },
      {
        "tap": "INS",
        "hold": null
      },
      {
        "tap": "F11",
        "hold": null
      },
      {
        "tap": "F12",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "KP 0",
        "hold": null
      },
      {
        "tap": "KP 0",
        "hold": null
      },
      {
        "tap": "KP DOT",
        "hold": null
      },
      {
        "tap": "KP ENTER",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      }
    ],
    "magic": [
      {
        "tap": "BT CLR",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "BT CLR ALL",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "RGB SPI",
        "hold": null
      },
      {
        "tap": "RGB SAI",
        "hold": null
      },
      {
        "tap": "RGB HUI",
        "hold": null
      },
      {
        "tap": "RGB BRI",
        "hold": null
      },
      {
        "tap": "RGB TOG",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "&bootloader",
        "hold": null
      },
      {
        "tap": "RGB SPD",
        "hold": null
      },
      {
        "tap": "RGB SAD",
        "hold": null
      },
      {
        "tap": "RGB HUD",
        "hold": null
      },
      {
        "tap": "RGB BRD",
        "hold": null
      },
      {
        "tap": "RGB EFF",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "&bootloader",
        "hold": null
      },
      {
        "tap": "&sys_reset",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "&bt_2",
        "hold": null
      },
      {
        "tap": "&bt_3",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "&sys_reset",
        "hold": null
      },
      {
        "tap": "(held)",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "&bt_0",
        "hold": null
      },
      {
        "tap": "&bt_1",
        "hold": null
      },
      {
        "tap": "OUT USB",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "factory_test",
        "hold": "toggle"
      }
    ],
    "factory_test": [
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      }
    ],
    "cursor": [
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "ESC",
        "hold": null
      },
      {
        "tap": "INS",
        "hold": null
      },
      {
        "tap": "⇧Tab",
        "hold": null
      },
      {
        "tap": "DEL",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "⇧Tab",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "RET",
        "hold": null
      },
      {
        "tap": "SPACE",
        "hold": null
      },
      {
        "tap": "TAB",
        "hold": null
      },
      {
        "tap": "BSPC",
        "hold": null
      },
      {
        "tap": "Gui+X",
        "hold": null
      },
      {
        "tap": "Gui+X",
        "hold": null
      },
      {
        "tap": "⇧Tab",
        "hold": null
      },
      {
        "tap": "Gui+Z",
        "hold": null
      },
      {
        "tap": "Gui+Sft+Z",
        "hold": null
      },
      {
        "tap": "TAB",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "LSHFT",
        "hold": "sticky"
      },
      {
        "tap": "LCTRL",
        "hold": null
      },
      {
        "tap": "LALT",
        "hold": null
      },
      {
        "tap": "LGUI",
        "hold": null
      },
      {
        "tap": "LSHFT",
        "hold": null
      },
      {
        "tap": "Gui+C",
        "hold": null
      },
      {
        "tap": "Gui+C",
        "hold": null
      },
      {
        "tap": "LEFT",
        "hold": null
      },
      {
        "tap": "UP",
        "hold": null
      },
      {
        "tap": "DOWN",
        "hold": null
      },
      {
        "tap": "RIGHT",
        "hold": null
      },
      {
        "tap": "LSHFT",
        "hold": "sticky"
      },
      {
        "tap": "Gui+L",
        "hold": null
      },
      {
        "tap": "&select_all",
        "hold": null
      },
      {
        "tap": "&select_line",
        "hold": null
      },
      {
        "tap": "&select_word",
        "hold": null
      },
      {
        "tap": "Gui+F",
        "hold": null
      },
      {
        "tap": "Gui+V",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "Gui+V",
        "hold": null
      },
      {
        "tap": "Gui+LEFT",
        "hold": null
      },
      {
        "tap": "PG UP",
        "hold": null
      },
      {
        "tap": "PG DN",
        "hold": null
      },
      {
        "tap": "Gui+RIGHT",
        "hold": null
      },
      {
        "tap": "Gui+L",
        "hold": null
      },
      {
        "tap": "Gui+K",
        "hold": null
      },
      {
        "tap": "Gui+Z",
        "hold": null
      },
      {
        "tap": "Gui+Sft+Z",
        "hold": null
      },
      {
        "tap": "Gui+Sft+G",
        "hold": null
      },
      {
        "tap": "Gui+G",
        "hold": null
      },
      {
        "tap": "(held)",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "Gui+F",
        "hold": null
      },
      {
        "tap": "Gui+Sft+G",
        "hold": null
      },
      {
        "tap": "Gui+G",
        "hold": null
      },
      {
        "tap": "Gui+H",
        "hold": null
      },
      {
        "tap": "Gui+K",
        "hold": null
      }
    ],
    "mouse": [
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "&msc SCRL_LEFT",
        "hold": null
      },
      {
        "tap": "&mmv MOVE_UP",
        "hold": null
      },
      {
        "tap": "&msc SCRL_RIGHT",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "&msc SCRL_LEFT",
        "hold": null
      },
      {
        "tap": "&mkp LCLK",
        "hold": null
      },
      {
        "tap": "&mkp MCLK",
        "hold": null
      },
      {
        "tap": "&mkp RCLK",
        "hold": null
      },
      {
        "tap": "&msc SCRL_RIGHT",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "&msc SCRL_UP",
        "hold": null
      },
      {
        "tap": "&mmv MOVE_LEFT",
        "hold": null
      },
      {
        "tap": "&mmv MOVE_DOWN",
        "hold": null
      },
      {
        "tap": "&mmv MOVE_RIGHT",
        "hold": null
      },
      {
        "tap": "&msc SCRL_UP",
        "hold": null
      },
      {
        "tap": "&msc SCRL_UP",
        "hold": null
      },
      {
        "tap": "mouse_fast",
        "hold": null
      },
      {
        "tap": "mouse_warp",
        "hold": null
      },
      {
        "tap": "mouse_slow",
        "hold": null
      },
      {
        "tap": "APP",
        "hold": null
      },
      {
        "tap": "&mkp MB4",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "&msc SCRL_DOWN",
        "hold": null
      },
      {
        "tap": "mouse_slow",
        "hold": null
      },
      {
        "tap": "mouse_warp",
        "hold": null
      },
      {
        "tap": "mouse_fast",
        "hold": null
      },
      {
        "tap": "&msc SCRL_DOWN",
        "hold": null
      },
      {
        "tap": "&mkp MCLK",
        "hold": null
      },
      {
        "tap": "APP",
        "hold": null
      },
      {
        "tap": "&mkp MB5",
        "hold": null
      },
      {
        "tap": "Gui+X",
        "hold": null
      },
      {
        "tap": "Gui+C",
        "hold": null
      },
      {
        "tap": "Gui+V",
        "hold": null
      },
      {
        "tap": "&msc SCRL_DOWN",
        "hold": null
      },
      {
        "tap": "&mmv MOVE_LEFT",
        "hold": null
      },
      {
        "tap": "&mmv MOVE_UP",
        "hold": null
      },
      {
        "tap": "&mmv MOVE_DOWN",
        "hold": null
      },
      {
        "tap": "&mmv MOVE_RIGHT",
        "hold": null
      },
      {
        "tap": "&mkp MB5",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "Gui+X",
        "hold": null
      },
      {
        "tap": "Gui+C",
        "hold": null
      },
      {
        "tap": "Gui+V",
        "hold": null
      },
      {
        "tap": "&mkp LCLK",
        "hold": null
      },
      {
        "tap": "&mkp RCLK",
        "hold": null
      },
      {
        "tap": "&mkp MB4",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "(held)",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      }
    ],
    "mouse_slow": [
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "(held)",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "(held)",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      }
    ],
    "mouse_fast": [
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "(held)",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "(held)",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      }
    ],
    "mouse_warp": [
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "(held)",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "(held)",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      }
    ],
    "number": [
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "A",
        "hold": null
      },
      {
        "tap": "B",
        "hold": null
      },
      {
        "tap": "C",
        "hold": null
      },
      {
        "tap": "D",
        "hold": null
      },
      {
        "tap": "E",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "ESC",
        "hold": null
      },
      {
        "tap": "INS",
        "hold": null
      },
      {
        "tap": "⇧Tab",
        "hold": null
      },
      {
        "tap": "DEL",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "|",
        "hold": null
      },
      {
        "tap": "#",
        "hold": null
      },
      {
        "tap": "$",
        "hold": null
      },
      {
        "tap": "^",
        "hold": null
      },
      {
        "tap": "~",
        "hold": null
      },
      {
        "tap": "!",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "RET",
        "hold": null
      },
      {
        "tap": "SPACE",
        "hold": null
      },
      {
        "tap": "TAB",
        "hold": null
      },
      {
        "tap": "BSPC",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "⇧G",
        "hold": null
      },
      {
        "tap": "7",
        "hold": null
      },
      {
        "tap": "8",
        "hold": null
      },
      {
        "tap": "9",
        "hold": null
      },
      {
        "tap": ":",
        "hold": null
      },
      {
        "tap": "%",
        "hold": null
      },
      {
        "tap": "LSHFT",
        "hold": "sticky"
      },
      {
        "tap": "LCTL",
        "hold": null
      },
      {
        "tap": "LALT",
        "hold": null
      },
      {
        "tap": "LGUI",
        "hold": null
      },
      {
        "tap": "LSFT",
        "hold": null
      },
      {
        "tap": "X",
        "hold": null
      },
      {
        "tap": "K",
        "hold": null
      },
      {
        "tap": "4",
        "hold": null
      },
      {
        "tap": "5",
        "hold": null
      },
      {
        "tap": "6",
        "hold": null
      },
      {
        "tap": "-",
        "hold": null
      },
      {
        "tap": "+",
        "hold": null
      },
      {
        "tap": "E",
        "hold": null
      },
      {
        "tap": "&select_all",
        "hold": null
      },
      {
        "tap": "&select_line",
        "hold": null
      },
      {
        "tap": "&select_word",
        "hold": null
      },
      {
        "tap": "Gui+F",
        "hold": null
      },
      {
        "tap": "F",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "<",
        "hold": null
      },
      {
        "tap": "=",
        "hold": null
      },
      {
        "tap": ",",
        "hold": null
      },
      {
        "tap": "J",
        "hold": null
      },
      {
        "tap": "1",
        "hold": null
      },
      {
        "tap": "2",
        "hold": null
      },
      {
        "tap": "3",
        "hold": null
      },
      {
        "tap": "/",
        "hold": null
      },
      {
        "tap": "*",
        "hold": null
      },
      {
        "tap": "_",
        "hold": null
      },
      {
        "tap": "Gui+Z",
        "hold": null
      },
      {
        "tap": "Gui+Sft+Z",
        "hold": null
      },
      {
        "tap": "Gui+Sft+G",
        "hold": null
      },
      {
        "tap": "Gui+G",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "number",
        "hold": "toggle"
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": ">",
        "hold": null
      },
      {
        "tap": ".",
        "hold": null
      },
      {
        "tap": "0",
        "hold": null
      },
      {
        "tap": "(",
        "hold": null
      },
      {
        "tap": "[",
        "hold": null
      },
      {
        "tap": "]",
        "hold": null
      },
      {
        "tap": ")",
        "hold": null
      },
      {
        "tap": "@",
        "hold": null
      }
    ],
    "symbol": [
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "`",
        "hold": null
      },
      {
        "tap": "(",
        "hold": null
      },
      {
        "tap": ")",
        "hold": null
      },
      {
        "tap": ";",
        "hold": null
      },
      {
        "tap": ",",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "!",
        "hold": null
      },
      {
        "tap": "[",
        "hold": null
      },
      {
        "tap": "{",
        "hold": null
      },
      {
        "tap": "}",
        "hold": null
      },
      {
        "tap": "]",
        "hold": null
      },
      {
        "tap": "?",
        "hold": null
      },
      {
        "tap": ".",
        "hold": null
      },
      {
        "tap": "DEL",
        "hold": null
      },
      {
        "tap": "⇧Tab",
        "hold": null
      },
      {
        "tap": "INS",
        "hold": null
      },
      {
        "tap": "ESC",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "#",
        "hold": null
      },
      {
        "tap": "^",
        "hold": null
      },
      {
        "tap": "=",
        "hold": null
      },
      {
        "tap": "_",
        "hold": null
      },
      {
        "tap": "$",
        "hold": null
      },
      {
        "tap": "*",
        "hold": null
      },
      {
        "tap": ",",
        "hold": null
      },
      {
        "tap": "BSPC",
        "hold": null
      },
      {
        "tap": "TAB",
        "hold": null
      },
      {
        "tap": "SPACE",
        "hold": null
      },
      {
        "tap": "RET",
        "hold": null
      },
      {
        "tap": "&triple_backtick",
        "hold": null
      },
      {
        "tap": "~",
        "hold": null
      },
      {
        "tap": "<",
        "hold": null
      },
      {
        "tap": "|",
        "hold": null
      },
      {
        "tap": "-",
        "hold": null
      },
      {
        "tap": ">",
        "hold": null
      },
      {
        "tap": "/",
        "hold": null
      },
      {
        "tap": "\\",
        "hold": null
      },
      {
        "tap": ".",
        "hold": null
      },
      {
        "tap": "*",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": ";",
        "hold": null
      },
      {
        "tap": "\"",
        "hold": null
      },
      {
        "tap": "'",
        "hold": null
      },
      {
        "tap": "`",
        "hold": null
      },
      {
        "tap": "\\",
        "hold": null
      },
      {
        "tap": "▽",
        "hold": null
      },
      {
        "tap": "&dot_dot",
        "hold": null
      },
      {
        "tap": "&",
        "hold": null
      },
      {
        "tap": "'",
        "hold": null
      },
      {
        "tap": "\"",
        "hold": null
      },
      {
        "tap": "+",
        "hold": null
      },
      {
        "tap": "%",
        "hold": null
      },
      {
        "tap": ":",
        "hold": null
      },
      {
        "tap": "@",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      },
      {
        "tap": "symbol",
        "hold": "toggle"
      },
      {
        "tap": "LSFT",
        "hold": null
      },
      {
        "tap": "LGUI",
        "hold": null
      },
      {
        "tap": "LALT",
        "hold": null
      },
      {
        "tap": "LCTL",
        "hold": null
      },
      {
        "tap": "",
        "hold": null
      }
    ]
  },
  "combos": [
    {
      "positions": [
        52,
        69
      ],
      "label": "Cmd+Tab"
    },
    {
      "positions": [
        53,
        70
      ],
      "label": "Ctrl+Tab"
    }
  ],
  "geometry": [
    {
      "pos": 0,
      "x": 0,
      "y": 0.55
    },
    {
      "pos": 1,
      "x": 1,
      "y": 0.55
    },
    {
      "pos": 2,
      "x": 2,
      "y": 0.28
    },
    {
      "pos": 3,
      "x": 3,
      "y": 0.18
    },
    {
      "pos": 4,
      "x": 4,
      "y": 0.42
    },
    {
      "pos": 5,
      "x": 8.6,
      "y": 0.42
    },
    {
      "pos": 6,
      "x": 9.6,
      "y": 0.18
    },
    {
      "pos": 7,
      "x": 10.6,
      "y": 0.28
    },
    {
      "pos": 8,
      "x": 11.6,
      "y": 0.55
    },
    {
      "pos": 9,
      "x": 12.6,
      "y": 0.55
    },
    {
      "pos": 10,
      "x": 0,
      "y": 1.55
    },
    {
      "pos": 11,
      "x": 1,
      "y": 1.55
    },
    {
      "pos": 12,
      "x": 2,
      "y": 1.28
    },
    {
      "pos": 13,
      "x": 3,
      "y": 1.18
    },
    {
      "pos": 14,
      "x": 4,
      "y": 1.42
    },
    {
      "pos": 15,
      "x": 5,
      "y": 1.5
    },
    {
      "pos": 16,
      "x": 7.6,
      "y": 1.5
    },
    {
      "pos": 17,
      "x": 8.6,
      "y": 1.42
    },
    {
      "pos": 18,
      "x": 9.6,
      "y": 1.18
    },
    {
      "pos": 19,
      "x": 10.6,
      "y": 1.28
    },
    {
      "pos": 20,
      "x": 11.6,
      "y": 1.55
    },
    {
      "pos": 21,
      "x": 12.6,
      "y": 1.55
    },
    {
      "pos": 22,
      "x": 0,
      "y": 2.55
    },
    {
      "pos": 23,
      "x": 1,
      "y": 2.55
    },
    {
      "pos": 24,
      "x": 2,
      "y": 2.28
    },
    {
      "pos": 25,
      "x": 3,
      "y": 2.18
    },
    {
      "pos": 26,
      "x": 4,
      "y": 2.42
    },
    {
      "pos": 27,
      "x": 5,
      "y": 2.5
    },
    {
      "pos": 28,
      "x": 7.6,
      "y": 2.5
    },
    {
      "pos": 29,
      "x": 8.6,
      "y": 2.42
    },
    {
      "pos": 30,
      "x": 9.6,
      "y": 2.18
    },
    {
      "pos": 31,
      "x": 10.6,
      "y": 2.28
    },
    {
      "pos": 32,
      "x": 11.6,
      "y": 2.55
    },
    {
      "pos": 33,
      "x": 12.6,
      "y": 2.55
    },
    {
      "pos": 34,
      "x": 0,
      "y": 3.55
    },
    {
      "pos": 35,
      "x": 1,
      "y": 3.55
    },
    {
      "pos": 36,
      "x": 2,
      "y": 3.28
    },
    {
      "pos": 37,
      "x": 3,
      "y": 3.18
    },
    {
      "pos": 38,
      "x": 4,
      "y": 3.42
    },
    {
      "pos": 39,
      "x": 5,
      "y": 3.5
    },
    {
      "pos": 40,
      "x": 7.6,
      "y": 3.5
    },
    {
      "pos": 41,
      "x": 8.6,
      "y": 3.42
    },
    {
      "pos": 42,
      "x": 9.6,
      "y": 3.18
    },
    {
      "pos": 43,
      "x": 10.6,
      "y": 3.28
    },
    {
      "pos": 44,
      "x": 11.6,
      "y": 3.55
    },
    {
      "pos": 45,
      "x": 12.6,
      "y": 3.55
    },
    {
      "pos": 46,
      "x": 0,
      "y": 4.55
    },
    {
      "pos": 47,
      "x": 1,
      "y": 4.55
    },
    {
      "pos": 48,
      "x": 2,
      "y": 4.28
    },
    {
      "pos": 49,
      "x": 3,
      "y": 4.18
    },
    {
      "pos": 50,
      "x": 4,
      "y": 4.42
    },
    {
      "pos": 51,
      "x": 5,
      "y": 4.5
    },
    {
      "pos": 52,
      "x": 5.35,
      "y": 6.2
    },
    {
      "pos": 53,
      "x": 5.6,
      "y": 7.2
    },
    {
      "pos": 54,
      "x": 5.85,
      "y": 8.2
    },
    {
      "pos": 55,
      "x": 6.75,
      "y": 8.2
    },
    {
      "pos": 56,
      "x": 7,
      "y": 7.2
    },
    {
      "pos": 57,
      "x": 7.25,
      "y": 6.2
    },
    {
      "pos": 58,
      "x": 7.6,
      "y": 4.5
    },
    {
      "pos": 59,
      "x": 8.6,
      "y": 4.42
    },
    {
      "pos": 60,
      "x": 9.6,
      "y": 4.18
    },
    {
      "pos": 61,
      "x": 10.6,
      "y": 4.28
    },
    {
      "pos": 62,
      "x": 11.6,
      "y": 4.55
    },
    {
      "pos": 63,
      "x": 12.6,
      "y": 4.55
    },
    {
      "pos": 64,
      "x": 0,
      "y": 5.55
    },
    {
      "pos": 65,
      "x": 1,
      "y": 5.55
    },
    {
      "pos": 66,
      "x": 2,
      "y": 5.28
    },
    {
      "pos": 67,
      "x": 3,
      "y": 5.18
    },
    {
      "pos": 68,
      "x": 4,
      "y": 5.42
    },
    {
      "pos": 69,
      "x": 4.2,
      "y": 6.5
    },
    {
      "pos": 70,
      "x": 4.45,
      "y": 7.5
    },
    {
      "pos": 71,
      "x": 4.7,
      "y": 8.5
    },
    {
      "pos": 72,
      "x": 7.9,
      "y": 8.5
    },
    {
      "pos": 73,
      "x": 8.15,
      "y": 7.5
    },
    {
      "pos": 74,
      "x": 8.4,
      "y": 6.5
    },
    {
      "pos": 75,
      "x": 8.6,
      "y": 5.42
    },
    {
      "pos": 76,
      "x": 9.6,
      "y": 5.18
    },
    {
      "pos": 77,
      "x": 10.6,
      "y": 5.28
    },
    {
      "pos": 78,
      "x": 11.6,
      "y": 5.55
    },
    {
      "pos": 79,
      "x": 12.6,
      "y": 5.55
    }
  ]
};
