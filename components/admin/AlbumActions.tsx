"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, Settings, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";

export function AlbumActions({ albumId }: { albumId: number }) {
  const handleDelete = async () => {
    const response = await fetch(`/api/albums/${albumId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete album");
      return;
    }
    const data = await response.json();
    if (data.success) {
      window.location.reload();
    } else {
      alert(data.error || "Failed to delete album");
    }
  };

  return (
    <div className="flex flex-col gap-2 pt-2">
      <Link
        href={`/admin/albums/${albumId}/photos`}
        className="flex-1 px-3 sm:px-4 py-2 text-sm flex items-center justify-center gap-x-1 sm:gap-x-2 text-accent border-2 border-accent hover:bg-accent hover:text-white transition-colors duration-300 font-sans"
      >
        <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Manage Photos</span>
        <span className="sm:hidden">Photos</span>
      </Link>
      <div className="flex flex-col md:flex-row gap-2">
        <Link
          href={`/admin/albums/${albumId}/edit`}
          className="flex-1 px-3 sm:px-4 py-2 text-sm flex items-center justify-center gap-x-1 sm:gap-x-2 text-accent border-2 border-accent hover:bg-accent hover:text-white transition-colors duration-300 font-sans"
        >
          <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Edit Album</span>
          <span className="sm:hidden">Edit</span>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-3 sm:px-4 py-2 text-sm" variant="destructive">
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Delete</span>
              <span className="sm:hidden">Del</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Album</DialogTitle>
              <DialogDescription className="font-sans text-text">
                This action cannot be undone. This will permanently delete the
                album and all its photos.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Album
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
