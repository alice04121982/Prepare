import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";

// Self-hosted at build time, with the width axis for the wide label headings.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Stay Prepared",
    template: "%s | Stay Prepared",
  },
  description:
    "A UK guide to getting your household ready for disruption, whether it lasts a day or months: what to keep, how much, and what to do first.",
  openGraph: {
    type: "website",
    siteName: "Stay Prepared",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="absolute -left-[9999px] top-2 z-50 bg-cat-power px-3.5 py-2.5 font-bold focus:left-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="main" className="w-full flex-1">
          {children}
        </div>
        <SiteFooter />
        {/* Cookie-free page counts; no consent banner needed. Off until enabled in Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
