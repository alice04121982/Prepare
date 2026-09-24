/**
 * Free things a household can do today, before buying anything, grouped by
 * how long they take. Rendered by /what-you-can-do-now.
 *
 * Every link here is also in official-guidance.ts or is the organisation's
 * own site. Phone numbers are for Great Britain unless the line says so.
 *
 * A step takes a category colour only when it belongs to one checklist
 * category, and the page prints that category's name beside the colour
 * (DESIGN.md: a colour appears only where its category is named).
 */
import type { Cat } from "@/components/PageIntro";

/** The checklist category a step belongs to, named with the step. */
export type NowCat = { cat: Cat; name: string };

export type NowStep = {
  id: string;
  /** Colours the step's number, and prints the category name above it. Steps with no one category stay ink. */
  category?: NowCat;
  title: string;
  body: string;
  link?: { label: string; url: string };
};

export type NowGroup = {
  id: string;
  title: string;
  intro: string;
  steps: NowStep[];
};

export const doNow: NowGroup[] = [
  {
    id: "minutes",
    title: "in the next ten minutes",
    intro: "Each of these takes a minute or two, costs nothing and needs nothing from a shop.",
    steps: [
      {
        id: "alerts",
        category: { cat: "news", name: "communication" },
        title: "Check your phone can get Emergency Alerts",
        body: "Search your phone's settings for \"emergency alerts\" and make sure they are switched on. An alert only comes when there is danger to life nearby.",
        link: { label: "Emergency Alerts on gov.uk", url: "https://www.gov.uk/alerts" },
      },
      {
        id: "numbers",
        category: { cat: "news", name: "communication" },
        title: "Save the emergency numbers in your phone",
        body: "105 is the free number for a power cut anywhere in Great Britain. 0800 111 999 is the gas emergency line. Save your water company's number too; it is on your bill. Northern Ireland has its own numbers.",
      },
      {
        id: "paper",
        category: { cat: "news", name: "communication" },
        title: "Write key numbers on paper",
        body: "A phone with a flat battery holds nobody's number. Write down family, a neighbour, your GP and one friend outside your area. Keep the card by the door or in a wallet.",
      },
      {
        id: "torch",
        category: { cat: "power", name: "power and light" },
        title: "Find a torch and check it works",
        body: "Put it where you could find it in the dark, the same place every time. If it needs batteries, note what size.",
      },
      {
        id: "bottles",
        category: { cat: "water", name: "water" },
        title: "Fill a few bottles from the tap",
        body: "Clean, clearly labelled bottles of tap water cost nothing. Write the date on them and swap them every few months.",
      },
    ],
  },
  {
    id: "week",
    title: "this week",
    intro: "A little longer, still free. Most of this is knowing where things are and who to call.",
    steps: [
      {
        id: "stopcock",
        title: "Find your stopcock and gas meter",
        body: "The stopcock turns off your water; it is often under the kitchen sink. Check it turns. Find the gas meter and its lever, and your fuse box.",
      },
      {
        id: "warnings",
        category: { cat: "news", name: "communication" },
        title: "Sign up for flood and weather warnings",
        body: "Flood warnings for your postcode come free by text, call or email. Scotland and Wales run their own services, linked from the same page.",
        link: { label: "Sign up for flood warnings", url: "https://www.gov.uk/sign-up-for-flood-warnings" },
      },
      {
        id: "psr",
        title: "Join the Priority Services Register if it applies",
        body: "It is free. If anyone at home is older, disabled, has young children or relies on medical equipment, your energy and water companies give you extra help in a cut.",
        link: { label: "Priority Services Register", url: "https://www.thepsr.co.uk/" },
      },
      {
        id: "plan",
        title: "Agree a plan with your household",
        body: "Who checks on whom, where you would meet if you could not get home, and one contact outside your area everyone can reach. Ten minutes over dinner does it.",
        link: {
          label: "The government's household plan template",
          url: "https://www.gov.uk/government/publications/preparing-for-emergencies",
        },
      },
      {
        id: "neighbours",
        category: { cat: "people", name: "neighbours" },
        title: "Swap numbers with two neighbours",
        body: "Knock, say hello, and swap numbers. The people next door are the ones who can reach you when nothing else is running.",
      },
      {
        id: "charge",
        category: { cat: "power", name: "power and light" },
        title: "Keep a power bank charged",
        body: "If you already have one, charge it and put it with the torch. Top it up once a month.",
      },
      {
        id: "documents",
        category: { cat: "money", name: "cash and documents" },
        title: "Photograph your important documents",
        body: "Passports, insurance, prescriptions and bank details. Keep the photos somewhere you can reach from another phone, and paper copies in a folder.",
      },
    ],
  },
  {
    id: "month",
    title: "over the next month",
    intro: "This is where buying starts, and only for what you do not already have.",
    steps: [
      {
        id: "checklist",
        title: "Go through the checklist",
        body: "Most homes already hold a few days of what is needed. Tick off what you have first, so you only buy the gaps.",
        link: { label: "Open the checklist", url: "/checklist" },
      },
      {
        id: "tins",
        category: { cat: "food", name: "food" },
        title: "Add a few extra tins to each shop",
        body: "Two or three extra tins a week builds three days of food without a big spend. Buy what you already eat, and use the oldest first.",
      },
      {
        id: "prescriptions",
        category: { cat: "health", name: "first aid and medication" },
        title: "Reorder prescriptions earlier",
        body: "Order repeats when you have a week left, not a day. Ask your GP or pharmacist whether a small buffer is possible.",
      },
      {
        id: "cash",
        category: { cat: "money", name: "cash and documents" },
        title: "Keep a little cash at home",
        body: "Cards and cash machines stop in a power cut. A couple of days' essentials in small notes is enough.",
      },
    ],
  },
];
