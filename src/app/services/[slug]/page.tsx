import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getService, priceLabel, services } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.summary };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = services
    .filter((item) => item.category === service.category && item.slug !== service.slug)
    .slice(0, 3);

  return (
    <article>
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-80 bg-card lg:min-h-[70vh]">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.imageAlt ?? service.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full min-h-80 items-end p-8 lg:min-h-[70vh] lg:p-12">
              <p className="font-heading text-5xl text-primary/80">{service.category}</p>
            </div>
          )}
        </div>
        <div className="px-6 py-12 lg:px-12 lg:py-16">
          <p className="text-xs tracking-[0.22em] text-primary uppercase">
            {service.category}
            {service.limited ? " · Limited turnaround" : ""}
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-[1.02] text-balance">
            {service.name}
          </h1>
          <p className="mt-4 font-heading text-3xl text-primary">{priceLabel(service)}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {service.summary}
          </p>
          <ul className="mt-6 grid max-w-xl gap-3 text-sm leading-relaxed">
            {service.details.map((detail) => (
              <li key={detail} className="border-t border-border pt-3">
                {detail}
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid max-w-xl gap-2 text-sm text-muted-foreground">
            {service.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          {service.image === "/images/rifle-barrel.jpg" ? (
            <p className="mt-4 max-w-xl text-sm text-muted-foreground">
              The photo is rifle engraving from the bench, not a coated barrel. Barrel
              Cerakote is still quoted from the barrel you send.
            </p>
          ) : null}
          <Link
            href="#inquire"
            className={cn(buttonVariants({}), "mt-8 h-11 rounded-sm px-5")}
          >
            Inquire about this
          </Link>
        </div>
      </section>
      <section id="inquire" className="border-t border-border px-6 py-16 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-heading text-4xl">Ask before you ship anything.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Include photos if you have them. The form prepares a note you can call or
              text. It does not take the deposit.
            </p>
          </div>
          <InquiryForm initialInterest={service.slug} />
        </div>
      </section>
      {related.length > 0 ? (
        <section className="border-t border-border px-6 py-12 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-3xl">Also in {service.category.toLowerCase()}</h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="flex items-baseline justify-between gap-6 py-4 hover:text-primary"
                  >
                    <span className="font-heading text-2xl">{item.name}</span>
                    <span className="text-primary">{priceLabel(item)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}
