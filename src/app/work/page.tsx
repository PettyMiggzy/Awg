import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InstagramRail } from "@/components/instagram-rail";
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
        lede="Ports, optic cuts, Cerakote, engraving, stipple, and fitted cases from the Indianapolis bench. The grid is work the shop published. The row under it is from @mr.awg."
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
      <InstagramRail />
    </>
  );
}
