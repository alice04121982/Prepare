import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Illustration from "@/components/Illustration";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Myths and questions",
  description:
    "Common misconceptions about preparing for disruption, and what sensible preparation looks like instead of panic-buying.",
};

export default function FaqPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Myth-busting and questions"
        title="Sensible preparation, not panic"
        lede="The questions people actually ask, and the misconceptions that stop them starting. Short answers where a short answer is honest, longer ones where it is not."
        aside={<Illustration name="intro-faq" className="max-w-[260px]" />}
      />

      <div className="mx-auto max-w-3xl">

      <nav aria-label="Questions on this page" className="mb-12">
        {faq.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
              {group.title}
            </p>
            <ul className="space-y-1.5 text-[0.95rem]">
              {group.entries.map((e) => (
                <li key={e.slug}>
                  <a
                    href={`#${e.slug}`}
                    className="underline-offset-4 hover:text-accent hover:underline"
                  >
                    {e.question}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {faq.map((group) => (
        <section key={group.title} className="mt-14 first-of-type:mt-0">
          <h2 className="mb-6 border-b border-line pb-3 text-2xl font-semibold">
            {group.title}
          </h2>
          <div className="space-y-10">
            {group.entries.map((e) => (
              <article key={e.slug} id={e.slug} className="scroll-mt-24">
                <h3 className="text-lg font-semibold">{e.question}</h3>
                <div className="prose-plain mt-3 leading-relaxed">
                  {e.answer.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-14 flex flex-wrap gap-4 pt-8 text-sm">
        <Link
          href="/checklist"
          className="btn btn-primary"
        >
          Start with the checklist
        </Link>
        <Link
          href="/community"
          className="btn btn-secondary"
        >
          Community and mutual aid
        </Link>
      </div>
      </div>
    </main>
  );
}
