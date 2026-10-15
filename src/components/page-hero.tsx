import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  lede,
  art,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  /** Artwork made for the site. Decorative, so it carries no alt text. */
  art?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border px-6 py-14 lg:px-12 lg:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url(/images/brand/scroll-band.jpg)" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/40" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12">
        <div className={art ? "lg:col-span-7" : "lg:col-span-12"}>
          <p className="text-xs font-medium tracking-[0.22em] text-primary uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-5xl leading-[1.02] text-balance sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {lede}
          </p>
        </div>
        {art ? (
          <div className="relative hidden aspect-[4/3] overflow-hidden border border-border lg:col-span-5 lg:block">
            <Image src={art} alt="" fill priority sizes="480px" className="object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
