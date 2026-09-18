import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-md">
          Calm, practical guidance for short, common disruptions. Not a
          survival site. Built on the evidence that people get through hard
          weeks together.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a
              href="/offline/index.html"
              download="prepare-offline-guide.html"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              Offline guide
            </a>
          </li>
          <li>
            <Link
              href="/sources"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              Sources
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
