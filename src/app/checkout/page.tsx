import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Review order",
  description: "Review your AWG Custom Designs order request.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Order"
        title="Review, then send it to the shop."
        lede="This site does not take a card. The order note below goes to the shop by call, text, or copy, and the shop confirms the total, the deposit, and the date."
      />
      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <CheckoutForm />
        </div>
      </section>
    </>
  );
}
