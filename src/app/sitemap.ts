import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : 0.8,
  }));
}
