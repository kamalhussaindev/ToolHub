# Keyword-to-URL Map

One primary indexable URL per search intent, per the brief. **Finding:** 24 of the 25 target
keywords already had a correctly-mapped, live, indexable URL before this engagement started —
the only gap was Bank Statement Converter, now closed. No new duplicate or near-duplicate pages
were created for wording variations (e.g. "GUID generator" and "UUID v4 generator" both route to
the same `/developer/uuid-generator/`, as instructed).

| Target keyword(s) | URL | Status |
|---|---|---|
| Bank statement converter, PDF bank statement to Excel, bank statement to CSV | `/finance/bank-statement-converter/` | **Was: no route (coming-soon, 404). Now: live** — see `seo-audit.md` §8 and `seo-change-log.md` |
| Flames calculator | `/everyday/flames-calculator/` | Live, pre-existing |
| Dog age calculator, dog years to human years | `/everyday/dog-age-calculator/` | Live, pre-existing |
| ABV calculator, alcohol by volume calculator | `/everyday/abv-calculator/` | Live, pre-existing |
| Zakat calculator, calculate zakat | `/islamic/zakat-calculator/` | Live, pre-existing |
| Zakat on gold, gold zakat calculator | `/islamic/zakat-on-gold/` | Live, pre-existing |
| How to calculate zakat | `/guides/how-to-calculate-zakat/` | Live, pre-existing — correctly kept separate from `/islamic/zakat-calculator/` (informational vs. transactional intent) |
| Hijri date converter, Gregorian to Hijri, Hijri to Gregorian | `/islamic/hijri-date-converter/` | Live, pre-existing — single page handles both directions, not split into two |
| Tile calculator | `/home-improvement/tile-calculator/` | Live, pre-existing |
| Paint calculator | `/home-improvement/paint-calculator/` | Live, pre-existing |
| Wallpaper calculator | `/home-improvement/wallpaper-calculator/` | Live, pre-existing |
| Flooring calculator | `/home-improvement/flooring-calculator/` | Live, pre-existing |
| Fabric calculator | `/home-improvement/fabric-calculator/` | Live, pre-existing |
| YAML to JSON | `/developer/yaml-to-json/` | Live, pre-existing |
| XML to JSON | `/developer/xml-to-json/` | Live, pre-existing |
| JSON to XML | `/developer/json-to-xml/` | Live, pre-existing |
| GUID generator, UUID v4 generator, UUID generator | `/developer/uuid-generator/` | Live, pre-existing — single page, not split by wording variant |
| Slug generator | `/developer/slug-generator/` | Live, pre-existing |
| Sitemap validator | `/developer/sitemap-validator/` | Live, pre-existing |
| CGPA to percentage | `/academic/cgpa-to-percentage/` | Live, pre-existing |
| SGPA to percentage | `/academic/sgpa-to-percentage/` | Live, pre-existing |
| Marks percentage calculator | `/academic/marks-percentage-calculator/` | Live, pre-existing |
| Attendance calculator | `/academic/attendance-calculator/` | Live, pre-existing |

## Supporting (non-primary) keyword coverage added this pass

These aren't in the original 25-keyword list but are directly adjacent search intents the new
guides now capture without duplicating an existing tool page:

| Keyword-ish intent | URL |
|---|---|
| Gold vs silver nisab, zakat nisab threshold | `/guides/gold-vs-silver-nisab/` |
| What assets are zakatable | `/guides/what-assets-are-zakatable/` |
| UUID v4 vs v7, uuid v7 | `/guides/uuid-v4-vs-uuid-v7/` |

## Rules already respected (verified, not changed)

- **No wording-variant duplicate pages** exist anywhere in `tools.ts` — confirmed by checking every `slug` is unique and every tool's `keywords[]` array bundles synonyms into one page rather than spawning near-duplicate routes.
- **Informational vs. transactional separation** is correctly maintained for Zakat: the calculator (`/islamic/zakat-calculator/`) and the explainer guide (`/guides/how-to-calculate-zakat/`) are two distinct pages with different content and different `<title>`s, exactly as instructed, and they cross-link each other.
- **Hijri conversion is one bidirectional tool**, not two pages for "Gregorian to Hijri" and "Hijri to Gregorian" — the tool has a direction toggle, so both keyword phrasings are served by one canonical URL with matching on-page copy for both directions.
