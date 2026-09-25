import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/home/Arrow";
import OfficialChannels from "@/components/OfficialChannels";
import ReachBar from "@/components/home/ReachBar";
import Shelf, { type Tin } from "@/components/home/Shelf";
import StarterBaskets from "@/components/home/StarterBaskets";
import StepState from "@/components/home/StepState";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
    title: "check what you already have",
    body: "Most cupboards hold a few days. Tins, a torch, the medicine cabinet. Tick them off against the list before you buy anything.",
    href: "/checklist",
    cta: "see the checklist",
    state: "check" as const,
  },
  {
    title: "buy what is missing",
    body: "Say who lives with you and the quantities are worked out for you. The free option comes first on every line.",
    href: "/kits",
    cta: "see the kits",
    state: "buy" as const,
  },
  {
    title: "talk to your neighbours",
    body: "Two or three names and a way to check on each other. The better prepared you are, the more you can give to the neighbour who could not prepare.",
    href: "/community",
    cta: "how to start",
    state: null,
  },
];

export default function Home() {
  return (
    <main>
      {/* Opening: the title beside what the site is, the ready-made kit across the width under both */}
      <section
        id="hero"
        aria-labelledby="hero-h"
        className="wrap pb-16 pt-9 min-[900px]:pb-26 min-[900px]:pt-16"
      >
        <div className="min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] min-[900px]:items-start min-[900px]:gap-x-16">
          <h1
            id="hero-h"
            className="display max-w-[14ch] text-[clamp(2.6rem,11.5vw,4.75rem)]"
            style={{ fontVariationSettings: '"wdth" 108' }}
          >
            a practical guide to being ready at home
          </h1>
          <div>
            <p className="mt-6 max-w-[40ch] text-[1.1875rem] leading-normal min-[900px]:mt-0 min-[900px]:text-[1.375rem]">
              What to keep, how much and what to do first when the power, water
              or shops stop, for a day or for months.
            </p>
            <p className="mt-6 border-t-[3px] border-ink pt-4 text-lg font-semibold">
              Frightened by the news?{" "}
              <Link href="/worried" className="inline-flex min-h-11 items-center">
                Start here instead.
              </Link>
            </p>
            <p className="text-lg font-semibold">
              Not ready to buy anything?{" "}
              <Link href="/what-you-can-do-now" className="inline-flex min-h-11 items-center">
                What you can do now, for free.
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-10 min-[900px]:mt-14">
          <StarterBaskets />
        </div>
      </section>

      {/* Would you be all right: the shelf of tins on the left, the question beside it */}
      <section aria-labelledby="stop-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-26">
        <div className="wrap grid gap-x-16 gap-y-10 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[900px]:items-start">
          <div>
            <h2 id="stop-h" className="max-w-[22ch] text-[clamp(1.75rem,7vw,3rem)]">
              if the power went off, the water stopped and the shops were shut
              for three days, would you be all right?
            </h2>
            <div className="mt-6 grid max-w-[52ch] gap-4 text-lg">
              <p>
                The government asks every UK household to be able to manage on
                its own for three days. Severe weather, a fault in the grid, a
                cyber attack on a water company, or disruption from a conflict
                elsewhere in Europe can all have the same effect at home.
              </p>
              <p>
                Most of these last hours or days. A pandemic can last months. All are
                easier with a few things in the cupboard and a plan you made
                while everything worked. For the very worst cases, there is
                little any household can do. For everything else, start with three
                days of supplies and build from there.
              </p>
              <Link href="/what-might-stop" className="arrow-link">
                what might stop, and for how long <Arrow size={18} />
              </Link>
            </div>
          </div>
          <div className="min-[900px]:order-first">
            <Shelf tins={tins} />
          </div>
        </div>
      </section>

      {/* Three things: the shelf of steps */}
      <section aria-labelledby="three-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-26">
        <div className="wrap">
          <h2 id="three-h" className="h-section">
            three things, in this order
          </h2>
          <ol className="mt-10 border-b-8 border-ink">
            {steps.map((s, i) => (
              <li
                key={s.href}
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
                  <Link href={s.href} className="arrow-link mt-4 text-lg">
                    {s.cta} <Arrow size={18} />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <OfficialChannels />

      {/* Keep a copy: end on something to do, on paper */}
      <section aria-labelledby="off-h" className="border-t-[3px] border-ink bg-hush py-16 min-[900px]:py-26">
        <div className="wrap min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] min-[900px]:items-start min-[900px]:gap-16">
          <h2 id="off-h" className="h-section max-w-[14ch]">
            keep a copy on paper
          </h2>
          <div>
            <p className="mt-5 max-w-[60ch] text-[1.1875rem] leading-normal min-[900px]:mt-3">
              A power cut takes the internet with it. Print the checklist and
              keep it with your documents, or save the offline guide to your
              phone. One file, no internet needed.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/checklist" className="btn btn-primary btn-lg">
                print the checklist <Arrow />
              </Link>
              <a
                href="/offline-guide"
                download="Offline guide.html"
                className="btn btn-secondary btn-lg"
              >
                <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden="true" className="flex-none">
                  <path d="M8 0v13M2 8l6 6 6-6M0 18.5h16" fill="none" stroke="currentColor" strokeWidth="2.6" />
                </svg>
                download the offline guide
              </a>
            </div>
          </div>
        </div>
      </section>

      <ReachBar watch="hero" hideOver={["hero-actions"]} />
    </main>
  );
}
