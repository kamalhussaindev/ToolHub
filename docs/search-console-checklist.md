# Search Console Checklist (Manual — No Access From This Engagement)

This repository has no Search Console credentials, verification tokens, or API access, and none
were invented for this pass — every item below is a manual action for whoever holds the
`ogtoolser.com` property (or sets it up for the first time). Nothing here can be automated from
the codebase alone.

## 1. Verify the domain property

- In Search Console, add `ogtoolser.com` as a **Domain property** (not a URL-prefix property) so
  it covers `https://ogtoolser.com` and any future subdomain in one place.
- Verify via DNS TXT record (most robust — survives hosting changes) or, if DNS access isn't
  available, via the HTML file/meta tag method through Cloudflare Pages.
- **Do not** paste a verification meta tag or token into the codebase speculatively — add it only
  once Search Console actually issues one for this property.

## 2. Submit the sitemap

- Submit `https://ogtoolser.com/sitemap-index.xml` (referenced correctly in `public/robots.txt`
  already — confirmed in this audit, see `seo-audit.md`).
- Confirm Search Console reports it as "Success" with the expected page count (43 URLs as of this
  pass's build — see `dist/sitemap-0.xml` after building, or re-run `npm run build` and check).

## 3. Inspect priority URLs

Use **URL Inspection** on these first, since they're the pages this engagement most directly
changed or that map to the highest-value target keywords:

- `/finance/bank-statement-converter/` (new — was unreachable before this pass)
- `/finance/` (category hub — should now be indexable; was `noindex` before this pass)
- `/islamic/zakat-calculator/`
- `/home-improvement/tile-calculator/`
- `/islamic/hijri-date-converter/`
- `/developer/xml-to-json/`, `/developer/yaml-to-json/`, `/developer/uuid-generator/`
- `/academic/cgpa-to-percentage/`, `/academic/attendance-calculator/`
- `/guides/gold-vs-silver-nisab/`, `/guides/what-assets-are-zakatable/`, `/guides/uuid-v4-vs-uuid-v7/` (new guides)

## 4. Check Page Indexing report

- Review **Indexing → Pages** for "Excluded" reasons. Watch specifically for:
  - Any of the 6 `noindex`-by-design category hubs showing up as "Excluded by noindex tag" is
    **expected and correct** as long as they still have zero live tools when you check.
  - Anything unexpectedly excluded as "Discovered — currently not indexed" or "Crawled — currently
    not indexed" on a page that should rank — that's a relevance/authority signal, not a technical
    bug, and matches the "no impressions" diagnosis path in §9 below.

## 5. Check Manual Actions

- **Security & Manual Actions → Manual actions.** Should read "No issues detected." If anything
  appears, treat it as blocking — resolve before any further content or link-building work.

## 6. Check Security Issues

- **Security & Manual Actions → Security issues.** Should read "No issues detected."

## 7. Review the Performance report

Once there's meaningful data (allow at least a few weeks post-submission):

- Filter by **Query** to see which of the 25 target keywords (and their close variants) are
  actually generating impressions.
- Filter by **Page** to see which URLs are earning clicks/impressions, cross-referenced against
  `docs/keyword-map.md`.
- Compare **before vs. after** this engagement's changes using the date-range comparison tool,
  anchored to the date this work was deployed — not before, since nothing here can retroactively
  affect historical data.

## 8. Request indexing selectively

- After deployment, use **URL Inspection → Request Indexing** only for:
  - `/finance/bank-statement-converter/` (net-new page)
  - `/finance/` (flipped from noindex to indexable)
  - The 3 new guide URLs
- **Do not** request indexing for every page on the site. Per the brief's own instruction and
  Google's guidance, mass indexing requests don't speed up crawl of unrelated pages and can look
  like an attempt to game crawl priority — reserve it for pages that actually changed.

## 9. How to read the Performance report once data exists

Use this framework — sourced from Google's own Search Console documentation, not invented here —
to interpret results rather than guessing:

| Pattern | What it usually means | What to check next |
|---|---|---|
| **No impressions** at all for a target query | The page may not be indexed, the query may have low real search demand, or the page isn't yet seen as relevant/authoritative for it | Confirm indexing status (§4) first; if indexed, revisit on-page relevance and internal linking (`seo-audit.md` §3, `content-cluster-plan.md`) |
| **Impressions but consistently low average position** (e.g. position 30+) | The page is indexed and considered relevant enough to show, but isn't yet competitive — usually a content depth/authority/backlink gap, not a technical bug | Strengthen the page's own content depth, internal links pointing to it, and consider whether a supporting guide (per `content-cluster-plan.md`) would help |
| **Impressions with low CTR** relative to position | The title/snippet isn't compelling or doesn't match what searchers expected to click | Revisit `<title>`/meta description for that exact query — check what Google is actually rendering as the snippet (it sometimes overrides your meta description) versus what you wrote |
| **Clicks but weak engagement** (only visible via GA, not Search Console) | Traffic arrives but doesn't convert/use the tool | Cross-reference with Google Analytics behavior metrics (already wired via `gtag.js`) — check bounce rate and time-on-page for that URL |

**Important:** none of the above should be diagnosed with confidence from source-code inspection
alone — that's exactly why this checklist exists as a separate manual step rather than a claim
made in `seo-audit.md`. No page in this codebase is described anywhere in this engagement's
documentation as "indexed," "penalized," or "ranking" — those are Search Console facts, not code
facts.

## 10. Recurring cadence

- Re-check Page Indexing and Manual Actions monthly.
- Re-pull the Performance report quarterly (or after any major content push) to catch regressions
  early, and re-run the before/after comparison in §7 against the most recent prior period.
