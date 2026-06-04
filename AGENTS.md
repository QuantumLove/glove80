# AGENTS.md

## What this repo is

QuantumLove/glove80: Glove80 ZMK keyboard firmware. V1 is the stock baseline, preserved as-is. All agents work in pedagogical mode.

## Pedagogical Mode

- Explain every change in plain language before or alongside the code.
- Define every firmware term the first time it appears.
- Explain WHY each change is made, not just WHAT.
- Never assume context the user hasn't been given.

## Build

Run `./build.sh` from the repo root. Uses `zmkfirmware/zmk-dev-arm:3.5`; no local ARM toolchain needed. `config/glove80.conf` is an empty Kconfig placeholder included in the build.

Outputs: `glove80_lh.uf2` (left half), `glove80_rh.uf2` (right half).

## Test

**Agent-side checks** (run after every build):
- Both `glove80_lh.uf2` and `glove80_rh.uf2` exist in the repo root.
- Each file starts with the UF2 magic bytes (`0x0A324655` at offset 0).
- Each file is between 200 KB and 600 KB.

**Human-side checks:** Flash both halves (see Flash section). Open https://www.keyboardchecker.com and press every key.

## Flash

1. Enter bootloader mode (power-up method): switch off, hold `Magic + E` (LEFT) or `I + PgDn` (RIGHT), then switch on while holding. Drive mounts as `GLV80LHBOOT` or `GLV80RHBOOT`. Slow-pulsing red LED confirms bootloader + USB connected.
2. Drag the correct UF2 file onto the drive. Wait for the keyboard to reboot automatically.
3. Left half gets `glove80_lh.uf2`. Right half gets `glove80_rh.uf2`. Do not mix the files.
4. Flash RIGHT half first, then LEFT (moergo's recommended order).

Full procedure and ZMK method: `README §Flash` and https://docs.moergo.com/glove80-user-guide/customizing-key-layout/#putting-glove80-into-bootloader-for-firmware-loading

## Glossary

- **ZMK**: open-source keyboard firmware framework built on Zephyr RTOS (https://zmk.dev).
- **west**: Zephyr's meta-tool and dependency manager; `config/west.yml` pins the ZMK source version.
- **UF2**: firmware-bundle format that mass-storage bootloaders accept via drag-and-drop; no special flashing tool required.
- **shield**: hardware module definition in Zephyr; the Glove80 shield encodes its pin layout and split configuration.
- **devicetree**: Zephyr's config-as-code syntax for hardware and bindings; `.keymap` files are devicetree source files.
- **default_layer**: the layer active when no other layer is held; the base typing layer the keyboard starts on.
- **magic key**: Moergo's special key that activates the Magic layer (RGB control, Bluetooth profile switching, factory reset).
- **mass-storage bootloader**: recovery mode where the keyboard presents as a USB drive for drag-and-drop firmware installation.
- **HRM** (Home Row Mod): a key on the home row that types its letter when tapped and acts as a modifier (Shift/Ctrl/Alt/Cmd) when held. V2 adds HRMs on A/S/D/F and J/K/L/;.
- **hold-tap behavior**: ZMK primitive — one key, two outputs, chosen by whether it was tapped or held. Used by V1's `layer_td` and `magic` keys; V2 adds eight more for the home row.
- **mod-tap (`&mt`)**: ZMK's stock hold-tap whose hold side is a modifier. V2 doesn't use `&mt` directly because HRM needs finer tuning (per-finger timing, positional triggers, idle decay).
- **positional hold-tap**: a hold-tap that also checks which other key was pressed during the hold window. If the other key is on the same hand, the HRM resolves to a tap (letter); if on the opposite hand, to a hold (modifier). Implemented via the `hold-trigger-key-positions` property and is the primary defense against accidental modifier activation during fast typing.
- **bilateral combinations**: the touch-typing convention that modifier-key chords use one hand to hold the modifier and the other to tap the modified key. V2 enforces this in firmware via positional hold-taps plus the two bilateral enforcement layers.
- **bilateral enforcement layer**: a layer that overrides the same-hand home-row keys to plain `&kp` whenever an HRM on that hand is held. Prevents same-hand modifier chords from accidentally firing.
- **conditional layer**: a ZMK construct that auto-activates one layer when one or more others are already active. Not used in V2; reserved vocabulary for V3+.
- **`tapping-term-ms`**: how long a hold-tap key must be held before its hold side can fire. The "sensitivity" knob — lower = more sensitive (more misfires); higher = slower hold response.
- **`quick-tap-ms`** ("repeat decay"): if the same hold-tap key was tapped within the last N ms, the next press is forced to be a tap. Lets you do "tap-then-hold" for OS-level key auto-repeat.
- **`require-prior-idle-ms`** ("streak decay"): the hold side cannot fire if any key was pressed in the last N ms. The major anti-misfire knob for fast typists.
- **`hold-while-undecided`**: ZMK property that pre-presses the hold side during the undecided window so releasing the key without pressing another still emits the tap letter. Powers SHIFT_FORGIVENESS.
- **CAGS** / **GACS**: home-row modifier orderings. GACS = Gui/Alt/Ctrl/Shift from pinky to index (Linux/Windows default). CAGS = Ctrl/Alt/Cmd/Shift (macOS — swaps Gui and Ctrl so Cmd sits on the strong middle finger).
- **DIFFICULTY_LEVEL**: sunaku's preset for HRM sensitivity (1=500ms novice → 5=100ms expert). One `#define` retunes every per-finger timing. V2 ships at level 2 (400ms).

## Scope Boundaries

**In V1:** stock baseline keymap, local Docker build via `./build.sh`, human-tier verification (flash + keyboard checker). V1 is preserved in git at commit `a61129d`.

**In V2:** V1 plus sunaku-flavored home-row mods on A/S/D/F + J/K/L/; with CAGS modifier order (macOS-tuned), `DIFFICULTY_LEVEL` (currently 3 = 300 ms hold), `SHIFT_FORGIVENESS` and `ENFORCE_BILATERAL` enabled. Two bilateral-enforcement layers (`BILATERAL_LH`, `BILATERAL_RH`).

**In V3 (current):** V2 plus:
- CURSOR layer (text navigation) on LH lower-inner thumb
- MOUSE layer (pointer control) on RH lower-inner thumb, with three speed sublayers (MOUSE_SLOW, MOUSE_FAST, MOUSE_WARP)
- Hyper key (`&mt HYPER LSHFT`) on LH upper-outer thumb
- Wispr Flow hotkey (`&wispr LG(F18) LG(F19)`) on RH upper-outer thumb (Cmd+F18 hold / Cmd+F19 tap — Wispr requires a modifier)
- `CONFIG_ZMK_POINTING=y` for mouse subsystem
- Mouse motion tuning matched to sunaku's defaults

**Out of current scope** (tracked in `ROADMAP.md`): Symbols/Numpad layer (V4), app-switching combos (V5), OS integrations (V6+), GitHub Actions CI, Nix flake build.

## Working Conventions

- Commit subject lines use the imperative mood ("Add glossary", not "Added glossary").
- Every commit or PR body explains WHY the change was made, not just what changed.
- No emojis in headings, commit messages, or file content unless the user explicitly requests them.
- Define every firmware term the first time it appears in any agent-authored text.
- Write for a user who is learning.

## Out-of-Scope Policy

Anything not in the active plan or tracked source files must be flagged and human-gated before any action is taken.

1. **HALT** the current task immediately. Do not proceed, even partially.
2. **DOCUMENT** the finding to `.omo/evidence/out-of-scope-task-{N}-{slug}.md`. Record what was found, why it's out of scope, and what it would block.
3. **SURFACE** the finding to the user with the header `## OUT-OF-SCOPE ENCOUNTERED at Task {N}`, followed by three options:
   - **A**: Add to `ROADMAP.md` as a future V2+ iteration (no V1 impact).
   - **B**: Expand V1 scope (requires plan amendment and phase-gate rerun).
   - **C**: A different approach proposed by the user.
4. **WAIT** for an explicit choice. Silence is not approval. Do not resume until the user responds.
