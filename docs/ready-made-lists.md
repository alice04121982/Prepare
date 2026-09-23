# Ready-made lists: specification

24 September 2026. The product after the repositioning (see the revision
sections at the top of docs/monetisation-plan.md and docs/tone-of-voice.md).
A household enters who lives there, picks one of four lists, and gets the
list scaled to them with a one-click Amazon basket.

## The four lists

| Slug | Title | Days | Notes |
| --- | --- | --- | --- |
| `72-hours` | 72 hours: a power cut or water outage | fixed 3 | The government minimum. Light, heat, water, food that needs no cooking. |
| `two-weeks-to-a-month` | 2 weeks to a month: shortages, storms, long outages | 7 to 30, default 14 | Adds cooking without power and more power. |
| `three-months` | 3 months: job loss or a longer crisis | 31 to 90, default 90 | Pantry in bulk staples, long-term water, rotation. For income shocks, war, climate disruption. |
| `grab-bag` | Grab bag: if you have to leave home | per person, 3 days' carry | gov.uk suggests keeping what you would need if asked to leave quickly in a spare bag. Never take anything if escaping a fire. |

## Rules that change with duration

The planner's cap rises from 28 to 90 days.

- **Water.** Bottled drinking water covers the first 14 days at 3 litres
  per person per day (the WHO figure quoted by gov.uk). Past 14 days,
  storing more bottles stops being realistic (a family of four for 90 days
  would need over 1,000 litres), so the list adds one gravity water filter
  per household plus extra containers, and the basis says why.
- **Food.** Tins cover the first 14 days at two per person per day. Past
  that, one tin per person per day, with bulk staples carrying the rest:
  pasta or rice, oats, dried pulses, cooking oil, long-life milk, all
  scaled by days. No-cook food stays capped at 3 days.
- **Cooking without power.** From 7 days: a camping stove, plus gas
  canisters at a planning rate of one canister per two people per 3 days.
- **Power.** The existing power station line (7 days or medical needs)
  stays.
- Every other line keeps its current rule.

## The grab bag

Per person unless marked household. Quantities are the site's planning
figures, based on gov.uk's supplies list; the page says so.

- A rucksack, one per person (children over 5; babies' things go in an
  adult's bag).
- A water bottle with a built-in filter, one per person, plus 3 litres of
  bottled water per person for the first day.
- 3 days of no-cook food per person (food bars, nuts, tinned fruit with a
  ring pull).
- A foil emergency blanket and a rain poncho, one each.
- A head torch per person, spare batteries per household.
- A small first aid kit per bag, and a week of each person's medication.
- A wind-up or battery radio, a charged power bank and cables, per
  household.
- Cash in small notes, copies of documents in a waterproof wallet, and a
  paper list of contacts, per household.
- A whistle per person, a multi-tool per household.
- Free: a change of clothes, glasses, keys, phone charger.

## What stays the same

The URL is the storage (a, c, b, e, dogs, cats, med, home, d, plus a new
`list` param). Ticks live in the shared have record. Product rules in
src/data/products.ts: only `verified` products join the one-click basket.
