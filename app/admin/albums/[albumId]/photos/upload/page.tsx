import { notFound } from "next/navigation";

import { PhotoUploadForm } from "@/components/admin/photo-upload-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { uploadPhotos } from "@/lib/actions/albums";
import { getAlbum } from "@/lib/queries/albums";

type UploadPhotosPageProps = {
  params: Promise<{ albumId: string }>;
};

export default async function UploadPhotosPage({ params }: UploadPhotosPageProps) {
  const { albumId } = await params;
  const id = Number(albumId);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const album = await getAlbum(id);

  if (!album) {
    notFound();
  }

  const uploadToThisAlbum = uploadPhotos.bind(null, album.id);

  return (
    <main className="container px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        className="mb-6 px-4 sm:mb-8 md:mb-12 md:px-0"
        items={[
          { label: "Album Photos", href: `/admin/albums/${album.id}/photos` },
          { label: "Upload Photos" },
        ]}
      />

      <section className="mx-auto max-w-4xl p-4 sm:p-8 md:border-2 md:border-border md:p-12 lg:p-20">
        <header className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="mb-3 text-xl sm:mb-4 sm:text-2xl">Upload Photos</h1>
          <p className="font-sans text-sm text-text sm:text-base">
            Add new photos to “{album.title}”.
          </p>
          <hr className="mt-4 sm:mt-6" />
        </header>

        <PhotoUploadForm albumId={album.id} action={uploadToThisAlbum} />
      </section>
    </main>
  );
}
