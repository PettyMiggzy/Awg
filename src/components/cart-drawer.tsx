"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetDescription,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { QtyStepper } from "@/components/qty-stepper";
import { useCart } from "@/components/cart-provider";
import { formatMoney } from "@/lib/site";
import { productPrice } from "@/lib/shop";

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="relative"
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      onClick={() => setOpen(true)}
    >
      <ShoppingBag aria-hidden="true" />
      {count > 0 ? (
        <span className="absolute -top-1.5 -right-1.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
          {count}
        </span>
      ) : null}
    </Button>
  );
}

export function CartDrawer() {
  const { lines, subtotal, open, setOpen, setQty, remove } = useCart();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl">Your cart</SheetTitle>
          <SheetDescription>Nothing is charged here. The shop confirms every order.</SheetDescription>
        </SheetHeader>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start gap-4 px-4">
            <p className="text-muted-foreground">The cart is empty.</p>
            <Button className="h-10 rounded-sm px-5" render={<Link href="/shop" onClick={() => setOpen(false)} />}>
              Browse the shop
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-4">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="grid grid-cols-[4.5rem_1fr] gap-4 py-4">
                  <div className={`relative size-[4.5rem] overflow-hidden border border-border ${product.contain ? "bg-white" : "bg-card"}`}>
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="72px"
                      className={product.contain ? "object-contain p-1" : "object-cover"}
                    />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <Link href={product.href} onClick={() => setOpen(false)} className="font-heading text-lg leading-tight hover:text-primary">
                        {product.name}
                      </Link>
                      <button type="button" aria-label={`Remove ${product.name}`} onClick={() => remove(product.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-primary">{productPrice(product)}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      {product.kind === "firearm" ? (
                        <span className="text-xs text-muted-foreground">One, held for pickup</span>
                      ) : (
                        <QtyStepper value={qty} onChange={(next) => setQty(product.id, next)} label={product.name} />
                      )}
                      <span className="text-sm tabular-nums">{formatMoney((product.price ?? 0) * qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="grid gap-3 border-t border-border p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-2xl">{formatMoney(subtotal)}</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Deposits and flat prices are added as the shop publishes them. Final amounts are confirmed by the shop.
              </p>
              <Button className="h-11 rounded-sm" render={<Link href="/checkout" onClick={() => setOpen(false)} />}>
                Review order
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
