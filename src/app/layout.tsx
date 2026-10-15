import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { shop } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const description =
  "Indianapolis FFL for laser engraving, Cerakote, optic cuts, porting, polishing, firearm sales, and transfers.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:43123"),
  title: {
    default: `${shop.name} · Indianapolis custom firearms`,
    template: `%s · ${shop.name}`,
  },
  description,
  openGraph: {
    title: shop.name,
    description,
    images: ["/images/brand/logo-poster.jpg"],
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: shop.name,
  telephone: shop.phoneTel,
  url: "https://www.awgcustomdesigns.com",
  image: "/images/brand/logo-poster.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: shop.street,
    addressLocality: shop.city,
    addressRegion: shop.region,
    postalCode: shop.postal,
    addressCountry: "US",
  },
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
