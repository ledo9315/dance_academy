import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { getAlbum, getPhoto } from "@/lib/queries/albums";

type PhotoPageProps = {
  params: Promise<{ albumId: string; imageId: string }>;
};

async function loadPhoto(albumId: string, imageId: string) {
  const albumIdNumber = Number(albumId);
  const photoId = Number(imageId);

  if (!Number.isInteger(albumIdNumber) || !Number.isInteger(photoId)) {
    notFound();
  }

  const [album, photo] = await Promise.all([
    getAlbum(albumIdNumber),
    getPhoto(albumIdNumber, photoId),
  ]);

  if (!album || !photo) {
    notFound();
  }

  return { album, photo };
}

export async function generateMetadata({ params }: PhotoPageProps): Promise<Metadata> {
  const { albumId, imageId } = await params;
  const { album, photo } = await loadPhoto(albumId, imageId);

  return {
    title: `${photo.filename} – ${album.title}`,
    alternates: { canonical: `/album/${album.id}/${photo.id}` },
    openGraph: { images: [{ url: photo.url, alt: photo.filename }] },
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { albumId, imageId } = await params;
  const { album, photo } = await loadPhoto(albumId, imageId);

  return (
    <main className="container mx-auto py-8">
      <Breadcrumbs
        className="mb-12"
        items={[
          { label: "Gallery", href: "/album" },
          { label: album.title, href: `/album/${album.id}` },
          { label: photo.filename },
        ]}
      />

      <article className="mx-auto mb-20 max-w-4xl">
        <h1 className="mb-4 text-2xl font-bold">{photo.filename}</h1>
        <Image
          src={photo.url}
          alt={photo.filename}
          width={1200}
          height={800}
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
          className="h-auto w-full"
        />
      </article>
    </main>
  );
}
