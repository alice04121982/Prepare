import Link from "next/link";
import Arrow from "@/components/home/Arrow";
import Shelf, { type Tin } from "@/components/home/Shelf";
import StartForm from "@/components/home/StartForm";
import StepState from "@/components/home/StepState";

const tins: Tin[] = [
  { id: "water", name: "water", amount: "3 litres per person per day", when: "if nothing comes out of the taps", cat: "bg-cat-water" },
  { id: "warmth", name: "warmth", amount: "Blankets, warm layers, a hot-water bottle", when: "if the heating goes off", cat: "bg-cat-power" },
  { id: "food", name: "food", amount: "3 to 7 days per person, from what you already eat", when: "if the shops run short", cat: "bg-cat-food" },
  { id: "cash", name: "cash", amount: "A couple of days' essentials, in small notes", when: "if cards and cash machines stop", cat: "bg-cat-money" },
  { id: "radio", name: "radio", amount: "One per household, wind-up or battery", when: "if mobile networks and the internet go down", cat: "bg-cat-news" },
  { id: "neighbours", name: "neighbours", amount: "Two or three names you can reach on foot", when: "if buses and trains stop", cat: "bg-cat-people" },
  { id: "medicine", name: "medicine", amount: "A 1 to 2 week buffer of prescriptions, where your GP allows", when: "if prescriptions are hard to get", cat: "bg-cat-health" },
];

const steps = [
  {
    title: "pick your list",
    body: "Say who lives with you and what you are preparing for. Every quantity is worked out for your household, with the reason next to it.",
    state: null,
  },
  {
    title: "tick what you already have",
    body: "Most cupboards already hold some of it. Tick it off and it drops out of what you buy. Ticks are saved in this browser.",
    state: "check" as const,
  },
  {
    title: "send the rest to your basket",
    body: "One button puts the whole list into an Amazon basket, or buy item by item from the shop you prefer.",
    state: "buy" as const,
  },
];

const guides = [
  { href: "/checklist", title: "the essentials checklist", body: "Everything to keep, with realistic amounts. Printable." },
  { href: "/why", title: "why three days?", body: "What could stop, and what the UK and its neighbours now ask households to do." },
  { href: "/community", title: "neighbours", body: "Two or three names and a way to check on each other." },
  { href: "/worried", title: "worried by the news?", body: "Perspective, and where to get help." },
  { href: "/sources", title: "where the numbers come from", body: "The guidance every quantity is based on." },
];

export default function Home() {
  return (
    <main>
      {/* Opening: what the site does on the left, the start form beside it */}
      <section
        aria-labelledby="hero-h"
        className="wrap grid gap-x-16 gap-y-10 pb-16 pt-9 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] min-[900px]:pb-26 min-[900px]:pt-16"
      >
        <div>
          <h1
            id="hero-h"
            className="display max-w-[14ch] text-[clamp(2.6rem,11.5vw,4.75rem)]"
            style={{ fontVariationSettings: '"wdth" 108' }}
          >
            ready-made prepping lists for your household
          </h1>
          <p className="mt-6 max-w-[40ch] text-[1.1875rem] leading-normal min-[900px]:mt-9 min-[900px]:text-[1.375rem]">
            Say who lives with you and what you are preparing for. Get the whole
            shopping list worked out, then send it to your basket in one go.
          </p>
          <p className="mt-6 border-t-[3px] border-ink pt-4 text-lg font-semibold">
            Frightened by the news?{" "}
            <Link href="/worried" className="inline-flex min-h-11 items-center">
              Start here instead.
            </Link>
          </p>
        </div>
        <StartForm />
      </section>

      {/* How it works */}
      <section aria-labelledby="three-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-26">
        <div className="wrap">
          <h2 id="three-h" className="h-section">
            how it works
          </h2>
          <ol className="mt-10 border-b-8 border-ink">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-[4rem_1fr] gap-x-4.5 border-t-8 border-ink pb-9 pt-6 min-[900px]:grid-cols-[6rem_minmax(0,1.1fr)_minmax(0,1fr)] min-[900px]:gap-x-9 min-[900px]:pb-12 min-[900px]:pt-8"
              >
                <span
                  aria-hidden="true"
                  className="display grid h-20 w-16 place-items-center bg-ink text-[3.25rem] tabular-nums text-paper min-[900px]:h-30 min-[900px]:w-24 min-[900px]:text-[5rem]"
                  style={{ fontVariationSettings: '"wdth" 125' }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="pt-1 text-[clamp(1.75rem,7.4vw,3rem)] min-[900px]:pt-2 min-[900px]:text-[3.25rem]">
                    {s.title}
                  </h3>
                  {s.state ? <StepState step={s.state} /> : null}
                </div>
                <div className="col-start-2 mt-3.5 min-[900px]:col-start-3 min-[900px]:mt-3">
                  <p className="max-w-[60ch] text-lg min-[900px]:text-[1.1875rem]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href="#start" className="btn btn-primary btn-lg mt-10">
            pick your list <Arrow />
          </a>
        </div>
      </section>

      {/* Why prepare: the shelf of what could stop and what helps */}
      <section aria-labelledby="stop-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-26">
        <div className="wrap grid gap-x-16 gap-y-8 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h2 id="stop-h" className="max-w-[22ch] text-[clamp(1.75rem,7vw,3rem)]">
              if the power went off, the water stopped and the shops were shut
              for three days, would you be all right?
            </h2>
            <div className="mt-6 grid max-w-[52ch] gap-4 text-lg">
              <p>
                The government asks every UK household to be able to manage on
                its own for at least three days. Storms, grid faults, cyber
                attacks on water and power, and war in Europe can all do it.
                So can losing your income.
              </p>
              <p>
                Most disruptions last hours or days. The longer lists are for
                the ones that do not, and for a household that wants a few
                months of food in the cupboard whatever happens.
              </p>
              <Link href="/why" className="arrow-link">
                why three days? <Arrow size={18} />
              </Link>
            </div>
          </div>
          <Shelf tins={tins} />
        </div>
      </section>

      {/* Guides */}
      <section aria-labelledby="guides-h" className="border-t-[3px] border-ink bg-hush py-16 min-[900px]:py-26">
        <div className="wrap">
          <h2 id="guides-h" className="h-section">
            guides
          </h2>
          <ul className="mt-8 border-t-[3px] border-ink">
            {guides.map((g) => (
              <li key={g.href} className="border-b border-ink">
                <Link
                  href={g.href}
                  className="grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 py-4 no-underline hover:underline"
                >
                  <span>
                    <span className="block text-xl font-extrabold">{g.title}</span>
                    <span className="mt-0.5 block text-ink-2">{g.body}</span>
                  </span>
                  <Arrow />
                </Link>
              </li>
            ))}
            <li className="border-b border-ink">
              <a
                href="/offline/index.html"
                download="stay-prepared-offline-guide.html"
                className="grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 py-4 no-underline hover:underline"
              >
                <span>
                  <span className="block text-xl font-extrabold">the offline guide</span>
                  <span className="mt-0.5 block text-ink-2">One file, no internet needed. Save it before you need it.</span>
                </span>
                <Arrow />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
