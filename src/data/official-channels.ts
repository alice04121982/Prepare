/**
 * Where to get instructions during an emergency. The site prepares people
 * beforehand; in the moment, official channels lead. The site publishes no
 * live updates and takes no view on causes or politics.
 * Shown on the home page and in the offline guide.
 */
export type Channel = { name: string; what: string; url?: string };

export const officialChannelsIntro =
  "Follow official instructions first. They know what is happening where you live. This site helps you get ready beforehand, and does not post live updates.";

export const officialChannels: Channel[] = [
  {
    name: "Emergency Alerts on your phone",
    what: "A loud alert when there is danger to life nearby. Read it and do what it says.",
    url: "https://www.gov.uk/alerts",
  },
  { name: "gov.uk", what: "National advice and instructions from the government.", url: "https://www.gov.uk" },
  {
    name: "BBC radio and TV",
    what: "National news and BBC local radio carry official updates. A battery or wind-up radio works in a power cut.",
  },
  {
    name: "Your local council",
    what: "Local help, rest centres, road closures and what is happening on your street.",
    url: "https://www.gov.uk/find-local-council",
  },
  { name: "999 and 111", what: "999 when a life is at risk. 111 when it is urgent but not an emergency." },
];

export const nationsNote =
  "Scotland, Wales and Northern Ireland have their own official sites too: ready.scot, gov.wales and nidirect.gov.uk.";
