import Arrow from "@/components/home/Arrow";
import { lists } from "@/data/lists";

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

const counters = [
  { id: "start-adults", name: "a", label: "Adults", options: range(1, 12), initial: 2 },
  { id: "start-children", name: "c", label: "Children (3 to 17)", options: range(0, 12), initial: 0 },
  { id: "start-babies", name: "b", label: "Under 3s", options: range(0, 6), initial: 0 },
];

/**
 * The homepage's one job: who lives here, then which list. Each list is its
 * own submit button pointing at that list's page, so the household travels
 * in the query string and the whole thing works without JavaScript.
 */
export default function StartForm() {
  return (
    <form id="start" method="get" action="/lists/72-hours" className="border-[3px] border-ink">
      <fieldset className="border-b-[10px] border-ink">
        <legend className="sr-only">Who lives with you</legend>
        <p className="border-b-[3px] border-ink px-4.5 py-3 text-lg font-extrabold min-[900px]:px-6">
          1. who lives with you?
        </p>
        <div className="grid min-[600px]:grid-cols-3">
          {counters.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-ink px-4.5 py-3 last:border-b-0 min-[600px]:grid-cols-1 min-[600px]:border-b-0 min-[600px]:border-r min-[600px]:last:border-r-0 min-[900px]:px-6"
            >
              <label htmlFor={c.id} className="font-extrabold">
                {c.label}
              </label>
              <select id={c.id} name={c.name} defaultValue={c.initial} className="field min-w-22">
                {c.options.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </fieldset>

      <div>
        <p className="border-b-[3px] border-ink px-4.5 py-3 text-lg font-extrabold min-[900px]:px-6">
          2. what are you preparing for?
        </p>
        <ul>
          {lists.map((l) => (
            <li key={l.slug} className="border-b-[3px] border-ink last:border-b-0">
              <button
                type="submit"
                formAction={`/lists/${l.slug}`}
                name="list"
                value={l.slug}
                className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-4 px-4.5 py-4 text-left hover:bg-[var(--hover)] focus-visible:-outline-offset-8 min-[900px]:px-6 min-[900px]:py-5"
              >
                <span>
                  <span
                    className="display block text-[clamp(1.75rem,7vw,2.5rem)]"
                    style={{ fontVariationSettings: '"wdth" 115' }}
                  >
                    {l.title}
                  </span>
                  <span className="mt-1 block font-semibold">{l.reasons}</span>
                </span>
                <span className="grid size-12 place-items-center bg-ink text-paper transition-transform duration-200 group-hover:translate-x-1">
                  <Arrow />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
