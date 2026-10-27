import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import Arrow from "@/components/home/Arrow";
import AmazonBasketButton, { basketLabel, BASKET_NOTE } from "@/components/AmazonBasketButton";
import { catBgFor } from "@/components/kit/categories";
import { bottledWaterLitres, buildKit, householdToQuery } from "@/data/kit-rules";
import { buysFor, packTotals } from "@/data/packs";
import { getHouseholdKit, householdKits } from "@/data/household-kits";
import { getGuide } from "@/data/guides";
import { PRICE_NOTE } from "@/lib/amazon";

export const dynamicParams = false;

export function generateStaticParams() {
  return householdKits.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata(props: PageProps<"/72-hour-kit/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const kit = getHouseholdKit(slug);
  if (!kit) return {};
  return {
    title: kit.metaTitle,
    description: kit.description,
    alternates: { canonical: `/72-hour-kit/${kit.slug}` },
  };
}

/**
 * The 72 hour kit for one household (src/data/household-kits.ts), built by
 * the same engine as the planner and rendered on the server, so the whole
 * list is in the page for search engines. The basket and "change it" both
 * hand over to /checklist for anything the reader wants to adjust.
 */
export default async function HouseholdKitPage(props: PageProps<"/72-hour-kit/[slug]">) {
  const { slug } = await props.params;
  const kit = getHouseholdKit(slug);
  if (!kit) notFound();

  const h = kit.household;
  const { lines } = buildKit(h);
  const categories = [...new Set(lines.map((l) => l.category))];
  const litres = bottledWaterLitres(h);
  const tins = lines.find((l) => l.id === "tins")?.quantity;
  const buys = buysFor(lines, h.adults + h.children, "regular");
  const { estimate } = packTotals(buys);
  const items = buys.map((b) => ({ asin: b.product.asin, quantity: b.quantity }));
  const free = lines.filter((l) => l.freeOption).length;
  const planner = `/checklist${householdToQuery(h)}#your-kit`;
  const guides = kit.guides.map(getGuide).filter((g): g is NonNullable<typeof g> => Boolean(g));
  const others = householdKits.filter((k) => k.slug !== kit.slug);

  return (
    <main>
      <PageIntro
        title={`72 hour kit for ${kit.name}`}
        lede={
          <p>
            For {kit.who}, the government&apos;s 3&#8209;day minimum comes to {litres} litres of drinking water
            {tins ? `, ${tins} tins` : ""} and {lines.length} things in all. Of these, {free} have a free option, such as tap
            water or something you already own.
          </p>
        }
      >
        {kit.note.map((p) => (
          <p key={p} className="max-w-[48ch] text-[1.125rem] leading-relaxed">
            {p}
          </p>
        ))}
      </PageIntro>

      <section aria-labelledby="list-h" className="border-b-[3px] border-ink py-14 min-[900px]:py-20">
        <div className="wrap">
          <h2 id="list-h" className="h-sub">
            the list
          </h2>
          <p className="measure mt-4 text-[1.125rem] leading-relaxed">
            Every amount is worked out for {kit.who}, from gov.uk and World Health Organisation figures. Check
            your cupboards first and buy only what is missing.
          </p>
          <div className="mt-8 border-[3px] border-ink">
            {categories.map((c, gi) => (
              <section key={c} aria-labelledby={`cat-${gi}`} className={gi ? "border-t-[3px] border-ink" : ""}>
                <h3
                  id={`cat-${gi}`}
                  className={`${catBgFor(c)} border-b-[3px] border-ink px-3 pb-2.5 pt-3 text-[1.625rem] lowercase min-[900px]:px-5 min-[900px]:text-[2rem]`}
                >
                  {c}
                </h3>
                <ul className="divide-y divide-ink">
                  {lines
                    .filter((l) => l.category === c)
                    .map((l) => (
                      <li key={l.id} className="px-3 py-3.5 min-[900px]:px-5 min-[900px]:py-4">
                        <div className="max-w-[62ch]">
                          <p className="text-lg font-extrabold leading-tight">{l.item}</p>
                          <p className="mt-0.5 font-bold">
                            <span className="tabular-nums">{l.quantity}</span> {l.unit}
                          </p>
                          <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink-2">{l.basis}</p>
                          {l.freeOption ? (
                            <p className="mt-1.5 text-[0.9375rem] leading-snug">
                              <span className="font-extrabold">Free option:</span> {l.freeOption}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="buy-h" className="border-b-[3px] border-ink bg-hush py-14 min-[900px]:py-20">
        <div className="wrap">
          <h2 id="buy-h" className="h-sub">
            buy what is missing
          </h2>
          <p className="measure mt-4 text-[1.125rem] leading-relaxed">
            Bought new, the things Amazon sells come to about{" "}
            <span className="font-extrabold tabular-nums">&pound;{estimate}</span>. Most households need far less,
            because they already own much of it. To take off what you have, open the list in the planner first.
          </p>
          <div className="mt-8 grid max-w-[40rem] gap-4">
            <AmazonBasketButton items={items} note={BASKET_NOTE}>
              {basketLabel(items.length)}
            </AmazonBasketButton>
            <Link href={planner} className="btn btn-secondary btn-lg">
              change it for your household <Arrow />
            </Link>
          </div>
          <p className="mt-5 max-w-[60ch] text-[0.8125rem] leading-snug text-ink-2">
            Some links here earn us a small commission. It never changes what we recommend, and the free option is
            always listed first. As an Amazon Associate we earn from qualifying purchases. {PRICE_NOTE}
          </p>
        </div>
      </section>

      <section aria-labelledby="more-h" className="py-14 min-[900px]:py-20">
        <div className="wrap measure">
          <h2 id="more-h" className="h-sub">
            other households
          </h2>
          <ul className="mt-5 grid gap-2">
            {others.map((k) => (
              <li key={k.slug}>
                <Link href={`/72-hour-kit/${k.slug}`} className="arrow-link">
                  72 hour kit for {k.name} <Arrow size={18} />
                </Link>
              </li>
            ))}
          </ul>
          {guides.length ? (
            <div className="mt-10">
              <h2 className="text-lg font-extrabold">short answers</h2>
              <ul className="mt-3 grid gap-2">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="arrow-link">
                      {g.title} <Arrow size={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
