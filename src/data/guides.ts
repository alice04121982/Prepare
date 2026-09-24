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
        body: "Leave one light switched on, so you know when power is back. This protects them from a surge when it returns.",
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
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
