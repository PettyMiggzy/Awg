import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";
import { addressLine, shop } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call or write AWG Custom Designs at 6269 Coffman Rd, Indianapolis. Appointments are recommended.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const { item } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell the shop what the piece should become."
        lede="Appointments are recommended. If a firearm is being shipped in, call before the seller prints a label."
      />
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="grid content-start gap-8">
            <div>
              <p className="text-xs tracking-[0.18em] text-primary uppercase">Phone</p>
              <a className="mt-2 block font-heading text-4xl hover:text-primary" href={`tel:${shop.phoneTel}`}>
                {shop.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] text-primary uppercase">Shop</p>
              <p className="mt-2 leading-relaxed">{addressLine}</p>
              <a className="mt-2 inline-block text-sm text-primary hover:underline" href={shop.maps}>
                Open in maps
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                By appointment. No walk-in hours are published.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] text-primary uppercase">Social</p>
              <a className="mt-2 block hover:text-primary" href={shop.instagram}>
                Instagram {shop.instagramHandle}
              </a>
              <a
                className="mt-2 block hover:text-primary"
                href={shop.tiktok}
                target="_blank"
                rel="noreferrer"
              >
                TikTok {shop.tiktokHandle}
              </a>
            </div>
          </div>
          <InquiryForm initialInterest={item} />
        </div>
      </section>
    </>
  );
}
