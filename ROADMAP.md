# ROADMAP

Tracks what works today (V3) and what is planned next, in order. No commitments to dates.

## Current Features (V3 — V2 baseline + Cursor and Mouse layers)

All V2 features still work. V3 adds Cursor and Mouse top-level layers, three Mouse speed sublayers, a Hyper key, and a Wispr Flow hotkey.

**V2 baseline preserved (V1 lives at commit `a61129d`).**

**V3 additions:**
- Cursor layer (hold LH lower-inner thumb): arrows, page nav, find, undo/redo, copy/cut/paste, select_word/line/all, sticky shift
- Mouse layer (hold RH lower-inner thumb): inverted-T movement, three buttons + MB4/MB5, scroll, drag (LCLK on left thumb T5)
- Mouse speed sublayers (held with RH index/middle/ring on Mouse layer): SLOW (1/4x), FAST (2x), WARP (6x)
- Hyper key on LH upper-outer thumb: `&mt HYPER LSHFT` (hold=Hyper, tap=Shift)
- Wispr Flow hotkey on RH upper-outer thumb: Cmd+F18 hold / Cmd+F19 tap
- `CONFIG_ZMK_POINTING=y` for the mouse subsystem

## Planned (V4+)

1. **V4: Symbols/Numpad Layer** — Left-hand numpad (7/8/9 top, 4/5/6 home, 1/2/3 bottom). Right-hand: brackets, operators. Activated via a thumb key TBD.
2. **V5: Combos for app switching** — sunaku's app/window/tab cycling via LH thumb-pair combos (T1+T4 = Cmd+Tab cycle, T3+T6 = Opt+Tab, T2+T5 = Ctrl+Tab), using the `mod_tab_chord` swapper pattern.
3. **V6: macOS + OS Integration** — Raycast hotkeys, Hammerspoon glue, AeroSpace tiling. SEPARATE plans from firmware; the keyboard sends keystrokes, OS tools consume them.

## How we add features

Each feature gets its own iteration. We change one thing at a time, test that it works exactly as intended, then commit and move on. Every commit is small enough to understand and revert. The ROADMAP is not a promise — it is a priority queue. Items move up or down based on what proves most useful in practice.

