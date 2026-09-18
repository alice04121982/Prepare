import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Stay Prepared",
    template: "%s | Stay Prepared",
  },
  description:
    "A practical, non-alarmist guide to what to keep on hand for social disruption, and realistically how long it lasts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Fontshare pairing: General Sans (headings) + Switzer (body) */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=switzer@400,500,600&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <div className="w-full flex-1 px-4 sm:px-10">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
