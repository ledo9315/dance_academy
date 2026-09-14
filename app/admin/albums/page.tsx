import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

import { AlbumActions } from "@/components/admin/album-actions";
import { Button } from "@/components/ui/button";
import { listAlbums } from "@/lib/queries/albums";

export default async function AdminAlbumsPage() {
  const albums = await listAlbums();

  return (
    <main className="container px-4 sm:px-6 lg:px-8">
      <section className="mb-16 flex flex-col gap-y-4 px-4 pb-12 sm:mb-30 sm:px-0 sm:pb-20 md:border-2 md:border-border">
        <header className="flex flex-col gap-4 bg-gray-100 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-8 md:border-b-2 md:border-border md:px-8">
          <h1 className="text-lg sm:text-xl">All Albums ({albums.length})</h1>
          <Button asChild>
            <Link href="/admin/albums/add">
              <Plus className="h-4 w-4" aria-hidden />
              Add New Album
            </Link>
          </Button>
        </header>

        {albums.length === 0 ? (
          <p className="px-4 py-12 text-center text-text sm:px-6 md:px-8">
            No albums yet — create your first one.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 md:p-8">
            {albums.map((album) => (
              <li key={album.id} className="md:border-2 md:border-border">
                <Image
                  className="h-64 w-full object-cover"
                  src={album.coverImage}
                  alt=""
                  width={400}
                  height={256}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="space-y-4 p-4 sm:p-6">
                  <h2 className="text-base font-medium text-foreground sm:text-lg">
                    {album.title}
                  </h2>
                  <AlbumActions albumId={album.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
