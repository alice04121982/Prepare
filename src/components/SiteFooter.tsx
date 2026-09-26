import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import { CONTACT_EMAIL } from "@/lib/site";

const links = [
  { href: "/what-you-can-do-now", label: "What you can do now" },
  { href: "/checklist", label: "What to get" },
  { href: "/what-might-stop", label: "What might stop" },
  { href: "/worried", label: "Worried?" },
  { href: "/community", label: "Neighbours" },
  { href: "/guides", label: "Short answers" },
  { href: "/medical-conditions", label: "Medical conditions" },
  { href: "/sources", label: "Sources" },
  { href: "/how-we-choose-products", label: "How we choose products" },
  { href: "/privacy", label: "Privacy" },
];


export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink pb-10 pt-14 text-paper [&_:focus-visible]:outline-cat-power">
      <div className="wrap">
        <div className="grid gap-8 min-[900px]:grid-cols-2 min-[900px]:gap-16">
          <div>
            <Link
              href="/"
              className="display inline-flex min-h-11 items-center text-[clamp(1.75rem,9.5vw,2.25rem)] text-paper no-underline"
              style={{ fontVariationSettings: '"wdth" 118' }}
            >
              <Wordmark />
            </Link>
            <p className="mt-2.5 text-lg">
              A UK guide to getting your household ready for disruption, whether it lasts a day or months.
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
            Some product links earn us a small commission, at no extra cost to
            you. As an Amazon Associate we earn from qualifying purchases.
          </p>
          <p>
            Figures from gov.uk, the WHO, the Met Office and the NHS. Check
            official guidance for your region too.
          </p>
          <p>
            Questions, or a link that has stopped working? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-paper underline underline-offset-4 hover:decoration-4">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
