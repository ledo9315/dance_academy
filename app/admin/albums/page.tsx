import { AlbumActions } from "@/components/admin/AlbumActions";
import AdminNav from "@/components/admin/AdminNav";
import { Album } from "@/types";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function Dashboard() {
  const res = await fetch(`${BASE_URL}/api/albums`);
  const { allAlbums } = await res.json();

  const albums: Album[] = allAlbums.map((album: any) => ({
    id: album.id,
    title: album.title,
    coverImage: `${BASE_URL}${album.coverImage}`,
  }));

  return (
    <main className="container px-4 sm:px-6 lg:px-8">
      <header className="py-6 sm:py-8 md:py-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl">Album Management</h1>
        <AdminNav />
      </header>

      <section className="flex flex-col gap-y-4 md:border-2 md:border-border mb-16 sm:mb-30 pb-12 sm:pb-20 px-4 sm:px-0">
        <header className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-lg sm:text-xl bg-gray-100 md:border-b-2 md:border-border">
          <h2>All Albums</h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
          {albums.map((album) => (
            <article key={album.id} className="md:border-2 md:border-border">
              <div className="relative overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src={album.coverImage}
                  alt={album.title}
                  width={400}
                  height={256}
                />

                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <h3 className="text-base sm:text-lg font-medium text-foreground">
                        {album.title}
                      </h3>
                    </div>
                  </div>
                  <AlbumActions albumId={Number(album.id)} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
