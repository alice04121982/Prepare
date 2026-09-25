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
      // Every way to order a kit now lives on one page (25 September 2026).
      // Query strings pass through, so shared households survive.
      { source: "/lists", destination: "/kits", permanent: true },
      { source: "/lists/:slug", destination: "/kits/:slug", permanent: true },
      { source: "/build-your-kit", destination: "/kits", permanent: true },
      { source: "/basket", destination: "/kits", permanent: true },
      // The offline guide is now generated from the site data.
      { source: "/offline/index.html", destination: "/offline-guide", permanent: true },
    ];
  },
};

export default nextConfig;
