import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { work } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Engraving, Cerakote, porting, stippling, and case work from AWG Custom Designs in Indianapolis.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="The photos are the portfolio."
        lede="These are pieces published by the shop. The old site still had leftover template projects that were never AWG work. Those are gone."
      />
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto columns-1 gap-6 sm:columns-2 lg:columns-3">
          {work.map((piece) => (
            <Link
              key={piece.src}
              href={piece.href}
              className="mb-6 block break-inside-avoid"
            >
              <div className={`relative ${piece.aspect} overflow-hidden bg-card`}>
                <Image
                  src={piece.src}
                  alt={piece.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-heading text-2xl">{piece.title}</p>
              <p className="text-sm text-muted-foreground">{piece.caption}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
