"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Arrow from "@/components/home/Arrow";

/**
 * The main action, pinned within thumb reach on phones once the hero's own
 * button has scrolled away, and tucked away again when the footer arrives so
 * it never covers it. Hidden on wide screens and when printing.
 */
export default function ReachBar({ watch }: { watch: string }) {
  const [passedHero, setPassedHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const show = passedHero && !atFooter;

  useEffect(() => {
    const hero = document.getElementById(watch);
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          setPassedHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        } else {
          setAtFooter(entry.isIntersecting);
        }
      }
    });
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, [watch]);

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
