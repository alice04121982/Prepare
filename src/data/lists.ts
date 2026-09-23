/**
 * The four ready-made lists (docs/ready-made-lists.md).
 *
 * A list sets how many days the planner covers, or, for the grab bag, swaps
 * the home list for a bag you can carry. The household still says who lives
 * there; the list says what for. The engine is in src/data/kit-rules.ts.
 */

export type ListSlug = "72-hours" | "two-weeks-to-a-month" | "three-months" | "grab-bag";

export type DayRule =
  /** One length only; the planner shows it as fixed text. */
  | { kind: "fixed"; days: number }
  /** A range the reader can move within, starting at `default`. */
  | { kind: "range"; min: number; max: number; default: number }
  /** No days control at all. `days` is what the bag is packed for. */
  | { kind: "none"; days: number };

export type ReadyList = {
  slug: ListSlug;
  /** Lowercase display title. */
  title: string;
  /** One or two plain sentences on what the list covers. */
  description: string;
  /** One line naming what it is for. */
  reasons: string;
  days: DayRule;
  /** Position on any page that shows the four together, from 1. */
  order: number;
};

const all: ReadyList[] = [
  {
    slug: "72-hours",
    title: "72 hours",
    description:
      "The government minimum. Light, heat, water and food that needs no cooking, for 3 days at home.",
    reasons: "A power cut or water outage.",
    days: { kind: "fixed", days: 3 },
    order: 1,
  },
  {
    slug: "two-weeks-to-a-month",
    title: "2 weeks to a month",
    description:
      "Everything in 72 hours, scaled up, plus a way to cook without power and more power for phones and a router.",
    reasons: "Shortages, storms and long outages.",
    days: { kind: "range", min: 7, max: 30, default: 14 },
    order: 2,
  },
  {
    slug: "three-months",
    title: "3 months",
    description:
      "A pantry built on bulk staples, a filter for long-term water, and food you rotate through as you eat it.",
    reasons: "Losing income, war in Europe, climate disruption or a longer crisis.",
    days: { kind: "range", min: 31, max: 90, default: 90 },
    order: 3,
  },
  {
    slug: "grab-bag",
    title: "grab bag",
    description:
      "One bag per person, packed for 3 days, kept by the door in case you are asked to leave home quickly.",
    reasons: "Being asked to leave home quickly, for example in a flood.",
    days: { kind: "none", days: 3 },
    order: 4,
  },
];

export const lists: ReadyList[] = [...all].sort((a, b) => a.order - b.order);

const slugs = new Set<string>(lists.map((l) => l.slug));

export function isListSlug(value: unknown): value is ListSlug {
  return typeof value === "string" && slugs.has(value);
}

export function listBySlug(slug: ListSlug): ReadyList;
export function listBySlug(slug: string | undefined | null): ReadyList | undefined;
export function listBySlug(slug: string | undefined | null): ReadyList | undefined {
  return lists.find((l) => l.slug === slug);
}

/** The days a list starts at. */
export function defaultDaysFor(slug: ListSlug): number {
  const rule = listBySlug(slug).days;
  return rule.kind === "range" ? rule.default : rule.days;
}

/** The lowest and highest days a list allows. Fixed and bagged lists have one value. */
export function daysRangeFor(slug: ListSlug): { min: number; max: number } {
  const rule = listBySlug(slug).days;
  return rule.kind === "range" ? { min: rule.min, max: rule.max } : { min: rule.days, max: rule.days };
}

/** Days clamped to a list's range, rounded to a whole day. */
export function clampDaysForList(slug: ListSlug, n: number): number {
  const { min, max } = daysRangeFor(slug);
  if (!Number.isFinite(n)) return defaultDaysFor(slug);
  return Math.max(min, Math.min(max, Math.round(n)));
}
