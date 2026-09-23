"use client";

import { useEffect, useState } from "react";

export type Stop = {
  id: string;
  what: string;
  helps: string;
  /** Tailwind background class for the category label. */
  cat: string;
};

/**
 * What might stop, as a stack of full-width category labels. Each label is a
 * button that opens to show the one thing that helps. Everything opens for
 * printing so the paper copy is complete.
 */
export default function StopList({ stops }: { stops: Stop[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const before = () => setPrinting(true);
    const after = () => setPrinting(false);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  return (
    <ul className="mt-9 border-t-[3px] border-ink">
      {stops.map((s) => {
        const isOpen = printing || !!open[s.id];
        const bodyId = `stop-${s.id}`;
        return (
          <li key={s.id} data-cat className={`${s.cat} border-b-[3px] border-ink`}>
            <h3 className="text-[length:inherit]">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))}
                className="wrap grid min-h-24 w-full cursor-pointer grid-cols-[1fr_2.75rem] items-center gap-4 py-5 text-left focus-visible:-outline-offset-8 min-[900px]:min-h-34 min-[900px]:grid-cols-[1fr_3.5rem]"
              >
                <span
                  className="display text-[clamp(1.75rem,8.2vw,4.5rem)]"
                  style={{ fontVariationSettings: '"wdth" 115' }}
                >
                  {s.what}
                </span>
                <span
                  aria-hidden="true"
                  className="tin-sign relative size-11 justify-self-end rounded-full border-[3px] border-ink min-[900px]:size-14"
                />
              </button>
            </h3>
            <div id={bodyId} data-state={isOpen ? "open" : "closed"} className="tin-body" inert={!isOpen}>
              <div className="overflow-hidden">
                <p className="wrap">
                  <span className="grid gap-1 border-t-2 border-ink pb-6 pt-3.5 min-[900px]:grid-cols-[180px_1fr] min-[900px]:items-baseline min-[900px]:gap-6 min-[900px]:pb-8">
                    <b className="text-[0.9375rem] font-extrabold">Helps:</b>
                    <span className="text-[1.3125rem] font-semibold leading-snug min-[900px]:text-[1.625rem]">
                      {s.helps}
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
