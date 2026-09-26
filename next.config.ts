import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // One address for the site: www goes to the bare domain, keeping the path.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.stayprepared.co.uk" }],
        destination: "https://stayprepared.co.uk/:path*",
        permanent: true,
      },
      // Pages folded into others when the site was simplified.
      { source: "/scenarios", destination: "/what-might-stop", permanent: true },
      { source: "/official-guidance", destination: "/what-might-stop", permanent: true },
      { source: "/why", destination: "/what-might-stop", permanent: true },
      { source: "/faq", destination: "/checklist#questions", permanent: true },
      // What to get and every way to order a kit live on one page
      // (26 September 2026). Query strings pass through, so shared
      // households survive; a kit's own address opens the page on that kit.
      { source: "/kits", destination: "/checklist", permanent: true },
      { source: "/kits/:slug", destination: "/checklist?list=:slug", permanent: true },
      { source: "/lists", destination: "/checklist", permanent: true },
      { source: "/lists/:slug", destination: "/checklist?list=:slug", permanent: true },
      { source: "/build-your-kit", destination: "/checklist", permanent: true },
      { source: "/basket", destination: "/checklist", permanent: true },
      // The offline guide is now generated from the site data.
      { source: "/offline/index.html", destination: "/offline-guide", permanent: true },
    ];
  },
};

export default nextConfig;
