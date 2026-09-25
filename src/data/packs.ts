import { buildKit, defaultHousehold, type Household, type KitLine } from "@/data/kit-rules";
import { productsFor, type Product, type Tier } from "@/data/products";

/**
 * Complete packs: everything on the planner's list for a household and a
 * length of time, in one Amazon basket. The home page and /kits both price
 * and fill their baskets here, so a length costs the same on either page.
 *
 * A pack never leaves things out to hit a price. The price is what the
 * household's list costs, estimated from the middle of each product's price
 * band (Amazon forbids quoting live prices that can go stale, so the page
 * says "about").
 *
 * Drinking water is bottled for the first week only. A month of bottled
 * water for four is about 340 litres, far more than a home can store, and
 * water cuts rarely last beyond days. After the first week the household
 * relies on the planner's containers, filled from the tap, with the one
 * pack of tablets (or boiling) for any other water.
 */
export const DURATIONS = [
  { days: 3, label: "3 days", note: "the government's advice" },
  { days: 14, label: "2 weeks" },
  { days: 30, label: "1 month" },
  { days: 90, label: "3 months" },
] as const;

export const BOTTLED_DAYS = 7;

/**
 * Lines bought once and kept, as opposed to food, water and supplies that
 * are used up. Most of a pack's price is this kit, and many homes already
 * own some of it, so the page shows the two figures apart.
 */
const KIT_ONCE = new Set(["torch", "lantern", "powerbank", "radio", "firstaid", "tin-opener", "water-extra", "purify"]);

export type PackBuy = { line: KitLine; product: Product; quantity: number; cost: number };

export type Pack = {
  people: number;
  days: number;
  buys: PackBuy[];
  /** Estimated total in pounds, rounded to the nearest pound. */
  estimate: number;
  /** The part of the estimate that is kit bought once (torches, radio). */
  kitOnce: number;
  /** The part that is food, water and supplies. */
  supplies: number;
  /** Lines still needed that the basket cannot hold: prescriptions, cash, things with no product yet. */
  elsewhere: KitLine[];
  /** Litres of bottled drinking water in the pack. */
  bottledLitres: number;
};

/** "£15 to £25" gives 20; "£1 to £2" gives 1.5. */
export function midPrice(band: string): number {
  const nums = [...band.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

/**
 * How many of `product` cover `line`. Most lines count units directly. The
 * no-cook line counts days, so it is multiplied by the people eating.
 */
function packUnits(line: KitLine, product: Product, people: number): number {
  const units = line.id === "nocook" ? line.quantity * people : line.quantity;
  // Rounded before ceil so a fractional pack size (8 / 9) cannot tip an
  // exact fit up by one through floating point error.
  const exact = (units * (product.share ?? 1)) / (product.unitsPerProduct ?? 1);
  return Math.max(1, Math.ceil(Math.round(exact * 1e6) / 1e6));
}

/**
 * The products that cover a set of planner lines, in one price tier. A line
 * split across products (share) buys each part; otherwise the first product
 * is the buy.
 */
export function buysFor(lines: KitLine[], people: number, tier: Tier = "regular"): PackBuy[] {
  return lines.flatMap((line) => {
    const options = productsFor(line.id, tier);
    const shared = options.filter((p) => p.share);
    const chosen = shared.length ? shared : options.slice(0, 1);
    return chosen.map((product) => {
      const quantity = packUnits(line, product, people);
      return { line, product, quantity, cost: quantity * midPrice(product.priceBand) };
    });
  });
}

/**
 * The pack for a whole household, leaving out anything the reader has
 * already ticked (`owned` returns true for a line id they have).
 */
export function packFor(
  household: Household,
  owned: (lineId: string) => boolean = () => false,
  tier: Tier = "regular",
): Pack {
  const { lines } = buildKit(household);
  // Worked out without the list, whose range would pull 7 days back up to its minimum.
  const bottled =
    household.days > BOTTLED_DAYS
      ? buildKit({ ...household, list: undefined, days: BOTTLED_DAYS }).lines.find((l) => l.id === "water")
      : undefined;
  const adjusted = lines.map((line) => (line.id === "water" && bottled ? bottled : line));
  const needed = adjusted.filter((l) => !owned(l.id));
  // Babies do not change pack sizes; the basket counts adults and children.
  const people = household.adults + household.children;
  const buys = buysFor(needed, people, tier);
  const bought = new Set(buys.map((b) => b.line.id));
  const waterBuy = buys.find((b) => b.line.id === "water");

  return {
    people,
    days: household.days,
    buys,
    ...packTotals(buys),
    elsewhere: needed.filter((l) => !bought.has(l.id)),
    // A planner unit of water is a six-pack of 1.5 litres: 9 litres.
    bottledLitres: waterBuy ? Math.round(waterBuy.quantity * (waterBuy.product.unitsPerProduct ?? 1) * 9) : 0,
  };
}

/** The pack for `people` adults over `days`, as the home page asks for it. */
export function buildPack(
  people: number,
  days: number,
  owned: (lineId: string) => boolean = () => false,
  tier: Tier = "regular",
): Pack {
  return packFor({ ...defaultHousehold, adults: Math.max(1, people), days }, owned, tier);
}

/** The estimate and its two parts, for any set of buys: all of a pack, or what the reader has left ticked. */
export function packTotals(buys: PackBuy[]): Pick<Pack, "estimate" | "kitOnce" | "supplies"> {
  const sum = (list: PackBuy[]) => Math.round(list.reduce((total, b) => total + b.cost, 0));
  return {
    estimate: sum(buys),
    kitOnce: sum(buys.filter((b) => KIT_ONCE.has(b.line.id))),
    supplies: sum(buys.filter((b) => !KIT_ONCE.has(b.line.id))),
  };
}
