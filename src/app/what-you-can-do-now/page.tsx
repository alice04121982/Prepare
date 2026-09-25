import type { Metadata } from "next";
import Link from "next/link";
import PageIntro, { catBg } from "@/components/PageIntro";
import Arrow from "@/components/home/Arrow";
import { doNow, type NowStep } from "@/data/do-now";

export const metadata: Metadata = {
  alternates: { canonical: "/what-you-can-do-now" },
  title: "What you can do now",
  description:
    "Free things to do today to be ready at home: check Emergency Alerts, save the 105 power cut number, find your stopcock, make a household plan. No shopping needed.",
};

function StepLink({ link }: { link: NonNullable<NowStep["link"]> }) {
  const external = link.url.startsWith("http");
  return external ? (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className="arrow-link mt-3">
      {link.label} <Arrow size={18} />
    </a>
  ) : (
    <Link href={link.url} className="arrow-link mt-3">
      {link.label} <Arrow size={18} />
    </Link>
  );
}

/** Steps are numbered straight through, across the three groups. */
const firstNumber = doNow.map((_, i) => doNow.slice(0, i).reduce((sum, g) => sum + g.steps.length, 0) + 1);

export default function DoNowPage() {
  return (
    <main>
      <PageIntro
        title="what you can do now"
        lede="Most of being ready costs nothing. Start with the first few; each takes a minute or two. Buying comes last, and only for what you do not already have."
      />

      {doNow.map((group, gi) => (
        <section
          key={group.id}
          aria-labelledby={`${group.id}-h`}
          className="border-b-[3px] border-ink py-14 min-[900px]:py-20"
        >
          <div className="wrap min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] min-[900px]:items-start min-[900px]:gap-16">
            <div className="measure">
              <h2 id={`${group.id}-h`} className="h-sub">
                {group.title}
              </h2>
              <p className="mt-4 text-[1.125rem] leading-relaxed text-ink-2">{group.intro}</p>
            </div>
            <ol start={firstNumber[gi]} className="mt-8 border-b-[3px] border-ink min-[900px]:mt-0">
              {group.steps.map((step, si) => {
                const n = firstNumber[gi] + si;
                return (
                  <li
                    key={step.id}
                    className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-t-[3px] border-ink pb-7 pt-5 min-[900px]:grid-cols-[3.25rem_minmax(0,1fr)] min-[900px]:gap-x-6"
                  >
                    <span
                      aria-hidden="true"
                      data-cat={step.category ? "" : undefined}
                      className={`display grid h-11 w-11 place-items-center text-[1.5rem] tabular-nums min-[900px]:h-13 min-[900px]:w-13 min-[900px]:text-[1.75rem] ${
                        step.category ? `${catBg[step.category.cat]} border-[3px] border-ink text-ink` : "bg-ink text-paper"
                      }`}
                      style={{ fontVariationSettings: '"wdth" 115' }}
                    >
                      {n}
                    </span>
                    <div className="min-w-0">
                      {step.category ? (
                        <p className="mb-2">
                          <span
                            data-cat=""
                            className={`${catBg[step.category.cat]} inline-block border-2 border-ink px-2 py-0.5 text-[0.875rem] font-extrabold leading-tight text-ink`}
                          >
                            {step.category.name}
                          </span>
                        </p>
                      ) : null}
                      <h3 className="text-[1.3125rem] leading-tight min-[900px]:text-[1.5rem]">{step.title}</h3>
                      <p className="mt-2.5 max-w-[60ch] text-[1.125rem] leading-relaxed">{step.body}</p>
                      {step.link ? <StepLink link={step.link} /> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ))}

      <section aria-labelledby="next-h" className="bg-hush py-14 min-[900px]:py-20">
        <div className="wrap measure">
          <h2 id="next-h" className="h-sub">
            when you are ready to buy
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed">
            Tick off what you already have, then buy only what is missing, in one basket if you like.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/checklist" className="btn btn-primary btn-lg">
              check your cupboard <Arrow />
            </Link>
            <Link href="/#hero-actions" className="btn btn-secondary btn-lg">
              see the ready-made kits
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
