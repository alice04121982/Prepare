import { useId, useState } from "react";
import { OptionRow } from "@/components/kit/Controls";
import { MAX_DAYS, MIN_DAYS } from "@/data/kit-rules";
import { listBySlug, lists, type ListSlug, type ReadyList } from "@/data/lists";

/** "3 days", "7 to 30 days": the length a list covers, for the option notes. */
function lengthOf(list: ReadyList): string {
  const r = list.days;
  if (r.kind === "range") return `${r.min} to ${r.max} days`;
  if (r.kind === "none") return `${r.days} days' carry`;
  return `${r.days} days`;
}

/**
 * The ready-made list the planner is showing, above the household panel,
 * with a "change kit" control that opens the four, and "your own length", as square option rows.
 * Choosing one applies at once and leaves the rows open, so arrow keys can
 * move through them; "done" closes them. The last row, "your own length",
 * clears the list and lets the days run anywhere from MIN_DAYS to MAX_DAYS.
 */
export function ListPicker({
  value,
  onChange,
}: {
  value: ListSlug | undefined;
  onChange: (slug: ListSlug | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const current = value ? listBySlug(value) : undefined;

  return (
    <div className="border-x-[3px] border-t-[3px] border-ink px-4.5 pb-3 pt-4 min-[900px]:px-6">
      <p className="text-[0.9375rem] font-extrabold leading-tight text-ink-2">your kit</p>
      <p className="display mt-1 text-[clamp(1.625rem,7vw,2rem)] leading-[1.05]">
        {current ? current.title : "your own length"}
      </p>
      <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink-2">
        {current ? current.reasons : `Any number of days from ${MIN_DAYS} to ${MAX_DAYS}.`}
      </p>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="mt-1 min-h-11 font-bold underline underline-offset-4 hover:decoration-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink"
      >
        {open ? "done" : "change kit"}
      </button>
      <fieldset id={panelId} hidden={!open} className="mt-2 pb-2">
        <legend className="sr-only">Choose a kit</legend>
        <div className="grid gap-2">
          {lists.map((l) => (
            <OptionRow
              key={l.slug}
              type="radio"
              name="kit-list"
              id={`kit-list-${l.slug}`}
              checked={l.slug === value}
              onChange={() => onChange(l.slug)}
              note={lengthOf(l)}
            >
              {l.title}
            </OptionRow>
          ))}
          <OptionRow
            type="radio"
            name="kit-list"
            id="kit-list-own"
            checked={!value}
            onChange={() => onChange(undefined)}
            note={`${MIN_DAYS} to ${MAX_DAYS} days`}
          >
            your own length
          </OptionRow>
        </div>
      </fieldset>
    </div>
  );
}
