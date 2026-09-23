import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import SectionLabel from "@/components/SectionLabel";
import Callout from "@/components/Callout";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "If the news is frightening you",
  description:
    "Perspective and practical help for people who feel frightened or helpless watching the news, drawing on psychologists, counsellors and people who have lived through crises before.",
};

const habits = [
  {
    title: "Check the news at set times, not all the time",
    body: "Twice a day is enough to know anything that matters. Not first thing in the morning and not in bed. The alerts can go off. Nothing you need to act on tonight will arrive by push notification, and if it ever did, an Emergency Alert would reach your phone anyway.",
  },
  {
    title: "Choose two sources and stop there",
    body: "One national broadcaster and one local source. Social feeds show you the most alarming version of every event, from everywhere, on a loop. That is their business model, not a picture of the world.",
  },
  {
    title: "Tell the difference between being informed and being on watch",
    body: "Informed is knowing a storm is forecast on Thursday. On watch is refreshing the page every ten minutes to see whether it has started. The first is useful. The second is your body preparing for a threat that is not in the room.",
  },
  {
    title: "Do one small, real thing",
    body: "Anxiety is the feeling of a threat with nothing to do about it. Doing something, however small, changes that. Fill two water bottles. Write three phone numbers on a card. Check the torch works. This is why the rest of this site exists, and it is why preparation calms people down rather than winding them up.",
  },
  {
    title: "Put the worry somewhere",
    body: "Counsellors often suggest a worry window: fifteen minutes, same time each day, to write down what you are afraid of and what, if anything, you can do about it. Outside that window, when the thought comes, you note it and say: later. It sounds too simple. It works for a lot of people.",
  },
  {
    title: "Come back into the room",
    body: "When fear spikes, name five things you can see, four you can hear, three you can touch, two you can smell, one you can taste. It is a standard grounding exercise, and it works because fear lives in the imagined future and your senses only work in the present.",
  },
  {
    title: "Look after the body that is doing the worrying",
    body: "Sleep, a walk, food at normal times, less caffeine and alcohol than you reach for when stressed. None of it is glamorous. All of it changes how frightening the same headline feels the next morning.",
  },
  {
    title: "Say it out loud to someone",
    body: "A worry shared with a friend, a partner or a neighbour usually shrinks. A worry kept to yourself and fed with headlines usually grows. If you have no one to say it to, the numbers at the bottom of this page are there for exactly that.",
  },
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
  { label: "Mental Health Foundation, Doomscrolling: tips for healthier news consumption", url: "https://www.mentalhealth.org.uk/explore-mental-health/articles/doomscrolling-tips-healthier-news-consumption" },
  { label: "Mental Health Foundation, Talking to children about scary world events", url: "https://www.mentalhealth.org.uk/explore-mental-health/articles/talking-children-about-scary-world-events" },
  { label: "McLaughlin, Gotlieb and Mills, Caught in a Dangerous World: Problematic News Consumption and Its Relationship to Mental and Physical Ill-Being, Health Communication, 2022", url: "https://www.tandfonline.com/doi/full/10.1080/10410236.2022.2106086" },
  { label: "Harvard Health, War anxiety: how to cope, 2022", url: "https://www.health.harvard.edu/blog/war-anxiety-how-to-cope-202205232748" },
  { label: "Swedish Civil Contingencies Agency, If Crisis or War Comes", url: "https://rib.msb.se/filer/pdf/30874.pdf" },
  { label: "Action for Children, Talking to your child about upsetting news stories", url: "https://parents.actionforchildren.org.uk/feelings-behaviour/talking-about-feelings/talk-to-child-news/" },
];

