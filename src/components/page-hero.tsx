export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border px-6 py-14 lg:px-12 lg:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url(/images/brand/scroll-band.jpg)" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/40" />
      <div className="mx-auto max-w-6xl">
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
    </section>
  );
}
