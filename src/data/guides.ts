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
      'UUID v4 is fully random; UUID v7 embeds a sortable timestamp. Compare how each is generated, their database indexing trade-offs, and when to pick one over the other.',
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
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
