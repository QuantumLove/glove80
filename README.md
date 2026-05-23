# glove80

## What this is

Personal Glove80 keyboard firmware repository under the QuantumLove GitHub account. Uses ZMK (open-source keyboard firmware framework) and builds locally via Docker — no GitHub Actions required. V1 captures moergo's stock factory keymap in version control exactly as it came from the factory. Long-term goal: a keyboard-only macOS workflow built incrementally, one iteration at a time.

## Status (V1)

V1 is the stock-factory baseline preserved verbatim in version control and locally buildable via Docker. ALL existing keyboard functionality is preserved: Bluetooth, RGB lighting, magic key, all default layers, factory layer, battery indicator. V1 does NOT add any customization. Customizations (Home Row Mods, Nav layer, etc.) come in later iterations. See ROADMAP.md for what's planned.

## How this works

This repo builds [ZMK](https://zmk.dev) firmware. ZMK is an open-source keyboard firmware framework built on top of the Zephyr RTOS — it runs directly on the keyboard's microcontroller and handles every keypress, layer, and Bluetooth connection.

The build is managed by **west**, which is Zephyr's meta-tool and dependency manager. Think of it as `npm` for embedded firmware: it reads a manifest file and fetches the exact source code versions needed. Our `config/west.yml` is that manifest — it tells west exactly which version of ZMK source code to fetch.

The resulting firmware is bundled into a **UF2** file. UF2 is a format that mass-storage bootloaders accept via drag-and-drop: when the keyboard is in bootloader mode, it appears as a USB drive, and you copy the UF2 onto it like any file. No special flashing tool needed.

The `build.sh` script orchestrates all of this inside a Docker container so no local toolchain installation is needed on your machine.

## Build (local Docker)

Prerequisites: Docker installed with daemon running (`docker info` should succeed).

```bash
./build.sh
```

This produces `glove80_lh.uf2` (left half) and `glove80_rh.uf2` (right half) in the repo root.

First run: ~5-10 min (Docker pulls the `zmkfirmware/zmk-dev-arm:3.5` image and west fetches ZMK source). Subsequent runs: ~2-3 min.

## Recovery (bootloader)

If the keyboard becomes unresponsive after flashing: hold any key on the affected half while plugging USB into that half's port. The keyboard mounts as a mass-storage USB drive (`GLV80LHBOOT` or `GLV80RHBOOT`). Drag a known-good UF2 onto it to recover.

Factory defaults are downloadable from https://my.glove80.com/#/help.

## Flash

After `./build.sh` succeeds:

**Left half:**

1. Disconnect keyboard if connected
2. Hold any key on the LEFT half while plugging USB into the LEFT half's USB-C port
3. A mass-storage drive mounts (likely `GLV80LHBOOT`)
4. Drag `glove80_lh.uf2` onto the mounted drive
5. Wait ~5-10s for reboot

**Right half:**

1. Disconnect USB
2. Hold any key on the RIGHT half while plugging USB into the RIGHT half's port
3. A mass-storage drive mounts (likely `GLV80RHBOOT`)
4. Drag `glove80_rh.uf2` onto the mounted drive — **MUST be the `_rh` file, NOT `_lh`**
5. Wait ~5-10s for reboot

On macOS Sonoma+: approve USB device permission in System Settings > Privacy & Security if prompted.

After firmware version changes: power-cycle both halves and re-pair if halves don't connect.

## Test

Open **https://www.keyboardchecker.com** (or https://en.key-test.ru) — a web page that shows a visual keyboard and lights up every key as you press it. Work through each category below.

**Typing keys:**
- Letters A-Z (hit keys from both halves)
- Digits 0-9
- Punctuation: `` ` ``, `-`, `=`, `[`, `]`, `\`, `;`, `'`, `,`, `.`, `/`

**Modifiers:**
- LShift, RShift
- LCtrl, RCtrl
- LAlt/Option, RAlt
- LCmd/Gui, RCmd

**Whitespace and control:**
- Space, Enter, Tab, Backspace, Delete, Escape

**Navigation:**
- Arrow keys (up, down, left, right)
- Home, End, PgUp, PgDn

**Function keys:**
- F1-F12 via stock layers

**Bluetooth:**
- Pair with a second device, type a few sentences, verify keystrokes register there

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
