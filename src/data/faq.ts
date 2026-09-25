export type FaqEntry = {
  slug: string;
  question: string;
  /** One or more paragraphs. */
  answer: string[];
};

export type FaqGroup = {
  title: string;
  entries: FaqEntry[];
};

export const faq: FaqGroup[] = [
  {
    title: "Is this prepping?",
    entries: [
      {
        slug: "is-this-prepping",
        question: "Isn't this just \"prepping\" or doomsday thinking?",
        answer: [
          "No. This is closer to what emergency services and governments already recommend: modest, realistic readiness for short, common disruptions, not preparing for civilisation's collapse.",
          "The difference is in the scenarios. Prepper culture plans for total breakdown and assumes you will be on your own. This site plans for a three-day power cut, a boil-water notice, a fortnight of thin shelves, and assumes, because the evidence says so, that you will be surrounded by people helping each other.",
        ],
      },
      {
        slug: "why-not-alarmist",
        question: "Why stay calm about it?",
        answer: [
          "Because fear leads to the wrong actions. Frightened households panic-buy, which empties shelves for everyone. Frightened people keep to themselves, which is how vulnerable neighbours go unchecked. Calm preparation, done slowly, is both more effective and more considerate, and it is the register the government and the Red Cross use for the same reason.",
          "It is also simply more accurate. Most disruptions are short, local, and dull. Describing them that way is not complacency.",
        ],
      },
      {
        slug: "who-is-this-for",
        question: "Who is this site for?",
        answer: [
          "Anyone who has seen a news story about a storm, a shortage or a grid warning and wants a sensible starting point. It is written for households with limited time and budget who want a short, prioritised list and honest timeframes.",
          "It is not written for people who want to be self-sufficient for months. The advice here matches what the UK government and the Red Cross ask of households, and stops there.",
        ],
      },
    ],
  },
  {
    title: "How much and how long",
    entries: [
      {
        slug: "stockpile",
        question: "Should I stockpile as much as possible?",
        answer: [
          "No. Large stockpiling is counterproductive. It empties shelves for everyone else, most disruptions are short, and unused stock often goes to waste. A modest, rotated supply covers the realistic scenarios.",
          "The shortage most people remember from recent years was not caused by a lack of supply. It was caused by everyone buying three weeks' worth in the same three days. Buying normally is the single most helpful thing you can do during a supply scare.",
        ],
      },
      {
        slug: "first-thing",
        question: "What's the single most useful thing to do first?",
        answer: [
          "Build a 3-day supply of water, food, and any essential medication, and know two neighbours by name.",
        ],
      },
      {
        slug: "how-long-does-a-kit-last",
        question: "How long does a \"72-hour kit\" actually last a family?",
        answer: [
          "Exactly as long as it says, if you have scaled it to the household. The trap is a kit sized for one person quietly sitting in a cupboard while four people live in the house. Water is the clearest example: 3 litres per person per day means a family of four needs 36 litres for three days, not the six-litre pack that fitted under the sink.",
          "In practice most households already have more than three days of food. The gaps are usually water, light, a way to charge a phone, and a buffer of prescription medication. Those are the things to check.",
        ],
      },
      {
        slug: "how-much-water",
        question: "Three litres of water per person per day sounds like a lot to store",
        answer: [
          "It is the drinking figure, taken from gov.uk and the World Health Organisation, and it is the one worth meeting. For a household of two, a three-day stock is eighteen litres, which is three standard six-packs of bottled water. It takes up about the same room as a couple of bags of potatoes.",
          "Cooking and washing water is extra and optional. In a planned cut, a filled bath or a couple of buckets covers flushing without touching the drinking stock.",
        ],
      },
      {
        slug: "does-it-go-off",
        question: "Won't it all go out of date?",
        answer: [
          "Not if the supply is made of things you already eat and you use the oldest first. That is the whole point of building it from your normal shopping rather than buying special emergency food. Sealed bottled water keeps for years. Tinned food is usually fine well past its best-before date, though rotate it anyway.",
          "Batteries, first aid supplies, and medication are the things to check on a schedule. Twice a year, when the clocks change, is an easy habit.",
        ],
      },
      {
        slug: "cost",
        question: "How much does this cost?",
        answer: [
          "Starting from nothing, a household can cover the 'first' items on the checklist for well under the cost of a weekly shop, spread over a couple of months. Water, a torch, batteries, a tin opener, and a paper list of phone numbers are all cheap. A decent power bank and a wind-up radio are the two items most people need to buy new.",
          "The food part costs nothing extra over time, because you eat it. It is a shift in when you buy things, not how much.",
        ],
      },
    ],
  },
  {
    title: "Specific worries",
    entries: [
      {
        slug: "flat-no-storage",
        question: "I live in a small flat with no storage space",
        answer: [
          "The three-day minimum for one person is nine litres of water, a few tins, a torch, a power bank, and a folder of documents. That fits in a single box or the bottom of a wardrobe. You do not need a garage.",
          "Flats also have an advantage: neighbours are close. A building group chat is one of the easiest networks to set up and one of the most useful during a power cut.",
        ],
      },
      {
        slug: "generator",
        question: "Should I buy a generator?",
        answer: [
          "For almost every household, no. Generators are expensive, need fuel storage, and are dangerous if used anywhere near a living space. Carbon monoxide from generators and camping stoves used indoors is the leading cause of death in power cuts.",
          "If someone at home relies on powered medical equipment, the first step is registering with your network operator's Priority Services Register, which gets you earlier restoration and support. Talk to the equipment supplier about battery backup before considering a generator.",
        ],
      },
      {
        slug: "phone-signal",
        question: "Will my phone work in a power cut?",
        answer: [
          "Usually for several hours, and often longer. Mobile masts have backup batteries, but they can run down in a long or widespread outage, and networks get congested when everyone calls at once. A charged power bank keeps your handset alive; a battery radio keeps you informed if the network drops.",
          "Text messages often get through when calls do not. Agree with family that a text saying you are fine is enough.",
        ],
      },
      {
        slug: "medication-buffer",
        question: "How do I build a buffer of prescription medication?",
        answer: [
          "Ask your GP or pharmacist. Many will allow a reorder a few days early, which over a few cycles builds a one- to two-week buffer without anyone going without. Rotate it so the oldest is used first. Some medications have specific storage needs, so ask rather than assume.",
        ],
      },
      {
        slug: "pets",
        question: "What about pets?",
        answer: [
          "A week of food, water counted into the household total, any medication, a carrier, and a recent photo. Not every rest centre accepts animals, so know a friend or neighbour who would take them if you had to leave. In a heatwave or cold snap, pets are affected in the same way as people and need the same checking on.",
        ],
      },
      {
        slug: "civil-disruption",
        question: "Why include civil disruption? Isn't that alarmist?",
        answer: [
          "It is included because it is realistic and occasionally happens, not because it is likely for any given household. A few days of local unrest, a transport shutdown, or a strain on local services is something some towns experience from time to time. The preparation is identical to a bad storm: stay in comfortably for a short while, follow official local sources rather than rumour, and check on neighbours.",
          "Including it plainly, with the same calm treatment as a power cut, is the opposite of alarmism. Leaving it out would suggest it is unthinkable, which is not true either.",
        ],
      },
      {
        slug: "help-others",
        question: "I'm fine. How do I help people who aren't?",
        answer: [
          "Start on your own street. Knock on the doors of anyone you know to be older, disabled, or alone, and ask whether they have what they need. Offer to carry water, collect a prescription, or share a charger. Then find or join a local mutual aid or neighbourhood group, which will already know where the gaps are.",
          "If you have skills, share them: a first aid session, a repair afternoon, a cooked meal for a floor of a block.",
        ],
      },
    ],
  },
];
