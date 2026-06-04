# glove80

## What this is

Personal Glove80 firmware repo. V1 is moergo's stock factory keymap in version control, buildable locally via Docker. Long-term goal: keyboard-only macOS workflow, built one iteration at a time.

## Status (V3 — Cursor + Mouse Layers)

V3 adds two new layers on top of V2's HRM baseline:

- **Cursor layer** (text navigation) — hold the **left inner-lower thumb** to access arrows, page nav, find, undo/redo, copy/cut/paste, selection helpers, and sticky shift for shift-select workflows.
- **Mouse layer** (pointer control) — hold the **right inner-lower thumb** for an inverted-T cursor cluster (left hand), mouse buttons (right hand), scroll (outer columns), and three speed sublayers (Slow=1/4, Fast=2x, Warp=6x) reachable from the Mouse layer's right hand.

Two new direct keys on the default layer:
- **Hyper** (Cmd+Opt+Ctrl+Shift) — hold the **left upper-outer thumb**. Tap that thumb for plain Shift (HRM-equivalent fallback).
- **Wispr Flow dictation** — **right upper-outer thumb**. Hold = Cmd+F18 (push-to-talk); tap = Cmd+F19 (toggle). Configure Wispr Flow on the host to use these hotkeys. Plain F-keys don't work — Wispr requires at least one modifier.

The inner-lower thumb keys (previously Alt) are now layer activators. Alt is handled exclusively by the S-finger (LH) and L-finger (RH) HRMs.

All V2 features still work. V1 baseline still preserved in git at commit `a61129d`.

See [ROADMAP.md](ROADMAP.md).

## Visual keymap

A rendered diagram of every layer (default, Cursor, Mouse, Mouse speed sublayers, Lower, Magic) lives at [`docs/keymap.svg`](docs/keymap.svg). It's auto-generated from `config/glove80.keymap` and matches whatever ships in the current commit. Open it in any browser to see what each key does on each layer.

To regenerate after editing the keymap:

```bash
./bin/draw-keymap.sh
```

Requires `uv` (`brew install uv`). The script fetches `keymap-drawer` via `uvx` on first run and caches it; subsequent runs take a few seconds. Outputs `docs/keymap.yaml` (intermediate) and `docs/keymap.svg` (the diagram).

## How V3 works

**Cursor layer** activates by holding the left inner-lower thumb (was Alt). The right hand provides navigation: home row = arrows, row below = line/page nav, bottom row = find. The left hand provides editing: sticky shift on the outer column (tap once, next key is shifted), select_word/select_line/select_all macros, and copy/cut/paste/undo/redo.

**Mouse layer** activates by holding the right inner-lower thumb (was Alt). Left hand controls movement via an inverted-T cluster (up on the ring-finger row, left/down/right on the home row). Right hand provides the three mouse buttons (index/middle/ring, row 3), speed sublayers (row 4), and a mirror movement cluster (row 5) for one-handed use. Drag: hold the left thumb T5 key (LCLK) while moving the cursor with the other hand.

**Speed sublayers** are held simultaneously with the Mouse layer. While on the Mouse layer, hold the right-hand index (Fast=2x), middle (Warp=6x), or ring (Slow=1/4) finger row-4 key to scale cursor speed up or down.

## How V2 Home Row Mods work

**Home Row Mod (HRM):** a key that types its letter when tapped and acts as a modifier (Shift, Ctrl, Alt, Cmd) when held. Goal: never leave the home row to chord modifiers.

**Modifier layout (CAGS, macOS-tuned):** Ctrl on the pinkies, Alt on the rings, **Cmd on the middles**, Shift on the indices. So:

```
Left  home row:   A=Ctrl  S=Alt   D=Cmd   F=Shift     G=plain
Right home row:                                       H=plain     J=Shift K=Cmd   L=Alt  ;=Ctrl
```

Tap each key normally — you get the letter. Hold it for a beat — you get the modifier. Cmd+C, for example, is: hold **K** (right-hand Cmd) on the right hand, tap **C** with the left.

**Use the opposite hand for chords.** Same-hand chords (Cmd on D, then A) are blocked by design — the firmware enforces "one hand holds, the other taps". This is called *bilateral enforcement* and it's the main reason HRM doesn't misfire.

**Sensitivity** is governed by one `#define` in [config/glove80.keymap](config/glove80.keymap):

```
#define DIFFICULTY_LEVEL 3   // 1=500ms, 2=400ms, 3=300ms, 4=200ms, 5=100ms
```

