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
    <section className="border-b border-border px-6 py-14 lg:px-12 lg:py-20">
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
