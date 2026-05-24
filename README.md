# glove80

## What this is

Personal Glove80 firmware repo. V1 is moergo's stock factory keymap in version control, buildable locally via Docker. Long-term goal: keyboard-only macOS workflow, built one iteration at a time.

## Status (V2 — Home Row Mods)

V2 adds **sunaku-flavored Home Row Mods** on top of V1's stock baseline. Everything V1 had still works (lower layer, magic layer, Bluetooth, RGB, factory layer, battery indicator); only the home row (A S D F and J K L ;) gained a second behavior. V1 stays preserved in git at commit `a61129d` for reference and rollback.

V1 is the stock-factory baseline: all existing functionality preserved (Bluetooth, RGB, magic key, all layers, factory layer, battery indicator), locally buildable via Docker.

See [ROADMAP.md](ROADMAP.md).

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
#define DIFFICULTY_LEVEL 2   // 1=500ms, 2=400ms, 3=300ms, 4=200ms, 5=100ms
```

V2 ships at level 2 (400 ms hold time). Lower the number, longer the hold needed before a key counts as a modifier. Bump it up as your hands learn.

**Two safety nets are on:**

- **Shift forgiveness** — hold F or J and release it without pressing anything else, you get the letter (not silence).
- **Streak decay** — if you typed any key in the last 400 ms, an HRM hold is forced to stay a letter. Prevents mid-word misfires.

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
