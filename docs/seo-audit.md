# OG Toolser — Technical & On-Page SEO Audit

**Date:** 2026-08-07
**Scope:** Full repository inspection (Astro 7, static output, Cloudflare Pages) + generated HTML in `dist/` after `npm run build`.
**Method:** Source inspection of every page template, layout, and data file, plus inspection of the built static HTML/sitemap/robots output. No Search Console data was available in the repository, so no claims are made below about actual indexing status, rankings, or penalties — only about what the code does.

This document reflects the state found at the start of this engagement. Where an item was fixed as part of this same change, it's marked **[FIXED]** with a short note; everything else is either already compliant or a remaining recommendation.

---

## 0. Stack summary

- **Framework:** Astro 7, `output: 'static'`, `site: 'https://ogtoolser.com'` (astro.config.mjs)
- **UI:** Astro components for simple calculators; Preact islands (`client:visible`) for JS-heavy converters (XML/YAML/JSON, Bank Statement Converter)
- **Package manager:** npm
- **Routing:** File-based. Dynamic tool pages via `src/pages/[cluster]/[tool].astro` (`getStaticPaths()` from `getLiveTools()`); category hubs via `src/pages/[cluster]/index.astro`; guides via `src/pages/guides/[slug].astro`
- **Content source of truth:** `src/data/tools.ts`, `src/data/clusters.ts`, `src/data/guides.ts` — no CMS, no database
- **Sitemap:** `@astrojs/sitemap` (config-driven, see §6)
- **Deployment:** Cloudflare Pages via `.github/workflows/deploy.yml` on push to `main`
- **Analytics:** Google Analytics (gtag.js) hardcoded in `BaseLayout.astro`, measurement ID `G-CB8E88BL7P` — already present, not something this pass added or should invent a replacement for

---

## 1. URL inventory

All URLs below use the trailing-slash convention consistently (`/cluster/tool/`), matching `Astro.site` and the canonical generator in `Seo.astro`. No mixed www/non-www or http/https variants exist in the codebase — `astro.config.mjs` sets a single canonical origin (`https://ogtoolser.com`) and every internal link is written as a root-relative path from that origin.

| Type | Count | Notes |
|---|---|---|
| Indexable static pages | `/`, `/about/`, `/contact/`, `/privacy/`, `/terms/`, `/guides/` | |
| Indexable category hubs | 7 clusters (`/home-improvement/`, `/islamic/`, `/developer/`, `/academic/`, `/finance/`, `/everyday/`, `/image/`) | See §2 for noindex logic |
| Indexable tool pages | 30 live tools (was 29; Bank Statement Converter added, see §8) | Generated only for `status: 'live'` tools |
| Indexable guides | 4 (was 1; 3 added, see §10) | |
| Noindex pages | `/404/` | Explicit `noindex` prop |
| Coming-soon tools (no page generated) | 0 (was 1: `bank-statement-converter`) | `getStaticPaths()` only includes live tools — a coming-soon tool has **no route at all**, not a "coming soon" page (see §8) |
| Search pages | None — search is a client-side overlay (`SearchOverlay.astro`) reading a JSON index embedded in the page; it has no dedicated URL/route, so there's nothing to noindex or exclude from the sitemap |
| Saved-tool pages | None — favorites are stored in `localStorage` only (`toolhub-favs` key), never in a URL |
| Redirects | None configured. No `_redirects` file, no `redirects` key in `astro.config.mjs` |
| Parameterized/duplicate routes | None found — every route is a clean static path with no query-string variants |

---

## 2. Findings by severity

### Critical

