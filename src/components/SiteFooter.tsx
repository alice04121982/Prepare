import Link from "next/link";

const links = [
  { href: "/checklist", label: "Checklist" },
  { href: "/build-your-kit", label: "Build your kit" },
  { href: "/why", label: "Why three days" },
  { href: "/community", label: "Community" },
  { href: "/worried", label: "Feeling frightened?" },
  { href: "/sources", label: "Sources" },
  { href: "/disclosure", label: "How we earn" },
  { href: "/privacy", label: "Privacy" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto px-4 pb-4 pt-16 sm:px-10 sm:pb-10">
      <div className="rounded-card bg-forest px-6 py-8 text-on-forest sm:px-10 sm:py-10">
        <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-heading text-xl">
            <span className="font-bold">Stay</span> <span className="font-normal">Prepared</span>
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <ul className="flex flex-wrap gap-x-4 text-sm opacity-90">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-4 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="/offline/index.html"
              download="stay-prepared-offline-guide.html"
              className="btn btn-on-dark"
            >
              Download the offline guide
            </a>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 text-sm sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md opacity-90">
            <span className="block font-medium">Calm, practical guidance for short disruptions.</span>
            Based on UK government advice. Not a survival site. No tracking.{" "}
            <Link href="/disclosure" className="underline underline-offset-4">
              Some product links earn a small commission.
            </Link>{" "}
            As an Amazon Associate we earn from qualifying purchases.
          </p>
          <p className="opacity-70">
            Free to share. Check official guidance for your region too.
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
