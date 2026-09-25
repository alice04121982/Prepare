"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Wordmark from "@/components/Wordmark";

export const nav = [
  { href: "/lists", label: "lists" },
  { href: "/what-you-can-do-now", label: "do it now" },
  { href: "/checklist", label: "checklist" },
  { href: "/build-your-kit", label: "build your kit" },
  { href: "/what-might-stop", label: "what might stop" },
  { href: "/community", label: "neighbours" },
  { href: "/worried", label: "worried?" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes (state derived during render,
  // which avoids a cascading setState inside an effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Close on Escape and hand focus back to the button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="relative z-20 border-b-[3px] border-ink bg-paper">
      <div className="wrap flex min-h-16 flex-wrap items-center justify-between gap-x-4 min-[900px]:min-h-20">
        <Link
          href="/"
          className="display inline-flex min-h-11 items-center text-2xl no-underline min-[900px]:text-[1.75rem]"
          style={{ fontVariationSettings: '"wdth" 118' }}
        >
          <Wordmark />
        </Link>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-[4px] border-2 border-ink bg-paper px-4 font-extrabold hover:bg-cat-power min-[900px]:hidden"
        >
          <span aria-hidden="true" className="relative h-3 w-4">
            <span className="absolute inset-x-0 top-0.5 h-0.5 bg-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-aria-expanded:translate-y-[3px] group-aria-expanded:rotate-45" />
            <span className="absolute inset-x-0 bottom-0.5 h-0.5 bg-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-aria-expanded:-translate-y-[3px] group-aria-expanded:-rotate-45" />
          </span>
          Menu
        </button>

        <nav
          id={menuId}
          aria-label="Main"
          className={`${open ? "block" : "hidden"} -mx-5 mt-2.5 basis-[calc(100%+2.5rem)] border-t-[3px] border-ink min-[900px]:mx-0 min-[900px]:mt-0 min-[900px]:block min-[900px]:basis-auto min-[900px]:border-t-0`}
        >
          <ul className="px-5 pb-4 pt-2 min-[900px]:flex min-[900px]:gap-7 min-[900px]:p-0">
            {nav.map((item) => (
              <li
                key={item.href}
                className="border-ink [&+&]:border-t min-[900px]:[&+&]:border-t-0"
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="display flex min-h-14 items-center text-2xl no-underline hover:underline aria-[current=page]:underline min-[900px]:min-h-11 min-[900px]:text-base min-[900px]:font-bold min-[900px]:tracking-normal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