**C1. Bank Statement Converter had no route at all, and the Finance category was consequently forced out of the index.** [FIXED]
`getStaticPaths()` in `[cluster]/[tool].astro` only builds pages for `status: 'live'` tools. With `bank-statement-converter` marked `'coming-soon'`, visiting `/finance/bank-statement-converter/` returned a real 404 — there was no "coming soon" page to find, contrary to how the issue was described going in. Because it was the *only* tool in the Finance cluster, `[cluster]/index.astro`'s own logic (`noindex = !clusterTools.some(t => t.status === 'live')`) correctly forced `/finance/` to `noindex,follow`, and the sidebar/homepage tool counts correctly showed 0 live tools for Finance. This is the direct cause of both symptoms named in the brief ("Finance category says zero tools", "Bank Statement Converter shows Coming soon"). **Fix:** built a real, honest client-side converter and set `status: 'live'` (§8). `/finance/` is now indexable automatically, with no other code change needed, because the noindex logic is already correctly data-driven.

**C2. Sitemap had no mechanism to exclude noindex pages.** [FIXED]
`astro.config.mjs` called `sitemap()` with no `filter`. `@astrojs/sitemap` crawls every generated static HTML file, so any category hub that becomes empty in the future (e.g. if a tool is reverted to `coming-soon`) would silently re-enter the sitemap while still carrying `noindex` in its meta tag — a direct contradiction Google's docs warn against. This wasn't actively broken at the time of inspection only because Finance currently has zero *other* empty categories, but it was one content edit away from breaking. **Fix:** added a `filter` to the `sitemap()` integration call that excludes any cluster path with zero live tools, computed from the same `tools.ts`/`clusters.ts` data the page templates use — so the sitemap can never drift out of sync with the noindex logic again.

### High

**H1. No sitewide `Organization` / `WebSite` structured data.** [FIXED]
`Seo.astro` only emitted whatever page-specific JSON-LD each template passed in; most templates (every tool page, every category hub, every static page except the homepage) passed none. The homepage had its own inline `Organization`/`WebSite` blocks, duplicated per-page logic that didn't exist anywhere else. **Fix:** moved `Organization` + `WebSite` (with the homepage's `SearchAction` preserved) into `Seo.astro` so they render once, correctly, on every page — and removed the now-redundant copy from `index.astro` to avoid double-emitting them there.

**H2. No `og:site_name`, `og:image`, or `twitter:image`.** [FIXED]
Every page had `og:title`/`og:description`/`og:url` and `twitter:card`/`twitter:title`/`twitter:description`, but no site name and no image — link previews on social/chat platforms would show no thumbnail. **Fix:** added `og:site_name` ("OG Toolser") and pointed `og:image`/`twitter:image` at the existing `/logo-nav.png` (a real 128×128 asset already in `public/`, not a fabricated one). **Remaining recommendation:** this is a square logo, not the 1200×630 landscape image social platforms render best — commissioning a proper dedicated OG image is a reasonable follow-up but is a design task outside this engagement's scope (see "Items that could not be completed").

**H3. About page didn't identify an editorial process, testing process, correction policy, or author.** [FIXED]
The prior About page was two short paragraphs with no methodology, no reviewer, no correction policy — exactly the gap the brief flagged. **Fix:** rewrote it with real, verifiable sections (what the site does, how formulas are chosen, how tools are tested, editorial/review policy, correction policy, error reporting, privacy). It attributes content to "OG Toolser Editorial Team" rather than inventing a named person, per instruction.

**H4. Contact email pointed at a fake placeholder domain.** [FIXED]
`hello@tool-hub.example` — the `.example` TLD is reserved for documentation and cannot receive mail; this was leftover scaffolding. **Fix:** changed to `hello@ogtoolser.com`, matching the site's real domain. **This inbox's existence was not verified by this engagement** — confirm it's actually provisioned and monitored before relying on it (see "Items that could not be completed").

**H5. Guides section had exactly one article.** [FIXED — partially]
Only `/guides/how-to-calculate-zakat/` existed; the brief specifically flagged this as thin editorial coverage. **Fix:** added three more genuinely distinct guides (§10) and cross-linked them from the Islamic and Developer category intros. This does not reach the "6–10 guides" aspiration in one pass — see `docs/content-cluster-plan.md` for the prioritized backlog of what's written versus still planned, and "Items that could not be completed" below for why the rest wasn't mass-produced in this pass.

