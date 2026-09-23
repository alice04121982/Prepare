import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Diagram from "@/components/Diagram";
import { buildKit } from "@/data/kit-rules";
import { kits, peopleIn } from "@/data/kits";

export const metadata: Metadata = {
  title: "Ready-made kits",
  description:
    "Pick the household closest to yours and get the list with the quantities already worked out: one person, a family of four, a flat, an older relative, a baby, a dog.",
};

export default function KitsPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Ready-made kits"
        title="Pick the household closest to yours"
        lede="Every list here is worked out from the same figures as the planner, so you can take one as it stands or adjust it. Quantities, a free option on every line that has one, and one button to a basket."
        aside={<Diagram name="box" />}
      />

      <div className="mx-auto max-w-3xl">
        <ul className="divide-y divide-line border-y border-line">
          {kits.map((kit) => {
            const { lines } = buildKit(kit.household);
            const people = peopleIn(kit.household);
            return (
              <li key={kit.slug} className="py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-2xl font-medium leading-tight">
                    <Link href={`/kits/${kit.slug}`} className="hover:text-accent">
                      {kit.title}
                    </Link>
                  </h2>
                  <span className="text-sm tabular-nums text-muted">
                    {lines.length} things · {people} {people === 1 ? "person" : "people"} ·{" "}
                    {kit.household.days} days
                  </span>
                </div>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">{kit.who}</p>
                <Link href={`/kits/${kit.slug}`} className="btn btn-secondary mt-4">
                  See the list
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-sm text-muted">
          None of these quite right?{" "}
          <Link href="/build-your-kit" className="underline underline-offset-4 hover:text-heading">
            Build one for your own household
          </Link>
          , including pets, babies, over 65s and anyone on regular prescriptions.
        </p>
      </div>
    </main>
  );
}
