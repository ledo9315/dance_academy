import type { Metadata } from "next";

import { MapPin, SquareArrowOutUpRight } from "lucide-react";

import { ClientOnly } from "@/components/client-only";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/lib/site";

const directionsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.address.street} ${site.address.locality} ${site.address.region} ${site.address.postalCode}`,
)}`;

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
          className="mx-auto mb-16 max-w-3xl px-4 sm:mb-24 sm:px-0"
        >
          <p className="text-center font-sans text-sm text-text sm:text-base">
            Have questions about our classes or want to visit our studio? Fill out the form below
            and we&apos;ll get back to you soon.
          </p>
        </SectionHeading>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <section aria-label="Contact form" className="mb-24 sm:mb-48">
            <ContactForm />
          </section>

          <section aria-labelledby="find-us" className="mb-16">
            <h2 id="find-us" className="mb-8 text-center text-2xl font-light text-gray-800">
              Find Us
            </h2>

            <div className="relative">
              {/* Fallback for browsers without JavaScript */}
              <div className="flex flex-col items-center bg-gray-50 p-8 text-center">
                <div className="mb-6">
                  <div className="flex flex-col items-center space-y-2">
                    <MapPin width={40} height={40} className="text-accent" aria-hidden />
                    <h3 className="mb-4 text-xl text-gray-800">Our Location</h3>
                  </div>
                  <div className="font-sans text-text">
                    <p className="font-medium text-black">{site.name}</p>
                    <p>{site.phone.display}</p>
                    <p>{site.address.street}</p>
                    <p>
                      {site.address.locality}, {site.address.region} {site.address.postalCode}
                    </p>
                  </div>
                </div>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center bg-accent px-6 py-3 font-sans text-sm text-white transition-all duration-300 hover:bg-accent-dark active:translate-y-0.5 md:w-fit"
                >
                  <SquareArrowOutUpRight width={20} height={20} className="mr-2" aria-hidden />
                  Open in Google Maps
                </a>
              </div>

              <ClientOnly>
                <iframe
                  title={`${site.name} Location`}
                  loading="lazy"
                  src={site.googleMapsEmbedUrl}
                  className="mt-8 h-96 w-full border-0"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </ClientOnly>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
