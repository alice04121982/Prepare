import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import KitPlanner from "@/components/KitPlanner";
import { defaultHousehold } from "@/data/kit-rules";
import { defaultDaysFor } from "@/data/lists";
import { householdFromKitParams } from "./household";

export const metadata: Metadata = {
  title: "Ready-made emergency kits for UK households",
  description:
    "Four ready-made emergency kits, 72 hours, 2 weeks to a month, 3 months and a grab bag, or your own length. Scaled to your household, with one button to send the whole kit to a basket.",
  alternates: { canonical: "/kits" },
};

/**
 * The one page for kits: choose a kit (or your own length), say who lives
 * with you, tick what you have and send the rest to a basket. The four kits
 * also have their own addresses at /kits/[slug] for search.
 */
export default async function KitsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initial = householdFromKitParams(await searchParams) ?? {
    ...defaultHousehold,
    list: "72-hours" as const,
    days: defaultDaysFor("72-hours"),
  };

  return (
    <main>
      <PageIntro
        title="ready-made kits"
        lede="Choose a kit, or your own number of days, and say who lives with you. Every quantity is worked out, with its reason next to it. Tick what you already have and send the rest to your basket."
      />
      <KitPlanner initial={initial} />
    </main>
  );
}
