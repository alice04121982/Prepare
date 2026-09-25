/**
 * Short answer pages for what people search when something has happened or
 * is about to: one question each, answered in the first two sentences, then
 * the steps, what to have ready and the official sources. Rendered by
 * /guides/[slug]; listed at /guides and in the sitemap.
 *
 * Copy follows docs/tone-of-voice.md: second person, numerals, sentences
 * under 20 words, no scare words, no closing flourish. Every figure names
 * its source in `sources`. `verified` flips to true only after a person has
 * opened every source and checked the page against it, as with products.
 */
import type { DiagramName } from "@/components/Diagram";

export type GuideStep = { title: string; body: string };

export type GuideSource = { label: string; publisher: string; url: string };

/**
 * A kind of thing to have, not a brand: what it is, what to look for, and
 * the Amazon search that finds it. Specific products live in products.ts,
 * for the one-click basket, and are shown with their photos on /basket.
 */
export type ReadyItem = { item: string; tip: string; search: string };

export type Guide = {
  slug: string;
  /** The page heading, in the words people search. Lowercase, like every heading on the site. */
  title: string;
  /** The <title> tag and search result headline. */
  metaTitle: string;
  description: string;
  /** The answer, first. The first paragraph is the lede. */
  answer: string[];
  /** A figure from Diagram.tsx, when one fits. */
  diagram?: DiagramName;
  stepsTitle: string;
  steps: GuideStep[];
  /** One boxed warning, for the thing that hurts people. */
  warning?: { title: string; body: string };
  /** Shown under "what to have ready", each with an Amazon search. */
  ready: ReadyItem[];
  sources: GuideSource[];
  /** When the sources were last read, ISO date. */
  checked: string;
  verified: boolean;
  /** Other guides to point to, by slug. */
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "power-cut",
    title: "what to do in a power cut",
    metaTitle: "What to do in a power cut",
    description:
      "Check if it is just your home, then call 105, free from any phone in Great Britain. What to do in the first hour, and what to keep ready.",
    answer: [
      "First check whether it is just your home. Then call 105 to report it and hear when it should be back.",
      "105 is free from any phone in Great Britain. In Northern Ireland, call NIE Networks on 03457 643 643.",
    ],
    stepsTitle: "what to do, in order",
    steps: [
      {
        title: "Check your fuse box",
        body: "If a switch has tripped, it may be just your home. If the street lights and next door are out too, it is the network.",
      },
      {
        title: "Call 105 or check online",
        body: "Report it and get an estimate for when power returns. The website powercut105.com shows known cuts by postcode.",
      },
      {
        title: "Use a torch, not candles",
        body: "Candles are a common cause of house fires in power cuts. A torch or battery lantern is safer.",
      },
      {
        title: "Keep the fridge and freezer shut",
        body: "A full freezer keeps food frozen for about 48 hours if the door stays shut. A half-full one lasts about 24.",
      },
      {
        title: "Switch appliances off at the wall",
        body: "This protects them from a surge when power returns. Leave one light on, so you know when it is back.",
      },
      {
        title: "Stay warm in one room",
        body: "Close the doors, add layers and use blankets. A hot-water bottle filled before the cut keeps warm for hours.",
      },
      {
        title: "Check on your neighbours",
        body: "Older people and anyone using medical equipment may need help first. Knock, or phone if you have the number.",
      },
    ],
    warning: {
      title: "Never cook or heat indoors with fuel",
      body: "Barbecues, camping stoves and generators give off carbon monoxide, which you cannot see or smell. Use them outside only. If anyone feels dizzy, sick or sleepy, get into fresh air and call 999.",
    },
    ready: [
      { item: "Head torch", tip: "Keeps both hands free. Pick one that takes AA batteries, so spares fit everything.", search: "LED head torch AA batteries" },
      { item: "Battery lantern", tip: "Lights a whole room, and is far safer than candles.", search: "battery LED lantern" },
      { item: "AA batteries", tip: "A pack of 20 covers a torch, a lantern and a radio, with spares.", search: "AA batteries pack of 20" },
      { item: "Power bank", tip: "10,000 mAh charges most phones about twice. Keep it topped up monthly.", search: "power bank 10000mAh USB-C" },
      { item: "Wind-up or battery radio", tip: "Local radio keeps working when mobile data drops.", search: "wind up radio FM" },
    ],
    sources: [
      { label: "105: the power cut number", publisher: "Energy Networks Association", url: "https://www.powercut105.com/" },
      { label: "Priority Services Register", publisher: "Energy networks and water companies", url: "https://www.thepsr.co.uk/" },
      { label: "Carbon monoxide poisoning", publisher: "NHS", url: "https://www.nhs.uk/conditions/carbon-monoxide-poisoning/" },
      {
        label: "Food safety during a power outage (fridge and freezer times)",
        publisher: "US Government (FoodSafety.gov)",
        url: "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage",
      },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["how-much-water-to-store", "before-a-storm", "no-water"],
  },
  {
    slug: "how-much-water-to-store",
    title: "how much water to store",
    metaTitle: "How much water to store for an emergency",
    description:
      "3 litres per person per day, for at least 3 days: 9 litres each. How much that is for your household, and how to keep it.",
    answer: [
      "Keep 3 litres of drinking water per person per day, for at least 3 days. That is 9 litres each.",
      "It is the figure gov.uk uses, from the World Health Organisation. It covers drinking and a little for food.",
    ],
    diagram: "water",
    stepsTitle: "how much for your household",
    steps: [
      { title: "1 person: 9 litres", body: "About 5 large 2-litre bottles." },
      { title: "2 people: 18 litres", body: "Two 6-packs of 1.5-litre bottles, or a 10-litre container plus 4 large bottles." },
      { title: "4 people: 36 litres", body: "About 18 large bottles, or three 10-litre containers with a few bottles." },
      { title: "Pets need water too", body: "Allow about 1 litre a day for a medium dog. Cats need much less." },
      {
        title: "Washing and flushing are extra",
        body: "Up to 10 litres per person a day covers cooking and washing. Fill the bath before a planned cut for flushing.",
      },
      {
        title: "Keep it cool, dark and off the floor",
        body: "Store sealed bottles away from sunlight and chemicals. Check the dates and use the oldest first, every 6 to 12 months.",
      },
      {
        title: "If the taps stop, your water company helps",
        body: "They set up bottled water stations. People on the Priority Services Register get water brought to them.",
      },
    ],
    ready: [
      { item: "Bottled water", tip: "Sealed bottles keep for years. Check the dates and use the oldest first.", search: "still water 2 litre bottles" },
      { item: "10-litre water container with a tap", tip: "Easier to store and pour than bottles. Fill it from your tap.", search: "10 litre water container with tap" },
      { item: "Water purification tablets", tip: "For water from another source, if your stored water runs out.", search: "water purification tablets" },
    ],
    sources: [
      {
        label: "Prepare: get prepared for emergencies (3 litres per person per day)",
        publisher: "UK Government (Cabinet Office)",
        url: "https://prepare.campaign.gov.uk/get-prepared-for-emergencies/",
      },
      { label: "Priority Services Register", publisher: "Energy networks and water companies", url: "https://www.thepsr.co.uk/" },
      { label: "Consumer Council for Water", publisher: "CCW", url: "https://www.ccwater.org.uk/" },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["no-water", "power-cut", "heatwave"],
  },
  {
    slug: "before-a-storm",
    title: "what to do before a storm",
    metaTitle: "What to do before a storm: amber and red warnings",
    description:
      "When the Met Office issues an amber or red warning, get ready the day before. What to charge, what to bring in and what to do if the power goes.",
    answer: [
      "When a warning covers your area, get ready the day before. Charge phones, bring in loose things and plan to stay in.",
      "The Met Office issues warnings in 3 colours. Yellow means be aware, amber means be prepared, red means take action.",
    ],
    stepsTitle: "the day before",
    steps: [
      {
        title: "Check the warning for your postcode",
        body: "Read what the Met Office says to expect and when. Warnings are often issued 2 to 5 days ahead.",
      },
      {
        title: "Bring in or tie down loose things",
        body: "Garden furniture, bins, trampolines and plant pots. Wind turns them into hazards for you and your neighbours.",
      },
      {
        title: "Charge everything",
        body: "Phones, power banks and rechargeable torches. Power cuts are common in strong wind.",
      },
      {
        title: "Put a torch and a radio where you can find them",
        body: "A battery or wind-up radio keeps working when the mobile network drops.",
      },
      {
        title: "Sign up for flood warnings",
        body: "Storms often bring flooding. Warnings by text or call are free, by postcode.",
      },
      {
        title: "Check on anyone who might need help",
        body: "An older neighbour, or someone who relies on power for medical equipment. Swap numbers if you have not.",
      },
      {
        title: "On the day, stay in if you can",
        body: "In a red warning, travel only if you must. Keep away from the coast, trees and high-sided vehicles.",
      },
    ],
    warning: {
      title: "Keep away from fallen power lines",
      body: "Stay well back and call 105. If someone is in danger, call 999. Lines can be live even when they look dead.",
    },
    ready: [
      { item: "Power bank", tip: "10,000 mAh charges most phones about twice. Charge it the day before.", search: "power bank 10000mAh USB-C" },
      { item: "Head torch", tip: "Keeps both hands free if the power goes at night.", search: "LED head torch AA batteries" },
      { item: "Wind-up or battery radio", tip: "For local news and warnings when the mobile network is down.", search: "wind up radio FM" },
      { item: "AA batteries", tip: "Check the sizes your torch and radio take before the storm.", search: "AA batteries pack of 20" },
    ],
    sources: [
      {
        label: "UK weather warnings, and what the colours mean",
        publisher: "Met Office",
        url: "https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings",
      },
      { label: "Sign up for flood warnings", publisher: "UK Government (Environment Agency)", url: "https://www.gov.uk/sign-up-for-flood-warnings" },
      { label: "105: the power cut number", publisher: "Energy Networks Association", url: "https://www.powercut105.com/" },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["flood-warning", "power-cut", "how-much-water-to-store"],
  },
  {
    slug: "flood-warning",
    title: "what to do if you get a flood warning",
    metaTitle: "What to do if you get a flood warning",
    description:
      "A flood warning means flooding is expected. Move people, pets and valuables upstairs, and be ready to leave. What each warning level means.",
    answer: [
      "A flood warning means flooding is expected. Act now: move people, pets and valuables upstairs, and be ready to leave.",
      "A flood alert means flooding is possible, so get ready. A severe flood warning means danger to life: do what the emergency services tell you.",
    ],
    stepsTitle: "what to do now",
    steps: [
      {
        title: "Check the warning for your area",
        body: "The check for flooding service shows current warnings and river levels. Floodline is 0345 988 1188.",
      },
      {
        title: "Move people, pets and medicines upstairs",
        body: "Then documents, phone chargers and anything you would not want to lose.",
      },
      {
        title: "Put a bag by the door",
        body: "Medicines, documents, cash, a torch, chargers and warm clothes. Take it if you are told to leave.",
      },
      {
        title: "Move your car to higher ground",
        body: "Only if you can do it safely, and before the water rises.",
      },
      {
        title: "Turn off gas, electricity and water",
        body: "Do it before water comes in, and only if it is safe. Find the switches and stopcock now.",
      },
      {
        title: "Check on your neighbours",
        body: "Older people and families with young children may need help to move things or leave.",
      },
      {
        title: "Sign up for warnings",
        body: "Warnings by text, call or email are free, by postcode. Scotland and Wales have their own services, linked from the same page.",
      },
    ],
    warning: {
      title: "Do not walk or drive through flood water",
      body: "30 cm of flowing water can float a car. 15 cm can knock you off your feet. It can also hide open drains and be polluted.",
    },
    ready: [
      { item: "Waterproof document wallet", tip: "Keeps passports, insurance papers and prescriptions dry in one place.", search: "waterproof document wallet" },
      { item: "Head torch", tip: "Keeps both hands free if the power goes at night.", search: "LED head torch AA batteries" },
      { item: "Power bank", tip: "10,000 mAh charges most phones about twice.", search: "power bank 10000mAh USB-C" },
      { item: "Wind-up or battery radio", tip: "For local news and warnings when the mobile network is down.", search: "wind up radio FM" },
    ],
    sources: [
      { label: "What to do before, during and after a flood", publisher: "UK Government (Environment Agency)", url: "https://www.gov.uk/help-during-flood" },
      { label: "Check for flooding", publisher: "UK Government (Environment Agency)", url: "https://check-for-flooding.service.gov.uk/" },
      { label: "Sign up for flood warnings", publisher: "UK Government (Environment Agency)", url: "https://www.gov.uk/sign-up-for-flood-warnings" },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["before-a-storm", "power-cut", "no-water"],
  },
  {
    slug: "no-water",
    title: "no water from the tap: what to do",
    metaTitle: "No water from the tap: what to do",
    description:
      "Check whether neighbours are affected, then check your water company's updates. What to drink, how to flush, and what to do when it comes back.",
    answer: [
      "Check whether your neighbours have water too. Then check your water company's website or social media for updates.",
      "If the supply is off for long, they set up bottled water stations. People on the Priority Services Register get water brought to them.",
    ],
    stepsTitle: "what to do, in order",
    steps: [
      {
        title: "Check it is not just your home",
        body: "Make sure your stopcock is open. If only your home is affected, it may be a leak or a frozen pipe.",
      },
      {
        title: "Check your water company's updates",
        body: "Your bill names your company. Their website shows known problems by postcode. Call them if nothing is posted.",
      },
      {
        title: "Drink your stored water first",
        body: "Allow 3 litres per person per day. Keep it for drinking and food, not washing.",
      },
      {
        title: "Flush with water you cannot drink",
        body: "Pour a bucket of bath or rain water into the pan. Flush only when you need to.",
      },
      {
        title: "Tell your water company if you need help",
        body: "Say if anyone at home is older, disabled, unwell or has a young baby. They put you first for deliveries.",
      },
      {
        title: "When it comes back, run the cold kitchen tap",
        body: "Run it until the water is clear. Cloudy water is usually air, and clears if left to stand.",
      },
      {
        title: "Follow any boil water notice",
        body: "Boil tap water and let it cool before drinking, brushing teeth or preparing food, until you are told to stop.",
      },
    ],
    ready: [
      { item: "Bottled water", tip: "3 litres per person per day, for at least 3 days. Sealed bottles keep for years.", search: "still water 2 litre bottles" },
      { item: "10-litre water container with a tap", tip: "Fill it from your tap before a planned cut.", search: "10 litre water container with tap" },
      { item: "Hand sanitiser and wet wipes", tip: "For clean hands when you cannot use the taps.", search: "hand sanitiser gel" },
    ],
    sources: [
      { label: "Consumer Council for Water (your rights when the water goes off)", publisher: "CCW", url: "https://www.ccwater.org.uk/" },
      { label: "Priority Services Register", publisher: "Energy networks and water companies", url: "https://www.thepsr.co.uk/" },
      {
        label: "Prepare: get prepared for emergencies (3 litres per person per day)",
        publisher: "UK Government (Cabinet Office)",
        url: "https://prepare.campaign.gov.uk/get-prepared-for-emergencies/",
      },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["how-much-water-to-store", "power-cut", "heatwave"],
  },
  {
    slug: "ready-for-3-days",
    title: "the government's advice to be ready for 3 days",
    metaTitle: "Why the government asks households to be ready for 3 days",
    description:
      "The UK government asks every household to be able to cope on its own for at least 3 days. What that means, and what it asks you to keep.",
    answer: [
      "The UK government asks every household to be able to cope on its own for at least 3 days. It does not say anything is about to happen.",
      "In an emergency, help goes first to the people who need it most. Being ready means you can manage while that happens.",
    ],
    stepsTitle: "what it asks you to have",
    steps: [
      { title: "Water", body: "3 litres per person per day, for at least 3 days. That is 9 litres each." },
      { title: "Food that keeps", body: "Tins and packets you already eat, including some that need no cooking. And a tin opener." },
      { title: "Light and power", body: "A torch, spare batteries and a charged power bank." },
      { title: "A way to hear the news", body: "A battery or wind-up radio, for when the mobile network is down." },
      { title: "Medicines and first aid", body: "A few days of any regular medicines, and a basic first aid kit." },
      { title: "Some cash", body: "In small notes, in case cards and cash machines stop." },
      { title: "A plan", body: "Who you would call, where you would meet, and the numbers written on paper." },
    ],
    ready: [
      { item: "Bottled water", tip: "9 litres per person covers the 3 days.", search: "still water 2 litre bottles" },
      { item: "Head torch", tip: "Keeps both hands free. Pick one that takes AA batteries.", search: "LED head torch AA batteries" },
      { item: "Wind-up or battery radio", tip: "Local radio keeps working when mobile data drops.", search: "wind up radio FM" },
      { item: "First aid kit", tip: "A basic home kit, and learn what is in it.", search: "home first aid kit" },
    ],
    sources: [
      {
        label: "Prepare: get prepared for emergencies",
        publisher: "UK Government (Cabinet Office)",
        url: "https://prepare.campaign.gov.uk/get-prepared-for-emergencies/",
      },
      { label: "Preparing for emergencies (reference collection)", publisher: "UK Government", url: "https://www.gov.uk/government/publications/preparing-for-emergencies" },
      { label: "National Risk Register 2025", publisher: "UK Government (Cabinet Office)", url: "https://www.gov.uk/government/publications/national-risk-register-2025" },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["how-much-water-to-store", "power-cut", "before-a-storm"],
  },
  {
    slug: "heatwave",
    title: "what to do in a heatwave",
    metaTitle: "What to do in a heatwave",
    description:
      "Keep your home cool, drink water through the day and check on anyone older or unwell. The signs of heat exhaustion, and when to call 999.",
    answer: [
      "Keep your home cool, drink water through the day and check on anyone older or unwell.",
      "Heat harms older people most, and most of that harm can be avoided. The UK Health Security Agency issues heat-health alerts in yellow, amber and red.",
    ],
    stepsTitle: "what to do",
    steps: [
      {
        title: "Check the heat-health alert for your area",
        body: "Amber and red alerts mean the heat is likely to affect health services and people at risk.",
      },
      {
        title: "Keep the heat out",
        body: "Close curtains on windows that get the sun. Open windows when it is cooler outside than in.",
      },
      {
        title: "Drink water through the day",
        body: "Do not wait until you are thirsty. Go easy on alcohol and caffeine.",
      },
      {
        title: "Stay out of the sun from 11am to 3pm",
        body: "It is at its strongest then. Wear a hat and sun cream if you have to go out.",
      },
      {
        title: "Check on people at risk",
        body: "Older neighbours, babies and anyone with a heart or breathing condition. Call or visit once a day.",
      },
      {
        title: "Never leave anyone in a parked car",
        body: "This includes children and pets, even for a few minutes.",
      },
      {
        title: "Know the signs of heat exhaustion",
        body: "Headache, dizziness, sweating, cramps and feeling sick. Move somewhere cool, lie down, and sip water.",
      },
    ],
    warning: {
      title: "Heatstroke is an emergency",
      body: "Call 999 if someone is still unwell after 30 minutes of cooling, is hot but not sweating, is confused, has a fit or passes out.",
    },
    ready: [
      { item: "Room thermometer", tip: "Tells you when a bedroom is too hot to sleep in safely.", search: "digital room thermometer" },
      { item: "Reusable water bottle", tip: "Makes it easy to keep drinking through the day.", search: "reusable water bottle 1 litre" },
      { item: "Electric fan", tip: "Helps below about 35°C. Above that, it moves hot air rather than cooling you.", search: "electric desk fan" },
    ],
    sources: [
      { label: "Heat exhaustion and heatstroke", publisher: "NHS", url: "https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/" },
      { label: "Weather-health alerts", publisher: "UK Health Security Agency", url: "https://ukhsa-dashboard.data.gov.uk/weather-health-alerts" },
      { label: "Beat the heat: staying safe in hot weather", publisher: "UK Health Security Agency", url: "https://www.gov.uk/government/publications/beat-the-heat-hot-weather-advice" },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["no-water", "power-cut", "how-much-water-to-store"],
  },
  {
    slug: "keep-warm-without-heating",
    title: "how to keep warm if the heating fails",
    metaTitle: "How to keep warm if the heating fails",
    description:
      "Pick one room, close it off and dress in layers. How to stay warm safely without heating, and who to check on.",
    answer: [
      "Pick one room to keep warm, close the door and curtains, and dress in layers.",
      "Cold is hardest on older people, babies and anyone unwell. The NHS suggests keeping a living room at 18°C or more.",
    ],
    stepsTitle: "what to do",
    steps: [
      { title: "Choose one room", body: "The smallest room you can all use. Close its door and keep other doors shut." },
      { title: "Close curtains at dusk", body: "Keep them open in the day if the sun is out, then close them to hold the heat in." },
      { title: "Wear layers, and a hat", body: "Several thin layers beat one thick one. Keep hands and feet warm too." },
      { title: "Have hot drinks and hot food", body: "A flask filled while you still have power keeps water hot for hours." },
      { title: "Keep moving", body: "Get up and walk around every hour if you can. Sitting still makes you colder." },
      { title: "Use a hot-water bottle safely", body: "Fill it with hot, not boiling, water. Replace old or worn rubber bottles." },
      { title: "Check on anyone at risk", body: "Older neighbours, babies and people who are unwell feel the cold first. Knock or call." },
    ],
    warning: {
      title: "Never heat a room with a gas oven, hob or barbecue",
      body: "They give off carbon monoxide. If you smell gas, call the gas emergency line on 0800 111 999.",
    },
    ready: [
      { item: "Thermal base layers", tip: "Worn under normal clothes, they keep you warm without the heating on.", search: "thermal base layer set" },
      { item: "Hot-water bottle", tip: "With a cover. Replace it every few years.", search: "hot water bottle with cover" },
      { item: "Fleece blankets", tip: "One for each person, kept in the room you would use.", search: "fleece blanket" },
      { item: "Vacuum flask", tip: "Keeps water hot for hours for drinks and hot-water bottles.", search: "vacuum flask 1 litre" },
    ],
    sources: [
      { label: "Keep warm, keep well", publisher: "NHS", url: "https://www.nhs.uk/live-well/seasonal-health/keep-warm-keep-well/" },
      { label: "Weather-health alerts", publisher: "UK Health Security Agency", url: "https://ukhsa-dashboard.data.gov.uk/weather-health-alerts" },
      { label: "Carbon monoxide poisoning", publisher: "NHS", url: "https://www.nhs.uk/conditions/carbon-monoxide-poisoning/" },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["power-cut", "cook-without-electricity", "priority-services-register"],
  },
  {
    slug: "emergency-alerts",
    title: "what an Emergency Alert means",
    metaTitle: "What an Emergency Alert on your phone means",
    description:
      "An Emergency Alert means there is a danger to life nearby. What the loud sound is, what to do, and why you do not need to sign up.",
    answer: [
      "An Emergency Alert means there is a danger to life nearby. Read it and follow what it says.",
      "Your phone makes a loud, siren-like sound and vibrates, even on silent. You do not need to sign up.",
      "Alerts go to every phone in an area and do not track you. Keep them switched on, or you would miss real warnings.",
    ],
    stepsTitle: "when one arrives",
    steps: [
      { title: "Stop and read it", body: "It tells you what is happening and what to do. It may link to gov.uk for more." },
      { title: "If you are driving, do not read it", body: "Find somewhere safe and legal to stop first, or ask a passenger." },
      { title: "Do what it says", body: "That might be to stay indoors, to leave an area, or to avoid a road." },
      { title: "Tell people nearby who may not have it", body: "Older relatives, neighbours, or anyone without a smartphone." },
      { title: "Check local radio for updates", body: "A battery or wind-up radio keeps working if mobile networks are busy." },
    ],
    ready: [
      { item: "Wind-up or battery radio", tip: "For updates when the mobile network is busy or down.", search: "wind up radio FM" },
      { item: "Power bank", tip: "Keeps your phone on if the power goes.", search: "power bank 10000mAh USB-C" },
    ],
    sources: [
      { label: "Emergency Alerts", publisher: "UK Government", url: "https://www.gov.uk/alerts" },
      { label: "How Emergency Alerts work", publisher: "UK Government", url: "https://www.gov.uk/alerts/how-alerts-work" },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["ready-for-3-days", "flood-warning", "before-a-storm"],
  },
  {
    slug: "food-that-needs-no-cooking",
    title: "emergency food that needs no cooking",
    metaTitle: "Emergency food that needs no cooking",
    description:
      "Tins, packets and long-life food you can eat cold, straight from the cupboard. What to keep for 3 days, and what to remember for babies.",
    answer: [
      "Keep 3 days of food you can eat cold: tins, packets and long-life drinks you already like.",
      "Buy what you normally eat, a little at a time, and use the oldest first. Keep a tin opener that does not need power.",
    ],
    stepsTitle: "what to keep",
    steps: [
      { title: "Tinned fish and meat", body: "Tuna, sardines, salmon and ham are cooked in the tin and eaten cold." },
      { title: "Tinned beans and pulses", body: "Baked beans, chickpeas and lentils are already cooked. They are fine cold." },
      { title: "Tinned fruit and vegetables", body: "Fruit in juice, sweetcorn and potatoes. Drink the juice too." },
      { title: "Crackers, oatcakes and breakfast cereal", body: "They keep for months. Eat cereal dry or with long-life milk." },
      { title: "Nuts, peanut butter and dried fruit", body: "A lot of energy in a small space. Check for allergies at home." },
      { title: "Long-life milk and juice", body: "UHT cartons keep for months unopened. Once opened, drink them that day without a fridge." },
      { title: "For babies, ready-to-feed formula", body: "It comes in cartons and needs no water or boiling. Keep a few days of it." },
    ],
    ready: [
      { item: "Manual tin opener", tip: "Does not need power. Keep it with the tins.", search: "manual tin opener" },
      { item: "Oatcakes", tip: "A box keeps for months and needs no cooking.", search: "oatcakes" },
      { item: "Long-life milk", tip: "UHT cartons keep for months unopened.", search: "UHT semi skimmed milk" },
      { item: "Tinned fish", tip: "Protein that is cooked in the tin and eaten cold.", search: "tinned tuna multipack" },
    ],
    sources: [
      {
        label: "Prepare: get prepared for emergencies",
        publisher: "UK Government (Cabinet Office)",
        url: "https://prepare.campaign.gov.uk/get-prepared-for-emergencies/",
      },
      { label: "Types of formula", publisher: "NHS", url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/bottle-feeding/types-of-formula/" },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["cook-without-electricity", "ready-for-3-days", "how-much-water-to-store"],
  },
  {
    slug: "priority-services-register",
    title: "the Priority Services Register explained",
    metaTitle: "The Priority Services Register: who can join and what you get",
    description:
      "A free register that gets you extra help from your energy network and water company in a power cut or water outage. Who can join and how.",
    answer: [
      "The Priority Services Register is free. It gets you extra help from your energy network and water company in a cut.",
      "You can join if anyone at home is older, disabled, unwell, pregnant, has young children, or relies on power for medical equipment.",
    ],
    stepsTitle: "what it gives you, and how to join",
    steps: [
      { title: "Warning of planned cuts", body: "You hear in advance when power or water will be switched off for work." },
      { title: "Priority help in a cut", body: "Updates and support come to you first, and sometimes a visit." },
      { title: "Water brought to your door", body: "If the taps stop, your water company delivers bottled water." },
      { title: "A password for callers", body: "So you know someone at the door or on the phone really is from the company." },
      { title: "Information you can use", body: "Bills and messages in large print, braille, audio or another language." },
      { title: "How to join", body: "Contact your energy supplier and your water company. Ask each to share it with your network operator." },
      { title: "It can be for a short time", body: "After an operation, or with a new baby. Tell them when it no longer applies." },
    ],
    ready: [],
    sources: [
      { label: "Priority Services Register", publisher: "Energy networks and water companies", url: "https://www.thepsr.co.uk/" },
      { label: "Consumer Council for Water", publisher: "CCW", url: "https://www.ccwater.org.uk/" },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["power-cut", "no-water", "keep-warm-without-heating"],
  },
  {
    slug: "cook-without-electricity",
    title: "how to cook safely without electricity",
    metaTitle: "How to cook safely without electricity",
    description:
      "Eat food that needs no cooking first. If you need heat, a gas hob often still works; camping stoves and barbecues go outside only.",
    answer: [
      "Eat food that needs no cooking first. Save heat for hot drinks and one hot meal a day.",
      "A gas hob often still works in a power cut. Camping stoves and barbecues are for outside only.",
    ],
    stepsTitle: "what to do",
    steps: [
      { title: "Start with no-cook food", body: "Tins, crackers, cereal and fruit. Keep fuel and effort for when you need them." },
      { title: "Try your gas hob", body: "If the ignition is electric, light it carefully with a long match. Never leave it unattended." },
      { title: "Cook outside with a camping stove or barbecue", body: "Keep it well away from doors, windows and vents, and on a firm surface." },
      { title: "Boil only what you need", body: "Then keep the rest hot in a vacuum flask for drinks later." },
      { title: "Keep a fire blanket in the kitchen", body: "It puts out a pan fire. Never use water on burning oil." },
      { title: "Fit a carbon monoxide alarm", body: "Near any room with a gas, oil or solid fuel appliance. Test it monthly." },
      { title: "Keep food safe", body: "Eat from the fridge first, then the freezer, then the cupboard." },
    ],
    warning: {
      title: "Never use a barbecue or camping stove indoors",
      body: "Not in a garage, tent or porch either. They give off carbon monoxide, which you cannot see or smell and which kills.",
    },
    ready: [
      { item: "Carbon monoxide alarm", tip: "Battery powered, so it works in a power cut. Check the date on it.", search: "carbon monoxide alarm battery" },
      { item: "Fire blanket", tip: "Hangs on the kitchen wall. Pull the tapes and cover the pan.", search: "kitchen fire blanket" },
      { item: "Camping stove", tip: "For outside use only, with spare gas.", search: "portable camping gas stove" },
      { item: "Vacuum flask", tip: "Boil once and have hot water for hours.", search: "vacuum flask 1 litre" },
    ],
    sources: [
      { label: "Carbon monoxide poisoning", publisher: "NHS", url: "https://www.nhs.uk/conditions/carbon-monoxide-poisoning/" },
      { label: "Gas safety advice", publisher: "Gas Safe Register", url: "https://www.gassaferegister.co.uk/" },
      {
        label: "Food safety during a power outage",
        publisher: "US Government (FoodSafety.gov)",
        url: "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage",
      },
    ],
    checked: "2026-09-24",
    verified: false,
    related: ["food-that-needs-no-cooking", "power-cut", "keep-warm-without-heating"],
  },
  {
    slug: "medical-equipment-and-outages",
    title: "if someone at home depends on medical equipment or medications",
    metaTitle: "Preparing for outages when you depend on medical equipment",
    description:
      "Make a plan now for power cuts and water outages if someone at home needs powered medical equipment or refrigerated medications. Know your backup options and safe timeframes.",
    answer: [
      "If someone at home relies on powered medical equipment (dialysis, oxygen, ventilator, feeding tube, cardiac devices) or refrigerated medication (insulin, some biologics), a power cut or water outage becomes urgent within hours or days.",
      "Your plan needs three things: knowing how long you can safely go without treatment, a backup power source, and an emergency contact list with your healthcare team and alternative treatment centers.",
    ],
    stepsTitle: "what to do now",
    steps: [
      { title: "Ask your healthcare team three questions", body: "How long can treatment or medication safely be delayed? What is the earliest sign something is wrong? Where would you go if this center lost power or water?" },
      { title: "Register with the Priority Services Register", body: "You qualify because someone at home relies on medical equipment. This gets early warning of planned outages and priority support if one happens." },
      { title: "Write down your safe timeframe", body: "Some equipment can pause for hours, some for days, some not at all. Write it down and keep it somewhere you can find it in a crisis (your phone, your bag, the fridge door)." },
      { title: "Know how to recognize trouble early", body: "Ask your healthcare team what symptoms mean you need help right now, not tomorrow. Know the phone numbers for NHS 111 (urgent), 999 (emergency), and your GP." },
      { title: "Explore backup power quietly now", body: "A generator, a battery backup, or inverter in the car can buy time. Generators need fuel storage and safe outdoor use only. Battery backups are expensive but silent." },
      { title: "Keep an extra supply of medications at home", body: "Ask your pharmacy and your doctor about keeping a 5 to 7 day supply for emergencies. Store it safely (not in the bathroom where humidity harms some drugs)." },
      { title: "Make a card with your medical information", body: "Blood type, current medications, your condition, who to call, and your nearest hospital. Carry it with you and keep a copy at home." },
    ],
    warning: {
      title: "Know what you can and cannot do",
      body: "Do not skip doses or ration medication to make supplies last longer without talking to your doctor first. Some medications and equipment have no safe delay; plan around that, not around hoping.",
    },
    ready: [
      { item: "Backup power for equipment", tip: "A battery backup (UPS), a power inverter in your car, or a small generator if you can store and safely use fuel outdoors.", search: "uninterruptible power supply UPS" },
      { item: "Medical summary card", tip: "Your blood type, current medications, condition, and emergency contacts to carry always.", search: "medical alert card holder" },
      { item: "Extra supply of medications", tip: "Ask your pharmacy and doctor about keeping a 5 to 7 day emergency supply.", search: "medication storage box" },
      { item: "Thermos or cool box", tip: "If medication needs to stay cool but the fridge is off, a cool box with ice packs buys time.", search: "medical cool box insulin" },
    ],
    sources: [
      { label: "Priority Services Register: who can join", publisher: "Energy networks and water companies", url: "https://www.thepsr.co.uk/" },
      { label: "NHS 111: urgent care", publisher: "NHS", url: "https://111.nhs.uk/" },
      { label: "Ready.gov: people with disabilities and access and functional needs", publisher: "US FEMA (principles apply in the UK)", url: "https://www.ready.gov/" },
    ],
    checked: "2026-09-25",
    verified: false,
    related: ["priority-services-register", "power-cut", "no-water"],
  },
  {
    slug: "dialysis-in-an-outage",
    title: "if you are on dialysis and there is a power cut or water outage",
    metaTitle: "Dialysis during a power cut or water outage",
    description:
      "Dialysis depends on electricity and clean water. Without treatment, kidney patients are at risk within days. Know your backup plan and register for priority help.",
    answer: [
      "Hemodialysis patients can safely skip treatment for about 3 to 5 days; peritoneal dialysis patients for about 1 to 2 weeks. After that, potassium and fluid buildup become life-threatening.",
      "Contact your dialysis unit now to ask: Where would you go if the center lost power? Do they have a backup plan? Some regions have mutual-aid agreements with other centers.",
    ],
    stepsTitle: "what to do now",
    steps: [
      { title: "Register with the Priority Services Register", body: "You rely on powered medical equipment. This gets you early warning of planned cuts and priority help if one happens." },
      { title: "Ask your dialysis unit their backup plan", body: "Which other center would you go to? How do they handle fuel for generators? Does water come from mains only?" },
      { title: "Keep your medical history written down", body: "Your blood type, fistula arm, current medications, and your nephrologist's name and number. A copy in your bag and one at home." },
      { title: "Know the symptoms of hyperkalemia", body: "High potassium after a missed session causes a fast or irregular heartbeat, shortness of breath, chest pain or muscle weakness. Call 999 if any start." },
      { title: "Have contact details for your center and backup centers", body: "Phone numbers for the unit, your nephrologist, and the Regional Renal Unit if your center is damaged." },
      { title: "Keep a few days of medications at home", body: "Phosphate binders, potassium-lowering drugs and blood pressure medicines. Ask your pharmacist for an extra supply." },
    ],
    warning: {
      title: "Never skip dialysis without a plan",
      body: "Potassium rises fast without treatment. Even one missed session puts you at risk of heart arrhythmia. If you cannot reach your unit, call NHS 111 or your GP.",
    },
    ready: [
      { item: "Medical summary card", tip: "Written summary of your condition, medications and blood type to carry always.", search: "medical alert card holder" },
      { item: "Prescribed medications kept at home", tip: "Ask your dialysis team and pharmacist about keeping a 5 day supply for emergencies.", search: "medication storage box" },
      { item: "List of backup dialysis centers", tip: "Phone numbers for your unit, your nephrologist, and the nearest Regional Renal Unit.", search: "business card holder" },
    ],
    sources: [
      { label: "UK Renal Association: emergency preparedness for dialysis patients", publisher: "Renal Association", url: "https://renal.org/" },
      { label: "What to do if you miss a dialysis session", publisher: "NHS", url: "https://www.nhs.uk/conditions/kidney-disease/" },
      { label: "Hyperkalemia (high potassium): symptoms and treatment", publisher: "NHS", url: "https://www.nhs.uk/conditions/high-potassium/" },
    ],
    checked: "2026-09-25",
    verified: false,
    related: ["medical-equipment-and-outages", "priority-services-register", "power-cut"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
