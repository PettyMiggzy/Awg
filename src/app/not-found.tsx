import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="px-6 py-24 lg:px-12">
      <p className="text-xs tracking-[0.22em] text-primary uppercase">Missing page</p>
      <h1 className="mt-4 font-heading text-5xl">That page is not on the bench.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link does not match a service, a firearm, or a page on this site.
      </p>
      <Link href="/" className={cn(buttonVariants({}), "mt-8 h-11 rounded-sm px-5")}>
        Back to the shop
      </Link>
    </section>
  );
}
