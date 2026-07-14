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
  icon: string; // key into src/data/icons.ts
  group: string; // sub-group label shown on the category page (e.g. "Materials")
  popular?: boolean; // featured in the homepage "Most popular tools" grid
  articleHtml?: string; // full-fidelity HTML article body (heading structure that doesn't fit howToUse/howItWorks/examples). When set, ToolShell renders it verbatim instead of those fields.
  extraJsonLd?: Record<string, unknown>[]; // additional JSON-LD blocks beyond the auto-generated WebApplication schema
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
    icon: 'calculator',
    group: 'Materials',
    popular: true,
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
    icon: 'home',
    group: 'Room & surface',
    popular: true,
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
    icon: 'home',
    group: 'Materials',
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
    icon: 'home',
    group: 'Materials',
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
    icon: 'home',
    group: 'Materials',
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
    icon: 'moon',
    group: 'Zakat',
    popular: true,
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
    icon: 'moon',
    group: 'Zakat',
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
    icon: 'moon',
    group: 'Calendar',
    popular: true,
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
    metaDescription: 'Convert XML to JSON instantly in your browser. No upload, no signup. Handles attributes, nested arrays, and namespaces.',
    primaryKeyword: 'xml to json converter',
    keywords: ['xml to json', 'xml to json converter', 'xml to json online'],
    intro: 'Paste XML and get clean, formatted JSON instantly — parsed with a real XML parser, not regex.',
    component: 'XmlToJson',
    howToUse: [
      'Paste your XML into the left panel — a working example is preloaded.',
      'Toggle whether to ignore attributes, parse numbers/booleans, and pretty-print.',
      'Read the converted JSON on the right, updated live as you type.',
      'Click "Copy output" to grab the result.',
    ],
    howItWorks:
      'This converter uses a real XML parser (fast-xml-parser), not string manipulation, so nested elements, attributes, and repeated tags all convert correctly. The conversion follows one clear, documented convention: attributes become object keys prefixed with @_ (e.g. importance="high" becomes "@_importance": "high"), text content alongside child elements is stored under a #text key, and any element repeated under the same parent becomes a JSON array. Whitespace-only text is trimmed. You can toggle off attribute parsing or numeric/boolean coercion if you want plain strings instead.',
    examples: [
      { input: '<to>Tove</to><from>Jani</from>', output: '{"to":"Tove","from":"Jani"}' },
      { input: '<tag>a</tag><tag>b</tag> (repeated element)', output: '{"tag":["a","b"]}' },
    ],
    faqs: [
      {
        q: 'Is my XML uploaded anywhere?',
        a: "No. Parsing happens entirely in your browser using JavaScript — your XML never leaves your device.",
      },
      {
        q: 'How are XML attributes represented in the JSON?',
        a: 'Each attribute becomes a key prefixed with @_ on the parent object, e.g. <note importance="high"> becomes {"note": {"@_importance": "high", ...}}. You can turn this off with the "Ignore attributes" option.',
      },
      {
        q: 'Why do some elements become arrays and others don\'t?',
        a: "If an element tag appears more than once under the same parent, the parser groups them into a JSON array so no data is lost. A single occurrence stays a plain object or value.",
      },
      {
        q: 'What happens to text mixed with child elements?',
        a: 'Mixed text content is stored under a #text key alongside the parsed child elements, so nothing is discarded.',
      },
      {
        q: 'What if my XML is invalid?',
        a: 'The tool validates your XML first and shows a clear parser error with the line number, instead of guessing or crashing.',
      },
    ],
    related: ['json-to-xml', 'yaml-to-json', 'sitemap-validator'],
    status: 'live',
    icon: 'code',
    group: 'Converters',
    popular: true,
  },
  {
    slug: 'yaml-to-json',
    title: 'YAML to JSON Converter',
    cluster: 'developer',
    h1: 'YAML to JSON Converter',
    metaTitle: 'YAML to JSON Converter — Online & Free',
    metaDescription: 'Convert YAML to JSON instantly in your browser. Supports multi-document YAML, anchors, and aliases. No upload, no signup.',
    primaryKeyword: 'yaml to json converter',
    keywords: ['yaml to json', 'yaml to json converter', 'yaml to json online'],
    intro: 'Paste YAML and get clean, formatted JSON instantly — including multi-document files and anchors.',
    component: 'YamlToJson',
    howToUse: [
      'Paste your YAML into the left panel — a working multi-document example is preloaded.',
      'Toggle pretty-print and key-sorting as needed.',
      'Read the converted JSON on the right, updated live as you type.',
      'Click "Copy output" to grab the result.',
    ],
    howItWorks:
      "This converter uses js-yaml, a full YAML parser, so it correctly handles indentation, quoting, dates, and other YAML-specific syntax that regex-based converters get wrong. YAML anchors (&name) and aliases (*name) are resolved automatically into their referenced values. If your input contains multiple documents separated by ---, the output becomes a JSON array with one entry per document; a single document converts to a single JSON object.",
    examples: [
      { input: 'title: Reminder\\ndue: 2026-08-01', output: '{"title":"Reminder","due":"2026-08-01T00:00:00.000Z"}' },
      { input: 'doc1\\n---\\ndoc2 (two documents)', output: '[doc1, doc2] as a JSON array' },
    ],
    faqs: [
      {
        q: 'Is my YAML uploaded anywhere?',
        a: 'No — parsing happens entirely in your browser. Nothing is sent to a server.',
      },
      {
        q: 'Does this support multiple YAML documents in one file?',
        a: 'Yes. If your input has more than one document separated by "---", the output is a JSON array with one entry per document.',
      },
      {
        q: 'Are YAML anchors and aliases resolved?',
        a: 'Yes — anchors (&name) and their aliases (*name) are automatically expanded to their full values in the JSON output.',
      },
      {
        q: 'How are YAML dates and booleans handled?',
        a: 'They\'re parsed into native JavaScript dates and booleans automatically, matching standard YAML 1.2 type resolution.',
      },
      {
        q: 'What happens if my YAML is invalid?',
        a: 'You get the exact YAMLException message, including the line and column of the problem, instead of a silent failure.',
      },
    ],
    related: ['xml-to-json', 'json-to-xml', 'sitemap-validator'],
    status: 'live',
    icon: 'code',
    group: 'Converters',
  },
  {
    slug: 'json-to-xml',
    title: 'JSON to XML Converter',
    cluster: 'developer',
    h1: 'JSON to XML Converter',
    metaTitle: 'JSON to XML Converter — Custom Root Element',
    metaDescription: 'Convert JSON to XML instantly in your browser. Set a custom root element and attribute prefix. No upload, no signup.',
    primaryKeyword: 'json to xml converter',
    keywords: ['json to xml', 'json to xml converter', 'json to xml online'],
    intro: 'Paste JSON and get well-formed XML instantly — with a configurable root element and attribute convention.',
    component: 'JsonToXml',
    howToUse: [
      'Paste your JSON into the left panel — a working example is preloaded.',
      'If your top-level JSON is an array or a single value, set the root element name to wrap it.',
      'Adjust the attribute prefix and pretty-print if needed.',
      'Read the converted XML on the right, updated live as you type.',
    ],
    howItWorks:
      'This converter uses the same convention as the XML to JSON converter, in reverse: keys prefixed with @_ become XML attributes, and a #text key becomes element text content. If your JSON\'s top level is a plain object (like the output of the XML to JSON converter), its keys become root-level XML tags directly — this is what makes round-tripping between the two converters exact. If your top level is an array or a single value instead, it gets wrapped in the root element name you specify, since XML always needs a named container.',
    examples: [
      { input: '{"note":{"to":"Tove","from":"Jani"}}', output: '<note><to>Tove</to><from>Jani</from></note>' },
      { input: '[1, 2, 3] with root name "list"', output: '<list>1</list><list>2</list><list>3</list>' },
    ],
    faqs: [
      {
        q: 'Is my JSON uploaded anywhere?',
        a: 'No — the conversion happens entirely in your browser.',
      },
      {
        q: 'How do I set the root element?',
        a: 'If your JSON top level is already an object (e.g. {"note": {...}}), its key is used as the root tag directly and the "Root element name" field is ignored. If your top level is an array or a plain value, that field names the wrapper element.',
      },
      {
        q: 'How do JSON arrays map to XML?',
        a: 'Each item in an array becomes a repeated XML tag with the same name — the inverse of how the XML to JSON converter groups repeated tags into arrays.',
      },
      {
        q: 'Can I change how attributes are written?',
        a: 'Yes — the attribute prefix defaults to @_ (matching the XML to JSON converter\'s convention) but you can change it to anything you like.',
      },
      {
        q: 'What happens if my JSON is invalid?',
        a: 'You get the exact SyntaxError message from the JSON parser so you can find and fix the problem.',
      },
    ],
    related: ['xml-to-json', 'yaml-to-json', 'sitemap-validator'],
    status: 'live',
    icon: 'code',
    group: 'Converters',
  },
  {
    slug: 'uuid-generator',
    title: 'UUID / GUID Generator',
    cluster: 'developer',
    h1: 'UUID / GUID Generator',
    metaTitle: 'UUID v4 / GUID Generator — Bulk & Free',
    metaDescription: 'Generate UUID v4 (also known as a GUID) online in bulk, with one click to copy. Cryptographically secure, works offline.',
    primaryKeyword: 'uuid generator',
    keywords: ['uuid generator', 'guid generator', 'uuid v4 generator', 'guid generator online'],
    intro: 'Generate UUID v4 identifiers — the same thing developers often call a GUID — individually or in bulk.',
    component: 'UuidGenerator',
    howToUse: [
      'Choose a version: v4 (random, default), v7 (time-ordered), or the all-zero nil UUID.',
      'Set how many you need (up to 500).',
      'Toggle uppercase or remove hyphens if your use case needs it.',
      'Click "Copy all" to grab the full list.',
    ],
    howItWorks:
      'UUID v4 values are generated with the browser\'s native crypto.randomUUID(), which uses a cryptographically secure random number generator — the same guarantee used by v4 UUID libraries in any language. UUID v7 values embed a millisecond-precision timestamp in the first 48 bits followed by random bits, so sorting v7 UUIDs also sorts them by creation time, which is useful as a database primary key. A GUID (Globally Unique Identifier) is Microsoft\'s name for the same 128-bit value as a UUID — there is no technical difference between a v4 UUID and a "GUID."',
    examples: [
      { input: 'Version: v4', output: 'e.g. 3fa85f64-5717-4562-b3fc-2c963f66afa6' },
      { input: 'Version: v4, no hyphens, uppercase', output: 'e.g. 3FA85F6457174562B3FC2C963F66AFA6' },
    ],
    faqs: [
      {
        q: 'Is a GUID the same as a UUID?',
        a: 'Yes. GUID is simply Microsoft\'s name for the same concept as a UUID. A v4 UUID and a "GUID" are the identical 128-bit value format.',
      },
      {
        q: 'Are these UUIDs cryptographically random and safe to use as secrets?',
        a: 'Yes — v4 UUIDs here are generated with crypto.randomUUID(), which draws from your browser\'s cryptographically secure random number generator, not Math.random().',
      },
      {
        q: 'How many UUIDs can I generate at once?',
        a: 'Up to 500 per click, with one click to copy the whole list.',
      },
      {
        q: 'What\'s the difference between v4 and v7?',
        a: 'v4 is fully random. v7 embeds a timestamp so values generated later always sort after earlier ones — useful for database keys where sort order matters.',
      },
      {
        q: 'What is the nil UUID used for?',
        a: 'The nil UUID (all zeros) is a reserved value meaning "no UUID" or "not set," used as a sentinel in some systems.',
      },
    ],
    related: ['slug-generator', 'sitemap-validator', 'xml-to-json'],
    status: 'live',
    icon: 'code',
    group: 'Generators',
    popular: true,
  },
  {
    slug: 'slug-generator',
    title: 'Slug Generator',
    cluster: 'developer',
    h1: 'Slug Generator',
    metaTitle: 'Slug Generator — URL-Friendly Text Instantly',
    metaDescription: 'Turn any text into a clean, URL-friendly slug instantly. Handles accents cleanly. No upload, no signup.',
    primaryKeyword: 'slug generator',
    keywords: ['slug generator', 'url slug generator', 'slugify text'],
    intro: 'Turn any text into a clean, lowercase, hyphenated slug — accents and Unicode handled properly.',
    component: 'SlugGenerator',
    howToUse: [
      'Type or paste your text.',
      'Choose a separator (hyphen or underscore) and whether to lowercase.',
      'Optionally strip common stopwords or cap the length.',
      'Copy the generated slug.',
    ],
    howItWorks:
      "A slug is the URL-safe version of a title or phrase — lowercase, no spaces or punctuation, words joined by a separator. This tool transliterates accented and special Latin characters to their plain ASCII equivalents (é → e, ü → u), strips anything that isn't a letter, number, or separator, and collapses repeated separators. Non-Latin scripts are transliterated where possible but may not convert perfectly, since a slug is meant to stay within the URL-safe ASCII range.",
    examples: [
      { input: '10 Best Café Recipes!', output: '10-best-cafe-recipes' },
      { input: 'Ünïcode & Accents (underscore separator)', output: 'unicode_accents' },
    ],
    faqs: [
      {
        q: 'What is a slug used for?',
        a: 'Slugs are used in URLs — e.g. a blog post titled "10 Best Café Recipes" becomes /10-best-cafe-recipes/, which is clean, readable, and SEO-friendly.',
      },
      {
        q: 'Does this handle accented characters?',
        a: 'Yes — accented Latin characters transliterate cleanly, e.g. é becomes e and ü becomes u.',
      },
      {
        q: 'What about non-Latin scripts like Arabic or Chinese?',
        a: "They may transliterate imperfectly or be dropped, since slugs are meant to stay within the URL-safe ASCII character set.",
      },
      {
        q: 'Can I use underscores instead of hyphens?',
        a: 'Yes — switch the separator option from hyphen to underscore, or any other supported separator.',
      },
    ],
    related: ['uuid-generator', 'sitemap-validator', 'json-to-xml'],
    status: 'live',
    icon: 'code',
    group: 'Generators',
  },
  {
    slug: 'sitemap-validator',
    title: 'Sitemap Validator',
    cluster: 'developer',
    h1: 'Sitemap Validator',
    metaTitle: 'Sitemap Validator — Check XML Sitemaps',
    metaDescription: 'Validate your XML sitemap against the sitemaps.org protocol and catch errors before you submit it to Search Console.',
    primaryKeyword: 'sitemap validator',
    keywords: ['sitemap validator', 'xml sitemap checker', 'validate sitemap'],
    intro: 'Paste your sitemap XML to validate it against the sitemaps.org protocol — catch broken URLs and bad values before Google does.',
    component: 'SitemapValidator',
    howToUse: [
      'Paste your sitemap XML, or try the built-in valid and broken examples.',
      'Read the pass/fail status and entry stats, updated live.',
      'Fix any listed errors or warnings, quoting the offending value.',
      'Optionally try "Fetch by URL," though most sites will block this via CORS.',
    ],
    howItWorks:
      'The validator parses your XML with the browser\'s built-in DOMParser and checks it against the sitemaps.org protocol: the root element must be <urlset> or <sitemapindex> with the correct namespace, every entry needs a valid absolute URL in <loc>, any <lastmod> must be a valid W3C datetime, <changefreq> must be one of the allowed values, and <priority> must be between 0.0 and 1.0. It also flags files exceeding the protocol\'s limits of 50,000 URLs or 50 MB uncompressed.',
    faqs: [
      {
        q: 'Should I paste my sitemap or use the URL fetch option?',
        a: "Pasting is the most reliable option. Fetching by URL relies on the target site allowing cross-origin (CORS) requests, which most sites block — if that happens, just paste the XML directly instead.",
      },
      {
        q: 'What are the sitemap size limits?',
        a: 'Per the sitemaps.org protocol, a single sitemap file should have no more than 50,000 URLs and be no larger than 50 MB uncompressed. Larger sites should split into multiple sitemap files with a sitemap index.',
      },
      {
        q: 'What exactly does this check?',
        a: 'The root element and namespace, that every entry has a valid absolute URL, that <lastmod> is a valid date, that <changefreq> is an allowed value, and that <priority> is between 0.0 and 1.0.',
      },
      {
        q: 'Is my sitemap uploaded anywhere?',
        a: 'No — when you paste XML, validation runs entirely in your browser.',
      },
    ],
    related: ['xml-to-json', 'uuid-generator', 'slug-generator'],
    status: 'live',
    icon: 'code',
    group: 'Validators',
  },

  // ---------------------------------------------------------------------
  // Cluster 4 — Academic / Student (registered, built in Phase E)
  // ---------------------------------------------------------------------
  {
    slug: 'cgpa-to-percentage',
    title: 'CGPA to Percentage Calculator',
    cluster: 'academic',
    h1: 'CGPA to Percentage Calculator – Convert Your CGPA in Seconds',
    metaTitle: 'CGPA to Percentage Calculator – Convert CGPA Fast',
    metaDescription:
      'Free CGPA to percentage calculator with x9.5, x10, deduction & 4.0-scale GPA methods. Convert your CGPA or GPA to a percentage instantly for study abroad, scholarships & jobs.',
    primaryKeyword: 'cgpa to percentage calculator',
    keywords: ['cgpa to percentage calculator', 'cgpa to percentage', 'gpa to percentage calculator', 'convert cgpa to percentage'],
    intro:
      'Enter your CGPA or GPA, choose your school\'s conversion method, and get an instant percentage — no manual math required.',
    component: 'GpaToPercentageCalculator',
    howToUse: [],
    howItWorks: '',
    faqs: [
      {
        q: 'What is the formula for CGPA to percentage?',
        a: "It depends on your scale. For a 4.0 scale, Percentage = (GPA ÷ 4.0) × 100. For the Indian 10-point scale, the common rule is Percentage = CGPA × 9.5, though some universities use ×10 or a deduction method. Always match the formula to your school's system.",
      },
      {
        q: 'Should I multiply my CGPA by 9.5 or 10?',
        a: "Use ×9.5 if your board follows the CBSE standard, and ×10 only if your university specifically uses the direct method (some newer schemes do). They give different results, so check your institution's official rule before choosing.",
      },
      {
        q: 'What percentage is a 3.5 GPA?',
        a: "On a 4.0 scale, a 3.5 GPA equals 87.5%. It's widely considered a strong, above-average result for both admissions and employers.",
      },
      {
        q: 'What is a 3.0 GPA in percentage?',
        a: "A 3.0 GPA on a 4.0 scale converts to 75%. This is often the minimum many universities ask for in Master's or MBA applications.",
      },
      {
        q: 'Why does my university subtract a number before multiplying?',
        a: 'Some universities, like VTU, use a deduction method — for example (CGPA − 0.75) × 10 — because their internal grade boundaries sit slightly higher than the standard scale, and the subtraction realigns the result to national norms.',
      },
      {
        q: 'Is CGPA to percentage conversion accepted by every university?',
        a: "No. The conversion isn't universal — different countries and institutions use different scales and formulas. Always check the specific requirements of the university or organization you're applying to.",
      },
    ],
    related: ['tile-calculator'],
    status: 'live',
    icon: 'cap',
    group: 'Grades',
    popular: true,
    articleHtml: `
      <p>You worked hard for your grades, but the moment you apply somewhere new, they suddenly
      look wrong. A university abroad wants a percentage. A scholarship form has no box for a
      CGPA out of 10. An employer's portal rejects your number outright. Your record is exactly
      the same — it's just written in a language the other side doesn't read, and a rushed guess
      can quietly misrepresent years of work on the one form that matters.</p>
      <p>This CGPA to percentage calculator fixes that in seconds. Enter your CGPA (or a 4.0-scale
      GPA), pick the conversion method your school uses, and get the percentage that admissions
      committees, scholarship boards, and recruiters expect — no manual math, no wrong formula, no
      second-guessing before a deadline.</p>

      <h2>What Does "CGPA to Percentage" Mean?</h2>
      <p>CGPA (Cumulative Grade Point Average) is a single number that sums up your academic
      performance across all semesters, most often on a 10-point scale in India — the US and
      Canada use a similar 4.0-point average, usually just called GPA. A percentage expresses
      that same performance out of 100. Converting between them simply re-expresses your grades
      in the format a particular institution or country uses, so your record can be compared
      fairly against everyone else's.</p>

      <h2>How to Use the CGPA to Percentage Calculator</h2>
      <h3>Step-by-step</h3>
      <ol>
        <li>Type your CGPA or GPA into the input box above (decimals are fine — enter 3.65, not just 3).</li>
        <li>Choose your conversion method with the radio buttons: the 4.0 scale for US/Canada, ×9.5 for CBSE, a simple ×10, or the deduction method your university uses.</li>
        <li>Read your percentage instantly — no calculate button, it updates as you type or switch methods.</li>
        <li>Use the "Copy result" button to paste the number straight into your application or resume.</li>
      </ol>

      <h2>The Formula Behind It</h2>
      <p>There isn't one universal formula — the right one depends on your grading system. This tool covers the four most common:</p>
      <ul>
        <li><strong>4.0 scale (US / Canada):</strong> Percentage = (GPA ÷ 4.0) × 100</li>
        <li><strong>CBSE / standard 10-point (India):</strong> Percentage = CGPA × 9.5</li>
        <li><strong>Simple / direct 10-point:</strong> Percentage = CGPA × 10</li>
        <li><strong>Deduction method (e.g. VTU):</strong> Percentage = (CGPA − 0.75) × 10</li>
      </ul>
      <p>In the 4.0 formula, <em>GPA</em> is your grade average and <em>4.0</em> is the maximum on
      that scale. On the 10-point systems, the multiplier (9.5, 10, or a deduction step) is set by
      the board or university to match its own grading calibration — which is why the same CGPA
      can produce different percentages at different institutions.</p>

      <h3>Different scales and edge cases</h3>
      <p>Some universities publish their own official rule that overrides these — for example,
      Mumbai University uses (CGPA × 7.1) + 11, and GTU uses (CGPA − 0.5) × 10. If the place
      you're applying to lists an exact method, always use theirs, or the "Custom multiplier"
      option, and treat the calculator as a fast, reliable estimate rather than a legal
      document.</p>

      <h2>Worked Example</h2>
      <p>Say your GPA is 3.6 on a 4.0 scale and a university in India asks for a percentage.</p>
      <p>Percentage = (3.6 ÷ 4.0) × 100 = 0.9 × 100 = 90%</p>
      <p>So a 3.6 GPA converts to a 90% equivalent. Now compare a 10-point score: an 8.0 CGPA
      becomes 8.0 × 9.5 = 76% under the CBSE rule, but 8.0 × 10 = 80% under a simple ×10, and
      (8.0 − 0.75) × 10 = 72.5% under the VTU deduction method. Same score, three different
      answers — which is exactly why picking the right method matters.</p>

      <h2>Quick Reference Table</h2>
      <table>
        <thead>
          <tr><th scope="col">CGPA / GPA</th><th scope="col">×9.5 (CBSE)</th><th scope="col">×10 (Simple)</th><th scope="col">(CGPA−0.75)×10 (VTU)</th></tr>
        </thead>
        <tbody>
          <tr><td>10.0 / 4.0</td><td>95%</td><td>100%</td><td>92.5%</td></tr>
          <tr><td>9.0</td><td>85.5%</td><td>90%</td><td>82.5%</td></tr>
          <tr><td>8.0</td><td>76%</td><td>80%</td><td>72.5%</td></tr>
          <tr><td>7.0</td><td>66.5%</td><td>70%</td><td>62.5%</td></tr>
          <tr><td>6.0</td><td>57%</td><td>60%</td><td>52.5%</td></tr>
          <tr><td>5.0</td><td>47.5%</td><td>50%</td><td>42.5%</td></tr>
        </tbody>
      </table>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Using the wrong method's formula.</strong> Applying a ×10 rule when your university uses ×9.5 or a deduction method produces a wrong number. Confirm which one your institution uses first.</li>
        <li><strong>Assuming one universal formula exists.</strong> There isn't one. Countries, boards, and even individual universities differ.</li>
        <li><strong>Mixing up the 4.0 and 10-point scales.</strong> A 4.0-scale GPA and a 10-point CGPA are completely different inputs — don't feed one into the other's formula.</li>
        <li><strong>Ignoring an official conversion.</strong> If your university provides its own rule, a general formula won't match — and theirs is the one they'll accept.</li>
      </ul>
    `,
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
    icon: 'cap',
    group: 'Grades',
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
    icon: 'calculator',
    group: 'Grades',
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
    icon: 'cap',
    group: 'Attendance',
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
    icon: 'wallet',
    group: 'Documents',
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
    icon: 'spark',
    group: 'Lifestyle',
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
    icon: 'spark',
    group: 'Fun',
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
    icon: 'calculator',
    group: 'Utility',
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
