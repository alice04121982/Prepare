/**
 * Specific products for the planner's "buy it" view, keyed by kit line id.
 *
 * Rules: docs/product-policy.md (how a product is chosen, verified and
 * rechecked) and docs/monetisation-plan.md. Every Amazon entry has an ASIN
 * found on an amazon.co.uk product page; `verified` flips to true only after
 * a person has opened the page and checked it against the policy, and
 * `checked` records that date. Unverified items still show and still go in
 * the one-click basket (policy decision A, 24 September 2026); verify them
 * rather than filter them.
 *
 * `image` is the id of the product's main photo on Amazon's image host.
 * It is not shown: the Associates agreement allows Amazon photos only
 * through the Product Advertising API or SiteStripe, so the site shows none.
 * `priceBand` is our own rough range, used for basket totals. It is never
 * shown next to an Amazon product, because the agreement allows Amazon
 * prices only when fetched live through that API.
 */
/**
 * Price tier. Products with no tier are "regular", the mid-range pick the
 * site shows today. Budget and premium alternatives (researched 25 September
 * 2026, all unverified) wait for the tier picker; see productsFor().
 */
export type Tier = "budget" | "regular" | "premium";

export type Product = {
  lineId: string;
  tier?: Exclude<Tier, "regular">;
  retailer: "amazon";
  name: string;
  asin: string;
  priceBand: string;
  /** Set true after opening the product page and checking it by hand. */
  verified: boolean;
  /** ISO date of the last hand check, for the 3-monthly review. Absent means never checked. */
  checked?: string;
  /** How many of this product cover one planner unit, e.g. a 24-pack covers 6 "packs of 4". */
  unitsPerProduct?: number;
  /**
   * Amazon image id, kept for reference only. The site does not show Amazon
   * photos: the Associates agreement allows them only through the Product
   * Advertising API or SiteStripe, never hotlinked from Amazon's image host.
   */
  image?: string;
  /**
   * Share of the line's quantity this product covers, when a line is split
   * across products (half the tins as beans, half as soup). Omitted means
   * the product is the line's only buy, or an alternative to it.
   */
  share?: number;
  /** Short name for basket summaries: one, many. */
  short?: [string, string];
};

