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
  /** True only when Alice or the site has actually owned or tested it. Shown to the reader. */
  usedIt?: boolean;
  /** How many of this product cover one planner unit, e.g. a 24-pack covers 6 "packs of 4". */
  unitsPerProduct?: number;
  /** Amazon image id for the main product photo; see amazonImageUrl(). */
  image?: string;
};

export const products: Product[] = [
  { lineId: "powerbank", retailer: "amazon", name: "Anker 10,000 mAh power bank, USB-C", asin: "B0D4MDHB21", priceBand: "£15 to £25", verified: false, image: "61ucpwm6obL" },
  { lineId: "radio", retailer: "amazon", name: "iRonsnow wind-up and solar AM/FM radio with torch and USB charger", asin: "B0BHL1MQB2", priceBand: "£20 to £30", verified: false, image: "61Ls7RzrmBL" },
  { lineId: "masks", retailer: "amazon", name: "Omnitex FFP2 masks, box of 20, individually wrapped", asin: "B094PHG3KV", priceBand: "£8 to £14", verified: false, unitsPerProduct: 2, image: "619wGwtKLfL" },
  { lineId: "firstaid", retailer: "amazon", name: "St John Ambulance Universal First Aid Kit", asin: "B008XI72FC", priceBand: "£12 to £20", verified: false, image: "91-waJqLnFL" },
  { lineId: "batteries", retailer: "amazon", name: "Duracell Plus AA batteries, pack of 24", asin: "B093C9B1HK", priceBand: "£10 to £16", verified: false, unitsPerProduct: 6, image: "81qqg-Z5nLL" },
  { lineId: "torch", retailer: "amazon", name: "Energizer Universal Plus LED head torch, batteries included", asin: "B07Y8S3YVM", priceBand: "£8 to £14", verified: false, image: "71bwAiRBJdL" },
  { lineId: "tin-opener", retailer: "amazon", name: "OXO Good Grips soft-handled tin opener", asin: "B00004OCJW", priceBand: "£10 to £15", verified: false, image: "51NJ8erFERL" },
  { lineId: "lantern", retailer: "amazon", name: "Energizer rechargeable LED camping lantern", asin: "B0B6KVSDB4", priceBand: "£20 to £30", verified: false, image: "71oYJx2ckvL" },
  { lineId: "water-extra", retailer: "amazon", name: "Trintion 10 litre camping water container with tap, BPA free", asin: "B08X727JL9", priceBand: "£14 to £18", verified: false, image: "61xVUBbIxrL" },
  { lineId: "purify", retailer: "amazon", name: "Lifesystems chlorine dioxide purification tablets, treats 30 litres", asin: "B002VPP45S", priceBand: "£8 to £12", verified: false, image: "71n60YzjJxL" },
  { lineId: "gel", retailer: "amazon", name: "Carex Complete hand sanitiser gel, 50 ml pocket size", asin: "B08QNFN7VP", priceBand: "£1 to £2", verified: false, image: "61ZJmg0PToL" },
];

export function productsFor(lineId: string): Product[] {
  return products.filter((p) => p.lineId === lineId);
}

/** Main product photo from Amazon's image host, sized by width in pixels. */
export function amazonImageUrl(image: string, width = 400) {
  return `https://m.media-amazon.com/images/I/${image}._AC_SX${width}_.jpg`;
}

export function amazonProductUrl(asin: string, tag?: string) {
  return `https://www.amazon.co.uk/dp/${asin}${tag ? `?tag=${encodeURIComponent(tag)}` : ""}`;
}
