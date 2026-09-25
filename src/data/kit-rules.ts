/**
 * Quantity rules for the Build Your Kit planner.
 *
 * Inputs describe the household; the rules turn them into a shopping list
 * with realistic quantities. Drinking water is planned at 3 litres per person
 * per day, the top of the World Health Organisation's 2.5 to 3 litre minimum,
 * as quoted by gov.uk. Other figures follow the site's checklist. Everything
 * is a planning figure, rounded up.
 *
 * A household can carry one of the four ready-made lists (src/data/lists.ts).
 * The first three set the days and change a few rules with duration: past 14
 * days bottled water gives way to a filter, tins drop to one a day and bulk
 * staples carry the rest, and from 7 days a camping stove joins the list. The
 * grab bag is a different list altogether, built by buildGrabBag().
 */

import { clampDaysForList, isListSlug, type ListSlug } from "@/data/lists";

export type Household = {
  adults: number;
  /** Children aged 3 to 17. */
  children: number;
  /** Babies and toddlers under 3. */
  babies: number;
  /** Adults over 65, counted within adults as well. */
  over65: number;
  dogs: number;
  cats: number;
  /** Someone relies on regular prescriptions or powered medical equipment. */
  medicalNeeds: boolean;
  homeType: "flat" | "house";
  /** Days of cover to plan for: a whole number from MIN_DAYS to MAX_DAYS. */
  days: number;
  /** The ready-made list, if the reader picked one. Its range bounds `days`. */
  list?: ListSlug;
  /** Price range for the basket; absent means regular (see products.ts). */
  tier?: "budget" | "premium";
};

export type ProductOption = {
  name: string;
  /** "budget" shows first. */
  tier: "budget" | "standard";
  /** Retailer or maker product page. */
  url?: string;
  /** Amazon UK ASIN for the basket link. Leave empty until verified by hand. */
  asin?: string;
  priceBand: string;
};

export type KitLine = {
  id: string;
  category: string;
  item: string;
  /** Number of units to buy, after subtracting nothing (the reader ticks what they have). */
  quantity: number;
  unit: string;
  /** How the quantity was worked out, shown to the reader. */
  basis: string;
  /** The free or already-owned way to cover this, shown first. */
  freeOption?: string;
  products?: ProductOption[];
  /**
   * Another line id whose products (src/data/products.ts) fit this line too.
   * Lets a grab bag line reuse the home kit's head torch or radio without
   * sharing its tick.
   */
  productsFrom?: string;
  /** True for the nine things to get first. */
  priority?: boolean;
  /** What to type into a supermarket search to find this. */
  search?: string;
};

export type KitTask = {
  id: string;
  text: string;
  url?: string;
  /** Where the link goes, as its visible text. */
  linkText?: string;
};

export const defaultHousehold: Household = {
  adults: 2,
  children: 0,
  babies: 0,
  over65: 0,
  dogs: 0,
  cats: 0,
  medicalNeeds: false,
  homeType: "house",
  days: 3,
};

const ceil = Math.ceil;

export const MIN_DAYS = 1;
export const MAX_DAYS = 90;

/** Clamps any number to a whole number of days in range. */
export function clampDays(n: number): number {
  return Math.max(MIN_DAYS, Math.min(MAX_DAYS, Math.round(n)));
}

/** Days are clamped to the list's own range when a list is set. */
function daysFor(h: Household): number {
  return h.list ? clampDaysForList(h.list, h.days) : clampDays(h.days);
}

/** Bottled water covers this many days. Past it, a filter takes over. */
export const BOTTLED_WATER_DAYS = 14;
/** Tins are planned at two a day for this many days, then one. */
export const TWO_TIN_DAYS = 14;
/** A camping stove and gas join the list from this many days. */
export const STOVE_FROM_DAYS = 7;

/** "1 day", "14 days". */
export function daysLabel(n: number): string {
  return `${n} ${n === 1 ? "day" : "days"}`;
}

