"use client";

import { useId, useState } from "react";
import { MAX_DAYS, MIN_DAYS } from "@/data/kit-rules";
import { DURATIONS } from "@/data/packs";

/** A length tile: square, bordered, and marked on Hush when chosen so it never looks like the primary button. */
export const tileClass =
  "rounded-[4px] border-2 border-ink hover:bg-[var(--hover)] has-checked:bg-hush has-checked:shadow-[inset_0_0_0_2px_var(--ink)] has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-ink";

/**
 * How long for: the four lengths as priced tiles, the same on the home page
 * and on /kits, with any other whole number of days behind a link. Goes
 * inside the page's own fieldset and legend.
 */
export function LengthTiles({
  days,
  onChange,
  estimates,
  active = true,
  wide = false,
}: {
  days: number;
  onChange: (days: number) => void;
  /** Rough basket cost in pounds for each of the four lengths; 0 when nothing is left to buy. */
  estimates: Record<number, number>;
  /** False while another choice (the grab bag) stands in for a length, so no tile shows as chosen. */
  active?: boolean;
  /** Four across from 1200px, for the full-width home panel. */
  wide?: boolean;
}) {
  const name = useId();
  const fieldId = useId();
  const hintId = useId();
  const own = active && !DURATIONS.some((d) => d.days === days);
  const [asked, setAsked] = useState(false);
  // What is typed, kept apart from `days` so a half-typed or out-of-range
  // number never replaces the last good choice.
  const [draft, setDraft] = useState<string | null>(null);

  function type(text: string) {
    setDraft(text);
    const n = Number(text);
    if (text !== "" && Number.isInteger(n) && n >= MIN_DAYS && n <= MAX_DAYS) onChange(n);
  }

  return (
    <>
      <div className={`grid grid-cols-2 gap-2 ${wide ? "min-[1200px]:grid-cols-4" : ""}`}>
        {DURATIONS.map((d) => (
          <div key={d.days} className={tileClass}>
            <input
              type="radio"
              name={name}
              id={`${name}-${d.days}`}
              checked={active && days === d.days}
              onChange={() => {
                setDraft(null);
                setAsked(false);
                onChange(d.days);
              }}
              className="sr-only"
            />
            <label htmlFor={`${name}-${d.days}`} className="@container flex h-full cursor-pointer flex-col px-3 py-2.5">
              {/* As large as the longest name ("3 months") fits in the tile, up to 26px. */}
              <span
                className="display whitespace-nowrap text-[length:min(1.625rem,19cqi)] leading-none"
                style={{ fontVariationSettings: '"wdth" 115' }}
              >
                {d.label}
              </span>
              <span className="mt-1.5 text-sm font-bold leading-snug tabular-nums">
                {estimates[d.days] ? `about £${estimates[d.days]}` : "nothing left to add"}
                {"note" in d ? <span className="block font-normal">{d.note}</span> : null}
              </span>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        {asked || own ? (
          <>
            <label htmlFor={fieldId} className="text-[0.9375rem] font-bold">
              Or a number of days
            </label>
            <input
              id={fieldId}
              type="number"
              inputMode="numeric"
              min={MIN_DAYS}
              max={MAX_DAYS}
              step={1}
              value={draft ?? (own ? String(days) : "")}
              onChange={(e) => type(e.target.value)}
              onBlur={() => setDraft(null)}
              aria-describedby={hintId}
              className="field h-12 w-24 text-lg tabular-nums"
              autoFocus={asked}
            />
            <span id={hintId} className="text-sm text-ink-2">
              {MIN_DAYS} to {MAX_DAYS}
            </span>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setAsked(true)}
            className="flex min-h-11 items-center text-[0.9375rem] font-bold underline underline-offset-4"
          >
            Or a number of days
          </button>
        )}
      </div>
    </>
  );
}
