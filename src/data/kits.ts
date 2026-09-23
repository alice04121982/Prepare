/**
 * Ready-made kits: preset households, rendered as their own static pages.
 *
 * The planner at /build-your-kit is the tool; these are the landing pages.
 * Same engine, `buildKit`, so a kit page can never drift from the planner.
 * The difference is that these have a URL worth sharing and indexing, where
 * the planner's state lives in a query string.
 *
 * Each preset is a real household shape someone searches for, per
 * docs/monetisation-plan.md, which names these as the pages people look for
 * and share.
 */
import type { Household, KitLine } from "./kit-rules";

export type Kit = {
  slug: string;
  /** Page heading and card title. */
  title: string;
  /** One sentence: who this is for. Used as the meta description too. */
  who: string;
  /** What this household needs that a default one does not. */
  different: string;
  household: Household;
};

const base = {
  adults: 2,
  children: 0,
  babies: 0,
  over65: 0,
  dogs: 0,
  cats: 0,
  medicalNeeds: false,
  homeType: "house" as const,
  days: 3 as const,
};

export const kits: Kit[] = [
  {
    slug: "one-person-three-days",
    title: "Three days for one person",
    who: "One adult, living alone, covering the three days the government asks every household to manage.",
    different:
      "The smallest complete kit there is. Nine litres of water, a few tins, a torch and a power bank. It fits in one box.",
    household: { ...base, adults: 1 },
  },
  {
    slug: "family-of-four-one-week",
    title: "A family of four for a week",
    who: "Two adults and two children at home for seven days, the length most storms and outages run to.",
    different:
      "Four people for a week is 84 litres of water, which is the figure that surprises people. Plan where it goes before you buy it.",
    household: { ...base, adults: 2, children: 2, days: 7 },
  },
  {
    slug: "one-bed-flat",
    title: "Three days in a one-bed flat",
    who: "A couple in a flat, where storage is the constraint and the lift stops when the power does.",
    different:
      "Everything here is sized to fit under a bed or in the bottom of a wardrobe. The kit adds a task the houses do not have: know the stairs, and plan for carrying water up them.",
    household: { ...base, adults: 2, homeType: "flat" },
  },
  {
    slug: "older-relative-living-alone",
    title: "An older relative living alone",
    who: "One person over 65, on regular prescriptions, who you want covered for a week without having to drive over.",
    different:
      "Medication buffer and a paper contact sheet matter more here than anything else. The kit also prompts the Priority Services Register, which is free and means the utilities know to check on them.",
    household: { ...base, adults: 1, over65: 1, medicalNeeds: true, days: 7 },
  },
  {
    slug: "with-a-baby",
    title: "A household with a baby",
    who: "Two adults and one child under three, where formula, nappies and wipes cannot wait for the shops to reopen.",
    different:
      "Babies need sterile water for feeds, so the water figure goes up and bottled is the sensible form. Nappies and wipes are the lines people forget until the second day.",
    household: { ...base, adults: 2, babies: 1 },
  },
  {
    slug: "with-a-dog",
    title: "A household with a dog",
    who: "Two adults and a dog, whose food and water are as easy to forget as they are to buy in advance.",
    different:
      "A dog drinks more than people expect, and the usual food is the only food a stressed animal will take. Both are on the list.",
    household: { ...base, adults: 2, dogs: 1 },
  },
];

export function kitBySlug(slug: string): Kit | undefined {
  return kits.find((k) => k.slug === slug);
}

/** The planner URL that opens this kit for editing. */
export function plannerHref(h: Household): string {
  const q = new URLSearchParams({
    a: String(h.adults),
    c: String(h.children),
    b: String(h.babies),
    e: String(h.over65),
    dogs: String(h.dogs),
    cats: String(h.cats),
    med: h.medicalNeeds ? "1" : "0",
    home: h.homeType,
    d: String(h.days),
  });
  return `/build-your-kit?${q.toString()}`;
}

export function peopleIn(h: Household): number {
  return h.adults + h.children + h.babies;
}

/**
 * Parse a price band like "£15 to £25" into its ends. Bands are used rather
 * than prices because the Amazon Associates terms forbid quoting a price
 * that can go stale (docs/monetisation-plan.md).
 */
export function parseBand(band: string): { low: number; high: number } | null {
  const range = band.match(/£\s*([\d.]+)\s*to\s*£\s*([\d.]+)/i);
  if (range) return { low: Number(range[1]), high: Number(range[2]) };
  const single = band.match(/£\s*([\d.]+)/);
  if (single) return { low: Number(single[1]), high: Number(single[1]) };
  return null;
}

export type Estimate = { low: number; high: number; priced: number; total: number };

/**
 * A cost estimate over the lines that have a priced product. Most lines are
 * groceries with no product attached, so the count of priced lines is
 * reported alongside the figure and the page says what it leaves out.
 */
export function estimate(lines: KitLine[], productFor: (id: string) => { priceBand: string; unitsPerProduct?: number } | undefined): Estimate {
  let low = 0;
  let high = 0;
  let priced = 0;

  for (const line of lines) {
    const product = productFor(line.id);
    if (!product) continue;
    const band = parseBand(product.priceBand);
    if (!band) continue;
    const qty = Math.max(1, Math.ceil(line.quantity / (product.unitsPerProduct ?? 1)));
    low += band.low * qty;
    high += band.high * qty;
    priced += 1;
  }

  return { low: Math.round(low), high: Math.round(high), priced, total: lines.length };
}
