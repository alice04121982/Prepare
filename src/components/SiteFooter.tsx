import Link from "next/link";

const links = [
  { href: "/what-you-can-do-now", label: "What you can do now" },
  { href: "/checklist", label: "Checklist" },
  { href: "/build-your-kit", label: "Build your kit" },
  { href: "/what-might-stop", label: "What might stop" },
  { href: "/worried", label: "Worried?" },
  { href: "/community", label: "Neighbours" },
  { href: "/sources", label: "Sources" },
];


export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink pb-10 pt-14 text-paper [&_:focus-visible]:outline-cat-power">
      <div className="wrap">
        <div className="grid gap-8 min-[900px]:grid-cols-2 min-[900px]:gap-16">
          <div>
            <Link
              href="/"
              className="display inline-flex min-h-11 items-center text-4xl text-paper no-underline"
              style={{ fontVariationSettings: '"wdth" 118' }}
            >
              stay prepared
            </Link>
            <p className="mt-2.5 text-lg">
              Calm, practical guidance for UK households.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-5 border-t border-[#5a5a5a]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-12 items-center border-b border-[#5a5a5a] font-bold no-underline hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-7 grid max-w-[65ch] gap-3 text-[0.9375rem] text-[#d6d6d6]">
          <p>
            Some product links earn us a small commission. The free option is
            always listed first.
          </p>
          <p>
            Figures from gov.uk Prepare, the Met Office and the NHS. Free to
            share. Check official guidance for your region too.
          </p>
        </div>
      </div>
    </footer>
  );
}
