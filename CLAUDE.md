# CLAUDE.md

Instructions for Claude Code in this repository. Read **`AGENTS.md`** for build/deploy guardrails (no `npm`, `wrangler`, or `docs/dev-tools/dev.py` unless the user asks).

---

## Design skills (required for UI work)

Before designing, redesigning, polishing, or reviewing **any frontend surface** (components, pages, CSS, layout, motion, typography, color), **read these skill files in full** if they exist. Do not skip them and improvise from memory.

| Priority | Skill | Path (project) | Install if missing |
|----------|--------|----------------|---------------------|
| 1 | **Impeccable** | `.claude/skills/impeccable/SKILL.md` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) → copy `.claude/skills/impeccable/` into this repo |
| 2 | **Emil design eng** (Emil Kowalski) | `.claude/skills/emil-design-eng/SKILL.md` | [vercel-labs/open-agents](https://github.com/vercel-labs/open-agents) → `.agents/skills/emil-design-eng/` |
| 3 | **Taste** | `.claude/skills/taste-skill/SKILL.md` | Install your preferred **taste-skill** pack into `.claude/skills/taste-skill/` |
| 4 | **Awesome DESIGN.md** | `.claude/skills/awesome-design-md/SKILL.md` | [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) → `.claude/skills/awesome-design-md/` |

### How to apply them here

1. **Fetch first:** Use the Read tool on each **applicable** `SKILL.md` from the table below (and any `reference/` files Impeccable’s setup step requires). For Awesome DESIGN.md, also read the chosen `design-md/<brand>/DESIGN.md`.
2. **Impeccable leads** on hierarchy, color, layout, anti-patterns, copy, and polish commands (`craft`, `audit`, `polish`, etc.). Run its context loader if PRODUCT.md / DESIGN.md exist; if not, infer from `app/src/index.css`, `app/src/styles/site.css`, and existing components before changing UI.
3. **Emil design eng** leads on **motion**: what should animate, duration, easing, and “unseen details” — align with existing view transitions and `prefers-reduced-motion` in the codebase.
4. **Taste skill** is a reference for **premium, non-generic** aesthetics when the task needs a stronger visual direction; pick a variant that fits this site (dark portfolio, restrained accent, mono labels) rather than a mismatched trend template.
5. **Awesome DESIGN.md** supplies **brand-level reference** `DESIGN.md` files under `.claude/skills/awesome-design-md/design-md/<brand>/`. Read `SKILL.md` first, then the chosen brand’s `DESIGN.md` when the user names a product aesthetic or wants a deliberate style borrow. Map tokens into this project; do not replace site-wide patterns unless asked.
6. **Project wins on conflicts:** This site already has tokens, glass mode, and i18n. Skills inform judgment; do not rip out established patterns unless the user asks. Reconcile skill advice with `app/src/styles/*.css` and `app/src/index.css`.

### When to load skills

| Task | Load |
|------|------|
| New section, page, component, or layout change | Impeccable + Emil + Taste |
| CSS polish, spacing, typography, color tweaks | Impeccable + Emil |
| Animation / micro-interaction only | Emil + Impeccable `animate` reference if doing more than a one-liner |
| “Make it look better” / design critique | Impeccable + Emil + Taste |
| “Like Linear / Vercel / …” or new brand-inspired direction | Awesome DESIGN.md (+ Impeccable + Emil as needed) |
| API, Worker, i18n keys only, docs | Skills not required |

---

## Project (WaretaGarasu)

| Path | Role |
|------|------|
| `app/src/` | React SPA source |
| `app/public/` | Static assets (fonts, img, manifest) |
| `dist/` | Production build output (`cd app && npm run build` — human only) |
| `docs/cloudflare/` | Worker reference, edge behavior |
| `docs/dev-tools/` | `python docs/dev-tools/dev.py i18n` |
| `_headers`, `_redirects` | Cloudflare asset config (copy into `dist/` on build) |

---

## Behavioral guidelines

These reduce common LLM coding mistakes. **Tradeoff:** caution over speed; use judgment on trivial tasks.

### 1. Think before coding

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — do not pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop, name it, and ask.

### 2. Simplicity first

- Minimum code that solves the problem. Nothing speculative.
- No features, abstractions, or configurability beyond the request.
- If 200 lines could be 50, rewrite.

### 3. Surgical changes

- Do not “improve” adjacent code, comments, or formatting.
- Match existing style. Mention unrelated dead code; do not delete unless asked.
- Remove only orphans **your** changes created.
- Every changed line should trace to the user’s request.

### 4. Goal-driven execution

- Turn tasks into verifiable success criteria.
- For multi-step work, state a brief plan with a verify step per step.

---

**These guidelines are working if:** fewer unnecessary diff hunks, fewer overbuilt rewrites, and clarifying questions come before implementation rather than after mistakes.