Currently at level 3 (300 ms hold time). Lower the number, longer the hold needed before a key counts as a modifier. Bump it up as your hands learn.

**Two safety nets are on:**

- **Shift forgiveness** — hold F or J and release it without pressing anything else, you get the letter (not silence).
- **Streak decay** — if you typed any key in the last 300 ms, an HRM hold is forced to stay a letter. Prevents mid-word misfires.

**Auto-repeat** still works: tap a key once, then immediately hold it. You get the letter repeating (Cmd+A doesn't auto-fire, but `aaaa` does).

## How this works

**ZMK** — open-source keyboard firmware framework (https://zmk.dev).
**west** — Zephyr's dependency manager; `config/west.yml` pins the ZMK source version.
**UF2** — firmware format accepted by mass-storage bootloaders via drag-and-drop.
`build.sh` runs the build inside Docker — no local toolchain needed.

## Build (local Docker)

Prerequisites: Docker installed with daemon running (`docker info` should succeed).

```bash
./build.sh
```

Produces `glove80_lh.uf2` (left half) and `glove80_rh.uf2` (right half) in the repo root.

First run: ~5-10 min (Docker pulls the image and west fetches ZMK source). Subsequent runs: ~2-3 min.

## Recovery (bootloader)

Use the power-up method (works even if firmware is broken):

**Left half:** switch off, connect USB, hold `Magic + E`, then switch power on while holding.
**Right half:** switch off, connect USB, hold `I + PgDn`, then switch power on while holding.

Drive mounts as `GLV80LHBOOT` or `GLV80RHBOOT`. Drag a known-good UF2 onto it to recover.

LED next to the power switch: slow-pulsing red = bootloader mode + USB connected. Fast-flashing red = bootloader but no USB. Solid or off = not in bootloader mode.

If the keyboard is on and working, you can also use the ZMK method: `Magic + Esc` (left) or `Magic + '` (right).

Full details: https://docs.moergo.com/glove80-user-guide/customizing-key-layout/#putting-glove80-into-bootloader-for-firmware-loading

Factory defaults: https://my.glove80.com/#/help.

## Flash

After `./build.sh` succeeds. Moergo recommends flashing the RIGHT half first, then the LEFT.

**Right half (first):**

1. Switch off the RIGHT half's power switch
2. Connect USB to the RIGHT half's port
3. Hold `I + PgDn`, then switch power on while holding
4. Drive mounts as `GLV80RHBOOT` (slow-pulsing red LED confirms bootloader + USB)
5. Drag `glove80_rh.uf2` onto the drive — **MUST be the `_rh` file, NOT `_lh`**
6. Wait ~5-10s for reboot

**Left half (second):**

1. Switch off the LEFT half's power switch
2. Connect USB to the LEFT half's USB-C port
3. Hold `Magic + E`, then switch power on while holding
4. Drive mounts as `GLV80LHBOOT`
5. Drag `glove80_lh.uf2` onto the drive
6. Wait ~5-10s for reboot

See [Recovery (bootloader)](#recovery-bootloader) for the ZMK method (keyboard must already be on and working).

On macOS Sonoma+: approve USB device permission in System Settings > Privacy & Security if prompted.

After firmware version changes: power-cycle both halves and re-pair if halves don't connect.

## Test

Open **https://www.keyboardchecker.com** and press every key. Work through each category:

**Typing keys:**
- Letters A-Z (both halves)
- Digits 0-9
- Punctuation: `` ` ``, `-`, `=`, `[`, `]`, `\`, `;`, `'`, `,`, `.`, `/`

**Modifiers:**
- LShift, RShift, LCtrl, RCtrl, LAlt/Option, RAlt, LCmd/Gui, RCmd

**Whitespace and control:**
- Space, Enter, Tab, Backspace, Delete, Escape

**Navigation:**
- Arrow keys, Home, End, PgUp, PgDn

**Function keys:**
- F1-F10 on base layer; F11-F12 via LOWER layer (hold the LOWER thumb key)

**Bluetooth:**
- Pair with a second device, type a few sentences, verify keystrokes register

**RGB lighting:**
- Visible underglow in factory default mode

**Magic key:**
- Activates Magic layer (RGB controls, BT profile switching, factory access)

**Factory layer:**
- Accessible via stock combo (see moergo docs)

**Battery indicator:**
- LED behavior per stock moergo spec

If any key fails: file an issue at https://github.com/QuantumLove/glove80/issues.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for current features preserved in V1 and planned future iterations.
