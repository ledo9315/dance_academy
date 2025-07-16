import LinkComponent from "@/components/ui/link";
import { GALERY_IMAGES } from "@/data/gallery-images";
import {
  ArrowLeft,
  Upload,
  Trash2,
  Image as ImageIcon,
  Plus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Photos({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;

  // Find album based on ID
  const album = GALERY_IMAGES.find((img) => img.id.toString() === albumId);

  if (!album) {
    return (
      <main className="container">
        <div className="py-12 text-center">
          <h1 className="text-2xl mb-4">Album not found</h1>
          <LinkComponent variant="default-button" href="/admin/albums">
            Back to Albums
          </LinkComponent>
        </div>
      </main>
    );
  }

  // Simulate photos for the album (in a real app these would come from a database)
  const albumPhotos = [
    { id: 1, src: "/photos/1.jpg", alt: "Photo 1", filename: "photo1.jpg" },
    { id: 2, src: "/photos/2.jpg", alt: "Photo 2", filename: "photo2.jpg" },
    { id: 3, src: "/photos/3.jpg", alt: "Photo 3", filename: "photo3.jpg" },
    { id: 4, src: "/photos/4.jpg", alt: "Photo 4", filename: "photo4.jpg" },
    { id: 5, src: "/photos/5.jpg", alt: "Photo 5", filename: "photo5.jpg" },
    { id: 6, src: "/photos/6.jpg", alt: "Photo 6", filename: "photo6.jpg" },
  ];

  return (
    <main className="container">
      <header>
        <h1 className="text-2xl md:text-3xl mb-8">{album.title}</h1>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/albums"
              className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors duration-300 font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Albums</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
          <nav className="flex flex-col sm:flex-row gap-2 sm:gap-x-4 font-sans text-sm">
            <LinkComponent
              variant="default-button"
              href={`/admin/albums/${albumId}/photos/upload`}
            >
              <Upload className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Upload Pictures</span>
              <span className="sm:hidden">Upload</span>
            </LinkComponent>
            <LinkComponent
              variant="outline-button"
              href={`/admin/albums/${albumId}/photos/delete-all`}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Delete All Pictures</span>
              <span className="sm:hidden">Delete All</span>
            </LinkComponent>
          </nav>
        </div>
      </header>

      <section className="flex flex-col gap-y-4 border-2 border-border mb-30 pb-20">
        <header className="px-4 md:px-8 py-4 md:py-6 bg-gray-100 border-b-2 border-border">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h2 className="text-lg md:text-xl">
              All Photos ({albumPhotos.length})
            </h2>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {albumPhotos.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <ImageIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-base md:text-lg mb-2">No photos available</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                Add the first photos to this album.
              </p>
              <LinkComponent
                variant="default-button"
                href={`/admin/albums/${albumId}/photos/upload`}
              >
                <Plus className="w-4 h-4" />
                Upload First Photos
              </LinkComponent>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {albumPhotos.map((photo) => (
                <article
                  key={photo.id}
                  className="group relative border-2 border-border"
                >
                  <div className="relative">
                    <Image
                      className="w-full h-24 sm:h-28 md:h-32 object-cover"
                      src={photo.src}
                      alt={photo.alt}
                      width={200}
                      height={128}
                    />

                    {/* Delete Button Overlay */}
                    <Link
                      href={`/admin/albums/${albumId}/photos/${photo.id}/delete`}
                      className="absolute top-1 right-1 md:top-2 md:right-2 w-5 h-5 md:w-6 md:h-6 bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700"
                      title="Delete photo"
                    >
                      <X className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </Link>
                  </div>

                  <div className="p-2 md:p-2">
                    <p
                      className="text-xs text-muted-foreground truncate"
                      title={photo.filename}
                    >
                      {photo.filename}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
