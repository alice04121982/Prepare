// The logo: four square-ended bars crossed into an asterisk, drawn in
// currentColor so it takes the ink or the paper of wherever it sits. Our own
// mark, drawn in Figma as "Cross": bars 14.651 by 71.263, rotated 0, 45, 90
// and 135 degrees about one centre.
export function Asterisk({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-36 -36 72 72"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g fill="currentColor">
        {[0, 45, 90, 135].map((angle) => (
          <rect
            key={angle}
            x={-7.3255}
            y={-35.6315}
            width={14.651}
            height={71.263}
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
  );
}

// "stay" with the asterisk set against it like a footnote mark, then
// "prepared". The words stay real text; the mark is hidden from screen readers.
export default function Wordmark() {
  return (
    <span className="whitespace-nowrap">
      stay
      <Asterisk className="ml-[0.06em] inline-block size-[0.5em] align-[0.42em]" />{" "}
      prepared
    </span>
  );
}
