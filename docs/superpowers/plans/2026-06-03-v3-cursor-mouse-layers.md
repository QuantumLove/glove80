# V3: Cursor + Mouse Layers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add sunaku-flavored Cursor (text navigation) and Mouse (pointer control + sublayered speed modes) layers to the Glove80 firmware, plus a Hyper key and a Wispr Flow hotkey, by editing two files and verifying each step builds.

**Architecture:** Two new top-level layers (CURSOR, MOUSE) plus three Mouse speed sublayers (MOUSE_SLOW, MOUSE_FAST, MOUSE_WARP). Activation via four thumb-key changes on the default layer. Mouse pointer subsystem enabled via `CONFIG_ZMK_POINTING=y`. Layouts copy sunaku's Glorious Engrammer (`/tmp/sunaku-keymap.zmk`) but adapted to our existing layer-number scheme and macro defines.

**Tech Stack:** ZMK v25.11 (`config/west.yml` pinned to `11454d23596afbdb06380a1125371b19ab65675c`), Zephyr devicetree, Docker-based build via `./build.sh`. No automated tests possible for firmware; verification is `./build.sh` succeeding + UF2 magic-byte checks + human flash + hardware key check.

---

## Pre-flight context (read before starting)

**Read these first:**
- `AGENTS.md` — repo conventions, pedagogical mode, scope policy (halt + surface anything not in this plan), build/test/flash procedures
- `config/glove80.keymap` — current V2 keymap with HRMs (your starting point)
- `config/glove80.conf` — currently empty; you add one line in Task 1
- `ROADMAP.md` — current scope; you update it in Task 11
- `/tmp/sunaku-keymap.zmk` — sunaku's full keymap (reference); the source of truth for Cursor/Mouse layer key positions

**Glove80 thumb cluster geometry** (keep this open while editing):

```
LEFT THUMB CLUSTER              RIGHT THUMB CLUSTER
upper row (3 keys):              upper row (3 keys):
  outer  middle  inner             inner  middle  outer
  LSHFT  LCTRL   layer_td(LOWER)   LGUI   RCTRL   RSHFT
lower row (3 keys):              lower row (3 keys):
  outer  middle  inner             inner  middle  outer
  BSPC   DEL     LALT              RALT   RET     SPACE
```

The four positions we change in V3 are highlighted below in their respective tasks.

**Layer numbering (final):**

| # | Name | Purpose |
|---|------|---------|
| 0 | DEFAULT | QWERTY base with HRMs (V2 unchanged except 4 thumb keys) |
| 1 | LOWER | V1 stock numpad/nav (untouched) |
| 2 | MAGIC | V1 RGB/BT (untouched) |
| 3 | FACTORY_TEST | V1 (untouched) |
| 4 | BILATERAL_LH | V2 HRM enforcement (untouched) |
| 5 | BILATERAL_RH | V2 HRM enforcement (untouched) |
| **6** | **CURSOR** | **NEW: text navigation, selection, find, undo/redo** |
| **7** | **MOUSE** | **NEW: pointer movement, buttons, scroll, drag** |
| **8** | **MOUSE_SLOW** | **NEW: precision sub-layer of MOUSE** |
| **9** | **MOUSE_FAST** | **NEW: fast-travel sub-layer of MOUSE** |
| **10** | **MOUSE_WARP** | **NEW: screen-crossing sub-layer of MOUSE** |

**Build / verification commands (used in every task):**

```bash
./build.sh
# Expected: ends with "Build complete: glove80_lh.uf2 and glove80_rh.uf2"
# Both files in repo root, between 200KB and 600KB,
# starting with UF2 magic bytes 0x0A324655 at offset 0.

# Verify UF2 magic bytes:
xxd -l 4 glove80_lh.uf2 | head -1   # expect: 00000000: 5546 320a (UF2.)
xxd -l 4 glove80_rh.uf2 | head -1   # expect: 00000000: 5546 320a (UF2.)

# Verify sizes (between 200KB and 600KB):
ls -la glove80_lh.uf2 glove80_rh.uf2
```

**Commit convention** (per AGENTS.md): imperative mood subject ("Add CURSOR layer", not "Added"). Body explains WHY. No emojis.

**Scope policy:** if you discover during execution that a task requires something not in this plan (a behavior, macro, or feature not specified here), HALT and surface it to the user per AGENTS.md §Out-of-Scope. Do not silently expand.

---

## File Structure

| File | Responsibility | Lines (approx) |
|------|----------------|----------------|
| `config/glove80.conf` | One-line CONFIG override to enable ZMK pointing subsystem | +1 |
| `config/glove80.keymap` | All keymap content. Three regions changed: (a) layer-number defines block, (b) behaviors block (new wispr hold-tap + tuning for `&mmv`/`&msc`), (c) macros block (new selection macros), (d) keymap block (default-layer thumb edits + four new layer definitions) | +~300 |
| `README.md` | Status section + how-V3-works section | +~40 |
| `ROADMAP.md` | Mark V3 done; move V4 up | +~10 |
| `AGENTS.md` | Update Scope Boundaries (V2 → V3) | +~5 |

No new files created. All changes contained to existing files.

---

### Task 1: Enable ZMK pointing subsystem

**Files:**
- Modify: `config/glove80.conf` (add 1 line)

