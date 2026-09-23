import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import KitPlanner from "@/components/KitPlanner";
import { defaultHousehold, householdFromParams, householdToQuery } from "@/data/kit-rules";
import { defaultDaysFor, isListSlug, listBySlug, lists } from "@/data/lists";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Search-facing titles: what people type, not the display title. */
const seoTitles: Record<string, string> = {
  "72-hours": "72 hour emergency kit list for UK households",
  "two-weeks-to-a-month": "2 week to 1 month emergency supplies list, UK",
  "three-months": "3 month food and supplies stockpile list, UK",
  "grab-bag": "Grab bag checklist: what to pack to leave home fast, UK",
};

export function generateStaticParams() {
  return lists.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const list = listBySlug(slug);
  if (!list) return {};
  return {
    title: seoTitles[slug] ?? list.title,
    description: `${list.description} Scaled to your household, with every quantity worked out and one button to send the whole list to a basket.`,
    alternates: { canonical: `/lists/${slug}` },
  };
}

export default async function ListPage({ params, searchParams }: Props) {
  const { slug } = await params;
  if (!isListSlug(slug)) notFound();
  const list = listBySlug(slug);

  const fromUrl = householdFromParams(await searchParams);
  // The planner can switch list in place. If the address bar now names a
  // different list, send the reader to that list's own page.
  if (fromUrl?.list && fromUrl.list !== slug) {
    redirect(`/lists/${fromUrl.list}${householdToQuery(fromUrl)}`);
  }
  const initial = fromUrl
    ? { ...fromUrl, list: slug }
    : { ...defaultHousehold, list: slug, days: defaultDaysFor(slug) };

  return (
    <main>
      <PageIntro
        title={`${list.title} list`}
        lede={
          <>
            <p>{list.description}</p>
            <p className="mt-3 font-semibold">Made for: {list.reasons}</p>
          </>
        }
      />
      <KitPlanner initial={initial} />
    </main>
  );
}
