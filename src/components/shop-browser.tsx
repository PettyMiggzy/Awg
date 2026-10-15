"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AddToCart } from "@/components/add-to-cart";
import { QtyStepper } from "@/components/qty-stepper";
import { useCart } from "@/components/cart-provider";
import {
  productPrice,
  products,
  shopCategories,
  type Product,
  type ShopCategory,
} from "@/lib/shop";

type Sort = "recommended" | "low" | "high" | "name";
type Range = "any" | "under200" | "200to400" | "over400";

const ranges: Array<{ value: Range; label: string }> = [
  { value: "any", label: "Any price" },
  { value: "under200", label: "Under $200" },
  { value: "200to400", label: "$200 to $400" },
  { value: "over400", label: "Over $400" },
];

function inRange(product: Product, range: Range) {
  if (range === "any") return true;
  if (product.price == null) return false;
  if (range === "under200") return product.price < 200;
  if (range === "200to400") return product.price >= 200 && product.price <= 400;
  return product.price > 400;
}

function Card({ product, onQuick }: { product: Product; onQuick: (product: Product) => void }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const single = product.kind === "firearm";
  const quote = product.price == null;
  return (
    <li className="group flex flex-col border border-border bg-card">
      <button type="button" onClick={() => onQuick(product)} className="relative block aspect-[4/5] overflow-hidden text-left" aria-label={`Quick view: ${product.name}`}>
        <span className={`absolute inset-0 ${product.contain ? "bg-white" : "bg-black"}`} />
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
          className={`transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none ${product.contain ? "object-contain p-6" : "object-cover"}`}
        />
        {product.badge ? (
          <span className="absolute top-3 left-3 border border-gold/70 bg-black/75 px-2 py-1 text-[10px] tracking-[0.16em] text-gold uppercase">
            {product.badge}
          </span>
        ) : null}
        <span className="absolute right-3 bottom-3 border border-border bg-black/75 px-2.5 py-1 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 max-sm:opacity-100">
          Quick view
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link href={product.href} className="font-heading text-xl leading-tight hover:text-primary">
            {product.name}
          </Link>
          <p className="mt-1 text-primary">{productPrice(product)}</p>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {quote ? (
            <Button variant="outline" className="h-10 w-full rounded-sm" render={<Link href={`/contact?item=${product.id}`} />}>
              Ask for a quote
            </Button>
          ) : (
            <>
              {single ? null : <QtyStepper value={qty} onChange={setQty} label={product.name} />}
              <Button type="button" className="h-10 flex-1 rounded-sm px-3" onClick={() => add(product.id, single ? 1 : qty)}>
                <ShoppingBag aria-hidden="true" />
                {single ? "Hold for pickup" : "Add to cart"}
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export function ShopBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ShopCategory | "All">("All");
  const [sort, setSort] = useState<Sort>("recommended");
  const [range, setRange] = useState<Range>("any");
  const [quick, setQuick] = useState<Product | null>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        inRange(product, range) &&
        (q === "" || `${product.name} ${product.summary} ${product.category}`.toLowerCase().includes(q)),
    );
    if (sort === "low") return [...list].sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
    if (sort === "high") return [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, category, sort, range]);

  const select = "h-10 rounded-sm border border-input bg-transparent px-3 text-sm";

  return (
    <div>
      <div className="grid gap-4 border-b border-border pb-6 lg:grid-cols-[1fr_auto_auto] lg:items-center">
        <label className="relative block">
          <span className="sr-only">Search the shop</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search ports, Cerakote, engraving..."
            className="h-10 w-full rounded-sm border border-input bg-transparent pr-3 pl-9 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Price
          <select value={range} onChange={(event) => setRange(event.target.value as Range)} className={select}>
            {ranges.map((item) => (
              <option key={item.value} value={item.value} className="bg-card text-foreground">{item.label}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Sort
          <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} className={select}>
            <option value="recommended" className="bg-card text-foreground">Recommended</option>
            <option value="low" className="bg-card text-foreground">Price, low to high</option>
            <option value="high" className="bg-card text-foreground">Price, high to low</option>
            <option value="name" className="bg-card text-foreground">Name</option>
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {shopCategories.map((item) => (
          <Button
            key={item}
            type="button"
            variant={item === category ? "default" : "outline"}
            className="h-9 rounded-sm px-3"
            aria-pressed={item === category}
            onClick={() => setCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {shown.length} {shown.length === 1 ? "item" : "items"}
      </p>
      {shown.length === 0 ? (
        <p className="mt-6 text-muted-foreground">Nothing matches. Clear a filter or search for something else.</p>
      ) : (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((product) => (
            <Card key={product.id} product={product} onQuick={setQuick} />
          ))}
        </ul>
      )}

      <Sheet open={quick != null} onOpenChange={(open) => !open && setQuick(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto bg-background sm:max-w-md">
          {quick ? (
            <>
              <div className={`relative aspect-[4/3] shrink-0 ${quick.contain ? "bg-white" : "bg-black"}`}>
                <Image src={quick.image} alt={quick.imageAlt} fill sizes="448px" className={quick.contain ? "object-contain p-4" : "object-cover"} />
              </div>
              <SheetHeader>
                <SheetTitle className="font-heading text-3xl">{quick.name}</SheetTitle>
                <SheetDescription>
                  {quick.category}
                  {quick.badge ? ` · ${quick.badge}` : ""}
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 px-4 pb-6">
                <p className="font-heading text-2xl text-primary">{productPrice(quick)}</p>
                <p className="leading-relaxed text-muted-foreground">{quick.summary}</p>
                <ul className="grid gap-2 text-sm">
                  {quick.details.map((detail) => (
                    <li key={detail} className="border-t border-border pt-2">{detail}</li>
                  ))}
                </ul>
                {quick.notes.map((note) => (
                  <p key={note} className="text-xs leading-relaxed text-muted-foreground">{note}</p>
                ))}
                {quick.price == null ? (
                  <Button className="h-11 rounded-sm" render={<Link href={`/contact?item=${quick.id}`} />}>Ask for a quote</Button>
                ) : (
                  <AddToCart id={quick.id} />
                )}
                <Link href={quick.href} className="text-sm text-primary hover:underline">See the full page</Link>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