export const products: Product[] = [
  { lineId: "powerbank", retailer: "amazon", name: "Anker 10,000 mAh power bank, USB-C", asin: "B0D4MDHB21", priceBand: "£15 to £25", verified: false, image: "61ucpwm6obL", short: ["power bank", "power banks"] },
  { lineId: "radio", retailer: "amazon", name: "iRonsnow wind-up and solar AM/FM radio with torch and USB charger", asin: "B0BHL1MQB2", priceBand: "£20 to £30", verified: false, image: "61Ls7RzrmBL", short: ["wind-up radio", "wind-up radios"] },
  { lineId: "masks", retailer: "amazon", name: "Omnitex FFP2 masks, box of 20, individually wrapped", asin: "B094PHG3KV", priceBand: "£8 to £14", verified: true, checked: "2026-09-25", unitsPerProduct: 2, image: "619wGwtKLfL", short: ["box of 20 masks", "boxes of 20 masks"] },
  { lineId: "firstaid", retailer: "amazon", name: "St John Ambulance Universal First Aid Kit", asin: "B008XI72FC", priceBand: "£12 to £20", verified: true, checked: "2026-09-25", image: "91-waJqLnFL", short: ["first aid kit", "first aid kits"] },
  { lineId: "torch", retailer: "amazon", name: "Energizer Universal Plus LED head torch, batteries included", asin: "B07Y8S3YVM", priceBand: "£8 to £14", verified: true, checked: "2026-09-25", image: "71bwAiRBJdL", short: ["head torch", "head torches"] },
  { lineId: "lantern", retailer: "amazon", name: "Energizer PRO rechargeable LED camping lantern", asin: "B0B6KVSDB4", priceBand: "£20 to £30", verified: false, image: "71oYJx2ckvL", short: ["lantern", "lanterns"] },
  { lineId: "water-extra", retailer: "amazon", name: "Trintion 12 litre camping water container with tap, BPA free", asin: "B08X727JL9", priceBand: "£14 to £18", verified: false, image: "61xVUBbIxrL", short: ["water container (12 litres)", "water containers (12 litres)"] },
  { lineId: "purify", retailer: "amazon", name: "Lifesystems chlorine dioxide purification tablets, treats 30 litres", asin: "B002VPP45S", priceBand: "£8 to £12", verified: false, image: "71n60YzjJxL", short: ["pack of purification tablets", "packs of purification tablets"] },
  { lineId: "gel", retailer: "amazon", name: "Carex Complete hand sanitiser gel, 50 ml pocket size", asin: "B08QNFN7VP", priceBand: "£1 to £2", verified: false, image: "61ZJmg0PToL", short: ["hand gel", "hand gels"] },

  // Long-life food, water and toilet roll, all sold in Amazon's main store so
  // they share one basket with everything above. Morrisons on Amazon and
  // Amazon Fresh keep separate baskets and cannot be filled by the link.
  // Mid-range on purpose: Amazon's own "by Amazon" and "Amazon Basics"
  // lines rather than the big brands. Found through search on 24 September
  // 2026; price bands are estimates until someone opens each page.
  { lineId: "tin-opener", retailer: "amazon", name: "Amazon Basics stainless steel manual tin opener", asin: "B087MSWH65", priceBand: "£5 to £8", verified: false, image: "71gyjjBo6OL", short: ["tin opener", "tin openers"] },
  { lineId: "batteries", retailer: "amazon", name: "Amazon Basics AA alkaline batteries, pack of 20", asin: "B00NTCH52W", priceBand: "£8 to £12", verified: false, unitsPerProduct: 5, short: ["pack of 20 AA batteries", "packs of 20 AA batteries"] },
  { lineId: "water", retailer: "amazon", name: "by Amazon still spring water, 4 x 2 litres", asin: "B0C7RR1F3V", priceBand: "£2 to £3", verified: false, unitsPerProduct: 8 / 9, image: "417xwONwKNL", short: ["four-pack of 2 litre water", "four-packs of 2 litre water"] },
  { lineId: "tins", retailer: "amazon", name: "by Amazon baked beans in tomato sauce, 6 x 420 g", asin: "B0DV9ZQP1R", priceBand: "£3 to £5", verified: false, unitsPerProduct: 6, share: 0.5, image: "61nelJzfPpL", short: ["pack of 6 tins of beans", "packs of 6 tins of beans"] },
  { lineId: "tins", retailer: "amazon", name: "by Amazon Italian chopped tomatoes, 12 x 400 g", asin: "B09L1H978W", priceBand: "£6 to £9", verified: false, unitsPerProduct: 12, share: 0.25, image: "716pcGifSFL", short: ["pack of 12 tins of tomatoes", "packs of 12 tins of tomatoes"] },
  { lineId: "tins", retailer: "amazon", name: "by Amazon skipjack tuna chunks in spring water, 4 x 145 g", asin: "B0CB1SHQPG", priceBand: "£2.50 to £3.50", verified: false, unitsPerProduct: 4, share: 0.25, image: "71dGvAxonLL", short: ["pack of 4 tins of tuna", "packs of 4 tins of tuna"] },
  { lineId: "carbs", retailer: "amazon", name: "by Amazon fusilli, 4 x 500 g", asin: "B0DSWKVGQZ", priceBand: "£2 to £4", verified: true, checked: "2026-09-25", unitsPerProduct: 4, image: "814Z3muQ4bL", short: ["pack of 4 bags of pasta", "packs of 4 bags of pasta"] },
  { lineId: "milk", retailer: "amazon", name: "by Amazon long-life skimmed milk, 6 x 1 litre", asin: "B0D81K6RMS", priceBand: "£5 to £7", verified: false, unitsPerProduct: 6, image: "61u71XtW40L", short: ["pack of 6 litres of long-life milk", "packs of 6 litres of long-life milk"] },
  { lineId: "oats", retailer: "amazon", name: "by Amazon original porridge oats, 1 kg", asin: "B0G595H3WB", priceBand: "£1 to £2", verified: true, checked: "2026-09-25", image: "71ZtxkvGIrL", short: ["bag of oats (1 kg)", "bags of oats (1 kg)"] },
  { lineId: "loo", retailer: "amazon", name: "Our Essentials by Amazon toilet tissue, 24 rolls", asin: "B0FH76MH6Y", priceBand: "£7 to £10", verified: false, unitsPerProduct: 24, image: "71mjO5SzE7L", short: ["pack of 24 toilet rolls", "packs of 24 toilet rolls"] },
  // The no-cook line counts days, not people: one box of 18 bars is two bars
  // a day for nine person-days. See packUnits() in packs.ts.
  { lineId: "nocook", retailer: "amazon", name: "Nature Valley Crunchy Oats and Honey bars, 18 x 42 g", asin: "B0077PQGLS", priceBand: "£6 to £9", verified: true, checked: "2026-09-25", unitsPerProduct: 9, image: "81OrxJuH0sL", short: ["box of 18 cereal bars", "boxes of 18 cereal bars"] },

  // Budget and premium alternatives, researched on amazon.co.uk on 25 September
  // 2026 (docs/product-tiers.md). Prices were shown in euros, so the bands are
  // converted and approximate. None is verified: check each by hand first.
  { lineId: "powerbank", tier: "budget", retailer: "amazon", name: "Belkin BoostCharge 10,000 mAh power bank with built-in USB-C cable", asin: "B0DJFGSSST", priceBand: "£12 to £18", verified: false, image: "51+NqINcGuL", short: ["power bank", "power banks"] },
  { lineId: "powerbank", tier: "premium", retailer: "amazon", name: "Anker Zolo 20,000 mAh 30W power bank with built-in USB-C", asin: "B0CZ9LH53B", priceBand: "£25 to £35", verified: false, image: "61QdifaoqpL", short: ["power bank", "power banks"] },
  { lineId: "radio", tier: "budget", retailer: "amazon", name: "NNOOAADIO wind-up and solar AM/FM radio, 2000 mAh", asin: "B08JCFCX5J", priceBand: "£18 to £25", verified: false, image: "71xUwcvqBFL", short: ["wind-up radio", "wind-up radios"] },
  { lineId: "radio", tier: "premium", retailer: "amazon", name: "Mesqool wind-up and solar DAB radio, 5000 mAh, with USB charger and torch", asin: "B09M9LSQ6Y", priceBand: "£30 to £40", verified: false, image: "71mqUMtdXfL", short: ["wind-up DAB radio", "wind-up DAB radios"] },
  { lineId: "masks", tier: "premium", retailer: "amazon", name: "FFP3 masks, pack of 10", asin: "B09J92GRXR", priceBand: "£10 to £14", verified: false, image: "615Fjq3y6UL", unitsPerProduct: 1, short: ["pack of 10 FFP3 masks", "packs of 10 FFP3 masks"] },
  { lineId: "firstaid", tier: "budget", retailer: "amazon", name: "Lewis-Plast first aid kit for home, car and workplace", asin: "B07FRPXF44", priceBand: "£7 to £12", verified: false, image: "61mSrFlJh8L", short: ["first aid kit", "first aid kits"] },
  { lineId: "firstaid", tier: "premium", retailer: "amazon", name: "St John Ambulance workplace first aid kit, large", asin: "B005JRULOY", priceBand: "£30 to £45", verified: false, image: "51KzTc1bEuL", short: ["first aid kit", "first aid kits"] },
  { lineId: "torch", tier: "budget", retailer: "amazon", name: "Amazon Basics LED head torch, 2 pack, batteries included", asin: "B0DYSWT59X", priceBand: "£8 to £12", verified: false, image: "71HFpCDo-ML", unitsPerProduct: 2, short: ["2-pack of head torches", "2-packs of head torches"] },
  { lineId: "torch", tier: "premium", retailer: "amazon", name: "Ledlenser H8R rechargeable LED head torch, 600 lumens", asin: "B077N8MZWW", priceBand: "£60 to £80", verified: false, image: "71nqnOoXR9L", short: ["head torch", "head torches"] },
  { lineId: "lantern", tier: "premium", retailer: "amazon", name: "Ledlenser ML4 rechargeable LED lantern, 300 lumens", asin: "B07Y421Y1S", priceBand: "£38 to £50", verified: false, image: "71d9J210-2L", short: ["lantern", "lanterns"] },
  { lineId: "purify", tier: "premium", retailer: "amazon", name: "Katadyn Micropur Forte purification tablets, 50 tablets", asin: "B0043DB1ZI", priceBand: "£17 to £25", verified: false, image: "41iOGCcCNML", short: ["pack of purification tablets", "packs of purification tablets"] },
  { lineId: "gel", tier: "premium", retailer: "amazon", name: "Dettol hand sanitiser gel, 50 ml", asin: "B007BBU09M", priceBand: "£3 to £5", verified: false, image: "51PnL9IMQfL", short: ["hand gel", "hand gels"] },
  { lineId: "tin-opener", tier: "premium", retailer: "amazon", name: "OXO Good Grips soft-handled tin opener", asin: "B00004OCJW", priceBand: "£13 to £18", verified: false, image: "51NJ8erFERL", short: ["tin opener", "tin openers"] },
  { lineId: "batteries", tier: "premium", retailer: "amazon", name: "Duracell Plus AA alkaline batteries, pack of 24", asin: "B093C9B1HK", priceBand: "£15 to £20", verified: false, image: "81qqg-Z5nLL", unitsPerProduct: 6, short: ["pack of 24 AA batteries", "packs of 24 AA batteries"] },
  { lineId: "water", tier: "premium", retailer: "amazon", name: "Highland Spring still spring water, 6 x 1.5 litres", asin: "B016OVGU5M", priceBand: "£4 to £6", verified: false, image: "81I3POd5OmL", unitsPerProduct: 1, short: ["six-pack of 1.5 litre water", "six-packs of 1.5 litre water"] },
  { lineId: "tins", tier: "premium", retailer: "amazon", name: "Heinz baked beans in tomato sauce, 6 x 415 g", asin: "B015O5CUZ8", priceBand: "£4 to £6", verified: false, image: "61tJDSOLQxL", unitsPerProduct: 6, share: 0.5, short: ["pack of 6 tins of beans", "packs of 6 tins of beans"] },
  { lineId: "tins", tier: "premium", retailer: "amazon", name: "Napolina chopped tomatoes, 6 x 400 g", asin: "B01LXT6MY6", priceBand: "£3.50 to £5", verified: false, image: "710nOEQ0fKL", unitsPerProduct: 6, share: 0.25, short: ["pack of 6 tins of tomatoes", "packs of 6 tins of tomatoes"] },
  { lineId: "tins", tier: "premium", retailer: "amazon", name: "John West tuna chunks in spring water, 4 x 125 g", asin: "B0DDL7WZFK", priceBand: "£3 to £4.50", verified: false, image: "517LwELcg-L", unitsPerProduct: 4, share: 0.25, short: ["pack of 4 tins of tuna", "packs of 4 tins of tuna"] },
  { lineId: "carbs", tier: "premium", retailer: "amazon", name: "De Cecco fusilli no. 34, 500 g", asin: "B004FIOMWU", priceBand: "£2 to £3", verified: false, image: "71eyT09PHZL", unitsPerProduct: 1, short: ["bag of pasta", "bags of pasta"] },
  { lineId: "oats", tier: "premium", retailer: "amazon", name: "Quaker porridge oats, 1 kg", asin: "B001JNQ01U", priceBand: "£2.50 to £3.50", verified: false, image: "61pWel2q2UL", short: ["bag of oats (1 kg)", "bags of oats (1 kg)"] },
  { lineId: "loo", tier: "premium", retailer: "amazon", name: "Andrex Family Soft toilet tissue, 24 rolls", asin: "B07YK9JWH4", priceBand: "£8 to £11", verified: false, image: "71aYO8n6pLL", unitsPerProduct: 24, short: ["pack of 24 toilet rolls", "packs of 24 toilet rolls"] },
  { lineId: "nocook", tier: "premium", retailer: "amazon", name: "Eat Natural almond and apricot bars, 12 x 40 g", asin: "B0D8LCRCS1", priceBand: "£7 to £10", verified: false, image: "71Woau6E7OL", unitsPerProduct: 6, short: ["box of 12 fruit and nut bars", "boxes of 12 fruit and nut bars"] },
];

/**
 * The products for a line in one tier. A line with nothing in that tier
 * falls back to its regular products, so every tier fills every basket.
 */
export function productsFor(lineId: string, tier: Tier = "regular"): Product[] {
  const forLine = products.filter((p) => p.lineId === lineId);
  const inTier = forLine.filter((p) => (p.tier ?? "regular") === tier);
  return inTier.length ? inTier : forLine.filter((p) => !p.tier);
}



export function amazonProductUrl(asin: string, tag?: string) {
  return `https://www.amazon.co.uk/dp/${asin}${tag ? `?tag=${encodeURIComponent(tag)}` : ""}`;
}
