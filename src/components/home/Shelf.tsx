export type Tin = {
  id: string;
  /** The remedy, printed like the product name on a tin. */
  name: string;
  /** How much, like the quantity on the front of a pack. */
  amount: string;
  /** The thing that stops, set as the small print at the foot of the label. */
  when: string;
  /** Tailwind background class for the category label. */
  cat: string;
};

/**
 * The larder shelf: one tin label per thing that might stop, remedy first,
 * quantity under it, the hazard as small print at the foot. Every label is
 * open, so the help is never behind a tap.
 */
export default function Shelf({ tins }: { tins: Tin[] }) {
  return (
    <ul className="grid">
      {tins.map((t) => (
        <li
          key={t.id}
          data-cat
          className={`${t.cat} -mt-[3px] border-[3px] border-ink px-4.5 pb-3 pt-3.5 first:mt-0 min-[900px]:px-6`}
        >
          <h3
            className="display text-[clamp(2rem,8.5vw,2.75rem)]"
            style={{ fontVariationSettings: '"wdth" 118' }}
          >
            {t.name}
          </h3>
          <p className="mt-1.5 text-lg font-bold leading-snug">{t.amount}</p>
          <p className="mt-2.5 border-t-2 border-ink pt-1.5 text-[0.9375rem] font-semibold">
            {t.when}
          </p>
        </li>
      ))}
    </ul>
  );
}