**Why:** Mouse behaviors (`&mkp`, `&mmv`, `&msc`) compile-fail unless `CONFIG_ZMK_POINTING=y` is set. This Kconfig flag activates the entire pointer subsystem and adds the mouse HID report descriptor. No keymap change yet — this task just verifies that the build still produces valid UF2 files with pointing enabled (the keymap doesn't USE any mouse keys yet, so behavior is unchanged on hardware).

- [ ] **Step 1.1: Edit `config/glove80.conf` — add the CONFIG flag**

Replace the file contents with:

```
# Kconfig overlay for the Glove80.
# CONFIG_ZMK_POINTING=y enables the mouse-emulation subsystem (mkp/mmv/msc behaviors).
# Required for the Mouse layer added in V3.
CONFIG_ZMK_POINTING=y
```

- [ ] **Step 1.2: Build and verify**

```bash
./build.sh
```

Expected: build succeeds, both UF2 files produced in repo root.

```bash
xxd -l 4 glove80_lh.uf2 | head -1   # expect 5546 320a
xxd -l 4 glove80_rh.uf2 | head -1   # expect 5546 320a
ls -la glove80_*.uf2                 # expect 200KB–600KB each
```

- [ ] **Step 1.3: Commit**

```bash
git add config/glove80.conf
git commit -m "$(cat <<'EOF'
Enable CONFIG_ZMK_POINTING for V3 Mouse layer

ZMK's mouse-emulation behaviors (mkp, mmv, msc) refuse to compile
unless the pointing subsystem is enabled at Kconfig level. This is
prerequisite plumbing for the Mouse layer that follows; no keymap
change yet, so on-hardware behavior is identical to V2.

Note: enabling pointing changes the BLE HID descriptor, so hosts
must re-pair Bluetooth on first flash with this config. USB hosts
are unaffected.
EOF
)"
```

---

### Task 2: Define new layer numbers and add empty stub layers

**Files:**
- Modify: `config/glove80.keymap` (the layer-numbers block around line 169, and add five new layer blocks at the end of `keymap` section)

**Why:** Defining the layer numbers first (and stubbing the layers as empty `&trans` arrays) lets every subsequent task add real bindings without re-touching the structural plumbing. ZMK's layer resolution requires layers to be declared before they can be referenced by `&mo`, `&lt`, or `&tog`. Empty stub layers behave as if they don't exist (all positions fall through to lower layers via `&trans`).

- [ ] **Step 2.1: Update the LAYER NUMBERS block in `config/glove80.keymap`**

Find the block starting at line 169 (`#define DEFAULT 0`) and extend it to add the five new layer numbers:

```c
// =============================================================================
// LAYER NUMBERS
// =============================================================================
// V1 layers preserved. V2 added two bilateral enforcement layers underneath.
// V3 adds CURSOR + MOUSE + three Mouse speed sublayers.
#define DEFAULT      0
#define LOWER        1
#define MAGIC        2
#define FACTORY_TEST 3
#define BILATERAL_LH 4
#define BILATERAL_RH 5
#define CURSOR       6
#define MOUSE        7
#define MOUSE_SLOW   8
#define MOUSE_FAST   9
#define MOUSE_WARP   10
```

- [ ] **Step 2.2: Add five empty stub layers at the end of the `keymap` block**

Find the closing of `bilateral_rh_layer` (around line 526) and add these five layers immediately after, before the `};` that closes `keymap`:

```c
        // =====================================================================
        // V3: CURSOR layer (text navigation). Stubbed in Task 2; filled in
        // Tasks 6–7. While stubbed, all positions are &trans → no behavior
        // change vs. V2.
        // =====================================================================
        cursor_layer {
            bindings = <
        &trans  &trans  &trans  &trans  &trans                                                                                          &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans          &trans  &trans  &trans  &trans  &trans  &trans                                  &trans  &trans  &trans  &trans  &trans
            >;
        };

        // V3: MOUSE base layer (pointer + buttons + scroll). Stub; filled Task 9.
        mouse_layer {
            bindings = <
        &trans  &trans  &trans  &trans  &trans                                                                                          &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans          &trans  &trans  &trans  &trans  &trans  &trans                                  &trans  &trans  &trans  &trans  &trans
            >;
        };

        // V3: MOUSE_SLOW sublayer (precision). Same key positions as MOUSE,
        // but with reduced movement scaler (set up in Task 10). Filled Task 10.
        mouse_slow_layer {
            bindings = <
        &trans  &trans  &trans  &trans  &trans                                                                                          &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans          &trans  &trans  &trans  &trans  &trans  &trans                                  &trans  &trans  &trans  &trans  &trans
            >;
        };

        // V3: MOUSE_FAST sublayer (fast travel). Filled Task 10.
        mouse_fast_layer {
            bindings = <
        &trans  &trans  &trans  &trans  &trans                                                                                          &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans          &trans  &trans  &trans  &trans  &trans  &trans                                  &trans  &trans  &trans  &trans  &trans
            >;
        };

        // V3: MOUSE_WARP sublayer (screen-crossing). Filled Task 10.
        mouse_warp_layer {
            bindings = <
        &trans  &trans  &trans  &trans  &trans                                                                                          &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans                          &trans  &trans  &trans  &trans  &trans  &trans
        &trans  &trans  &trans  &trans  &trans          &trans  &trans  &trans  &trans  &trans  &trans                                  &trans  &trans  &trans  &trans  &trans
            >;
        };
```

- [ ] **Step 2.3: Build and verify**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
ls -la glove80_*.uf2
```

Expected: build succeeds; UF2s present; no behavior change.

- [ ] **Step 2.4: Commit**

```bash
git add config/glove80.keymap
git commit -m "$(cat <<'EOF'
Declare CURSOR, MOUSE, and Mouse speed sublayer slots

Adds layer numbers 6–10 and five empty stub layers (all &trans) so
later commits can fill them without touching layer-numbering plumbing.
No on-hardware behavior change: stub layers fall through to lower
layers on every position.

V3 architecture: CURSOR (text nav) and MOUSE (pointer) are peer
top-level layers. MOUSE_SLOW/FAST/WARP are sublayers reachable
only while MOUSE is active. Numbering reserves room above 10 for
V4+ layers (Symbol, Number, Function, Wispr).
EOF
)"
```

---

### Task 3: Add HYPER macro and wispr hold-tap behavior

**Files:**
- Modify: `config/glove80.keymap` (the V2 CONFIGURATION block around line 48, and the `behaviors` block around line 197)

**Why:** Two new things to register before they can be used on the default layer in Task 4:
1. **HYPER** — `LC(LS(LG(LALT)))`, the four-modifier chord macOS Raycast/Hammerspoon listen for. Already defined on line 48 of your keymap — confirm it's still there. Pedagogical note: Hyper is *not* a layer; it's a single keypress that sends four modifiers simultaneously, which OS tools then map to single-key shortcuts.
2. **`wispr`** — a custom hold-tap behavior. Hold side emits F18 (Wispr Flow's push-to-talk hotkey); tap side emits F19 (toggle). The user configures Wispr Flow on the macOS host to listen for these exact keys.

- [ ] **Step 3.1: Verify the HYPER `#define` is present**

Open `config/glove80.keymap`. Around line 48 confirm:

```c
#define HYPER LC(LS(LG(LALT)))
```

If absent (it should be there from V2), add it back. No build needed yet — verification happens in Task 4 when Hyper is actually used.

- [ ] **Step 3.2: Add the `wispr` hold-tap behavior**

In the `behaviors` block (starts ~line 177), find the closing `};` of the `hmr_pinky` behavior (around line 331) and add the wispr behavior immediately after, BEFORE the `};` closing the `behaviors` block. The full insertion:

```c
        // =====================================================================
        // V3: wispr hold-tap behavior.
        // =====================================================================
        // Single thumb key, two outputs for Wispr Flow dictation:
        //   - HOLD = F18 (Wispr Flow "push-to-talk" hotkey)
        //   - TAP  = F19 (Wispr Flow "toggle dictation" hotkey)
        //
        // Why F18/F19: most apps and macOS ignore these "extended" function
        // keys, so collision risk is near-zero. Wispr Flow accepts them as
        // single-key shortcuts (no modifier limit issue).
        //
        // Host-side prerequisite: open Wispr Flow > Preferences and set:
        //   "Push-to-talk hotkey" = F18
        //   "Toggle dictation hotkey" = F19
        //
        // flavor = "tap-preferred": only resolves to hold if held past
        // tapping-term-ms. Safer than hold-preferred for a frequently-tapped
        // key (you'd rather miss a push-to-talk than misfire it).
        wispr: wispr_hold_tap {
            compatible = "zmk,behavior-hold-tap";
            label = "WISPR_HOLD_TAP";
            #binding-cells = <2>;
            flavor = "tap-preferred";
            tapping-term-ms = <200>;
            bindings = <&kp>, <&kp>;
        };
```

- [ ] **Step 3.3: Build and verify**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
```

Expected: build succeeds. Wispr behavior is declared but not yet used; no behavior change.

- [ ] **Step 3.4: Commit**

```bash
git add config/glove80.keymap
git commit -m "$(cat <<'EOF'
Add wispr hold-tap behavior for Wispr Flow dictation

