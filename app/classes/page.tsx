"use client";

import CTASection from "@/components/CTA";
import { Hero } from "@/components/Hero";
import LinkComponent from "@/components/ui/link";
import { Phone, Star } from "lucide-react";
import Image from "next/image";
import Script from "next/script";

const Page = () => {
  interface AgesCard {
    ageRange: string;
    title: string;
    description: string;
    skills: string[];
    imgSrc: string;
  }

  const ageCards: AgesCard[] = [
    {
      ageRange: "AGES 3-5",
      title: "Pre-Dance Program",
      description:
        "Our foundational program helps preschoolers develop a love for dance through fun, age-appropriate activities. Students learn essential classroom skills while exploring movement, rhythm, and creativity in a nurturing environment.",
      skills: [
        "Basic movement skills",
        "Listening and following directions",
        "Social interaction",
        "Creative expression",
      ],
      imgSrc: "/item1.jpg",
    },
    {
      ageRange: "AGES 6-18",
      title: "Fundamentals Program",
      description:
        "New students learn the fundamentals of Jazz, Hip Hop, Contemporary, and Ballet through structured, progressive curricula. Our age-appropriate programs focus on establishing a strong technical foundation while keeping classes engaging and fun.",
      skills: [
        "Multi-style training",
        "Progressive skill building",
        "Age-appropriate choreography",
        "Performance opportunities",
      ],
      imgSrc: "/item2.jpg",
    },
    {
      ageRange: "Competitive",
      title: "Competition Team",
      description:
        "Our elite program for dedicated dancers progressing from late beginner through advanced levels. Students develop exceptional technique and artistry while competing at regional and national competitions, building discipline and performance excellence.",
      skills: [
        "Advanced technique training",
        "Competition travel opportunities",
        "Solo and group performances",
        "Teamwork and collaboration",
      ],
      imgSrc: "/classes-3.jpg",
    },
    {
      ageRange: "All Ages",
      title: "Learning in Movement",
      description:
        "Our innovative approach combines dance with educational development. Through movement, students enhance teamwork, focus, and improvisational skills while developing new perceptions that support learning and creative thinking.",
      skills: [
        "Educational integration",
        "Teamwork development",
        "Improvisational skills",
        "Creative thinking",
      ],
      imgSrc: "/item4.jpg",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dance Classes and Programs",
    description:
      "Comprehensive dance programs for all ages at Angela's Dance Academy",
    itemListElement: ageCards.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: card.title,
        description: card.description,
        provider: {
          "@type": "DanceSchool",
          name: "Angela's Dance Academy",
        },
        areaServed: {
          "@type": "City",
          name: "Naples, Florida",
        },
      },
    })),
  };

  return (
    <>
      <Script
        id="classes-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container">
        <Hero className="mb-24 px-4 md:px-0" title="Classes" imgSrc="/17.jpg" />
        <section className="max-w-3xl mx-auto mb-16 sm:mb-24 px-4 sm:px-0">
          <h2 className="text-center text-2xl sm:text-3xl mb-4 sm:mb-6">
            Dance Programs for Every Age
          </h2>
          <div className="border border-accent w-15 mx-auto mb-6 sm:mb-8" />
          <p className="text-center text-text text-sm sm:text-base font-sans">
            From our youngest dancers to advanced competitors, Angela's Dance
            Academy offers comprehensive programs designed to nurture talent,
            build confidence, and foster a lifelong love of dance.
          </p>
        </section>
        <section className="border-b border-border">
          <h2 className="sr-only">Dance Programs for Every Age</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-24 px-4 sm:px-0">
            {ageCards.map((card, index) => (
              <article key={index}>
                <div className="border-2 border-border">
                  <Image
                    src={card.imgSrc}
                    alt={`${card.title} - ${card.ageRange} dance program`}
                    width={1000}
                    height={400}
                    className="w-full h-64 sm:h-80 lg:h-100 object-cover"
                  />
                  <div className="flex flex-col p-6 sm:p-8 lg:p-12 pb-12 sm:pb-16">
                    <div className="bg-accent/10 border-2 border-accent w-fit py-1 px-2 mb-6">
                      <span className="text-accent text-xs whitespace-nowrap font-sans">
                        {card.ageRange}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl mb-4 sm:mb-6">
                      {card.title}
                    </h3>
                    <p className="text-text text-xs sm:text-sm font-sans mb-6 sm:mb-7">
                      {card.description}
                    </p>
                    <ul className="flex flex-col gap-y-4 text-text text-sm font-sans">
                      {card.skills.map((skill, index) => (
                        <li key={index} className="flex items-center gap-x-2">
                          <Star
                            width={16}
                            height={16}
                            className="text-accent"
                          />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
