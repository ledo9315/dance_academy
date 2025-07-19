"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface DeletePhotoButtonProps {
  photoId: number;
  albumId: string;
  onDelete?: () => void;
}

export default function DeletePhotoButton({
  photoId,
  albumId,
  onDelete,
}: DeletePhotoButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/albums/${albumId}/photos/${photoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.refresh();

      if (res.ok) {
        onDelete?.();
      } else {
        console.error("Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 md:top-2 md:right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700"
      title="Delete photo"
    >
      <X className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
    </Button>
  );
}
