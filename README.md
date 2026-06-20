# glove80

Personal Glove80 firmware. Goal: keyboard-only macOS workflow, built one iteration at a time.

## Status

**V5 (current).** All V1 stock features preserved.

- **V1** baseline — Moergo's factory keymap, locally buildable via Docker. Lives at commit `a61129d`.
- **V2** — sunaku-flavored home-row mods on A/S/D/F and J/K/L/; (CAGS, macOS-tuned).
- **V3** adds:
  - **Cursor layer** — tap Backspace / hold the LH Backspace thumb. Arrows, page nav, find, undo/redo, cut/copy/paste, sticky shift, select_word/line/all.
  - **Mouse layer** — tap Enter / hold the RH Enter thumb. Inverted-T cursor cluster, three buttons + MB4/MB5, scroll, drag, three speed sublayers (Slow=¼×, Fast=2×, Warp=6×).
  - **Hyper** on LH upper-outer thumb (`&hyper_mt HYPER LSHFT`).
  - **Wispr Flow** on RH upper-outer thumb (`&wispr LG(F18) LG(F19)` — Cmd+F18 hold, Cmd+F19 tap).
- **V4** adds:
  - **Number layer** — tap Delete / hold the LH Delete thumb. Right-hand numpad (7-8-9/4-5-6/1-2-3/0) + math operators; left hand keeps modifiers, select/find/undo, whitespace.
  - **Symbol layer** — tap Space / hold the RH Space thumb. Left-hand symbol pad (common symbols on the home row); right hand keeps modifiers + whitespace.
  - Faster home row (`DIFFICULTY_LEVEL` 3 → 4), thumb cluster remapped (layer access moved onto the Backspace/Delete/Enter/Space thumbs; factory Alt restored on the inner-bottom thumbs), and the dead bilateral-enforcement layers removed (positional hold-tap already does that job).
- **V5** adds:
  - **App-switching combos** — pinch the top-left thumb pair (Hyper+Backspace) for Cmd+Tab, the middle pair (Ctrl+Delete) for Ctrl+Tab. Hold the pinch and tap Tab/Shift+Tab on the Cursor layer to cycle; release to commit. Stock-ZMK swapper (`mod_tab_chord`), default layer only.

See [ROADMAP.md](ROADMAP.md) for what's next.

## Visual keymap

[`docs/keymap.svg`](docs/keymap.svg) renders every layer. Regenerate after editing the keymap:

```bash
./bin/draw-keymap.sh
```

Requires `uv` (`brew install uv`).

## Home Row Mods

CAGS order, mirrored on both hands. Tap = letter. Hold (~200 ms) = modifier. Use the opposite hand for chords; while typing, a same-hand key resolves the HRM to a letter (positional hold-tap).

```
LH home row:  A=Ctrl  S=Alt  D=Cmd  F=Shift  G=plain
RH home row:                                 H=plain  J=Shift  K=Cmd  L=Alt  ;=Ctrl
```

Tune sensitivity with one knob in [`config/glove80.keymap`](config/glove80.keymap):

```
#define DIFFICULTY_LEVEL 4   // 1=500ms (safe) → 5=100ms (expert)
```

Two safety nets are always on: **shift forgiveness** (release the index HRM without a follow-up → letter, not silence) and **streak decay** (any key in the last 200 ms forces the HRM to resolve as a tap, preventing mid-word misfires).

## Build

```bash
./build.sh
```

Docker-based, no local toolchain. Produces `glove80_lh.uf2` and `glove80_rh.uf2`. First run ~5–10 min; cached ~2–3 min.

## Flash

1. Power off the half.
2. Hold the bootloader combo while flipping power on:
   - **Left:** `Magic + E` — drive mounts as `GLV80LHBOOT`, drag `glove80_lh.uf2`
   - **Right:** `I + PgDn` — drive mounts as `GLV80RHBOOT`, drag `glove80_rh.uf2`
3. Slow-pulsing red LED confirms bootloader + USB. Drive unmounts on success.
4. Moergo's recommended order: right first, then left.

After a firmware version bump (V2 → V3 etc.) the HID descriptor can change. If a host doesn't recognise the keyboard, **re-pair Bluetooth** or use USB.

Full procedure: https://docs.moergo.com/glove80-user-guide/customizing-key-layout/

## Test

Open [keyboardchecker.com](https://www.keyboardchecker.com) and press every key. The visual keymap (`docs/keymap.svg`) is the reference for what each layer should do.

If anything's wrong: file an issue at https://github.com/QuantumLove/glove80/issues, or roll back to V2 (`git checkout 601c7ad`, `./build.sh`, reflash).
