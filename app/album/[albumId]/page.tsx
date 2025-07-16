import LinkComponent from "@/components/ui/link";
import { GALERY_IMAGES } from "@/data/gallery-images";
import { ArrowLeft, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

const AlbumPage = ({ params }: { params: Promise<{ albumId: string }> }) => {
  const { albumId } = use(params);

  const formattedAlbumId = albumId
    .split("-")
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="container">
      <nav className="mb-12" aria-label="Breadcrumb">
        <ol className="flex space-x-1 font-sans text-sm" role="list">
          <li>
            <Link className="text-accent" href="/album">
              Gallery
            </Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">
            /
          </li>
          <li aria-current="page">{formattedAlbumId}</li>
        </ol>
      </nav>

      <header className="relative mb-16">
        <h1 className="text-center text-4xl before:content-[''] before:absolute before:bottom-[-15px] before:left-1/2 before:-translate-x-1/2 before:h-0.5 before:w-12 before:bg-accent ">
          {formattedAlbumId}
        </h1>
      </header>

      <section className="mb-30" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">
          Bildergalerie
        </h2>
        <ul className="grid grid-cols-3 gap-4 mb-10" role="list">
          {GALERY_IMAGES.map((image) => (
            <li
              key={image.id}
              className="aspect-[3/2] w-full overflow-hidden focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 relative group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                width={300}
                height={200}
              />
              <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Link
                href={`/album/${albumId}/${image.id}`}
                className="absolute inset-0 flex flex-col items-center justify-center gap-y-1 text-white text-sm font-sans opacity-0 group-hover:opacity-100 transition-opacity z-30 uppercase"
              >
                <Eye width={25} height={25} />
                View Image
              </Link>
            </li>
          ))}
        </ul>
        <footer className="flex items-center justify-between text-gray-500 font-sans mt-4">
          <LinkComponent href="/album" variant="outline-button">
            <ArrowLeft width={16} height={16} className="mr-1" />
            Back to Gallery
          </LinkComponent>
          <span aria-live="polite">
            {GALERY_IMAGES.length} images in this album
          </span>
        </footer>
      </section>
    </main>
  );
};

export default AlbumPage;
