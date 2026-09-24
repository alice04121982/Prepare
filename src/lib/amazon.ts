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
