import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Pages folded into others when the site was simplified.
    return [
      { source: "/scenarios", destination: "/what-might-stop", permanent: true },
      { source: "/official-guidance", destination: "/what-might-stop", permanent: true },
      { source: "/why", destination: "/what-might-stop", permanent: true },
      { source: "/faq", destination: "/checklist#questions", permanent: true },
    ];
  },
};

export default nextConfig;
