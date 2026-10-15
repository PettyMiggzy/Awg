import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { shop } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "AWG Custom Designs is an Indianapolis FFL founded in 2024 for engraving, Cerakote, machining, sales, and transfers.",
};

const points = [
  {
    title: "Licensed dealer",
    copy: "Sales, transfers, and custom work are done as a federally licensed firearms dealer, under federal and state law.",
  },
  {
    title: "One bench",
    copy: "Engraving, Cerakote, optic cuts, porting, polishing, and gift engraving are handled in the same shop.",
  },
  {
    title: "A number before the work",
    copy: "The shop’s own line is honest pricing: no hidden fees, and a clear conversation before a job starts.",
  },
  {
    title: "You can get a person",
    copy: "Questions are meant to be answered. Appointments exist so a transfer or a design talk is not squeezed between other jobs.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Mr. AWG · Est. ${shop.established}`}
        title="Quality is the reputation."
        lede="AWG Custom Designs was founded in 2024 with one goal: high-quality craftsmanship a customer can trust. Firearm sales and transfers, laser engraving, Cerakote, optic cuts, custom porting, and designs that are meant to be one of one."
      />
      <section className="grid lg:grid-cols-2">
        <div className="flex items-end justify-center bg-black px-8 pt-10">
          <Image
            src="/images/mr-awg.jpg"
            alt="Mr. AWG, founder of AWG Custom Designs"
            width={900}
            height={1200}
            className="h-auto max-h-[40rem] w-auto"
            priority
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 lg:px-12">
          <p className="text-xs tracking-[0.22em] text-primary uppercase">Mr. AWG</p>
          <h2 className="mt-3 font-heading text-4xl">The mission, in their words.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Exceptional craftsmanship, honest service, and customization that is supposed
            to beat the expectation. Precision and integrity, and a project finished with
            care because the piece has to stand out.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The public face of the bench is Mr. AWG. The shop is at {shop.street} in{" "}
            {shop.city}. Walk-in hours are not posted. Call {shop.phoneDisplay} and book
            the time.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({}), "mt-8 h-11 w-fit rounded-sm px-5")}
          >
            Work with the shop
          </Link>
        </div>
      </section>
      <section className="border-t border-border px-6 py-16 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point.title} className="border-t border-border pt-5">
              <h3 className="font-heading text-3xl">{point.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {point.copy}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
