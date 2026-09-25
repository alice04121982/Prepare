import type { Metadata } from "next";
import Link from "next/link";
import PageIntro, { catBg, type Cat } from "@/components/PageIntro";
import Callout from "@/components/Callout";
import Arrow from "@/components/home/Arrow";
import SaferWorld from "@/components/SaferWorld";
import {
  childMortality,
  conflictDeathRate,
  disasterDeathRatePerDecade,
  drinkingWater,
  electricityAccess,
  extremePoverty,
  lifeExpectancy,
} from "@/data/safer-world";

export const metadata: Metadata = {
  alternates: { canonical: "/worried" },
  title: "If the news is frightening you",
  description:
    "Perspective and practical help for people who feel frightened or helpless watching the news, drawing on psychologists, counsellors and people who have lived through crises before.",
};

/**
 * The habits, grouped by what they are about. Each group wears the colour of
 * the category it names (news, health, people), as the checklist bands do.
 * Each habit shows its first line; the reasoning waits behind "why this helps".
 */
const habitGroups: { cat: Cat; line: string; habits: { title: string; lead: string; more: string }[] }[] = [
  {
    cat: "news",
    line: "How much of it you take in, and from where.",
    habits: [
      {
        title: "Check the news at set times, not all the time",
        lead: "Twice a day is enough to know anything that matters.",
        more: "Not first thing in the morning and not in bed. The alerts can go off. Nothing you need to act on tonight will arrive by push notification, and if it ever did, an Emergency Alert would reach your phone anyway.",
      },
      {
        title: "Choose two sources and stop there",
        lead: "One national broadcaster and one local source.",
        more: "Social feeds show you the most alarming version of every event, from everywhere, on a loop. That is their business model, not a picture of the world.",
      },
      {
        title: "Tell the difference between being informed and being on watch",
        lead: "Informed is knowing a storm is forecast on Thursday. On watch is refreshing the page every ten minutes to see whether it has started.",
        more: "The first is useful. The second is your body preparing for a threat that is not in the room.",
      },
      {
        title: "Pause before you share",
        lead: "A story that makes you angry or afraid is worth a second look before you pass it on.",
        more: "False and misleading stories are designed to provoke a quick reaction. Check: Is there a named source? Does a national news outlet report the same thing? When did it happen (today, or five years ago)? Are the people quoted real (search their name). If you cannot verify it in thirty seconds, it is probably not urgent.",
      },
    ],
  },
  {
    cat: "health",
    line: "Your mind, and the body it lives in.",
    habits: [
      {
        title: "Put the worry somewhere",
        lead: "Counsellors often suggest a worry window: fifteen minutes, same time each day, to write down what you are afraid of and what, if anything, you can do about it.",
        more: "Outside that window, when the thought comes, you note it and say: later. It sounds too simple. It works for a lot of people.",
      },
      {
        title: "Come back into the room",
        lead: "When fear spikes, name five things you can see, four you can hear, three you can touch, two you can smell, one you can taste.",
        more: "It is a standard grounding exercise, and it works because fear lives in the imagined future and your senses only work in the present.",
      },
      {
        title: "Look after the body that is doing the worrying",
        lead: "Sleep, a walk, food at normal times, less caffeine and alcohol than you reach for when stressed.",
        more: "None of it is glamorous. All of it changes how frightening the same headline feels the next morning.",
      },
      {
        title: "Pause before you share",
        lead: "A story that makes you angry or afraid is worth a second look before you pass it on.",
        more: "False and misleading stories are designed to provoke a quick reaction. Check: Is there a named source? Does a national news outlet report the same thing? When did it happen (today, or five years ago)? Are the people quoted real (search their name). If you cannot verify it in thirty seconds, it is probably not urgent.",
      },
    ],
  },
  {
    cat: "people",
    line: "Who you can say it to.",
    habits: [
      {
        title: "Say it out loud to someone",
        lead: "A worry shared with a friend, a partner or a neighbour usually shrinks.",
        more: "A worry kept to yourself and fed with headlines usually grows. If you have no one to say it to, Samaritans and Shout are free, any time.",
      },
      {
        title: "Pause before you share",
        lead: "A story that makes you angry or afraid is worth a second look before you pass it on.",
        more: "False and misleading stories are designed to provoke a quick reaction. Check: Is there a named source? Does a national news outlet report the same thing? When did it happen (today, or five years ago)? Are the people quoted real (search their name). If you cannot verify it in thirty seconds, it is probably not urgent.",
      },
    ],
  },
];

