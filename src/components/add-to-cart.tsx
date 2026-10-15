"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/qty-stepper";
import { useCart } from "@/components/cart-provider";
import { getProduct } from "@/lib/shop";

export function AddToCart({ id, className }: { id: string; className?: string }) {
  const product = getProduct(id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  if (!product || product.price == null) return null;
  const single = product.kind === "firearm";
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        {single ? null : <QtyStepper value={qty} onChange={setQty} label={product.name} />}
        <Button type="button" className="h-10 rounded-sm px-5" onClick={() => add(id, single ? 1 : qty)}>
          <ShoppingBag aria-hidden="true" />
          {single ? "Hold for pickup" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
