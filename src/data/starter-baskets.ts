import { buildKit, defaultHousehold, type KitLine } from "@/data/kit-rules";
import { productsFor, type Product } from "@/data/products";

/**
 * Ready-made Amazon baskets for the homepage, one per budget.
 *
 * Each basket is the planner's own list for the household, cut to what fits
 * the budget. It fills in two passes, both in the order below, which puts the
 * planner's "get these first" items ahead of the rest: one of each thing
 * first, then the full quantity for everyone in the household.
 *
 * Costs are estimates from the middle of each product's price band. Amazon
 * forbids quoting live prices that can go stale, so the page says "about".
 */
export const BUDGETS = [20, 50, 100, 200] as const;
export type Budget = (typeof BUDGETS)[number];

/** Planner line ids, most useful first. Only lines with a product can go in. */
const ORDER = [
  "torch",
  "batteries",
  "radio",
  "firstaid",
  "powerbank",
  "tin-opener",
  "purify",
  "gel",
  "water-extra",
  "lantern",
  "masks",
];

/** Short names for the basket summary, in the site's lowercase voice. */
export const SHORT_NAME: Record<string, [one: string, many: string]> = {
  torch: ["head torch", "head torches"],
  batteries: ["pack of 24 AA batteries", "packs of 24 AA batteries"],
  radio: ["wind-up radio", "wind-up radios"],
  firstaid: ["first aid kit", "first aid kits"],
  powerbank: ["power bank", "power banks"],
  "tin-opener": ["tin opener", "tin openers"],
  purify: ["pack of purification tablets", "packs of purification tablets"],
  gel: ["hand gel", "hand gels"],
  "water-extra": ["water container (10 litres)", "water containers (10 litres)"],
  lantern: ["lantern", "lanterns"],
  masks: ["box of 20 masks", "boxes of 20 masks"],
};

export type BasketPick = { line: KitLine; product: Product; quantity: number; cost: number };

export type StarterBasket = {
  budget: Budget;
  picks: BasketPick[];
  /** Estimated total in pounds, rounded to the nearest pound. */
  estimate: number;
  /** Lines the household still needs that did not fit this budget. */
  leftOut: number;
  /** The same lines in words: "2 lanterns", "3 more head torches". */
  missing: string[];
};

/** "£15 to £25" gives 20; "£1 to £2" gives 1.5. */
export function midPrice(band: string): number {
  const nums = [...band.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

/**
 * The basket for `people` over three days, leaving out anything the reader
 * has already ticked (`owned` returns true for a line id they have).
 */
export function starterBasket(people: number, budget: Budget, owned: (lineId: string) => boolean = () => false): StarterBasket {
  const { lines } = buildKit({ ...defaultHousehold, adults: Math.max(1, people), days: 3 });
  const byId = new Map(lines.map((l) => [l.id, l]));
  const wanted = ORDER.flatMap((id) => {
    const line = byId.get(id);
    const product = productsFor(id)[0];
    if (!line || !product || owned(id)) return [];
    const needed = Math.max(1, Math.ceil(line.quantity / (product.unitsPerProduct ?? 1)));
    return [{ line, product, needed, unit: midPrice(product.priceBand), quantity: 0 }];
  });
  let spent = 0;
  const take = (w: (typeof wanted)[number], upTo: number) => {
    const affordable = w.unit > 0 ? Math.floor((budget - spent) / w.unit) : 0;
    const extra = Math.max(0, Math.min(upTo - w.quantity, affordable));
    w.quantity += extra;
    spent += extra * w.unit;
  };
  // One of everything first, so a big household gets a radio before a fifth torch.
  for (const w of wanted) take(w, 1);
  // Then the full quantity for each person, in the same order.
  for (const w of wanted) take(w, w.needed);

  const picks: BasketPick[] = wanted
    .filter((w) => w.quantity > 0)
    .map((w) => ({ line: w.line, product: w.product, quantity: w.quantity, cost: w.quantity * w.unit }));
  const short = wanted.filter((w) => w.quantity < w.needed);
  const missing = short.map((w) => {
    const n = w.needed - w.quantity;
    const [one, many] = SHORT_NAME[w.line.id] ?? [w.product.name, w.product.name];
    return `${n} ${w.quantity ? "more " : ""}${n === 1 ? one : many}`;
  });

  return { budget, picks, estimate: Math.round(spent), leftOut: short.length, missing };
}

export function pickLabel(p: BasketPick): string {
  const [one, many] = SHORT_NAME[p.line.id] ?? [p.product.name, p.product.name];
  return `${p.quantity} ${p.quantity === 1 ? one : many}`;
}
