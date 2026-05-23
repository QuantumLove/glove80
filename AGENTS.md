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

## Scope Boundaries

**In V1:** stock baseline keymap, local Docker build via `./build.sh`, human-tier verification (flash + keyboard checker).

**Out of V1 scope** (tracked in `ROADMAP.md`): home-row mods, custom layers/macros/combos, OS-specific bindings, GitHub Actions CI, Nix flake build.

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
