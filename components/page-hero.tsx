import Image from "next/image";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

/** Full width banner that carries the page's main heading. */
export function PageHero({ title, imageSrc, imageAlt, className }: PageHeroProps) {
  return (
    <section className={cn("relative h-64 w-full sm:h-80 lg:h-100", className)}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 1100px) 100vw, 1100px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-3 sm:gap-y-5">
        <h1 className="z-10 px-4 text-center text-2xl text-white uppercase sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        <div className="z-10 w-12 border-[1.5px] border-accent sm:w-15" />
      </div>
    </section>
  );
}
