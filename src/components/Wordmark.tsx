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

// The asterisk to the left of "stay prepared". The words stay real text; the
// mark is hidden from screen readers.
export default function Wordmark() {
  return (
    <span className="inline-flex items-center gap-[0.3em] whitespace-nowrap">
      <Asterisk className="size-[0.85em] flex-none" />
      stay prepared
    </span>
  );
}
