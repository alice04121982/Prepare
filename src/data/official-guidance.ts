export type GuidanceLink = {
  title: string;
  publisher: string;
  url: string;
  /** What a reader gets there, in one or two sentences. */
  summary: string;
  /** ISO date the link was opened and its content confirmed current. */
  lastChecked: string;
  /** Publication or last-updated date where the source states one. */
  published?: string;
};

export type GuidanceGroup = {
  title: string;
  intro: string;
  links: GuidanceLink[];
};

// Every URL here was opened and confirmed live on the lastChecked date.
// Update the date when re-checking; remove or replace anything that 404s.
// Prefer live pages over PDFs: the point of this page is currency.
export const officialGuidance: GuidanceGroup[] = [
  {
    title: "Start with the government's own guidance",
    intro:
      "The UK government launched its Prepare campaign in May 2024. It is short, current, and the closest thing to an official baseline. Everything on this site is consistent with it.",
    links: [
      {
        title: "Prepare: get prepared for emergencies",
        publisher: "UK Government (Cabinet Office)",
        url: "https://prepare.campaign.gov.uk/get-prepared-for-emergencies/",
        summary:
          "The official household list: torch, power bank, wind-up radio, batteries, first aid kit, bottled water, non-perishable food, baby and pet supplies, several days of medication. Gives the water figure as 2.5 to 3 litres per person per day to drink, and 10 litres for comfort.",
        lastChecked: "2026-09-18",
      },
      {
        title: "Prepare: get involved in your community",
        publisher: "UK Government (Cabinet Office)",
        url: "https://prepare.campaign.gov.uk/get-involved-in-your-community/",
        summary:
          "How to help without getting in the way: follow local council and community-group calls for support, and do not travel to an emergency elsewhere.",
        lastChecked: "2026-09-18",
      },
      {
        title: "Preparing for emergencies (reference collection)",
        publisher: "UK Government",
        url: "https://www.gov.uk/government/publications/preparing-for-emergencies",
        summary:
          "The longer-form gov.uk publication behind the campaign, including the household emergency plan template.",
        lastChecked: "2026-09-18",
      },
    ],
  },
  {
    title: "Alerts and warnings to sign up for now",
    intro:
      "Most of the value of preparation is knowing something is coming. These are free and take minutes.",
    links: [
      {
        title: "Emergency Alerts",
        publisher: "UK Government",
        url: "https://www.gov.uk/alerts",
        summary:
          "The UK's phone-based alert system for danger to life nearby. Explains what an alert looks like and which phones receive them. No sign-up needed, but check your phone settings.",
        lastChecked: "2026-09-18",
      },
      {
        title: "Weather warnings",
        publisher: "Met Office",
        url: "https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings",
        summary:
          "Live yellow, amber and red warnings for wind, rain, snow, ice, heat, fog and thunderstorms, usually a day or more ahead.",
        lastChecked: "2026-09-18",
      },
      {
        title: "Sign up for flood warnings",
        publisher: "UK Government (Environment Agency)",
        url: "https://www.gov.uk/sign-up-for-flood-warnings",
        summary:
          "Free flood warnings by phone, text or email for your postcode in England. Scotland and Wales have equivalent services from SEPA and Natural Resources Wales.",
        lastChecked: "2026-09-18",
      },
      {
        title: "Check for flooding now",
        publisher: "UK Government (Environment Agency)",
        url: "https://check-for-flooding.service.gov.uk/",
        summary:
          "Current flood warnings and river and sea levels for England, updated every 15 minutes.",
        lastChecked: "2026-09-18",
      },
    ],
  },
  {
    title: "Power, water and extra support",
    intro:
      "The numbers and registers that matter in a cut, best set up while everything is working.",
    links: [
      {
        title: "105: the power cut number",
        publisher: "Energy Networks Association",
        url: "https://www.thepsr.co.uk/",
        summary:
          "Dial 105 from any phone in Great Britain to reach your local electricity network operator. Free, and it works whether or not you know who your operator is. This link is the Priority Services Register site run by the same networks.",
        lastChecked: "2026-09-18",
      },
      {
        title: "Priority Services Register",
        publisher: "Energy networks and water companies",
        url: "https://www.thepsr.co.uk/",
        summary:
          "Free extra support during outages for anyone older, disabled, chronically ill, with young children, or reliant on powered medical equipment. One registration covers your energy and water suppliers.",
        lastChecked: "2026-09-18",
      },
      {
        title: "Consumer Council for Water",
        publisher: "CCW",
        url: "https://www.ccwater.org.uk/",
        summary:
          "The independent water consumer body. Explains what your water company must do during an interruption, including alternative supplies and compensation.",
        lastChecked: "2026-09-18",
      },
    ],
  },
  {
    title: "Health",
    intro: "For the two situations the weather causes most often, and where to call.",
    links: [
      {
        title: "Heat exhaustion and heatstroke",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/heat-exhaustion-heatstroke/",
        summary:
          "Signs, what to do in the first 30 minutes, and when to call 999. Heat is the deadliest weather in the UK most years.",
        lastChecked: "2026-09-18",
      },
      {
        title: "When to use NHS 111",
        publisher: "NHS",
        url: "https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-use-111/",
        summary:
          "Urgent but not life-threatening help, including out-of-hours prescriptions, which matters if a disruption runs into a weekend.",
        lastChecked: "2026-09-18",
      },
    ],
  },
  {
    title: "The bigger picture",
    intro:
      "What the government actually plans for, and who coordinates locally. Useful for calibrating worry.",
    links: [
      {
        title: "National Risk Register 2025",
        publisher: "UK Government (Cabinet Office)",
        url: "https://www.gov.uk/government/publications/national-risk-register-2025",
        summary:
          "The public version of the government's assessment of the most serious risks facing the UK, with likelihood and impact for each. Published 16 January 2025. Long, but the summary tables are readable and sobering in a useful way: most of the likely risks are the ones this site plans for.",
        lastChecked: "2026-09-18",
        published: "2025-01-16",
      },
      {
        title: "Local Resilience Forums",
        publisher: "UK Government",
        url: "https://www.gov.uk/guidance/local-resilience-forums-contact-details",
        summary:
          "The councils, emergency services and utilities that plan together for your area. Find yours here; many publish local risk assessments and community emergency plan templates.",
        lastChecked: "2026-09-18",
      },
    ],
  },
  {
    title: "Elsewhere in the UK and beyond",
    intro: "Scotland has its own campaign. US readers have Ready.gov. The Red Cross covers everyone.",
    links: [
      {
        title: "Ready Scotland",
        publisher: "Scottish Government",
        url: "https://ready.scot/",
        summary: "Scotland's equivalent of the Prepare campaign, with the same core list and Scottish contacts.",
        lastChecked: "2026-09-18",
      },
      {
        title: "Prepare for emergencies",
        publisher: "British Red Cross",
        url: "https://www.redcross.org.uk/get-help/prepare-for-emergencies",
        summary: "Plain guidance on kits, plans and helping others, from the organisation that runs UK rest centres.",
        lastChecked: "2026-09-18",
      },
      {
        title: "Ready.gov",
        publisher: "US Government (FEMA)",
        url: "https://www.ready.gov/",
        summary: "The US equivalent. Longer lists and US hazards, but the same principles.",
        lastChecked: "2026-09-18",
      },
    ],
  },
];

/** The most recent check across all links, for the page header. */
export const guidanceLastChecked = officialGuidance
  .flatMap((g) => g.links.map((l) => l.lastChecked))
  .sort()
  .at(-1)!;
