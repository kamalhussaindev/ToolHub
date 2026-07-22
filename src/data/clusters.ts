export interface Cluster {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  color: string; // hex, used as --cat / --tool / --goal custom props (preview.html convention)
  soft: string; // hex, the tinted background paired with `color`
  icon: string; // key into src/data/icons.ts
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
    color: '#f28b36',
    soft: '#fff2e9',
    icon: 'home',
    order: 1,
  },
  {
    slug: 'islamic',
    name: 'Islamic Finance & Calendar',
    tagline: 'Zakat calculators and Hijri date conversion',
    description:
      'Calculate zakat on cash, gold, and business assets against current nisab, and convert dates between the Hijri and Gregorian calendars.',
    color: '#13a67b',
    soft: '#eaf9f4',
    icon: 'moon',
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
    color: '#5869ef',
    soft: '#eef0ff',
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
    color: '#8a5de8',
    soft: '#f3efff',
    icon: 'cap',
    order: 4,
  },
  {
    slug: 'finance',
    name: 'Finance & Documents',
    tagline: 'Document conversion tools for financial data',
    description:
      'Turn bank statement PDFs into clean, structured spreadsheets ready for bookkeeping or analysis.',
    color: '#168db8',
    soft: '#eaf7fb',
    icon: 'wallet',
    order: 5,
  },
  {
    slug: 'everyday',
    name: 'Everyday & Lifestyle',
    tagline: 'Fun and practical calculators for daily life',
    description:
      'From your dog\'s real age to your homebrew\'s alcohol content, quick calculators for everyday questions.',
    color: '#e66a8a',
    soft: '#fff0f4',
    icon: 'spark',
    order: 6,
  },
  {
    slug: 'image',
    name: 'Image Tools',
    tagline: 'Compress photos to an exact KB or MB target',
    description:
      'Shrink any photo to fit exam portals, job applications, visa forms, or email — pick an exact target and download instantly, entirely in your browser.',
    color: '#e0863f',
    soft: '#fdf1e7',
    icon: 'code',
    order: 7,
    introHtml: `
      <p>Upload forms rarely accept a photo the way your camera produces it. This cluster covers
      every common size requirement in one place: dedicated tools for the exact limits that
      <a href="/image/compress-image-to-20kb/">signature uploads</a>,
      <a href="/image/compress-image-to-50kb/">exam photo portals</a>,
      <a href="/image/compress-image-to-100kb/">scholarship and document scans</a>,
      <a href="/image/compress-image-to-200kb/">job portals and visa forms</a>,
      <a href="/image/compress-image-to-500kb/">email and website images</a>, and
      <a href="/image/compress-image-to-1mb/">quality-preserving archives</a> actually ask for —
      plus a <a href="/image/reduce-photo-size-in-kb/">general compressor</a> with adjustable
      presets and a <a href="/image/compress-image-to-kb/">custom-size tool</a> for any exact
      number your form demands.</p>
      <p>Every tool compresses using the same binary-search method: it finds the highest JPEG
      quality that still fits your target, and only reduces pixel dimensions when quality
      reduction alone can't get there. Nothing is uploaded to a server — compression happens
      entirely in your browser using the Canvas API, which matters if you're handling a passport
      photo, ID, or signature.</p>
    `,
  },
];

export function getCluster(slug: string): Cluster | undefined {
  return clusters.find((c) => c.slug === slug);
}

export function getSortedClusters(): Cluster[] {
  return [...clusters].sort((a, b) => a.order - b.order);
}