Single key, two outputs:
  hold = F18 (push-to-talk)
  tap  = F19 (toggle dictation on/off)

F18 and F19 chosen because no macOS shortcut or common app binds
them by default — zero collision risk and within Wispr Flow's
3-key shortcut limit (they're literally single keys).

Behavior is declared here so Task 4 can bind it to the right
thumb upper-outer position (replacing the redundant RSHFT,
which we already have via the J-finger HRM).

Host-side setup required after flashing: set Wispr Flow's two
hotkeys to F18 and F19 in its preferences.
EOF
)"
```

---

### Task 4: Update default-layer thumb cluster (the four key swaps)

**Files:**
- Modify: `config/glove80.keymap` (the `default_layer` bindings around lines 449–456)

**Why:** This is where V3 becomes user-visible. Four thumb positions change:

| Position | V2 | V3 | What changed |
|---|---|---|---|
| LH upper-outer | `&kp LSHFT` | `&mt HYPER LSHFT` | Hold = Hyper (Cmd+Opt+Ctrl+Shift), tap = LSHFT |
| LH lower-inner | `&kp LALT` | `&mo CURSOR` | Pure CURSOR layer activator. Alt is HRM-only now. |
| RH lower-inner | `&kp RALT` | `&mo MOUSE` | Pure MOUSE layer activator. |
| RH upper-outer | `&kp RSHFT` | `&wispr F18 F19` | Wispr hold-tap |

All other thumb positions (BSPC, DEL, LCTRL, layer_td, LGUI, RCTRL, RET, SPACE) unchanged.

- [ ] **Step 4.1: Edit the `default_layer` bindings block in `config/glove80.keymap`**

Find the `default_layer` block (starts ~line 437). The relevant rows are 5 and 6 (the thumb cluster). Replace lines 454–455 with:

```c
            &kp GRAVE      &kp Z    &kp X       &kp C       &kp V       &kp B   &mt HYPER LSHFT &kp LCTRL   &layer_td  &kp LGUI  &kp RCTRL &wispr F18 F19                        &kp N   &kp M   &kp COMMA             &kp DOT               &kp FSLH              &kp PG_UP
            &magic MAGIC 0 &kp HOME &kp END     &kp LEFT    &kp RIGHT           &kp BSPC    &kp DEL     &mo CURSOR &mo MOUSE  &kp RET   &kp SPACE                                     &kp UP  &kp DOWN              &kp LBKT              &kp RBKT              &kp PG_DN
```

Diff explanation (read carefully — column count matters):
- Row 5 (thumb upper row): `&kp LSHFT` → `&mt HYPER LSHFT` (LH outer); `&kp RSHFT` → `&wispr F18 F19` (RH outer).
- Row 6 (thumb lower row): `&kp LALT` → `&mo CURSOR` (LH inner); `&kp RALT` → `&mo MOUSE` (RH inner).

- [ ] **Step 4.2: Build and verify**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
ls -la glove80_*.uf2
```

Expected: build succeeds. After flashing this firmware, on hardware:
- LH upper-outer thumb: tap = Shift; hold-then-release = nothing visible (Hyper does nothing without a follow-up keypress)
- LH lower-inner thumb: hold = CURSOR layer (but Cursor is still stubbed, so &trans everywhere → no visible change)
- RH lower-inner thumb: hold = MOUSE layer (same — stubbed)
- RH upper-outer thumb: tap = F19; hold = F18 (visible only if Wispr Flow or another app is listening)

- [ ] **Step 4.3: Commit**

```bash
git add config/glove80.keymap
git commit -m "$(cat <<'EOF'
Swap four default-layer thumb keys for V3 layer activators

Changes (LH = left thumb cluster, RH = right thumb cluster):
  LH upper-outer:  LSHFT → &mt HYPER LSHFT
                   Hold = Hyper (Cmd+Opt+Ctrl+Shift) for Raycast/
                   Hammerspoon. Tap kept as LSHFT (redundant with
                   F-finger HRM but useful as a low-effort backup).

  LH lower-inner:  LALT  → &mo CURSOR
                   Pure CURSOR layer activator. Alt is now exclusively
                   on the S-finger HRM (per user preference).

  RH lower-inner:  RALT  → &mo MOUSE
                   Pure MOUSE layer activator. Alt is on the L-finger
                   HRM as before.

  RH upper-outer:  RSHFT → &wispr F18 F19
                   Hold = F18 (Wispr push-to-talk).
                   Tap  = F19 (Wispr toggle).
                   RSHFT was already redundant with the J-finger HRM.

Layer behavior is gated by the stub layers added in Task 2: holding
&mo CURSOR or &mo MOUSE activates the layer but every position is
&trans, so user-visible behavior is unchanged until Tasks 6–10
fill in the bindings.
EOF
)"
```

---

### Task 5: Add selection-helper macros (select_word, select_line, select_all)

**Files:**
- Modify: `config/glove80.keymap` (the `macros` block around line 334)

**Why:** Sunaku's Cursor layer references three macros that don't exist in our keymap:
- `select_all` — Cmd+A on macOS
- `select_line` — Cmd+Left, Cmd+Shift+Right (jump to line start, then select to line end)
- `select_word` — Option+Left, Option+Shift+Right (jump to word start, then select to word end)

These are convenience macros bound to specific keys on the Cursor layer in Task 7. Without them, Task 7 would fail to compile.

Pedagogical note: a *macro* in ZMK is a sequence of keystrokes emitted in order. `&kp LG(A)` sends Cmd+A. The select_word/select_line macros do a "deselect then re-select" dance because pressing them multiple times should expand the selection by word/line — not toggle.

- [ ] **Step 5.1: Add three new macros**

In the `macros` block (~line 334), find the closing `};` of `bilateral_hold_rh` (~line 428). Immediately before the `};` that closes the `macros` block, add:

```c
        // =====================================================================
        // V3: selection-helper macros for the Cursor layer.
        // =====================================================================

        // select_all — Cmd+A. Wrapped as a macro (not a plain &kp) so the
        // Cursor layer can reference it by name like sunaku does.
        select_all: select_all {
            label = "SELECT_ALL";
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings = <&kp LG(A)>;
        };

        // select_line — jump to start of line, then shift+select to end.
        // macOS line-start is Cmd+Left; line-end is Cmd+Right.
        select_line: select_line {
            label = "SELECT_LINE";
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            wait-ms = <1>;
            tap-ms = <1>;
            bindings = <&kp LG(LEFT) &kp LG(LS(RIGHT))>;
        };

        // select_word — jump to start of word, then shift+select to end.
        // macOS word-start is Option+Left; word-end is Option+Right.
        select_word: select_word {
            label = "SELECT_WORD";
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            wait-ms = <1>;
            tap-ms = <1>;
            bindings = <&kp LA(LEFT) &kp LA(LS(RIGHT))>;
        };
```

- [ ] **Step 5.2: Build and verify**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
```

Expected: build succeeds; macros declared but not yet used.

- [ ] **Step 5.3: Commit**

```bash
git add config/glove80.keymap
git commit -m "$(cat <<'EOF'
Add select_all, select_line, select_word macros

