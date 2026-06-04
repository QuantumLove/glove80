#!/usr/bin/env bash
# Regenerate the visual keymap diagram from config/glove80.keymap.
#
# Output:
#   docs/keymap.yaml  — intermediate representation (parsed bindings per layer)
#   docs/keymap.svg   — rendered diagram, one panel per layer, Glove80 shape
#
# Requires `uvx` (ships with `uv`, install via `brew install uv`). The tool
# `keymap-drawer` is fetched on first run and cached; subsequent runs are fast.
#
# Run from anywhere — the script anchors to the repo root.

set -euo pipefail
cd "$(dirname "$0")/.."

uvx --from keymap-drawer keymap parse -z config/glove80.keymap > docs/keymap.yaml
uvx --from keymap-drawer keymap draw   docs/keymap.yaml         > docs/keymap.svg

echo "Updated docs/keymap.yaml and docs/keymap.svg"
