"use client";

import { kitLineCovers } from "@/data/have-map";
import { useHave } from "@/lib/have";

// The checklist items a reader can tick, which since the checklist and the
// kits were merged (26 September 2026) means those the planner's lines cover.
const keys = [...new Set(Object.values(kitLineCovers))];
const total = keys.length;

/**
 * The state of one of the three steps, read from the shared record of what
 * the household already has. The neighbours step has no count: the site
 * cannot know whether someone has spoken to their neighbours, and inventing
 * a number would be worse than leaving it out. Nothing shows until something
 * is ticked: a bare "31 to check" told a first-time visitor nothing.
 */
export default function StepState({ step }: { step: "check" | "buy" }) {
  const { have, ready } = useHave();
  if (!ready) return null;

  const ticked = keys.filter((k) => have.has(k)).length;
  const left = total - ticked;
  const text =
    step === "check"
      ? ticked === 0
        ? null
        : `${ticked} taken off`
      : ticked === 0
        ? null
        : left === 0
          ? "nothing on your list"
          : `${left} on your list`;
  if (!text) return null;

  return (
    <p className="mt-3 inline-block border-2 border-ink px-2.5 py-1 text-[0.9375rem] font-extrabold tabular-nums">
      {text}
    </p>
  );
}
