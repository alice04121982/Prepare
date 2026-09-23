import { useId, useState, type ReactNode } from "react";

const step =
  "grid h-11 w-11 flex-none place-items-center rounded-[4px] border-2 border-ink bg-paper text-ink hover:bg-[var(--hover)] disabled:cursor-not-allowed disabled:border-ink/30 disabled:text-ink/30 disabled:hover:bg-paper";

function Minus() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 7h12" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

function Plus() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 7h12M7 1v12" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

/** One household row: a label and a square minus, count, plus stepper. */
export function Counter({
  label,
  value,
  onChange,
  min = 0,
  max = 12,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-ink px-4.5 py-2.5 min-[900px]:px-6">
      <span className="font-extrabold leading-tight">{label}</span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label={`Fewer ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={step}
        >
          <Minus />
        </button>
        <output
          aria-live="polite"
          aria-label={label}
          className="display w-9 text-center text-[1.75rem] tabular-nums"
        >
          {value}
        </output>
        <button
          type="button"
          aria-label={`More ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={step}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}

/** A bordered square row that fills ink when chosen, as on the homepage duration picker. */
export function OptionRow({
  type,
  name,
  id,
  checked,
  onChange,
  children,
  note,
}: {
  type: "radio" | "checkbox";
  name?: string;
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[4px] border-2 border-ink px-3.5 py-2 font-bold leading-tight hover:bg-[var(--hover)] peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink"
      >
        <span>{children}</span>
        {note ? <small className="text-right text-sm font-normal opacity-80">{note}</small> : null}
      </label>
    </div>
  );
}

/** Square tick box for "already have this". Prints as an empty box to tick by hand. */
export function TickBox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="relative grid h-11 w-11 shrink-0 cursor-pointer place-items-center">
      <input
        type="checkbox"
        aria-label={label}
        checked={checked}
        onChange={onChange}
        className="peer h-7 w-7 cursor-pointer appearance-none rounded-[3px] border-2 border-ink bg-paper checked:bg-ink hover:bg-[var(--hover)] checked:hover:bg-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
      />
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        aria-hidden="true"
        className="pointer-events-none absolute hidden text-paper peer-checked:block"
      >
        <path d="M1.5 6l4.5 4.5L14.5 1.5" fill="none" stroke="currentColor" strokeWidth="2.8" />
      </svg>
    </label>
  );
}

/**
 * Days of cover: the Counter grammar with an editable number in the middle,
 * three preset rows under it and a note that changes at the ends of the range.
 * Typing a number in range updates the list as you type; anything else is
 * settled on blur, clamped to the range, or put back to the last good value.
 */
export function DaysControl({
  value,
  onChange,
  min,
  max,
  presets,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  presets: { days: number; note?: string }[];
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const inputId = useId();
  const noteId = useId();
  const clamp = (n: number) => Math.max(min, Math.min(max, Math.round(n)));

  const settle = () => {
    if (draft === null) return;
    const text = draft.trim();
    if (/^[0-9]+$/.test(text)) onChange(clamp(parseInt(text, 10)));
    setDraft(null);
  };

  const note =
    value < 3
      ? "Three days is the government minimum."
      : value >= max
        ? `Up to ${max} days. Past that, water becomes the hard part.`
        : `Any whole number of days from ${min} to ${max}.`;

  return (
    <div className="px-4.5 pb-4.5 pt-2.5 min-[900px]:px-6">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3">
        <label htmlFor={inputId} className="font-extrabold leading-tight">
          Days of cover
        </label>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Fewer days"
            onClick={() => onChange(clamp(value - 1))}
            disabled={value <= min}
            className={step}
          >
            <Minus />
          </button>
          <input
            id={inputId}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            aria-describedby={noteId}
            value={draft ?? String(value)}
            onChange={(e) => {
              const text = e.target.value;
              setDraft(text);
              if (/^[0-9]+$/.test(text)) {
                const n = parseInt(text, 10);
                if (n >= min && n <= max) onChange(n);
              }
            }}
            onBlur={settle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                settle();
              }
            }}
            className="display h-11 w-14 rounded-[4px] border-2 border-ink bg-paper text-center text-[1.75rem] tabular-nums hover:bg-[var(--hover)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink"
          />
          <button
            type="button"
            aria-label="More days"
            onClick={() => onChange(clamp(value + 1))}
            disabled={value >= max}
            className={step}
          >
            <Plus />
          </button>
        </div>
      </div>

      <div role="group" aria-label="Common lengths" className="mt-3 grid grid-cols-3 gap-2">
        {presets.map((p) => {
          const on = value === p.days;
          return (
            <button
              key={p.days}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setDraft(null);
                onChange(p.days);
              }}
              className={`flex min-h-12 flex-col items-start justify-center rounded-[4px] border-2 border-ink px-3 py-2 text-left font-bold leading-tight focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink ${on ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-[var(--hover)]"}`}
            >
              <span className="tabular-nums">{p.days} days</span>
              {p.note ? <small className="mt-0.5 text-[0.8125rem] font-normal leading-snug opacity-80">{p.note}</small> : null}
            </button>
          );
        })}
      </div>

      <p id={noteId} aria-live="polite" className="mt-3 text-[0.9375rem] leading-snug text-ink-2">
        {note}
      </p>
    </div>
  );
}
