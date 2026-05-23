# AGENTS.md

## What this repo is

This is the QuantumLove/glove80 repo: a Glove80 ZMK keyboard firmware. V1 is the stock baseline, preserved as-is. All agents work in pedagogical mode (see below), meaning every change is explained so the repo owner learns along. Do not treat this as a generic firmware project; read this file before touching anything.

---

## Pedagogical Mode

Every change must be explained in plain language before or alongside the code. When a firmware term appears for the first time, give it a one-line definition. Assume the user is learning ZMK, not an expert. Explain WHY each change is made, not just WHAT was done. If a change is routine, say so and say why it's routine. Never assume context the user hasn't been given.

---

## Build

Run `./build.sh` from the repo root. That script wraps the `zmkfirmware/zmk-dev-arm:3.5` Docker image, so no local ARM toolchain is needed. No GitHub Actions are used in V1; everything builds locally.

Outputs land in the repo root:
- `glove80_lh.uf2` (left half)
- `glove80_rh.uf2` (right half)

First run takes roughly 5-10 minutes while Docker pulls the image. Subsequent runs take 2-3 minutes. Before building, confirm the Docker daemon is running: `docker info`.

---

## Test

**Agent-side checks** (run after every build):
- Both `glove80_lh.uf2` and `glove80_rh.uf2` exist in the repo root.
- Each file starts with the UF2 magic bytes (`0x0A324655` at offset 0).
- Each file is between 200 KB and 600 KB.

**Human-side checks** (cannot be automated):
- Flash both halves (see Flash section).
- Open https://www.keyboardchecker.com and press every key.
- Confirm all keys register correctly.

See `README §Test` for the full human-tier checklist.

---

## Flash

See `README §Flash` for the complete per-half procedure. Short version:

1. Enter bootloader mode: hold any key while plugging in USB. The keyboard mounts as a USB drive.
2. Drag the correct UF2 file onto the drive. Wait for the keyboard to reboot automatically.
3. Left half gets `glove80_lh.uf2`. Right half gets `glove80_rh.uf2`. Do not mix the files.

Flash one half at a time. Confirm each half works before moving to the next.

---

## Glossary

- **ZMK**: open-source keyboard firmware framework built on Zephyr RTOS (https://zmk.dev).
- **west**: Zephyr's meta-tool and dependency manager; `config/west.yml` is the manifest that tells west which ZMK source version to fetch.
- **UF2**: a firmware-bundle format that mass-storage bootloaders accept via drag-and-drop, no special flashing tool required.
- **shield**: a hardware module definition in Zephyr; the Glove80 is defined as a shield, which tells ZMK its pin layout and split configuration.
- **devicetree**: Zephyr's config-as-code syntax for describing hardware and bindings; `.keymap` files are devicetree source files.
- **default_layer**: the layer that is active when no other layer is held; the base typing layer the keyboard starts on.
- **magic key**: Moergo's special key on the Glove80 that activates the Magic layer, giving access to RGB control, Bluetooth profile switching, and factory reset.
- **mass-storage bootloader**: the recovery mode where the keyboard presents itself as a USB drive so firmware can be installed by dragging a UF2 file onto it.

---

## Scope Boundaries

**In V1:**
- Stock baseline keymap, preserved without modification.
- Local Docker build via `./build.sh`.
- Human-tier verification (flash + keyboard checker).

**Out of V1 scope** (tracked in `ROADMAP.md`):
- Home-row mods (HRM).
- Custom layers, macros, or combos.
- OS-specific key bindings.
- GitHub Actions CI.
- Nix flake build.

Do not implement out-of-scope items in V1. If one surfaces, follow the Out-of-Scope Policy below.

---

## Working Conventions

- Commit subject lines use the imperative mood ("Add glossary", not "Added glossary").
- Every commit or PR body explains WHY the change was made, not just what changed.
- No emojis in headings, commit messages, or file content unless the user explicitly requests them.
- Define every firmware term the first time it appears in any agent-authored text.
- Write for a user who is learning. If something is obvious to an expert but not to a beginner, explain it anyway.

---

## Out-of-Scope Policy

Anything not specified in the active plan or in the repo's tracked source files must be flagged and human-gated before any action is taken.

When an out-of-scope item is encountered:

1. **HALT** the current task immediately. Do not proceed, even partially.
2. **DOCUMENT** the finding to `.omo/evidence/out-of-scope-task-{N}-{slug}.md`. Record what was found, why it's out of scope, and what it would block.
3. **SURFACE** the finding to the user with the header `## OUT-OF-SCOPE ENCOUNTERED at Task {N}`, followed by three options:
   - **A**: Add to `ROADMAP.md` as a future V2+ iteration (no V1 impact).
   - **B**: Expand V1 scope (requires plan amendment and phase-gate rerun).
   - **C**: A different approach proposed by the user.
4. **WAIT** for an explicit choice. Silence is not approval. Do not resume until the user responds.

This policy applies to all sub-agents and persists across all future iterations (V2, V3, and beyond). See the active plan's "## Execution Policy: Out-of-Scope Handling" section for the full policy text.
