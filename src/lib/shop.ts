import { firearms, formatMoney, priceLabel, services, type PriceKind } from "@/lib/site";

export type ShopCategory = "Machining" | "Cerakote" | "Engraving" | "Shop" | "Firearms";

export type Product = {
  id: string;
  name: string;
  kind: "service" | "firearm";
  category: ShopCategory;
  price: number | null;
  priceKind: PriceKind | "firearm";
  badge?: string;
  image: string;
  imageAlt: string;
  contain?: boolean;
  href: string;
  summary: string;
  details: string[];
  notes: string[];
};

const fallbackImage = "/images/brand/head-svc.jpg";

const serviceProducts: Product[] = services.map((service) => ({
  id: service.slug,
  name: service.name,
  kind: "service",
  category: service.category,
  price: service.price,
  priceKind: service.priceKind,
  badge: service.limited
    ? "Special"
    : service.slug === "optic-cuts"
      ? "Glock and HK only"
      : service.priceKind === "deposit"
        ? "Deposit"
        : undefined,
  image: service.image ?? fallbackImage,
  imageAlt: service.imageAlt ?? service.name,
  href: `/services/${service.slug}`,
  summary: service.summary,
  details: service.details,
  notes: service.notes,
}));

const firearmProducts: Product[] = firearms.map((firearm) => ({
  id: firearm.slug,
  name: firearm.name,
  kind: "firearm",
  category: "Firearms",
  price: firearm.price,
  priceKind: "firearm",
  badge: "Pre-owned",
  image: firearm.images[0].src,
  imageAlt: firearm.images[0].alt,
  contain: true,
  href: `/firearms/${firearm.slug}`,
  summary: firearm.summary,
  details: firearm.specs.map((spec) => `${spec.label}: ${spec.value}`),
  notes: [
    "Held for in-person pickup in Indianapolis. Pickup needs a photo ID, ATF Form 4473, and a passed background check.",
  ],
}));

// Priced items first, in the order the shop lists them, then the quote-only services.
export const products: Product[] = [
  ...serviceProducts.filter((product) => product.price != null),
  ...firearmProducts,
  ...serviceProducts.filter((product) => product.price == null),
];

export const shopCategories: Array<ShopCategory | "All"> = [
  "All",
  "Machining",
  "Cerakote",
  "Engraving",
  "Firearms",
  "Shop",
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function productPrice(product: Product) {
  if (product.priceKind === "firearm") return product.price == null ? "Call" : formatMoney(product.price);
  return priceLabel({ priceKind: product.priceKind, price: product.price });
}

export const maxQty = 9;
