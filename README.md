# glove80

## What this is

Personal Glove80 firmware repo. V1 is moergo's stock factory keymap in version control, buildable locally via Docker. Long-term goal: keyboard-only macOS workflow, built one iteration at a time.

## Status (V1)

V1 is the stock-factory baseline: all existing functionality preserved (Bluetooth, RGB, magic key, all layers, factory layer, battery indicator), locally buildable via Docker. No customizations yet. See [ROADMAP.md](ROADMAP.md).

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
