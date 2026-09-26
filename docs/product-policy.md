# Stay Prepared: product policy

Approved by Alice on 24 September 2026. It turns the rules in
`monetisation-plan.md` into a working routine for `src/data/products.ts`,
and records where the site does not yet meet them.

## What this covers

Every specific, named product the site links to: the one-click Amazon
basket on the home page, the `/basket` page, and the product picks in the
planner at `/build-your-kit`. The short answer pages (`/guides`) are not
covered: they name kinds of things, never brands, and link to an Amazon
search.

## The rule behind it

The site earns when a reader buys something they needed anyway. It never
earns by making them want more. If a product choice would only make sense
for the commission, it is the wrong choice.

## 1. What gets a product

- Only lines on the checklist or the planner. If it is not on the list,
  it does not get a product, however good the commission.
- No more than three products for any one line, and about thirty across
  the site.
- The free or already-owned option is shown first wherever the page has
  room for it (the planner does this; see open decision B for the basket).

## 2. How a product is chosen

A product must pass every one of these before it goes in `products.ts`:

1. **It does the job on the line.** Right size, right quantity, right
   type. A 12 litre container is not a 10 litre container.
2. **Sold in the UK by a UK seller or Amazon itself**, with UK delivery.
   No marketplace listings shipped from abroad.
3. **In stock** on the day it is checked.
4. **Inside the price band** we use for totals. If the price moves out of the
   band, the band or the product changes.
5. **Well reviewed**: 4 stars or more from at least 100 reviews, or an
   established maker's own-brand line (Amazon Basics, by Amazon).
6. **Mid-range by default.** Not the cheapest if it is poorly made, not
   the premium brand if a plain one does the same job. Own-brand for food
   and household goods.
7. **Safe and plain.** No products sold with fear ("survival",
   "doomsday", "bug-out" in the listing title), no weapons, no
   unregulated medicines, no electrical goods without a UK plug or UKCA or
   CE marking.
8. **Honest name on our site.** Our name for it matches the listing:
   brand, model, size and pack count.

## 3. Where it is bought

- **Amazon for the one-click basket.** Only Amazon lets one button fill a
  basket, so every product in the basket needs an Amazon product code.
  This is a technical need, not a preference.
- **Specialist retailers as the alternative.** Once Awin is approved, the
  planner lists a specialist retailer (Screwfix, Go Outdoors, Boots and so
  on) beside Amazon for kit such as torches, radios and stoves, and shows
  it first, as `monetisation-plan.md` asks.
- **Supermarkets for food.** The planner already links supermarket
  searches for food and water; that stays.

## 4. Verifying a product

`verified: true` means a person has opened the listing and checked it. It
is never set by Claude or from search results alone.

To verify a product:

1. Open `https://www.amazon.co.uk/dp/<ASIN>`.
2. Check each point in section 2: the right item, UK seller, in stock,
   inside the price band, reviews, and that our name matches.
3. If it passes, set `verified: true` and `checked` to the date.
4. If it fails, replace it with one that passes, or remove it.

Claude can prepare for this: cross-check codes against search results,
flag mismatches (as on 24 September 2026, which caught a 12 litre
container sold as 10 litres), and produce a one-page list of links. The
sign-off is a person's.

## 5. Keeping it current

- **Every 3 months**, recheck every product against section 2.
- **Straight away** when a reader reports a problem, a listing
  disappears, or a price leaves its band.
- **After any Amazon Associates or Awin policy change** that affects what
  we can show.
- No Amazon photos and no per-product Amazon prices (26 September 2026).
  The Associates agreement allows product images and prices only through
  the Product Advertising API or SiteStripe, and prices only when fetched
  live. Price bands feed our basket totals, which are labelled as our own
  rough guide, not Amazon's prices. Bands next to maker or supermarket
  products stay.
- Once the API keys are set (`src/lib/paapi.ts`), live prices and photos
  from the API may show, each price with the time it was fetched and
  Amazon's "accurate as of" wording. Fetched hourly; Amazon's limit is 24
  hours.

## 6. Paid placement

- No product is listed because a brand paid for it.
- If a brand later sponsors the site, its product is labelled
  "Sponsored" wherever it appears, still has to pass section 2, and never
  replaces the free option.
- Affiliate links are marked `rel="sponsored"`, and every page with them
  carries the disclosure sentence Amazon requires.

## Where the site does not meet this yet

- **Nothing is verified.** All 20 products are `verified: false`.
- **Nothing has been used or tested by us.** `monetisation-plan.md` rule 6
  asks for products Alice or the site has used, and for the page to say so
  where true. None qualifies yet.
- **Only one option per line**, not a budget and a standard option.
- **Amazon only.** Specialist retailers wait on Awin approval.
- **The basket includes unverified products**, by decision A below, until
  all 20 are verified.

## Decisions (agreed 24 September 2026)

- **A. Unverified products in the basket.** Keep sending them for now,
  with the code comments corrected to say so, and verify all 20 this week.
  Filtering them out would empty the basket.
- **B. The free option in the one-click basket.** The line under the home
  page kit, "Already have some? Tick it off", is enough: the basket is a
  shortcut for people who have decided to buy. The planner keeps showing
  the free option first.
- **C. A `checked` date on each product.** Added beside `verified` in
  `products.ts`. It is set by the person who verifies, so the 3-monthly
  review knows what is stale; absent means never checked.
- **D. A reader-facing line.** Once the products are verified, `/basket`
  says in one sentence how products are chosen, with a link to a short
  public version of this policy.
