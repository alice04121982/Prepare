import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import SectionLabel from "@/components/SectionLabel";
import Callout from "@/components/Callout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Stay Prepared sets no cookies and runs no analytics. This page says exactly what the site does and does not collect.",
};

export default function PrivacyPage() {
  return (
    <main className="w-full py-4 sm:py-8">
      <PageIntro
        eyebrow="Privacy"
        title="What this site knows about you"
        lede="As little as we can manage. No accounts, no cookies of our own, no analytics. This page says exactly what happens when you use the site."
      />

      <div className="mx-auto max-w-3xl">
        <section className="mb-12">
          <SectionLabel>What we collect</SectionLabel>
          <h2 className="text-2xl font-semibold">Nothing you type</h2>
          <div className="prose-plain mt-3 leading-relaxed text-muted">
            <p>
              There are no accounts, no sign-up forms, and no newsletter yet. If
              we add one, this page will change first and it will only ever ask
              for an email address.
            </p>
            <p>
              The <Link href="/build-your-kit">Build Your Kit</Link> planner
              keeps your answers in the address bar of your own browser so you
              can bookmark or share a list. Nothing is sent to us. Ticks against
              items you already own are forgotten when you leave the page.
            </p>
            <p>
              The offline guide is a plain file. Downloading it tells us nothing.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <SectionLabel>Cookies and analytics</SectionLabel>
          <h2 className="text-2xl font-semibold">We set no cookies and run no analytics</h2>
          <div className="prose-plain mt-3 leading-relaxed text-muted">
            <p>
              No tracking script, no visitor counter, no advertising pixels. If
              we ever add a visitor count it will be a privacy-respecting one
              that sets no cookie and cannot identify you, and this page will say
              so.
            </p>
            <p>
              The site is served by a hosting company. Like any web server it
              keeps short-lived logs of the address a request came from, the
              time, and the page asked for, to keep the site running and to
              stop abuse. We do not use those logs to identify anyone.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <SectionLabel>Other companies</SectionLabel>
          <h2 className="text-2xl font-semibold">Where your browser talks to someone else</h2>
          <div className="prose-plain mt-3 leading-relaxed text-muted">
            <p>
              <strong>Product links.</strong> When you follow a product link to a
              shop, that shop may set a cookie in your browser so that a purchase
              is credited to us. The cookie belongs to the shop and is governed
              by its own privacy policy, for example{" "}
              <a href="https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=201909010" target="_blank" rel="noopener noreferrer">
                Amazon&rsquo;s
              </a>
              . We never learn who you are or what you bought. See{" "}
              <Link href="/disclosure">how this site earns money</Link>.
            </p>
            <p>
              <strong>Product photos.</strong> On the Build Your Kit page,
              product pictures are loaded from the shop&rsquo;s own servers
              rather than ours, so your browser asks the shop for the image.
              That request carries no information about you from us.
            </p>
            <p>
              <strong>Fonts.</strong> The typefaces are loaded from Fontshare,
              which sees the request like any web server would.
            </p>
            <p>
              <strong>Links to official guidance and charities</strong> take you
              to their sites, which have their own policies. None of those links
              earn us anything.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <SectionLabel>Your rights</SectionLabel>
          <h2 className="text-2xl font-semibold">Under UK data protection law</h2>
          <div className="prose-plain mt-3 leading-relaxed text-muted">
            <p>
              You have the right to ask what personal data we hold about you,
              to have it corrected or deleted, and to complain to the
              Information Commissioner&rsquo;s Office. Because we hold none,
              there is nothing to hand over, but you are welcome to ask and we
              will confirm that in writing.
            </p>
            <p>
              The site is run from the United Kingdom by an individual, not a
              company. Write to{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
          </div>
        </section>

        <Callout title="Changes">
          <p>
            If any of this changes, the change is made here first and the date
            below is updated. Last checked {site.policiesUpdated}.
          </p>
        </Callout>
      </div>
    </main>
  );
}
