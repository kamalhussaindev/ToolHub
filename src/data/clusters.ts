export interface Cluster {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  icon: string;
  order: number;
  introHtml?: string; // optional longer-form hub intro (HTML); falls back to `description` when absent
}

export const clusters: Cluster[] = [
  {
    slug: 'home-improvement',
    name: 'Home Improvement',
    tagline: 'Material calculators for renovation and decorating projects',
    description:
      'Work out exactly how much tile, paint, flooring, wallpaper, or fabric you need before you buy — with waste built in so you never come up short or overspend.',
    accent: 'var(--accent-home)',
    icon: 'home',
    order: 1,
  },
  {
    slug: 'islamic',
    name: 'Islamic Finance & Calendar',
    tagline: 'Zakat calculators and Hijri date conversion',
    description:
      'Calculate zakat on cash, gold, and business assets against current nisab, and convert dates between the Hijri and Gregorian calendars.',
    accent: 'var(--accent-islamic)',
    icon: 'moon-star',
    order: 2,
    introHtml: `
      <p>Zakat is one of the five pillars of Islam, and getting the calculation right matters —
      both for your own obligation and for the recipients who depend on it. This cluster brings
      together the tools you need: the <a href="/islamic/zakat-calculator/">Zakat Calculator</a>
      handles your full financial picture — cash, gold, silver, business assets, and liabilities —
      against your choice of nisab. The <a href="/islamic/zakat-on-gold/">Zakat on Gold
      Calculator</a> is a focused tool for when you just need to value gold holdings by weight and
      karat. And the <a href="/islamic/hijri-date-converter/">Hijri Date Converter</a> helps you
      track your zakat anniversary — the hawl — against the Gregorian calendar you use day to day.</p>
      <p>Every calculation follows widely accepted scholarly positions, and every price or currency
      figure is something you enter — we never assume or hardcode a gold or silver price. Where
      scholars differ, such as on jewelry worn for personal use, the tools say so plainly rather
      than picking a side silently. If you're new to zakat, our guide on
      <a href="/guides/how-to-calculate-zakat/">how to calculate zakat</a> walks through the whole
      process step by step. For deeper scholarly guidance, established organizations such as the
      National Zakat Foundation and Islamic Relief Worldwide publish detailed further reading
      alongside these tools.</p>
    `,
  },
  {
    slug: 'developer',
    name: 'Developer Tools',
    tagline: 'Data format converters and generators for engineers',
    description:
      'Convert between JSON, XML, and YAML, generate UUIDs and slugs, and validate sitemaps — all client-side, nothing leaves your browser.',
    accent: 'var(--accent-dev)',
    icon: 'code',
    order: 3,
    introHtml: `
      <p>These tools are built for engineers who need a quick, correct conversion without spinning
      up a script or trusting a random online form. The
      <a href="/developer/xml-to-json/">XML to JSON</a>,
      <a href="/developer/yaml-to-json/">YAML to JSON</a>, and
      <a href="/developer/json-to-xml/">JSON to XML</a> converters all use real parser
      libraries — not regex — so attributes, nested arrays, namespaces, and YAML anchors convert
      correctly instead of silently breaking on edge cases. Each documents its exact conversion
      convention on the page, so output is predictable and the XML ⇄ JSON converters round-trip
      cleanly with each other.</p>
      <p>The <a href="/developer/uuid-generator/">UUID / GUID Generator</a> produces
      cryptographically secure v4 UUIDs (and time-ordered v7s) in bulk using the browser's native
      crypto API — a GUID is just Microsoft's name for the same value. The
      <a href="/developer/slug-generator/">Slug Generator</a> handles accented Latin text cleanly,
      and the <a href="/developer/sitemap-validator/">Sitemap Validator</a> checks your XML against
      the sitemaps.org protocol before you submit it to Search Console. Every tool here runs
      entirely client-side: nothing you paste is ever uploaded.</p>
    `,
  },
  {
    slug: 'academic',
    name: 'Academic Tools',
    tagline: 'Grade, percentage, and attendance calculators for students',
    description:
      'Convert CGPA and SGPA to percentage using the right scale for your institution, work out marks percentage, and track attendance requirements.',
    accent: 'var(--accent-academic)',
    icon: 'graduation-cap',
    order: 4,
  },
  {
    slug: 'finance',
    name: 'Finance & Documents',
    tagline: 'Document conversion tools for financial data',
    description:
      'Turn bank statement PDFs into clean, structured spreadsheets ready for bookkeeping or analysis.',
    accent: 'var(--accent-finance)',
    icon: 'file-spreadsheet',
    order: 5,
  },
  {
    slug: 'everyday',
    name: 'Everyday & Lifestyle',
    tagline: 'Fun and practical calculators for daily life',
    description:
      'From your dog\'s real age to your homebrew\'s alcohol content, quick calculators for everyday questions.',
    accent: 'var(--accent-everyday)',
    icon: 'sparkles',
    order: 6,
  },
];

export function getCluster(slug: string): Cluster | undefined {
  return clusters.find((c) => c.slug === slug);
}

export function getSortedClusters(): Cluster[] {
  return [...clusters].sort((a, b) => a.order - b.order);
}
