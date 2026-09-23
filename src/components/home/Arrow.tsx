/** The heavy right arrow used on every action. */
export default function Arrow({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 16) / 20}
      viewBox="0 0 20 16"
      aria-hidden="true"
      className="flex-none"
    >
      <path d="M0 8h17M11 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}