/** The two survey figures that open the page, set like the charts' headline numbers. */
const figures = [
  {
    qualifier: "nearly",
    number: "3 in 4",
    label: "adults said they felt overwhelmed by the number of crises facing the world.",
    source: "American Psychological Association, 2022",
  },
  {
    qualifier: "about",
    number: "1 in 6",
    label:
      "adults in one study followed the news so closely it harmed them. Nearly three quarters of those reported poor mental health.",
    source: "McLaughlin, Gotlieb and Mills, 2022",
  },
];

/** Where the page goes, for a reader who wants one part of it. */
const onThisPage = [
  { href: "#perspective", label: "perspective" },
  { href: "#figures", label: "the figures" },
  { href: "#habits", label: "what helps" },
  { href: "#help", label: "if it is more than worry" },
];

const children = [
  "Ask what they have heard before you explain anything. Children often know less, or something different, from what you assume.",
  "Answer honestly and simply, and do not volunteer more than they asked. It is fine to say you do not know.",
  "Tell them plainly that you will look after them and that this is your job, not theirs.",
  "Say that the news shows the worst things from everywhere, and that ordinary good days do not get reported.",
  "Keep routines. Bedtime, meals and school at the usual times tell a child more than words do.",
  "Let them help with something real: choosing the tins, checking the torch, writing the contacts card. Children feel what adults feel: doing something beats watching.",
  "Childline is free for them to call on 0800 1111 if they would rather talk to someone who is not you.",
];

const help = [
  { name: "Samaritans", detail: "Call 116 123, free, any time, about anything.", url: "https://www.samaritans.org/" },
  { name: "Shout", detail: "Text SHOUT to 85258 for a free, confidential text conversation.", url: "https://giveusashout.org/" },
  { name: "NHS 111", detail: "Option 2 for urgent mental health help, or your GP for anything that has lasted more than a couple of weeks.", url: "https://111.nhs.uk/" },
  { name: "NHS Every Mind Matters", detail: "Free, practical self-help for anxiety and sleep.", url: "https://www.nhs.uk/every-mind-matters/" },
  { name: "Mind", detail: "Information, local services and an infoline on 0300 123 3393.", url: "https://www.mind.org.uk/" },
  { name: "Anxiety UK", detail: "Helpline on 03444 775 774 and low-cost therapy.", url: "https://www.anxietyuk.org.uk/" },
  { name: "Childline", detail: "For under-19s, 0800 1111, free and confidential.", url: "https://www.childline.org.uk/" },
];

