import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import BasketItems from "@/components/basket/BasketItems";
import { BUDGETS, type Budget } from "@/data/starter-baskets";

export const metadata: Metadata = {
  title: "What is in the basket",
  description:
    "Every item in a Stay Prepared budget basket, with the quantity for your household and a price band, before it goes to Amazon.",
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
  const rawBudget = parseInt(first(q.b) ?? "", 10);
  const budget: Budget = (BUDGETS as readonly number[]).includes(rawBudget) ? (rawBudget as Budget) : 50;

  return (
    <main>
      <PageIntro
        title={`the £${budget} basket for ${people} ${people === 1 ? "person" : "people"}`}
        lede="This is what the button on the home page puts in your Amazon basket. The quantities are for three days. Anything you have ticked off on the checklist is left out."
      />
      <BasketItems people={people} budget={budget} />
    </main>
  );
}
