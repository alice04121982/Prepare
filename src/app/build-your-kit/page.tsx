import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Illustration from "@/components/Illustration";
import Photo from "@/components/Photo";
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
    <main className="w-full py-4 sm:py-8">
      <div>
        <PageIntro
          eyebrow="Build your kit"
          title="Who lives with you, and for how long?"
          lede="Answer a few questions and get a shopping list with the quantities worked out. Tick what you already have. Copy it, print it, or send it straight to a basket."
          aside={<Illustration name="intro-kit" className="max-w-[260px]" />}
        />
      </div>
      <Photo slot="kit" className="mb-12" />
      <KitPlanner initial={initial} />
    </main>
  );
}
