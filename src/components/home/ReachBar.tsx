"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Arrow from "@/components/home/Arrow";

/**
 * The main action, pinned within thumb reach on phones once the hero's own
 * button has scrolled away. It tucks away again over the footer and over any
 * element in `hideOver` (a form with its own main button), so there is never
 * a second primary action on screen. Hidden on wide screens and when printing.
 */
export default function ReachBar({ watch, hideOver = [] }: { watch: string; hideOver?: string[] }) {
  const [passedHero, setPassedHero] = useState(false);
  const [covered, setCovered] = useState<Set<Element>>(new Set());
  const show = passedHero && covered.size === 0;
  const hideKey = hideOver.join(" ");

  useEffect(() => {
    const hero = document.getElementById(watch);
    const others = [
      document.querySelector("footer"),
      ...hideKey.split(" ").filter(Boolean).map((id) => document.getElementById(id)),
    ].filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          setPassedHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        } else {
          setCovered((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) next.add(entry.target);
            else next.delete(entry.target);
            return next;
          });
        }
      }
    });
    if (hero) io.observe(hero);
    others.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [watch, hideKey]);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`no-print fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-ink bg-paper px-5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] min-[900px]:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <Link href="/checklist" className="btn btn-primary btn-lg w-full">
        check your cupboard <Arrow />
      </Link>
    </div>
  );
}
