import { GALERY_IMAGES } from "@/data/gallery-images";
import Image from "next/image";
import { use } from "react";
import Link from "next/link";

const ImagePage = async ({
  params,
}: {
  params: Promise<{ albumId: string; imageId: string }>;
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const { albumId, imageId } = await params;

  const resAlbum = await fetch(`${BASE_URL}/api/albums/${albumId}`);
  const albumData = await resAlbum.json();

  console.log(albumData.album.title);

  if (!albumData) {
    return <p>Album not found</p>;
  }

  const res = await fetch(
    `${BASE_URL}/api/albums/${albumId}/photos/${imageId}`
  );

  if (!res.ok) {
    return <p>Error loading image</p>;
  }

  const data = await res.json();
  const { photo } = data;

  if (!photo) {
    return <p>Image not found</p>;
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
          <li className="text-accent" aria-current="page">
            <Link href={`/album/${albumId}`}>{albumData.album.title}</Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">
            /
          </li>
          <li aria-current="page">{photo.filename}</li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto mb-20">
        <h1 className="text-2xl font-bold mb-4">{photo.filename}</h1>
        <div className="relative">
          <Image
            src={photo.path}
            alt={photo.filename}
            width={1200}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </main>
  );
};

export default ImagePage;
