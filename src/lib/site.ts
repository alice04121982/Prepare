import { guides } from "@/data/guides";
import { lists } from "@/data/lists";

/** The one public address. www redirects here (next.config.ts). */
export const SITE_URL = "https://stayprepared.co.uk";

/**
 * The public contact address, shown on /privacy (UK GDPR needs one). The
 * mailbox must exist before this ships: set it up on the domain first.
 */
export const CONTACT_EMAIL = "hello@stayprepared.co.uk";

/**
 * Every indexable page, in the order the sitemap lists them. A new page is
 * added here once, and the sitemap picks it up; guides come from guides.ts.
 * /basket is left out: it is a view of the home page's packs, driven by the
 * query string.
 */
export const PAGES = [
  "/",
  "/lists",
  ...lists.map((l) => `/lists/${l.slug}`),
  "/checklist",
  "/build-your-kit",
  "/what-you-can-do-now",
  "/what-might-stop",
  "/worried",
  "/community",
  "/sources",
  "/how-we-choose-products",
  "/privacy",
  "/guides",
  ...guides.map((g) => `/guides/${g.slug}`),
];
