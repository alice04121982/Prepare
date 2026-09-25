/**
 * The Stay Prepared mark: four square-ended bars crossing at 45 degrees.
 * Same geometry as public/brand/mark.svg. Draws in the current text colour.
 */
export default function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <g transform="translate(50 50)">
        {[0, 45, 90, 135].map((r) => (
          <rect key={r} x="-9" y="-46" width="18" height="92" transform={`rotate(${r})`} />
        ))}
      </g>
    </svg>
  );
}
