import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import Diagram from "@/components/Diagram";
import Callout from "@/components/Callout";
import Arrow from "@/components/home/Arrow";
import { getGuide, guides } from "@/data/guides";
import { amazonSearchUrl } from "@/lib/amazon";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function GuidePage(props: PageProps<"/guides/[slug]">) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guide.related.map(getGuide).filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <main>
      <PageIntro
        title={guide.title}
        lede={<p>{guide.answer[0]}</p>}
        aside={guide.diagram ? <Diagram name={guide.diagram} /> : undefined}
      >
        {guide.answer.slice(1).map((p) => (
          <p key={p} className="max-w-[48ch] text-[1.125rem] leading-relaxed">
            {p}
          </p>
        ))}
      </PageIntro>

      <section aria-labelledby="steps-h" className="border-b-[3px] border-ink py-14 min-[900px]:py-20">
        <div className="wrap min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] min-[900px]:items-start min-[900px]:gap-16">
          <div>
            <h2 id="steps-h" className="h-sub">
              {guide.stepsTitle}
            </h2>
            {guide.warning ? <Callout title={guide.warning.title}><p>{guide.warning.body}</p></Callout> : null}
          </div>
          <ol className="mt-8 border-b-[3px] border-ink min-[900px]:mt-0">
            {guide.steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-t-[3px] border-ink pb-6 pt-5 min-[900px]:grid-cols-[3.25rem_minmax(0,1fr)] min-[900px]:gap-x-6"
              >
                <span
                  aria-hidden="true"
                  className="display grid h-11 w-11 place-items-center bg-ink text-[1.5rem] tabular-nums text-paper min-[900px]:h-13 min-[900px]:w-13 min-[900px]:text-[1.75rem]"
                  style={{ fontVariationSettings: '"wdth" 115' }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[1.3125rem] leading-tight min-[900px]:text-[1.5rem]">{step.title}</h3>
                  <p className="mt-2 max-w-[60ch] text-[1.125rem] leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ready-h" className="border-b-[3px] border-ink bg-hush py-14 min-[900px]:py-20">
        <div className="wrap">
          <h2 id="ready-h" className="h-sub">
            what to have ready
          </h2>
          <p className="measure mt-4 text-[1.125rem] leading-relaxed">
            Check what you already have first. The checklist keeps count, and the kit on the home page puts
            everything for your household in one Amazon basket.
          </p>
          {guide.ready.length ? (
          <ul className="mt-8 grid gap-3 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3">
            {guide.ready.map((r) => (
              <li key={r.item} className="flex flex-col border-[3px] border-ink bg-paper px-4 py-3.5">
                <p className="text-lg font-extrabold leading-snug">{r.item}</p>
                <p className="mt-1 leading-snug">{r.tip}</p>
                <a
                  href={amazonSearchUrl(r.search)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-auto inline-flex min-h-11 items-center pt-2 font-bold"
                >
                  Choose one on Amazon<span className="sr-only">: {r.item} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/checklist" className="btn btn-primary btn-lg">
              check your cupboard <Arrow />
            </Link>
            <Link href="/#hero-actions" className="btn btn-secondary btn-lg">
              see the ready-made kits
            </Link>
          </div>
          <p className="mt-5 text-[0.8125rem] leading-snug text-ink-2">
            Some links here earn us a small commission. As an Amazon Associate we earn from qualifying purchases.
          </p>
        </div>
      </section>

      <section aria-labelledby="sources-h" className="py-14 min-[900px]:py-20">
        <div className="wrap measure">
          <h2 id="sources-h" className="h-sub">
            where this comes from
          </h2>
          <ul className="mt-5 grid gap-3 text-[1.0625rem] leading-snug">
            {guide.sources.map((s) => (
              <li key={s.url + s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold">
                  {s.label}
                </a>
                <span className="text-ink-2">, {s.publisher}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-2">Sources checked {formatDate(guide.checked)}.</p>
          {related.length ? (
            <div className="mt-10">
              <h2 className="text-lg font-extrabold">more short answers</h2>
              <ul className="mt-3 grid gap-2">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="arrow-link">
                      {g.title} <Arrow size={18} />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/guides" className="arrow-link">
                    all short answers <Arrow size={18} />
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
