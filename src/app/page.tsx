import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  firearms,
  formatMoney,
  priceLabel,
  services,
  shop,
  work,
} from "@/lib/site";

const featured = [
  "next-day-ports",
  "optic-cuts",
  "cerakote-handgun-slide",
  "engraved-pistol",
].map((slug) => services.find((service) => service.slug === slug)!);

const steps = [
  {
    n: "01",
    title: "Talk it through",
    copy: "Call or send photos. Appointments are the way to get a full block of time for a transfer or a design.",
  },
  {
    n: "02",
    title: "Agree on the number",
    copy: "Most custom work starts with a deposit. The menu marks which prices are deposits, starting points, or flat rates.",
  },
  {
    n: "03",
    title: "Drop it off or ship it",
    copy: "If it ships, use UPS and send the tracking number so the job does not sit unopened.",
  },
  {
    n: "04",
    title: "Pick it up",
    copy: "Custom work is called when it is ready. A firearm transfer still ends with ID, Form 4473, and a background check.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="grid min-h-[calc(100svh-7.5rem)] lg:grid-cols-12">
        <div className="flex flex-col justify-end px-6 py-14 lg:col-span-5 lg:px-12 lg:py-16">
          <p className="text-xs font-medium tracking-[0.22em] text-primary uppercase">
            Licensed FFL · Indianapolis · Est. {shop.established}
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-[0.98] text-balance sm:text-6xl lg:text-7xl">
            One-of-one firearms, finished at the bench.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Engraving, Cerakote, optic cuts, porting, polishing, sales, and transfers.
            AWG Custom Designs treats the job like a reputation, not a template.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(buttonVariants({}), "h-11 rounded-sm px-5")}
            >
              Book a session
            </Link>
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-sm px-5")}
            >
              See the menu
            </Link>
          </div>
        </div>
        <div className="relative min-h-[70vw] lg:col-span-7 lg:min-h-0">
          <Image
            src="/images/ports.jpg"
            alt="Ported handgun slide with a gold barrel"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid border-y border-border lg:grid-cols-2">
        <div className="relative min-h-72">
          <Image
            src="/images/rifle-detail.jpg"
            alt="Engraved rifle with gold controls and an AWG magazine"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-12 lg:px-12">
          <p className="text-xs tracking-[0.22em] text-primary uppercase">On the bench now</p>
          <h2 className="mt-3 font-heading text-4xl sm:text-5xl">Next day ports, $175.</h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            Special pricing on a quick turnaround, for a limited time. Book the session
            before the opening closes.
          </p>
          <Link
            href="/services/next-day-ports"
            className={cn(buttonVariants({}), "mt-6 h-11 w-fit rounded-sm px-5")}
          >
            Hold a porting slot
          </Link>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.22em] text-primary uppercase">Menu</p>
            <h2 className="mt-3 font-heading text-4xl sm:text-5xl">What the bench does</h2>
          </div>
          <Link href="/services" className="hidden text-sm text-primary hover:underline sm:inline">
            Full price list
          </Link>
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group border border-border bg-card"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={service.image!}
                  alt={service.imageAlt!}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-heading text-2xl">{service.name}</p>
                <p className="mt-2 text-sm text-primary">{priceLabel(service)}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/services" className="mx-auto mt-6 block max-w-6xl text-sm text-primary hover:underline sm:hidden">
          Full price list
        </Link>
      </section>

      <section className="border-t border-border py-16 lg:py-24">
        <div className="flex items-end justify-between px-6 lg:px-12">
          <div>
            <p className="text-xs tracking-[0.22em] text-primary uppercase">Recent work</p>
            <h2 className="mt-3 font-heading text-4xl sm:text-5xl">From the camera roll</h2>
          </div>
          <Link href="/work" className="text-sm text-primary hover:underline">
            All of it
          </Link>
        </div>
        <div className="snap-row mt-8 flex gap-4 overflow-x-auto px-6 pb-4 lg:px-12">
          {work.map((piece) => (
            <Link
              key={piece.src}
              href={piece.href}
              className="w-[78vw] shrink-0 sm:w-80"
            >
              <div className={`relative ${piece.aspect} overflow-hidden bg-card`}>
                <Image
                  src={piece.src}
                  alt={piece.alt}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-heading text-2xl">{piece.title}</p>
              <p className="text-sm text-muted-foreground">{piece.caption}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ivory px-6 py-16 text-ink lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.22em] text-gold-ink uppercase">On the floor</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-4xl sm:text-5xl">Three guns, listed as they are</h2>
            <Link href="/firearms" className="text-sm text-gold-ink hover:underline">
              Read the listings
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#5c5348]">
            Pre-owned firearms currently published by the shop. A listing is not a completed
            sale. Pickup is in Indianapolis after Form 4473 and a passed background check.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {firearms.map((firearm) => (
              <Link key={firearm.slug} href={`/firearms/${firearm.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={firearm.images[0].src}
                    alt={firearm.images[0].alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 font-heading text-2xl">{firearm.name}</p>
                <p className="text-sm text-[#5c5348]">{firearm.condition}</p>
                <p className="mt-1 text-gold-ink">{formatMoney(firearm.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.22em] text-primary uppercase">How a job moves</p>
          <h2 className="mt-3 max-w-xl font-heading text-4xl sm:text-5xl">
            From the first photo to pickup.
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n}>
                <p className="font-heading text-3xl text-primary">{step.n}</p>
                <h3 className="mt-3 font-heading text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border px-6 py-16 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-4xl">Bring the idea. Bring the gun.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {shop.phoneDisplay} · {shop.street}, {shop.city}
            </p>
          </div>
          <Link href="/contact" className={cn(buttonVariants({}), "h-11 rounded-sm px-5")}>
            Start an inquiry
          </Link>
        </div>
      </section>
    </>
  );
}
