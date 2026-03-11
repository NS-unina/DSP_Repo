#!/usr/bin/env bash
set -euo pipefail

if [[ -n "${GATEWAY:-}" ]]; then
  /setgw.sh --gateway "$GATEWAY" || true
fi

exec tail -f /dev/null
