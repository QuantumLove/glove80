# ROADMAP

Tracks what works today (V1) and what is planned next, in order. No commitments to dates.

## Current Features (V1 — Stock Baseline)

- QWERTY default_layer typing (all 26 letters, digits, punctuation)
- All standard modifiers: Shift, Ctrl, Alt/Option, Gui/Cmd (left and right)
- Function keys (F1–F12) via stock layers
- Bluetooth pairing (up to 5 host profiles, swappable via Magic key)
- RGB underglow (factory default mode; layer-aware coloring)
- Magic key (activates Magic layer: RGB control, BT profile switching, factory layer access)
- Lower layer (numpad, arrow keys, navigation per moergo stock)
- Factory layer (bootloader access, BT clear, factory reset combos)
- Battery indicator (LED display per moergo stock)
- Mass-storage bootloader recovery (hold any key while plugging USB)
- Split keyboard: left half (USB central), right half (BLE peripheral)

## Planned (V2+)

1. **V2: Home Row Mods (HRM)** — Add `&mt` (mod-tap) on A/S/D/F + J/K/L/; with tap-preferred flavor. Modifiers: Gui/Cmd, Alt/Opt, Ctrl, Shift (mirrored both hands). Goal: never reach for modifier keys again.
2. **V3: Nav Layer** — Add `&lt` (layer-tap) on a thumb key to activate a navigation layer. HJKL = arrow keys; surrounding keys = Home/End/PgUp/PgDn. Goal: navigate text without moving hands from home row.
3. **V4: Symbols/Numpad Layer** — Left-hand numpad (7/8/9 top row, 4/5/6 home row, 1/2/3 bottom row). Right-hand: brackets, operators. Goal: number entry and code symbols without reaching for top row.
4. **V5: Hyper Layer** — Outer thumb key activates Hyper = Cmd+Opt+Ctrl+Shift simultaneously. Goal: single-key global shortcut trigger for macOS app switching, Raycast, etc. (OS integration is a separate plan from firmware changes.)
5. **V6+: macOS + OS Integration** — Raycast hotkeys, Wispr Flow dictation toggle — SEPARATE plans from firmware. The keyboard sends keystrokes; OS tools consume them.

## How we add features

Each feature gets its own iteration. We change one thing at a time, test that it works exactly as intended, then commit and move on. Every commit is small enough to understand and revert. The ROADMAP is not a promise — it is a priority queue. Items move up or down based on what proves most useful in practice.

