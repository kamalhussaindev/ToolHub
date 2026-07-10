export interface Faq {
  q: string;
  a: string;
}

export interface Example {
  input: string;
  output: string;
}

export interface Tool {
  slug: string;
  title: string;
  cluster: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  keywords: string[];
  intro: string;
  component: string;
  howToUse: string[];
  howItWorks: string;
  examples?: Example[];
  faqs: Faq[];
  related: string[];
  status: 'live' | 'coming-soon';
  showDisclaimer?: boolean; // YMYL content: renders a DisclaimerNote near the bottom of the page
}

export const tools: Tool[] = [
  // ---------------------------------------------------------------------
  // Cluster 1 — Home Improvement (fully built)
  // ---------------------------------------------------------------------
  {
    slug: 'tile-calculator',
    title: 'Tile Calculator',
    cluster: 'home-improvement',
    h1: 'Tile Calculator',
    metaTitle: 'Tile Calculator — How Many Tiles Do You Need?',
    metaDescription:
      'Calculate how many tiles and boxes you need for any floor or wall, with waste allowance built in. Works in m² and ft².',
    primaryKeyword: 'tile calculator',
    keywords: ['tile calculator', 'how many tiles do i need', 'tile quantity calculator', 'box of tiles calculator'],
    intro:
      'Enter your area and tile size to find out exactly how many tiles — and how many boxes — to buy for your project.',
    component: 'TileCalculator',
    howToUse: [
      'Choose your unit system (metric or imperial).',
      'Enter the length and width of the area you\'re tiling.',
      'Enter the size of a single tile and how many tiles come in a box.',
      'Adjust the waste allowance if your layout has a lot of cuts (diagonal, herringbone, etc.).',
      'Read off the tiles and boxes needed — the result updates as you type.',
    ],
    howItWorks:
      'The calculator first finds the area to be tiled: Area = Length × Width. It then divides that by the area of a single tile to get a base tile count, and adds your waste percentage (10% by default, to cover cuts, breakages, and future repairs) to get the total tiles needed: Total tiles = (Area ÷ Tile area) × (1 + Waste%). Finally it divides by the number of tiles per box and rounds up, since you can only buy whole boxes.',
    examples: [
      { input: '12 m² room, 30×30 cm tiles, 10 per box, 10% waste', output: '≈ 147 tiles → 15 boxes' },
      { input: '120 ft² room, 12×12 in tiles, 8 per box, 10% waste', output: '≈ 132 tiles → 17 boxes' },
    ],
    faqs: [
      {
        q: 'How much extra tile should I buy for waste?',
        a: 'A 10% allowance covers most straight-lay jobs. For diagonal, herringbone, or rooms with lots of corners and cuts, increase it to 15–20%.',
      },
      {
        q: 'Should I include the area of doorways in my measurement?',
        a: 'Yes, measure the full floor or wall area including doorways and alcoves — it\'s easier to subtract obvious no-tile zones (like a fixed cabinet footprint) than to add them back later.',
      },
      {
        q: 'How do I calculate tiles for a wall with a window?',
        a: 'Calculate the full wall area first, then subtract the window or door area, and apply the waste percentage to the remaining tileable area.',
      },
      {
        q: 'Does grout line width change how many tiles I need?',
        a: 'Grout lines have a negligible effect on quantity for most tile sizes. For very large-format tiles or wide grout joints, add an extra 2–3% to your waste allowance.',
      },
      {
        q: 'Why does the calculator round up to full boxes?',
        a: 'Retailers sell tile by the box, not individually, so we round the total up to the next whole box to make sure you don\'t run short mid-project.',
      },
      {
        q: 'Can I use this for both floor and wall tiles?',
        a: 'Yes — the math is identical. Just measure the surface you\'re covering and enter the correct tile dimensions.',
      },
    ],
    related: ['flooring-calculator', 'paint-calculator', 'wallpaper-calculator', 'fabric-calculator'],
    status: 'live',
  },
  {
    slug: 'paint-calculator',
    title: 'Paint Calculator',
    cluster: 'home-improvement',
    h1: 'Paint Calculator',
    metaTitle: 'Paint Calculator — How Much Paint Do You Need?',
    metaDescription:
      'Work out how many litres or gallons of paint you need for a room, accounting for doors, windows, and number of coats.',
    primaryKeyword: 'paint calculator',
    keywords: ['paint calculator', 'how much paint do i need', 'paint coverage calculator', 'room paint calculator'],
    intro:
      'Enter your wall dimensions and paint coverage to see exactly how much paint to buy, including doors, windows, and extra coats.',
    component: 'PaintCalculator',
    howToUse: [
      'Choose metric or imperial units.',
      'Enter the total wall length and wall height (or add walls one at a time).',
      'Subtract the area of doors and windows.',
      'Enter your paint\'s coverage rate and the number of coats you plan to apply.',
      'The amount of paint needed updates live as you adjust any value.',
    ],
    howItWorks:
      'Wall area is calculated as Perimeter × Height, then door and window area is subtracted to get the net paintable area: Net area = (Perimeter × Height) − Openings. That figure is multiplied by the number of coats and divided by your paint\'s coverage rate to get the volume required: Paint needed = (Net area × Coats) ÷ Coverage per litre (or gallon).',
    examples: [
      { input: '14 m wall perimeter, 2.4 m height, 3 m² openings, 2 coats, 10 m²/L coverage', output: '≈ 6.1 litres' },
      { input: '48 ft wall perimeter, 8 ft height, 20 ft² openings, 2 coats, 350 ft²/gal coverage', output: '≈ 2.1 gallons' },
    ],
    faqs: [
      {
        q: 'How many coats of paint do I actually need?',
        a: 'Two coats is standard for a color change or new drywall. One coat can work for a refresh in the same color; three coats may be needed for very dark-to-light transitions.',
      },
      {
        q: 'Do I need to subtract doors and windows?',
        a: 'Yes — leaving them in your measurement will overestimate paint needed, sometimes by 10–15% in rooms with lots of glazing.',
      },
      {
        q: 'What paint coverage rate should I use?',
        a: 'Check the tin — most interior emulsion covers 10–12 m² per litre (350–400 ft² per gallon), but textured or very absorbent walls will cover less.',
      },
      {
        q: 'Should I paint the ceiling too?',
        a: 'Add the ceiling as a separate area (Length × Width) at one coat, since ceilings usually need less coverage than accent walls.',
      },
      {
        q: 'How much extra paint should I buy for touch-ups?',
        a: 'Round up to the next full can and keep a small labeled leftover for future touch-ups — paint color batches can vary slightly over time.',
      },
    ],
    related: ['wallpaper-calculator', 'tile-calculator', 'flooring-calculator', 'fabric-calculator'],
    status: 'live',
  },
  {
    slug: 'flooring-calculator',
    title: 'Flooring Calculator',
    cluster: 'home-improvement',
    h1: 'Flooring Calculator',
    metaTitle: 'Flooring Calculator — How Much Flooring to Buy',
    metaDescription:
      'Calculate how much laminate, hardwood, vinyl, or engineered flooring you need, with waste allowance and boxes needed.',
    primaryKeyword: 'flooring calculator',
    keywords: ['flooring calculator', 'how much flooring do i need', 'laminate flooring calculator', 'flooring boxes calculator'],
    intro:
      'Enter your room size and plank or box coverage to find out how much flooring — and how many boxes — to order.',
    component: 'FlooringCalculator',
    howToUse: [
      'Choose metric or imperial units.',
      'Enter the length and width of the room.',
      'Enter the coverage area of a single box of flooring.',
      'Set a waste allowance for cuts around edges and obstacles (10% is typical).',
      'See the total area, boxes, and leftover coverage update instantly.',
    ],
    howItWorks:
      'Room area is Length × Width. We add your waste percentage to account for cuts, offcuts, and mistakes: Total area needed = Room area × (1 + Waste%). That figure is divided by the coverage per box and rounded up, since flooring is sold in full boxes: Boxes needed = ROUND UP(Total area needed ÷ Coverage per box).',
    examples: [
      { input: '20 m² room, 2.2 m² per box, 10% waste', output: '≈ 22 m² → 10 boxes' },
      { input: '220 ft² room, 24 ft² per box, 10% waste', output: '≈ 242 ft² → 11 boxes' },
    ],
    faqs: [
      {
        q: 'How much extra flooring should I order for waste?',
        a: '10% is standard for a simple rectangular room. Increase to 15% for rooms with lots of alcoves, diagonal layouts, or herringbone patterns.',
      },
      {
        q: 'Does plank direction affect how much flooring I need?',
        a: 'Laying planks along the longer dimension of the room can slightly reduce offcut waste, but the difference is usually within your waste allowance.',
      },
      {
        q: 'Should I measure closets and alcoves separately?',
        a: 'Include them in your total floor area — it\'s simpler to measure the full footprint than to add small alcoves back in later.',
      },
      {
        q: 'What if my flooring is sold by the plank, not the box?',
        a: 'Enter the coverage of a single plank in the "coverage per box" field and the calculator will treat each plank as one unit.',
      },
      {
        q: 'How do I account for a hallway or connected room?',
        a: 'Add its area to the total by calculating it separately and summing the two areas before entering waste and coverage.',
      },
    ],
    related: ['tile-calculator', 'wallpaper-calculator', 'paint-calculator', 'fabric-calculator'],
    status: 'live',
  },
  {
    slug: 'wallpaper-calculator',
    title: 'Wallpaper Calculator',
    cluster: 'home-improvement',
    h1: 'Wallpaper Calculator',
    metaTitle: 'Wallpaper Calculator — How Many Rolls Do You Need?',
    metaDescription:
      'Calculate how many wallpaper rolls you need for a room, accounting for roll size and pattern repeat.',
    primaryKeyword: 'wallpaper calculator',
    keywords: ['wallpaper calculator', 'how many rolls of wallpaper do i need', 'wallpaper rolls calculator', 'pattern repeat calculator'],
    intro:
      'Enter your wall size, roll dimensions, and pattern repeat to see exactly how many rolls of wallpaper to buy.',
    component: 'WallpaperCalculator',
    howToUse: [
      'Choose metric or imperial units.',
      'Enter the total wall length and wall height.',
      'Enter your wallpaper roll\'s length and width.',
      'Enter the pattern repeat, if any (0 for plain or random-match paper).',
      'The number of rolls needed updates as you adjust any value.',
    ],
    howItWorks:
      'We first find how many wall-height drops fit into one roll, accounting for pattern repeat: Usable drop length = FLOOR(Roll length ÷ (Wall height + Pattern repeat)). Total drops needed = CEILING(Wall length ÷ Roll width). Rolls needed = CEILING(Total drops ÷ Drops per roll). Pattern repeat reduces usable drop length because each drop must start at a matching point in the pattern.',
    examples: [
      { input: '10 m wall, 2.4 m height, 10 m × 0.53 m roll, 0 cm repeat', output: '4 drops/roll → 5 rolls' },
      { input: '10 m wall, 2.4 m height, 10 m × 0.53 m roll, 64 cm repeat', output: '3 drops/roll → 7 rolls' },
    ],
    faqs: [
      {
        q: 'What is a pattern repeat and why does it matter?',
        a: 'Pattern repeat is the vertical distance before a wallpaper\'s design repeats. Larger repeats waste more paper per drop because each new strip must start at the same point in the pattern to line up with its neighbor.',
      },
      {
        q: 'How many rolls should I add for mistakes?',
        a: 'The calculator already rounds up to full rolls at each step; for a first-time DIY hang, consider buying one extra roll from the same dye lot in case of cutting errors.',
      },
      {
        q: 'Do door and window areas reduce how much wallpaper I need?',
        a: 'For small to medium openings, most installers still buy for the full wall since offcuts from openings are rarely large enough to reuse elsewhere. For very large openings, measure them as separate smaller walls.',
      },
      {
        q: 'Should I buy all my rolls in one batch?',
        a: 'Yes — always buy enough rolls from the same batch/dye lot number, since color can vary slightly between production runs.',
      },
      {
        q: 'What if my wallpaper has no pattern repeat?',
        a: 'Enter 0 for the pattern repeat and the calculator will assume every drop uses the full roll length as efficiently as possible.',
      },
    ],
    related: ['paint-calculator', 'fabric-calculator', 'tile-calculator', 'flooring-calculator'],
    status: 'live',
  },
  {
    slug: 'fabric-calculator',
    title: 'Fabric Calculator',
    cluster: 'home-improvement',
    h1: 'Fabric Calculator',
    metaTitle: 'Fabric Calculator — Yardage for Curtains & Upholstery',
    metaDescription:
      'Calculate how much fabric yardage or metres you need for curtains or upholstery, including pattern repeat.',
    primaryKeyword: 'fabric calculator',
    keywords: ['fabric calculator', 'curtain fabric calculator', 'how much fabric do i need', 'upholstery fabric calculator'],
    intro:
      'Enter your project dimensions and fabric width to work out exactly how much fabric yardage to buy.',
    component: 'FabricCalculator',
    howToUse: [
      'Choose your project type (curtains or upholstery) and unit system.',
      'Enter the finished width and drop (or cover dimensions) needed.',
      'Enter your fabric\'s roll width and pattern repeat, if any.',
      'Set the fullness ratio for curtains (2× is standard for a gathered look).',
      'Read the total fabric length needed, updated live.',
    ],
    howItWorks:
      'For curtains: Total width needed = Track width × Fullness ratio. Widths of fabric = CEILING(Total width needed ÷ Fabric roll width). Cut drop length = Finished drop + hem and heading allowance, rounded up to the nearest pattern repeat. Total fabric = Widths of fabric × Cut drop length. For upholstery, the same repeat-rounding logic applies directly to each panel\'s cut length before summing all panels.',
    examples: [
      { input: '3 m track, 2× fullness, 137 cm fabric width, 2.4 m drop, 0 repeat, 25 cm allowance', output: '≈ 5 widths → 13.25 m' },
      { input: '10 ft track, 2× fullness, 54 in fabric width, 8 ft drop, 27 in repeat, 8 in allowance', output: '≈ 5 widths → 45 ft' },
    ],
    faqs: [
      {
        q: 'What fullness ratio should I use for curtains?',
        a: '2× to 2.5× fabric width relative to the track is standard for a gathered look; use 1.5× for a flatter, more minimal drape.',
      },
      {
        q: 'How much extra should I add for hems and headings?',
        a: 'Add roughly 20–30 cm (8–12 in) per drop to cover the bottom hem, header tape, and heading allowance — the calculator includes a default allowance you can adjust.',
      },
      {
        q: 'How does pattern repeat affect fabric needed for upholstery?',
        a: 'Each cut panel must be rounded up to the nearest full repeat so the pattern lines up across seams, which typically adds 10–20% extra yardage versus plain fabric.',
      },
      {
        q: 'Can I use this calculator for roman blinds or cushions?',
        a: 'Yes — treat each blind or cushion cover as one panel and enter its finished width and drop; skip the fullness ratio (set it to 1×) since blinds and cushions aren\'t gathered.',
      },
      {
        q: 'Should I buy extra fabric beyond the calculated amount?',
        a: 'A small buffer of 10% is wise for cutting errors, especially with large pattern repeats or slippery fabrics that are harder to cut precisely.',
      },
    ],
    related: ['wallpaper-calculator', 'paint-calculator', 'tile-calculator', 'flooring-calculator'],
    status: 'live',
  },

  // ---------------------------------------------------------------------
  // Cluster 2 — Islamic Finance & Calendar (registered, built in Phase C)
  // ---------------------------------------------------------------------
  {
    slug: 'zakat-calculator',
    title: 'Zakat Calculator',
    cluster: 'islamic',
    h1: 'Zakat Calculator',
    metaTitle: 'Zakat Calculator 2026 — Calculate Your Zakat (2.5%)',
    metaDescription:
      "Free zakat calculator. Add your cash, gold, silver and assets, set the nisab, and see the 2.5% zakat due. Silver or gold nisab, any currency.",
    primaryKeyword: 'zakat calculator',
    keywords: ['zakat calculator', 'zakat calculator gold', 'nisab calculator', 'zakat calculator 2026'],
    intro:
      "Work out the zakat due on your wealth. Enter your assets and liabilities, choose a nisab basis, and the 2.5% is calculated instantly.",
    component: 'ZakatCalculator',
    howToUse: [
      'Enter your cash, savings, gold, silver, and other zakatable assets.',
      'Subtract any immediate debts due.',
      'Choose the nisab basis (silver or gold) and enter the current price per gram.',
      "See your zakat due — 2.5% of net wealth if you're above the nisab.",
    ],
    howItWorks:
      'Net zakatable wealth is your total zakatable assets minus immediate liabilities currently due: Net wealth = Assets − Liabilities. The nisab threshold is the value of 85g of gold or 595g of silver at today\'s price: Nisab = Grams (85 or 595) × Price per gram. If your net wealth has stayed at or above the nisab for one full lunar (Hijri) year, zakat is due at 2.5%: Zakat = Net wealth × 2.5%. For example, with $10,000 net wealth and a silver nisab of roughly $500, zakat due would be $250.',
    examples: [
      { input: '$10,000 net wealth, silver nisab ≈ $500', output: 'Above nisab → $250 zakat due (2.5%)' },
      { input: '$300 net wealth, silver nisab ≈ $500', output: 'Below nisab → $0 zakat due' },
    ],
    faqs: [
      {
        q: 'What is the nisab for zakat?',
        a: 'The minimum wealth at which zakat becomes due: the value of 85g of gold or 595g of silver. If your net zakatable wealth stays at or above it for one lunar year, zakat is due.',
      },
      {
        q: 'What is the zakat rate?',
        a: '2.5%, or one-fortieth, of your qualifying wealth.',
      },
      {
        q: 'Should I use the gold or silver nisab?',
        a: 'Both are valid. Many contemporary scholars recommend the silver nisab because its lower threshold means more benefit reaches recipients. This tool defaults to silver.',
      },
      {
        q: 'Is zakat on gross or net wealth?',
        a: 'Net — after deducting immediate debts and liabilities currently due.',
      },
      {
        q: 'When is zakat due?',
        a: 'After your wealth has stayed at or above the nisab for one full lunar (Hijri) year, called the hawl.',
      },
      {
        q: 'Do I pay zakat on my house or car?',
        a: "No — your home and personal-use items aren't zakatable. For a mortgage, generally only the payment currently due is deducted, not the whole loan (views differ).",
      },
    ],
    related: ['zakat-on-gold', 'hijri-date-converter'],
    status: 'live',
    showDisclaimer: true,
  },
  {
    slug: 'zakat-on-gold',
    title: 'Zakat on Gold Calculator',
    cluster: 'islamic',
    h1: 'Zakat on Gold Calculator',
    metaTitle: 'Zakat on Gold Calculator — 2.5% by Weight & Karat',
    metaDescription:
      "Calculate zakat on gold by weight (grams or tola) and karat (24k, 22k, 21k, 18k). Enter today's gold price to get the 2.5% due.",
    primaryKeyword: 'zakat on gold calculator',
    keywords: ['zakat on gold calculator', 'gold zakat calculator', 'zakat on gold jewelry'],
    intro: 'Calculate the zakat owed on your gold. Enter the weight, karat, and current gold price to get the 2.5% due.',
    component: 'ZakatOnGoldCalculator',
    howToUse: [
      'Enter the weight of your gold in grams or tola.',
      'Select the karat (24k, 22k, 21k, or 18k).',
      "Enter today's price per gram of 24k gold.",
      'See the pure gold value and the 2.5% zakat due.',
    ],
    howItWorks:
      "Pure gold content is found from the karat: Pure gold grams = Weight × (Karat ÷ 24). That's multiplied by the price per gram of 24k gold to get the value: Value = Pure gold grams × Price per gram. Zakat is 2.5% of that value: Zakat = Value × 2.5%. For example, 100g of 22k gold is 91.67g of pure gold — at $70/gram that's a value of $6,417, so zakat due would be about $160.",
    examples: [
      { input: '100 g of 22k gold at $70/gram', output: '91.67 g pure → $6,417 value → $160 zakat' },
      { input: '1 tola (11.664 g) of 24k gold at $70/gram', output: '11.664 g pure → $816 value → $20 zakat' },
    ],
    faqs: [
      {
        q: 'How much zakat do I pay on gold?',
        a: '2.5% of its value, when your holdings meet the nisab.',
      },
      {
        q: 'How is 22k or 18k gold handled?',
        a: 'Value is based on its pure gold content — e.g., 22k is 22/24 pure.',
      },
      {
        q: 'Do I pay zakat on gold jewelry I wear?',
        a: 'Schools differ: the Hanafi school includes worn jewelry; the Maliki, Shafiʿi, and Hanbali schools generally exempt jewelry in personal use. Follow your school or ask a scholar.',
      },
      {
        q: 'What is a tola in grams?',
        a: 'About 11.664 grams.',
      },
    ],
    related: ['zakat-calculator', 'hijri-date-converter'],
    status: 'live',
    showDisclaimer: true,
  },
  {
    slug: 'hijri-date-converter',
    title: 'Hijri Date Converter',
    cluster: 'islamic',
    h1: 'Hijri Date Converter',
    metaTitle: 'Hijri Date Converter — Gregorian ⇄ Hijri (Umm al-Qura)',
    metaDescription:
      'Convert Gregorian to Hijri and Hijri to Gregorian instantly. Uses the Umm al-Qura calendar. Free, accurate, works both ways.',
    primaryKeyword: 'hijri date converter',
    keywords: ['hijri date converter', 'gregorian to hijri', 'hijri to gregorian', 'islamic date converter'],
    intro: 'Convert any date between the Hijri and Gregorian calendars, in either direction.',
    component: 'HijriDateConverter',
    howToUse: [
      'Choose a direction: Gregorian to Hijri, or Hijri to Gregorian.',
      'Enter the date — or press "Today" to use the current date.',
      'Read the converted date, shown instantly with no page reload.',
    ],
    howItWorks:
      "This converter uses the Umm al-Qura calendar via the browser's built-in Intl.DateTimeFormat API. For Gregorian → Hijri, the Gregorian date is formatted directly in the Islamic calendar. For Hijri → Gregorian, the tool estimates a starting Gregorian date from the Hijri epoch (1 Muharram 1 AH ≈ 622-07-19 CE) and the average Hijri year length, then nudges day by day until the formatted Hijri date matches your input exactly.",
    faqs: [
      {
        q: 'Which Hijri calendar does this use?',
        a: 'The Umm al-Qura calendar, widely used across the Muslim world.',
      },
      {
        q: 'Why is the date one day off from my country?',
        a: 'Islamic months can begin with the local moon sighting, which can vary by about a day from the calculated calendar.',
      },
    ],
    related: ['zakat-calculator', 'zakat-on-gold'],
    status: 'live',
    showDisclaimer: true,
  },

  // ---------------------------------------------------------------------
  // Cluster 3 — Developer / Data Tools (registered, built in Phase D)
  // ---------------------------------------------------------------------
  {
    slug: 'xml-to-json',
    title: 'XML to JSON Converter',
    cluster: 'developer',
    h1: 'XML to JSON Converter',
    metaTitle: 'XML to JSON Converter — Free & Instant',
    metaDescription: 'Convert XML to JSON instantly in your browser. No upload, no signup.',
    primaryKeyword: 'xml to json converter',
    keywords: ['xml to json', 'xml to json converter'],
    intro: 'Paste XML and get clean, formatted JSON instantly.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['json-to-xml', 'yaml-to-json'],
    status: 'coming-soon',
  },
  {
    slug: 'yaml-to-json',
    title: 'YAML to JSON Converter',
    cluster: 'developer',
    h1: 'YAML to JSON Converter',
    metaTitle: 'YAML to JSON Converter — Free & Instant',
    metaDescription: 'Convert YAML to JSON instantly in your browser. No upload, no signup.',
    primaryKeyword: 'yaml to json converter',
    keywords: ['yaml to json', 'yaml to json converter'],
    intro: 'Paste YAML and get clean, formatted JSON instantly.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['xml-to-json', 'json-to-xml'],
    status: 'coming-soon',
  },
  {
    slug: 'json-to-xml',
    title: 'JSON to XML Converter',
    cluster: 'developer',
    h1: 'JSON to XML Converter',
    metaTitle: 'JSON to XML Converter — Free & Instant',
    metaDescription: 'Convert JSON to XML instantly in your browser. No upload, no signup.',
    primaryKeyword: 'json to xml converter',
    keywords: ['json to xml', 'json to xml converter'],
    intro: 'Paste JSON and get well-formed XML instantly.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['xml-to-json', 'yaml-to-json'],
    status: 'coming-soon',
  },
  {
    slug: 'uuid-generator',
    title: 'UUID / GUID Generator',
    cluster: 'developer',
    h1: 'UUID / GUID Generator',
    metaTitle: 'UUID Generator (v4) — Also a Free GUID Generator',
    metaDescription: 'Generate UUID v4 (also known as a GUID) online in bulk, with one click to copy.',
    primaryKeyword: 'uuid generator',
    keywords: ['uuid generator', 'guid generator', 'uuid v4 generator'],
    intro: 'Generate UUID v4 identifiers — the same thing developers often call a GUID.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['slug-generator', 'sitemap-validator'],
    status: 'coming-soon',
  },
  {
    slug: 'slug-generator',
    title: 'Slug Generator',
    cluster: 'developer',
    h1: 'Slug Generator',
    metaTitle: 'Slug Generator — URL-Friendly Text Instantly',
    metaDescription: 'Turn any text into a clean, URL-friendly slug instantly.',
    primaryKeyword: 'slug generator',
    keywords: ['slug generator', 'url slug generator'],
    intro: 'Turn any text into a clean, lowercase, hyphenated slug.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['uuid-generator', 'sitemap-validator'],
    status: 'coming-soon',
  },
  {
    slug: 'sitemap-validator',
    title: 'Sitemap Validator',
    cluster: 'developer',
    h1: 'Sitemap Validator',
    metaTitle: 'Sitemap Validator — Check Your XML Sitemap',
    metaDescription: 'Validate your XML sitemap structure and catch errors before you submit it to Search Console.',
    primaryKeyword: 'sitemap validator',
    keywords: ['sitemap validator', 'xml sitemap checker'],
    intro: 'Paste your sitemap XML or URL to validate its structure.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['uuid-generator', 'slug-generator'],
    status: 'coming-soon',
  },

  // ---------------------------------------------------------------------
  // Cluster 4 — Academic / Student (registered, built in Phase E)
  // ---------------------------------------------------------------------
  {
    slug: 'cgpa-to-percentage',
    title: 'CGPA to Percentage Calculator',
    cluster: 'academic',
    h1: 'CGPA to Percentage Calculator',
    metaTitle: 'CGPA to Percentage Calculator — All Scales',
    metaDescription: 'Convert CGPA to percentage using the correct formula for your grading scale.',
    primaryKeyword: 'cgpa to percentage calculator',
    keywords: ['cgpa to percentage', 'cgpa to percentage calculator'],
    intro: 'Convert your CGPA to a percentage using the scale your institution actually uses.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['sgpa-to-percentage', 'marks-percentage-calculator'],
    status: 'coming-soon',
  },
  {
    slug: 'sgpa-to-percentage',
    title: 'SGPA to Percentage Calculator',
    cluster: 'academic',
    h1: 'SGPA to Percentage Calculator',
    metaTitle: 'SGPA to Percentage Calculator — All Scales',
    metaDescription: 'Convert SGPA to percentage using the correct formula for your grading scale.',
    primaryKeyword: 'sgpa to percentage calculator',
    keywords: ['sgpa to percentage', 'sgpa to percentage calculator'],
    intro: 'Convert your SGPA to a percentage using the scale your institution actually uses.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['cgpa-to-percentage', 'marks-percentage-calculator'],
    status: 'coming-soon',
  },
  {
    slug: 'marks-percentage-calculator',
    title: 'Marks Percentage Calculator',
    cluster: 'academic',
    h1: 'Marks Percentage Calculator',
    metaTitle: 'Marks Percentage Calculator — Exam Score to %',
    metaDescription: 'Calculate your marks percentage from obtained and total marks instantly.',
    primaryKeyword: 'marks percentage calculator',
    keywords: ['marks percentage calculator', 'percentage calculator marks'],
    intro: 'Calculate your percentage from obtained marks and total marks.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['cgpa-to-percentage', 'attendance-calculator'],
    status: 'coming-soon',
  },
  {
    slug: 'attendance-calculator',
    title: 'Attendance Calculator',
    cluster: 'academic',
    h1: 'Attendance Calculator',
    metaTitle: 'Attendance Calculator — % and Classes Needed',
    metaDescription: 'Calculate your attendance percentage and how many classes you need to reach your target.',
    primaryKeyword: 'attendance calculator',
    keywords: ['attendance calculator', 'attendance percentage calculator'],
    intro: 'Calculate your current attendance percentage and how many classes you still need to attend.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['marks-percentage-calculator', 'cgpa-to-percentage'],
    status: 'coming-soon',
  },

  // ---------------------------------------------------------------------
  // Cluster 5 — Finance & Documents (flagship, built in Phase G)
  // ---------------------------------------------------------------------
  {
    slug: 'bank-statement-converter',
    title: 'Bank Statement Converter',
    cluster: 'finance',
    h1: 'Bank Statement Converter',
    metaTitle: 'Bank Statement Converter — PDF to CSV/Excel',
    metaDescription: 'Convert bank statement PDFs into clean CSV or Excel files for bookkeeping.',
    primaryKeyword: 'bank statement converter',
    keywords: ['bank statement converter', 'pdf to csv bank statement', 'bank statement to excel'],
    intro: 'Upload a bank statement PDF and export a clean, structured spreadsheet.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: [],
    status: 'coming-soon',
  },

  // ---------------------------------------------------------------------
  // Cluster 6 — Everyday / Lifestyle (registered, built in Phase F)
  // ---------------------------------------------------------------------
  {
    slug: 'dog-age-calculator',
    title: 'Dog Age Calculator',
    cluster: 'everyday',
    h1: 'Dog Age Calculator',
    metaTitle: 'Dog Age Calculator — Dog Years to Human Years',
    metaDescription: 'Convert your dog\'s age to human years, adjusted for breed size.',
    primaryKeyword: 'dog age calculator',
    keywords: ['dog age calculator', 'dog years to human years'],
    intro: 'Find your dog\'s age in human years, adjusted for breed size.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['flames-calculator', 'abv-calculator'],
    status: 'coming-soon',
  },
  {
    slug: 'flames-calculator',
    title: 'FLAMES Calculator',
    cluster: 'everyday',
    h1: 'FLAMES Calculator',
    metaTitle: 'FLAMES Calculator — Relationship Compatibility Game',
    metaDescription: 'Play the classic FLAMES name game to find your relationship result.',
    primaryKeyword: 'flames calculator',
    keywords: ['flames calculator', 'flames game'],
    intro: 'Enter two names and play the classic FLAMES game.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['dog-age-calculator', 'abv-calculator'],
    status: 'coming-soon',
  },
  {
    slug: 'abv-calculator',
    title: 'ABV Calculator',
    cluster: 'everyday',
    h1: 'ABV Calculator',
    metaTitle: 'ABV Calculator — Homebrew Alcohol Content',
    metaDescription: 'Calculate your homebrew\'s alcohol by volume from original and final gravity.',
    primaryKeyword: 'abv calculator',
    keywords: ['abv calculator', 'homebrew abv calculator'],
    intro: 'Calculate alcohol by volume from your original and final gravity readings.',
    component: '',
    howToUse: [],
    howItWorks: '',
    faqs: [],
    related: ['dog-age-calculator', 'flames-calculator'],
    status: 'coming-soon',
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCluster(clusterSlug: string): Tool[] {
  return tools.filter((t) => t.cluster === clusterSlug);
}

export function getLiveTools(): Tool[] {
  return tools.filter((t) => t.status === 'live');
}

export function getRelated(slug: string): Tool[] {
  const tool = getTool(slug);
  if (!tool) return [];
  return tool.related
    .map((s) => getTool(s))
    .filter((t): t is Tool => Boolean(t));
}
