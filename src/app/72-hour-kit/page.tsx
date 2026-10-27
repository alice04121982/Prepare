import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Arrow from "@/components/home/Arrow";
import { bottledWaterLitres } from "@/data/kit-rules";
import { householdKits } from "@/data/household-kits";

export const metadata: Metadata = {
  title: "72 hour emergency kit: UK lists by household",
  description:
    "The government's 3-day minimum, worked out for your household: one person, a couple, a family of four, a baby, an older couple or a dog.",
  alternates: { canonical: "/72-hour-kit" },
};

/** Index of the household 72 hour kits (src/data/household-kits.ts). */
export default function SeventyTwoHourKitPage() {
  return (
    <main>
      <PageIntro
        title="72 hour kit"
        lede={
          <p>
            The UK government asks every household to be ready to cope for at least 3 days. Pick the household
            closest to yours to see the whole list with the amounts worked out.
          </p>
        }
      />
      <section aria-labelledby="households-h" className="py-14 min-[900px]:py-20">
        <div className="wrap">
          <h2 id="households-h" className="h-sub">
            pick your household
          </h2>
          <ul className="mt-8 grid gap-3 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3">
            {householdKits.map((k) => (
              <li key={k.slug}>
                <Link
                  href={`/72-hour-kit/${k.slug}`}
                  className="flex h-full flex-col border-[3px] border-ink px-4 py-3.5 no-underline hover:bg-hush"
                >
                  <span className="text-lg font-extrabold leading-snug">{k.name}</span>
                  <span className="mt-1 leading-snug">
                    {k.who}. <span className="tabular-nums">{bottledWaterLitres(k.household)}</span> litres of water.
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 font-bold">
                    see the list <Arrow size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="measure mt-8 text-[1.125rem] leading-relaxed">
            None of these quite right?{" "}
            <Link href="/checklist?list=72-hours#your-kit" className="font-bold">
              Make your own list
            </Link>{" "}
            with any mix of adults, children, babies and pets.
          </p>
        </div>
      </section>
    </main>
  );
}
