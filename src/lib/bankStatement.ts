// Client-side, text-based PDF bank statement parser. Runs entirely in the
// browser via pdf.js — no file is ever uploaded to a server (this site has
// no backend to upload to; it's a static build).
//
// This is a heuristic line-based parser, not a bank-specific integration.
// Statement layouts vary enormously (column order, date formats, whether
// debit/credit share one signed column or two separate ones), so results
// are a best-effort starting point that the user reviews and corrects in
// an editable table before exporting — never presented as guaranteed-accurate.

export interface Transaction {
  date: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
}

export const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20MB

export class PasswordProtectedError extends Error {}
export class NoTextFoundError extends Error {}

const DATE_PATTERNS = [
  /\b\d{1,2}[/.\-]\d{1,2}[/.\-]\d{2,4}\b/, // 12/04/2026, 12-04-26, 12.04.2026
  /\b\d{4}-\d{1,2}-\d{1,2}\b/, // 2026-04-12 (ISO)
  /\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4}\b/i, // 12 Apr 2026
  /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{2,4}\b/i, // Apr 12, 2026
];

// Currency-ish number tokens: optional symbol/sign, thousands separators,
// optional decimals, optional trailing minus or parentheses for negatives.
const MONEY_PATTERN = /\(?-?[$£€]?\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})?\)?-?/g;

// Requires a decimal cents portion or a thousands separator, so page
// numbers, account digits, and other bare integers on the line aren't
// mistaken for amounts.
function looksLikeMoney(token: string): boolean {
  const t = token.trim();
  const hasCents = /\d\.\d{2}\)?-?$/.test(t);
  const hasThousandsSeparator = /,\d{3}/.test(t);
  return hasCents || hasThousandsSeparator;
}

function isNegativeMoney(token: string): boolean {
  return token.includes('(') || token.trim().endsWith('-') || token.trim().startsWith('-');
}

function cleanMoney(token: string): string {
  const negative = isNegativeMoney(token);
  const digits = token.replace(/[^\d.]/g, '');
  if (!digits) return '';
  return negative ? `-${digits}` : digits;
}

function findDate(line: string): { match: string; index: number } | null {
  for (const pattern of DATE_PATTERNS) {
    const m = pattern.exec(line);
    if (m) return { match: m[0], index: m.index };
  }
  return null;
}

/**
 * Reconstructs readable lines from a pdf.js text-content item list by
 * grouping items whose baseline (y) is within a small tolerance, then
 * ordering left-to-right. Large horizontal gaps get an extra space so
 * column boundaries survive as whitespace, which the row parser below
 * relies on to separate description text from trailing amount columns.
 */
export function itemsToLines(items: { str: string; transform: number[] }[]): string[] {
  const rows: { y: number; parts: { x: number; str: string }[] }[] = [];
  const Y_TOLERANCE = 3;

  for (const item of items) {
    if (!item.str.trim()) continue;
    const x = item.transform[4];
    const y = item.transform[5];
    let row = rows.find((r) => Math.abs(r.y - y) <= Y_TOLERANCE);
    if (!row) {
      row = { y, parts: [] };
      rows.push(row);
    }
    row.parts.push({ x, str: item.str });
  }

  rows.sort((a, b) => b.y - a.y); // top of page first (PDF y grows upward)

  return rows.map((row) => {
    row.parts.sort((a, b) => a.x - b.x);
    let line = '';
    let lastEnd: number | null = null;
    for (const part of row.parts) {
      if (lastEnd !== null) {
        const gap = part.x - lastEnd;
        line += gap > 8 ? '   ' : gap > 2 ? ' ' : '';
      }
      line += part.str;
      lastEnd = part.x + part.str.length * 4.5; // rough width estimate
    }
    return line.trim();
  });
}

/** Parses reconstructed lines into candidate transaction rows. */
export function linesToTransactions(lines: string[]): Transaction[] {
  const results: Transaction[] = [];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+/g, ' ').trim();
    if (!line) continue;

    const dateHit = findDate(line);
    if (!dateHit) continue;

    const moneyTokens = (line.match(MONEY_PATTERN) || []).map((t) => t.trim()).filter(looksLikeMoney);
    if (moneyTokens.length === 0) continue;

    let description = line.slice(dateHit.index + dateHit.match.length);
    for (const token of moneyTokens) {
      description = description.replace(token, ' ');
    }
    description = description.replace(/\s+/g, ' ').trim().replace(/^[-–,:\s]+|[-–,:\s]+$/g, '');

    const amounts = moneyTokens.map(cleanMoney).filter(Boolean);
    let debit = '';
    let credit = '';
    let balance = '';

    if (amounts.length === 1) {
      balance = amounts[0];
    } else if (amounts.length === 2) {
      const [amount, bal] = amounts;
      balance = bal;
      if (amount.startsWith('-')) debit = amount.slice(1);
      else credit = amount;
    } else {
      // 3+ amounts: assume [debit, credit, ...extra, balance] in reading
      // order — the most common layout for statements with separate
      // debit/credit columns. Extra tokens beyond these three are dropped;
      // the row is flagged for review via the editable table either way.
      const bal = amounts[amounts.length - 1];
      const first = amounts[0];
      const second = amounts.length > 2 ? amounts[1] : '';
      balance = bal;
      if (first.startsWith('-')) debit = first.slice(1);
      else credit = first;
      if (second) {
        if (second.startsWith('-')) debit = debit || second.slice(1);
        else credit = credit || second;
      }
    }

    results.push({ date: dateHit.match, description: description || '(no description found)', debit, credit, balance });
  }

  return results;
}

// Every field here is user-editable text (dates and descriptions are pasted
// straight through from PDF text; debit/credit/balance can be typed freely
// too), so any of them can end up starting with =, +, -, or @ — which
// Excel/Sheets/Numbers treat as the start of a formula on CSV import (CSV
// formula injection, CWE-1236). Prefixing such a value with a single quote
// neutralizes it (Excel's own documented mitigation: a leading `'` forces
// "treat as text") while keeping the visible value unchanged.
const CSV_FORMULA_TRIGGER = /^[=+\-@\t\r]/;

function sanitizeCsvField(v: string): string {
  return CSV_FORMULA_TRIGGER.test(v) ? `'${v}` : v;
}

export function transactionsToCsv(rows: Transaction[]): string {
  const header = ['Date', 'Description', 'Debit', 'Credit', 'Balance'];
  const escape = (raw: string) => {
    const v = sanitizeCsvField(raw);
    if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
    return v;
  };
  const lines = [header.join(',')];
  for (const row of rows) {
    lines.push([row.date, row.description, row.debit, row.credit, row.balance].map(escape).join(','));
  }
  return lines.join('\r\n');
}

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  { date: '01/03/2026', description: 'Opening balance', debit: '', credit: '', balance: '1250.00' },
  { date: '03/03/2026', description: 'GROCERY STORE PURCHASE', debit: '48.32', credit: '', balance: '1201.68' },
  { date: '05/03/2026', description: 'SALARY PAYMENT', debit: '', credit: '2100.00', balance: '3301.68' },
  { date: '08/03/2026', description: 'ELECTRIC UTILITY CO', debit: '76.10', credit: '', balance: '3225.58' },
  { date: '15/03/2026', description: 'ATM WITHDRAWAL', debit: '100.00', credit: '', balance: '3125.58' },
];
