"use client";

import { X } from "lucide-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { deletePhoto } from "@/lib/actions/albums";

export function DeletePhotoButton({ photoId, filename }: { photoId: number; filename: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => startTransition(() => deletePhoto(photoId))}
      className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center bg-red-600 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-red-700 focus-visible:opacity-100 sm:top-1.5 sm:right-1.5 sm:h-5 sm:w-5 md:top-2 md:right-2 md:h-6 md:w-6"
      title="Delete photo"
      aria-label={`Delete ${filename}`}
    >
      <X className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3" />
    </Button>
  );
}
