import Link from "next/link";

const links = [
  { href: "/scenarios", label: "Scenarios" },
  { href: "/checklist", label: "Checklist" },
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/official-guidance", label: "Official guidance" },
  { href: "/sources", label: "Sources" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto px-4 pb-4 pt-16 sm:px-10 sm:pb-10">
      <div className="rounded-card bg-forest px-6 py-8 text-on-forest sm:px-10 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-heading text-xl font-semibold">Stay Prepared</span>
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
            <span className="block font-medium">Calm, practical, and built on other people.</span>
            Guidance for short, common disruptions. Not a survival site. No
            tracking, no affiliate links, no fear.
          </p>
          <p className="opacity-70">
            Free to share. Check official guidance for your region too.
            <br />
            Illustrations by{" "}
            <a
              href="https://streamlinehq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Streamline
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
