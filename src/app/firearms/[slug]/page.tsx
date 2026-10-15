import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { firearms, formatMoney, getFirearm, shop } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return firearms.map((firearm) => ({ slug: firearm.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const firearm = getFirearm(slug);
  if (!firearm) return {};
  return {
    title: firearm.name,
    description: `${firearm.name}, ${formatMoney(firearm.price)}. ${firearm.condition}. Pickup at AWG Custom Designs in Indianapolis.`,
  };
}

export default async function FirearmPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const firearm = getFirearm(slug);
  if (!firearm) notFound();

  return (
    <article>
      <section className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-[#f7f4ef] p-6 lg:p-12">
          <div className="grid gap-4">
            {firearm.images.map((image) => (
              <div key={image.src} className="relative aspect-[4/3] bg-white">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={image === firearm.images[0]}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-6"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-12 lg:px-12 lg:py-16">
          <p className="text-xs tracking-[0.22em] text-primary uppercase">
            In stock at the shop
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-[1.02]">{firearm.name}</h1>
          <p className="mt-4 font-heading text-4xl text-primary">
            {formatMoney(firearm.price)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{firearm.condition}</p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            {firearm.summary}
          </p>
          <dl className="mt-8 max-w-xl divide-y divide-border border-y border-border">
            {firearm.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm">
                <dt className="text-muted-foreground">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-8 font-heading text-2xl">Included</h2>
          <ul className="mt-3 grid max-w-xl gap-2 text-sm leading-relaxed text-muted-foreground">
            {firearm.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-8 max-w-xl border border-border p-4 text-sm leading-relaxed">
            <p>
              This is a request, not a checkout. The buyer picks the firearm up at{" "}
              {shop.street}, {shop.city}, with a valid photo ID, any required state paperwork,
              ATF Form 4473, and a passed background check. Someone else cannot take possession.
              Confirm it is still available before you drive over. Normal signs of use may show
              in the photos.
            </p>
            <p className="mt-3">
              Out-of-state buyers need their own FFL to receive a firearm. Call{" "}
              <a className="text-primary hover:underline" href={`tel:${shop.phoneTel}`}>
                {shop.phoneDisplay}
              </a>{" "}
              before anyone ships one.
            </p>
          </div>
          <Link href="#inquire" className="mt-6 inline-block text-sm text-primary hover:underline">
            Ask about this gun
          </Link>
        </div>
      </section>
      <section id="inquire" className="border-t border-border px-6 py-16 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-heading text-4xl">Ask if it is still on the floor.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The note goes nowhere until you call or text it. No card is charged on this site.
            </p>
          </div>
          <InquiryForm initialInterest={firearm.slug} />
        </div>
      </section>
    </article>
  );
}
