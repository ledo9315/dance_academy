import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  /** Heading level, so each section fits the page's document outline. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Centred heading with the studio's accent rule underneath. */
export function SectionHeading({
  title,
  description,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("text-center", className)}>
      <Heading className="mb-4 text-2xl font-light sm:mb-6 sm:text-3xl">{title}</Heading>
      <div className="mx-auto mb-6 w-15 border border-accent sm:mb-8" />
      {description ? (
        <p className="mx-auto max-w-[680px] font-sans text-sm leading-relaxed text-text sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
