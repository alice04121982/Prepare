/**
 * Square tick box in a 44px target. The real checkbox covers the target but is
 * invisible; the drawn box beside it follows its state. Checked fills ink with
 * a paper tick. In print it is always an empty box to tick by hand.
 */
export default function TickBox({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  /** Accessible name, when no visible label points at the box. */
  label?: string;
}) {
  return (
    <span className="relative grid size-11 flex-none place-items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="peer absolute inset-0 m-0 size-11 cursor-pointer appearance-none opacity-0"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none grid size-7 place-items-center rounded-[3px] border-2 border-ink bg-paper peer-hover:bg-(--hover) peer-checked:bg-ink peer-checked:peer-hover:bg-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ink peer-checked:[&>svg]:block print:bg-white! print:[&>svg]:hidden!"
      >
        <svg width="16" height="12" viewBox="0 0 16 12" className="hidden text-paper">
          <path d="M1.5 6l4.5 4.5L14.5 1.5" fill="none" stroke="currentColor" strokeWidth="2.8" />
        </svg>
      </span>
    </span>
  );
}
