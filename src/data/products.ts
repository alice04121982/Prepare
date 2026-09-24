/**
 * Specific products for the planner's "buy it" view, keyed by kit line id.
 *
 * Rules (docs/monetisation-plan.md): only items on the checklist; a budget
 * option first where one exists; maker or specialist retailer first, Amazon
 * as the fallback. Every Amazon entry has an ASIN found on an amazon.co.uk
 * product page; `verified` flips to true only after a person has opened the
 * page and confirmed it is the right thing. Unverified items still show, but
 * the one-click basket button only includes verified ones.
 *
 * `image` is the id of the product's main photo on Amazon's image host
 * (the part before the first dot in the /images/I/ path). We link to
 * Amazon's copy rather than storing one: the Associates agreement lets
 * affiliates show product images fetched from Amazon, not redistribute
 * them, so the files never live in this repo.
 */
export type Product = {
  lineId: string;
  retailer: "amazon";
  name: string;
  asin: string;
  priceBand: string;
  /** Set true after opening the product page and checking it by hand. */
  verified: boolean;
  /** How many of this product cover one planner unit, e.g. a 24-pack covers 6 "packs of 4". */
  unitsPerProduct?: number;
  /** Amazon image id for the main product photo; see amazonImageUrl(). */
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
  { lineId: "masks", retailer: "amazon", name: "Omnitex FFP2 masks, box of 20, individually wrapped", asin: "B094PHG3KV", priceBand: "£8 to £14", verified: false, unitsPerProduct: 2, image: "619wGwtKLfL", short: ["box of 20 masks", "boxes of 20 masks"] },
  { lineId: "firstaid", retailer: "amazon", name: "St John Ambulance Universal First Aid Kit", asin: "B008XI72FC", priceBand: "£12 to £20", verified: false, image: "91-waJqLnFL", short: ["first aid kit", "first aid kits"] },
  { lineId: "torch", retailer: "amazon", name: "Energizer Universal Plus LED head torch, batteries included", asin: "B07Y8S3YVM", priceBand: "£8 to £14", verified: false, image: "71bwAiRBJdL", short: ["head torch", "head torches"] },
  { lineId: "lantern", retailer: "amazon", name: "Energizer rechargeable LED camping lantern", asin: "B0B6KVSDB4", priceBand: "£20 to £30", verified: false, image: "71oYJx2ckvL", short: ["lantern", "lanterns"] },
  { lineId: "water-extra", retailer: "amazon", name: "Trintion 10 litre camping water container with tap, BPA free", asin: "B08X727JL9", priceBand: "£14 to £18", verified: false, image: "61xVUBbIxrL", short: ["water container (10 litres)", "water containers (10 litres)"] },
  { lineId: "purify", retailer: "amazon", name: "Lifesystems chlorine dioxide purification tablets, treats 30 litres", asin: "B002VPP45S", priceBand: "£8 to £12", verified: false, image: "71n60YzjJxL", short: ["pack of purification tablets", "packs of purification tablets"] },
  { lineId: "gel", retailer: "amazon", name: "Carex Complete hand sanitiser gel, 50 ml pocket size", asin: "B08QNFN7VP", priceBand: "£1 to £2", verified: false, image: "61ZJmg0PToL", short: ["hand gel", "hand gels"] },

  // Long-life food, water and toilet roll, all sold in Amazon's main store so
  // they share one basket with everything above. Morrisons on Amazon and
  // Amazon Fresh keep separate baskets and cannot be filled by the link.
  // Mid-range on purpose: Amazon's own "by Amazon" and "Amazon Basics"
  // lines rather than the big brands. Found through search on 24 September
  // 2026; price bands are estimates until someone opens each page.
  { lineId: "tin-opener", retailer: "amazon", name: "Amazon Basics stainless steel manual tin opener", asin: "B087MSWH65", priceBand: "£5 to £8", verified: false, short: ["tin opener", "tin openers"] },
  { lineId: "batteries", retailer: "amazon", name: "Amazon Basics AA alkaline batteries, pack of 20", asin: "B00NTCH52W", priceBand: "£8 to £12", verified: false, unitsPerProduct: 5, short: ["pack of 20 AA batteries", "packs of 20 AA batteries"] },
  { lineId: "water", retailer: "amazon", name: "by Amazon still spring water, 4 x 2 litres", asin: "B0C7RR1F3V", priceBand: "£2 to £3", verified: false, unitsPerProduct: 8 / 9, short: ["four-pack of 2 litre water", "four-packs of 2 litre water"] },
  { lineId: "tins", retailer: "amazon", name: "by Amazon baked beans in tomato sauce, 6 x 420 g", asin: "B0DV9ZQP1R", priceBand: "£3 to £5", verified: false, unitsPerProduct: 6, share: 0.5, short: ["pack of 6 tins of beans", "packs of 6 tins of beans"] },
  { lineId: "tins", retailer: "amazon", name: "by Amazon Italian chopped tomatoes, 12 x 400 g", asin: "B09L1H978W", priceBand: "£6 to £9", verified: false, unitsPerProduct: 12, share: 0.25, short: ["pack of 12 tins of tomatoes", "packs of 12 tins of tomatoes"] },
  { lineId: "tins", retailer: "amazon", name: "by Amazon skipjack tuna chunks in spring water, 4 x 145 g", asin: "B0CB1SHQPG", priceBand: "£2.50 to £3.50", verified: false, unitsPerProduct: 4, share: 0.25, short: ["pack of 4 tins of tuna", "packs of 4 tins of tuna"] },
  { lineId: "carbs", retailer: "amazon", name: "by Amazon fusilli, 4 x 500 g", asin: "B0DSWKVGQZ", priceBand: "£2 to £4", verified: false, unitsPerProduct: 4, short: ["pack of 4 bags of pasta", "packs of 4 bags of pasta"] },
  { lineId: "milk", retailer: "amazon", name: "by Amazon long-life skimmed milk, 6 x 1 litre", asin: "B0D81K6RMS", priceBand: "£5 to £7", verified: false, unitsPerProduct: 6, short: ["pack of 6 litres of long-life milk", "packs of 6 litres of long-life milk"] },
  { lineId: "oats", retailer: "amazon", name: "by Amazon original porridge oats, 1 kg", asin: "B0G595H3WB", priceBand: "£1 to £2", verified: false, short: ["bag of oats (1 kg)", "bags of oats (1 kg)"] },
  { lineId: "loo", retailer: "amazon", name: "Our Essentials by Amazon toilet tissue, 24 rolls", asin: "B0FH76MH6Y", priceBand: "£7 to £10", verified: false, unitsPerProduct: 24, short: ["pack of 24 toilet rolls", "packs of 24 toilet rolls"] },
  // The no-cook line counts days, not people: one box of 18 bars is two bars
  // a day for nine person-days. See packUnits() in packs.ts.
  { lineId: "nocook", retailer: "amazon", name: "Nature Valley Crunchy Oats and Honey bars, 18 x 42 g", asin: "B0077PQGLS", priceBand: "£6 to £9", verified: false, unitsPerProduct: 9, short: ["box of 18 cereal bars", "boxes of 18 cereal bars"] },
];

export function productsFor(lineId: string): Product[] {
  return products.filter((p) => p.lineId === lineId);
}

/** Main product photo from Amazon's image host, sized by width in pixels. */
export function amazonImageUrl(image: string, width = 400) {
  return `https://m.media-amazon.com/images/I/${image}._AC_SX${width}_.jpg`;
}

/**
 * The product's main photo by ASIN alone, through the Associates image
 * link (the "Image" option in Amazon's SiteStripe). Used for products with no
 * `image` id recorded. It redirects to the same m.media-amazon.com photo.
 */
export function amazonImageByAsin(asin: string, tag: string) {
  const q = new URLSearchParams({
    _encoding: "UTF8",
    ASIN: asin,
    Format: "_SL250_",
    ID: "AsinImage",
    MarketPlace: "GB",
    ServiceVersion: "20070822",
    WS: "1",
    tag,
    language: "en_GB",
  });
  return `https://ws-eu.amazon-adsystem.com/widgets/q?${q.toString()}`;
}

export function amazonProductUrl(asin: string, tag?: string) {
  return `https://www.amazon.co.uk/dp/${asin}${tag ? `?tag=${encodeURIComponent(tag)}` : ""}`;
}
