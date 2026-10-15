"use client";

import { Minus, Plus } from "lucide-react";
import { maxQty } from "@/lib/shop";

export function QtyStepper({
  value,
  onChange,
  max = maxQty,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  label: string;
}) {
  return (
    <div className="flex h-10 items-center border border-border" role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        aria-label="One fewer"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className="grid size-10 place-items-center text-muted-foreground hover:text-primary disabled:opacity-30"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="One more"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="grid size-10 place-items-center text-muted-foreground hover:text-primary disabled:opacity-30"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
