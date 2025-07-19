"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { use } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const InterceptedImageModal = ({
  params,
}: {
  params: Promise<{ albumId: string; imageId: string }>;
}) => {
  const { albumId, imageId } = use(params);
  const router = useRouter();
  const [photo, setPhoto] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch photo details
        const photoRes = await fetch(
          `/api/albums/${albumId}/photos/${imageId}`
        );
        const photoData = await photoRes.json();

        // Fetch all photos for navigation
        const photosRes = await fetch(`/api/albums/${albumId}/photos`);
        const photosData = await photosRes.json();

        setPhoto(photoData.photo);
        setPhotos(photosData.photos);
      } catch (error) {
        console.error("Error fetching photo data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [albumId, imageId]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  const currentIndex = photos.findIndex((p: any) => p.id === parseInt(imageId));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault();
        const prevPhoto = photos[currentIndex - 1];
        router.replace(`/album/${albumId}/${prevPhoto.id}`);
      } else if (e.key === "ArrowRight" && currentIndex < photos.length - 1) {
        e.preventDefault();
        const nextPhoto = photos[currentIndex + 1];
        router.replace(`/album/${albumId}/${nextPhoto.id}`);
      } else if (e.key === "Escape") {
        e.preventDefault();
        router.back();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, photos, albumId, router]);

  if (loading) {
    return (
      <Dialog open onOpenChange={(open) => !open && router.back()}>
        <DialogContent className="w-auto h-auto max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">Loading...</DialogTitle>
          <div className="flex items-center justify-center w-full h-64">
            <div className="text-white">Loading...</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!photo) {
    return (
      <Dialog open onOpenChange={(open) => !open && router.back()}>
        <DialogContent className="w-auto h-auto max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">Photo not found</DialogTitle>
          <div className="flex items-center justify-center w-full h-64">
            <div className="text-white">Photo not found</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open
      onOpenChange={handleOpenChange}
      aria-label={`Imageview: ${photo.filename}`}
    >
      <DialogContent
        showCloseButton={true}
        className="w-auto h-auto max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none [&>button]:text-white [&>button]:cursor-pointer [&>button]:p-2 [&>button]:bg-black/50 [&>button]:rounded-full [&>button]:hover:bg-black/70"
        aria-describedby="image-description"
      >
        <DialogTitle className="sr-only">{photo.filename}</DialogTitle>

        <DialogDescription id="image-description" className="sr-only">
          {photo.filename}
        </DialogDescription>

        <figure className="relative w-auto h-auto max-w-[90vw] max-h-[90vh]">
          <Image
            src={photo.path}
            alt={photo.filename}
            width={1200}
            height={800}
            className="object-contain max-w-full max-h-[90vh]"
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
            priority
            aria-labelledby="image-title"
          />

          <figcaption
            className="absolute left-2 bottom-2 text-white/60"
            id="image-title"
          >
            {photo.filename}
          </figcaption>

          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={() => {
                const prevPhoto = photos[currentIndex - 1];
                router.replace(`/album/${albumId}/${prevPhoto.id}`);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full cursor-pointer"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {currentIndex < photos.length - 1 && (
            <button
              onClick={() => {
                const nextPhoto = photos[currentIndex + 1];
                router.replace(`/album/${albumId}/${nextPhoto.id}`);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full cursor-pointer"
              aria-label="Next image"
            >
              <ArrowRight className="w-6 h-6 " />
            </button>
          )}

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </figure>
      </DialogContent>
    </Dialog>
  );
};

export default InterceptedImageModal;
