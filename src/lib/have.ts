"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * What the household already has.
 *
 * One record, shared by the checklist and the kit planner, so ticking a thing
 * off in either place counts once. It is held in this browser's local storage
 * and never leaves the device.
 *
 * A key is `category-slug/item-slug`, derived from the checklist data rather
 * than stored in it. Renaming an item in src/data/checklist.ts therefore
 * clears that one tick and leaves the rest alone. Planner lines with no
 * checklist counterpart get a `kit/line-id` key of their own.
 */
const STORAGE_KEY = "stay-prepared-have-v1";

export function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function haveKey(categorySlug: string, item: string) {
  return `${categorySlug}/${slug(item)}`;
}

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((k): k is string => typeof k === "string") : [];
  } catch {
    // Private window, blocked site data, or something else wrote to this key.
    // The pages work either way; they just forget.
    return [];
  }
}

function write(keys: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  } catch {
    /* storage unavailable or full; the tick still applies for this visit */
  }
}

/**
 * Module-level cache so every component on a page sees the same record and
 * updates together, without a provider.
 */
const EMPTY: ReadonlySet<string> = new Set();
let cache: Set<string> | null = null;
const listeners = new Set<() => void>();

function current(): Set<string> {
  if (!cache) cache = new Set(read());
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function commit(next: Set<string>) {
  cache = next;
  write([...next]);
  listeners.forEach((listen) => listen());
}

export function useHave() {
  // An external store, so the record is read once on the client and every
  // component that uses it re-renders together when a tick changes.
  const have = useSyncExternalStore<ReadonlySet<string>>(subscribe, current, () => EMPTY);
  // False on the server and through hydration, true once the record has been
  // read. Counts wait for it rather than flashing a zero.
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const toggle = useCallback((key: string) => {
    const next = new Set(current());
    if (next.has(key)) next.delete(key);
    else next.add(key);
    commit(next);
  }, []);

  const clear = useCallback(() => commit(new Set()), []);

  return { have, ready, toggle, clear };
}
