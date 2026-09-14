import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  /** Heading level, so each section fits the page's document outline. */
  as?: "h2" | "h3";
  /** Wrapper classes; the element is a `<header>`. */
  className?: string;
  /** Extra heading classes — some sections render the title in `font-light`. */
  headingClassName?: string;
  /** Optional description paragraph rendered below the accent rule. */
  children?: ReactNode;
};

/** Section title with the studio's accent rule underneath. */
export function SectionHeading({
  title,
  as: Heading = "h2",
  className,
  headingClassName,
  children,
}: SectionHeadingProps) {
  return (
    <header className={cn("text-center", className)}>
      <Heading className={cn("mb-4 text-2xl sm:mb-6 sm:text-3xl", headingClassName)}>
        {title}
      </Heading>
      <div className="mx-auto mb-6 w-15 border border-accent sm:mb-8" />
      {children}
    </header>
  );
}
