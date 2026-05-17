# AGENTS.md

Rules for AI coding assistants (Cursor agents, GitHub Copilot, Claude, ChatGPT, etc.) working in this repository.

The maintainer rebuilds and deploys this site **manually**. The whole build / serve / deploy chain is owned by a human. Agents must not initiate any of it.

---

## Hard rules

### Never auto-execute dev scripts unless asked

`docs/dev-tools/dev.py` — locale checks and preview PNG generation (human-only by default).

Forbidden by default:

- `python docs/dev-tools/dev.py …`, `pip install …` (unless the user explicitly asks)

### Never run package managers

- `npm install`, `npm ci`, `npm i …`, `npx …`, `yarn …`, `pnpm …` — all forbidden in agents.
- `pip install …` — forbidden.
- This includes "just to check it works".

Do not create or commit `node_modules/`.

### Never run deploy / Cloudflare commands

- `wrangler …`, `npx wrangler …`, `wrangler deploy`, `wrangler dev`, etc.
- No git pushes to deploy branches.

### Never modify GitHub Actions / CI unless asked

Do not add `.github/workflows/*.yml` without explicit request.

---

## What you *can* do

### React app (primary)

Edit when the user asks for site changes:

- **`app/src/**`** — components, pages, hooks, styles, locales, data
- **`app/public/**`** — static assets copied into `dist/`
- **`app/index.html`**, **`app/vite.config.ts`**, **`app/tailwind.config.ts`**
- **`_headers`**, **`_redirects`** — Cloudflare static config
- **`wrangler.jsonc`** — only when explicitly asked
- **`docs/**`**, **`README.md`**, **`AGENTS.md`**, **`.cursor/rules/**`

After editing the React app, tell the human to run **`cd app && npm run build`** manually. Output must land in repo-root **`dist/`** before deploy (`vite.config.ts` `outDir: '../dist'`).

### Verification without building

- Read files under **`app/`** directly.
- Worker logic: **`docs/cloudflare/unified-worker.reference.js`**
- Edge / deploy notes: **`docs/cloudflare/README.md`**

---

## TL;DR

> Agents: do not run `npm`, `pip`, `wrangler`, or `docs/dev-tools/dev.py` unless asked. Edit **`app/src/**`** for the live site; say **`cd app && npm run build`** when a build is needed. Humans can run **`python docs/dev-tools/dev.py i18n`** after locale changes.
