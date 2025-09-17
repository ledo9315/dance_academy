"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import Script from "next/script";
import { TestimonialSection } from "@/components/Testimonial";
import { CTASection } from "@/components/CTA";
import { Faq } from "@/components/FAQ";

const Page = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(true);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["DanceSchool", "LocalBusiness"],
    "@id": "https://angelasdanceacademy.com/#dance-school",
    name: "Angela's Dance Academy",
    description:
      "Premier dance academy in Naples, Florida offering ballet, jazz, contemporary, and more. Professional dance instruction for all ages and skill levels.",
    url: "https://angelasdanceacademy.com",
    telephone: "+1-239-215-2888",
    email: "info@angelasdanceacademy.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "12840 Tamiami Trail North Suite 300",
      addressLocality: "Naples",
      addressRegion: "FL",
      postalCode: "34110",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.2882,
      longitude: -81.8019,
    },
    openingHours: "Mo-Fr 16:00-20:00",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dance Classes",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ballet Classes",
            description: "Professional ballet instruction for all ages",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jazz Dance Classes",
            description: "Contemporary jazz dance instruction",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Contemporary Dance Classes",
            description: "Modern contemporary dance training",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "28",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/angelasdanceacademy",
      "https://www.instagram.com/angelasdanceacademy",
    ],
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="flex-1 flex flex-col items-center justify-center gap-y-6 pt-6 sm:pt-10 px-4 sm:px-6">
        <h1 className="sr-only">
          Angela's Dance Academy | Premier Dance School Naples, FL -
          Professional Dance Classes & Private Lessons
        </h1>
        <section className="w-full max-w-[800px] flex flex-col items-center mb-12 sm:mb-16">
          <figure className="mb-12 sm:mb-16">
            <Image
              src="/home_hero.jpg"
              alt="In a bright dance studio with smooth white floors and light gray walls, six young dancers from Angela’s Dance Academy are captured mid-pose. Three dancers sit on the floor in front, each in a split position with one arm raised gracefully upward. Behind them, three more dancers stand in a line, each balancing on one leg while lifting the other leg high into the air in an elegant extension. All of the dancers are dressed in matching black leotards and beige dance shoes, emphasizing uniformity and focus. On the back wall, the teal-colored logo of Angela’s Dance Academy is prominently displayed, adding identity to the space. The atmosphere of the image conveys discipline, creativity, and pride in the dancers’ training."
              width={800}
              height={530}
              className="w-full h-auto"
            />
          </figure>

          <header className="text-center">
            <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6">
              About Our Dance Studio
            </h2>
            <div className="border border-accent w-15 mx-auto mb-6 sm:mb-8" />
          </header>

          <article className="text-center text-text space-y-6 sm:space-y-10 font-sans px-4 sm:px-0">
            <p className="text-sm sm:text-base leading-relaxed">
              For over 20 years, Angela's Dance Academy in Naples, FL has
              offered professional dance classes for kids and teens ages 3–18.
              Our programs include Ballet, Jazz, Hip Hop, Lyrical, Contemporary,
              and Technique classes, along with stretching and conditioning, to
              help young dancers develop skills, confidence, and creativity.
            </p>

            <p className="text-sm sm:text-base leading-relaxed">
              Our students are able to showcase their hard work in many ways
              throughout the year. We compete in dance competitions, participate
              in various dance performances within our community and of course
              our Annual Dance Show. Along with all of our performances come our
              very original dance costumes. All of our costumes are custom made
              and designed to complement each dance specifically. Each and every
              one of the costumes are hand made personally by our Director,
              Angela Kirshon. Angela combines the vision of the dance, the music
              along with the choreography to create a beautiful final product.
            </p>
          </article>
        </section>

        <section className="mb-12 sm:mb-16 w-full max-w-[800px] px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-light text-center mb-10 sm:mb-14">
            See Our Dance School in Action
          </h2>

          <div className="relative mb-12 sm:mb-16">
            {/* Fallback for no JavaScript */}
            <div className="bg-gray-50 p-4 sm:p-8 text-center aspect-video flex flex-col items-center justify-center">
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col items-center space-y-2 sm:space-y-4">
                  <Play
                    width={40}
                    height={40}
                    className="sm:w-[60px] sm:h-[60px] text-accent"
                  />
                  <h3 className="text-lg sm:text-xl text-gray-800 mb-2 sm:mb-4">
                    Watch Our Premier Dance Studio Video
                  </h3>
                </div>
                <div className="text-text font-sans mb-4 sm:mb-6">
                  <p className="text-gray-600 text-sm sm:text-base">
                    Experience the energy and passion of our Naples dance studio
                    where students discover the joy of dance
                  </p>
                </div>
              </div>

              <a
                href="https://www.youtube.com/watch?v=zKYBXGQuFpA"
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent text-white text-xs sm:text-sm font-sans hover:bg-accent-dark transition-colors active:translate-y-0.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink
                  width={16}
                  height={16}
                  className="sm:w-5 sm:h-5 mr-2"
                />
                Watch on YouTube
              </a>
            </div>

            {/* YouTube Video - only shown when JavaScript is enabled */}
            {showVideo && (
              <iframe
                title="Angela's Dance Academy Video"
                width="800"
                height="450"
                loading="lazy"
                src="https://www.youtube.com/embed/zKYBXGQuFpA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full aspect-video flex md:absolute top-0 left-0"
              ></iframe>
            )}
          </div>
        </section>

        <TestimonialSection />
        <Faq />
        <CTASection />
      </main>
    </>
  );
};

export default Page;
