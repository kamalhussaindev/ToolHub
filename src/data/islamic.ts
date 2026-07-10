export const NISAB_GOLD_GRAMS = 85; // widely cited; some institutions use 87.48
export const NISAB_SILVER_GRAMS = 595; // widely cited; some use 612.36
export const ZAKAT_RATE = 0.025; // 2.5% = 1/40
export const TOLA_IN_GRAMS = 11.664; // for South Asian users

export const KARAT_PURITY: Record<number, number> = {
  24: 1,
  22: 22 / 24,
  21: 21 / 24,
  18: 18 / 24,
};

// Shared across the Islamic cluster's DisclaimerNote instances so every
// tool/guide reviewed in the same content pass shows the same date.
export const ISLAMIC_LAST_REVIEWED = '2026-07-11';
