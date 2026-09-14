import { AlbumForm } from "@/components/admin/album-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createAlbum } from "@/lib/actions/albums";

export default function AddAlbumPage() {
  return (
    <main className="container px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        className="mb-6 px-4 sm:mb-8 sm:px-0 md:mb-12"
        items={[{ label: "Album Management", href: "/admin/albums" }, { label: "Add Album" }]}
      />

      <section className="mx-auto max-w-4xl p-4 sm:p-8 md:border-2 md:border-border md:p-12 lg:p-20">
        <header className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="mb-3 text-xl sm:mb-4 sm:text-2xl">Create New Album</h1>
          <p className="font-sans text-sm text-text sm:text-base">
            Add a new album to your gallery collection. Fill in the details below and upload a cover
            image.
          </p>
          <hr className="mt-4 sm:mt-6" />
        </header>

        <AlbumForm action={createAlbum} submitLabel="Create Album" pendingLabel="Creating..." />
      </section>
    </main>
  );
}
