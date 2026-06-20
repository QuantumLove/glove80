# ROADMAP

What's shipped and what's next. Priority queue, not a promise.

## Shipped

- **V1** — stock factory keymap, local Docker build. Preserved at `a61129d`.
- **V2** — sunaku-flavored home-row mods on A/S/D/F + J/K/L/; (CAGS, macOS-tuned). `DIFFICULTY_LEVEL` 4, shift forgiveness, bilateral combinations via positional hold-tap.
- **V3** — Cursor layer (text nav), Mouse layer with three speed sublayers (Slow/Fast/Warp), Hyper key, Wispr Flow hotkey. Visual keymap diagram via `keymap-drawer`.

## In progress

- **V4 (current branch, not yet flashed)** — Number + Symbol layers (sunaku Miryoku-style: right-hand numpad, left-hand symbol pad, on the Delete/Space thumbs). Also `DIFFICULTY_LEVEL` → 4, thumb-cluster remap (Cursor/Number/Mouse/Symbol on the outer thumb columns, factory Alt restored), and removal of the dead bilateral-enforcement layers.

- **V5 — App-switching combos** — left-thumb pinch combos via sunaku's `mod_tab_chord` swapper: Cmd+Tab (Hyper+Backspace) and Ctrl+Tab (Ctrl+Delete), holding the modifier across Tab/Shift+Tab taps on the Cursor layer. Same branch, not yet flashed. (Opt+Tab available, not added.)

## Next

1. **V6 — macOS integration** — Raycast, Hammerspoon, AeroSpace. Separate from firmware: the keyboard emits keystrokes, OS tools consume them.

## How we add features

One iteration per feature. Change one thing at a time, verify, commit. Every commit small enough to revert.
