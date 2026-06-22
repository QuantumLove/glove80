# ROADMAP

What's shipped and what's next. Priority queue, not a promise.

## Shipped

- **V1** — stock factory keymap, local Docker build. Preserved at `a61129d`.
- **V2** — sunaku-flavored home-row mods on A/S/D/F + J/K/L/; (CAGS, macOS-tuned). `DIFFICULTY_LEVEL` 4, shift forgiveness, bilateral combinations via positional hold-tap.
- **V3** — Cursor layer (text nav), Mouse layer with three speed sublayers (Slow/Fast/Warp), Hyper key, Wispr Flow hotkey. Visual keymap diagram via `keymap-drawer`.
- **V4** — Number + Symbol layers (sunaku Miryoku-style: right-hand numpad, left-hand symbol pad on the Delete/Space thumbs); `DIFFICULTY_LEVEL` → 4; thumb-cluster remap; dead bilateral-enforcement layers removed.
- **V5** — App-switching combos via sunaku's `mod_tab_chord`: Cmd+Tab (Hyper+Backspace) and Ctrl+Tab (Ctrl+Delete), held across Tab/Shift+Tab on the Cursor layer.
- **V6** — tmux thumb (RAlt → tap = prefix `Ctrl+Space`, hold = the tmux layer, incl. `o` = copy pane cwd to the Mac clipboard) + Raycast thumb (LGui → `Cmd+Space`). Pairs with the dotfiles `tmux.conf`.

## Next

1. **macOS integration** — Raycast (+ Hammerspoon if needed); lives in the dotfiles repo, not firmware (the keyboard emits keystrokes, OS tools consume them). AeroSpace is "Not Adopting" per the dotfiles plan unless cross-Space window-cycling becomes daily friction.

## How we add features

One iteration per feature. Change one thing at a time, verify, commit. Every commit small enough to revert.
