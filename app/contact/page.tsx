import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { MapEmbed } from "@/components/map-embed";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us – Dance Classes & Enrollment",
  description: `Contact ${site.name} in Naples, Florida for dance class information, enrollment, and studio visits. Located at ${site.address.street}. Call ${site.phone.display}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact Us – ${site.name} Naples, Florida`,
    description: `Contact ${site.name} for dance class information and enrollment.`,
  },
};

const contactPage = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  description: `Contact information and inquiry form for ${site.name} in Naples, Florida`,
  mainEntity: { "@id": `${site.url}/#dance-school` },
};

export default function ContactPage() {
  return (
    <>
      <StructuredData data={contactPage} />

      <main className="container min-h-screen">
        <PageHero
          title="Contact"
          imageSrc="/contact-img.jpg"
          imageAlt="Dancers at Angela's Dance Academy"
          className="mb-24"
        />

        <SectionHeading
          title="Send Us a Message"
          description="Have questions about our classes or want to visit our studio? Fill out the form below and we'll get back to you soon."
          className="mx-auto mb-16 max-w-3xl px-4 sm:mb-24 sm:px-0"
        />

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <section aria-label="Contact form" className="mb-24 sm:mb-48">
            <ContactForm />
          </section>

          <section aria-labelledby="find-us" className="mb-16">
            <h2 id="find-us" className="mb-8 text-center text-2xl font-light text-gray-800">
              Find Us
            </h2>
            <MapEmbed />
          </section>
        </div>
      </main>
    </>
  );
}
