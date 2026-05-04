# Code Todo Reminder

A small React tool for tracking code-related follow-up tasks such as refactors, bug fixes, naming cleanup, and missing tests.

## Scripts

- `npm run dev`
- `npm run build`
- `npm test`
- `npm run preview`

These scripts go through `scripts/run-node-tool.sh`. In Codex, the wrapper prefers the bundled runtime Node to avoid native-module signing problems that can affect local npm-installed toolchains on macOS. Outside Codex, it falls back to `CODEX_NODE_BIN` if you set it, then to your normal `node`.

## Test Harness

The project uses:

- Vite
- React
- TypeScript
- Vitest
- Testing Library

The initial scaffold includes a tiny smoke test so the repo starts from a green baseline before feature-specific TDD begins.
