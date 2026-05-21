---
name: run-math-adventure
description: Build and run the math-adventure web app — a React + Vite game for kids. Launch the dev server and interact with it using chromium-cli.
---

# Math Adventure

A React + Vite web app — a fun math game for kids. The app is served via a local dev server (Vite) and driven via `chromium-cli` script below.

## Prerequisites

Requires Node.js (v18+) and npm. This project uses:
- React 19.2
- Vite 7.2
- Phaser 3.90 (game engine)

No additional OS packages needed on Windows; on Linux, ensure `libx11-6` and display utilities are available.

## Build

```bash
cd .  # already in math-adventure root
npm install
npm run build
```

The build outputs to `dist/` for production deployment.

## Run (agent path)

The project includes a driver script (`.claude/skills/run-math-adventure/driver.mjs`) that manages the dev server:

```bash
node ./.claude/skills/run-math-adventure/driver.mjs launch
```

This launches the dev server on `http://localhost:5173/`. In another terminal, verify it's running:

```bash
node ./.claude/skills/run-math-adventure/driver.mjs status
```

The dev server will print "ready in XXXX ms" when fully started. Then:

1. Open `http://localhost:5173/` in a browser
2. Interact with the game UI (click buttons, play)
3. Observe behavior and state changes

**For Linux agents:** chromium-cli is available and preferred. Use:

```bash
chromium-cli <<'EOF'
  navigate http://localhost:5173/
  screenshot ./screenshot.png
  click "button:has-text('Start')"
  wait-for-navigation
  screenshot ./screenshot-game.png
  quit
EOF
```

See [chromium-cli examples](examples/playwright.md) for more details and commands.

## Run (human path)

```bash
npm run dev
```

This starts a local server on `http://localhost:5173/`. Open a browser, navigate to that URL, and interact with the game. Press `Ctrl-C` in the terminal to stop.

The app will **not work** if you open `index.html` directly in the browser — it requires the dev server due to Vite's module resolution.

## Direct invocation (testing internals)

Games and interactive components are hard to test in isolation. Most PRs here touch the game logic (Phaser), UI interactions, or styling. Use the dev server above for verification.

For math calculation internals or state hooks:

```bash
node -e "import('./src/Game.jsx').then(m => { /* test logic */ })"
```

## Gotchas

### Vite port conflicts

If port 5173 is already in use, Vite auto-increments to 5174, 5175, etc. Watch the startup output for the actual URL.

### CORS and local file:// URLs

The app requires a server. Opening `index.html` directly results in a blank page because Vite's client-side module resolution and React Fast Refresh won't work.

### Game doesn't start / black screen

The Phaser game engine initializes on first interaction (button click). If you see a blank white page, click the "Start" button or any game button. Phaser is loaded but not rendering until the game state activates.

### Slow initial load

First page load (~2–3s) includes downloading React, Phaser, fonts from Google Fonts, and Vite's HMR client. Subsequent loads are fast due to browser cache.

## Troubleshooting

| Issue | Fix |
|---|---|
| "Cannot find module" or build errors | Run `npm install` to ensure all dependencies are present, especially Phaser which has large binary assets. |
| Blank white screen | Click a button to start the game; Phaser initializes on interaction. |
| Port 5173 in use | Vite will auto-increment. Check the startup message for the actual URL. |
| Hot reload not working | Ensure you're visiting `http://localhost:5173/`, not a direct `index.html` file. |
| "EADDRINUSE" on Windows | Kill the process on port 5173: `netstat -ano \| grep :5173`, then `taskkill /PID <pid> /F`. |

## Test

Run the linter:

```bash
npm run lint
```

No unit test suite is configured for this project; verification is manual via the dev server (see **Run** section above).

## Production build and preview

```bash
npm run build
npm run preview
```

The preview server runs on `http://localhost:4173/` and serves the optimized build. Use this to verify production behavior before deploying.

## Deployment

The app deploys via GitHub Pages:

```bash
npm run deploy
```

This requires `gh-pages` (already in devDependencies) and a Git remote named `origin` pointing to a GitHub repo.
