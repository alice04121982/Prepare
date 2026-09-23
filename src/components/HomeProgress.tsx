"use client";

import Link from "next/link";
import { checklist } from "@/data/checklist";
import { haveKey, useHave } from "@/lib/have";

const keys = checklist.flatMap((c) => c.items.map((i) => haveKey(c.slug, i.item)));
const total = keys.length;

/**
 * The three steps, as rows carrying their own state from the shared record.
 *
 * The home page is the third view of that record, after the checklist and the
 * planner. The third row has no count because the site cannot know whether
 * someone has spoken to their neighbours, and inventing one would be worse
 * than leaving it out.
 */
export default function HomeProgress() {
  const { have, ready } = useHave();

  const ticked = keys.filter((k) => have.has(k)).length;
  const left = total - ticked;

  const rows: {
    title: string;
    body: string;
    href: string;
    cta: string;
    state: string | null;
    alt?: { href: string; label: string };
  }[] = [
    {
      title: "Check what you already have",
      body: "Most cupboards hold a few days. Tins, a torch, the medicine cabinet. Tick them off before you buy anything.",
      href: "/checklist",
      cta: "Open the checklist",
      state: !ready ? null : ticked === 0 ? `${total} to check` : `${ticked} of ${total}`,
    },
    {
      title: "Buy what is missing",
      body: "Say who lives with you and the quantities are worked out for you. One button puts the lot into a basket.",
      href: "/kits",
      cta: "See the ready-made kits",
      alt: { href: "/build-your-kit", label: "or build your own" },
      state: !ready ? null : ticked === 0 ? null : left === 0 ? "Nothing left" : `${left} left`,
    },
    {
      title: "Tell your neighbours",
      body: "Two or three names and a check-in plan. That is what gets a street through a bad week.",
      href: "/community",
      cta: "Four things to do",
      state: null,
    },
  ];

  return (
    <ol className="mt-10 divide-y divide-line border-y border-line">
      {rows.map((r, i) => (
        <li key={r.href} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-2 py-7">
          <span aria-hidden className="pt-1.5 font-heading text-sm tabular-nums text-muted">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-2xl font-medium leading-tight">{r.title}</h3>
              {r.state ? (
                <span className="text-sm tabular-nums text-muted">{r.state}</span>
              ) : null}
            </div>
            <p className="mt-2 max-w-xl leading-relaxed text-muted">{r.body}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href={r.href} className="btn btn-secondary">
                {r.cta}
              </Link>
              {r.alt ? (
                <Link
                  href={r.alt.href}
                  className="text-sm text-muted underline underline-offset-4 hover:text-heading"
                >
                  {r.alt.label}
                </Link>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
