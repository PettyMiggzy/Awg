import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShopBrowser } from "@/components/shop-browser";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Engraving, Cerakote, ports, optic cuts, stippling, and pre-owned firearms from AWG Custom Designs in Indianapolis.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        art="/images/brand/head-svc.jpg"
        eyebrow="Shop"
        title="Everything the bench sells."
        lede="Services, deposits, and three pre-owned firearms, at the prices AWG publishes. Add what you want and review the order. Nothing is charged here, and a firearm is only held for pickup."
      />
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <ShopBrowser />
        </div>
      </section>
    </>
  );
}
