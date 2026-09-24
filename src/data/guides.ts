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
  /** Planner line ids from products.ts, shown under "what to have ready". */
  lines: string[];
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
    lines: ["torch", "lantern", "batteries", "powerbank", "radio"],
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
    related: ["how-much-water-to-store", "before-a-storm"],
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
    lines: ["water", "water-extra", "purify"],
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
    related: ["power-cut", "before-a-storm"],
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
    lines: ["powerbank", "torch", "radio", "batteries"],
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
    related: ["power-cut", "how-much-water-to-store"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
