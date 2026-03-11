#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: setgw.sh --gateway <ipv4>"
  exit 1
}

gateway=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --gateway)
      gateway="${2:-}"
      shift 2
      ;;
    *)
      usage
      ;;
  esac
done

[[ -n "$gateway" ]] || usage

ip route del default >/dev/null 2>&1 || true
ip route add default via "$gateway"
