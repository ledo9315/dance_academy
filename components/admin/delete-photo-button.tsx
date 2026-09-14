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
      size="icon"
      disabled={isPending}
      aria-label={`Delete ${filename}`}
      onClick={() => startTransition(() => deletePhoto(photoId))}
      className="absolute top-1 right-1 h-6 w-6 bg-red-600 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-red-700 focus-visible:opacity-100 md:top-2 md:right-2"
    >
      <X className="h-3 w-3" aria-hidden />
    </Button>
  );
}
