import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
// Vercel preview deployments load the Vercel toolbar from vercel.live.
const isPreview = process.env.VERCEL_ENV === "preview";
const toolbar = isPreview ? " https://vercel.live" : "";

// Every page is prerendered, so the policy has no per-request nonce and
// inline scripts stay allowed (see the "Without Nonces" section of the Next
// content security policy guide). It still stops scripts, styles and fonts
// loading from anywhere else, and stops the site being framed.
// Images: product photos come from m.media-amazon.com only (paapi.ts checks
// this). Forms: the one-click basket submits to amazon.co.uk.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}${toolbar}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://m.media-amazon.com" + (isPreview ? " https://vercel.com https://vercel.live" : ""),
  "font-src 'self' data:" + (isPreview ? " https://vercel.live" : ""),
  "connect-src 'self'" + (isDev ? " https://va.vercel-scripts.com" : "") + (isPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""),
  `frame-src 'none'${toolbar}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://www.amazon.co.uk",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
