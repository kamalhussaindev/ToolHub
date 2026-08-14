# SEO Change Log

Every file touched in this engagement, what changed, and why. Cross-references `seo-audit.md`
finding IDs (C1, H1, etc.) where applicable.

## Pre-deployment QA pass (post-implementation review)

A second, independent QA pass re-inspected the actual diff, built HTML, and Bank Statement
Converter code (not the summary above) and found six real issues, all fixed and re-verified by
rebuild/typecheck/functional test:

1. **CSV formula injection (critical, security)** — `transactionsToCsv()` in `src/lib/bankStatement.ts`
   had no protection against cell values starting with `=`, `+`, `-`, or `@`, which Excel/Sheets
   interpret as formulas on import (CWE-1236). Every field is user-editable, so this was
   exploitable. Fixed by prefixing any such value with `'` before quoting/escaping.
2. **pdf.js document handle never released** — `BankStatementConverter.tsx` never called
   `doc.destroy()` after extracting text, so worker-side memory for a processed PDF stayed
   allocated until GC rather than being released promptly. Fixed with a `finally` block.
3. **No visible keyboard focus indicator on the upload zone** — the file `<input>` is visually
   hidden (matching the site's existing `CompressImageToKb.astro` pattern), but unlike that
   component, `bank-statement-converter.css` was missing the companion
   `:has(input:focus-visible)` rule on the parent label, so keyboard users tabbing to it got no
   visible focus state. Fixed by adding the same rule used elsewhere on the site.
4. **`privacy.astro` was never actually updated** — despite the Bank Statement Converter's own
   FAQ/article content describing its privacy behavior, the sitewide Privacy Policy page itself
   still had its original generic text and didn't mention file-based tools, and vaguely described
   Google Analytics as "privacy-respecting analytics" rather than naming it. Fixed: added a
   dedicated section on file-based tools (Bank Statement Converter + image compression) and named
   Google Analytics (gtag.js) explicitly with an accurate description of what it does and doesn't see.
5. **UUID guide implicitly endorsed raw UUIDs as security tokens** — the original guide text said
   v4 UUIDs' unpredictability is "exactly what you want for session tokens or API keys." Revised
   to state the entropy fact without recommending UUIDs as secrets, and to explain *why*
   (conventionally logged/URL-exposed) a dedicated token generator is the better choice. The
   pre-existing UUID Generator tool FAQ (not written in the original pass, but making the same
   overreach — "safe to use as secrets") was aligned to match.
6. **Islamic "not a fatwa" disclaimer rendered on the UUID guide (functional bug)** — `GuideLayout.astro`
   showed `DisclaimerNote` whenever `guide.lastReviewed` was set, but `lastReviewed` was added to
   *all four* guides (for accurate `Article.dateModified`), including the UUID one, which has
   nothing to do with religious guidance. Fixed by adding a dedicated `Guide.showDisclaimer` flag
   (mirroring the existing `Tool.showDisclaimer` pattern already used elsewhere), set only on the
   three Islamic guides, and gating `GuideLayout.astro` on that flag instead.

Additionally applied two safe, in-range dependency patches surfaced by a full (untruncated)
`npm audit`: `fast-xml-parser` 5.9.3→5.10.1 and `js-yaml` 5.2.1→5.2.3, both genuinely client-facing
(shipped in the XML/YAML converter bundles and exposed to arbitrary pasted user input). Verified
via build, typecheck, and a functional parity smoke test before and after. See the QA report for
the full `npm audit` breakdown and what was deliberately left untouched.

## New files

| File | Purpose |
|---|---|
| `src/components/tools/BankStatementConverter.tsx` | The new Bank Statement Converter tool UI (Preact island). Upload, extraction status, editable transaction table, CSV export, sample-data preview. Addresses **C1**. |
| `src/components/tools/bank-statement-converter.css` | Scoped styles for the above, following the same class-naming convention as the existing `CompressImageToKb.astro` upload-zone pattern. |
| `src/lib/bankStatement.ts` | Framework-free extraction logic: PDF text-item → line reconstruction, line → transaction heuristics, CSV serialization, sample demo data. Kept separate from the component so the parsing logic is testable in isolation (verified manually against synthetic input during this pass). |
| `public/site.webmanifest` | Web app manifest with the real site name, description, and existing icon files. Addresses **M2**. |
| `docs/seo-audit.md` | Required deliverable — full findings by severity. |
| `docs/keyword-map.md` | Required deliverable — keyword-to-URL mapping. |
| `docs/content-cluster-plan.md` | Required deliverable — guide backlog and rationale. |
| `docs/performance-audit.md` | Required deliverable — build-output performance findings. |
| `docs/search-console-checklist.md` | Required deliverable — manual Search Console actions. |
| `docs/seo-change-log.md` | This file. |

## Modified files

| File | What changed | Why |
|---|---|---|
| `astro.config.mjs` | Added a `filter` function to the `sitemap()` integration call, excluding any category-hub path with zero live tools, computed from `clusters.ts`/`tools.ts`. | **C2** — closes the gap where the sitemap had no way to stay in sync with the noindex logic. |
| `src/components/Seo.astro` | Added site-wide `Organization` + `WebSite` (with `SearchAction`) JSON-LD, generated once and applied to every page. Added `og:site_name`, `og:image`, `twitter:image` meta tags. | **H1, H2**. |
| `src/pages/index.astro` | Removed the homepage's own inline `Organization`/`WebSite` JSON-LD (now redundant with `Seo.astro`) and its `SearchAction`, which was merged into the sitewide block instead. Updated the "UUID v4 vs v7" homepage card to link to the new dedicated guide instead of the tool page. | Avoids duplicate JSON-LD (**H1**); improves internal linking to new guide content. |
| `src/pages/about.astro` | Rewrote from two short paragraphs to a full page: what the site does, how formulas are chosen, how tools are tested, editorial/review policy, correction policy, error reporting, privacy pointer. Attributed to "OG Toolser Editorial Team," no invented person. Added breadcrumbs. | **H3**. |
| `src/pages/contact.astro` | Fixed the placeholder `hello@tool-hub.example` address (an unreachable `.example` domain) to `hello@ogtoolser.com`. Added a note on what to include when reporting a calculation error, linked to the new correction-policy section on `/about/`. Added breadcrumbs. | **H4**. |
| `src/data/tools.ts` | `bank-statement-converter` entry: `status` changed from `'coming-soon'` to `'live'`, `component` set to `'BankStatementConverter'`, and `howToUse`/`howItWorks`/`faqs`/`articleHtml` written from scratch (previously all empty arrays/strings) covering supported files, limitations, privacy, and accuracy expectations. | **C1**. |
| `src/pages/[cluster]/[tool].astro` | Registered `BankStatementConverter` as a `client:visible` Preact island, alongside the existing XML/YAML/JSON converters. | **C1**. |
| `src/data/clusters.ts` | Added links to the two new Islamic guides from the Islamic cluster's `introHtml`, and a link to the new UUID guide from the Developer cluster's `introHtml`. | Internal linking (brief §12). |
| `src/data/guides.ts` | Added three new guide entries: `gold-vs-silver-nisab`, `what-assets-are-zakatable`, `uuid-v4-vs-uuid-v7`. Updated `how-to-calculate-zakat`'s `relatedGuides` to cross-link the two new Islamic guides. Added a required `datePublished` field to the `Guide` interface and every entry — `2026-07-11` for the pre-existing zakat guide (sourced from `git log --diff-filter=A` on this file, not invented) and `2026-08-07` (today) for the three new guides. | **H5**; also enables the `Article` JSON-LD fix below. |
| `src/layouts/GuideLayout.astro` | `Article` JSON-LD was missing `author`, `datePublished`, and `dateModified` — present on every guide page, including the pre-existing zakat guide, before this pass. Added `author`/`publisher` as the `OG Toolser` Organization (no invented person) and wired `datePublished`/`dateModified` from the new `guide.datePublished`/`guide.lastReviewed` fields. `image` intentionally omitted — no guide currently has a dedicated header image, and the brief says to add it "when available." | Phase 7 requirement: Article schema needs a real author + accurate dates before it's added; this was previously incomplete for the one guide that already existed, not just the new ones. |
| `src/components/tools/SitemapValidator.astro` | Added `aria-live="polite"` to the validation status pill, stats line, and issues list. | **M3**. |
| `src/layouts/BaseLayout.astro` | Added `<link rel="manifest" href="/site.webmanifest">`. | **M2**. |
| `package.json` | `name` field changed from `tool-hub` to `og-toolser`. Removed the unused `@fontsource/space-grotesk` dependency (never imported anywhere in the codebase). Added `pdfjs-dist` (new dependency for the Bank Statement Converter). | **M1**; dead-weight removal, see `performance-audit.md` §4. |
| `package-lock.json` | Regenerated by `npm install`/`npm uninstall` reflecting the above dependency changes. | Automatic. |
| `README.md` | Replaced the unedited `astro create` starter template (including garbled leftover "Tool Hub" repo-name text) with a real project description, structure overview, and contribution notes. | **M1**. |

## Explicitly not changed (with reasoning already in `seo-audit.md`)

- Homepage `<title>`/meta description (L1)
- Cloudflare Pages project name `toolhub` in `.github/workflows/deploy.yml` (M1 note)
- No `.xlsx` binary export added to the Bank Statement Converter (documented gap, not a silent omission — see the tool's own FAQ)
- No OCR support added
- No new brand imagery (1200×630 OG image, 192/512px manifest icons) generated

## Verification performed

- `npm run build` — succeeds, 47 pages generated (was 44 before this pass: +1 tool page, +3 guide pages).
- `npx astro check` — 0 errors, 0 warnings (4 pre-existing deprecation hints in files not touched by this pass).
- Manual verification of generated `dist/` output: canonical URLs, `og:site_name`, single (non-duplicated) `Organization`/`WebSite` JSON-LD per page, sitemap contents, and `/finance/` no longer carrying a `noindex` meta tag.
- Manual test of the transaction-parsing heuristics (`linesToTransactions`) against synthetic bank-statement-style text lines covering signed amounts, trailing-minus debit notation, and non-transaction lines (page numbers, account numbers) — confirmed non-transaction lines are correctly excluded and debit/credit/balance columns are assigned as documented.
