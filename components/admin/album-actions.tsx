"use client";

import { Image as ImageIcon, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAlbum } from "@/lib/actions/albums";

const linkClasses =
  "flex-1 px-3 sm:px-4 py-2 text-sm flex items-center justify-center gap-x-1 sm:gap-x-2 text-accent border-2 border-accent hover:bg-accent hover:text-white transition-colors duration-300 font-sans";

export function AlbumActions({ albumId }: { albumId: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2 pt-2">
      <Link href={`/admin/albums/${albumId}/photos`} className={linkClasses}>
        <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Manage Photos</span>
        <span className="sm:hidden">Photos</span>
      </Link>
      <div className="flex flex-col gap-2 md:flex-row">
        <Link href={`/admin/albums/${albumId}/edit`} className={linkClasses}>
          <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Edit Album</span>
          <span className="sm:hidden">Edit</span>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-3 py-2 text-sm sm:px-4" variant="destructive">
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Delete</span>
              <span className="sm:hidden">Del</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Album</DialogTitle>
              <DialogDescription className="font-sans text-text">
                This action cannot be undone. This will permanently delete the album and all its
                photos.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={() => startTransition(() => deleteAlbum(albumId))}
              >
                Delete Album
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
