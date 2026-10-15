"use client";

import { useState } from "react";
import Link from "next/link";
import {
  priceLabel,
  serviceCategories,
  type Service,
  type ServiceCategory,
} from "@/lib/site";
import { Button } from "@/components/ui/button";

export function ServicesBrowser({ services }: { services: Service[] }) {
  const [category, setCategory] = useState<ServiceCategory | "All">("All");
  const shown =
    category === "All"
      ? services
      : services.filter((service) => service.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {serviceCategories.map((item) => {
          const active = item === category;
          return (
            <Button
              key={item}
              type="button"
              variant={active ? "default" : "outline"}
              className="h-9 rounded-sm px-3"
              aria-pressed={active}
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          );
        })}
      </div>
      {shown.length === 0 ? (
        <p className="mt-10 text-muted-foreground">
          Nothing in that group. Choose another filter.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {shown.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="grid gap-3 py-6 transition-colors hover:text-primary sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span>
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-heading text-3xl text-foreground">
                      {service.name}
                    </span>
                    {service.limited ? (
                      <span className="text-xs tracking-[0.16em] text-primary uppercase">
                        Limited turnaround
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </span>
                </span>
                <span className="font-heading text-2xl text-primary sm:text-right">
                  {priceLabel(service)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