const sources = [
  { label: "American Psychological Association, Stress in America: money, inflation, war pile on to nation stuck in COVID-19 survival mode, March 2022", url: "https://www.apa.org/news/press/releases/stress/2022/march-2022-survival-mode" },
  { label: "Our World in Data: child mortality, life expectancy, extreme poverty and natural disaster deaths (world series fetched 19 September 2026)", url: "https://ourworldindata.org/" },
  { label: "Gapminder and the UN Population Division: population by country, used to turn disaster deaths into a rate", url: "https://www.gapminder.org/data/documentation/gd003/" },
  { label: "World Bank World Development Indicators: access to electricity, and basic drinking water from the WHO and UNICEF Joint Monitoring Programme", url: "https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS" },
  { label: "Uppsala Conflict Data Program and PRIO: deaths in state-based conflicts since 1946, and Organized violence 1989 to 2023", url: "https://ucdp.uu.se/" },
  { label: "Our World in Data: world conflict deaths from the Conflict Catalogue, 1920 to 1945", url: "https://ourworldindata.org/war-and-peace" },
  { label: "Mental Health Foundation, Doomscrolling: tips for healthier news consumption", url: "https://www.mentalhealth.org.uk/explore-mental-health/articles/doomscrolling-tips-healthier-news-consumption" },
  { label: "Mental Health Foundation, Talking to children about scary world events", url: "https://www.mentalhealth.org.uk/explore-mental-health/articles/talking-children-about-scary-world-events" },
  { label: "McLaughlin, Gotlieb and Mills, Caught in a Dangerous World: Problematic News Consumption and Its Relationship to Mental and Physical Ill-Being, Health Communication, 2022", url: "https://www.tandfonline.com/doi/full/10.1080/10410236.2022.2106086" },
  { label: "Harvard Health, War anxiety: how to cope, 2022", url: "https://www.health.harvard.edu/blog/war-anxiety-how-to-cope-202205232748" },
  { label: "Swedish Civil Contingencies Agency, If Crisis or War Comes", url: "https://rib.msb.se/filer/pdf/30874.pdf" },
  { label: "Action for Children, Talking to your child about upsetting news stories", url: "https://parents.actionforchildren.org.uk/feelings-behaviour/talking-about-feelings/talk-to-child-news/" },
];

