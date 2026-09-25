# Budget and premium products: research, 25 September 2026

Alternatives to the regular (mid-range) products, for a budget, regular and
premium choice on the kits. They are in `src/data/products.ts` with a `tier`
and `verified: false`. Nothing on the site shows them yet: `productsFor()`
returns regular products unless a tier is asked for, and a line with nothing
in a tier falls back to regular.

## How they were found

Searched on amazon.co.uk, then each product page opened for its full title,
price, rating, review count and seller. Kept only products with 4 stars or
more from at least 100 reviews, nothing with "survival" in the title, and
nothing that does a different job from the line.

**Prices are approximate.** Amazon showed them in euros (the browser was
treated as outside the UK), so every band is converted at about 0.86 and
rounded. Check the real pound price when you verify.

## Check each by hand (docs/product-policy.md, section 4)

Open the link, check the item, UK seller, stock, price inside the band,
reviews and that our name matches, then set `verified: true` and `checked`.

| Line | Tier | Product | Band | Rating | Seller | Link |
|---|---|---|---|---|---|---|
| Power bank | budget | Belkin BoostCharge 10,000 mAh | £12 to £18 | 4.1 (1,198) | Amazon | [B0DJFGSSST](https://www.amazon.co.uk/dp/B0DJFGSSST) |
| Power bank | premium | Anker Zolo 20,000 mAh 30W | £25 to £35 | 4.5 (14,095) | AnkerDirect UK | [B0CZ9LH53B](https://www.amazon.co.uk/dp/B0CZ9LH53B) |
| Radio | budget | NNOOAADIO wind-up and solar AM/FM | £18 to £25 | 4.4 (2,229) | NNOOAADIO Tech, dispatched by Amazon | [B08JCFCX5J](https://www.amazon.co.uk/dp/B08JCFCX5J) |
| Radio | premium | Mesqool wind-up and solar DAB | £30 to £40 | 4.3 (4,466) | Mesqool | [B09M9LSQ6Y](https://www.amazon.co.uk/dp/B09M9LSQ6Y) |
| Masks | premium | FFP3, pack of 10 | £10 to £14 | 4.4 (5,068) | Shopex's, dispatched by Amazon | [B09J92GRXR](https://www.amazon.co.uk/dp/B09J92GRXR) |
| First aid | budget | Lewis-Plast home, car and workplace kit | £7 to £12 | 4.7 (8,694) | Amazon | [B07FRPXF44](https://www.amazon.co.uk/dp/B07FRPXF44) |
| First aid | premium | St John Ambulance workplace kit, large | £30 to £45 | 4.7 (505) | Trend Trader Hub, dispatched by Amazon; low stock | [B005JRULOY](https://www.amazon.co.uk/dp/B005JRULOY) |
| Head torch | budget | Amazon Basics LED head torch, 2 pack (AAA, included) | £8 to £12 | 4.5 (284) | Amazon | [B0DYSWT59X](https://www.amazon.co.uk/dp/B0DYSWT59X) |
| Head torch | premium | Ledlenser H8R rechargeable, 600 lm | £60 to £80 | 4.7 (1,403) | Ledlenser UK | [B077N8MZWW](https://www.amazon.co.uk/dp/B077N8MZWW) |
| Lantern | premium | Ledlenser ML4 rechargeable, 300 lm | £38 to £50 | 4.6 (1,594) | Amazon | [B07Y421Y1S](https://www.amazon.co.uk/dp/B07Y421Y1S) |
| Purification | premium | Katadyn Micropur Forte, 50 tablets | £17 to £25 | 4.6 (1,113) | NorthShore Watersports | [B0043DB1ZI](https://www.amazon.co.uk/dp/B0043DB1ZI) |
| Hand gel | premium | Dettol, 50 ml | £3 to £5 | 4.5 (5,482) | SELLNSHIP, dispatched by Amazon | [B007BBU09M](https://www.amazon.co.uk/dp/B007BBU09M) |
| Tin opener | premium | OXO Good Grips soft-handled | £13 to £18 | 4.6 (47,470) | Amazon | [B00004OCJW](https://www.amazon.co.uk/dp/B00004OCJW) |
| AA batteries | premium | Duracell Plus, 24 pack | £15 to £20 | 4.7 (33,630) | Amazon | [B093C9B1HK](https://www.amazon.co.uk/dp/B093C9B1HK) |
| Water | premium | Highland Spring still, 6 x 1.5 litres | £4 to £6 | 4.8 (6,661) | Amazon (grocery) | [B016OVGU5M](https://www.amazon.co.uk/dp/B016OVGU5M) |
| Tins | premium | Heinz baked beans, 6 x 415 g | £4 to £6 | 4.7 (9,706) | Amazon | [B015O5CUZ8](https://www.amazon.co.uk/dp/B015O5CUZ8) |
| Tins | premium | Napolina chopped tomatoes, 2,400 g (read as 6 x 400 g: check) | £3.50 to £5 | 4.8 (602) | Amazon (grocery) | [B01LXT6MY6](https://www.amazon.co.uk/dp/B01LXT6MY6) |
| Tins | premium | John West tuna chunks in spring water, 4 x 125 g | £3 to £4.50 | 4.6 (154) | Amazon (grocery) | [B0DDL7WZFK](https://www.amazon.co.uk/dp/B0DDL7WZFK) |
| Pasta | premium | De Cecco fusilli no. 34, 500 g (single bag) | £2 to £3 | 4.6 (268) | Amazon (grocery) | [B004FIOMWU](https://www.amazon.co.uk/dp/B004FIOMWU) |
| Oats | premium | Quaker porridge oats, 1 kg | £2.50 to £3.50 | 4.6 (2,277) | Amazon | [B001JNQ01U](https://www.amazon.co.uk/dp/B001JNQ01U) |
| Toilet roll | premium | Andrex Family Soft, 24 rolls | £8 to £11 | 4.6 (56,848) | Amazon | [B07YK9JWH4](https://www.amazon.co.uk/dp/B07YK9JWH4) |
| No-cook food | premium | Eat Natural almond and apricot, 12 x 40 g | £7 to £10 | 4.6 (413) | Amazon | [B0D8LCRCS1](https://www.amazon.co.uk/dp/B0D8LCRCS1) |

## Lines with no alternative, and why

- **Budget food, water, toilet roll, tin opener, batteries, hand gel and
  purification:** the regular pick is already Amazon's own brand or the
  cheapest sound option, so budget uses it too.
- **Budget masks:** the cheapest FFP2 listing did not say how many masks
  are in the box, so the quantity could not be worked out.
- **Budget lantern:** the cheapest from a known brand (Amazon Basics) runs
  on D batteries that are not included; the kit only stocks AA.
- **Budget and premium water container:** nothing cheaper than the Trintion
  passed the review threshold, and the "premium" results were unbranded
  containers at a higher price, or a cool box sold as a water carrier.
- **Premium milk:** no branded long-life milk had more than a handful of
  reviews.
- **Premium radio:** the Eton FRX2 is built around the US weather band;
  the Roberts results were not wind-up radios.

## Before the tier picker ships

- The product policy caps the site at about thirty products and says
  mid-range by default. Tiers take it to about fifty; the policy needs a
  line saying tiers are allowed, or the count drops.
- `/how-we-choose-products` counts only regular products until tiers show.
