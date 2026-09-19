export type Scenario = {
  slug: string;
  title: string;
  /** One-line description shown in lists and cards. */
  summary: string;
  /** Realistic duration range, phrased the way the offline guide phrases it. */
  typicalDuration: string;
  /** A few sentences of plain-English context: what it looks like, why it happens. */
  description: string;
  /** Concrete things that help, in priority order. */
  whatHelps: string[];
  /** Things people often worry about that matter less than they think, or common mistakes. */
  worthKnowing: string[];
  /** The mutual-aid thread: how neighbours and community fit this scenario. */
  community: string;
};

// Durations and quantities are deliberately conservative and drawn from
// public emergency-preparedness guidance (gov.uk, Red Cross, FEMA). They are
// planning figures, not guarantees. Keep this file in sync with
// public/offline/index.html.
export const scenarios: Scenario[] = [
  {
    slug: "power-outage",
    title: "Power outage",
    summary:
      "Loss of mains electricity, from a storm, grid fault, or planned load shedding.",
    typicalDuration: "Most resolve within hours; a small share last 1–3 days",
    description:
      "Power cuts are the most common disruption most households will ever experience. The usual cause is local: a fault on a line, a substation problem, or storm damage. Network operators restore the large majority within a few hours, and the long tail (a day or more) tends to follow severe weather that has damaged many lines at once. Mobile networks usually keep working for a while on backup power, but can degrade after several hours.",
    whatHelps: [
      "A torch per person and a set of spare batteries, stored somewhere you can find in the dark.",
      "A charged power bank, or a car charger, so a phone lasts through a long cut.",
      "Food that needs no cooking: crackers, tinned fish or beans, nut butter, fruit.",
      "Keeping the fridge and freezer doors shut. A closed fridge keeps food safe for about 4 hours; a full freezer for about 48 hours.",
      "A battery or wind-up radio for updates if mobile data goes down.",
      "Knowing how to report a cut. In Great Britain, 105 reaches your local network operator from any phone.",
    ],
    worthKnowing: [
      "Candles cause fires every year during outages. Torches and battery lanterns are safer and brighter.",
      "Never run a generator, camping stove, or barbecue indoors or in a garage. Carbon monoxide is the leading cause of outage-related deaths.",
      "If someone at home relies on powered medical equipment, register with your network operator's Priority Services Register now, while the power is on.",
    ],
    community:
      "Check on neighbours who are older, disabled, or live alone, especially in cold weather. If you have a gas hob and they do not, a hot drink goes a long way. A street or building group chat is often the fastest source of accurate local updates.",
  },
  {
    slug: "water-disruption",
    title: "Water supply disruption",
    summary:
      "Mains water cut off or advised unsafe to drink, such as a burst main or a contamination notice.",
    typicalDuration: "Usually under 48 hours",
    description:
      "Water disruptions come in two forms: no water at all (a burst main, a pumping failure, frozen pipes) and a 'do not drink' or 'boil water' notice after a contamination scare. Both are usually resolved within a day or two. Water companies are obliged to provide alternative supplies, typically bottled water at collection points or bowsers, for longer interruptions.",
    whatHelps: [
      "Stored drinking water: 2.5 to 3 litres per person per day, the figure gov.uk now uses, with 3 days as a sensible minimum. That is roughly a 9-litre stock per person, or one and a half six-packs.",
      "Extra water for pets, and for cooking and basic washing if you have room for it.",
      "A way to make water safe if needed: a rolling boil for one minute, or purification tablets or a filter.",
      "Knowing your water company's emergency number and where they publish updates.",
      "A few large containers you can fill at a collection point if the cut runs long.",
    ],
    worthKnowing: [
      "Bottled water in sealed containers keeps for years. Rotate it every 6 to 12 months so it is always fresh.",
      "If a 'boil water' notice is in place, boil for drinking, brushing teeth, and food prep. Showering is generally fine.",
      "A bath or clean bucket filled before a planned cut gives you flushing water without touching your drinking stock.",
    ],
    community:
      "Bowsers and collection points are hard to reach for anyone without a car or with limited mobility. Offering to carry water for a neighbour is one of the simplest, most useful things you can do.",
  },
  {
    slug: "supply-delays",
    title: "Supply chain and delivery delays",
    summary:
      "Shops or deliveries disrupted by weather, fuel shortages, industrial action, or logistics problems.",
    typicalDuration: "Days to a couple of weeks",
    description:
      "Modern supply chains run on just-in-time delivery, so a snowstorm, a fuel shortage, a port backlog, or a strike can leave some shelves thin for a while. These gaps are almost always partial and temporary: a few product lines, not everything, for days rather than months. The clearest lesson from recent years is that the shortage people remember was mostly caused by everyone shopping at once.",
    whatHelps: [
      "A modest store cupboard built gradually: 3 to 7 days of shelf-stable food per person, made of things you already eat.",
      "Buying one extra of a staple each week until you reach that level, rather than a single big shop.",
      "Rotating stock: use the oldest first and replace it as you go, so nothing expires unused.",
      "A little flexibility in what you cook. If one thing is missing, a substitute usually is not.",
      "A small amount of cash in case card payments or cash machines are affected.",
      "A pair of glasses if you wear contact lenses. Lens deliveries and solution are the sort of thing that goes missing for a fortnight.",
    ],
    worthKnowing: [
      "Panic buying is the mechanism that turns a minor delay into an empty shelf. Buying normally is the single most helpful thing you can do for everyone else.",
      "Prescriptions are usually the item that matters most and is hardest to substitute. Ask your GP or pharmacist about a small buffer supply.",
      "Fuel shortages tend to resolve fastest when people only fill up when they need to.",
    ],
    community:
      "Share what you have spare and ask for what you lack. Community fridges, food banks, and neighbourhood groups exist for exactly this, and they need volunteers as much as donations.",
  },
  {
    slug: "extreme-weather",
    title: "Extreme weather event",
    summary:
      "Storms, flooding, heatwaves, or heavy snow that make it hard or unsafe to leave home or reach shops.",
    typicalDuration:
      "Hours to a few days, sometimes longer for widespread flooding or storms",
    description:
      "Extreme weather is the scenario that most often causes the others: storms bring power cuts, floods disrupt water and roads, snow stops deliveries, and heatwaves strain both health and the grid. Warnings usually come a day or more ahead from the Met Office or your national weather service, which is the real advantage here. Most events are over within a couple of days, though flooding can keep an area disrupted for longer.",
    whatHelps: [
      "Enough food, water, and medication for a few days, so you have no reason to travel in dangerous conditions.",
      "Warm layers, blankets, and a hot-water bottle for cold events; a fan, cool water, and closed curtains for heat.",
      "A battery or wind-up radio for warnings and updates if power and data go down.",
      "Knowing whether your home is at flood risk, and where you would go if you had to leave. Free flood warnings are available by postcode in the UK.",
      "A grab bag by the door if you are in a flood-risk area: documents, medication, chargers, a change of clothes.",
      "Checking the forecast and acting on amber and red warnings rather than waiting to see.",
    ],
    worthKnowing: [
      "Most storm injuries happen outdoors during the event, from falling debris or driving through flood water. Staying in is the main safety measure.",
      "Heat is the deadliest weather in many countries, and the people most at risk are older, alone, and indoors. Checking in matters more than any kit.",
      "Sandbags and flood barriers help most when put in place early, before water arrives.",
    ],
    community:
      "Weather is where neighbourhood networks show their value most clearly: clearing a shared path, checking an older neighbour is warm or cool enough, or sharing a working phone charger. Local flood groups and community emergency plans are worth joining before a warning is issued.",
  },
  {
    slug: "civil-disruption",
    title: "Local civil disruption",
    summary:
      "Periods of local unrest, protest, or infrastructure strain that briefly affect movement, shops, or transport in an area.",
    typicalDuration: "Usually short-lived, localised, and resolves within days",
    description:
      "Occasionally a town or district goes through a few days where normal routine is interrupted: a protest that closes roads, a period of unrest, a transport shutdown, or a strain on local services. These are usually confined to a specific area and time and resolve within days. For most people the practical effect is being sensible about where you go and when, and being able to stay home comfortably for a short while if needed.",
    whatHelps: [
      "The same core essentials as every other scenario: a few days of food, water, and medication.",
      "Staying informed through reliable local sources: police and council channels, local news, and official alerts, rather than rumour.",
      "A charged phone and a paper list of key contacts in case networks are congested.",
      "A simple plan for where household members would meet or how they would check in if travel is disrupted.",
      "Avoiding affected areas rather than going to look.",
    ],
    worthKnowing: [
      "Disruption of this kind is rarely as widespread or as long as social media makes it appear. Check official sources before changing plans.",
      "Shops and transport in an affected area typically reopen within a day or two of the situation settling.",
      "This scenario is included because it is realistic, not because it is likely. The preparation is identical to a bad storm.",
    ],
    community:
      "As with every scenario here, the answer is to check in with neighbours rather than isolate. Communities that know each other are markedly calmer and safer through short periods of unrest, and rumours spread less when people can ask someone they trust.",
  },
  {
    slug: "armed-conflict",
    title: "Armed conflict",
    summary:
      "War or sustained attacks on infrastructure in a modern, connected country, as Ukraine has experienced since 2022.",
    typicalDuration:
      "Months or longer in affected regions, lived as repeated short disruptions: alerts lasting hours, power cuts of several hours a day, intermittent water and heating",
    description:
      "Ukraine has shown, in unusual detail, what conflict looks like for ordinary civilians in a country with a modern grid, supermarkets, card payments and mobile data. For most people most of the time, it looks like life continuing with recurring interruptions. Strikes on the energy system brought scheduled power cuts of four to twelve hours a day through the winter of 2022 to 2023, and with them lost heating, water pumping, lifts, and mobile signal. People adapted fast, and what they adapted with is a longer version of the same kit as every other scenario on this site, plus a plan for where to shelter and where to go.",
    whatHelps: [
      "A safe place in your home: an interior room or corridor away from windows, below ground if you have it. The rule Ukrainians teach is two walls between you and the outside. Know the nearest public shelter too, such as a basement, underground car park, or metro station.",
      "A grab bag by the door: documents, cash in small notes, medication, chargers, a torch, water, a change of clothes, and a paper list of contacts. Electronic copies of documents on a phone as well.",
      "Power that does not depend on the grid: several power banks, and if you can afford it a portable power station with a folding solar panel. Rolling cuts mean charging everything the moment power returns. A battery or wind-up radio for when mobile data drops.",
      "More stored water than usual, because pumping stations run on electricity. Filling the bath and every large container when a cut is announced became routine.",
      "A way to stay warm in one room without mains power: sleeping bags, thermal layers, hot-water bottles, blankets. A way to cook safely without electricity, such as a camping stove used with a window open.",
      "A month of prescription medication rather than a fortnight, and a first aid kit you have practised with. Basic first aid courses, including bleeding control, were widely attended.",
      "An evacuation plan you hope not to use: where you would go, how you would get there, who is coming with you, and a car kept at least half full of fuel. Follow official evacuation routes and instructions.",
      "Official alert apps and national broadcasters for information. Rumour and deliberate disinformation spike sharply in conflict, and acting on the wrong message is dangerous.",
    ],
    worthKnowing: [
      "Mass panic did not happen. Shops reopened within days, banks and card payments largely kept working, and people went to work. The thing that made life hard was infrastructure damage and the cold that followed, not disorder.",
      "Candles caused a wave of house fires during the blackouts. Battery lanterns and head torches are safer, and this is why the checklist keeps saying so.",
      "Sleep, routine, and limiting news intake are health measures, not luxuries. Ukrainian doctors and teachers treated them as such, especially for children.",
      "This site is written UK-first, and this scenario is far less likely here than a storm or a power cut. It is included because readers ask, and because what people learned in Ukraine transfers directly to any long disruption of power, water, and heat.",
    ],
    community:
      "Ukraine is the strongest recent evidence for the central claim of this site. The response that worked was neighbourhood and volunteer networks: delivering food and medicine to older people who could not reach a shop, boarding up windows for neighbours, sharing generators and internet access, running warming and charging points in schools, churches, and cafés. Cities formalised this as thousands of public 'Points of Invincibility' with heat, power, hot drinks, and connectivity, but most of the work was done by people who already knew each other. Being one of those people, before anything happens, is the preparation that matters most.",
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return scenarios.find((s) => s.slug === slug);
}
