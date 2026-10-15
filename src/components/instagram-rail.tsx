import Image from "next/image";
import { instagramPosts, shop } from "@/lib/site";

export function InstagramRail() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="flex items-end justify-between gap-6 px-6 lg:px-12">
        <div>
          <p className="text-xs tracking-[0.22em] text-primary uppercase">Instagram</p>
          <h2 className="mt-3 font-heading text-4xl sm:text-5xl">From {shop.instagramHandle}</h2>
        </div>
        <a
          href={shop.instagram}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-sm text-primary hover:underline"
        >
          Follow the shop
        </a>
      </div>
      <p className="mt-4 max-w-2xl px-6 text-sm leading-relaxed text-muted-foreground lg:px-12">
        Luxury custom firearms and laser engraving, plus signs, gifts, and metal.
        These frames are from the shop’s own reels. They are not the guns listed for sale.
      </p>
      <div className="snap-row mt-8 flex gap-4 overflow-x-auto px-6 pb-4 lg:px-12">
        {instagramPosts.map((post) => (
          <a
            key={post.href}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            className="w-44 shrink-0 sm:w-56"
          >
            <div className="relative aspect-[9/16] overflow-hidden bg-card">
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-heading text-2xl">{post.title}</p>
            <p className="text-sm text-muted-foreground">{post.caption}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
