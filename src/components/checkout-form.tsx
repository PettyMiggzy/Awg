"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QtyStepper } from "@/components/qty-stepper";
import { useCart } from "@/components/cart-provider";
import { formatMoney, shop } from "@/lib/site";
import { productPrice } from "@/lib/shop";

export function CheckoutForm() {
  const { lines, subtotal, hasFirearm, setQty, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [ack, setAck] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (lines.length === 0 && !summary) {
    return (
      <div className="border border-border bg-card p-8">
        <p className="font-heading text-3xl">The cart is empty.</p>
        <Button className="mt-5 h-11 rounded-sm px-5" render={<Link href="/shop" />}>
          Browse the shop
        </Button>
      </div>
    );
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) return setError("Add your name.");
    if (phone.trim().length < 7 && !email.includes("@")) return setError("Add a phone number or an email so the shop can answer.");
    if (hasFirearm && !ack) return setError("Confirm that you understand how a firearm pickup works.");
    setError(null);
    setSummary(
      [
        "AWG Custom Designs order request",
        `Name: ${name.trim()}`,
        `Phone: ${phone.trim() || "—"}`,
        `Email: ${email.trim() || "—"}`,
        "",
        ...lines.map(({ product, qty }) => `${qty} × ${product.name} (${productPrice(product)}) = ${formatMoney((product.price ?? 0) * qty)}`),
        `Subtotal as published: ${formatMoney(subtotal)}`,
        notes.trim() ? `\nNotes: ${notes.trim()}` : "",
        hasFirearm ? "\nI understand a firearm is picked up in Indianapolis with a photo ID, ATF Form 4473, and a passed background check." : "",
      ]
        .filter((line) => line !== "")
        .join("\n"),
    );
  }

  async function copy() {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (summary) {
    const sms = `sms:${shop.phoneTel}?&body=${encodeURIComponent(summary.slice(0, 320))}`;
    return (
      <div className="border border-border bg-card p-6">
        <p className="text-xs tracking-[0.18em] text-primary uppercase">Ready to send</p>
        <h2 className="mt-2 font-heading text-3xl">Send this to the shop.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Nothing was sent or charged. Call, text, or copy the note. The shop is at {shop.phoneDisplay}.
        </p>
        <pre className="mt-5 max-h-80 overflow-auto border border-border bg-background p-4 text-sm leading-relaxed whitespace-pre-wrap">{summary}</pre>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button className="h-11 px-4" render={<a href={`tel:${shop.phoneTel}`} />}>Call the shop</Button>
          <Button variant="outline" className="h-11 px-4" render={<a href={sms} />}>Text this note</Button>
          <Button variant="secondary" className="h-11 px-4" type="button" onClick={copy}>{copied ? "Copied" : "Copy note"}</Button>
        </div>
        <div className="mt-5 flex gap-5 text-sm text-muted-foreground">
          <button type="button" className="underline-offset-4 hover:text-foreground hover:underline" onClick={() => setSummary(null)}>Edit the order</button>
          <button type="button" className="underline-offset-4 hover:text-foreground hover:underline" onClick={() => { clear(); setSummary(null); }}>Clear the cart</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={onSubmit} noValidate className="grid gap-5 lg:order-2">
        <h2 className="font-heading text-3xl">Who is this for?</h2>
        <div className="grid gap-2">
          <Label htmlFor="c-name">Name</Label>
          <Input id="c-name" autoComplete="name" value={name} className="h-11" onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="c-phone">Phone</Label>
            <Input id="c-phone" type="tel" autoComplete="tel" value={phone} className="h-11" onChange={(event) => setPhone(event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-email">Email</Label>
            <Input id="c-email" type="email" autoComplete="email" value={email} className="h-11" onChange={(event) => setEmail(event.target.value)} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="c-notes">Notes for the shop</Label>
          <Textarea id="c-notes" value={notes} placeholder="Make, model, drop-off or ship, and any photos you will send." className="min-h-28" onChange={(event) => setNotes(event.target.value)} />
        </div>
        {hasFirearm ? (
          <label className="flex items-start gap-3 text-sm leading-relaxed" htmlFor="c-ack">
            <input id="c-ack" type="checkbox" checked={ack} className="mt-1 size-4 accent-primary" onChange={(event) => setAck(event.target.checked)} />
            <span>I understand a firearm is picked up in Indianapolis by the buyer, with a valid photo ID, ATF Form 4473, and a passed background check. This does not complete a sale.</span>
          </label>
        ) : null}
        {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" className="h-11 px-5">Prepare the order note</Button>
      </form>

      <div className="lg:order-1">
        <h2 className="font-heading text-3xl">Your order</h2>
        <ul className="mt-5 divide-y divide-border border-y border-border">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="grid grid-cols-[5rem_1fr_auto] items-center gap-4 py-4">
              <div className={`relative size-20 overflow-hidden border border-border ${product.contain ? "bg-white" : "bg-card"}`}>
                <Image src={product.image} alt="" fill sizes="80px" className={product.contain ? "object-contain p-1" : "object-cover"} />
              </div>
              <div>
                <Link href={product.href} className="font-heading text-xl hover:text-primary">{product.name}</Link>
                <p className="text-sm text-primary">{productPrice(product)}</p>
                <div className="mt-2 flex items-center gap-4">
                  {product.kind === "firearm" ? (
                    <span className="text-xs text-muted-foreground">One, held for pickup</span>
                  ) : (
                    <QtyStepper value={qty} onChange={(next) => setQty(product.id, next)} label={product.name} />
                  )}
                  <button type="button" onClick={() => remove(product.id)} className="text-xs text-muted-foreground underline-offset-4 hover:text-destructive hover:underline">Remove</button>
                </div>
              </div>
              <p className="tabular-nums">{formatMoney((product.price ?? 0) * qty)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-baseline justify-between">
          <span className="text-muted-foreground">Subtotal as published</span>
          <span className="font-heading text-3xl">{formatMoney(subtotal)}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Deposits are labeled as deposits and the shop confirms the final price. Custom orders are generally non-refundable once work starts.
        </p>
      </div>
    </div>
  );
}
