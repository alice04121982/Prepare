import { guides } from "@/data/guides";

/** The one public address. www redirects here (next.config.ts). */
export const SITE_URL = "https://stayprepared.co.uk";

/**
 * Every indexable page, in the order the sitemap lists them. A new page is
 * added here once, and the sitemap picks it up; guides come from guides.ts.
 * /basket is left out: it is a view of the home page's packs, driven by the
 * query string.
 */
export const PAGES = [
  "/",
  "/checklist",
  "/build-your-kit",
  "/what-you-can-do-now",
  "/what-might-stop",
  "/worried",
  "/community",
  "/sources",
  "/guides",
  ...guides.map((g) => `/guides/${g.slug}`),
];
