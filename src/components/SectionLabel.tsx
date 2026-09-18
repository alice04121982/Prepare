/** Lilac-style section eyebrow: a small dot, then uppercase text. */
export default function SectionLabel({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className={`mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider ${onDark ? "text-white/70" : "text-muted"}`}>
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${onDark ? "bg-white/70" : "bg-accent"}`} />
      {children}
    </p>
  );
}
