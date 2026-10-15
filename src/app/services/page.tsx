import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ServicesBrowser } from "@/components/services-browser";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Published prices for porting, optic cuts, stippling, polishing, Cerakote, engraving, cases, and FFL transfers at AWG Custom Designs.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="A menu, not a mystery cart."
        lede="These are the prices AWG publishes. Deposits are labeled as deposits. Anything marked quoted is priced after the shop sees the project. Custom orders are generally non-refundable once work starts."
      />
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <ServicesBrowser services={services} />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Most custom projects also ask for a 50% non-refundable deposit before work
            begins. If a line above already names a deposit, confirm with the shop which
            figure applies to your job before you pay.
          </p>
        </div>
      </section>
    </>
  );
}
