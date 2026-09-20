import { ArrowRight, FileDown } from "lucide-react";

/** Full-width bordered row with an icon, a label and an arrow, as on lilacsolutions.com. */
export default function DownloadRow({
  href,
  download,
  title,
  detail,
}: {
  href: string;
  download?: string;
  title: string;
  detail?: string;
}) {
  return (
    <a
      href={href}
      download={download}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-accent"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-ink">
        <FileDown size={20} strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-heading">{title}</span>
        {detail ? <span className="block text-sm text-muted">{detail}</span> : null}
      </span>
      <ArrowRight size={20} strokeWidth={1.75} className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
    </a>
  );
}
