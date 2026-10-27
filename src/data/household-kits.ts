/**
 * The 72 hour kit for common households, one indexable page each at
 * /72-hour-kit/[slug]. These are the search pages the monetisation plan
 * names ("72 hour kit for a family of four UK"): each opens the same engine
 * (src/data/kit-rules.ts) on a fixed household, so every amount on the page
 * is the one the planner gives.
 *
 * Copy follows docs/tone-of-voice.md. `note` says what is different for this
 * household and nothing the list already says.
 */
import { defaultHousehold, type Household } from "@/data/kit-rules";

export type HouseholdKit = {
  slug: string;
  /** As it reads after "72 hour kit for": lowercase, no article where none is needed. */
  name: string;
  /** Who lives there, in plain numbers. */
  who: string;
  household: Household;
  /** What is different for this household, 1 or 2 short paragraphs. */
  note: string[];
  /** The <title>, under about 50 characters before the site name. */
  metaTitle: string;
  description: string;
  /** Short answer pages that fit this household, by slug. */
  guides: string[];
};

const base = (h: Partial<Household>): Household => ({ ...defaultHousehold, list: "72-hours", days: 3, ...h });

const all: HouseholdKit[] = [
  {
    slug: "one-person",
    name: "one person",
    who: "1 adult living alone",
    household: base({ adults: 1, homeType: "flat" }),
    note: [
      "Living alone, nobody else will notice if you run short. Agree with a neighbour or friend that you will check on each other.",
      "Space is often the problem in a flat. 9 litres is one six-pack of 1.5 litre bottles, which fits under a bed.",
    ],
    metaTitle: "72 hour kit for one person: UK list",
    description:
      "What one person living alone needs for the government's 3-day minimum: 9 litres of water, food that needs no cooking, light, a radio and cash.",
    guides: ["how-much-water-to-store", "food-that-needs-no-cooking", "power-cut"],
  },
  {
    slug: "couple",
    name: "a couple",
    who: "2 adults",
    household: base({ adults: 2 }),
    note: [
      "Things each of you needs double: water, a torch and a blanket. Things you share stay at one, such as the radio and the first aid kit.",
    ],
    metaTitle: "72 hour kit for a couple: UK list",
    description:
      "What 2 adults need for the government's 3-day minimum: 18 litres of water, 12 tins, 2 torches, a radio and cash, with the amounts worked out.",
    guides: ["how-much-water-to-store", "power-cut", "be-ready-campaign"],
  },
  {
    slug: "family-of-four",
    name: "a family of four",
    who: "2 adults and 2 children aged 3 to 17",
    household: base({ adults: 2, children: 2 }),
    note: [
      "Children are counted at the same 3 litres of water a day as adults. It keeps the sums simple and leaves a margin.",
      "The list adds something to do without power. Cards, books and crayons cost nothing if you already have them.",
    ],
    metaTitle: "72 hour kit for a family of four: UK list",
    description:
      "What a family of four needs for the government's 3-day minimum: 36 litres of water, 24 tins, 4 torches, a radio and cash, with every amount worked out.",
    guides: ["how-much-water-to-store", "food-that-needs-no-cooking", "be-ready-campaign"],
  },
  {
    slug: "family-with-a-baby",
    name: "a family with a baby",
    who: "2 adults and a baby under 3",
    household: base({ adults: 2, babies: 1 }),
    note: [
      "Ready-to-feed formula is on the list because you may not be able to boil water safely in an outage. The government's Be Ready checklist says the same.",
      "If you breastfeed, take the formula off the list. Nappies and wipes still apply.",
    ],
    metaTitle: "72 hour kit with a baby: UK list",
    description:
      "What a family with a baby needs for the government's 3-day minimum: water for feeds, ready-to-feed formula, nappies and wipes, with amounts worked out.",
    guides: ["be-ready-campaign", "how-much-water-to-store", "keep-warm-without-heating"],
  },
  {
    slug: "older-couple",
    name: "an older couple",
    who: "2 adults over 65",
    household: base({ adults: 2, over65: 2 }),
    note: [
      "Start with prescriptions. Keep 14 extra days in hand, and order repeats up to 5 working days before you need them.",
      "If either of you relies on powered equipment or finds it hard to get about, join the free Priority Services Register.",
    ],
    metaTitle: "72 hour kit for an older couple: UK list",
    description:
      "What 2 adults over 65 need for the government's 3-day minimum, from water and light to a prescription buffer and spare hearing-aid batteries.",
    guides: ["priority-services-register", "keep-warm-without-heating", "medical-equipment-and-outages"],
  },
  {
    slug: "couple-with-a-dog",
    name: "a couple with a dog",
    who: "2 adults and a dog",
    household: base({ adults: 2, dogs: 1 }),
    note: [
      "Keep 3 days of your dog's usual food, any medication and a recent photo in case you are separated.",
      "A medium dog drinks about 1 litre of water a day. Keep a little extra beyond the household's 18 litres.",
    ],
    metaTitle: "72 hour kit for a couple with a dog: UK list",
    description:
      "What 2 adults and a dog need for the government's 3-day minimum: water, food that needs no cooking, 3 days of dog food, light, a radio and cash.",
    guides: ["how-much-water-to-store", "power-cut", "before-a-storm"],
  },
];

export const householdKits: HouseholdKit[] = all;

export function getHouseholdKit(slug: string): HouseholdKit | undefined {
  return all.find((k) => k.slug === slug);
}
