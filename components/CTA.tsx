import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export function CTASection({ className }: Props) {
  return (
    <section
      className={`w-full max-w-[800px] flex flex-col items-center mb-12 sm:mb-16 ${
        className ?? ""
      }`}
    >
      <header className="text-center">
        <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6">
          Ready to Dance with Us?
        </h2>
        <div className="border border-accent w-15 mx-auto mb-6 sm:mb-8" />
      </header>

      <p className="text-center text-text text-sm sm:text-base font-sans max-w-[680px] px-4 sm:px-0 mb-6 sm:mb-8 leading-relaxed">
        Join Angela&apos;s Dance Academy and discover ballet, jazz,
        contemporary, and more in a friendly, professional environment.
      </p>

      <div className="flex items-center justify-center w-full sm:w-auto px-4 sm:px-0">
        <Link href="/contact" className="w-full sm:w-auto">
          <Button variant="outline" size="full">
            Contact Us
          </Button>
        </Link>
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <a
          href="tel:+12392152888"
          className="font-sans text-sm text-accent hover:text-accent-dark transition-colors"
          aria-label="Call Angela's Dance Academy at 239-215-2888"
        >
          Or call us: 239.215.2888
        </a>
      </div>
    </section>
  );
}

export default CTASection;
