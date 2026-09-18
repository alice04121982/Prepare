"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const KEY = "sp-announce-dismissed";
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => {
  try {
    return localStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
};
const getServerSnapshot = () => false;

/** Anveril-style floating bar at the foot of the page: one line, one action, dismissable. */
export default function AnnounceBar() {
  const path = usePathname();
  const shown = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!shown || path === "/worried") return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 print:hidden">
      <div className="pointer-events-auto flex max-w-3xl items-center gap-3 rounded-full border border-line bg-surface/95 py-2 pl-5 pr-2 text-sm shadow-lg backdrop-blur">
        <span className="text-foreground/90">If the news is frightening you, there is a page for that.</span>
        <Link href="/worried" className="btn btn-primary !py-2 !text-xs">
          Read it
        </Link>
        <button type="button" onClick={dismiss} aria-label="Dismiss" className="rounded-full p-2 text-muted hover:bg-tag hover:text-heading">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
