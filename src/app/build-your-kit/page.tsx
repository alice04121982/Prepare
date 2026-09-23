import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Diagram from "@/components/Diagram";
import KitPlanner from "@/components/KitPlanner";
import { householdFromParams } from "@/data/kit-rules";
import { listBySlug } from "@/data/lists";

export const metadata: Metadata = {
  title: "Build your kit",
  description:
    "Tell us who lives with you and how many days to cover. Get a shopping list with realistic quantities, a free option for every line, and a print or copy button.",
};

export default async function BuildYourKitPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initial = householdFromParams(await searchParams) ?? undefined;
  const list = listBySlug(initial?.list);
  return (
    <main>
      <PageIntro
        title={list ? list.title : "work out what your household needs"}
        lede={
          list
            ? `${list.description} Tell us who lives with you and the quantities are worked out. Tick what you already have, then copy it, print it, or send it to a basket.`
            : "Answer a few questions and get a shopping list with the quantities worked out. Tick what you already have. Copy it, print it, or send it straight to a basket."
        }
        aside={<Diagram name="box" />}
      />
      <KitPlanner initial={initial} />
    </main>
  );
}
