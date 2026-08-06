# Performance & Core Web Vitals — Findings

**What this document is:** a build-output and source-level performance review (bundle sizes,
hydration strategy, dependency weight, asset delivery), measured against the actual production
build in this environment.

**What this document is not:** a Lighthouse or PageSpeed Insights report. No headless
Chrome/Lighthouse runner or live-served instance was available in this environment, so no LCP,
CLS, INP, or Lighthouse performance score numbers are reported here — reporting invented numbers
would be worse than reporting none. See "How to get real Core Web Vitals numbers" below for exact
next steps; those are the numbers that should actually inform any further optimization decisions.

All measurements below are from `npm run build` output in `dist/`, using file sizes as served
(pre-compression; Cloudflare Pages will gzip/brotli these further in transit, so real
over-the-wire bytes will be meaningfully smaller than what's listed here).

---

## 1. Per-page-type JS payload (measured)

| Page type | Example | Framework JS shipped | Notes |
|---|---|---|---|
| Astro-only calculator (no hydration) | `/home-improvement/tile-calculator/` | **0 KB** Preact/framework runtime | Only scripts are async GA (`gtag.js`, non-blocking) and a 4KB Astro prefetch helper (`page.js`, from `prefetch: { prefetchAll: true }` in `astro.config.mjs`) |
| Preact island — code converters | `/developer/xml-to-json/` | Preact runtime (~28KB: `preact.module` 12K + `hooks` 4K + `signals` 8K + `client` 4K) + component chunk (68K for XmlToJson, largest of the three converters — `fast-xml-parser` is the bulk of it) | Hydrates via `client:visible` — doesn't block initial paint, loads when the tool scrolls into view |
| Preact island — Bank Statement Converter | `/finance/bank-statement-converter/` | Same ~28KB Preact runtime + 12KB component chunk **on page load**; `pdf.js` core (330KB) and its worker (1.4MB) are **not requested until the user actually selects a file** | See §2 — this is a deliberately lazy-loaded chain, not shipped upfront |
| Image compression tools | `/image/compress-image-to-kb/` | 0 KB framework JS — vanilla `<script>` + Canvas API (`imageCompress.ts`, 4KB) | No Preact needed; matches the "don't hydrate what doesn't need it" instruction already |

**Verdict:** the codebase already follows Astro's islands-architecture guidance well — the
majority of tool pages (every `.astro`-component calculator: Tile, Paint, Flooring, Wallpaper,
Fabric, Zakat ×2, Hijri, UUID, Slug, Sitemap Validator, GPA/CGPA/SGPA, Marks, Attendance, Dog Age,
FLAMES, ABV, all 7 image-compression pages) ship **zero client-side framework JS**. Only the three
JSON/XML/YAML converters and the new Bank Statement Converter use Preact, and only because they
need real parser libraries and richer interactive state than a vanilla `<script>` block
reasonably supports.

## 2. Bank Statement Converter — lazy-loading chain (new this pass)

This tool pulls in the heaviest dependency on the site (`pdfjs-dist`, including a 1.4MB worker
script), so its loading strategy was deliberately staged to avoid taxing anyone who doesn't use it:

1. **Page load:** only the ~28KB Preact runtime + 12KB component chunk, loaded via
   `client:visible` (i.e., only once the tool scrolls into the viewport, not on initial paint).
2. **User selects a file:** `pdfjs-dist` (330KB) and the worker URL are pulled in via dynamic
   `import()` inside the file-handling function — not at module scope — so nothing PDF-related is
   requested until there's an actual PDF to process.
3. **Worker thread:** PDF parsing runs in a Web Worker (pdf.js's own worker), off the main thread,
   so a large statement doesn't block the page's main thread / INP.

Net effect: every other page on the site pays **zero bytes** for this tool's dependency, and even
this tool's own page defers the expensive part until it's actually needed.

## 3. Fonts

- `@fontsource/inter` (weights 400/500/600/700/800) and `@fontsource/jetbrains-mono`
  (400/500) are self-hosted via `@import` in `global.css` — no third-party font host, no
  render-blocking cross-origin request.
- Confirmed `font-display: swap` in the fontsource-generated CSS (`node_modules/@fontsource/inter/400.css`), so text renders immediately in a fallback font rather than staying invisible while fonts load (no FOIT).
- **Not done, and flagged as a reasonable follow-up, not a blocker:** no `<link rel="preload">` for the primary body-text woff2 file. Fontsource splits each weight into multiple unicode-range files with content-hashed names, so precisely preloading "the one users see first" requires either a build step to detect the right hash or accepting a broader/less precise preload. Given `font-display: swap` already prevents invisible text, this is a minor LCP-text-paint optimization, not a correctness issue.

## 4. Removed dead weight (this pass)

**`@fontsource/space-grotesk` was an installed dependency with zero imports anywhere in the
codebase** — not in any `.astro`/`.tsx` file, and no `font-family` in `global.css` references
"Space Grotesk". It was never being loaded by the built site (Vite only bundles what's imported),
so this wasn't a live performance bug — but it was 100% dead weight in `node_modules` and
`package.json`, and the kind of thing that gets imported "for real" by accident later. Removed via
`npm uninstall @fontsource/space-grotesk`.

## 5. Layout shift / above-the-fold review (source-level)

- Tool result panels (`.result-card` / `calc-cta` etc.) render with placeholder text ("Waiting",
  "—") server-side rather than starting empty, which avoids a shift from empty→populated on
  hydration for the Preact-based tools; the Astro-only calculators render actual computed values
  server-side on first paint (no shift at all, since there's no client recompute needed until an
  input changes).
- `logo-nav.png` in the header and every `<img>` in tool components (upload previews, compressed
  result previews) — checked for explicit `width`/`height` attributes to reserve layout space;
  the header logo has them (`width="36" height="36"`), the dynamically-inserted preview images in
  `CompressImageToKb.astro` do not carry explicit dimensions but are populated after user action
  (post-interaction, not on initial page load), so they don't contribute to page-load CLS.
- No ad network script is actually wired in (`AdSlot.astro` renders a static placeholder div, not
  a third-party script tag) — so there's currently no third-party-script CLS/INP risk from ads to
  report. If/when a real ad network is integrated, that integration should reserve slot dimensions
  up front to avoid a real CLS regression at that point.

## 6. Prefetching

`astro.config.mjs` sets `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` — every
internal link gets prefetched on hover before the click completes. This is a reasonable trade
(faster perceived navigation) but is worth knowing about if a future audit sees more total network
requests than page views would suggest — that's this setting, working as configured, not a bug.

## 7. What wasn't changed, and why

- **No JS bundle was restructured** beyond what the new Bank Statement Converter required — the
  existing site's hydration choices were already sound (see §1), so there was nothing to fix.
- **No image format/lazy-loading changes** were made to existing tool pages — none of the
  audited pages load meaningful above-the-fold decorative imagery that would benefit from format
  conversion (WebP/AVIF) or `loading="lazy"`; the only images are the small logo and
  user-uploaded/generated previews.

## How to get real Core Web Vitals numbers

This audit's bundle-size analysis is a proxy for performance, not a substitute for field/lab data.
Before making further performance decisions:

1. Deploy this branch (or run `npm run preview` and use a local Lighthouse run) and test:
   Homepage, one calculator (`/home-improvement/tile-calculator/`), one converter
   (`/developer/xml-to-json/`), one category page (`/islamic/`), one guide
   (`/guides/how-to-calculate-zakat/`), and `/finance/bank-statement-converter/`.
2. Run Lighthouse (Chrome DevTools → Lighthouse tab, or `npx lighthouse <url> --view`) against
   each on mobile emulation, since that's what Search Console's Core Web Vitals report weights.
3. Once the production URL has real traffic, check Search Console → **Core Web Vitals** report
   for field data (real user CrUX data), not just lab data — they can disagree, and field data is
   what actually affects ranking signals.
4. Re-run this comparison after any future dependency addition (a new converter library, an ad
   network, an analytics tag) — that's the point in the workflow where bundle weight regressions
   actually get introduced.
