/**
 * Anveril-style linear workflow: three or four numbered steps in a row,
 * each a short verb and one sentence. Reads as "this, then this, then this".
 */
export default function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-card border border-line bg-surface p-6">
          <span className="font-heading text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-xl font-medium">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
