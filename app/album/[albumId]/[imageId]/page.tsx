"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";

interface Album {
  id: number;
  title: string;
}

interface Photo {
  id: number;
  filename: string;
  path: string;
}

const ImagePage = ({
  params,
}: {
  params: Promise<{ albumId: string; imageId: string }>;
}) => {
  const { albumId, imageId } = use(params);
  const [album, setAlbum] = useState<Album | null>(null);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch album details
        const resAlbum = await fetch(`/api/albums/${albumId}`);
        if (!resAlbum.ok) {
          setError("Album not found");
          return;
        }
        const albumData = await resAlbum.json();

        // Fetch photo details
        const res = await fetch(`/api/albums/${albumId}/photos/${imageId}`);
        if (!res.ok) {
          setError("Error loading image");
          return;
        }
        const data = await res.json();

        setAlbum(albumData.album);
        setPhoto(data.photo);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albumId, imageId]);

  if (isLoading) {
    return (
      <main className="container mx-auto py-8">
        <div className="flex justify-center items-center py-12">
          <p className="text-text">Loading image...</p>
        </div>
      </main>
    );
  }

  if (error || !album || !photo) {
    return (
      <main className="container mx-auto py-8">
        <div className="flex justify-center items-center py-12">
          <p className="text-text">{error || "Image not found"}</p>
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
          <li className="text-accent" aria-current="page">
            <Link href={`/album/${albumId}`}>{album.title}</Link>
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
