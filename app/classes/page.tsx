import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { PROGRAMS } from "@/content/programs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dance Classes for Kids & Teens 3–18 – Programs",
  description:
    "Dance classes for kids & teens ages 3–18 in Naples, FL. Ballet, Jazz, Hip Hop, Contemporary, Technique. Professional instructors and supportive programs.",
  alternates: { canonical: "/classes" },
  openGraph: {
    title: "Dance Classes (Ages 3–18) – Angela's Dance Academy Naples, Florida",
    description:
      "Programs for kids & teens ages 3–18: Ballet, Jazz, Hip Hop, Contemporary, Technique.",
    images: ["/classes-3.jpg"],
  },
};

const programList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dance Classes and Programs",
  description: `Comprehensive dance programs for all ages at ${site.name}`,
  itemListElement: PROGRAMS.map((program, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: program.title,
      description: program.description,
      provider: { "@type": "DanceSchool", name: site.name },
      areaServed: { "@type": "City", name: "Naples, Florida" },
    },
  })),
};

export default function ClassesPage() {
  return (
    <>
      <StructuredData data={programList} />

      <main className="container">
        <PageHero
          title="Classes"
          imageSrc="/17.jpg"
          imageAlt="Dancers rehearsing in the studio"
          className="mb-24"
        />

        <SectionHeading
          title="Dance Programs for Every Age"
          description="From our youngest dancers to advanced competitors, Angela's Dance Academy offers comprehensive programs designed to nurture talent, build confidence, and foster a lifelong love of dance."
          className="mx-auto mb-16 max-w-3xl px-4 sm:mb-24 sm:px-0"
        />

        <section aria-label="Programs" className="border-b border-border">
          <ul className="mb-16 grid grid-cols-1 gap-8 px-4 sm:gap-12 sm:px-0 lg:grid-cols-2 xl:mb-24">
            {PROGRAMS.map((program) => (
              <li key={program.id} className="border-2 border-border">
                <Image
                  src={program.imageSrc}
                  alt={`${program.title} – ${program.ageRange} dance program`}
                  width={1000}
                  height={400}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-64 w-full object-cover sm:h-80 lg:h-100"
                />
                <div className="flex flex-col p-6 pb-12 sm:p-8 sm:pb-16 lg:p-12">
                  <p className="mb-6 w-fit border-2 border-accent bg-accent/10 px-2 py-1">
                    <span className="font-sans text-xs whitespace-nowrap text-accent">
                      {program.ageRange}
                    </span>
                  </p>
                  <h2 className="mb-4 text-lg sm:mb-6 sm:text-xl">{program.title}</h2>
                  <p className="mb-6 font-sans text-xs text-text sm:mb-7 sm:text-sm">
                    {program.description}
                  </p>
                  <ul className="flex flex-col gap-y-4 font-sans text-sm text-text">
                    {program.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-x-2">
                        <Star width={16} height={16} className="shrink-0 text-accent" aria-hidden />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
