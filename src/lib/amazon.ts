/**
 * The Amazon Associates tracking ID.
 *
 * Amazon's Add to Cart form needs one: without AssociateTag it skips the
 * "add these items" page and opens an empty basket (seen on 24 September
 * 2026, phone and desktop). The ID is public, printed in every affiliate
 * link, so it falls back to the site's own when the environment variable is
 * not set, rather than breaking the basket.
 */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "stayprepared2-21";

/**
 * An Amazon search for a kind of item, with the tracking ID. Used where the
 * site names what to look for rather than a brand: the reader picks the
 * product, and the commission still counts.
 */
export function amazonSearchUrl(query: string, tag: string = AMAZON_TAG) {
  return `https://www.amazon.co.uk/s?k=${encodeURIComponent(query)}&tag=${encodeURIComponent(tag)}`;
}
