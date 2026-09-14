import Image from "next/image";

import AdminNav from "@/components/admin/admin-nav";
import { AlbumActions } from "@/components/admin/album-actions";
import { listAlbums } from "@/lib/queries/albums";

export default async function AdminAlbumsPage() {
  const albums = await listAlbums();

  return (
    <main className="container px-4 sm:px-6 lg:px-8">
      <header className="flex flex-col items-start justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:gap-0 sm:px-0 sm:py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl">Album Management</h1>
        <AdminNav />
      </header>

      <section className="mb-16 flex flex-col gap-y-4 px-4 pb-12 sm:mb-30 sm:px-0 sm:pb-20 md:border-2 md:border-border">
        <header className="bg-gray-100 px-4 py-6 text-lg sm:px-6 sm:py-8 sm:text-xl md:border-b-2 md:border-border md:px-8">
          <h2>All Albums</h2>
        </header>
        <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 md:p-8">
          {albums.map((album) => (
            <article key={album.id} className="md:border-2 md:border-border">
              <div className="relative overflow-hidden">
                <Image
                  className="h-64 w-full object-cover"
                  src={album.coverImage}
                  alt={album.title}
                  width={400}
                  height={256}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="space-y-4 p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-base font-medium text-foreground sm:text-lg">
                        {album.title}
                      </h3>
                    </div>
                  </div>
                  <AlbumActions albumId={album.id} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
