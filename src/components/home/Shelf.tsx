export type Tin = {
  id: string;
  /** The remedy, printed like the product name on a tin. */
  name: string;
  /** What it is and how much, like the contents line. */
  amount: string;
  /** The thing that stops, set small above the name. */
  when: string;
  /** Tailwind background class for the category label. */
  cat: string;
};

/**
 * The larder shelf: one tin label per thing that might stop, remedy first.
 * Every label is open, so the help is never behind a tap.
 */
export default function Shelf({ tins }: { tins: Tin[] }) {
  return (
    <ul className="grid">
      {tins.map((t) => (
        <li
          key={t.id}
          data-cat
          className={`${t.cat} -mt-[3px] border-[3px] border-ink px-4.5 pb-4 pt-3 first:mt-0 min-[900px]:px-6`}
        >
          <p className="text-[0.9375rem] font-bold">{t.when}</p>
          <h3
            className="display mt-1 text-[clamp(2.25rem,10vw,3.5rem)]"
            style={{ fontVariationSettings: '"wdth" 118' }}
          >
            {t.name}
          </h3>
          <p className="mt-2.5 border-t-2 border-ink pt-2 text-lg font-semibold leading-snug">
            {t.amount}
          </p>
        </li>
      ))}
    </ul>
  );
}