These are convenience macros consumed by the V3 Cursor layer
(Tasks 6–7). Mirrors sunaku's pattern: a macro name per
selection scope, so the Cursor layer reads as
"select_word, select_line, select_all" rather than three
nested &kp expressions.

Implementation is macOS-specific (LG = Cmd, LA = Option).
The select_line/select_word macros do a "jump-to-start +
shift-select-to-end" sequence so the selection grows
predictably when the user presses the macro repeatedly.
EOF
)"
```

---

### Task 6: Fill CURSOR layer — right hand (arrows, page nav, edits, find)

**Files:**
- Modify: `config/glove80.keymap` (the `cursor_layer` block added in Task 2)

**Why:** The right hand of sunaku's Cursor layer is the navigation workhorse: arrows in a horizontal row, page-nav directly below, and find/find-prev/find-next on the lowest row. Editing primitives (Undo, Redo, Cut, Copy, Paste, Tab, Shift-Tab) sit on the upper rows.

Pedagogical note about LS(TAB): `LS` = Left Shift, applied to TAB → Shift+Tab. Inverse of `&kp TAB` for backwards-tabbing through fields.

- [ ] **Step 6.1: Replace the right-hand columns of `cursor_layer`**

Find the `cursor_layer` block (added in Task 2). Replace its `bindings` with the version below. This fills the right-hand half of every row; left-hand columns remain `&trans` until Task 7.

```c
        cursor_layer {
            bindings = <
        &trans  &trans  &trans  &trans  &trans                                                                                          &trans       &trans         &trans          &trans         &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &trans       &trans         &kp LS(TAB)     &trans         &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &kp LS(TAB)  &kp LG(Z)      &kp LG(LS(Z))   &kp TAB        &trans
        &trans  &trans  &trans  &trans  &trans  &trans                                                                          &trans  &kp LEFT     &kp UP         &kp DOWN        &kp RIGHT      &trans
        &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans  &trans                          &trans  &kp LG(LEFT) &kp PG_UP      &kp PG_DN       &kp LG(RIGHT)  &trans
        &trans  &trans  &trans  &trans  &trans          &trans  &trans  &trans  &trans  &trans  &trans                                  &kp LG(F)    &kp LG(LS(G))  &kp LG(G)       &trans         &trans
            >;
        };
```

Pedagogical key-by-key on the right hand:
- Row 2 (Y/U/I/O/P equivalents): mostly `&trans`, with **Shift-Tab on the O position** for backwards field traversal in dialogs.
- Row 3 (H/J/K/L/;): Shift-Tab, **Undo (Cmd+Z), Redo (Cmd+Shift+Z), Tab** — common editing primitives within reach.
- Row 4 (home row mirror): **Left, Up, Down, Right** in a horizontal row. This is the arrow cluster. You can't conflict with right-hand HRMs because the Cursor layer overrides them.
- Row 5 (N/M/,/./...): **Cmd+Left (line start), PgUp, PgDn, Cmd+Right (line end)** — page-nav row.
- Row 6: **Cmd+F (find), Cmd+Shift+G (find previous), Cmd+G (find next)** — find row.

- [ ] **Step 6.2: Build and verify**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
```

Expected: build succeeds. After flashing, holding the LH inner-lower thumb (CURSOR activator) and pressing right-hand keys produces the arrows / page nav / find / edits as documented.

- [ ] **Step 6.3: Commit**

```bash
git add config/glove80.keymap
git commit -m "$(cat <<'EOF'
Fill Cursor layer right hand (arrows, page nav, find, edits)

Right-hand layout follows sunaku's Glorious Engrammer pattern:
  row 4 (home row): horizontal arrows  Left, Up, Down, Right
  row 5: page-nav line   Cmd+Left, PgUp, PgDn, Cmd+Right
  row 6: find line       Cmd+F, Cmd+Shift+G, Cmd+G
  row 3: edit primitives Shift-Tab, Cmd+Z (undo), Cmd+Shift+Z (redo), Tab

Why this exact layout: sunaku's choice optimizes for the most-used
nav action (arrow keys) on the strongest fingers in their most
natural position — home row right hand. Page and line navigation
sit one row away on the bottom, mirroring the visual layout of
"scrolling through a document".

Left half of the layer stays &trans for now; Task 7 fills it with
selection helpers and copy/cut/paste.
EOF
)"
```

---

### Task 7: Fill CURSOR layer — left hand (sticky shift, selection helpers, edits)

**Files:**
- Modify: `config/glove80.keymap` (the `cursor_layer` block)

**Why:** Left half of the Cursor layer provides:
- **Sticky shift** on outer column (`&sk LSHFT`) — tap once, the *next* key is shifted. Combined with right-hand arrows, this is how you do shift-select (e.g., select-to-end-of-line: sticky-shift then Cmd+Right).
- **Cut / Copy / Paste** on the outer column too — high-frequency edits at thumb-stretch distance.
- **Selection helpers** (select_all, select_line, select_word) on home-row equivalents.
- **Find** (Cmd+F) on the index finger.

Pedagogical note: `&sk` = "sticky key". Tap once, the next keystroke gets the modifier (Shift here), then it auto-releases. Same idea as macOS's Sticky Keys accessibility feature.

- [ ] **Step 7.1: Replace cursor_layer with both halves filled**

Replace the entire `cursor_layer` block with:

```c
        cursor_layer {
            bindings = <
        &trans       &trans         &trans          &trans         &trans                                                                                            &trans       &trans         &trans          &trans         &trans
        &trans       &kp ESC        &kp INS         &kp LS(TAB)    &kp DEL        &trans                                                                    &trans  &trans       &trans         &kp LS(TAB)     &trans         &trans
        &trans       &kp RET        &kp SPACE       &kp TAB        &kp BSPC       &kp LG(X)                                                                 &kp LG(X)  &kp LS(TAB)  &kp LG(Z)      &kp LG(LS(Z))   &kp TAB        &trans
        &sk LSHFT    &kp LCTRL      &kp LALT        &kp LGUI       &kp LSHFT      &kp LG(C)                                                                 &kp LG(C)  &kp LEFT     &kp UP         &kp DOWN        &kp RIGHT      &sk LSHFT
        &kp LG(L)    &select_all    &select_line    &select_word   &kp LG(F)      &kp LG(V)      &trans  &trans  &trans  &trans  &trans  &trans              &kp LG(V)  &kp LG(LEFT) &kp PG_UP      &kp PG_DN       &kp LG(RIGHT)  &kp LG(L)
        &kp LG(K)    &kp LG(Z)      &kp LG(LS(Z))   &kp LG(LS(G))  &kp LG(G)              &trans  &trans  &trans  &trans  &trans  &trans                                &kp LG(F)    &kp LG(LS(G))  &kp LG(G)       &kp LG(H)      &kp LG(K)
            >;
        };
```

