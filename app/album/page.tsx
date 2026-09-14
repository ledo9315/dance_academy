import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { listAlbums } from "@/lib/queries/albums";

export const metadata: Metadata = {
  title: "Gallery – Dance Classes for Kids & Teens 3–18",
  description:
    "Explore our gallery of performances, competitions, and studio moments from Angela's Dance Academy. See kids & teens (ages 3–18) in action.",
  alternates: { canonical: "/album" },
  openGraph: {
    title: "Gallery – Angela's Dance Academy Naples, FL | Kids & Teens 3–18",
    description: "Photos from our dance classes and events featuring kids and teens ages 3–18.",
    images: [
      {
        url: "/gallery-background.jpg",
        width: 1200,
        height: 630,
        alt: "Dance gallery – Angela's Dance Academy",
      },
    ],
  },
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const albums = await listAlbums();

  return (
    <main className="container">
      <PageHero
        title="Gallery"
        imageSrc="/gallery-background.jpg"
        imageAlt="Dancers performing on stage"
        className="mb-24"
      />

      <SectionHeading title="Dance Memories" className="mx-auto mb-16 max-w-3xl px-4 sm:mb-24">
        <p className="text-center font-sans text-sm text-text sm:text-base">
          Explore our collection of performances, competitions, studio moments, and special events
          from Angela&apos;s Dance Academy.
        </p>
      </SectionHeading>

      <section aria-labelledby="gallery" className="mb-30 px-4 font-sans">
        <h2 id="gallery" className="sr-only">
          Gallery Overview
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-12">
          {albums.map((album) => (
            <li key={album.id} className="flex flex-col items-center">
              <Link href={`/album/${album.id}`} className="block aspect-[4/3] w-full">
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  width={290}
                  height={220}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover"
                />
              </Link>
              <span
                className="mt-2 w-full truncate text-center font-sans text-sm text-gray-700"
                title={album.title}
              >
                {album.title}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
