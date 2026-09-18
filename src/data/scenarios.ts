export type Scenario = {
  slug: string;
  title: string;
  summary: string;
  typicalDuration: string;
  whatHelps: string[];
};

// Placeholder content — durations and guidance to be reviewed against
// cited sources (gov.uk, Red Cross, FEMA) before publishing.
export const scenarios: Scenario[] = [
  {
    slug: "power-outage",
    title: "Power outage",
    summary: "Loss of mains electricity, from a storm, grid fault, or planned load shedding.",
    typicalDuration: "Most resolve within hours; a small share last 1-3 days",
    whatHelps: ["Torches and spare batteries", "A way to charge a phone without mains power", "Food that needs no cooking"],
  },
  {
    slug: "water-disruption",
    title: "Water supply disruption",
    summary: "Mains water cut off or advised unsafe to drink (e.g. a burst main, contamination notice).",
    typicalDuration: "Usually under 48 hours",
    whatHelps: ["Stored drinking water (about 2L per person per day)", "A method to purify water if needed"],
  },
  {
    slug: "supply-delays",
    title: "Supply chain / delivery delays",
    summary: "Shops or deliveries disrupted by weather, fuel shortages, or logistics problems.",
    typicalDuration: "Days to a couple of weeks",
    whatHelps: ["A modest store cupboard of shelf-stable food", "Not panic-buying, which worsens shortages for everyone"],
  },
];
