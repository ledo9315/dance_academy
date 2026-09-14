import { notFound } from "next/navigation";

import { AlbumForm } from "@/components/admin/album-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { updateAlbum } from "@/lib/actions/albums";
import { getAlbum } from "@/lib/queries/albums";

type EditAlbumPageProps = {
  params: Promise<{ albumId: string }>;
};

export default async function EditAlbumPage({ params }: EditAlbumPageProps) {
  const { albumId } = await params;
  const id = Number(albumId);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const album = await getAlbum(id);

  if (!album) {
    notFound();
  }

  const updateThisAlbum = updateAlbum.bind(null, album.id);

  return (
    <main className="container px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        className="mb-6 px-4 sm:mb-8 sm:px-0 md:mb-12"
        items={[{ label: "Album Management", href: "/admin/albums" }, { label: "Edit Album" }]}
      />

      <section className="mx-auto max-w-4xl p-4 sm:p-8 md:border-2 md:border-border md:p-12 lg:p-20">
        <header className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="mb-3 text-xl sm:mb-4 sm:text-2xl">Edit Album</h1>
          <p className="font-sans text-sm text-text sm:text-base">Edit the album details below.</p>
          <hr className="mt-4 sm:mt-6" />
        </header>

        <AlbumForm action={updateThisAlbum} album={album} />
      </section>
    </main>
  );
}
