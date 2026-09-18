export type ProductLink = {
  /** Product or maker name as shown to the reader. */
  name: string;
  /** Link to the maker's own site, never a retailer or affiliate link. */
  url: string;
  /** Why it is listed: what it does, who it suits. */
  note: string;
};

export type ChecklistItem = {
  item: string;
  /** Realistic quantity for a household, phrased as a planning figure. */
  amount: string;
  /** Shelf life, rotation, or a practical note. */
  notes: string;
  /** True for the handful of items to get first if starting from nothing. */
  priority?: boolean;
  /**
   * Optional examples of specific products. Rules: link to the maker's own
   * site, no retailer or affiliate links, and only things that have actually
   * been used. Absence of a link never means an item is unimportant.
   */
  products?: ProductLink[];
};

export type ChecklistCategory = {
  slug: string;
  title: string;
  /** One or two sentences: why this category matters and what it covers. */
  intro: string;
  items: ChecklistItem[];
};

// Quantities are conservative planning figures from public guidance (gov.uk,
// Red Cross, FEMA), not worst-case numbers. Keep in sync with the table in
// public/offline/index.html.
export const checklist: ChecklistCategory[] = [
  {
    slug: "water",
    title: "Water",
    intro:
      "The one thing you cannot go without for long, and the one most people have none of stored. A few days' worth takes up less room than you think.",
    items: [
      {
        item: "Drinking water",
        amount: "2.5 to 3 litres per person per day to drink; 3 days as a minimum",
        notes:
          "The figure gov.uk now uses, from the World Health Organisation. Roughly 9 litres per person covers the 3-day minimum. Sealed bottled water keeps for years; rotate every 6 to 12 months.",
        priority: true,
      },
      {
        item: "Water for pets, cooking, and washing",
        amount: "Up to 10 litres per person per day in total if space allows",
        notes:
          "Optional. Ten litres a day is the gov.uk figure for drinking plus basic cooking and hygiene. A filled bath or bucket before a planned cut covers flushing without using drinking stock.",
      },
      {
        item: "A way to make water safe",
        amount: "Purification tablets or a small filter, or just a pan and a heat source",
        notes:
          "A rolling boil for one minute makes water safe to drink. Tablets are cheap and last years.",
      },
    ],
  },
  {
    slug: "food",
    title: "Food",
    intro:
      "Built up gradually from things your household already eats. Nothing here should need cooking, and nothing should be new to you.",
    items: [
      {
        item: "Shelf-stable staples",
        amount: "3 to 7 days per person to start",
        notes:
          "Tinned fish, beans, soup, and vegetables; dried pasta, rice, oats; nut butter; crackers; long-life milk. Rotate stock and buy one extra each week rather than a single big shop.",
        priority: true,
      },
      {
        item: "Food that needs no cooking",
        amount: "At least a day or two of it within the above",
        notes:
          "Matters in a power cut. Tinned fruit, crackers and nut butter, cereal bars, and ready-to-eat tins.",
      },
      {
        item: "A manual tin opener",
        amount: "One",
        notes: "Easy to forget and hard to do without.",
        priority: true,
      },
      {
        item: "A way to heat food without mains power",
        amount: "Optional: a gas hob, or a camping stove used outdoors only",
        notes:
          "Never use a camping stove, barbecue, or generator indoors. Carbon monoxide is the leading cause of outage-related deaths.",
      },
    ],
  },
  {
    slug: "power-and-light",
    title: "Power and light",
    intro:
      "The difference between a power cut being a nuisance and being frightening, especially for children.",
    items: [
      {
        item: "Torches",
        amount: "One per household as a minimum; ideally one per person",
        notes:
          "Head torches leave your hands free. Store one where you can find it in the dark.",
        priority: true,
      },
      {
        item: "Spare batteries",
        amount: "One full change for each torch and the radio",
        notes: "Check twice a year. Alkaline batteries keep for 5 to 10 years.",
        priority: true,
      },
      {
        item: "Power bank",
        amount: "One, kept charged",
        notes:
          "A 10,000 mAh bank recharges most phones two or three times. Top it up every couple of months. A car charger is a good backup.",
        priority: true,
      },
      {
        item: "Battery lantern",
        amount: "One for a shared room",
        notes:
          "Safer and far brighter than candles, which cause house fires every year during outages.",
      },
      {
        item: "Portable power station and solar panel",
        amount: "Optional: one small station, one folding panel",
        notes:
          "A step up from a power bank for anyone who needs to run a router, a CPAP machine, a fridge for medication, or keep several phones going through a long cut. A folding panel recharges it over a day or two of daylight. These became the standard household answer to rolling power cuts in Ukraine.",
        products: [
          {
            name: "Jackery Explorer (portable power station)",
            url: "https://uk.jackery.com/collections/portable-power-station",
            note: "A lithium battery with mains sockets and USB ports. The smaller models run a phone and router for days, or a small fridge for a day.",
          },
          {
            name: "Jackery SolarSaga (folding solar panel)",
            url: "https://uk.jackery.com/collections/solar-panel",
            note: "Folds flat and plugs into the station. Slow in a British winter, but it means the station is never truly empty.",
          },
        ],
      },
    ],
  },
  {
    slug: "first-aid-and-medication",
    title: "First aid and medication",
    intro:
      "For most households, prescription medication is the single item that matters most and is hardest to replace at short notice.",
    items: [
      {
        item: "Regular prescriptions",
        amount: "A rolling buffer of 1 to 2 weeks beyond what you would normally hold",
        notes:
          "Ask your GP or pharmacist. Reorder a little earlier each time so the buffer builds without waste. Store insulin and refrigerated medicines according to their instructions.",
        priority: true,
      },
      {
        item: "Basic first aid kit",
        amount: "One standard kit",
        notes:
          "Plasters, dressings, bandages, antiseptic wipes, tape, scissors, tweezers, gloves. Check expiry dates yearly.",
        priority: true,
      },
      {
        item: "Over-the-counter basics",
        amount: "A small stock",
        notes:
          "Paracetamol and ibuprofen, antihistamines, rehydration sachets, any child-specific versions your household needs.",
      },
      {
        item: "Spare glasses or contact lenses",
        amount: "One spare set if you rely on them",
        notes: "An old prescription is far better than none.",
      },
    ],
  },
  {
    slug: "communication",
    title: "Communication and information",
    intro:
      "Knowing what is happening is half of feeling calm. Mobile networks usually keep going for a while in a power cut, but not indefinitely.",
    items: [
      {
        item: "Battery or wind-up radio",
        amount: "One per household",
        notes:
          "Local radio is the most reliable source of updates when data is down. Test it occasionally. Many models also charge a phone.",
        priority: true,
      },
      {
        item: "Paper list of key contacts",
        amount: "One copy, kept with your documents",
        notes:
          "Family, neighbours, GP, utility emergency numbers (105 for power cuts in Great Britain), your water company, insurer.",
        priority: true,
      },
      {
        item: "A simple household check-in plan",
        amount: "Agreed once, written down",
        notes:
          "Who calls whom, where you would meet if phones fail, and one out-of-area contact everyone can reach.",
      },
      {
        item: "Official alerts",
        amount: "Set up now, no kit required",
        notes:
          "Sign up for flood warnings by postcode, weather warnings, and your council's alert service if it has one.",
      },
    ],
  },
  {
    slug: "sanitation",
    title: "Sanitation and hygiene",
    intro:
      "Low cost, long shelf life, and the difference between a few days being uncomfortable or genuinely unpleasant.",
    items: [
      {
        item: "Hand sanitiser and wipes",
        amount: "A small extra stock beyond daily use",
        notes: "Useful whenever water is off or limited.",
      },
      {
        item: "Toilet paper and bin bags",
        amount: "A week's worth beyond normal",
        notes:
          "Strong bin bags double as emergency waste bags if the toilet cannot be flushed.",
      },
      {
        item: "Basic toiletries",
        amount: "One spare of each essential",
        notes: "Toothpaste, soap, sanitary products, nappies if needed.",
      },
    ],
  },
  {
    slug: "documents",
    title: "Important documents",
    intro:
      "Only matters if you have to leave in a hurry or deal with insurance afterwards. A single evening's job.",
    items: [
      {
        item: "Copies of ID, insurance, and key records",
        amount: "One set per household",
        notes:
          "Passport or driving licence, home and car insurance, prescriptions, bank contact details. Paper in a waterproof folder, or offline on a phone, or both.",
      },
      {
        item: "A grab bag if you are in a flood-risk area",
        amount: "One, kept by the door",
        notes:
          "Documents, medication, chargers, a change of clothes, a torch, and a little cash.",
      },
    ],
  },
  {
    slug: "cash",
    title: "Cash",
    intro:
      "Card terminals and cash machines need power and a network. Neither is guaranteed during a disruption.",
    items: [
      {
        item: "Small amount of cash",
        amount: "Enough for a couple of days' essentials",
        notes:
          "Small notes and some coins. Keep it with your documents rather than in a wallet you use daily.",
        priority: true,
      },
    ],
  },
  {
    slug: "household-specific",
    title: "Household-specific",
    intro:
      "The generic list stops here. Everything below depends on who actually lives with you.",
    items: [
      {
        item: "Pets",
        amount: "A week of food; water in the household total",
        notes:
          "Plus any medication, a carrier, and a photo in case you are separated. Not every emergency shelter accepts animals, so know a friend who would.",
      },
      {
        item: "Babies and young children",
        amount: "A week of formula, nappies, and wipes",
        notes:
          "Ready-to-feed formula needs no water. A few familiar toys or books make a dark evening much easier.",
      },
      {
        item: "Specific medical needs",
        amount: "Matches the household's actual needs",
        notes:
          "Powered equipment, mobility aids, dietary requirements. Register with your energy and water companies' Priority Services Register for extra support during outages.",
      },
      {
        item: "Older or disabled household members",
        amount: "Review every few months as needs change",
        notes:
          "Spare hearing-aid batteries, mobility aid chargers, and a plan for who checks in.",
      },
    ],
  },
];

/** The short list to start with if you have nothing. */
export const startingPoint = checklist.flatMap((c) =>
  c.items.filter((i) => i.priority).map((i) => ({ category: c.title, ...i })),
);
