"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, maxQty, type Product } from "@/lib/shop";

const STORAGE_KEY = "awg-cart-v1";

export type CartLine = { product: Product; qty: number };

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  hasFirearm: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, number>;
        const clean: Record<string, number> = {};
        for (const [id, qty] of Object.entries(parsed)) {
          const product = getProduct(id);
          if (product?.price != null && Number.isInteger(qty) && qty > 0) {
            clean[id] = Math.min(qty, product.kind === "firearm" ? 1 : maxQty);
          }
        }
        setItems(clean);
      }
    } catch {
      // Storage can be blocked. The cart then lasts for this visit only.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, ready]);

  const limit = (id: string) => (getProduct(id)?.kind === "firearm" ? 1 : maxQty);

  const add = useCallback((id: string, qty = 1) => {
    const product = getProduct(id);
    if (!product || product.price == null) return;
    setItems((current) => ({
      ...current,
      [id]: Math.min((current[id] ?? 0) + qty, limit(id)),
    }));
    setOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((current) => {
      const next = { ...current };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, limit(id));
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => setQty(id, 0), [setQty]);
  const clear = useCallback(() => setItems({}), []);

  const value = useMemo<CartState>(() => {
    const lines: CartLine[] = Object.entries(items).flatMap(([id, qty]) => {
      const product = getProduct(id);
      return product ? [{ product, qty }] : [];
    });
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      subtotal: lines.reduce((sum, line) => sum + (line.product.price ?? 0) * line.qty, 0),
      hasFirearm: lines.some((line) => line.product.kind === "firearm"),
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [items, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
