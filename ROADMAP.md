# ROADMAP

Tracks what works today (V2) and what is planned next, in order. No commitments to dates.

## Current Features (V2 — V1 stock baseline + sunaku-flavored Home Row Mods)

All V1 features (below) still work. V2 only changed the home row (A/S/D/F + J/K/L/;) of the default layer. V2 has been flashed and verified on hardware: tap, hold, auto-repeat, shift forgiveness, opposite-hand chords, and bilateral block all behave as designed.

**V1 baseline preserved at commit `a61129d`:**

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

**V2 additions:**

- Home Row Mods on A/S/D/F + J/K/L/; (tap = letter, hold = modifier)
- CAGS modifier order (macOS-tuned: Ctrl/Alt/Cmd/Shift from pinky to index, mirrored both hands)
- One-knob sensitivity tuning via `#define DIFFICULTY_LEVEL` (1 novice → 5 expert; ships at level 2 = 400 ms)
- Per-finger hold timings (pinky longest, index shortest) to match each finger's strength
- Positional hold-tap: HRM only resolves as modifier if paired with an opposite-hand key (prevents misfires from same-hand rolls)
- Streak decay (400 ms `require-prior-idle-ms`): no HRM activation mid-word
- Shift forgiveness: held-and-released shift HRM still types the letter (via `hold-while-undecided`)
- Bilateral enforcement layers: two new layers (`BILATERAL_LH`, `BILATERAL_RH`) auto-activate when an HRM is held, blocking same-hand modifier+letter chords

## Planned (V3+)

1. **V3: Nav Layer** — Add `&lt` (layer-tap) on a thumb key to activate a navigation layer. HJKL = arrow keys; surrounding keys = Home/End/PgUp/PgDn. Goal: navigate text without moving hands from home row.
2. **V4: Symbols/Numpad Layer** — Left-hand numpad (7/8/9 top row, 4/5/6 home row, 1/2/3 bottom row). Right-hand: brackets, operators. Goal: number entry and code symbols without reaching for top row.
3. **V5: Hyper Layer** — Outer thumb key activates Hyper = Cmd+Opt+Ctrl+Shift simultaneously. Goal: single-key global shortcut trigger for macOS app switching, Raycast, etc. (OS integration is a separate plan from firmware changes.)
4. **V6+: macOS + OS Integration** — Raycast hotkeys, Wispr Flow dictation toggle — SEPARATE plans from firmware. The keyboard sends keystrokes; OS tools consume them.

## How we add features

Each feature gets its own iteration. We change one thing at a time, test that it works exactly as intended, then commit and move on. Every commit is small enough to understand and revert. The ROADMAP is not a promise — it is a priority queue. Items move up or down based on what proves most useful in practice.

