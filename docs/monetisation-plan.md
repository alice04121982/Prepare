# Stay Prepared: monetisation plan

Drafted 18 September 2026. Supersedes the earlier "no affiliate links"
stance in PLAN.md, which was mine, not Alice's. Alice wants the site to
earn from linking to specific products while keeping the tone honest.

## The principle

The site earns when a reader buys something they actually needed anyway.
It never earns by making them want more. That one rule keeps the
monetisation from poisoning the voice, and it is also the commercially
smart position: readers who trust a short list buy from it. Readers who
smell an upsell leave.

## How the money is made

**1. Affiliate links on the checklist and kit pages (core).**
Every checklist item that is a purchase gets one to three named products
with a link, a price band, and one sentence on why. Commission on each
sale. This is how TruePrepper and The Prepared earn most of their income.

Programmes to join, UK-first:
- Amazon Associates UK. Broadest catalogue, 1 to 4 percent commission,
  24-hour cookie. Alice does not want to promote Amazon "as such", so use
  it as the fallback where a maker or specialist retailer has no
  programme, and show it second, never first.
- Awin. UK network carrying Argos, Currys, Go Outdoors, Mountain Warehouse,
  Boots, Screwfix, Toolstation, Halfords, Decathlon UK. Typical 3 to 8
  percent. One application covers many retailers.
- Impact and ShareASale. Jackery UK and Anker run their programmes here,
  typically 5 to 8 percent, with 30-day cookies. Fits the "maker's own
  site" instinct and pays better than Amazon.
- Direct programmes worth checking: EcoFlow, Bluetti, Midland (radios),
  Water-to-Go and LifeStraw (filters), Nebo and Ledlenser (torches),
  Wise Food Storage UK and Emergency Food Storage UK (long-life food),
  Ethical Superstore.

**2. The Build Your Kit planner as the engine.**
Household size and duration in, a shopping list out, every line linked.
This is the highest-value page on the site because the reader arrives
with intent and leaves with a list. Design it so the free, use-what-you-
have options appear first on every line, then the product.

**3. Kit pages by household type.**
"Three days in a one-bed flat", "A family of four for a week", "An older
relative living alone", "With a baby", "With a dog". Each is a curated
list with links and a total cost. These are what people search for and
share.

**4. Printed guide (secondary).**
The offline HTML guide as an A5 booklet, printed on demand at cost plus
a small margin. Modelled on the Swedish booklet. Low income, high trust,
and a natural gift or parish-council bulk order.

**5. Newsletter (enabler, not income).**
Monthly, one useful thing, one product pick with a link, one piece of
official news. Builds the returning audience that makes 1 to 3 work.

**6. Not doing.** Courses, own-brand kits, sponsored posts, display ads,
pop-ups. Each one either changes the voice or makes the site look like
the ones it is positioned against.

## Rules that keep it honest

1. Only link to things on the checklist. If it is not on the list, it does
   not get a link, however good the commission.
2. Every item shows a free or already-owned alternative first where one
   exists. "A filled bath" before "a water container".
3. Every item shows a budget option and a standard option. Never only the
   expensive one.
4. Maker or specialist retailer first, Amazon second.
5. One plain disclosure sentence at the top of every page that carries a
   link, in the site's voice: "Some links on this page earn us a small
   commission. It never changes what we recommend, and the free option is
   always listed first." Plus the disclosure page the programmes require.
6. Products are things Alice or the site has actually used or tested, and
   the page says so where it is true.
7. No urgency, no scarcity, no "before it's too late". No product
   placement in the scenarios or community pages.
8. Cap: no more than three products per checklist item, no more than
   about thirty products across the site.

## What it could earn

Affiliate income is traffic times click rate times conversion times
commission times basket. Illustrative, not a forecast:

| Monthly visitors | Click through to a product | Buy | Average basket | Commission | Monthly income |
| --- | --- | --- | --- | --- | --- |
| 5,000 | 8% | 5% | £60 | 5% | about £60 |
| 20,000 | 8% | 5% | £60 | 5% | about £240 |
| 50,000 | 8% | 5% | £60 | 5% | about £600 |
| 100,000 | 10% | 6% | £80 | 6% | about £2,900 |

Power stations and solar panels lift the basket sharply; a single Jackery
sale can be worth £30 to £60 in commission. Traffic is the constraint, and
traffic comes from being the page people share when the news is bad. The
2026 government campaign, and every storm and outage after it, is free
marketing for a site that ranks for "what should I keep at home".

## Legal and platform requirements

- UK advertising rules (CAP Code) require affiliate content to be
  obviously identifiable as such. The disclosure sentence on each page
  meets this.
- Amazon Associates requires its specific wording somewhere on the site
  ("As an Amazon Associate we earn from qualifying purchases") and
  forbids quoting prices that can go stale. Use price bands, not prices.
- Awin and Impact require a disclosure page and approve sites on review;
  the site needs real content and a privacy policy before applying.
- A privacy policy and cookie notice are needed once affiliate cookies
  are set. Keep analytics privacy-respecting (Plausible) so the notice
  stays simple.

## Build order

1. Data model: add `products` to checklist items (done) with fields for
   budget and standard options, retailer, price band, and a "used it"
   flag. Add a `disclosure` component shown on any page with links.
2. Apply to Amazon Associates UK and Awin now; both take days to approve.
   Apply to Jackery and Anker via Impact once traffic exists.
3. Populate the checklist with two options per purchasable item, about
   twenty-five products in total.
4. Build the Build Your Kit planner with the shopping-list output.
5. Write the first three kit pages.
6. Add the disclosure page, privacy policy, and Amazon wording.
7. Newsletter sign-up, once there is something to send.
8. Printed booklet, later, once the content has settled.
