import DeletePhotoButton from "@/components/admin/DeletePhotoButton";
import LinkComponent from "@/components/ui/link";
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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function Photos({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;

  const res = await fetch(`${BASE_URL}/api/albums/${albumId}/photos`);
  if (!res.ok) {
    return <div>Error loading photos</div>;
  }
  const { photos } = await res.json();

  return (
    <main className="container px-4 sm:px-6 lg:px-8">
      <header className="px-4 sm:px-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8">
          Album Photos
        </h1>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/albums"
              className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors duration-300 font-sans text-sm sm:text-base"
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
              className="w-full sm:w-auto"
            >
              <Upload className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Upload Pictures</span>
              <span className="sm:hidden">Upload</span>
            </LinkComponent>
          </nav>
        </div>
      </header>

      <section className="flex flex-col gap-y-4 md:border-2 md:border-border mb-16 sm:mb-30 pb-12 sm:pb-20 px-4 sm:px-0">
        <header className="px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6 bg-gray-100 border-b-2 border-border">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h2 className="text-base sm:text-lg md:text-xl">
              All Photos ({photos.length})
            </h2>
          </div>
        </header>

        <div className="p-3 sm:p-4 md:p-8">
          {photos.length === 0 ? (
            <div className="text-center py-6 sm:py-8 md:py-12">
              <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-3 sm:mb-4" />
              <h3 className="text-sm sm:text-base md:text-lg mb-2">
                No photos available
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4 md:mb-6">
                Add the first photos to this album.
              </p>
              <LinkComponent
                variant="default-button"
                href={`/admin/albums/${albumId}/photos/upload`}
                className="w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                Upload First Photos
              </LinkComponent>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {photos.map((photo: any) => (
                <article
                  key={photo.id}
                  className="group relative border-2 border-border"
                >
                  <div className="relative">
                    {photo.path ? (
                      <Image
                        className="w-full h-20 sm:h-24 md:h-28 lg:h-32 object-cover"
                        src={photo.path}
                        alt={photo.originalName || photo.filename || "Photo"}
                        width={200}
                        height={128}
                      />
                    ) : (
                      <div className="w-full h-20 sm:h-24 md:h-28 lg:h-32 bg-gray-200 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                    )}

                    {/* Delete Button Overlay */}
                    <DeletePhotoButton photoId={photo.id} albumId={albumId} />
                  </div>

                  <div className="p-1 sm:p-2">
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
