/**
 * Quantity rules for the Build Your Kit planner.
 *
 * Inputs describe the household; the rules turn them into a shopping list
 * with realistic quantities. Figures follow prepare.campaign.gov.uk where it
 * gives one (3 litres of drinking water per person per day) and the site's
 * checklist elsewhere. Everything is a planning figure, rounded up.
 */

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
  /** Days of cover to plan for. */
  days: 3 | 7 | 14;
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
  /** True for the nine things to get first. */
  priority?: boolean;
};

export type KitTask = {
  id: string;
  text: string;
  url?: string;
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

export function buildKit(h: Household): { lines: KitLine[]; tasks: KitTask[] } {
  const people = h.adults + h.children + h.babies;
  const peopleWhoDrink = h.adults + h.children;
  const d = h.days;

  const water = 3 * peopleWhoDrink * d + (h.babies > 0 ? 2 * h.babies * d : 0);
  const waterPacks = ceil(water / 9); // six 1.5 litre bottles

  const lines: KitLine[] = [
    {
      id: "water",
      category: "Water",
      item: "Bottled drinking water",
      quantity: waterPacks,
      unit: "six-packs of 1.5 litre bottles",
      basis: `${water} litres: 3 litres per person per day for ${peopleWhoDrink} ${peopleWhoDrink === 1 ? "person" : "people"} over ${d} days${h.babies ? `, plus water for making up feeds` : ""}. The gov.uk figure.`,
      freeOption: "Refilled, clearly labelled bottles from the tap, rotated every few months, cost nothing.",
      priority: true,
      products: [
        { name: "Supermarket own-brand still water, 6 x 1.5 L", tier: "budget", priceBand: "£1 to £2 a pack" },
        { name: "10 litre water container with tap", tier: "standard", priceBand: "£8 to £15" },
      ],
    },
    {
      id: "water-extra",
      category: "Water",
      item: "Containers for washing and flushing water",
      quantity: h.homeType === "flat" ? 1 : 2,
      unit: "large lidded containers or buckets",
      basis: "Filled from the tap when a cut is announced. Up to 10 litres per person per day covers cooking and hygiene.",
      freeOption: "A filled bath, and any clean bucket or large pan you already own.",
    },
    {
      id: "purify",
      category: "Water",
      item: "Water purification tablets",
      quantity: 1,
      unit: "pack",
      basis: "One pack treats far more than a household needs. Boiling for one minute does the same job if you can heat water.",
      freeOption: "A pan and a heat source.",
      products: [{ name: "Chlorine or chlorine dioxide tablets, 30 to 50 pack", tier: "budget", priceBand: "£5 to £10" }],
    },
    {
      id: "tins",
      category: "Food",
      item: "Tinned or jarred meals and vegetables",
      quantity: 2 * peopleWhoDrink * d,
      unit: "tins",
      basis: `Two tins per person per day for ${d} days. Beans, soup, fish, vegetables, ready meals. Things you already eat.`,
      freeOption: "Most cupboards hold a few days already. Count what you have before buying.",
      priority: true,
      products: [{ name: "Own-brand tinned beans, soup, tuna, vegetables", tier: "budget", priceBand: "50p to £1.50 a tin" }],
    },
    {
      id: "carbs",
      category: "Food",
      item: "Pasta, rice or instant mash",
      quantity: ceil((0.1 * peopleWhoDrink * d) / 0.5),
      unit: "500 g packs",
      basis: `About 100 g per person per day. Needs cooking, so pair with the no-cook items below.`,
      products: [{ name: "Own-brand pasta or rice, 500 g to 1 kg", tier: "budget", priceBand: "£1 to £2" }],
    },
    {
      id: "nocook",
      category: "Food",
      item: "Food that needs no cooking",
      quantity: ceil(peopleWhoDrink * Math.min(d, 3)),
      unit: "days' worth (crackers, nut butter, cereal bars, tinned fruit)",
      basis: "At least two or three days of it, for a power cut. Counted separately because it is the part people forget.",
      priority: true,
    },
    {
      id: "milk",
      category: "Food",
      item: "Long-life milk or plant milk",
      quantity: ceil((0.25 * peopleWhoDrink * d)),
      unit: "1 litre cartons",
      basis: "A quarter of a litre per person per day for tea, cereal and cooking.",
      products: [{ name: "Own-brand UHT milk or oat milk", tier: "budget", priceBand: "£1 to £1.50 a litre" }],
    },
    {
      id: "oats",
      category: "Food",
      item: "Porridge oats or cereal",
      quantity: ceil((0.06 * peopleWhoDrink * d) / 1),
      unit: "kg",
      basis: "About 60 g per person per breakfast.",
    },
    {
      id: "tin-opener",
      category: "Food",
      item: "Manual tin opener",
      quantity: 1,
      unit: "",
      basis: "One. Easy to forget, hard to do without.",
      freeOption: "Check the drawer first.",
      priority: true,
      products: [{ name: "Basic manual tin opener", tier: "budget", priceBand: "£2 to £6" }],
    },
    {
      id: "torch",
      category: "Power and light",
      item: "Torches or head torches",
      quantity: people - h.babies,
      unit: "",
      basis: "One per person who can hold one. Head torches leave hands free.",
      freeOption: "Phones work for an evening. They do not work for three.",
      priority: true,
      products: [
        { name: "LED torch, AA batteries", tier: "budget", priceBand: "£3 to £8" },
        { name: "LED head torch", tier: "standard", priceBand: "£8 to £20" },
      ],
    },
    {
      id: "batteries",
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
      category: "Power and light",
      item: "Battery lantern",
      quantity: h.homeType === "flat" ? 1 : 2,
      unit: "",
      basis: "One for the room everyone gathers in. Safer and brighter than candles.",
      products: [{ name: "LED camping lantern", tier: "budget", priceBand: "£8 to £20" }],
    },
    {
      id: "powerbank",
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
            category: "Power and light",
            item: "Portable power station and folding solar panel",
            quantity: 1,
            unit: "",
            basis: h.medicalNeeds
              ? "Included because someone relies on medical equipment. Ask the equipment supplier what it draws before choosing a size."
              : "Included for a week or more of cover. Runs a router, a fridge for medication, or several phones through long cuts. Optional.",
            products: [
              { name: "Jackery Explorer, small model", tier: "standard", url: "https://uk.jackery.com/collections/portable-power-station", priceBand: "£200 to £500" },
              { name: "Jackery SolarSaga folding panel", tier: "standard", url: "https://uk.jackery.com/collections/solar-panel", priceBand: "£150 to £300" },
            ],
          } satisfies KitLine,
        ]
      : []),
    {
      id: "radio",
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
      unit: "days beyond what you normally hold",
      basis: "Ask your GP or pharmacist to reorder a few days early each time. Builds up without anyone going without.",
      freeOption: "Free on prescription. It is a conversation, not a purchase.",
      priority: true,
    },
    {
      id: "loo",
      category: "Sanitation",
      item: "Toilet roll",
      quantity: ceil((people * d) / 3),
      unit: "rolls beyond normal",
      basis: "About a roll per person every three days.",
    },
    {
      id: "wipes",
      category: "Sanitation",
      item: "Wet wipes and hand sanitiser",
      quantity: ceil(d / 3),
      unit: "packs of wipes plus one sanitiser",
      basis: "For when the water is off.",
      products: [{ name: "Own-brand wipes and sanitiser", tier: "budget", priceBand: "£1 to £3 each" }],
    },
    {
      id: "binbags",
      category: "Sanitation",
      item: "Strong bin bags",
      quantity: 1,
      unit: "roll",
      basis: "Waste, and an emergency toilet liner if flushing is impossible.",
    },
    {
      id: "warmth",
      category: "Warmth",
      item: "Blankets or sleeping bags",
      quantity: people,
      unit: "",
      basis: "One per person, for a cold cut. Plus hats, gloves and a hot-water bottle.",
      freeOption: "Most homes already have enough bedding. Count it.",
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
            category: "Babies",
            item: "Nappies",
            quantity: 6 * h.babies * d,
            unit: "nappies",
            basis: `Six a day for ${h.babies} ${h.babies === 1 ? "baby" : "babies"} over ${d} days.`,
            products: [{ name: "Own-brand nappies, large pack", tier: "budget", priceBand: "£5 to £10" }],
          } satisfies KitLine,
          {
            id: "formula",
            category: "Babies",
            item: "Ready-to-feed formula (if bottle feeding)",
            quantity: 4 * h.babies * d,
            unit: "200 ml cartons",
            basis: "Ready-to-feed needs no water or heating. Skip if breastfeeding or past formula.",
          } satisfies KitLine,
          {
            id: "babywipes",
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
            category: "Pets",
            item: "Pet food",
            quantity: d,
            unit: `days of usual food for ${h.dogs + h.cats} ${h.dogs + h.cats === 1 ? "animal" : "animals"}`,
            basis: "Plus any medication, a carrier, and a recent photo. Water is counted in the household total.",
          } satisfies KitLine,
        ]
      : []),
    ...(h.over65 > 0
      ? [
          {
            id: "hearing",
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
    { id: "psr", text: "Register with the Priority Services Register if anyone is older, disabled, has young children or relies on medical equipment.", url: "https://www.thepsr.co.uk/" },
    { id: "flood", text: "Sign up for flood warnings for your postcode.", url: "https://www.gov.uk/sign-up-for-flood-warnings" },
    { id: "alerts", text: "Check your phone can receive Emergency Alerts.", url: "https://www.gov.uk/alerts" },
    { id: "plan", text: "Agree a check-in plan: who calls whom, and one out-of-area contact everyone can reach." },
    { id: "neighbours", text: "Learn two neighbours' names and numbers. Write them on the contacts sheet." },
    ...(h.homeType === "flat" ? [{ id: "lifts", text: "Know the stairs. Lifts stop in a power cut; plan for carrying water and shopping up." }] : []),
    ...(h.medicalNeeds ? [{ id: "equipment", text: "Keep a paper copy of instructions for any medical equipment and ask the supplier about battery backup." }] : []),
  ];

  return { lines, tasks };
}

/**
 * Builds an Amazon UK add-to-basket URL for every line that has a verified
 * ASIN. Returns null when nothing has an ASIN yet.
 */
export function amazonBasketUrl(lines: KitLine[], have: Set<string>, tag?: string): string | null {
  const params: string[] = [];
  let n = 1;
  for (const line of lines) {
    if (have.has(line.id)) continue;
    const p = line.products?.find((x) => x.asin);
    if (!p?.asin) continue;
    params.push(`ASIN.${n}=${encodeURIComponent(p.asin)}&Quantity.${n}=${Math.max(1, line.quantity)}`);
    n++;
  }
  if (params.length === 0) return null;
  const tagParam = tag ? `&AssociateTag=${encodeURIComponent(tag)}` : "";
  return `https://www.amazon.co.uk/gp/aws/cart/add.html?${params.join("&")}${tagParam}`;
}

/** Parses planner state from URL search params (server or client). */
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
  const days = n("d", 3);
  return {
    adults: Math.max(1, n("a", 2)),
    children: n("c", 0),
    babies: n("b", 0),
    over65: n("e", 0),
    dogs: n("dogs", 0),
    cats: n("cats", 0),
    medicalNeeds: get("med") === "1",
    homeType: get("home") === "flat" ? "flat" : "house",
    days: days === 7 || days === 14 ? days : 3,
  };
}
