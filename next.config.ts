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
    ];
  },
};

export default nextConfig;