Pedagogical key-by-key on the left hand:
- Row 2 (Q/W/E/R/T): `Esc, Ins, Shift-Tab, Del` mirror — when in nav mode, escape and delete are at-hand.
- Row 3 (A/S/D/F/G): `Enter, Space, Tab, Backspace, Cmd+X (cut)` — the most-common editing keys reachable without leaving Cursor.
- Row 4 (home row): outer = `&sk LSHFT`; the four home-row positions stay as direct modifier presses (LCTRL/LALT/LGUI/LSHFT, our CAGS order) so HRM muscle memory still works on Cursor layer; G = `Cmd+C (copy)`.
- Row 5: `Cmd+L` (browser address bar / editor goto-line), select_all, select_line, select_word, `Cmd+F (find)`, `Cmd+V (paste)`.
- Row 6: `Cmd+K` (palette / link create), Undo, Redo, Find-Prev, Find-Next.

The outermost column has `&sk LSHFT` (row 4), `Cmd+L` (row 5), `Cmd+K` (row 6) — same on both ends so muscle memory works left-or-right.

- [ ] **Step 7.2: Build and verify**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
ls -la glove80_*.uf2
```

Expected: build succeeds. Cursor layer is fully functional after flash.

- [ ] **Step 7.3: Commit**

```bash
git add config/glove80.keymap
git commit -m "$(cat <<'EOF'
Fill Cursor layer left hand (selection, edits, sticky shift)

Left-hand contents:
  row 3: Enter, Space, Tab, Backspace, Cmd+X (cut)
  row 4: sticky LSHFT (outer), CAGS modifiers (home), Cmd+C (copy)
  row 5: Cmd+L, select_all, select_line, select_word, Cmd+F, Cmd+V
  row 6: Cmd+K, Undo, Redo, Find-Prev, Find-Next

Sticky shift on the outer column enables shift-select workflows:
tap &sk LSHFT once, then a right-hand arrow extends the selection.
This pairs with the select_word/line/all macros for hierarchical
selection.

Home-row modifiers stay as plain CAGS &kp on the Cursor layer
(no HRM hold-tap) so the user can hold Cmd/Shift while pressing
right-hand nav keys — exactly the action HRMs would block on the
default layer.
EOF
)"
```

---

### Task 8: Configure mouse-motion tuning

**Files:**
- Modify: `config/glove80.keymap` (add tuning directives at the top of the file, near the V2 CONFIGURATION block)

**Why:** ZMK's mouse subsystem has runtime-tunable acceleration, peak speed, and time-to-max-speed. Defaults are conservative. Sunaku's tuning (which we adopt) feels reactive without being twitchy on a typical 1440p–2160p display.

Pedagogical note:
- **`time-to-max-speed-ms`**: how long the cursor takes to ramp from zero to peak speed. Lower = more reactive; higher = more controllable for fine clicks.
- **`acceleration-exponent`**: 0 = linear ramp; 1 = quadratic feel; higher = explosive acceleration. 1 feels like a real mouse.
- **`ZMK_POINTING_DEFAULT_MOVE_VAL`**: peak pixels-per-tick at full speed. Higher = cursor crosses the screen faster.

- [ ] **Step 8.1: Add tuning `#define`s near the V2 CONFIGURATION block**

In `config/glove80.keymap`, find the V2 CONFIGURATION comment block (around line 50). After the existing `#define` lines and BEFORE the per-finger holding-time defines, add a new V3 CONFIGURATION subsection:

```c
// =============================================================================
// V3 MOUSE CONFIGURATION
// =============================================================================
// Tuning the ZMK pointing subsystem. Defaults are conservative; these values
// match sunaku's choices and feel reactive without being twitchy on 1440p+.
//
// MOUSE_MOVE_MAX — peak cursor speed (pixels per tick at full speed).
//   Higher = cursor crosses screen faster. 600 is sunaku's default for HiDPI.
// MOUSE_SCROLL_MAX — peak scroll speed (lines per tick).
//   Lower than move because scroll is per-line, not per-pixel.
// MOUSE_TIME_TO_MAX — ramp duration from 0 to peak (ms).
//   300 ms feels real-mouse-like; <200 ms is twitchy; >500 ms feels sluggish.
// MOUSE_ACCEL_EXP — 0 = linear ramp, 1 = quadratic (gaming-mouse feel).
#define ZMK_POINTING_DEFAULT_MOVE_VAL 600
#define ZMK_POINTING_DEFAULT_SCRL_VAL 20
```

- [ ] **Step 8.2: Override `&mmv` and `&msc` properties in the `behaviors` block**

After the V3 wispr behavior added in Task 3, add references to the built-in `&mmv` and `&msc` to set their per-behavior tunables. Add this immediately after the wispr definition (still inside `behaviors`):

```c
        // =====================================================================
        // V3: Mouse motion + scroll tuning.
        // =====================================================================
        // Overrides for the built-in &mmv (mouse move) and &msc (mouse scroll)
        // behaviors. acceleration-exponent=1 = quadratic feel like a real
        // mouse. time-to-max-speed-ms = ramp duration; 300 = sunaku's default.
        ;  // (placeholder — the actual overrides go below at root level)
```

Then, outside the `behaviors` block (at the root level of the devicetree, right before `keymap {`), add the overrides:

```c
    &mmv {
        time-to-max-speed-ms = <300>;
        acceleration-exponent = <1>;
        delay-ms = <0>;
    };

    &msc {
        time-to-max-speed-ms = <300>;
        acceleration-exponent = <0>;
        delay-ms = <0>;
    };
```

If a `&mmv { … };` block already exists from a Zephyr include, **stop and surface to the user** — this would conflict with an existing definition.

- [ ] **Step 8.3: Build and verify**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
```

Expected: build succeeds. Tuning is applied to the built-in mouse behaviors; no on-hardware change until the MOUSE layer actually uses them in Task 9.

If the build fails with "node not found: &mmv" or similar, the symbol may not be available at root level in our ZMK fork. In that case, **stop and surface to the user** so we can move the tuning into a `#include` or behavior-local properties instead.

- [ ] **Step 8.4: Commit**

```bash
git add config/glove80.keymap
git commit -m "$(cat <<'EOF'
Tune mouse motion + scroll for HiDPI feel

  ZMK_POINTING_DEFAULT_MOVE_VAL = 600  (peak px/tick)
  ZMK_POINTING_DEFAULT_SCRL_VAL = 20   (peak lines/tick)
  &mmv time-to-max = 300 ms, accel-exp = 1 (quadratic)
  &msc time-to-max = 300 ms, accel-exp = 0 (linear)

Sunaku's values, validated by multiple Glove80 users at 1440p+
displays. Quadratic acceleration on move makes the cursor feel
like a real mouse; linear scroll prevents over-scroll on short
holds.

Speed sublayers (Task 10) will scale these base values via input
processors, not by changing these constants.
EOF
)"
```

---

### Task 9: Fill MOUSE base layer (movement, buttons, scroll, drag)

**Files:**
- Modify: `config/glove80.keymap` (the `mouse_layer` block)

**Why:** The base MOUSE layer is what activates when you hold the RH inner-down thumb. Layout follows sunaku exactly:
- **Left hand:** inverted-T cursor movement (MOVE_UP above, MOVE_LEFT/DOWN/RIGHT on home-row equivalents), with scroll on the outside columns.
- **Right hand:** LCLK/MCLK/RCLK on row 3, speed-sublayer selectors (FAST/WARP/SLOW) on row 4, a mirror movement cluster on row 5, MB4/MB5 on the outer column.
- **Left thumb T5 (lower-inner thumb of the LH cluster):** LCLK for drag — you hold left-thumb-LCLK while your right hand moves the cursor. Sunaku's drag pattern.

