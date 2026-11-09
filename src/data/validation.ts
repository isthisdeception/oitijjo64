import { DISTRICTS_SEED, DIVISIONS } from './districts';
import { DivisionBn } from '../types';

export interface ValidationReport {
  isValid: boolean;
  totalDistricts: number;
  errors: string[];
  divisionCounts: Record<DivisionBn, number>;
}

export function validateDistrictsDataset(): ValidationReport {
  const errors: string[] = [];
  const total = DISTRICTS_SEED.length;

  if (total !== 64) {
    errors.push(`মোট জেলার সংখ্যা ৬৪ হওয়া আবশ্যক, পাওয়া গেছে: ${total}`);
  }

  // Check unique IDs
  const idSet = new Set<string>();
  for (const d of DISTRICTS_SEED) {
    if (idSet.has(d.id)) {
      errors.push(`ডুপ্লিকেট জেলা আইডি পাওয়া গেছে: ${d.id}`);
    }
    idSet.add(d.id);
  }

  // Check unique Slugs
  const slugSet = new Set<string>();
  for (const d of DISTRICTS_SEED) {
    if (slugSet.has(d.slug)) {
      errors.push(`ডুপ্লিকেট জেলা স্ল্যাগ পাওয়া গেছে: ${d.slug}`);
    }
    slugSet.add(d.slug);
  }

  // Count by Division
  const divisionCounts: Record<DivisionBn, number> = {
    'ঢাকা': 0,
    'চট্টগ্রাম': 0,
    'খুলনা': 0,
    'রাজশাহী': 0,
    'রংপুর': 0,
    'সিলেট': 0,
    'বরিশাল': 0,
    'ময়মনসিংহ': 0,
  };

  for (const d of DISTRICTS_SEED) {
    if (d.divisionBn in divisionCounts) {
      divisionCounts[d.divisionBn]++;
    } else {
      errors.push(`অজানা বিভাগ পাওয়া গেছে: ${d.divisionBn} (জেলা: ${d.nameBn})`);
    }
  }

  // Check division counts against specification
  for (const div of DIVISIONS) {
    const actual = divisionCounts[div.nameBn];
    if (actual !== div.count) {
      errors.push(
        `${div.nameBn} বিভাগে জেলা হওয়ার কথা ${div.count}টি, পাওয়া গেছে ${actual}টি`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    totalDistricts: total,
    errors,
    divisionCounts,
  };
}

// Development check: auto-validate in development
if (process.env.NODE_ENV !== 'production') {
  const report = validateDistrictsDataset();
  if (!report.isValid) {
    console.error('District Dataset Validation Errors:', report.errors);
  }
}

