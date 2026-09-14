import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Image as ImageIcon, Upload } from "lucide-react";

import { DeletePhotoButton } from "@/components/admin/delete-photo-button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { getAlbumWithPhotos } from "@/lib/queries/albums";

type AlbumPhotosPageProps = {
  params: Promise<{ albumId: string }>;
};

export default async function AlbumPhotosPage({ params }: AlbumPhotosPageProps) {
  const { albumId } = await params;
  const id = Number(albumId);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const album = await getAlbumWithPhotos(id);

  if (!album) {
    notFound();
  }

  return (
    <main className="container px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        className="mb-6 px-4 sm:px-0"
        items={[{ label: "Album Management", href: "/admin/albums" }, { label: album.title }]}
      />

      <header className="mb-8 flex flex-col gap-4 px-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between sm:px-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl">{album.title}</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-x-4">
          <Button asChild variant="outline">
            <Link href="/admin/albums">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to Albums
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/albums/${album.id}/photos/upload`}>
              <Upload className="h-4 w-4" aria-hidden />
              Upload Pictures
            </Link>
          </Button>
        </div>
      </header>

      <section className="mb-16 flex flex-col gap-y-4 px-4 pb-12 sm:mb-30 sm:px-0 sm:pb-20 md:border-2 md:border-border">
        <header className="border-b-2 border-border bg-gray-100 px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-6">
          <h2 className="text-base sm:text-lg md:text-xl">All Photos ({album.photos.length})</h2>
        </header>

        <div className="p-3 sm:p-4 md:p-8">
          {album.photos.length === 0 ? (
            <div className="py-6 text-center sm:py-8 md:py-12">
              <ImageIcon
                className="mx-auto mb-3 h-10 w-10 text-muted-foreground sm:mb-4 sm:h-12 sm:w-12 md:h-16 md:w-16"
                aria-hidden
              />
              <h3 className="mb-2 text-sm sm:text-base md:text-lg">No photos available</h3>
              <p className="mb-4 text-xs text-muted-foreground sm:text-sm md:mb-6 md:text-base">
                Add the first photos to this album.
              </p>
              <Button asChild>
                <Link href={`/admin/albums/${album.id}/photos/upload`}>
                  <Upload className="h-4 w-4" aria-hidden />
                  Upload First Photos
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {album.photos.map((photo) => (
                <li key={photo.id} className="group relative border-2 border-border">
                  <div className="relative">
                    <Image
                      className="h-20 w-full object-cover sm:h-24 md:h-28 lg:h-32"
                      src={photo.url}
                      alt=""
                      width={200}
                      height={128}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <DeletePhotoButton photoId={photo.id} filename={photo.filename} />
                  </div>
                  <p
                    className="truncate p-1 text-xs text-muted-foreground sm:p-2"
                    title={photo.filename}
                  >
                    {photo.filename}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