**H6. `Article` JSON-LD on guide pages was missing `author`, `datePublished`, and `dateModified`.** [FIXED]
This was true for the guide that already existed (`how-to-calculate-zakat`), not just the three added in this pass — `GuideLayout.astro`'s `articleJsonLd` only ever set `headline`, `description`, and `url`. Per the brief, `Article` schema should only be added when a real author/organization and accurate dates are present. **Fix:** added a `datePublished` field to the `Guide` data model (`2026-07-11` for the pre-existing guide, sourced from `git log --diff-filter=A -- src/data/guides.ts`, not guessed; `2026-08-07` for the three new ones, since that's genuinely when they were published) and wired `author`/`publisher` (`OG Toolser` as an Organization, not an invented person) plus `dateModified` (from the existing `lastReviewed` field) into the JSON-LD. `image` was left out — no guide has a dedicated header image to point to honestly.

### Medium

**M1. `package.json` name and README still said "Tool Hub" / boilerplate Astro starter content.** [FIXED]
`package.json`'s `name` field was `tool-hub` (not user-visible, but inconsistent) and `README.md` was still the unedited `astro create` starter template, ending in garbled `T o o l H u b` repo-name text. **Fix:** renamed the package to `og-toolser` and rewrote the README to describe the actual project. **Not changed:** the Cloudflare Pages project name (`--project-name=toolhub` in `.github/workflows/deploy.yml`) — renaming that is an infrastructure change tied to an existing Pages project binding, not a code-only rename, and isn't user-visible (it doesn't appear in any URL, page, or metadata). Flagged for a manual decision rather than changed blindly.

**M2. No web app manifest.** [FIXED]
No `site.webmanifest`/`manifest.json` existed, and nothing referenced one. **Fix:** added `public/site.webmanifest` with the real site name and the actual icon files already in `public/` (16/32/128/180px — no 192px or 512px icon exists, see "Items that could not be completed"), and linked it from `BaseLayout.astro`.

**M3. `SitemapValidator.astro`'s result region had no ARIA live announcement.** [FIXED]
Every other calculator's result panel had `aria-live`/`role="alert"` on its status text; this one didn't, so screen-reader users running a validation wouldn't hear the pass/fail result announced. **Fix:** added `aria-live="polite"` to the status pill, stats line, and issues list.

**M4. FAQPage JSON-LD is emitted automatically on every tool/guide page, without knowing Google restricted FAQ rich results.** *(no code change — see note)*
`FaqAccordion.astro` emits `FAQPage` structured data for every FAQ block, sitewide. The FAQs themselves are real, visible, and match the JSON-LD exactly — this isn't the "FAQ markup merely to chase rich results" pattern the brief warns against, since the FAQs exist for users regardless of the markup. However, Google restricted FAQ rich-result eligibility in August 2023 to primarily government and health authority sites, so most of these blocks are unlikely to produce a rich result even though they're valid. **No change made** — the markup is accurate and costs nothing, but don't expect FAQ rich results to move rankings or CTR for this site; that's a Search Console-verifiable fact, not something to plan around blindly.

### Low

**L1. Homepage title doesn't exactly match the brief's suggested pattern.** *(no change made — see note)*
Actual: `OG Toolser — Free Online Tools & Calculators`. Suggested in the brief: `Free Online Calculators & Converters | OG Toolser`. Both are accurate, brand-consistent, and non-stuffed. Rewriting a live homepage title/meta without Search Console data on its current performance is exactly the kind of change the brief says not to make blindly ("Search Console data is required before making a confident diagnosis") — a title rewrite risks an existing snippet/CTR that's already working. Left unchanged; revisit with real Performance-report data per `docs/search-console-checklist.md`.

**L2. `og:image`/`twitter:image` use a square logo, not a dedicated 1200×630 social card.** Already covered under H2; listed here only as the residual (non-critical) piece.

**L3. Manifest icons stop at 180×180.** No 192×192 or 512×512 PNG exists in `public/`, which is what most manifest validators/Lighthouse PWA checks expect. Not fabricated in this pass — see "Items that could not be completed."

---

## 3. Things already correct (verified, not touched)

Called out explicitly so they aren't re-litigated or "fixed" a second time:

- **Self-referencing canonicals** on every page, generated from a single `canonicalPath` prop in `Seo.astro` — always HTTPS, always the non-www `ogtoolser.com` origin, always trailing-slash, never carrying query params. Verified in the built `dist/` output.
- **`robots.txt`** already allows all crawling and correctly references `https://ogtoolser.com/sitemap-index.xml`. No CSS/JS/image blocking.
- **Noindex handling** for the 404 page and for empty category hubs was already correctly implemented and data-driven (`noindex = !clusterTools.some(t => t.status === 'live')`) — this pass only closed the sitemap gap around it (C2), not the noindex logic itself.
- **`BreadcrumbList` JSON-LD** was already implemented in `Breadcrumbs.astro` and used on every category page, tool page, and guide page — this satisfied Phase 7's breadcrumb requirement before this engagement started.
- **`WebApplication` JSON-LD** on every tool page (`ToolLayout.astro`) already avoids inventing `aggregateRating`, reviews, or download counts.
- **Titles and meta descriptions** across `tools.ts` are already unique per page, descriptive, and free of keyword stuffing — spot-checked across all clusters.
- **All navigation is real `<a href>` markup**, server-rendered in the initial HTML — verified in `dist/` output, not just source. The mega-menu and category links are not JS-only click handlers; the client-side search overlay is an *additional* affordance, not a replacement for crawlable links.
- **No mixed "Tool Hub" branding in any user-visible surface** (headings, nav, footer, page titles) at the start of this audit — the only occurrences were internal `localStorage` key names (`toolhub-favs`, `toolhub-recents`) and non-visible identifiers (`package.json` name, README), addressed in M1.
- **File-upload tools already process entirely client-side** (image compression tools use the Canvas API) with accurate "never leaves your device" copy — a real pattern the new Bank Statement Converter follows (§8).

---

## 4. Items that could not be completed, and why

- **Full 6–10 guide roster.** Three of the ~9 recommended guides were written and published this pass (chosen for lowest content overlap with existing tool pages and highest linking value — see `docs/content-cluster-plan.md`). Writing all nine to the same standard (real worked examples, real sourcing, no filler) in one pass would mean either rushing quality on genuinely YMYL topics (zakat, academic policy) or mass-producing thin pages — both of which the brief explicitly prohibits. The remaining topics are documented and prioritized, not abandoned.
- **True `.xlsx` export for the Bank Statement Converter.** Only CSV export was built (opens natively in Excel/Sheets/Numbers). A genuine binary `.xlsx` writer needs either a new dependency (e.g. a zip/XLSX library, adding real bundle weight to one page) or a from-scratch OOXML/zip implementation; neither was justified for a first release when CSV already satisfies the "Excel" intent honestly. Documented as a known gap in the tool's own FAQ rather than silently promised.
- **OCR for scanned bank statement PDFs.** Explicitly out of scope per the brief's own MVP guidance ("scanned-image PDFs may require OCR and may not work") — the tool detects this case and tells the user clearly instead of failing silently or guessing.
- **A dedicated 1200×630 Open Graph image, and 192/512px manifest icons.** These are visual design assets, not code. Reusing the existing 128×128 logo for both was the honest choice available; generating new brand imagery without design input risks producing something off-brand that then needs to be redone.
- **Lighthouse-measured Core Web Vitals scores.** No Lighthouse/CI runner was available in this environment to produce real Core Web Vitals numbers (LCP/CLS/INP) against a live-rendered page. `docs/performance-audit.md` reports what's verifiable from the build output (bundle sizes, hydration strategy, dependency weight) and says explicitly that field/lab Core Web Vitals scores need to be pulled from PageSpeed Insights or Search Console's own report against the live production URL, not invented here.
- **Renaming the Cloudflare Pages project.** See M1 — an infra decision, not made unilaterally.
- **Search Console verification, sitemap submission, and indexing checks.** These require access to the live Search Console property, which this engagement doesn't have. `docs/search-console-checklist.md` gives exact manual steps instead.
