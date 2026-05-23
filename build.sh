#!/usr/bin/env bash
set -euo pipefail

# Build Glove80 firmware locally via Docker + west.
# Outputs: glove80_lh.uf2 (left half) + glove80_rh.uf2 (right half) in repo root.
# First run: ~5-10 min. Subsequent: ~2-3 min.
# Requires: Docker daemon running (docker info).

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE="zmkfirmware/zmk-dev-arm:3.5@sha256:9dd48f05e5c9d3311057d114fd719d8a9dc43a5648b6fd572829b2ba05e0cd04"
CONTAINER="zmk-glove80-build-$$"

# Pre-flight: verify Docker daemon is reachable
docker info >/dev/null 2>&1 || { echo "Error: Docker daemon not running. Start Docker and retry."; exit 1; }

cleanup() { docker rm -f "${CONTAINER}" 2>/dev/null || true; }
trap cleanup EXIT

echo "==> Starting build container..."
docker run -d --name "${CONTAINER}" "${IMAGE}" sleep infinity

echo "==> Copying config into container..."
docker exec "${CONTAINER}" mkdir -p /workspace/config
docker cp "${REPO_ROOT}/config/." "${CONTAINER}:/workspace/config/"

echo "==> Initializing west workspace..."
docker exec -w /workspace "${CONTAINER}" west init -l config

echo "==> Fetching ZMK source..."
docker exec -w /workspace "${CONTAINER}" west update

echo "==> Exporting Zephyr CMake package..."
docker exec -w /workspace "${CONTAINER}" west zephyr-export

echo "==> Building left half (glove80_lh)..."
docker exec -w /workspace "${CONTAINER}" \
  west build -s zmk/app -b glove80_lh -d /tmp/build/lh -- -DZMK_CONFIG=/workspace/config
docker cp "${CONTAINER}:/tmp/build/lh/zephyr/zmk.uf2" "${REPO_ROOT}/glove80_lh.uf2"

echo "==> Building right half (glove80_rh)..."
docker exec -w /workspace "${CONTAINER}" \
  west build -s zmk/app -b glove80_rh -d /tmp/build/rh -- -DZMK_CONFIG=/workspace/config
docker cp "${CONTAINER}:/tmp/build/rh/zephyr/zmk.uf2" "${REPO_ROOT}/glove80_rh.uf2"

echo "==> Validating UF2 outputs..."
for f in "${REPO_ROOT}/glove80_lh.uf2" "${REPO_ROOT}/glove80_rh.uf2"; do
  test -f "$f" || { echo "Error: $f not produced"; exit 1; }
  SIZE=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")
  test "$SIZE" -ge 200000 -a "$SIZE" -le 600000 || { echo "Error: $f size ${SIZE} out of expected range"; exit 1; }
  python3 -c "
with open('$f','rb') as fh:
    magic = fh.read(4)
    assert magic == bytes([0x55,0x46,0x32,0x0A]), f'Bad UF2 magic in $f: {magic.hex()}'
" || exit 1
done

echo ""
echo "==> Done. Flash to keyboard:"
echo "    glove80_lh.uf2 → LEFT half"
echo "    glove80_rh.uf2 → RIGHT half"
echo "    See README.md §Flash for instructions."