export function buildKit(h: Household): { lines: KitLine[]; tasks: KitTask[] } {
  if (h.list === "grab-bag") return buildGrabBag(h);

  const people = h.adults + h.children + h.babies;
  const peopleWhoDrink = h.adults + h.children;
  const d = daysFor(h);
  const drinkers = `${peopleWhoDrink} ${peopleWhoDrink === 1 ? "person" : "people"}`;

  // Water: bottled for the first 14 days, a filter after that.
  const waterPerDay = 3 * peopleWhoDrink + (h.babies > 0 ? 2 * h.babies : 0);
  const filtering = d > BOTTLED_WATER_DAYS;
  const water = waterPerDay * Math.min(d, BOTTLED_WATER_DAYS);
  const waterWholeStay = waterPerDay * d;
  const waterPacks = ceil(water / 9); // six 1.5 litre bottles

  // Food: two tins a day for the first 14 days, then one, with bulk staples
  // carrying the rest.
  const twoTinDays = Math.min(d, TWO_TIN_DAYS);
  const oneTinDays = Math.max(0, d - TWO_TIN_DAYS);
  const tins = 2 * peopleWhoDrink * twoTinDays + peopleWhoDrink * oneTinDays;
  const carbsKg = 0.1 * peopleWhoDrink * twoTinDays + 0.2 * peopleWhoDrink * oneTinDays;
  const gas = ceil((peopleWhoDrink / 2) * (d / 3));

  const lines: KitLine[] = [
    {
      id: "water",
      search: "still water 1.5l 6 pack",
      category: "Water",
      item: "Bottled drinking water",
      quantity: waterPacks,
      unit: "six-packs of 1.5 litre bottles",
      basis: filtering
        ? `${water} litres, for the first 14 days: 3 litres per person per day for ${drinkers}${h.babies ? `, plus water for making up feeds` : ""}. That is the top of the World Health Organisation's 2.5 to 3 litre minimum, as quoted by gov.uk. It stops at 14 days because ${daysLabel(d)} would need ${waterWholeStay.toLocaleString("en-GB")} litres, more than most homes can store. The filter below covers the rest.`
        : `${water} litres: 3 litres per person per day for ${drinkers} over ${daysLabel(d)}${h.babies ? `, plus water for making up feeds` : ""}. That is the top of the World Health Organisation's 2.5 to 3 litre minimum, as quoted by gov.uk.`,
      freeOption: "Refilled, clearly labelled bottles from the tap, rotated every few months, cost nothing.",
      priority: true,
      products: [
        { name: "Supermarket own-brand still water, 6 x 1.5 L", tier: "budget", priceBand: "£1 to £2 a pack" },
        { name: "10 litre water container with tap", tier: "standard", priceBand: "£8 to £15" },
      ],
    },
    {
      id: "water-extra",
      search: "water container with tap",
      category: "Water",
      item: "Containers for washing and flushing water",
      quantity: h.homeType === "flat" ? 1 : 2,
      unit: h.homeType === "flat" ? "large lidded container or bucket" : "large lidded containers or buckets",
      basis: "Filled from the tap when a cut is announced. Up to 10 litres per person per day covers cooking and hygiene.",
      freeOption: "A filled bath, and any clean bucket or large pan you already own.",
    },
    {
      id: "purify",
      search: "water purification tablets",
      category: "Water",
      item: "Water purification tablets",
      quantity: 1,
      unit: "pack",
      basis: "One pack treats far more than a household needs. Boiling for one minute does the same job if you can heat water.",
      freeOption: "A pan and a heat source.",
      products: [{ name: "Chlorine or chlorine dioxide tablets, 30 to 50 pack", tier: "budget", priceBand: "£5 to £10" }],
    },
    ...(filtering
      ? [
          {
            id: "water-filter",
            search: "gravity water filter",
            category: "Water",
            item: "Gravity water filter",
            quantity: 1,
            unit: "for the household",
            basis: `Included because you are planning for more than 14 days. Past that, storing bottles stops being realistic: your household would need ${waterWholeStay.toLocaleString("en-GB")} litres for ${daysLabel(d)}. A gravity filter cleans tap, rain or river water in batches, with no power or pumping. One per household. Check what the maker says it removes before you rely on it, and use the tablets above on any water you are unsure of.`,
            freeOption: "Boiling water for one minute makes it safe to drink, if you have the fuel to spare.",
          } satisfies KitLine,
          {
            id: "water-store",
            search: "10 litre water container with tap",
            category: "Water",
            item: "Containers for filtered drinking water",
            quantity: Math.max(2, ceil(peopleWhoDrink / 2)),
            unit: "containers of 10 litres, with a tap",
            basis: `One per two people, and at least two, so a day's filtered water is always ready and covered while the next batch runs through. Your household drinks about ${waterPerDay} litres a day.`,
            freeOption: "Clean, lidded food-grade containers you already own do the same job.",
            productsFrom: "water-extra",
          } satisfies KitLine,
        ]
      : []),
    {
      id: "tins",
      search: "tinned beans soup tuna",
      category: "Food",
      item: "Tinned or jarred meals and vegetables",
      quantity: tins,
      unit: "tins",
      basis: oneTinDays
        ? `Two tins per person per day for the first 14 days, then one a day for the other ${daysLabel(oneTinDays)}, because the bulk staples below carry the rest and pack far smaller. Beans, soup, fish, vegetables, ready meals. Things you already eat. Put new tins at the back and eat from the front.`
        : `Two tins per person per day for ${daysLabel(d)}. Beans, soup, fish, vegetables, ready meals. Things you already eat.`,
      freeOption: "Most cupboards hold a few days already. Count what you have before buying.",
      priority: true,
      products: [{ name: "Own-brand tinned beans, soup, tuna, vegetables", tier: "budget", priceBand: "50p to £1.50 a tin" }],
    },
    oneTinDays
      ? {
          id: "carbs",
          search: "long grain rice 5kg",
          category: "Food",
          item: "Pasta or rice",
          quantity: ceil(carbsKg),
          unit: "kg",
          basis: `About 100 g per person per day for the first 14 days, then 200 g a day for the other ${daysLabel(oneTinDays)}, because the second tin drops out and dry food takes its place. These are the site's planning figures. Keep it in sealed tubs, eat the oldest first and replace it as you go.`,
          products: [{ name: "Own-brand long grain rice or pasta, 5 kg bag", tier: "budget", priceBand: "£5 to £10" }],
        }
      : {
          id: "carbs",
          search: "pasta 500g",
          category: "Food",
          item: "Pasta, rice or instant mash",
          quantity: ceil((0.1 * peopleWhoDrink * d) / 0.5),
          unit: "packs of 500 g",
          basis: `About 100 g per person per day. Needs cooking, so keep some no-cook food too.`,
          products: [{ name: "Own-brand pasta or rice, 500 g to 1 kg", tier: "budget", priceBand: "£1 to £2" }],
        },
    {
      id: "nocook",
      search: "crackers peanut butter cereal bars",
      category: "Food",
      item: "Food that needs no cooking",
      quantity: Math.min(d, 3),
      unit: `${Math.min(d, 3) === 1 ? "day's" : "days'"} worth for ${peopleWhoDrink} (crackers, nut butter, cereal bars, tinned fruit)`,
      basis:
        d > 3
          ? "Three days of it, for a power cut. It stops at three because the tins and dry food above cover the days after that. Counted separately because it is the part people forget."
          : "Enough for every day you are planning for, in case the power goes. Counted separately because it is the part people forget.",
      priority: true,
    },
    {
      id: "milk",
      search: "long life milk 1 litre",
      category: "Food",
      item: "Long-life milk or plant milk",
      quantity: ceil((0.25 * peopleWhoDrink * d)),
      unit: "one-litre cartons",
      basis: "A quarter of a litre per person per day for tea, cereal and cooking.",
      products: [{ name: "Own-brand UHT milk or oat milk", tier: "budget", priceBand: "£1 to £1.50 a litre" }],
    },
    {
      id: "oats",
      search: "porridge oats 1kg",
      category: "Food",
      item: "Porridge oats or cereal",
      quantity: ceil(0.06 * peopleWhoDrink * d),
      unit: "kg",
      basis: oneTinDays
        ? "About 60 g per person per breakfast. Oats keep for months in a sealed tub; eat the oldest first."
        : "About 60 g per person per breakfast.",
    },
    ...(oneTinDays
      ? [
          {
            id: "pulses",
            search: "red lentils 1kg",
            category: "Food",
            item: "Dried lentils, beans or split peas",
            quantity: ceil(0.05 * peopleWhoDrink * oneTinDays),
            unit: "kg",
            basis: `About 50 g per person per day for the ${daysLabel(oneTinDays)} past 14, to replace the protein the second tin gave. This is our own planning figure, not an official one. Red lentils need no soaking and cook fastest, which saves gas.`,
            products: [{ name: "Own-brand red lentils or dried beans, 500 g to 2 kg", tier: "budget", priceBand: "£1 to £4" }],
          } satisfies KitLine,
          {
            id: "oil",
            search: "vegetable oil 1 litre",
            category: "Food",
            item: "Cooking oil",
            quantity: ceil(0.03 * peopleWhoDrink * oneTinDays),
            unit: ceil(0.03 * peopleWhoDrink * oneTinDays) === 1 ? "litre" : "litres",
            basis: `About two tablespoons (30 ml) per person per day for the ${daysLabel(oneTinDays)} past 14. Rice, pasta and lentils on their own are low in fat; oil adds energy and makes them easier to eat. This is our own planning figure, not an official one.`,
            freeOption: "Check the cupboard: most kitchens already have a bottle open.",
            products: [{ name: "Own-brand vegetable or rapeseed oil, 1 litre", tier: "budget", priceBand: "£1.50 to £3" }],
          } satisfies KitLine,
        ]
      : []),
    {
      id: "tin-opener",
      search: "tin opener",
      category: "Food",
      item: "Manual tin opener",
      quantity: 1,
      unit: "",
      basis: "One. Easy to forget, hard to do without.",
      freeOption: "Check the drawer first.",
      priority: true,
      products: [{ name: "Basic manual tin opener", tier: "budget", priceBand: "£2 to £6" }],
    },
    ...(d >= STOVE_FROM_DAYS
      ? [
          {
            id: "stove",
            search: "portable camping gas stove",
            category: "Food",
            item: "Camping stove",
            quantity: 1,
            unit: "",
            basis: `Included because you are planning for ${STOVE_FROM_DAYS} days or more. Cold food is fine for a few days; after that the tins and staples need heating. Use it outdoors only, never indoors or in a garage: stoves give off carbon monoxide.`,
            freeOption: "A camping stove you already own. Light it once before you need it.",
            products: [{ name: "Single-burner portable gas stove", tier: "budget", priceBand: "£15 to £30" }],
          } satisfies KitLine,
          {
            id: "gas",
            search: "butane gas canisters",
            category: "Food",
            item: "Gas canisters for the stove",
            quantity: gas,
            unit: gas === 1 ? "canister" : "canisters",
            basis: `One canister per two people every 3 days, the site's planning rate: ${gas} for ${drinkers} over ${daysLabel(d)}. Buy the type your stove takes, and store them somewhere cool and aired, away from the house if you can.`,
            products: [{ name: "Butane canisters to fit your stove, pack of 4", tier: "budget", priceBand: "£6 to £12" }],
          } satisfies KitLine,
        ]
      : []),
    {
      id: "torch",
      search: "led torch",
      category: "Power and light",
      item: "Torches or head torches",
      quantity: people - h.babies,
      unit: "",
      basis: "One per person who can hold one. Head torches leave hands free.",
      freeOption: "A phone torch lasts an evening, not three.",
      priority: true,
      products: [
        { name: "LED torch, AA batteries", tier: "budget", priceBand: "£3 to £8" },
        { name: "LED head torch", tier: "standard", priceBand: "£8 to £20" },
      ],
    },
    {
      id: "batteries",
      search: "aa batteries",
      category: "Power and light",
      item: "Spare batteries (AA and AAA)",
      quantity: people - h.babies + 1,
      unit: "packs of 4",
      basis: "One full change for each torch, plus the radio. Alkaline keeps for years.",
      priority: true,
      products: [{ name: "AA and AAA alkaline batteries, multipack", tier: "budget", priceBand: "£4 to £10" }],
    },
    {
      id: "lantern",
      search: "led lantern",
      category: "Power and light",
      item: "Battery lantern",
      quantity: h.homeType === "flat" ? 1 : 2,
      unit: "",
      basis: "One for the room everyone gathers in. Safer and brighter than candles.",
      products: [{ name: "LED camping lantern", tier: "budget", priceBand: "£8 to £20" }],
    },
    {
      id: "powerbank",
      search: "power bank 10000mah",
      category: "Power and light",
      item: "Power bank",
      quantity: Math.max(1, ceil((h.adults + h.children) / 2)),
      unit: "",
      basis: "One between two people. A 10,000 mAh bank charges a phone two or three times. Keep it topped up.",
      freeOption: "A car charger, if you have a car.",
      priority: true,
      products: [
        { name: "10,000 mAh power bank", tier: "budget", priceBand: "£12 to £25" },
        { name: "20,000 mAh power bank", tier: "standard", priceBand: "£25 to £45" },
      ],
    },
    ...(d >= 7 || h.medicalNeeds
      ? [
          {
            id: "powerstation",
      search: "portable power station",
            category: "Power and light",
            item: "Portable power station and folding solar panel",
            quantity: 1,
            unit: "",
            basis: h.medicalNeeds
              ? "Included because someone relies on medical equipment. Ask the equipment supplier what it draws before choosing a size."
              : "Included because you are planning for 7 days or more. It runs a router, a fridge for medication, or several phones through a cut that long. Optional.",
            products: [
              { name: "Jackery Explorer, small model", tier: "standard", url: "https://uk.jackery.com/collections/portable-power-station", priceBand: "£200 to £500" },
              { name: "Jackery SolarSaga folding panel", tier: "standard", url: "https://uk.jackery.com/collections/solar-panel", priceBand: "£150 to £300" },
            ],
          } satisfies KitLine,
        ]
      : []),
    {
      id: "radio",
      search: "wind up radio",
      category: "Communication",
      item: "Battery or wind-up radio",
      quantity: 1,
      unit: "",
      basis: "Local radio is where the updates are when data is down. Many models also charge a phone.",
      priority: true,
      products: [
        { name: "Wind-up and solar radio with torch", tier: "budget", priceBand: "£15 to £30" },
        { name: "DAB and FM battery radio", tier: "standard", priceBand: "£30 to £60" },
      ],
    },
    {
      id: "contacts",
      category: "Communication",
      item: "Paper list of contacts and numbers",
      quantity: 1,
      unit: "",
      basis: "Family, neighbours, GP, 105 for power cuts, your water company, insurer. Written down, on the fridge.",
      freeOption: "A sheet of paper. Free.",
      priority: true,
    },
    {
      id: "firstaid",
      search: "first aid kit",
      category: "First aid and medication",
      item: "First aid kit",
      quantity: 1,
      unit: "",
      basis: "Plasters, dressings, bandages, antiseptic, tape, scissors, tweezers, gloves. Check dates yearly.",
      freeOption: "Gather what is already in the bathroom cabinet into one box.",
      priority: true,
      products: [{ name: "Standard home first aid kit", tier: "budget", priceBand: "£8 to £20" }],
    },
    {
      id: "otc",
      search: "paracetamol",
      category: "First aid and medication",
      item: "Paracetamol, ibuprofen, rehydration sachets",
      quantity: ceil(people / 2),
      unit: "packs of each",
      basis: `Enough for ${people} ${people === 1 ? "person" : "people"}. Children's versions if you have children.`,
      products: [{ name: "Own-brand painkillers and rehydration sachets", tier: "budget", priceBand: "£1 to £4 a pack" }],
    },
    {
      id: "prescriptions",
      category: "First aid and medication",
      item: "Buffer of regular prescriptions",
      quantity: h.medicalNeeds || d >= 14 ? 28 : 14,
      unit: "extra days' supply",
      basis: `${
        h.medicalNeeds
          ? "28 days, because someone relies on regular prescriptions."
          : d >= 14
            ? "28 days, because you are planning for 14 days or more."
            : "14 days while you plan for under 14 days of cover. It goes up to 28 at 14 days or more."
      } Ask your GP or pharmacist to reorder a few days early each time. Builds up without anyone going without.`,
      freeOption: "Free on prescription. Ask your GP or pharmacist.",
      priority: true,
    },
    {
      id: "lenses",
      category: "First aid and medication",
      item: "A pair of glasses, even if you normally wear contact lenses",
      quantity: 1,
      unit: "pair, plus a week of lenses and a bottle of solution if you wear them",
      basis: "Contact lenses need clean hands, clean water and a steady supply, and all three can run short at once. A pair of glasses does not. An old prescription beats none.",
      freeOption: "Your last pair of glasses, kept with the kit.",
      priority: true,
      search: "contact lens solution",
    },
    {
      id: "loo",
      search: "toilet roll",
      category: "Sanitation",
      item: "Toilet roll",
      quantity: ceil((people * d) / 3),
      unit: "rolls beyond normal",
      basis: "About a roll per person every three days.",
    },
    {
      id: "wipes",
      search: "wet wipes",
      category: "Sanitation",
      item: "Wet wipes and hand sanitiser",
      quantity: ceil(d / 3),
      unit: "packs of wipes plus one sanitiser",
      basis: "For when the water is off.",
      products: [{ name: "Own-brand wipes and sanitiser", tier: "budget", priceBand: "£1 to £3 each" }],
    },
    {
      id: "gel",
      category: "Sanitation",
      item: "Alcohol hand gel",
      quantity: Math.max(1, ceil(people / 2)),
      unit: "bottles, at least 60% alcohol",
      basis: "For when the water is off, and for anything infectious going round. One per two people.",
      products: [{ name: "Own-brand hand gel, 60% alcohol or more", tier: "budget", priceBand: "£1 to £3" }],
      search: "hand sanitiser gel",
    },
    {
      id: "masks",
      category: "Sanitation",
      item: "Face masks (FFP2)",
      quantity: Math.max(1, ceil((people * Math.min(d, 7)) / 10)),
      unit: "packs of 10",
      basis: "Useful in a smoke or dust event too, and if someone at home is ill and the pharmacy is shut. FFP2 filters far better than a cloth or surgical mask.",
      products: [{ name: "FFP2 masks, box of 10 or 20", tier: "budget", priceBand: "£5 to £12" }],
      search: "ffp2 face masks",
    },
    {
      id: "binbags",
      search: "bin bags",
      category: "Sanitation",
      item: "Strong bin bags",
      quantity: 1,
      unit: "roll",
      basis: "Waste, and an emergency toilet liner if flushing is impossible.",
    },
    {
      id: "warmth",
      search: "fleece blanket",
      category: "Warmth",
      item: "Blankets or sleeping bags",
      quantity: people,
      unit: "",
      basis: "One per person, for a cold cut. Plus hats, gloves and a hot-water bottle.",
      freeOption: "Most homes already have enough bedding. Count what you have before you buy more.",
    },
    {
      id: "cash",
      category: "Cash and documents",
      item: "Cash in small notes",
      quantity: 40 + 20 * (people - 1),
      unit: "pounds, roughly",
      basis: "Enough for a couple of days of essentials if card machines and cash points are down.",
      priority: true,
    },
    {
      id: "documents",
      category: "Cash and documents",
      item: "Copies of ID, insurance and prescriptions",
      quantity: 1,
      unit: "set, in a waterproof folder",
      basis: "Paper and on a phone. Kept where you can grab it.",
      freeOption: "Photocopies or photos. Free.",
    },
    ...(h.babies > 0
      ? [
          {
            id: "nappies",
      search: "nappies",
            category: "Babies",
            item: "Nappies",
            quantity: 6 * h.babies * d,
            unit: "nappies",
            basis: `Six a day for ${h.babies} ${h.babies === 1 ? "baby" : "babies"} over ${daysLabel(d)}.`,
            products: [{ name: "Own-brand nappies, large pack", tier: "budget", priceBand: "£5 to £10" }],
          } satisfies KitLine,
          {
            id: "formula",
      search: "ready to feed formula",
            category: "Babies",
            item: "Ready-to-feed formula (if bottle feeding)",
            quantity: 4 * h.babies * d,
            unit: "200 ml cartons",
            basis: "Ready-to-feed needs no water or heating. Skip if breastfeeding or past formula.",
          } satisfies KitLine,
          {
            id: "babywipes",
      search: "baby wipes",
            category: "Babies",
            item: "Baby wipes",
            quantity: ceil(d / 2) * h.babies,
            unit: "packs",
            basis: "One pack every two days per baby.",
          } satisfies KitLine,
        ]
      : []),
    ...(h.children > 0
      ? [
          {
            id: "kids",
            category: "Children",
            item: "Something to do without power",
            quantity: 1,
            unit: "box of cards, games, books, crayons",
            basis: "A dark evening is much easier with a plan for it.",
            freeOption: "What you already own, put in one place.",
          } satisfies KitLine,
        ]
      : []),
    ...(h.dogs + h.cats > 0
      ? [
          {
            id: "petfood",
      search: "dog food",
            category: "Pets",
            item: "Pet food",
            quantity: d,
            unit: `${d === 1 ? "day" : "days"} of usual food for ${h.dogs + h.cats} ${h.dogs + h.cats === 1 ? "animal" : "animals"}`,
            basis: "Plus any medication, a carrier, and a recent photo. Water is counted in the household total.",
          } satisfies KitLine,
        ]
      : []),
    ...(h.over65 > 0
      ? [
          {
            id: "hearing",
      search: "hearing aid batteries",
            category: "Older household members",
            item: "Spare hearing-aid batteries and mobility-aid chargers",
            quantity: 1,
            unit: "set, if used",
            basis: "Small and cheap. Keep spares.",
          } satisfies KitLine,
        ]
      : []),
  ];

  const tasks: KitTask[] = [
    { id: "psr", text: "Register with the Priority Services Register if anyone is older, disabled, has young children or relies on medical equipment.", url: "https://www.thepsr.co.uk/", linkText: "Priority Services Register" },
    { id: "flood", text: "Sign up for flood warnings for your postcode.", url: "https://www.gov.uk/sign-up-for-flood-warnings", linkText: "Flood warnings" },
    { id: "alerts", text: "Check your phone can receive Emergency Alerts.", url: "https://www.gov.uk/alerts", linkText: "Emergency Alerts" },
    { id: "plan", text: "Agree a check-in plan: who calls whom, and one out-of-area contact everyone can reach." },
    { id: "neighbours", text: "Learn two neighbours' names and numbers. Write them on the contacts sheet." },
    ...(h.homeType === "flat" ? [{ id: "lifts", text: "Know the stairs. Lifts stop in a power cut; plan for carrying water and shopping up." }] : []),
    ...(oneTinDays ? [{ id: "rotate", text: "Eat from your stores and replace what you use, oldest first, so nothing goes out of date." }] : []),
    ...(h.medicalNeeds ? [{ id: "equipment", text: "Keep a paper copy of instructions for any medical equipment and ask the supplier about battery backup." }] : []),
  ];

  return { lines, tasks };
}

