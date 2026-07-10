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
  lastReviewed?: string; // ISO date; renders a DisclaimerNote when present (YMYL content)
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
    relatedGuides: [],
    lastReviewed: '2026-07-11',
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
