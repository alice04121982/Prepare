"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Arrow from "@/components/home/Arrow";

/** The heavy arrow turned to point down the page. */
export function DownArrow({ size = 20 }: { size?: number }) {
  return (
    <span aria-hidden="true" className="inline-flex rotate-90">
      <Arrow size={size} />
    </span>
  );
}

/**
 * Follows an in-page link to the buy stage and puts focus on its heading,
 * so keyboard and screen reader users land where the eye does.
 */
export function goToBuy(e: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById("buy");
  if (!target) return;
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  target.focus({ preventScroll: true });
}

/**
 * Phone only. The reach bar grammar from the homepage, carrying the count
 * of unticked lines and a way down to the buy stage. It slides up once the
 * list heading reaches the top of the screen and tucks away over the
 * household panel, the buy stage and the footer.
 */
export function StillToGetBar({
  remaining,
  watch,
  hideOver,
}: {
  remaining: number;
  watch: string;
  hideOver: string[];
}) {
  const [show, setShow] = useState(false);
  const hideKey = hideOver.join(" ");

  useEffect(() => {
    const heading = document.getElementById(watch);
    const others = [
      document.querySelector("footer"),
      ...hideKey.split(" ").filter(Boolean).map((id) => document.getElementById(id)),
    ].filter((el): el is HTMLElement => !!el);

    // Measured on scroll rather than with an IntersectionObserver so the bar
    // is right the moment the page moves: shown once the heading's top has
    // reached the top of the screen, hidden while any of the others is in view.
    const update = () => {
      if (!heading) return;
      const passed = heading.getBoundingClientRect().top <= 0;
      const covered = others.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });
      setShow(passed && !covered);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const first = window.setTimeout(update, 0);
    return () => {
      window.clearTimeout(first);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [watch, hideKey]);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`no-print fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-ink bg-paper px-5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] min-[900px]:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="flex min-w-0 items-baseline gap-2 font-extrabold leading-tight">
          {remaining > 0 ? (
            <>
              <span className="display text-[2rem] tabular-nums" style={{ fontVariationSettings: '"wdth" 115' }}>
                {remaining}
              </span>
              <span>still to get</span>
            </>
          ) : (
            <span>nothing left to get</span>
          )}
        </p>
        <a href="#buy" onClick={goToBuy} className="btn btn-secondary flex-none">
          where to buy <DownArrow />
        </a>
      </div>
    </div>
  );
}