/**
 * What the grab bag list says about its own numbers, for any page that shows
 * it. The same words open the list's first line.
 */
export const GRAB_BAG_NOTE =
  "Quantities on this list are the site's planning figures, based on gov.uk's list of supplies to keep in a bag in case you are asked to leave home quickly. If you are escaping a fire, never stop to take anything: get out, stay out and call 999.";

/**
 * The grab bag: one bag per person who can carry one, packed for 3 days.
 * Per person unless the line says household. Lines have ids of their own
 * (gb-...), so a torch ticked at home does not tick the one in the bag.
 */
export function buildGrabBag(h: Household): { lines: KitLine[]; tasks: KitTask[] } {
  const carriers = Math.max(1, h.adults + h.children);
  const people = h.adults + h.children + h.babies;
  const animals = h.dogs + h.cats;
  const days = 3;
  const firstDayWater = 3 * carriers + 2 * h.babies;
  const each = (n: number) => `${n} ${n === 1 ? "person" : "people"}`;

  const lines: KitLine[] = [
    {
      id: "gb-bag",
      search: "rucksack backpack",
      category: "The bag",
      item: "Rucksack",
      quantity: carriers,
      unit: carriers === 1 ? "bag" : "bags, one per person",
      basis: `One per person who can carry one: ${each(carriers)}. A child under 5 can share an adult's bag, so take one off for each, and babies' things go in an adult's bag. ${GRAB_BAG_NOTE}`,
      freeOption: "A school bag or any rucksack you already own.",
      priority: true,
    },
    {
      id: "gb-clothes",
      category: "The bag",
      item: "A change of clothes, spare glasses, keys and a phone charger",
      quantity: people,
      unit: people === 1 ? "set" : "sets, one per person",
      basis: "Warm layers and socks for each person. Pack the clothes now; the glasses, keys and charger go in on your way out.",
      freeOption: "All of it is already at home.",
    },
    {
      id: "gb-multitool",
      search: "multi tool non locking",
      category: "The bag",
      item: "Multi-tool",
      quantity: 1,
      unit: "for the household",
      basis: "One per household, in an adult's bag. Choose one whose blade folds, does not lock and is under 3 inches: UK law restricts carrying other blades in public without a good reason.",
      freeOption: "One you already own, if it fits that rule.",
    },
    {
      id: "gb-water",
      search: "still water 1.5l",
      category: "Water",
      item: "Bottled drinking water",
      quantity: Math.ceil(firstDayWater / 1.5),
      unit: "bottles of 1.5 litres",
      basis: `${firstDayWater} litres: 3 litres per person for the first day, the World Health Organisation figure quoted by gov.uk${h.babies ? ", plus water for making up feeds" : ""}. Water is heavy, so this covers one day and the filter bottles cover the next two.`,
      freeOption: "Tap water in bottles you already have, changed every few months.",
      priority: true,
    },
    {
      id: "gb-filter-bottle",
      search: "water filter bottle",
      category: "Water",
      item: "Water bottle with a built-in filter",
      quantity: carriers,
      unit: carriers === 1 ? "bottle" : "bottles, one per person",
      basis: "One per person, so you can refill from a tap, a shop or a stream once the bottled water runs out. Check what the maker says it removes.",
      freeOption: "An ordinary bottle, and boiled water wherever you can get it.",
    },
    {
      id: "gb-food",
      search: "cereal bars multipack",
      category: "Food",
      item: "Food that needs no cooking",
      quantity: days,
      unit: `days' worth for ${carriers} (food bars, nuts, tinned fruit with a ring pull)`,
      basis: `${days} days per person, with no cooking and no tin opener needed. Pick things everyone will eat, and check the dates when you check the bag.`,
      freeOption: "Take some from the cupboard, and replace it when you shop.",
      priority: true,
    },
    {
      id: "gb-blanket",
      search: "foil emergency blanket",
      category: "Warmth",
      item: "Foil emergency blanket",
      quantity: people,
      unit: people === 1 ? "blanket" : "blankets, one each",
      basis: "One each, babies included. They weigh almost nothing and fold small.",
    },
    {
      id: "gb-poncho",
      search: "rain poncho",
      category: "Warmth",
      item: "Rain poncho",
      quantity: carriers,
      unit: carriers === 1 ? "poncho" : "ponchos, one each",
      basis: "One each. Staying dry is most of staying warm. A poncho also fits over a rucksack.",
      freeOption: "A waterproof coat you already own, packed or worn.",
    },
    {
      id: "gb-torch",
      search: "led head torch",
      category: "Power and light",
      item: "Head torch",
      quantity: carriers,
      unit: carriers === 1 ? "" : "one per person",
      basis: "One per person who can hold one. It leaves hands free for bags and children.",
      freeOption: "A torch from the home kit, if you will not need it there.",
      productsFrom: "torch",
      priority: true,
    },
    {
      id: "gb-batteries",
      search: "aa batteries",
      category: "Power and light",
      item: "Spare batteries for the torches and radio",
      quantity: 1,
      unit: "pack of 4, for the household",
      basis: "One spare set per household. Alkaline keeps for years; check the date when you check the bag.",
      productsFrom: "batteries",
    },
    {
      id: "gb-powerbank",
      search: "power bank 10000mah",
      category: "Power and light",
      item: "Power bank and charging cables",
      quantity: 1,
      unit: "for the household, kept charged",
      basis: "One per household. A 10,000 mAh bank charges a phone two or three times. Top it up when you check the bag.",
      productsFrom: "powerbank",
      priority: true,
    },
    {
      id: "gb-firstaid",
      search: "small first aid kit travel",
      category: "First aid and medication",
      item: "Small first aid kit",
      quantity: carriers,
      unit: carriers === 1 ? "kit" : "kits, one per bag",
      basis: "One per bag: plasters, dressings, antiseptic wipes, tape and gloves, with paracetamol for adults.",
      freeOption: "Make one up from the bathroom cabinet in a sandwich bag.",
    },
    {
      id: "gb-meds",
      category: "First aid and medication",
      item: "A week of each person's medication",
      quantity: 7,
      unit: "days' supply, for each person who takes regular medication",
      basis: "Prescriptions, inhalers and allergy treatment, with a copy of each prescription so a pharmacy elsewhere can help.",
      freeOption: "Ask your GP or pharmacist to reorder a few days early each time until you are a week ahead.",
      priority: true,
    },
    {
      id: "gb-radio",
      search: "wind up radio",
      category: "Communication",
      item: "Wind-up or battery radio",
      quantity: 1,
      unit: "for the household",
      basis: "One per household. Local radio carries the news about where to go and when you can go home.",
      productsFrom: "radio",
    },
    {
      id: "gb-whistle",
      search: "safety whistle",
      category: "Communication",
      item: "Whistle",
      quantity: carriers,
      unit: carriers === 1 ? "" : "one per person",
      basis: "One per person, clipped to the bag strap. A whistle carries further than a voice and takes less breath.",
    },
    {
      id: "gb-contacts",
      category: "Communication",
      item: "Paper list of contacts and numbers",
      quantity: 1,
      unit: "for the household",
      basis: "Your phone may be flat or lost. Family, your out-of-area contact, GP and insurer, written down.",
      freeOption: "A sheet of paper. Free.",
    },
    {
      id: "gb-cash",
      category: "Cash and documents",
      item: "Cash in small notes",
      quantity: 40 + 20 * (people - 1),
      unit: "pounds, roughly, for the household",
      basis: "For food, travel or a phone top-up if card machines are down where you end up.",
      priority: true,
    },
    {
      id: "gb-documents",
      category: "Cash and documents",
      item: "Copies of ID, insurance and prescriptions",
      quantity: 1,
      unit: "set, in a waterproof wallet",
      basis: "One set per household. Proof of who you are and what you own helps with your insurer, and with the council if you need somewhere to stay.",
      freeOption: "Photocopies or photos. Free.",
    },
    ...(h.babies > 0
      ? [
          {
            id: "gb-nappies",
            search: "nappies",
            category: "Babies",
            item: "Nappies",
            quantity: 6 * h.babies * days,
            unit: "nappies",
            basis: `Six a day for ${h.babies} ${h.babies === 1 ? "baby" : "babies"} over ${daysLabel(days)}, in an adult's bag.`,
          } satisfies KitLine,
          {
            id: "gb-formula",
            search: "ready to feed formula",
            category: "Babies",
            item: "Ready-to-feed formula (if bottle feeding)",
            quantity: 4 * h.babies * days,
            unit: "200 ml cartons",
            basis: "Ready-to-feed needs no water or heating. Pack a clean bottle with it. Skip if breastfeeding or past formula.",
          } satisfies KitLine,
          {
            id: "gb-babywipes",
            search: "baby wipes",
            category: "Babies",
            item: "Baby wipes",
            quantity: h.babies,
            unit: h.babies === 1 ? "pack" : "packs",
            basis: "One pack per baby.",
          } satisfies KitLine,
        ]
      : []),
    ...(animals > 0
      ? [
          {
            id: "gb-pets",
            search: "pet travel carrier",
            category: "Pets",
            item: "Pet food, lead and carrier",
            quantity: days,
            unit: `days of usual food for ${animals} ${animals === 1 ? "animal" : "animals"}`,
            basis: "Plus any medication, a little extra water, and a recent photo in case you are separated.",
          } satisfies KitLine,
        ]
      : []),
    ...(h.over65 > 0
      ? [
          {
            id: "gb-hearing",
            search: "hearing aid batteries",
            category: "Older household members",
            item: "Spare hearing-aid batteries and mobility-aid chargers",
            quantity: 1,
            unit: "set, if used",
            basis: "Small, cheap, and the thing that is missing when it matters.",
          } satisfies KitLine,
        ]
      : []),
  ];

  const tasks: KitTask[] = [
    { id: "gb-fire", text: "If you are escaping a fire, leave the bag. Get out, stay out and call 999." },
    { id: "gb-place", text: "Keep the bags where you can reach them on the way out, not in the loft or the shed." },
    { id: "gb-where", text: "Agree where you would go, such as a friend or relative out of the area, and how you would get there." },
    { id: "gb-check", text: "Check the bags every six months: food dates, batteries, medication and children's clothes sizes." },
    { id: "flood", text: "Sign up for flood warnings for your postcode.", url: "https://www.gov.uk/sign-up-for-flood-warnings" },
    { id: "alerts", text: "Check your phone can receive Emergency Alerts.", url: "https://www.gov.uk/alerts" },
  ];

  return { lines, tasks };
}

