import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";

import { CtaSection } from "@/components/cta-section";
import { FaqSection } from "@/components/faq-section";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ClientOnly } from "@/components/client-only";
import { FAQ_ITEMS } from "@/content/faq";
import { AGGREGATE_RATING } from "@/content/testimonials";
import { site } from "@/lib/site";

const HERO_ALT =
  "Six young dancers from Angela's Dance Academy posing in a bright studio: three in front in splits with one arm raised, three behind balancing on one leg with the other extended high, all in black leotards and beige dance shoes.";

const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DanceSchool",
      "@id": `${site.url}/#dance-school`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: AGGREGATE_RATING.value,
        reviewCount: AGGREGATE_RATING.count,
        bestRating: 5,
        worstRating: 1,
      },
      priceRange: "$$",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dance Classes",
        itemListElement: ["Ballet", "Jazz", "Hip Hop", "Contemporary"].map((style) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${style} Classes`,
            description: `${style} instruction for kids and teens ages 3–18.`,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={homeGraph} />

      <main className="flex flex-1 flex-col items-center justify-center gap-y-6 px-4 pt-6 sm:px-6 sm:pt-10">
        <h1 className="sr-only">
          Angela&apos;s Dance Academy – Premier Dance School in Naples, FL
        </h1>

        <section className="mb-12 flex w-full max-w-[800px] flex-col items-center sm:mb-16">
          <figure className="mb-12 sm:mb-16">
            <Image
              src="/home_hero.jpg"
              alt={HERO_ALT}
              width={800}
              height={530}
              priority
              sizes="(max-width: 800px) 100vw, 800px"
              className="h-auto w-full"
            />
          </figure>

          <SectionHeading title="About Our Dance Studio" headingClassName="font-light" />

          <div className="space-y-6 px-4 text-center font-sans text-text sm:space-y-10 sm:px-0">
            <p className="text-sm leading-relaxed sm:text-base">
              For over 20 years, Angela&apos;s Dance Academy in Naples, FL has offered professional
              dance classes for kids and teens ages 3–18. Our programs include Ballet, Jazz, Hip
              Hop, Lyrical, Contemporary, and Technique classes, along with stretching and
              conditioning, to help young dancers develop skills, confidence, and creativity.
            </p>
            <p className="text-sm leading-relaxed sm:text-base">
              Our students are able to showcase their hard work in many ways throughout the year. We
              compete in dance competitions, participate in various dance performances within our
              community and of course our Annual Dance Show. Along with all of our performances come
              our very original dance costumes. All of our costumes are custom made and designed to
              complement each dance specifically. Each and every one of the costumes are hand made
              personally by our Director, Angela Kirshon. Angela combines the vision of the dance,
              the music along with the choreography to create a beautiful final product.
            </p>
          </div>
        </section>

        <section className="mb-12 w-full max-w-[800px] px-4 sm:mb-16 sm:px-0">
          <h2 className="mb-10 text-center text-xl font-light sm:mb-14 sm:text-2xl">
            See Our Dance School in Action
          </h2>

          <div className="relative mb-12 sm:mb-16">
            {/* Fallback for browsers without JavaScript */}
            <div className="flex aspect-video flex-col items-center justify-center bg-gray-50 p-4 text-center sm:p-8">
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col items-center space-y-2 sm:space-y-4">
                  <Play
                    width={40}
                    height={40}
                    className="text-accent sm:h-[60px] sm:w-[60px]"
                    aria-hidden
                  />
                  <h3 className="mb-2 text-lg text-gray-800 sm:mb-4 sm:text-xl">
                    Watch Our Premier Dance Studio Video
                  </h3>
                </div>
                <div className="mb-4 font-sans text-text sm:mb-6">
                  <p className="text-sm text-gray-600 sm:text-base">
                    Experience the energy and passion of our Naples dance studio where students
                    discover the joy of dance
                  </p>
                </div>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${site.youtubeVideoId}`}
                className="inline-flex items-center bg-accent px-4 py-2 font-sans text-xs text-white transition-colors hover:bg-accent-dark active:translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink width={16} height={16} className="mr-2 sm:h-5 sm:w-5" aria-hidden />
                Watch on YouTube
              </a>
            </div>

            <ClientOnly>
              <iframe
                title={`${site.name} Video`}
                width="800"
                height="450"
                loading="lazy"
                src={`https://www.youtube.com/embed/${site.youtubeVideoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="top-0 left-0 flex aspect-video w-full md:absolute"
              />
            </ClientOnly>
          </div>
        </section>

        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}