Pedagogical note on the inverted-T:
```
                MOVE_UP
MOVE_LEFT   MOVE_DOWN   MOVE_RIGHT
```
Two-row cluster where the top row has only the up-arrow position filled and the row below has left/down/right. This makes visual sense: up is "above" left/down/right.

- [ ] **Step 9.1: Replace the `mouse_layer` bindings**

```c
        mouse_layer {
            bindings = <
        &trans  &trans  &trans              &trans            &trans                                                                                                                              &trans                  &trans               &trans                &trans                  &trans
        &trans  &trans  &trans              &trans            &trans              &trans                                                                                                  &trans  &trans                  &trans               &trans                &trans                  &trans
        &trans  &trans  &msc SCRL_LEFT      &mmv MOVE_UP      &msc SCRL_RIGHT     &trans                                                                                                  &trans  &mkp LCLK               &mkp MCLK            &mkp RCLK             &trans                  &trans
        &trans  &trans  &mmv MOVE_LEFT      &mmv MOVE_DOWN    &mmv MOVE_RIGHT     &trans                                                                                                  &trans  &mo MOUSE_FAST          &mo MOUSE_WARP       &mo MOUSE_SLOW        &trans                  &mkp MB4
        &trans  &trans  &msc SCRL_UP        &msc SCRL_DOWN    &trans              &trans     &trans  &trans   &mkp LCLK   &trans  &trans  &trans                                          &trans  &mmv MOVE_LEFT          &mmv MOVE_UP         &mmv MOVE_DOWN        &mmv MOVE_RIGHT         &mkp MB5
        &trans  &trans  &trans              &trans            &trans                         &mkp LCLK  &mkp RCLK  &mkp MB4  &trans  &trans  &trans                                              &trans                  &trans               &trans                &trans                  &trans
            >;
        };
```

Pedagogical key-by-key:
- **Left-hand row 3 (W/E/R columns)**: `SCRL_LEFT, MOVE_UP, SCRL_RIGHT` — scroll on the outer keys, MOVE_UP in the middle.
- **Left-hand row 4 (S/D/F columns)**: `MOVE_LEFT, MOVE_DOWN, MOVE_RIGHT` — the bottom of the inverted-T.
- **Left-hand row 5 (X/C columns)**: `SCRL_UP, SCRL_DOWN` — vertical scroll on the bottom row.
- **Right-hand row 3 (J/K/L columns)**: `LCLK, MCLK, RCLK` — the three mouse buttons in finger-natural order.
- **Right-hand row 4 (J/K/L columns)**: `MOUSE_FAST, MOUSE_WARP, MOUSE_SLOW` — speed sublayer activators held with the right hand.
- **Right-hand row 5**: a *second* movement cluster (`MOVE_LEFT, MOVE_UP, MOVE_DOWN, MOVE_RIGHT`) — for when the left hand is busy holding a speed sublayer.
- **Right-hand outer column**: `MB4 (browser back), MB5 (browser forward)`.
- **Thumb keys**: left thumb T5 (inner-up position) = `&mkp LCLK` — your drag handle. Hold this with your left thumb, move the cursor with the right hand, release to drop.

The pattern in plain English: most mousing is done with the left hand for movement and right hand for clicks. If you want to drag, hold the left thumb LCLK and move with the right hand. If you want to use speed modulation, hold a right-hand speed key and move with either left or right hand.

- [ ] **Step 9.2: Build and verify**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
ls -la glove80_*.uf2
```

Expected: build succeeds.

- [ ] **Step 9.3: Commit**

```bash
git add config/glove80.keymap
git commit -m "$(cat <<'EOF'
Fill Mouse base layer (inverted-T movement, buttons, scroll, drag)

Layout follows sunaku's Glorious Engrammer:

Left hand (movement):
  row 3: scroll-left, MOVE_UP, scroll-right
  row 4: MOVE_LEFT, MOVE_DOWN, MOVE_RIGHT     (inverted-T cluster)
  row 5: scroll-up, scroll-down

Right hand (buttons + speed + mirror movement):
  row 3: LCLK, MCLK, RCLK
  row 4: speed sublayers (Fast, Warp, Slow)
  row 5: mirror movement cluster L/U/D/R, with MB5 on outer
  outer column: MB4 (browser back), MB5 (browser forward)

Drag: left thumb T5 = &mkp LCLK. Hold with left thumb, move
with right hand.

Speed sublayers (MOUSE_SLOW/FAST/WARP) are declared as layers
but contain no bindings until Task 10 — they activate but do
nothing yet.
EOF
)"
```

---

### Task 10: Fill MOUSE_SLOW / MOUSE_FAST / MOUSE_WARP sublayers and configure speed scaling

**Files:**
- Modify: `config/glove80.keymap` (the three sublayer blocks and add `&mmv_input_listener` / `&msc_input_listener` configurations)

**Why:** The speed sublayers exist as layers but their key positions inherit from MOUSE via `&trans`. The actual *speed* difference comes from ZMK's input-processor `zip_xy_scaler` applied to the mouse-move listener. The scaler reads which layer is active and multiplies the move/scroll values accordingly. This is urob's cleaner pattern (preferred over duplicating the entire MOUSE layer three times like sunaku does).

Pedagogical note on input processors: ZMK's pointing subsystem has an "input listener" pipeline that sits between the `&mmv`/`&msc` behaviors and the HID output. Processors like `zip_xy_scaler N D` multiply the X/Y values by N/D (so `1 12` = 1/12 = slow, `4 1` = 4x = fast). The listener checks which layer is co-active and applies the matching scaler.

- [ ] **Step 10.1: Replace each sublayer's bindings to fall through to MOUSE**

Since the speed sublayers should have *identical* key positions to MOUSE (same movement, same buttons, same scroll), we keep them as full `&trans` arrays. The user must hold the MOUSE thumb AND a speed-sublayer key on MOUSE simultaneously; this activates both layers; MOUSE provides the bindings, sublayers only signal which scaler to apply.

The three sublayer blocks (`mouse_slow_layer`, `mouse_fast_layer`, `mouse_warp_layer`) should remain all `&trans` as added in Task 2. **No changes to the keymap blocks themselves in this step.**

- [ ] **Step 10.2: Add `&mmv_input_listener` and `&msc_input_listener` configurations**

In `config/glove80.keymap`, at the root level of the devicetree (same level as the `&mmv` / `&msc` overrides from Task 8), add:

```c
    &mmv_input_listener {
        precision {
            layers = <MOUSE_SLOW>;
            input-processors = <&zip_xy_scaler 1 4>;   // 1/4 speed
        };
        warp {
            layers = <MOUSE_WARP>;
            input-processors = <&zip_xy_scaler 6 1>;   // 6x speed
        };
        fast {
            layers = <MOUSE_FAST>;
            input-processors = <&zip_xy_scaler 2 1>;   // 2x speed
        };
    };

    &msc_input_listener {
        precision {
            layers = <MOUSE_SLOW>;
            input-processors = <&zip_scroll_scaler 1 4>;
        };
        fast {
            layers = <MOUSE_FAST>;
            input-processors = <&zip_scroll_scaler 2 1>;
        };
    };
