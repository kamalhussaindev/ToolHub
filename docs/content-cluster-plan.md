# Content Cluster Plan

Prioritized backlog of supporting guides, per the brief's "6–10 genuinely strong guides, not
dozens of thin pages" instruction. Each guide must satisfy a distinct informational intent, link
naturally into its calculator, and avoid duplicating that calculator's own on-page content —
several tool pages (e.g. Tile Calculator, Wallpaper Calculator, CGPA to Percentage) already carry
substantial `articleHtml` sections covering their own formulas, worked examples, and edge cases,
so a good guide topic here is one a single tool page *can't* fully own — comparisons, category-wide
explainers, and cross-tool questions.

## Status key

- ✅ **Published** — written and live this pass
- 📝 **Planned** — prioritized, not yet written (see "why not all nine" below)

## Islamic finance

| Guide | Status | URL | Links into |
|---|---|---|---|
| How to calculate Zakat | ✅ Published (pre-existing) | `/guides/how-to-calculate-zakat/` | Zakat Calculator |
| Gold vs silver Nisab | ✅ **Published this pass** | `/guides/gold-vs-silver-nisab/` | Zakat Calculator, Zakat on Gold |
| What assets are Zakatable | ✅ **Published this pass** | `/guides/what-assets-are-zakatable/` | Zakat Calculator |
| How to calculate Zakat on gold by karat | 📝 Planned | `/guides/zakat-on-gold-by-karat/` | Zakat on Gold Calculator |
| How to track a Zakat year using the Hijri calendar | 📝 Planned | `/guides/tracking-zakat-year-hijri/` | Hijri Date Converter, Zakat Calculator |

## Home improvement

| Guide | Status | URL | Links into |
|---|---|---|---|
| How many tiles do I need? | Covered on-page | Tile Calculator's own `articleHtml` already covers this in full (waste allowance, worked example, common mistakes) — a separate guide would duplicate it, so none was created | Tile Calculator |
| How much tile waste should I add? | Covered on-page | Same as above — already in Tile Calculator's FAQ and article | Tile Calculator |
| How to calculate paint for walls and ceilings | Covered on-page | Paint Calculator's FAQ already covers coats, coverage rate, ceilings | Paint Calculator |
| How wallpaper pattern repeat affects roll quantity | Covered on-page | Wallpaper Calculator's `howItWorks`/FAQ already explains this directly | Wallpaper Calculator |
| How to calculate flooring for an irregular room | 📝 Planned | `/guides/flooring-irregular-rooms/` | Flooring Calculator — genuinely not covered on the tool page yet (that page assumes a single rectangular area) |

## Developer tools

| Guide | Status | URL | Links into |
|---|---|---|---|
| UUID v4 vs UUID v7 | ✅ **Published this pass** | `/guides/uuid-v4-vs-uuid-v7/` | UUID / GUID Generator |
| YAML vs JSON | 📝 Planned | `/guides/yaml-vs-json/` | YAML to JSON |
| How XML attributes map to JSON | Covered on-page | XML to JSON's `howItWorks`/FAQ already documents the `@_` convention in detail — a separate guide would duplicate it | XML to JSON |
| Common XML sitemap errors | 📝 Planned | `/guides/common-sitemap-errors/` | Sitemap Validator — the tool page explains *what* it checks; a guide walking through *why* each error matters and how to fix it in common CMSs is genuinely distinct |

## Academic tools

| Guide | Status | URL | Links into |
|---|---|---|---|
| How CGPA-to-percentage formulas differ by university | Covered on-page | CGPA to Percentage's `articleHtml` already has a per-university breakdown table (CBSE, VTU, Mumbai, GTU) | CGPA to Percentage |
| How many classes are needed to reach 75% attendance | Covered on-page | Attendance Calculator's `articleHtml` already covers this scenario directly | Attendance Calculator |

## Why 3 of ~9 were published, not all of them

The brief is explicit that quality and distinctness matter more than count: "prioritize
approximately 6–10 genuinely strong guides... do not automatically publish dozens of articles."
Two things came out of actually auditing the existing tool pages rather than assuming a gap:

1. **Several of the originally-recommended guide topics are already fully covered** inside their
   tool page's `articleHtml`/FAQ content (tile waste, wallpaper pattern repeat, XML attributes,
   CGPA-by-university, attendance targets). Writing a second, separate guide on the same topic
   would either duplicate that content (a real SEO risk — near-duplicate pages competing for the
   same query) or thin it out across two weaker pages instead of one strong one. Those are marked
   "Covered on-page" above rather than published as guides.
2. **The three genuinely new gaps with the best cost/value ratio were written this pass**
   (gold vs. silver nisab, what's zakatable, UUID v4 vs v7) — chosen because they're distinct
   informational intents with no existing home, they support high-value target keywords (Zakat,
   UUID), and they could be written to the same sourcing/accuracy bar as the rest of the site in
   this session.
3. **The remaining three planned topics** (Zakat on gold by karat, tracking a Zakat year via
   Hijri dates, flooring for irregular rooms, common sitemap errors) are real, distinct gaps —
   not yet written, and shouldn't be rushed out just to hit a round number. Recommended order:
   flooring-for-irregular-rooms and common-sitemap-errors first (clearest standalone value with
   no existing coverage anywhere on the site), then the two Zakat follow-ons.

## Guidelines for writing the remaining guides

Match the standard set by the four published guides:

- Real worked example with actual numbers, not abstract description
- A distinct FAQ block (not copy-pasted from the linked tool's FAQ)
- 1–2 outbound links to reputable sources where a factual/religious/academic claim needs one
  (matching how `how-to-calculate-zakat.md` references established zakat institutions)
- `lastReviewed` date only on YMYL topics (religious/financial/academic), and only set when the
  content is actually re-checked — not decorative
- Cross-link to 1–2 related guides and the specific tool it funnels into, using descriptive
  anchor text (never "click here")
