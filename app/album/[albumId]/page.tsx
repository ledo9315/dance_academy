"use client";

import LinkComponent from "@/components/ui/link";
import { ArrowLeft, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Album {
  id: number;
  title: string;
}

interface Photo {
  id: number;
  path: string;
  filename: string;
}

const AlbumPage = ({ params }: { params: { albumId: string } }) => {
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch album details
        const albumRes = await fetch(`/api/albums/${params.albumId}`);
        if (!albumRes.ok) {
          setError("Album not found");
          return;
        }
        const { album: albumData } = await albumRes.json();

        // Fetch album photos
        const photosRes = await fetch(`/api/albums/${params.albumId}/photos`);
        if (!photosRes.ok) {
          setError("Error loading photos");
          return;
        }
        const { photos: photosData } = await photosRes.json();

        setAlbum(albumData);
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load album data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.albumId]);

  if (isLoading) {
    return (
      <main className="container">
        <div className="flex justify-center items-center py-12">
          <p className="text-text">Loading album...</p>
        </div>
      </main>
    );
  }

  if (error || !album) {
    return (
      <main className="container">
        <div className="flex justify-center items-center py-12">
          <p className="text-text">{error || "Album not found"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <nav className="mb-8 sm:mb-12 px-4 sm:px-0" aria-label="Breadcrumb">
        <ol className="flex space-x-1 font-sans text-sm" role="list">
          <li>
            <Link className="text-accent" href="/album">
              Gallery
            </Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">
            /
          </li>
          <li aria-current="page" className="truncate">
            {album.title}
          </li>
        </ol>
      </nav>

      <header className="relative mb-12 sm:mb-16 px-4 sm:px-0">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl before:content-[''] before:absolute before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:h-0.5 before:w-12 before:bg-accent ">
          {album.title}
        </h1>
      </header>

      <section className="mb-30 px-4" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">
          Image Gallery
        </h2>
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-10"
          role="list"
        >
          {photos.map((image: any) => (
            <li
              key={image.id}
              className="aspect-[3/2] w-full overflow-hidden focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 relative group"
            >
              <Image
                src={image.path}
                alt={image.filename}
                className="h-full w-full object-cover"
                width={300}
                height={200}
              />
              <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Link
                href={`/album/${params.albumId}/${image.id}`}
                className="absolute inset-0 flex flex-col items-center justify-center gap-y-1 text-white text-sm font-sans opacity-0 group-hover:opacity-100 transition-opacity z-30 uppercase"
              >
                <Eye width={25} height={25} />
                View Image
              </Link>
            </li>
          ))}
        </ul>
        <footer className="flex flex-col md:flex-row items-start sm:items-center justify-between text-gray-500 font-sans mt-4 gap-4 md:gap-0">
          <LinkComponent href="/album" variant="outline-button">
            <ArrowLeft width={16} height={16} className="mr-1" />
            Back to Gallery
          </LinkComponent>
          <span aria-live="polite" className="text-sm">
            {photos.length} images in this album
          </span>
        </footer>
      </section>
    </main>
  );
};

export default AlbumPage;
