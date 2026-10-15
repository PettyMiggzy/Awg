import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, shop } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Location, FFL transfers, deposits, shipping, and pickup rules for AWG Custom Designs in Indianapolis.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        art="/images/brand/head-faq.jpg"
        eyebrow="FAQ"
        title="The answers that were buried on the old site."
        lede="Transfers, deposits, shipping, and what you need in your pocket at pickup. If your question is about a specific gun, call and ask before you order it from someone else."
      />
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-3xl gap-12">
          {faqs.map((group) => (
            <div key={group.group}>
              <h2 className="font-heading text-3xl">{group.group}</h2>
              <Accordion className="mt-4">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger className="py-4 font-heading text-xl hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
          <div className="border border-border p-6">
            <h2 className="font-heading text-3xl">Still stuck?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Call {shop.phoneDisplay} or send the project through the contact form with
              photos. Instagram is {shop.instagramHandle}. TikTok is {shop.tiktokHandle}.
            </p>
            <Link href="/contact" className="mt-4 inline-block text-sm text-primary hover:underline">
              Write the shop
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
