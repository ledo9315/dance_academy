import { Hero } from "@/components/Hero";
import { Album } from "@/types";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const GalleryPage = async () => {
  const res = await fetch(`${BASE_URL}/api/albums`);
  const { allAlbums } = await res.json();

  const albums: Album[] = allAlbums.map((album: any) => ({
    id: album.id,
    title: album.title,
    coverImage: `${BASE_URL}${album.coverImage}`,
  }));

  return (
    <main className="container">
      <Hero
        imgSrc="/gallery-background.jpg"
        title="Gallery"
        className="mb-24 px-4 md:px-0"
      />
      <section className="max-w-3xl mx-auto mb-16 sm:mb-24 px-4">
        <h2 className="text-center text-2xl sm:text-3xl mb-4 sm:mb-6">
          Dance Memories
        </h2>
        <p className="text-center text-text text-sm sm:text-base font-sans">
          Explore our collection of performances, competitions, studio moments,
          and special events from Angela's Dance Academy.
        </p>
      </section>
      <section aria-labelledby="gallery" className="font-sans mb-30 px-4">
        <h2 id="gallery" className="sr-only">
          Gallery Overview
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-12">
          {albums.map((album) => (
            <li key={album.id} className="flex flex-col items-center">
              <Link
                href={`/album/${album.id}`}
                className="block w-full aspect-[4/3]"
              >
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  width={290}
                  height={220}
                  className="w-full h-full object-cover"
                  priority={false}
                />
              </Link>
              <span
                className="mt-2 text-center text-sm text-gray-700 font-sans truncate w-full"
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
};

export default GalleryPage;
