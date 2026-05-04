#!/bin/sh

set -eu

if [ -n "${CODEX_NODE_BIN:-}" ] && [ -x "${CODEX_NODE_BIN}" ]; then
  exec "${CODEX_NODE_BIN}" "$@"
fi

DEFAULT_CODEX_NODE="${HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"

if [ -x "${DEFAULT_CODEX_NODE}" ]; then
  exec "${DEFAULT_CODEX_NODE}" "$@"
fi

exec node "$@"
