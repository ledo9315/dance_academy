import { ChevronRight, Star } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AGGREGATE_RATING, TESTIMONIALS } from "@/content/testimonials";
import { site } from "@/lib/site";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, index) => (
        <Star key={index} aria-hidden className={className} />
      ))}
    </span>
  );
}

export function TestimonialsSection() {
  // The marquee renders the list twice so the CSS animation can loop seamlessly.
  const marquee = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="mb-12 flex w-full max-w-[800px] flex-col items-center sm:mb-16">
      <div className="mb-10 text-center sm:mb-14">
        <p className="mb-4 flex items-center justify-center gap-2">
          <Stars count={5} className="h-4 w-4 fill-accent text-accent" />
          <a
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-text transition-colors duration-200 hover:text-accent"
          >
            Google rating: {AGGREGATE_RATING.value} stars from {AGGREGATE_RATING.count}+ reviews
          </a>
        </p>

        <SectionHeading
          title="What Our Customers Say"
          description="Join a community of dancers, from beginners to Broadway dreamers"
        />

        <a
          href={site.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-sans text-sm text-accent transition-colors duration-200 hover:text-accent-dark"
        >
          View all testimonials
          <ChevronRight className="h-4 w-4" aria-hidden />
        </a>
      </div>

      <div className="relative w-full overflow-hidden">
        <ul className="animate-scroll flex gap-4">
          {marquee.map((testimonial, index) => (
            <li key={`${testimonial.id}-${index}`} aria-hidden={index >= TESTIMONIALS.length}>
              <Card className="w-80 shrink-0 rounded-lg border border-border bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
                <div className="mb-4 flex items-start gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={testimonial.avatar} alt="" />
                    <AvatarFallback className="bg-accent-bg text-xs font-medium text-accent">
                      {initials(testimonial.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="font-sans text-xs text-text">{testimonial.role}</p>
                  </div>

                  <Stars count={testimonial.rating} className="h-3 w-3 fill-accent text-accent" />
                </div>

                <blockquote className="line-clamp-3 font-sans text-xs leading-relaxed text-text sm:text-sm">
                  “{testimonial.content}”
                </blockquote>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
