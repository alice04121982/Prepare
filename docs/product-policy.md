# Stay Prepared: product policy

Drafted 24 September 2026 for Alice's approval. It turns the rules in
`monetisation-plan.md` into a working routine for `src/data/products.ts`,
and records where the site does not yet meet them. Until approved, treat
it as a proposal.

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
4. **Inside the price band** we print. If the price moves out of the
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
3. If it passes, set `verified: true` and record the date (open decision
   C proposes a `checked` field for this).
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
- Photos come from Amazon's own image links (the Associates rules allow
  showing them, not storing them). If a photo stops loading, the product
  needs rechecking.

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
- **The basket includes unverified products.** The comment at the top of
  `products.ts` says the one-click basket only includes verified ones; it
  does not. The home page kit and `/basket` send every product. The
  planner's own note says the same thing and is also out of date.

## Open decisions for Alice

- **A. Unverified products in the basket.** Either filter them out (the
  basket would be empty until products are verified), or keep sending
  them and correct the comments. Recommended: keep sending them for now,
  fix the comments, and verify all 20 this week.
- **B. The free option in the one-click basket.** The planner shows it;
  the home page kit does not. Recommended: one line under the kit, "Already
  have some? Tick it off", which is there now, is enough, because the
  basket is a shortcut for people who have decided to buy.
- **C. A `checked` date on each product.** Add `checked: "2026-09-24"`
  beside `verified`, so the 3-monthly review knows what is stale.
  Recommended: yes.
- **D. A reader-facing line.** Say on `/basket` how products are chosen,
  in one sentence, with a link to a short public version of this policy.
  Recommended: yes, once the products are verified.
