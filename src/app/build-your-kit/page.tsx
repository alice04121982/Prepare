import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Illustration from "@/components/Illustration";
import KitPlanner from "@/components/KitPlanner";
import { householdFromParams } from "@/data/kit-rules";

export const metadata: Metadata = {
  title: "Build your kit",
  description:
    "Say who lives with you and how long to cover. Get a shopping list with the quantities worked out, a free option for every line, and one button that puts the lot into a basket.",
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
          title="Stay prepared and stock up on the essentials"
          lede="Say who lives with you and how long to cover. You get a list with the quantities worked out, a free option for every line, and one button that puts the lot into an Amazon basket. Groceries come from your normal shop."
          aside={<Illustration name="intro-kit" className="w-full" />}
        />
      </div>
      <KitPlanner initial={initial} />
    </main>
  );
}
