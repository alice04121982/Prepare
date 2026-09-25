import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Arrow from "@/components/home/Arrow";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  alternates: { canonical: "/guides" },
  title: "Short answers",
  description: "Plain answers for when something has happened or is on its way: a power cut, a storm warning, how much water to keep.",
};

export default function GuidesPage() {
  return (
    <main>
      <PageIntro
        title="short answers"
        lede="For when something has happened, or is on its way."
      />
      <section aria-label="All short answers" className="wrap py-14 min-[900px]:py-20">
        <ul className="max-w-[980px] border-t-[3px] border-ink">
          {guides.map((g) => (
            <li key={g.slug} className="border-b-[3px] border-ink">
              <Link href={`/guides/${g.slug}`} className="group flex min-h-20 items-center justify-between gap-4 py-4 no-underline">
                <span>
                  <span className="block text-[1.5rem] font-extrabold leading-tight group-hover:underline min-[900px]:text-[1.75rem]">
                    {g.title}
                  </span>
                  <span className="mt-1 block text-[1.0625rem] leading-snug text-ink-2">{g.answer[0]}</span>
                </span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
