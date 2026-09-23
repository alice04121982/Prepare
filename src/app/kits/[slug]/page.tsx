import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import KitSheet from "@/components/KitSheet";
import { kitBySlug, kits } from "@/data/kits";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return kits.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const kit = kitBySlug((await params).slug);
  if (!kit) return {};
  return { title: kit.title, description: kit.who };
}

export default async function KitPage({ params }: Params) {
  const kit = kitBySlug((await params).slug);
  if (!kit) notFound();

  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro eyebrow="Ready-made kit" title={kit.title} lede={kit.who} />

      <div className="mx-auto mb-10 max-w-3xl">
        <p className="measure leading-relaxed text-muted">{kit.different}</p>
      </div>

      <KitSheet kit={kit} />

      <div className="mx-auto mt-12 max-w-3xl border-t border-line pt-8">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted">Other households</h2>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          {kits
            .filter((k) => k.slug !== kit.slug)
            .map((k) => (
              <li key={k.slug}>
                <Link href={`/kits/${k.slug}`} className="tag hover:bg-tag">
                  {k.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
