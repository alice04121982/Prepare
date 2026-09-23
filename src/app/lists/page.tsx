import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import StartForm from "@/components/home/StartForm";

export const metadata: Metadata = {
  title: "Prepper shopping lists for UK households",
  description:
    "Four ready-made emergency supply lists: 72 hours, 2 weeks to a month, 3 months, and a grab bag. Scaled to your household, with one button to send the whole list to a basket.",
  alternates: { canonical: "/lists" },
};

export default function ListsPage() {
  return (
    <main>
      <PageIntro
        title="ready-made lists"
        lede="Four lists, each scaled to the people you live with. Every quantity has its reason next to it. Tick what you already have and send the rest to your basket."
      />
      <section className="wrap py-12 min-[900px]:py-18">
        <div className="max-w-[760px]">
          <StartForm />
        </div>
      </section>
    </main>
  );
}
