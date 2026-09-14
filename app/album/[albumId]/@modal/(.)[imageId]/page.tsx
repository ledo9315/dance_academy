import { notFound } from "next/navigation";

import { PhotoLightbox } from "@/components/photo-lightbox";
import { listPhotos } from "@/lib/queries/albums";

type InterceptedPhotoProps = {
  params: Promise<{ albumId: string; imageId: string }>;
};

export default async function InterceptedPhotoPage({ params }: InterceptedPhotoProps) {
  const { albumId, imageId } = await params;
  const albumIdNumber = Number(albumId);
  const photoId = Number(imageId);

  if (!Number.isInteger(albumIdNumber) || !Number.isInteger(photoId)) {
    notFound();
  }

  const photos = await listPhotos(albumIdNumber);

  if (!photos.some((photo) => photo.id === photoId)) {
    notFound();
  }

  return <PhotoLightbox albumId={albumIdNumber} photos={photos} currentPhotoId={photoId} />;
}
