export interface Guide {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  cluster: string;
  intro: string;
  body: string; // HTML-ish markdown-lite content rendered via set:html in GuideLayout
  faqs: { q: string; a: string }[];
  relatedTool: string; // primary tool slug this guide funnels into
  relatedGuides: string[];
  lastReviewed?: string; // ISO date content was last verified — also used as Article dateModified, independent of whether a disclaimer is shown
  datePublished: string; // ISO date this guide first went live — used in Article JSON-LD
  showDisclaimer?: boolean; // YMYL content (religious/financial/academic/health guidance): renders the "guidance tool, not a fatwa" DisclaimerNote. Do not set this from lastReviewed's presence — they're independent (see Tool.showDisclaimer for the same pattern on tool pages).
}

// Guides are informational articles that build topical authority and funnel
// readers into a tool (see §7d). Populated starting in Phase C.
export const guides: Guide[] = [
  {
    slug: 'how-to-calculate-zakat',
    title: 'How to Calculate Zakat',
    h1: 'How to Calculate Zakat: A Simple Step-by-Step Guide',
    metaTitle: 'How to Calculate Zakat — A Simple Step-by-Step Guide',
    metaDescription:
      'Learn how to calculate zakat step by step: what counts as zakatable wealth, the nisab, the hawl, and the 2.5% rate — with a worked example.',
    cluster: 'islamic',
    intro:
      "Zakat is one of the five pillars of Islam — a mandatory act of worship, not a voluntary charity. This guide walks through exactly how it's calculated, step by step, so you can work out what you owe with confidence.",
    body: `
      <h2>What is zakat?</h2>
      <p>Zakat is an obligatory annual payment of 2.5% on wealth that has been held above a minimum
      threshold — the nisab — for one full lunar (Hijri) year. It applies to Muslims whose net
      wealth qualifies, and it's distributed to specific categories of recipients defined in the
      Qur'an, such as the poor and needy.</p>

      <h2>What wealth is zakatable?</h2>
      <p>Zakatable wealth generally includes cash in hand and in bank accounts, gold and silver,
      business inventory held for resale, and money owed to you that you expect to be repaid.
      It does not include your home, car, or personal-use items such as furniture or the clothes
      you wear.</p>

      <h2>Step 1: Add up your zakatable assets</h2>
      <p>List everything that counts: cash, savings, gold and silver (at current market value),
      business merchandise, and receivables likely to be repaid.</p>

      <h2>Step 2: Subtract immediate liabilities</h2>
      <p>Deduct debts and bills currently due — not your entire mortgage or long-term loan balance,
      just the portion due now. Scholarly views differ on exactly how much of a long-term debt to
      deduct, so if you're unsure, consult a qualified scholar for your specific situation.</p>

      <h2>Step 3: Check against the nisab</h2>
      <p>The nisab is the minimum wealth needed for zakat to apply: the value of <strong>85 grams
      of gold</strong> or <strong>595 grams of silver</strong>. Many contemporary scholars and zakat
      institutions recommend using the silver nisab, since its lower monetary value means more
      people qualify to pay — and more benefit reaches recipients. If your net zakatable wealth is
      below the nisab, no zakat is due this year.</p>

      <h2>Step 4: Confirm the hawl (one lunar year)</h2>
      <p>Zakat is only due once your wealth has stayed at or above the nisab for one full Hijri
      year. Many people pick a fixed Islamic date — often in Ramadan — as their annual "zakat
      anniversary" to keep this consistent. Our <a href="/islamic/hijri-date-converter/">Hijri Date
      Converter</a> can help you track that date against the Gregorian calendar.</p>

      <h2>Step 5: Calculate 2.5%</h2>
      <p>If your net zakatable wealth meets or exceeds the nisab, zakat due is simply:</p>
      <p><strong>Zakat = Net zakatable wealth × 2.5%</strong></p>
      <p>Or skip the manual math — <a href="/islamic/zakat-calculator/">use the zakat calculator</a> to work out what you owe instantly from your own numbers.</p>

      <h2>Worked example</h2>
      <p>Suppose your zakatable assets — cash, savings, and gold — total $12,000, and you have
      $2,000 in bills currently due. Your net zakatable wealth is $10,000. If the current silver
      nisab works out to around $500, you're well above it, so:</p>
      <p>Zakat due = $10,000 × 2.5% = <strong>$250</strong></p>

      <h2>Common mistakes to avoid</h2>
      <ul>
        <li>Deducting your entire mortgage or car loan instead of just the amount currently due.</li>
        <li>Forgetting to include gold or silver jewelry that isn't for everyday personal use.</li>
        <li>Using an outdated gold or silver price instead of the current market rate.</li>
        <li>Paying zakat on your home, car, or personal belongings — these aren't zakatable.</li>
        <li>Not tracking the hawl consistently, leading to missed or duplicate zakat years.</li>
      </ul>

      <h2>Further reading</h2>
      <p>For additional guidance, established zakat institutions such as the National Zakat
      Foundation and Islamic Relief Worldwide publish detailed, scholar-reviewed zakat guidance and
      calculators that can serve as useful further reading alongside this guide.</p>
    `,
    faqs: [
      {
        q: 'How do you work out zakat?',
        a: 'Add up your zakatable assets (cash, gold, silver, business inventory), subtract debts currently due, and if the result is at or above the nisab, multiply it by 2.5%.',
      },
      {
        q: 'How to figure out zakat?',
        a: 'Follow the five steps above: total your zakatable wealth, subtract what you currently owe, check the result against the nisab, confirm a full lunar year has passed, then take 2.5% of the net figure.',
      },
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
        a: 'Both are valid. Many contemporary scholars recommend the silver nisab because its lower threshold means more benefit reaches recipients.',
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
    relatedTool: 'zakat-calculator',
    relatedGuides: ['gold-vs-silver-nisab', 'what-assets-are-zakatable'],
    lastReviewed: '2026-07-11',
    datePublished: '2026-07-11', // per git history: guides.ts (this guide) first added 2026-07-11
    showDisclaimer: true,
  },
  {
    slug: 'gold-vs-silver-nisab',
    title: 'Gold vs Silver Nisab: Which Should You Use for Zakat?',
    h1: 'Gold vs Silver Nisab: Which Should You Use for Zakat?',
    metaTitle: 'Gold vs Silver Nisab — Which Zakat Threshold to Use',
    metaDescription:
      'The nisab can be based on 85g of gold or 595g of silver, and the two give very different thresholds. Learn how each is calculated and which most contemporary scholars recommend.',
    cluster: 'islamic',
    intro:
      "Zakat only becomes due once your wealth reaches the nisab — but there are two accepted ways to set that threshold, and they don't give the same number. Here's how each is calculated and how to decide between them.",
    body: `
      <h2>Two nisab thresholds, one obligation</h2>
      <p>The nisab is the minimum amount of zakatable wealth you must hold before zakat is due.
      Classical scholarship defines it two ways: the value of <strong>85 grams of gold</strong>, or
      the value of <strong>595 grams of silver</strong>. Both are valid; they simply come from
      different hadith narrations about gold and silver currency of the time.</p>

      <h2>Why the two thresholds give different answers</h2>
      <p>Gold and silver haven't moved in price at the same rate for decades — gold has risen much
      further relative to silver. That means the silver nisab, converted to today's currency, is
      usually a noticeably smaller amount than the gold nisab. In practice: someone with modest
      savings might sit above the silver nisab but below the gold nisab, so the choice directly
      affects whether zakat is due at all in some cases.</p>

      <h2>How each is calculated</h2>
      <p><strong>Gold nisab</strong> = 85g × today's price per gram of gold.<br />
      <strong>Silver nisab</strong> = 595g × today's price per gram of silver.</p>
      <p>Both figures move daily with the metals market, so there's no fixed dollar or currency
      amount you can memorize for the year — you (or a calculator) need the current price per
      gram at the time you're checking.</p>

      <h2>Which do scholars recommend?</h2>
      <p>Many contemporary scholars and zakat institutions — including bodies such as the National
      Zakat Foundation — recommend the <strong>silver nisab</strong> as the default for cash and
      mixed wealth, reasoning that its lower threshold brings more people into paying zakat and
      therefore channels more support to recipients, which aligns with zakat's redistributive
      purpose. That said, using the gold nisab is not wrong — it is the more traditionally cited
      figure and some scholars and individuals prefer it, particularly when the wealth in question
      is gold itself.</p>
      <p>Because views differ, treat this as guidance rather than a single ruling: if you follow a
      specific scholar, teacher, or institution, use whichever nisab they direct you to.</p>

      <h2>Using this with the calculator</h2>
      <p>Our <a href="/islamic/zakat-calculator/">Zakat Calculator</a> lets you pick either basis
      and enter the current price per gram yourself — the tool never assumes or hardcodes a gold
      or silver price, since both change daily. If you're valuing gold jewelry or bullion
      specifically, the <a href="/islamic/zakat-on-gold/">Zakat on Gold Calculator</a> is a
      more focused tool for that.</p>
    `,
    faqs: [
      {
        q: 'Is the silver nisab always lower than the gold nisab?',
        a: 'In current market conditions, yes — silver\'s price has fallen far behind gold\'s over recent decades, so 595g of silver is typically worth much less than 85g of gold. This can change if metal prices shift dramatically.',
      },
      {
        q: 'Can I switch between gold and silver nisab from year to year?',
        a: 'Scholarly views vary on this. Many recommend picking one basis and applying it consistently. If you\'re unsure, ask a qualified scholar for guidance specific to your situation.',
      },
      {
        q: 'Does the nisab change during the year?',
        a: 'The gram thresholds (85g gold, 595g silver) are fixed, but their currency value moves daily with metal prices — so the nisab in your local currency is not a fixed number year-round.',
      },
    ],
    relatedTool: 'zakat-calculator',
    relatedGuides: ['how-to-calculate-zakat', 'what-assets-are-zakatable'],
    lastReviewed: '2026-08-07',
    datePublished: '2026-08-07',
    showDisclaimer: true,
  },
  {
    slug: 'what-assets-are-zakatable',
    title: 'What Assets Are Zakatable? A Complete Overview',
    h1: 'What Assets Are Zakatable?',
    metaTitle: 'What Assets Are Zakatable — A Complete Overview',
    metaDescription:
      'A breakdown of which assets count toward zakat — cash, gold, silver, business inventory, receivables — and which are excluded, like your home and personal-use items.',
    cluster: 'islamic',
    intro:
      "Zakat applies to specific categories of wealth, not your entire net worth. Here's what typically counts as zakatable, what doesn't, and where views commonly differ.",
    body: `
      <h2>The general principle</h2>
      <p>Zakat is due on wealth that is capable of growth or held for trade — cash, precious
      metals, and business assets — not on items you own and use for personal living. A useful
      rule of thumb: if it's sitting there earning or ready to be sold, it's likely zakatable; if
      you're wearing it, living in it, or driving it, it likely isn't.</p>

      <h2>Generally zakatable</h2>
      <ul>
        <li><strong>Cash and bank balances</strong> — checking, savings, and cash on hand, in any currency.</li>
        <li><strong>Gold and silver</strong> — bullion, coins, and (per most schools) jewelry not in regular personal use. See our <a href="/guides/gold-vs-silver-nisab/">gold vs silver nisab guide</a> for how these are valued.</li>
        <li><strong>Business inventory</strong> — goods held for resale, valued at current market price, not cost price.</li>
        <li><strong>Receivables you expect to be repaid</strong> — money owed to you by a reliable debtor.</li>
        <li><strong>Investment assets held for trade</strong> — such as shares bought with resale intent (many scholars apply zakat to their market value, sometimes prorated to the company's zakatable assets).</li>
      </ul>

      <h2>Generally not zakatable</h2>
      <ul>
        <li><strong>Your home</strong> — the property you live in.</li>
        <li><strong>Your car</strong> — used for personal transport, not resale stock.</li>
        <li><strong>Personal-use items</strong> — furniture, clothing, electronics, and similar belongings.</li>
        <li><strong>Tools of your trade</strong> — equipment you use to work, rather than sell.</li>
      </ul>

      <h2>Where views commonly differ</h2>
      <p>A few categories are genuinely disputed between schools of thought, and this guide won't
      resolve them for you:</p>
      <ul>
        <li><strong>Jewelry worn for personal use.</strong> The Hanafi school generally includes it; the Maliki, Shafiʿi, and Hanbali schools generally exempt jewelry in ordinary personal use.</li>
        <li><strong>Retirement and pension accounts.</strong> Treatment depends on whether you have current access to the funds and how the scheme is structured — ask a scholar familiar with your country's pension system.</li>
        <li><strong>Long-term debt owed to you or by you.</strong> Views differ on how much of a long-term receivable or liability (like a mortgage) to include in this year's calculation versus treating it as a future-year event.</li>
      </ul>

      <h2>Subtracting liabilities</h2>
      <p>Once you've totaled zakatable assets, subtract debts and bills currently due — not the
      full balance of a long-term loan, just the portion due now. Our
      <a href="/guides/how-to-calculate-zakat/">how-to-calculate-zakat guide</a> walks through
      this step by step, and the <a href="/islamic/zakat-calculator/">Zakat Calculator</a> applies
      it directly to your numbers.</p>
    `,
    faqs: [
      {
        q: 'Do I pay zakat on my salary?',
        a: 'Not directly — zakat applies to wealth you hold above the nisab for a full lunar year, not to income as it\'s earned. Salary becomes zakatable once it sits in savings and meets the nisab and hawl conditions.',
      },
      {
        q: 'Is zakat due on cryptocurrency?',
        a: 'Many contemporary scholars treat cryptocurrency similarly to cash or tradeable assets if held for investment, though rulings are still developing and views vary — check with a knowledgeable source for current guidance.',
      },
      {
        q: 'What about jewelry I never wear?',
        a: 'Jewelry that isn\'t in regular personal use is more consistently treated as zakatable across schools of thought, similar to bullion.',
      },
    ],
    relatedTool: 'zakat-calculator',
    relatedGuides: ['how-to-calculate-zakat', 'gold-vs-silver-nisab'],
    lastReviewed: '2026-08-07',
    datePublished: '2026-08-07',
    showDisclaimer: true,
  },
  {
    slug: 'uuid-v4-vs-uuid-v7',
    title: 'UUID v4 vs UUID v7: Which Should You Use?',
    h1: 'UUID v4 vs UUID v7: Which Should You Use?',
    metaTitle: 'UUID v4 vs UUID v7 — Which Should You Use?',
    metaDescription:
      'UUID v4 (uuidv4) is fully random, UUID v7 embeds a sortable timestamp — compare how each works, their database trade-offs, and when to pick one.',
    cluster: 'developer',
    intro:
      "Both UUID v4 and v7 give you a 128-bit unique identifier, but they're generated very differently — and that difference matters a lot for anything backed by a database index.",
    body: `
      <h2>What they have in common</h2>
      <p>UUID v4 and UUID v7 are both 128-bit values formatted as the familiar
      <code>xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx</code> hex string, and both are designed to be
      globally unique without coordination between systems — no central authority hands them out.
      A "GUID" is simply Microsoft's name for the same concept; there's no technical difference.</p>

      <h2>UUID v4: fully random</h2>
      <p>Per RFC 9562, a v4 UUID is 122 bits of randomness (the remaining 6 bits are fixed to mark
      the version and variant). Every value is independent of every other — there's no ordering,
      no timestamp, nothing to infer from one UUID about the next or previous one generated.</p>
      <p>That unpredictability is necessary for a value to double as a security token, but it isn't
      sufficient on its own — a UUID is still an identifier by convention, commonly logged, put in
      URLs, and treated as non-secret across tooling and infrastructure. If you specifically need a
      session token, API key, or password-reset token, use your framework's dedicated token
      generator (or <code>crypto.getRandomValues()</code> sized for your use case) rather than
      repurposing a UUID library, so it's handled with the operational care actual secrets need —
      not just because the number of random bits happens to be similar.</p>

      <h2>UUID v7: time-ordered</h2>
      <p>A v7 UUID embeds a 48-bit millisecond Unix timestamp in its first bits, followed by random
      bits for the rest. The practical effect: UUIDs generated later almost always sort after UUIDs
      generated earlier, because the timestamp dominates the sort order. Two v7 values generated in
      the same millisecond are still overwhelmingly unlikely to collide, thanks to their random
      remainder — but unlike v4, that remainder is the only source of unpredictability, so v7
      should not be used anywhere a value needs to double as a secret.</p>

      <h2>Why the difference matters for databases</h2>
      <p>This is where the choice has real consequences. Most relational databases store primary
      keys in an index ordered by value. Random v4 UUIDs, inserted as primary keys, scatter writes
      across the entire index — causing page splits and index fragmentation that get worse as the
      table grows, which measurably slows down inserts on large tables. Because v7 UUIDs are
      roughly sequential, new rows land at the end of the index, much like an auto-incrementing
      integer — so v7 avoids that fragmentation while keeping the collision-resistance and
      decentralized generation that made UUIDs useful in the first place.</p>

      <h2>When to use which</h2>
      <ul>
        <li><strong>Use v4</strong> for anything where unpredictability matters: tokens, secrets, one-time codes, or identifiers you don't want to leak creation order for.</li>
        <li><strong>Use v7</strong> for database primary keys, event IDs, or any high-volume identifier where insert performance and natural chronological sortability are useful.</li>
        <li><strong>Either works</strong> for general-purpose unique IDs with low write volume, where index fragmentation isn't a practical concern.</li>
      </ul>

      <h2>Generating both</h2>
      <p>Our <a href="/developer/uuid-generator/">UUID / GUID Generator</a> produces cryptographically
      secure v4 UUIDs using the browser's native <code>crypto.randomUUID()</code>, and v7 UUIDs
      with an embedded millisecond timestamp — in bulk, with one click to copy.</p>
    `,
    faqs: [
      {
        q: 'Does v7 leak information by embedding a timestamp?',
        a: 'It reveals roughly when the ID was created, which matters if creation time is sensitive information you don\'t want exposed in a public-facing identifier — in that case, use v4 instead.',
      },
      {
        q: 'Is a v7 UUID less random than v4?',
        a: 'It has fewer random bits than v4 (74 bits versus 122), but that\'s still far more than enough entropy to avoid practical collisions at any realistic generation rate.',
      },
      {
        q: 'Can I mix v4 and v7 UUIDs in the same system?',
        a: 'Yes — both are valid UUIDs and can coexist. Just be consistent within a single indexed column so you get the sorting benefit where it matters.',
      },
    ],
    relatedTool: 'uuid-generator',
    relatedGuides: [],
    lastReviewed: '2026-08-07',
    datePublished: '2026-08-07',
  },
  {
    slug: 'what-abv-really-means',
    title: 'What ABV Really Means',
    h1: 'What ABV Really Means: The Science and History of Alcohol Strength',
    metaTitle: 'What ABV Really Means: The Science and History of Alcohol Strength',
    metaDescription:
      "How ABV is measured, where \"proof\" came from, why the homebrew formula is only an estimate, and how ABV relates to a standard drink.",
    cluster: 'everyday',
    intro:
      "Every bottle, can and cask carries a single number that sums up its strength: its ABV, or alcohol by volume. It's one of the most quoted figures in drinks, and one of the least understood — here's where it actually comes from.",
    body: `
      <p style="color:var(--color-text-muted);font-size:13px;margin-top:-8px">Last updated August 14, 2026 · By the OG Toolser Editorial Team</p>

      <h2>A number that took centuries to standardise</h2>
      <p>For most of human history, "how strong is it?" had no reliable answer. Strength was judged
      by taste, by how quickly a drink went to the head, and — for anyone collecting tax — by
      increasingly ingenious tests.</p>
      <p>The most famous of these is the gunpowder test. Spirit was poured over a small heap of
      gunpowder and set alight; if the powder still caught and burned, the spirit was declared
      "above proof" and taxed accordingly. The test works because potassium nitrate, the active salt
      in gunpowder, dissolves far more readily in water than in alcohol — so a watered-down spirit
      leaves the powder too damp to ignite. It was crude and easy to game: grain size, soaking time
      and humidity all shifted the result. By convention, the concentration at which gunpowder would
      just reliably ignite was later fixed at about 57.15% ABV, which is why "100 degrees proof" in
      the old British system corresponds to that oddly specific figure rather than a round number.</p>
      <p>The romantic image of Royal Navy sailors flashing gunpowder to check their rum ration is
      largely a myth — by the time rum became the standard naval issue, ships were already carrying
      hydrometers. But the gunpowder era did leave one lasting fingerprint: the word <em>proof</em>
      itself, still stamped on spirits bottles today.</p>

      <h3>The hydrometer changes everything</h3>
      <p>The real breakthrough was density. Alcohol is lighter than water, so the more ethanol a
      liquid contains, the less dense it is. A <strong>hydrometer</strong> — a weighted glass float
      that sinks to a depth set by the liquid's density — turned strength from a guess into a
      reading.</p>
      <p>The instrument that standardised British practice was designed by the excise officer
      <strong>Bartholomew Sikes</strong>. His hydrometer won a government competition in 1802, and
      after his death it was written into law by the Sikes' Hydrometer Act of 1816. From then until
      1980, Sikes's instrument was the legal basis for measuring spirit strength across the UK — a
      remarkable 164-year run for a single piece of brass and glass. The system was studied
      seriously enough to earn a place in the scientific literature more than a century later (see
      Tate's 1931 account of Sikes's alcoholometry in <em>Nature</em>, linked below).</p>
      <p>Two different legacies came out of this history. In the United States, proof was defined
      simply as <strong>twice the ABV</strong> — an 80-proof bourbon is 40% ABV — a definition the
      Alcohol and Tobacco Tax and Trade Bureau still enforces today. In Britain, the older Sikes
      scale set 100 degrees proof at roughly 57.15% ABV, making UK proof about 1.75 times the ABV.
      The UK abandoned proof entirely on 1 January 1980 and switched to plain ABV, which is now the
      near-universal standard on labels worldwide.</p>

      <h2>The science: why a falling density reveals alcohol</h2>
      <p>Modern brewing measures strength the same way Sikes did — through density — but at two
      moments instead of one.</p>
      <p>Fermentation is, at heart, a swap. Yeast consumes the sugars dissolved in the wort and
      converts them into roughly equal parts ethanol and carbon dioxide. Sugar is dense and makes
      the liquid heavier than water; ethanol is lighter than water. So as fermentation proceeds, the
      liquid's density falls — and the size of that fall is a direct measure of how much sugar was
      turned into alcohol.</p>
      <p>That is why brewers take two hydrometer readings. <strong>Original gravity (OG)</strong> is
      the density of the sweet, unfermented wort — typically somewhere around 1.040 to 1.060.
      <strong>Final gravity (FG)</strong> is the density once the yeast has finished — usually around
      1.008 to 1.015. The gap between them is the fermentation's signature. A large drop means a lot
      of sugar was consumed and a lot of alcohol produced; a small drop means a weaker result.</p>
      <p>The crucial point is that the hydrometer never touches the alcohol directly. It measures
      density, and the alcohol content is <em>inferred</em> from how much that density changed. This
      indirect chain is exactly why commercial producers, who need certified figures, reach for gas
      chromatography or distillation to quantify ethanol precisely — while homebrewers, for whom an
      accurate estimate is plenty, rely on the gravity drop.</p>

      <h2>Why (OG − FG) × 131.25 is a shortcut, not a law</h2>
      <p>The formula almost every homebrewer learns first is disarmingly simple:</p>
      <p><strong>ABV % = (OG − FG) × 131.25</strong></p>
      <p>Multiply the drop in gravity by 131.25 and you have your percentage. For a beer that starts
      at 1.055 and finishes at 1.015, that gives (0.040) × 131.25 ≈ 5.25% ABV. It is fast,
      memorable, and — this is the part worth understanding — an approximation.</p>
      <p>The constant 131.25 is not a fundamental value like the speed of light. It is an
      empirically chosen number that bundles together two separate conversions: the amount of
      ethanol produced for a given loss of density, and the density of ethanol itself (which is
      needed to turn a figure "by weight" into one "by volume"). Because it packs both steps into
      one multiplier, it quietly assumes a "typical" wort. For ordinary-strength beers that
      assumption holds well, and the simple formula is accurate to within a few tenths of a
      percent.</p>
      <p>The relationship between gravity and alcohol, however, is not perfectly linear — it bends
      at higher concentrations. So for big beers, the simple formula starts to drift, and it drifts
      in one direction: it <em>under</em>-estimates. The more accurate alternative, published by Dr
      Michael Hall in <em>Zymurgy</em> in 1995 and widely known as the Hall formula, corrects for
      this curvature:</p>
      <p><strong>ABV % = (76.08 × (OG − FG) / (1.775 − OG)) × (FG / 0.794)</strong></p>
      <p>For a standard beer the two formulas agree almost exactly. For a barleywine going from
      1.120 down to 1.030, though, the gap becomes real: the simple formula returns about 11.81%
      ABV, while Hall's returns roughly 12.05%. A quarter of a percent may not sound like much, but
      for labelling, recipe design and knowing just how potent a strong beer really is, it matters.
      As a rule of thumb, the simple formula is fine below about 8% ABV; above that, the Hall
      formula earns its keep.</p>
      <p>None of this means the everyday calculation is unreliable — it means you should know what
      it assumes. If you would rather not do the arithmetic by hand, our
      <a href="/everyday/abv-calculator/">ABV calculator</a> applies the standard formula for you
      and returns the figure instantly.</p>

      <h2>ABV vs proof vs ABW: three ways to say "strength"</h2>
      <p>Part of the confusion around alcohol strength is that at least three different scales are
      in circulation, and they are not interchangeable.</p>
      <p><strong>ABV (alcohol by volume)</strong> is the modern default: the percentage of the
      <em>total volume</em> that is pure ethanol. A 5% ABV beer is 5% ethanol by volume.</p>
      <p><strong>ABW (alcohol by weight)</strong> measures the same ethanol as a percentage of the
      drink's <em>weight</em> instead of its volume. Because ethanol is lighter than water — its
      density is about 0.789 that of water — the by-weight figure is always the smaller of the two.
      As a working conversion, ABV is roughly 1.25 times ABW. A 5% ABV beer is about 4% ABW. A
      handful of older US state rules and some legacy labels quote ABW, which is why the same beer
      can appear to have two different "percentages."</p>
      <p><strong>Proof</strong> is the historical tax measure, and it depends entirely on which
      country you are in. US proof is simply twice the ABV. British proof, before it was retired,
      ran at about 1.75 times the ABV.</p>

      <div class="formula-table-wrap">
        <table>
          <thead>
            <tr><th scope="col">Measure</th><th scope="col">What it expresses</th><th scope="col">A 40% ABV spirit reads as…</th></tr>
          </thead>
          <tbody>
            <tr><td>ABV</td><td>Ethanol as % of total <strong>volume</strong></td><td>40% ABV</td></tr>
            <tr><td>ABW</td><td>Ethanol as % of total <strong>weight</strong></td><td>~32% ABW</td></tr>
            <tr><td>US proof</td><td>2 × ABV</td><td>80 proof</td></tr>
            <tr><td>UK proof (historic, pre-1980)</td><td>~1.75 × ABV</td><td>~70° proof</td></tr>
          </tbody>
        </table>
      </div>

      <p>The takeaway: if a figure looks surprisingly high or low, check which scale it is using
      before assuming the drink is unusually strong or weak.</p>

      <h2>ABV and a "standard drink"</h2>
      <p>ABV tells you a drink's concentration, but not how much alcohol you actually consume —
      that depends on the serving size too. A small measure of a strong spirit and a large glass of
      wine can deliver the same dose. To make drinks comparable, health bodies define a fixed
      reference amount of pure alcohol.</p>
      <p>In the United States, the National Institute on Alcohol Abuse and Alcoholism defines one
      <strong>standard drink</strong> as any serving containing about 14 grams (0.6 fl oz) of pure
      alcohol. By that definition, a 12 oz beer at 5% ABV, a 5 oz glass of wine at 12% ABV, and a
      1.5 oz measure of 40% ABV spirits each count as one standard drink — despite looking nothing
      alike.</p>
      <p>In the United Kingdom, the NHS uses a smaller reference: one <strong>unit</strong> equals
      10 ml (8 g) of pure alcohol. It is easy to calculate directly from ABV — multiply the drink's
      volume in millilitres by its ABV, then divide by 1,000 — which is a neat illustration of ABV
      doing real work outside the brewery.</p>
      <p>These figures are simply units of measurement, offered here for context rather than as
      guidance; for personal advice, the linked health sources below are the place to look. The
      point for our purposes is that the same ABV number printed on a label feeds directly into how
      public-health bodies help people keep track.</p>

      <h2>The number behind the number</h2>
      <p>ABV looks like a plain percentage, but behind it sits three centuries of gunpowder, brass
      hydrometers, tax law and fermentation chemistry — and a formula that, for all its usefulness,
      is an approximation with known limits. Understanding that makes you a better brewer and a
      sharper reader of labels: you know why a big beer's true strength runs a shade higher than the
      quick sum suggests, why "proof" means different things in different countries, and why the
      density of a liquid can reveal something as intangible as how strong it is.</p>
      <p>When you next want the figure for your own batch, the
      <a href="/everyday/abv-calculator/">ABV calculator</a> does the standard calculation for you —
      and now you know exactly what that number represents.</p>

      <h2>Sources and further reading</h2>
      <ul>
        <li><strong>Alcohol and Tobacco Tax and Trade Bureau (TTB)</strong> — US proof and alcohol-content labelling rules: <a href="https://www.ttb.gov/regulated-commodities/beverage-alcohol/distilled-spirits/ds-labeling-home/ds-alcohol-content" target="_blank" rel="noopener">ttb.gov</a></li>
        <li><strong>F. G. H. Tate (1931)</strong>, "Bartholomew Sikes's System of Alcoholometry," <em>Nature</em>, 127(3202): 398–399: <a href="https://www.nature.com/articles/127398a0" target="_blank" rel="noopener">nature.com</a></li>
        <li><strong>National Institute on Alcohol Abuse and Alcoholism (NIAAA)</strong> — defining a standard drink: <a href="https://www.niaaa.nih.gov/health-professionals-communities/core-resource-on-alcohol/basics-defining-how-much-alcohol-too-much" target="_blank" rel="noopener">niaaa.nih.gov</a></li>
        <li><strong>NHS</strong> — calculating alcohol units: <a href="https://www.nhs.uk/live-well/alcohol-advice/calculating-alcohol-units/" target="_blank" rel="noopener">nhs.uk</a></li>
        <li><strong>Hall, M. J. (1995)</strong>, "Brew by the Numbers — Add Up What's in Your Beer," <em>Zymurgy</em>, Vol. 18, No. 2, American Homebrewers Association — source of the more accurate high-gravity ABV formula.</li>
      </ul>
    `,
    faqs: [],
    relatedTool: 'abv-calculator',
    relatedGuides: [],
    datePublished: '2026-08-14', // per git history: guides.ts (this guide) first added 2026-08-14
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
