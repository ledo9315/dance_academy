import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { getAlbumWithPhotos } from "@/lib/queries/albums";

type AlbumPageProps = {
  params: Promise<{ albumId: string }>;
};

export const revalidate = 3600;

async function loadAlbum(albumId: string) {
  const id = Number(albumId);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const album = await getAlbumWithPhotos(id);

  if (!album) {
    notFound();
  }

  return album;
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const { albumId } = await params;
  const album = await loadAlbum(albumId);

  return {
    title: album.title,
    description: `Photos from ${album.title} at Angela's Dance Academy in Naples, FL.`,
    alternates: { canonical: `/album/${album.id}` },
    openGraph: { images: [{ url: album.coverImage, alt: album.title }] },
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = await params;
  const album = await loadAlbum(albumId);

  return (
    <main className="container mx-auto py-8">
      <Breadcrumbs
        className="mb-12"
        items={[{ label: "Gallery", href: "/album" }, { label: album.title }]}
      />

      <h1 className="sr-only">{album.title}</h1>

      <section aria-label="Photos" className="mb-30 px-4">
        {album.photos.length === 0 ? (
          <p className="text-center text-text">This album has no photos yet.</p>
        ) : (
          <ul className="mb-8 grid grid-cols-1 gap-2 sm:mb-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {album.photos.map((photo) => (
              <li
                key={photo.id}
                className="group relative aspect-[3/2] w-full overflow-hidden focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
              >
                <Image
                  src={photo.url}
                  alt={photo.filename}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-accent/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Link
                  href={`/album/${album.id}/${photo.id}`}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-y-1 font-sans text-sm text-white uppercase opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                >
                  <Eye width={25} height={25} aria-hidden />
                  View image
                </Link>
              </li>
            ))}
          </ul>
        )}

        <footer className="mt-4 flex flex-col items-start justify-between gap-4 font-sans text-gray-500 md:flex-row md:items-center md:gap-0">
          <Button asChild variant="outline">
            <Link href="/album">
              <ArrowLeft width={16} height={16} aria-hidden />
              Back to Gallery
            </Link>
          </Button>
          <span className="text-sm">
            {album.photos.length} {album.photos.length === 1 ? "image" : "images"} in this album
          </span>
        </footer>
      </section>
    </main>
  );
}
