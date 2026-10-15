"use client";

import { useMemo, useState, type FormEvent } from "react";
import { firearmSlugs, inquiryOptions, shop } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Errors = Partial<Record<"name" | "reach" | "message" | "ack", string>>;

export function InquiryForm({
  initialInterest = "custom",
}: {
  initialInterest?: string;
}) {
  const starting = inquiryOptions.some((option) => option.value === initialInterest)
    ? initialInterest
    : "custom";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(starting);
  const [message, setMessage] = useState("");
  const [ack, setAck] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const needsAck = firearmSlugs.includes(interest);
  const interestLabel = useMemo(
    () => inquiryOptions.find((option) => option.value === interest)?.label ?? interest,
    [interest],
  );

  function validate() {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Add your name.";
    if (phone.trim().length < 7 && !email.includes("@")) {
      next.reach = "Add a phone number or an email so the shop can answer.";
    }
    if (message.trim().length < 12) {
      next.message = "Say what you want done, and include the gun or item if you have it.";
    }
    if (needsAck && !ack) {
      next.ack = "Confirm that you understand how a firearm pickup works.";
    }
    return next;
  }

  function buildSummary() {
    return [
      "AWG Custom Designs inquiry",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim() || "—"}`,
      `Email: ${email.trim() || "—"}`,
      `About: ${interestLabel}`,
      "",
      message.trim(),
      needsAck
        ? "\nI understand pickup is in person in Indianapolis, with a photo ID, ATF Form 4473, and a passed background check."
        : "",
    ]
      .filter((line) => line !== "")
      .join("\n");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setCopied(false);
    if (Object.keys(next).length > 0) {
      setSummary(null);
      return;
    }
    setSummary(buildSummary());
  }

  async function copySummary() {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const smsHref = summary
    ? `sms:${shop.phoneTel}?&body=${encodeURIComponent(summary.slice(0, 320))}`
    : `sms:${shop.phoneTel}`;

  if (summary) {
    return (
      <div className="border border-border bg-card p-6">
        <p className="text-xs tracking-[0.18em] text-primary uppercase">Ready to send</p>
        <h2 className="mt-2 font-heading text-3xl">Your note is on this page, not in an inbox.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This preview does not email the shop or take a payment. Call, text, or copy the
          note and send it yourself. The phone number is {shop.phoneDisplay}.
        </p>
        <pre className="mt-5 max-h-72 overflow-auto border border-border bg-background p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {summary}
        </pre>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button className="h-11 px-4" render={<a href={`tel:${shop.phoneTel}`} />}>
            Call the shop
          </Button>
          <Button variant="outline" className="h-11 px-4" render={<a href={smsHref} />}>
            Text this note
          </Button>
          <Button variant="secondary" className="h-11 px-4" type="button" onClick={copySummary}>
            {copied ? "Copied" : "Copy note"}
          </Button>
        </div>
        <button
          type="button"
          className="mt-5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          onClick={() => setSummary(null)}
        >
          Edit the note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            aria-invalid={Boolean(errors.name)}
            className="h-11"
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            aria-invalid={Boolean(errors.reach)}
            className="h-11"
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          aria-invalid={Boolean(errors.reach)}
          className="h-11"
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.reach ? <p className="text-sm text-destructive">{errors.reach}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="interest">What is this about?</Label>
        <select
          id="interest"
          name="interest"
          value={interest}
          onChange={(event) => {
            setInterest(event.target.value);
            setAck(false);
          }}
          className="h-11 w-full rounded-sm border border-input bg-transparent px-3 text-sm"
        >
          {inquiryOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-card text-foreground">
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">The project</Label>
        <Textarea
          id="message"
          name="message"
          value={message}
          aria-invalid={Boolean(errors.message)}
          placeholder="Make, model, what you want changed, and whether you will drop it off or ship it."
          className="min-h-36"
          onChange={(event) => setMessage(event.target.value)}
        />
        {errors.message ? <p className="text-sm text-destructive">{errors.message}</p> : null}
      </div>
      {needsAck ? (
        <div className="grid gap-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed" htmlFor="ack">
            <input
              id="ack"
              type="checkbox"
              checked={ack}
              className="mt-1 size-4 accent-primary"
              onChange={(event) => setAck(event.target.checked)}
            />
            <span>
              I understand this firearm is picked up in Indianapolis by the buyer, with a valid
              photo ID, ATF Form 4473, and a passed background check. This form does not complete
              a sale.
            </span>
          </label>
          {errors.ack ? <p className="text-sm text-destructive">{errors.ack}</p> : null}
        </div>
      ) : null}
      <Button type="submit" className="h-11 px-5">
        Prepare the note
      </Button>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Nothing is charged here. Deposits and firearm paperwork happen with the shop directly.
      </p>
    </form>
  );
}
