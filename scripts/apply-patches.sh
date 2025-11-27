#!/bin/sh
set -euo pipefail
PATCH_DIR="$(cd "$(dirname "$0")/../patches" && pwd)"
if [ ! -d "$PATCH_DIR" ]; then
  exit 0
fi
for patch_file in "$PATCH_DIR"/*.patch; do
  [ -f "$patch_file" ] || continue
  echo "Applying $(basename "$patch_file")"
  patch -p1 -N -r - < "$patch_file" || true
done
