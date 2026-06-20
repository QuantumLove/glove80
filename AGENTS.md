# AGENTS.md

Conventions for AI agents working in this repo. Humans, see [README.md](README.md).

## What this repo is

QuantumLove/glove80: Glove80 ZMK keyboard firmware. V1 is the stock baseline, preserved at commit `a61129d`. All agents work in pedagogical mode.

## Pedagogical mode

- Explain every change in plain language alongside the code.
- Define every firmware term the first time it appears.
- Explain WHY each change is made, not just WHAT.
- Never assume context the user hasn't been given.

## Build

```bash
./build.sh
```

Uses `zmkfirmware/zmk-dev-arm:3.5`. Outputs `glove80_lh.uf2` and `glove80_rh.uf2` in the repo root.

## After every keymap change: regenerate the visual diagram

```bash
./bin/draw-keymap.sh
```

This rewrites `docs/keymap.yaml` and `docs/keymap.svg` from `config/glove80.keymap`. **Commit both alongside any keymap edit.** The SVG is the canonical human-readable reference — keeping it current means every reviewer can see what each key does without reading devicetree.

Requires `uv` on the host. `keymap-drawer` is fetched on demand via `uvx`; no global install.

## Test

**Agent-side, after every build:**
- Both `glove80_lh.uf2` and `glove80_rh.uf2` exist
- Each starts with UF2 magic bytes (`0x0A324655` at offset 0 — `xxd -l 4` shows `5546 320a`)
- Each is between 200 KB and 600 KB

**Human-side:** flash both halves, then `keyboardchecker.com` against the layers in `docs/keymap.svg`.

## Flash

Power off, hold bootloader combo while flipping power on, drag UF2.

- Left: `Magic + E` → `GLV80LHBOOT` → `glove80_lh.uf2`
- Right: `I + PgDn` → `GLV80RHBOOT` → `glove80_rh.uf2`

Slow-pulsing red LED = bootloader + USB connected. Drive unmounts on success. Right half first, then left.

Full procedure: https://docs.moergo.com/glove80-user-guide/customizing-key-layout/

## Scope boundaries

**V1:** stock baseline, Docker build, human-tier verification. Preserved at `a61129d`.

**V2:** V1 + sunaku-flavored home-row mods on A/S/D/F and J/K/L/; in CAGS order. `DIFFICULTY_LEVEL` currently 4 (200 ms hold + 200 ms streak decay). Shift forgiveness on. Bilateral combinations enforced by positional hold-tap (opposite-hand trigger), not dedicated layers.

**V3 (current):**
- CURSOR layer via layer-tap on the LH Backspace thumb — tap Backspace, hold Cursor (text nav)
- MOUSE layer via layer-tap on the RH Enter thumb — tap Enter, hold Mouse — with three speed sublayers (MOUSE_SLOW/FAST/WARP)
- NUMBER layer via layer-tap on the LH Delete thumb — tap Delete, hold Number — right-hand numpad + operators, left-hand mods/editing (Miryoku-style)
- SYMBOL layer via dedicated `lt_space` on the RH Space thumb — tap Space, hold Symbol — left-hand symbol pad, right-hand mods/whitespace (Miryoku-style)
- App-switching combos (sunaku `mod_tab_chord` swapper, default layer only): left-thumb pinches — Hyper+Backspace = Cmd+Tab, Ctrl+Delete = Ctrl+Tab — hold the modifier + Cursor layer, tap Tab/Shift+Tab to cycle, release to commit
- Hyper on LH upper-outer thumb (`&hyper_mt HYPER LSHFT`)
- Wispr Flow on RH upper-outer thumb (`&wispr LG(F18) LG(F19)`)
- `CONFIG_ZMK_POINTING=y`, motion tuned via `&mmv`/`&msc` overrides, sublayer speed scaling via `&mmv_input_listener` + `zip_xy_scaler`
- Visual keymap diagrams via `bin/draw-keymap.sh`

**Out of scope** (tracked in [ROADMAP.md](ROADMAP.md)): app-switching combos (V5), OS integrations (V6+), GitHub Actions CI.

## Working conventions

- Commit subjects in imperative mood ("Add X", not "Added X")
- Commit bodies explain WHY, not just what
- No emojis anywhere
- Define firmware terms on first use in any agent-authored text
- Write for a user who is learning

## Out-of-scope policy

If a task requires anything outside the current scope, **HALT**. Surface the finding to the user with the header `## OUT-OF-SCOPE ENCOUNTERED` followed by clear options. Wait for explicit choice. Silence is not approval.

## Glossary

- **ZMK** — open-source keyboard firmware (https://zmk.dev)
- **west** — Zephyr's dependency manager; `config/west.yml` pins ZMK source
- **UF2** — drag-and-drop firmware format for mass-storage bootloaders
- **shield** — Zephyr hardware module; the Glove80 shield encodes pin layout + split config
- **devicetree** — Zephyr's config-as-code syntax; `.keymap` files are devicetree source
- **HRM** (Home Row Mod) — letter on tap, modifier on hold
- **hold-tap behavior** — one key, two outputs, chosen by tap vs hold (`&mt`, `&lt`, our `hml_*`/`hmr_*`)
- **positional hold-tap** — hold-tap that also checks which other key was pressed during the hold window; same-hand → tap, opposite-hand → hold. Primary anti-misfire mechanism and how bilateral combinations are enforced
- **`tapping-term-ms`** — hold-time threshold (lower = more sensitive)
- **`require-prior-idle-ms`** — streak decay; blocks HRM hold if any key was pressed in the last N ms
- **`hold-while-undecided`** — pre-press the hold side so a no-follow-up release still emits the tap letter (powers shift forgiveness)
- **CAGS** — Ctrl/Alt/Cmd/Shift pinky-to-index, macOS-tuned (Cmd lands on the strong middle)
- **DIFFICULTY_LEVEL** — sunaku's HRM sensitivity preset (1=500 ms novice → 5=100 ms expert). Currently 4
- **mouse subsystem** — ZMK's pointer emulation (`&mkp`, `&mmv`, `&msc`); enabled via `CONFIG_ZMK_POINTING=y`
- **input listener / `zip_xy_scaler`** — ZMK input-processor pipeline that scales mouse-move values based on which layer is co-active. Drives MOUSE_SLOW/FAST/WARP
