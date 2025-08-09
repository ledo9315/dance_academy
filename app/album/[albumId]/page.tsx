"use client";

import { Album } from "@/types";
import { getImageSource } from "@/lib/utils";
import { ArrowLeft, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { useEffect, useState } from "react";
import LinkComponent from "@/components/ui/link";

const AlbumPage = ({ params }: { params: Promise<{ albumId: string }> }) => {
  const { albumId } = use(params);
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/albums/${albumId}`);
        const { album } = await res.json();

        const photosRes = await fetch(`/api/albums/${albumId}/photos`);
        const { photos } = await photosRes.json();

        setAlbum(album);
        setPhotos(photos);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  if (isLoading) {
    return (
      <main className="container mx-auto py-8">
        <div className="flex justify-center items-center py-12">
          <p className="text-text">Loading album...</p>
        </div>
      </main>
    );
  }

  if (!album) {
    return (
      <main className="container mx-auto py-8">
        <div className="flex justify-center items-center py-12">
          <p className="text-text">Album not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <nav className="mb-12" aria-label="Breadcrumb">
        <ol className="flex space-x-1 font-sans text-sm" role="list">
          <li>
            <Link className="text-accent" href="/album">
              Gallery
            </Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">
            /
          </li>
          <li aria-current="page">{album.title}</li>
        </ol>
      </nav>
      <header className="mb-12">
        <h1 className="sr-only">{album.title}</h1>
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
                src={getImageSource(image.path)}
                alt={image.filename}
                className="h-full w-full object-cover"
                width={300}
                height={200}
                unoptimized={image.path.startsWith("data:")}
              />
              <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Link
                href={`/album/${albumId}/${image.id}`}
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