/**
 * Builds an Amazon UK add-to-basket URL for a set of ASINs and quantities.
 * Returns null when the list is empty.
 */
export function amazonBasketUrl(items: { asin: string; quantity: number }[], tag?: string): string | null {
  if (items.length === 0) return null;
  const params = items.map((it, i) => `ASIN.${i + 1}=${encodeURIComponent(it.asin)}&Quantity.${i + 1}=${Math.max(1, it.quantity)}`);
  const tagParam = tag ? `&AssociateTag=${encodeURIComponent(tag)}` : "";
  return `https://www.amazon.co.uk/gp/aws/cart/add.html?${params.join("&")}${tagParam}`;
}

/**
 * Parses planner state from URL search params (server or client).
 *
 * With a `list` param, days are clamped to that list's range and a missing
 * `d` takes the list's default; 72 hours and the grab bag are always 3.
 * Without one, days run from MIN_DAYS to MAX_DAYS.
 */
export function householdFromParams(q: Record<string, string | string[] | undefined>): Household | null {
  if (!Object.keys(q).length) return null;
  const get = (k: string) => {
    const v = q[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const n = (k: string, d: number) => {
    const v = parseInt(get(k) ?? "", 10);
    return Number.isFinite(v) ? Math.max(0, Math.min(12, v)) : d;
  };
  const rawList = get("list");
  const list = isListSlug(rawList) ? rawList : undefined;
  // Days has its own range, checked before anything else clamps it: the
  // 0 to 12 clamp above once turned a shared 14-day link into 12.
  const rawDays = parseInt(get("d") ?? "", 10);
  const days = list
    ? clampDaysForList(list, Number.isFinite(rawDays) ? rawDays : Number.NaN)
    : Number.isFinite(rawDays)
      ? clampDays(rawDays)
      : defaultHousehold.days;
  return {
    adults: Math.max(1, n("a", 2)),
    children: n("c", 0),
    babies: n("b", 0),
    over65: n("e", 0),
    dogs: n("dogs", 0),
    cats: n("cats", 0),
    medicalNeeds: get("med") === "1",
    homeType: get("home") === "flat" ? "flat" : "house",
    days,
    ...(list ? { list } : {}),
    ...(get("t") === "budget" || get("t") === "premium" ? { tier: get("t") as "budget" | "premium" } : {}),
  };
}

/** Writes planner state to a query string. householdFromParams reads it back. */
export function householdToQuery(h: Household): string {
  const q = new URLSearchParams({
    ...(h.list ? { list: h.list } : {}),
    a: String(h.adults),
    c: String(h.children),
    b: String(h.babies),
    e: String(h.over65),
    dogs: String(h.dogs),
    cats: String(h.cats),
    med: h.medicalNeeds ? "1" : "0",
    home: h.homeType,
    d: String(h.list ? clampDaysForList(h.list, h.days) : h.days),
    ...(h.tier ? { t: h.tier } : {}),
  });
  return `?${q.toString()}`;
}

export type Retailer = {
  id: "amazon" | "tesco" | "sainsburys" | "asda" | "morrisons" | "ocado" | "waitrose" | "aldi";
  name: string;
  /** Builds a search URL for one item. */
  search: (q: string) => string;
  /** Plain note on what the link can and cannot do. */
  note: string;
};

const enc = (q: string) => encodeURIComponent(q);

export const retailers: Retailer[] = [
  { id: "amazon", name: "Amazon", search: (q) => `https://www.amazon.co.uk/s?k=${enc(q)}`, note: "Everything on the list is here, and you can send every listed product to one Amazon basket." },
  { id: "tesco", name: "Tesco", search: (q) => `https://www.tesco.com/groceries/en-GB/search?query=${enc(q)}`, note: "Groceries, batteries, torches and first aid. No power banks or radios." },
  { id: "sainsburys", name: "Sainsbury's", search: (q) => `https://www.sainsburys.co.uk/gol-ui/SearchResults/${enc(q)}`, note: "Groceries, batteries and first aid." },
  { id: "asda", name: "Asda", search: (q) => `https://groceries.asda.com/search/${enc(q)}`, note: "Groceries, batteries, torches and some electricals." },
  { id: "morrisons", name: "Morrisons", search: (q) => `https://groceries.morrisons.com/search?entry=${enc(q)}`, note: "Groceries, batteries and first aid." },
  { id: "ocado", name: "Ocado", search: (q) => `https://www.ocado.com/search?entry=${enc(q)}`, note: "Groceries and household." },
  { id: "waitrose", name: "Waitrose", search: (q) => `https://www.waitrose.com/ecom/shop/search?&searchTerm=${enc(q)}`, note: "Groceries and household." },
  { id: "aldi", name: "Aldi", search: (q) => `https://www.aldi.co.uk/search?text=${enc(q)}`, note: "Aldi does not deliver groceries in the UK. Use this list in store, or check Specialbuys for torches and power banks." },
];
