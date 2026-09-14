"use client";

import { MapPin, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";

import { site } from "@/lib/site";

const directionsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.address.street} ${site.address.locality} ${site.address.region} ${site.address.postalCode}`,
)}`;

/**
 * Loads the Google Maps iframe only on request, so the map's cookies and
 * scripts are never set for visitors who do not ask for it.
 */
export function MapEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        title={`${site.name} location`}
        src={site.googleMapsEmbedUrl}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="mt-8 h-96 w-full border-0"
      />
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 p-8 text-center">
      <MapPin width={40} height={40} className="text-accent" aria-hidden />
      <h3 className="mt-2 mb-4 text-xl text-gray-800">Our Location</h3>

      <address className="font-sans text-text not-italic">
        <span className="block font-medium text-black">{site.name}</span>
        <a href={`tel:${site.phone.e164}`} className="block transition-colors hover:text-accent">
          {site.phone.display}
        </a>
        <span className="block">{site.address.street}</span>
        <span className="block">
          {site.address.locality}, {site.address.region} {site.address.postalCode}
        </span>
      </address>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          className="flex cursor-pointer items-center justify-center bg-accent px-6 py-3 font-sans text-sm text-white transition-all duration-300 hover:bg-accent-dark active:translate-y-0.5"
        >
          <MapPin width={20} height={20} className="mr-2" aria-hidden />
          Show map
        </button>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center font-sans text-sm text-accent transition-colors hover:text-accent-dark"
        >
          <SquareArrowOutUpRight width={20} height={20} className="mr-2" aria-hidden />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
