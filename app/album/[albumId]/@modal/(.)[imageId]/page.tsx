"use client";

import { GALERY_IMAGES } from "@/data/gallery-images";
import Image from "next/image";
import { use, useEffect } from "react";
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
  const image = GALERY_IMAGES.find((img) => img.id === Number(imageId));

  if (!image) {
    return;
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  const currentIndex = GALERY_IMAGES.findIndex(
    (img) => img.id === Number(imageId)
  );

  // Globale Tastatur-Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault();
        router.replace(
          `/album/${albumId}/${GALERY_IMAGES[currentIndex - 1].id}`
        );
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < GALERY_IMAGES.length - 1
      ) {
        e.preventDefault();
        router.replace(
          `/album/${albumId}/${GALERY_IMAGES[currentIndex + 1].id}`
        );
      } else if (e.key === "Escape") {
        e.preventDefault();
        router.push(`/album/${albumId}`);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, albumId, router]);

  return (
    <Dialog
      open
      onOpenChange={handleOpenChange}
      aria-label={`Bildansicht: ${image.title}`}
    >
      <DialogContent
        showCloseButton={true}
        className="w-auto h-auto max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none [&>button]:text-white [&>button]:cursor-pointer [&>button]:p-2 [&>button]:bg-black/50 [&>button]:rounded-full [&>button]:hover:bg-black/70"
        aria-describedby="image-description"
      >
        <DialogTitle className="sr-only">{image.title}</DialogTitle>

        <DialogDescription id="image-description" className="sr-only">
          {image.alt}. Category: {image.category}
        </DialogDescription>

        <figure className="relative w-auto h-auto max-w-[90vw] max-h-[90vh]">
          <Image
            src={image.src}
            alt={image.alt}
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
            {image.title}
          </figcaption>

          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={() =>
                router.replace(
                  `/album/${albumId}/${GALERY_IMAGES[currentIndex - 1].id}`
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full cursor-pointer"
              aria-label="Vorheriges Bild"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {currentIndex < GALERY_IMAGES.length - 1 && (
            <button
              onClick={() =>
                router.replace(
                  `/album/${albumId}/${GALERY_IMAGES[currentIndex + 1].id}`
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full cursor-pointer"
              aria-label="Nächstes Bild"
            >
              <ArrowRight className="w-6 h-6 " />
            </button>
          )}

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {GALERY_IMAGES.length}
          </div>
        </figure>
      </DialogContent>
    </Dialog>
  );
};

export default InterceptedImageModal;
