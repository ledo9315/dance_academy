import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="mb-12 flex w-full max-w-[800px] flex-col items-center sm:mb-16">
      <SectionHeading title="Ready to Dance with Us?" headingClassName="font-light" />

      <p className="mb-6 max-w-[680px] px-4 text-center font-sans text-sm leading-relaxed text-text sm:mb-8 sm:px-0 sm:text-base">
        Join Angela&apos;s Dance Academy and discover ballet, jazz, contemporary, and more in a
        friendly, professional environment.
      </p>

      <div className="flex w-full items-center justify-center px-4 sm:w-auto sm:px-0">
        <Button asChild variant="outline" size="full">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>

      <p className="mt-6 text-center sm:mt-8">
        <a
          href={`tel:${site.phone.e164}`}
          className="font-sans text-sm text-accent transition-colors hover:text-accent-dark"
        >
          Or call us: {site.phone.display}
        </a>
      </p>
    </section>
  );
}
