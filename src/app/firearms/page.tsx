import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { firearms, formatMoney } from "@/lib/site";

export const metadata: Metadata = {
  title: "Firearms",
  description:
    "Pre-owned firearms listed by AWG Custom Designs in Indianapolis. Pickup in person after a background check.",
};

export default function FirearmsPage() {
  return (
    <>
      <PageHero
        eyebrow="On the floor"
        title="What is listed right now."
        lede="Three pre-owned guns, with the prices and descriptions AWG published. Photos are of those guns. A listing here does not complete a sale, and nothing on this site ships a firearm to a house."
      />
      <section className="bg-ivory px-6 py-12 text-ink lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10">
          {firearms.map((firearm) => (
            <Link
              key={firearm.slug}
              href={`/firearms/${firearm.slug}`}
              className="grid items-center gap-6 border border-[#ddd4c4] bg-white p-4 md:grid-cols-[280px_1fr] md:p-6"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={firearm.images[0].src}
                  alt={firearm.images[0].alt}
                  fill
                  sizes="280px"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-[#5c5348]">{firearm.condition}</p>
                <h2 className="mt-1 font-heading text-4xl">{firearm.name}</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#3d362e]">
                  {firearm.summary}
                </p>
                <p className="mt-4 font-heading text-3xl text-gold-ink">
                  {formatMoney(firearm.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
