"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AmazonBasketButton, { basketLabel } from "@/components/AmazonBasketButton";
import { kitLineKey } from "@/data/have-map";
import { defaultHousehold, householdToQuery } from "@/data/kit-rules";
import { listForDays } from "@/data/lists";
import { buildPack } from "@/data/packs";
import { useHave } from "@/lib/have";

const PEOPLE = defaultHousehold.adults;
const DAYS = defaultHousehold.days;
const NOTE = "We earn a small commission, at no extra cost to you.";
const kitsHref = `/kits${householdToQuery({ ...defaultHousehold, list: listForDays(DAYS) })}`;

/**
 * Everything not yet ticked, in one Amazon basket, pinned to the foot of the
 * screen while the checklist is in view. The checklist does not ask who lives
 * with you, so the basket is the planner's default household, with a link to
 * change it on /kits.
 */
export default function BasketBar({ watch }: { watch: string }) {
  const { have, ready } = useHave();
  const [inView, setInView] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const pack = useMemo(() => buildPack(PEOPLE, DAYS, (id) => have.has(kitLineKey(id))), [have]);
  const show = ready && inView && !overFooter && pack.buys.length > 0;

  useEffect(() => {
    const list = document.getElementById(watch);
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === list) setInView(entry.isIntersecting);
        else setOverFooter(entry.isIntersecting);
      }
    });
    if (list) io.observe(list);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, [watch]);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`no-print fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-ink bg-paper pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="wrap min-[900px]:flex min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-10">
        <p className="flex items-center justify-between gap-3 text-[0.9375rem] leading-snug min-[900px]:justify-start">
          <span>
            <span className="font-extrabold">Not ticked yet:</span>{" "}
            <span className="tabular-nums">about &pound;{pack.estimate}</span> for {PEOPLE} people, {DAYS} days
          </span>
          <Link href={kitsHref} className="inline-flex min-h-11 flex-none items-center font-bold">
            change
          </Link>
        </p>
        <AmazonBasketButton
          items={pack.buys.map((b) => ({ asin: b.product.asin, quantity: b.quantity }))}
          className="min-[900px]:w-[31rem] min-[900px]:flex-none"
          note={NOTE}
        >
          {basketLabel(pack.buys.length)}
        </AmazonBasketButton>
      </div>
    </div>
  );
}
