#!/usr/bin/env bash
set -euo pipefail

# Local Docker build for QuantumLove/glove80.
# Uses the ZMK community west toolchain (zmkfirmware/zmk-dev-arm:3.5).
# Image source: moergo-sc/zmk/.devcontainer/Dockerfile — FROM docker.io/zmkfirmware/zmk-dev-arm:3.5
# Builds both halves of the Glove80 split keyboard.
# Outputs: glove80_lh.uf2 (left half) + glove80_rh.uf2 (right half) in repo root.
#
# First run: ~5-10 min (Docker image pull + west fetches ZMK source).
# Subsequent runs: ~2-3 min.
# Prerequisites: Docker installed and daemon running (verify: docker info).
#
# Note: moergo's official CI uses Nix. This script uses the community
# Docker + west approach, which produces equivalent firmware.
#
# DinD note: uses docker cp (not -v mounts) so this script works correctly
# when run from inside a Docker container (e.g., a dev container or CI runner).

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Building Glove80 firmware (both halves)..."
echo "    Repo: ${REPO_ROOT}"
echo "    This may take 5-10 minutes on first run (image pull + source fetch)."
echo ""

CONTAINER_NAME="zmk-glove80-build-$$"

cleanup() {
  docker stop "${CONTAINER_NAME}" 2>/dev/null || true
  docker rm   "${CONTAINER_NAME}" 2>/dev/null || true
}
trap cleanup EXIT

echo "==> Starting build container..."
docker create --name "${CONTAINER_NAME}" zmkfirmware/zmk-dev-arm:3.5 sleep infinity
docker start "${CONTAINER_NAME}"

echo "==> Copying source files into container..."
docker exec "${CONTAINER_NAME}" mkdir -p /workspace/config
docker cp "${REPO_ROOT}/config/." "${CONTAINER_NAME}:/workspace/config/"

echo "==> Initializing west workspace..."
docker exec -w /workspace "${CONTAINER_NAME}" west init -l config

echo "==> Fetching ZMK source (moergo-sc fork, v25.11)..."
docker exec -w /workspace "${CONTAINER_NAME}" west update

echo "==> Exporting Zephyr CMake package..."
docker exec -w /workspace "${CONTAINER_NAME}" west zephyr-export

echo "==> Building left half (glove80_lh)..."
docker exec -w /workspace "${CONTAINER_NAME}" \
  west build -s zmk/app -b glove80_lh -d /tmp/build/lh -- -DZMK_CONFIG=/workspace/config
docker exec "${CONTAINER_NAME}" cp /tmp/build/lh/zephyr/zmk.uf2 /workspace/glove80_lh.uf2
echo "    glove80_lh.uf2 written."

echo "==> Building right half (glove80_rh)..."
docker exec -w /workspace "${CONTAINER_NAME}" \
  west build -s zmk/app -b glove80_rh -d /tmp/build/rh -- -DZMK_CONFIG=/workspace/config
docker exec "${CONTAINER_NAME}" cp /tmp/build/rh/zephyr/zmk.uf2 /workspace/glove80_rh.uf2
echo "    glove80_rh.uf2 written."

echo "==> Copying UF2 outputs back to repo root..."
docker cp "${CONTAINER_NAME}:/workspace/glove80_lh.uf2" "${REPO_ROOT}/glove80_lh.uf2"
docker cp "${CONTAINER_NAME}:/workspace/glove80_rh.uf2" "${REPO_ROOT}/glove80_rh.uf2"

echo ""
echo "==> Build complete!"
echo "    glove80_lh.uf2 — flash to LEFT half"
echo "    glove80_rh.uf2 — flash to RIGHT half"
echo ""
echo "See README.md §Flash for flashing instructions."
