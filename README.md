# Dolci Eoliani

Marketing website for **Dolci Eoliani**, a Sicilian artisan pastry business focused on Aeolian specialties, orders, and nationwide shipping. WhatsApp-first contact, Italian UI, product detail modals, and a dedicated privacy page.

**Live site:** [dolci-eoliani.it](https://dolci-eoliani.it)

---

## Tech stack

| Layer | Choice |
|--------|--------|
| UI | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Routing | React Router 7 |
| Quality | ESLint, jsx-a11y, Vitest, Playwright |
| Fonts | Self-hosted via `@fontsource` (no Google Fonts request) |

---

## Quick start

**Requirements:** Node.js 20+ and npm.

```bash
npm install
cp .env.example .env   # optional: set VITE_SITE_URL for production builds
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Dev console note:** If you preview the site inside Cursor’s Simple Browser, you may see failed requests to `/api/metrics/collect` or `/api/commits` on port 5173. Those come from the IDE, not from this app. Test in a normal browser tab to validate the site; you should see no Router warnings and no app-origin 404s after the premium refinement.

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server with HMR |
| `npm run sitemap` | Regenerate `public/sitemap.xml` and `public/robots.txt` (uses `VITE_SITE_URL`) |
| `npm run optimize-images` | WebP for product photos + `og-image.jpg` + PWA icons from `favicon.svg` (optional `hero.jpg` / `tradizione.jpg` if added later) |
| `npm run build` | Optimize images + sitemap + typecheck + Vite build + prerender → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint on `src/` and `scripts/` |
| `npm run test` | Vitest (unit tests + sitemap smoke) |
| `npm run test:e2e` | Playwright smoke tests (requires `npx playwright install chromium` once) |

---

## Project structure

```
src/
  App.tsx              # Home page (sections)
  main.tsx             # Router: /, /informativa-privacy, 404
  data/
    copy.ts            # Italian UI copy + privacy sections
    site.ts            # Phone, email, URLs, nav, page titles
    products.ts        # Product catalog + image paths
  components/          # UI sections and layout
  pages/               # PrivacyPage, NotFound
  hooks/               # Scroll, focus trap, page title, etc.
public/
  images/products/     # Self-hosted product photos
  _headers             # Security + cache (copied to dist)
  sitemap.xml
  robots.txt
```

---

## Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SITE_URL` | Recommended for production | Canonical base URL (e.g. `https://dolci-eoliani.it`). Used in SEO/JSON-LD. Defaults to `https://dolci-eoliani.it` in code if unset. |

Copy [`.env.example`](.env.example) to `.env` and adjust before deploying.

---

## Editing content

| What to change | Where |
|----------------|--------|
| Phone, email, social links, footer dev credit | [`src/data/site.ts`](src/data/site.ts) (`showDeveloperCredit: true` shows WaretaGarasu in footer) |
| Headlines, contact copy, privacy text | [`src/data/copy.ts`](src/data/copy.ts) |
| Products (names, tags, descriptions, images) | [`src/data/products.ts`](src/data/products.ts) + `public/images/products/{id}.jpg` |
| Page title format | [`src/data/site.ts`](src/data/site.ts) (`DEFAULT_PAGE_TITLE`, `pageTitle()`) |

**Privacy:** Legal copy in `copy.ts` is a **template** — have it reviewed by a lawyer before relying on it in production.

**Messaging rules (project):** No catering/eventi claims; emphasize ordini e spedizioni; no unverified founding dates (e.g. “dal 1950”).

---

## Routes

| Path | Page |
|------|------|
| `/` | Home (Hero, Dolci, Tradizione, Come ordinare, FAQ, Contatti) |
| `/informativa-privacy` | Privacy policy |
| `*` | Italian 404 |

Legacy `/#privacy` on the home URL redirects to `/informativa-privacy`.

---

## Deployment

### Cloudflare (production)

**Workers build UI** (Build + Deploy commands) — use these exact values:

| Field | Value |
|-------|--------|
| Build command | `npm run build:pages` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Path | `/` |
| Node version | 20 |
| Environment variable | `VITE_SITE_URL` = `https://dolci-eoliani.it` |

Requires [`wrangler.jsonc`](wrangler.jsonc) in the repo (serves `./dist` as static assets).

**Classic Cloudflare Pages** (no deploy command) — alternative:

| Setting | Value |
|---------|--------|
| Build command | `npm run build:pages` |
| Build output directory | `dist` |
| Node version | 20 |
| `VITE_SITE_URL` | `https://dolci-eoliani.it` |

`build:pages` optimizes images, sitemap, and Vite. On Cloudflare it **skips Playwright prerender** (no browser OS libs on the build image). The live SPA still works; Google gets content via JS. For prerendered HTML, run `npm run build` locally or rely on GitHub Actions. Attach custom domain `dolci-eoliani.it` after the first successful deploy.

**Routing:** SPA fallback is configured in [`wrangler.jsonc`](wrangler.jsonc) (`assets.not_found_handling: "single-page-application"`). Do not add `public/_redirects` with `/* → /index.html` — Workers deploy rejects it as an infinite loop. Prerendered `informativa-privacy/index.html` is served as a static file when present (GitHub Actions / local `npm run build`).

**Headers:** [`public/_headers`](public/_headers) (security, cache, CSP report-only). Enable **Force HTTPS** in Cloudflare SSL/TLS.

**Post-deploy checks:**

1. View source on `/informativa-privacy` — full policy HTML in the page (not an empty `#root` only).
2. Home scroll nav, product modals, WhatsApp form, footer links.
3. [Rich Results Test](https://search.google.com/test/rich-results) and Search Console sitemap.

### Other static hosts

1. `npm run build` and upload **`dist/`**.
2. Configure SPA fallback to `index.html` (equivalent to `_redirects`).
3. Set `VITE_SITE_URL` at build time if the domain differs from production.

---

## SEO

| Feature | Implementation |
|---------|----------------|
| Per-route meta | [`src/hooks/useSeo.ts`](src/hooks/useSeo.ts) + [`src/data/seo.ts`](src/data/seo.ts) (title, description, canonical, OG/Twitter, robots) |
| Structured data | [`HomeJsonLd`](src/components/JsonLd.tsx) (WebSite, Bakery, Product list, FAQPage); [`PrivacyJsonLd`](src/components/JsonLd.tsx) (WebPage, breadcrumbs) |
| Sitemap | [`scripts/generate-sitemap.mjs`](scripts/generate-sitemap.mjs) — runs on `npm run build`; includes `lastmod` |
| Crawling | [`public/robots.txt`](public/robots.txt) — regenerated with the same `VITE_SITE_URL` as the sitemap |
| 404 | `noindex, nofollow` via `useSeo('notFound')` |

**Before launch checklist**

1. `npm run build` — optimizes product images, regenerates sitemap/robots, prerenders `/` and `/informativa-privacy`.
2. Set `VITE_SITE_URL` in Cloudflare Pages so canonicals, sitemap, robots, and JSON-LD use the live domain.
3. Verify locally or on production: all product photos, WhatsApp links, privacy view-source (full HTML), `/og-image.jpg`, footer developer credit.
4. Submit `https://dolci-eoliani.it/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
5. Run [Rich Results Test](https://search.google.com/test/rich-results) on `/` and `/informativa-privacy`.
6. Optional: run Lighthouse manually in Chrome DevTools (no CI workflow in this repo).

Hero and Tradizione sections are text-only; OG/social image comes from `spicchiteddi.jpg` via `npm run optimize-images`. Product JPGs live in `public/images/products/{id}.jpg`.

**Do not** add hash URLs (`#dolci`, etc.) to the sitemap — crawlers should index `/` and `/informativa-privacy` only.

---

## Repository (public GitHub)

### `.gitignore`

Ignores build output, secrets, editor noise, **`.cursor/`**, and **`uploads/`**. Commits: source, `public/` (images, sitemap, robots), lockfile, `.env.example`.

### License

**Proprietary** ([LICENSE](LICENSE)) — suitable for a **public** repo: others can view the code on GitHub but may not use it without permission. Visibility ≠ open source.

To allow reuse of the template, switch to **MIT** and update `LICENSE` + `package.json` `"license"` field.

### README

This file is aimed at **you and future maintainers** (English). **Site copy stays Italian** in `src/data/copy.ts`.

| Job | When | What |
|-----|------|------|
| `ci` | push/PR | sitemap → lint → test → build → Playwright e2e (same job, uses local `dist/`) |

Add later if useful:

- Changelog (`CHANGELOG.md`) once you version releases

---

## Credits

- **Client:** Dolci Eoliani  
- **Site:** [WaretaGarasu](https://github.com/WaretaGarasu) (per site footer)

---

## License

Proprietary — see [LICENSE](LICENSE). All rights reserved unless you switch to another license as described above.