```

If the build fails with "node not found: &mmv_input_listener" or "&zip_xy_scaler not found", these processors may not be exposed by our ZMK fork's includes. **Stop and surface to the user** with the exact error so we can include `<input/processors/scaler.dtsi>` or similar.

- [ ] **Step 10.3: Build and verify**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
ls -la glove80_*.uf2
```

Expected: build succeeds. After flashing:
- Holding right-thumb-MOUSE + LH index (MOVE_RIGHT) = cursor moves right at base speed.
- Holding right-thumb-MOUSE + RH L (MOUSE_SLOW) + LH index (MOVE_RIGHT) = cursor moves right at 1/4 speed.
- Holding right-thumb-MOUSE + RH J (MOUSE_FAST) + LH index (MOVE_RIGHT) = cursor moves right at 2x speed.
- Holding right-thumb-MOUSE + RH K (MOUSE_WARP) + LH index (MOVE_RIGHT) = cursor warps across screen.

- [ ] **Step 10.4: Commit**

```bash
git add config/glove80.keymap
git commit -m "$(cat <<'EOF'
Activate Mouse speed sublayers via input processors

MOUSE_SLOW   = 1/4 base speed (precision clicks, drag-to-pixel)
MOUSE_FAST   = 2x   base speed (cross-pane sweeps)
MOUSE_WARP   = 6x   base speed (screen-crossing jumps)

Implementation uses urob's pattern: a single MOUSE layer with
&zip_xy_scaler input processors keyed off which sublayer is
co-active. Cleaner than duplicating the MOUSE layer three
times (sunaku's approach) — sublayer blocks stay all-&trans;
their only function is to signal the active scaler.

Scroll has its own scaler stack (zip_scroll_scaler) so
precision and fast modes work for scrolling too.
EOF
)"
```

---

### Task 11: Update documentation (README, ROADMAP, AGENTS.md)

**Files:**
- Modify: `README.md` (status section + how-V3-works section)
- Modify: `ROADMAP.md` (mark V3 done, list V4 next)
- Modify: `AGENTS.md` (scope boundaries)

**Why:** Per AGENTS.md, every iteration updates its scope boundaries and visible status. Without this, future agents will think V2 is the current frontier.

- [ ] **Step 11.1: Update `README.md` status section**

Replace the existing "Status (V2 — Home Row Mods)" section (around lines 7–13) with a V3 status section:

```markdown
## Status (V3 — Cursor + Mouse Layers)

V3 adds two new layers on top of V2's HRM baseline:

- **Cursor layer** (text navigation) — hold the **left inner-lower thumb** to access arrows, page nav, find, undo/redo, copy/cut/paste, selection helpers, and sticky shift for shift-select workflows.
- **Mouse layer** (pointer control) — hold the **right inner-lower thumb** for an inverted-T cursor cluster (left hand), mouse buttons (right hand), scroll (outer columns), and three speed sublayers (Slow=1/4, Fast=2×, Warp=6×) reachable from the Mouse layer's right hand.

Two new direct keys on the default layer:
- **Hyper** (Cmd+Opt+Ctrl+Shift) — hold the **left upper-outer thumb**. Tap that thumb for plain Shift (HRM-equivalent fallback).
- **Wispr Flow dictation** — **right upper-outer thumb**. Hold = F18 (push-to-talk); tap = F19 (toggle). Configure Wispr Flow on the host to use these hotkeys.

The inner-lower thumb keys (previously Alt) are now layer activators. Alt is handled exclusively by the S-finger (LH) and L-finger (RH) HRMs.

All V2 features still work. V1 baseline still preserved in git at commit `a61129d`.

See [ROADMAP.md](ROADMAP.md) for what's next.
```

- [ ] **Step 11.2: Update `ROADMAP.md`**

Replace the file's "Current Features" and "Planned" sections to reflect V3 shipped:

```markdown
# ROADMAP

Tracks what works today (V3) and what is planned next, in order. No commitments to dates.

## Current Features (V3 — V2 baseline + Cursor and Mouse layers)

All V2 features still work. V3 adds Cursor and Mouse top-level layers, three Mouse speed sublayers, a Hyper key, and a Wispr Flow hotkey.

**V2 baseline preserved (V1 lives at commit `a61129d`).**

**V3 additions:**
- Cursor layer (hold LH lower-inner thumb): arrows, page nav, find, undo/redo, copy/cut/paste, select_word/line/all, sticky shift
- Mouse layer (hold RH lower-inner thumb): inverted-T movement, three buttons + MB4/MB5, scroll, drag (LCLK on left thumb T5)
- Mouse speed sublayers (held with RH index/middle/ring on Mouse layer): SLOW (1/4×), FAST (2×), WARP (6×)
- Hyper key on LH upper-outer thumb: `&mt HYPER LSHFT` (hold=Hyper, tap=Shift)
- Wispr Flow hotkey on RH upper-outer thumb: F18 hold / F19 tap
- `CONFIG_ZMK_POINTING=y` for the mouse subsystem

## Planned (V4+)

1. **V4: Symbols/Numpad Layer** — Left-hand numpad (7/8/9 top, 4/5/6 home, 1/2/3 bottom). Right-hand: brackets, operators. Activated via a thumb key TBD.
2. **V5: Combos for app switching** — sunaku's app/window/tab cycling via LH thumb-pair combos (T1+T4 = Cmd+Tab cycle, T3+T6 = Opt+Tab, T2+T5 = Ctrl+Tab), using the `mod_tab_chord` swapper pattern.
3. **V6: macOS + OS Integration** — Raycast hotkeys, Hammerspoon glue, AeroSpace tiling. SEPARATE plans from firmware; the keyboard sends keystrokes, OS tools consume them.

## How we add features

Each feature gets its own iteration. We change one thing at a time, test that it works exactly as intended, then commit and move on. Every commit is small enough to understand and revert. The ROADMAP is not a promise — it is a priority queue. Items move up or down based on what proves most useful in practice.
```

- [ ] **Step 11.3: Update `AGENTS.md` scope boundaries**

Find the "Scope Boundaries" section (around line 62) and replace it with:

```markdown
## Scope Boundaries

**In V1:** stock baseline keymap, local Docker build via `./build.sh`, human-tier verification (flash + keyboard checker). V1 is preserved in git at commit `a61129d`.

**In V2:** V1 plus sunaku-flavored home-row mods on A/S/D/F + J/K/L/; with CAGS modifier order (macOS-tuned), `DIFFICULTY_LEVEL` (currently 3 = 300 ms hold), `SHIFT_FORGIVENESS` and `ENFORCE_BILATERAL` enabled. Two bilateral-enforcement layers (`BILATERAL_LH`, `BILATERAL_RH`).

**In V3 (current):** V2 plus:
- CURSOR layer (text navigation) on LH lower-inner thumb
- MOUSE layer (pointer control) on RH lower-inner thumb, with three speed sublayers (MOUSE_SLOW, MOUSE_FAST, MOUSE_WARP)
- Hyper key (`&mt HYPER LSHFT`) on LH upper-outer thumb
- Wispr Flow hotkey (`&wispr F18 F19`) on RH upper-outer thumb
- `CONFIG_ZMK_POINTING=y` for mouse subsystem
- Mouse motion tuning matched to sunaku's defaults

**Out of current scope** (tracked in `ROADMAP.md`): Symbols/Numpad layer (V4), app-switching combos (V5), OS integrations (V6+), GitHub Actions CI, Nix flake build.
```