export default function WorriedPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="If the news is frightening you"
        title="It is normal to feel like this. Here is some perspective, and some help."
        lede="This page is for the moment when the headlines have got to you and the rest of the site feels like too much. Nothing here is a substitute for a doctor or a counsellor. It is what they, and people who have lived through worse, tend to say."
      />

      <div className="mx-auto max-w-3xl">
        <section className="prose-plain leading-relaxed">
          <SectionLabel>First, this is not weakness</SectionLabel>
          <h2 className="text-2xl font-semibold">First, this is not weakness</h2>
          <p className="mt-4">
            Sweden&rsquo;s civil defence agency opens its national booklet with
            one line: &ldquo;Many people may feel a sense of anxiety when faced
            with an uncertain world.&rdquo; A government does not print that on
            five million copies unless it is true of most of the people
            receiving it. In a 2022 survey by the American Psychological
            Association, almost three quarters of adults said they felt
            overwhelmed by the number of crises facing the world. If you feel
            frightened, you are in the majority, and the majority are not
            unwell. They are paying attention in a way human beings were never
            built for.
          </p>

          <h2 className="mt-12 text-2xl font-semibold">Why it feels worse than it is</h2>
          <p className="mt-4">
            A hundred years ago you would not have known about a flood in New
            Zealand, a shooting in another country, or, most days, a fire in
            the next town. You would have known what happened to the people you
            could see. Your sense of how dangerous the world was came from
            your street.
          </p>
          <p>
            Now the worst thing that happens to any of eight billion people,
            anywhere, arrives in your hand within minutes, and then again from
            another angle, and then with the comments. Your brain has no way to
            file that as far away. It responds as if the danger were nearby,
            because for all of human history it was. Researchers who study
            this have a name for the result. In one study of American adults,
            about one in six had what the authors called severely problematic
            news consumption, and of those nearly three quarters reported poor
            mental health and more than half reported physical symptoms, against
            fewer than one in ten of everyone else. The news did not make the
            world more dangerous. It made it feel that way, all day.
          </p>
          <p>
            None of this means the risks are imaginary. The government would
            not be asking households to keep three days of supplies if they
            were. It means the feeling and the risk have come apart, and it is
            the feeling that is making you miserable.
          </p>
        </section>

        <Photo slot="together-covid" aspect="aspect-[16/8]" caption className="mt-10" />


        <Callout title="The one idea to keep">
          <p>
            Fear is the feeling of a threat with nothing to do about it.
            Preparation is the doing. That is why people who fill two bottles
            and write three phone numbers on a card feel calmer afterwards,
            and why people who scroll for another hour do not.
          </p>
        </Callout>

        <section className="mt-12">
          <SectionLabel>What counsellors and psychologists suggest</SectionLabel>
          <h2 className="text-2xl font-semibold">What counsellors and psychologists suggest</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Collected from NHS, Mental Health Foundation and clinical advice
            written during the pandemic and the war in Ukraine. Pick two.
          </p>
          <ol className="mt-8 space-y-7">
            {habits.map((h, i) => (
              <li key={h.title} className="flex gap-5">
                <span className="font-heading mt-1 shrink-0 text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{h.title}</h3>
                  <p className="mt-2 leading-relaxed">{h.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <SectionLabel>If you have children who are frightened</SectionLabel>
          <h2 className="text-2xl font-semibold">If you have children who are frightened</h2>
          <ul className="mt-5 space-y-3 leading-relaxed">
            {children.map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 rounded-card bg-mint-pale px-6 py-6">
          <SectionLabel>If it is more than worry</SectionLabel>
          <h2 className="text-2xl font-semibold">If it is more than worry</h2>
          <p className="mt-3 leading-relaxed">
            If the fear is stopping you sleeping, working or leaving the
            house, or has lasted more than a couple of weeks, that is worth
            talking to someone about. None of these will think you are being
            silly.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {help.map((h) => (
              <li key={h.name} className="rounded-2xl bg-surface px-4 py-3 text-sm">
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-base font-medium text-heading underline-offset-4 hover:underline"
                >
                  {h.name}
                </a>
                <p className="mt-1 text-muted">{h.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 prose-plain leading-relaxed">
          <SectionLabel>Then, when you are ready</SectionLabel>
          <h2 className="text-2xl font-semibold">Then, when you are ready</h2>
          <p className="mt-4">
            Not today, necessarily. But the calmest thing you can do about a
            frightening world is to sort out the small part of it that is
            yours. Nine things, over a few weeks, from the shop you already
            use.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/checklist" className="btn btn-primary">
              The nine things to get first
            </Link>
            <Link href="/why" className="btn btn-secondary">
              Why three days?
            </Link>
          </div>
        </section>

        <section className="mt-14 border-t border-line pt-8">
          <h2 className="text-lg font-semibold">Sources</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
