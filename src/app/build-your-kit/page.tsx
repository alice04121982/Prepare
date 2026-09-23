import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Illustration from "@/components/Illustration";
import KitPlanner from "@/components/KitPlanner";
import { householdFromParams } from "@/data/kit-rules";

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
  return (
    <main className="w-full px-4 py-4 sm:px-10 sm:py-8">
      <div>
        <PageIntro
          eyebrow="Build your kit"
          title="Stay prepared and stock up on the essentials"
          lede="Answer a few questions and get a shopping list with the quantities worked out. Tick what you already have. Copy it, print it, or send it straight to a basket."
          aside={<Illustration name="intro-kit" className="w-full" />}
        />
      </div>
      <KitPlanner initial={initial} />
    </main>
  );
}
