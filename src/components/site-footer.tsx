import Image from "next/image";
import Link from "next/link";
import { nav, shop, addressLine } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-14 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/images/brand/logo-lockup.png"
            alt={shop.name}
            width={1398}
            height={778}
            className="h-24 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Licensed FFL in Indianapolis for engraving, Cerakote, machining, sales,
            and transfers. Established {shop.established}.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-primary uppercase">Visit</p>
          <p className="mt-3 text-sm leading-relaxed">
            {shop.street}
            <br />
            {shop.city}, {shop.region} {shop.postal}
          </p>
          <a className="mt-3 inline-block text-sm text-primary hover:underline" href={shop.maps}>
            Directions
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            By appointment. Walk-in hours are not published.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-primary uppercase">Talk</p>
          <a className="mt-3 block text-sm hover:text-primary" href={`tel:${shop.phoneTel}`}>
            {shop.phoneDisplay}
          </a>
          <a className="mt-2 block text-sm hover:text-primary" href={shop.instagram}>
            Instagram {shop.instagramHandle}
          </a>
          <a
            className="mt-2 block text-sm hover:text-primary"
            href={shop.tiktok}
            target="_blank"
            rel="noreferrer"
          >
            TikTok {shop.tiktokHandle}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-4 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="max-w-md sm:text-right">
          Firearm purchases and transfers are completed under federal and Indiana law.
          A buyer picks up in person at {addressLine} after a passed background check.
        </p>
      </div>
    </footer>
  );
}