- [ ] **Step 11.4: Build (sanity — docs don't affect firmware)**

```bash
./build.sh
xxd -l 4 glove80_lh.uf2 | head -1
xxd -l 4 glove80_rh.uf2 | head -1
```

Expected: build succeeds (no firmware change in this task, just verifying nothing broke).

- [ ] **Step 11.5: Commit**

```bash
git add README.md ROADMAP.md AGENTS.md
git commit -m "$(cat <<'EOF'
Document V3 in README, ROADMAP, AGENTS

Update visible status from V2 (HRM baseline) to V3 (HRM + Cursor +
Mouse + Hyper + Wispr key). Lists exact thumb-key positions for the
four new direct bindings and how to enter Cursor / Mouse layers.

ROADMAP marks V3 shipped, promotes V5 (app-switching combos) and V4
(Symbols/Numpad) as next iterations.

AGENTS.md scope boundaries updated so future agents recognize V3 as
the current frontier and treat anything beyond it as out-of-scope
per the existing halt + surface policy.
EOF
)"
```

---

### Task 12: Human-side verification on hardware

**Files:** none (verification only)

**Why:** Firmware is only "tested" on hardware. After all commits land, the user flashes both halves and runs a verification checklist before declaring V3 shipped.

This task is **human-side only** — the agent cannot execute it. The agent should produce the checklist and STOP.

- [ ] **Step 12.1: Produce the human verification checklist**

Print the following for the user:

```
=== V3 HARDWARE VERIFICATION CHECKLIST ===

Pre-flash:
  [ ] Open Wispr Flow > Preferences. Set:
      - Push-to-talk hotkey = F18
      - Toggle dictation hotkey = F19

Flash:
  [ ] Right half first: switch off, hold I+PgDn, switch on while
      holding. Drive mounts as GLV80RHBOOT. Drag glove80_rh.uf2.
  [ ] Left half:  switch off, hold Magic+E, switch on while holding.
      Drive mounts as GLV80LHBOOT. Drag glove80_lh.uf2.
  [ ] Power-cycle both halves. Re-pair Bluetooth if needed (HID
      descriptor changed, hosts may not recognize the new device).

V2 regression checks (should still work):
  [ ] All 26 letters, digits, punctuation type correctly
  [ ] HRMs work: hold F or J for Shift; hold K for Cmd; etc.
  [ ] Streak decay: after typing fast, brief pause then Shift works
  [ ] BILATERAL: holding F (LH Shift) while pressing A/S/D types
      the LETTER (no Cmd+A misfire); same on right hand
  [ ] LOWER layer still works via tap-dance thumb

V3 new behaviors:
  Default-layer thumb changes:
    [ ] LH upper-outer: tap = Shift; hold + tap any key = Hyper+key
        (test: install Raycast, bind Hyper+A to something, verify)
    [ ] RH upper-outer: tap = F19 (Wispr toggles), hold = F18 (PTT)
    [ ] LH lower-inner: NOT Alt anymore. Should activate CURSOR layer.
    [ ] RH lower-inner: NOT Alt anymore. Should activate MOUSE layer.

  Cursor layer (hold LH lower-inner thumb):
    [ ] Arrows work: RH home row I/J/K/L (or wherever they landed)
    [ ] PgUp/PgDn work
    [ ] Cmd+Left / Cmd+Right (line start/end) work
    [ ] Cmd+F (find) works
    [ ] Cmd+G / Cmd+Shift+G (find next/prev) work
    [ ] Cmd+Z (undo) / Cmd+Shift+Z (redo) work
    [ ] Cmd+X / Cmd+C / Cmd+V work
    [ ] select_all (Cmd+A) works
    [ ] select_line works (jumps to line start, then selects to end)
    [ ] select_word works
    [ ] Sticky shift on outer column: tap, then arrow extends selection

  Mouse layer (hold RH lower-inner thumb):
    [ ] Cursor moves up via LH ring/middle row 3 (MOVE_UP position)
    [ ] Cursor moves left/down/right via LH home row
    [ ] Scroll up/down via LH bottom row
    [ ] LCLK/MCLK/RCLK on RH row 3 work
    [ ] MB4 (browser back) on RH outer column row 4
    [ ] MB5 (browser forward) on RH outer column row 5
    [ ] Drag works: hold left thumb T5 (which is now &mkp LCLK)
        while moving the cursor with the right hand
    [ ] Hold RH L (MOUSE_SLOW) while moving = cursor crawls (~1/4 speed)
    [ ] Hold RH J (MOUSE_FAST) while moving = cursor flies (~2× speed)
    [ ] Hold RH K (MOUSE_WARP) while moving = cursor warps (~6× speed)

  Wispr:
    [ ] Tap RH upper-outer = F19 = Wispr toggles dictation
    [ ] Hold RH upper-outer + speak = F18 = Wispr listens push-to-talk

If any check FAILS:
  - Note what failed
  - File issue at https://github.com/QuantumLove/glove80/issues OR
  - Roll back to V2 with: git checkout <V2-final-commit>
```

- [ ] **Step 12.2: Wait for the user to report results**

After the checklist is produced, **stop and wait** for the user to report which checks passed and which failed. Do not proceed to any further changes without their input.

---

## Self-Review Notes

**Spec coverage:**
- Hyper key on LH outer-upper: Task 4 ✓
- Wispr key on RH outer-upper (F18 hold / F19 tap): Tasks 3, 4 ✓
- Cursor layer with sunaku's bindings: Tasks 2, 5, 6, 7 ✓
- Mouse layer with sunaku's inverted-T: Tasks 2, 9 ✓
- Mouse speed sublayers (Slow/Fast/Warp): Tasks 2, 10 ✓
- Drag-and-drop (sunaku-style LCLK on left thumb T5): Task 9 ✓
- Drop thumb Alts (LH/RH lower-inner → layer activators): Task 4 ✓
- No combos in V3 (deferred to V5): explicitly noted in ROADMAP Task 11 ✓
- ZMK pointing enabled: Task 1 ✓
- Documentation updates: Task 11 ✓
- Hardware verification: Task 12 ✓

**Open risks (called out in tasks, not silent):**
- Task 8: `&mmv` / `&msc` overrides may need different syntax if our ZMK fork doesn't expose them at root level — task instructs HALT.
- Task 10: `&mmv_input_listener` and `zip_xy_scaler` symbols may not be in our ZMK fork's default includes — task instructs HALT.
- Task 4: replacing RSHFT means right-hand Shift is only available via the J-finger HRM. Confirmed acceptable in conversation.

**Type / naming consistency:**
- Layer names consistent across all tasks: CURSOR, MOUSE, MOUSE_SLOW, MOUSE_FAST, MOUSE_WARP
- Macro names consistent: select_all, select_line, select_word
- Behavior names consistent: wispr, hml_*, hmr_*, bilateral_hold_*
