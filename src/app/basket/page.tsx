import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import BasketItems from "@/components/basket/BasketItems";
import { DURATIONS, durationLabel } from "@/data/packs";

export const metadata: Metadata = {
  alternates: { canonical: "/basket" },
  title: "What is in the basket",
  description:
    "Every item in a Stay Prepared kit for your household, with quantities and price bands, before it goes to your Amazon basket.",
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function BasketPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const q = await searchParams;
  const rawPeople = parseInt(first(q.p) ?? "", 10);
  const people = Number.isFinite(rawPeople) ? Math.max(1, Math.min(12, rawPeople)) : 2;
  const rawDays = parseInt(first(q.d) ?? "", 10);
  const days = DURATIONS.find((d) => d.days === rawDays)?.days ?? 3;

  return (
    <main>
      <PageIntro
        title={`everything for ${people} ${people === 1 ? "person" : "people"}, ${durationLabel(days)}`}
        lede={
          <>
            This is what the button on the home page puts in your Amazon basket, in one go. Anything you have ticked
            off on the{" "}
            <Link href="/checklist" className="font-bold">
              checklist
            </Link>{" "}
            is left out.
          </>
        }
      />
      <BasketItems people={people} days={days} />
    </main>
  );
}
