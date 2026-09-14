import Image from "next/image";

import { CtaSection } from "@/components/cta-section";
import { FaqSection } from "@/components/faq-section";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { TestimonialsSection } from "@/components/testimonials-section";
import { YouTubeEmbed } from "@/components/youtube-embed";
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

          <SectionHeading title="About Our Dance Studio" />

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
          <YouTubeEmbed videoId={site.youtubeVideoId} title={`${site.name} studio video`} />
        </section>

        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}
