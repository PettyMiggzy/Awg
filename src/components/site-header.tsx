"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { shop, nav, addressLine } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-6 py-2 text-xs tracking-wide text-muted-foreground lg:px-12">
        <p className="truncate">{addressLine}</p>
        <a className="shrink-0 hover:text-primary" href={`tel:${shop.phoneTel}`}>
          {shop.phoneDisplay}
        </a>
      </div>
      <div className="flex items-center justify-between gap-6 px-6 py-3 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt=""
            width={48}
            height={77}
            className="h-14 w-auto"
          />
          <span className="sr-only">{shop.name}</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/90 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            className="hidden h-10 rounded-sm px-4 lg:inline-flex"
            render={<Link href="/contact" />}
          >
            Book a session
          </Button>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-background sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">
                  {shop.name}
                </SheetTitle>
                <SheetDescription>Indianapolis · Est. {shop.established}</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-4">
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className="border-b border-border py-4 font-heading text-3xl"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button className="h-11 w-full" render={<Link href="/contact" />}>
                  Book a session
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
