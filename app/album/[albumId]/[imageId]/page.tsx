import { GALERY_IMAGES } from "@/data/gallery-images";
import Image from "next/image";
import { use } from "react";
import Link from "next/link";

const ImagePage = ({
  params,
}: {
  params: Promise<{ albumId: string; imageId: string }>;
}) => {
  const { albumId, imageId } = use(params);
  const image = GALERY_IMAGES.find((img) => img.id === Number(imageId));

  const formattedAlbumId = albumId
    .split("-")
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(" ");

  if (!image) {
    return <p>Image not found</p>;
  }

  return (
    <main className="container mx-auto py-8">
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
          <li className="text-accent" aria-current="page">
            <Link href={`/album/${albumId}`}>{formattedAlbumId}</Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">
            /
          </li>
          <li aria-current="page">{image.title}</li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto mb-20">
        <h1 className="text-2xl font-bold mb-4">{image.title}</h1>
        <div className="relative">
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </main>
  );
};

export default ImagePage;