/** The plus that turns to a cross when a disclosure opens, as in the checklist questions. */
function Plus() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="no-print flex-none transition-transform duration-300 group-open:rotate-45"
    >
      <path d="M9 0v18M0 9h18" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export default function WorriedPage() {
  return (
    <main>
      <PageIntro
        title="it is normal to feel like this. here is some perspective, and some help."
        lede="This page is for the moment when the headlines have got to you and the rest of the site feels like too much. Nothing here is a substitute for a doctor or a counsellor. It is what they, and people who have lived through worse, tend to say."
      />

      <div className="border-b-[3px] border-ink bg-hush">
        <p className="wrap py-3.5 text-[1.0625rem] leading-snug">
          <span className="font-extrabold">If it is more than worry:</span> call Samaritans on{" "}
          <a href="tel:116123" className="font-extrabold">
            116&nbsp;123
          </a>{" "}
          or text SHOUT to{" "}
          <a href="sms:85258?body=SHOUT" className="font-extrabold">
            85258
          </a>
          , free, any time.{" "}
          <a href="#help" className="font-bold">
            More places to turn
          </a>
        </p>
      </div>

      <nav aria-label="On this page" className="wrap no-print pt-8">
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {onThisPage.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="arrow-link inline-flex min-h-11 items-center">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="wrap">
        <section
          id="perspective"
          aria-labelledby="weakness-h"
          className="py-12 text-[1.125rem] leading-relaxed min-[900px]:py-16 min-[900px]:text-[1.1875rem]"
        >
          <h2 id="weakness-h" className="h-sub measure">
            first, this is not weakness
          </h2>
          <ul className="mt-8 grid max-w-[60rem] gap-4 min-[700px]:grid-cols-2">
            {figures.map((f) => (
              <li key={f.number} className="border-[3px] border-ink">
                <p className="border-b-[10px] border-ink px-4 pb-3 pt-3">
                  <span className="mr-2 text-lg font-bold">{f.qualifier}</span>
                  <span
                    className="display text-[clamp(2.5rem,10vw,3.5rem)] leading-none tabular-nums"
                    style={{ fontVariationSettings: '"wdth" 115' }}
                  >
                    {f.number}
                  </span>
                </p>
                <p className="px-4 pt-3 font-semibold leading-snug">{f.label}</p>
                <p className="px-4 pb-3 pt-2 text-sm text-ink-2">{f.source}</p>
              </li>
            ))}
          </ul>
          <div className="measure prose-plain mt-10">
            <p>
              If you feel frightened, you are in the majority, and the majority are not unwell. They are paying
              attention in a way human beings were never built for. Sweden&rsquo;s civil defence agency opens its
              national booklet with one line: &ldquo;Many people may feel a sense of anxiety when faced with an
              uncertain world.&rdquo;
            </p>

            <h2 className="h-sub mt-14">why it feels worse than it is</h2>
            <p className="mt-5">
              The news did not make the world more dangerous. It made it feel that way, all day. None of this means
              the risks are imaginary. It means the feeling and the risk have come apart, and it is the feeling that
              is making you miserable.
            </p>
            <details className="group mt-4 border-y-2 border-ink">
              <summary className="flex min-h-11 cursor-pointer items-center list-none gap-2.5 [&::-webkit-details-marker]:hidden font-bold">
                how the news does this <Plus />
              </summary>
              <div className="pb-4">
                <p>
                  A hundred years ago you would not have known about a flood in New Zealand, a shooting in another
                  country, or, most days, a fire in the next town. Your sense of how dangerous the world was came
                  from your street.
                </p>
                <p>
                  Now the worst thing that happens to any of eight billion people, anywhere, arrives in your hand
                  within minutes, and then again from another angle, and then with the comments. Your brain has no
                  way to file that as far away. It responds as if the danger were nearby, because for all of human
                  history it was.
                </p>
              </div>
            </details>

            <div className="mt-12">
              <Callout title="The one idea to keep">
                <p>
                  Fear is the feeling of a threat with nothing to do about it. Preparation is the doing. Fill two
                  water bottles. Write three phone numbers on a card. Check the torch works. People who do something
                  small feel calmer afterwards; people who scroll for another hour do not.
                </p>
              </Callout>
            </div>
          </div>
        </section>
      </div>

      <section id="figures" aria-labelledby="safest-h" className="border-t-[3px] border-ink py-14 min-[900px]:py-20">
        <div className="wrap">
          <div className="measure text-[1.125rem] leading-relaxed">
            <h2 id="safest-h" className="h-sub">
              the safest time there has ever been
            </h2>
            <p className="mt-5">
              This is the part that is hard to feel and easy to check. By almost every measure of whether a
              person lives, and for how long, the world is safer now than ever before.
            </p>
            <p className="mt-4">
              The figures come from the UN, the World Bank, WHO and UNICEF, the disaster database EM-DAT and
              the conflict researchers at Uppsala and Oslo, mostly gathered by Our World in Data. Choose a country
              if a world average feels too far away.
            </p>
          </div>
          <div className="mt-10">
            <SaferWorld
              world={{
                code: "OWID_WRL",
                name: "World",
                child: childMortality,
                life: lifeExpectancy,
                poverty: extremePoverty,
                water: drinkingWater,
                elec: electricityAccess,
                disasters: disasterDeathRatePerDecade,
                conflict: conflictDeathRate,
              }}
            />
          </div>
          <div className="measure mt-10 text-[1.125rem] leading-relaxed">
            <p>
              Two honest caveats. Deaths from disasters and famine fell because of warnings, engineering,
              medicine and aid. The hazards did not go away, and some are growing again with the climate. War
              deaths have also risen in the last few years, for the first time in decades.
            </p>
            <p className="mt-4">
              Neither changes the shape of these charts. The danger is real. It is smaller than it has ever been.
            </p>
          </div>
        </div>
      </section>

      <section id="habits" aria-labelledby="habits-h" className="border-t-[3px] border-ink pb-6 pt-14 min-[900px]:pb-10 min-[900px]:pt-20">
        <div className="wrap">
          <div className="measure">
            <h2 id="habits-h" className="h-sub">
              what counsellors and psychologists suggest
            </h2>
            <p className="mt-5 text-[1.125rem] leading-relaxed text-ink-2">
              Collected from NHS, Mental Health Foundation and clinical advice
              written during the pandemic and the war in Ukraine. You do not
              need to do all of them. Start with one or two that suit you.
            </p>
          </div>
        </div>
        {habitGroups.map((g) => (
          <div key={g.cat} className="mt-10 min-[900px]:mt-14">
            <div data-cat className={`${catBg[g.cat]} border-y-[3px] border-ink`}>
              <div className="wrap flex flex-wrap items-baseline gap-x-6 gap-y-1 pb-5 pt-6 min-[900px]:pb-6 min-[900px]:pt-8">
                <h3
                  className="display text-[clamp(2.25rem,9vw,4rem)]"
                  style={{ fontVariationSettings: '"wdth" 115' }}
                >
                  {g.cat}
                </h3>
                <p className="text-[1.125rem] font-semibold leading-snug">{g.line}</p>
              </div>
            </div>
            <ul className="wrap grid gap-x-14 min-[900px]:grid-cols-2 min-[1200px]:grid-cols-3">
              {g.habits.map((h) => (
                <li key={h.title} className="max-w-[60ch] border-b border-ink pb-5 pt-6 last:border-b-0 min-[900px]:border-b-0 min-[900px]:only:col-span-2">
                  <h4 className="text-[1.3125rem] font-extrabold leading-tight min-[900px]:text-[1.5rem]">{h.title}</h4>
                  <p className="mt-3 text-[1.125rem] leading-relaxed">{h.lead}</p>
                  <details className="group mt-1 text-[1.125rem] leading-relaxed">
                    <summary className="flex min-h-11 cursor-pointer items-center list-none gap-2.5 [&::-webkit-details-marker]:hidden font-bold">
                      why this helps <Plus />
                    </summary>
                    <p className="pb-1">{h.more}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="children-h" className="border-t-[3px] border-ink py-14 min-[900px]:py-20">
        <div className="wrap">
          <h2 id="children-h" className="h-sub measure">
            if you have children who are frightened
          </h2>
          <ul className="measure mt-8 border-b border-ink text-[1.125rem] leading-relaxed">
            {children.map((c) => (
              <li key={c} className="border-t border-ink py-4">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="help"
        aria-labelledby="help-h"
        className="border-t-[3px] border-ink bg-hush py-14 min-[900px]:py-20"
      >
        <div className="wrap min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] min-[900px]:items-start min-[900px]:gap-16">
          <div className="measure">
            <h2 id="help-h" className="h-sub">
              if it is more than worry
            </h2>
            <p className="mt-5 text-[1.125rem] leading-relaxed">
              If the fear is stopping you sleeping, working or leaving the
              house, or has lasted more than a couple of weeks, that is worth
              talking to someone about. None of these will think you are being
              silly.
            </p>
          </div>
          <ul className="mt-8 border-b-[3px] border-ink min-[900px]:mt-0">
            {help.map((h) => (
              <li
                key={h.name}
                className="grid gap-1 border-t-[3px] border-ink py-4 min-[900px]:grid-cols-[13rem_1fr] min-[900px]:gap-6"
              >
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-start pt-0.5 text-lg font-extrabold min-[900px]:min-h-0"
                >
                  {h.name}
                </a>
                <p className="text-[1.0625rem] leading-relaxed">{h.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="sources-h" className="border-t-[3px] border-ink py-8">
        <details className="group wrap">
          <summary className="flex min-h-11 cursor-pointer items-center list-none gap-2.5 [&::-webkit-details-marker]:hidden">
            <h2 id="sources-h" className="text-[1.3125rem]">
              sources
            </h2>
            <span className="text-ink-2">{sources.length} studies and guides</span>
            <Plus />
          </summary>
          <ul className="measure mt-4 border-b border-ink text-[0.9375rem] leading-snug text-ink-2">
            {sources.map((s) => (
              <li key={s.url} className="border-t border-ink">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-3 text-ink-2 hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section aria-labelledby="ready-h" className="border-t-[3px] border-ink pb-16 pt-14 min-[900px]:pb-24 min-[900px]:pt-20">
        <div className="wrap">
          <div className="measure">
            <h2 id="ready-h" className="h-sub">
              then, when you are ready
            </h2>
            <p className="mt-5 text-[1.125rem] leading-relaxed">
              Not today, necessarily. But the calmest thing you can do about a
              frightening world is to sort out the small part of it that is
              yours. A short list, over a few weeks, from the shop you already
              use.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href="/checklist" className="btn btn-primary btn-lg">
              what to get first <Arrow />
            </Link>
            <Link href="/what-might-stop" className="inline-flex min-h-11 items-center font-bold">
              what might stop, and for how long
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
