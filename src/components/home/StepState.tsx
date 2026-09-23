"use client";

import { checklist } from "@/data/checklist";
import { haveKey, useHave } from "@/lib/have";

const keys = checklist.flatMap((c) => c.items.map((i) => haveKey(c.slug, i.item)));
const total = keys.length;

/**
 * The state of one of the three steps, read from the shared record of what
 * the household already has. The neighbours step has no count: the site
 * cannot know whether someone has spoken to their neighbours, and inventing
 * a number would be worse than leaving it out.
 */
export default function StepState({ step }: { step: "check" | "buy" }) {
  const { have, ready } = useHave();
  if (!ready) return null;

  const ticked = keys.filter((k) => have.has(k)).length;
  const left = total - ticked;
  const text =
    step === "check"
      ? ticked === 0
        ? `${total} to check`
        : `${ticked} of ${total} checked`
      : ticked === 0
        ? null
        : left === 0
          ? "nothing left to get"
          : `${left} still to get`;
  if (!text) return null;

  return (
    <p className="mt-3 inline-block border-2 border-ink px-2.5 py-1 text-[0.9375rem] font-extrabold tabular-nums">
      {text}
    </p>
  );
}
