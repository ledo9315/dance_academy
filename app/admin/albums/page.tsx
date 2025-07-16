import LinkComponent from "@/components/ui/link";
import { GALERY_IMAGES } from "@/data/gallery-images";
import {
  LogOut,
  Plus,
  Image as ImageIcon,
  Trash2,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="container">
      <header className="py-12 flex justify-between items-center">
        <h1 className="text-3xl">Album Management</h1>
        <nav className="flex gap-x-4 font-sans text-sm">
          <LinkComponent variant="default-button" href="/admin/albums/add">
            <Plus className="w-4 h-4" />
            Add New Album
          </LinkComponent>
          <LinkComponent variant="outline-button" href="/admin/logout">
            <LogOut className="w-4 h-4" />
            Logout
          </LinkComponent>
        </nav>
      </header>

      <section className="flex flex-col gap-y-4 border-2 border-border mb-30 pb-20">
        <header className="px-8 py-8 text-xl bg-gray-100 border-b-2 border-border">
          <h2>All Albums</h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {GALERY_IMAGES.map((album) => (
            <article key={album.id} className="border-2 border-border">
              <div className="relative overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src={album.src}
                  alt={album.alt}
                  width={400}
                  height={256}
                />

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-medium text-foreground">
                        {album.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/albums/${album.id}/photos`}
                        className="flex-1 px-4 py-2 text-sm flex items-center justify-center gap-x-2 text-accent border-2 border-accent hover:bg-accent hover:text-white transition-colors duration-300 font-sans"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Manage Photos
                      </Link>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/admin/albums/${album.id}/edit`}
                        className="flex-1 px-4 py-2 text-sm flex items-center justify-center gap-x-2 text-accent border-2 border-accent hover:bg-accent hover:text-white transition-colors duration-300 font-sans"
                      >
                        <Settings className="w-4 h-4" />
                        Edit Album
                      </Link>

                      <Link
                        href={`/admin/albums/${album.id}/delete`}
                        className="px-4 py-2 text-sm flex items-center justify-center gap-x-2 text-red-600 hover:text-white border-2 border-red-600 hover:bg-red-600 transition-colors duration-300 font-sans"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
