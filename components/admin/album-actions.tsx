"use client";

import { Image as ImageIcon, Settings, Trash2 } from "lucide-react";
import Link from "next/link";

import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { deleteAlbum } from "@/lib/actions/albums";

export function AlbumActions({ albumId }: { albumId: number }) {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <Button asChild variant="outline">
        <Link href={`/admin/albums/${albumId}/photos`}>
          <ImageIcon className="h-4 w-4" aria-hidden />
          Manage Photos
        </Link>
      </Button>

      <div className="flex flex-col gap-2 md:flex-row">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/admin/albums/${albumId}/edit`}>
            <Settings className="h-4 w-4" aria-hidden />
            Edit Album
          </Link>
        </Button>

        <ConfirmDeleteDialog
          title="Delete album"
          description="This action cannot be undone. The album, all of its photos and the stored image files will be permanently deleted."
          confirmLabel="Delete album"
          onConfirm={() => deleteAlbum(albumId)}
          trigger={
            <Button variant="destructive" className="flex-1">
              <Trash2 className="h-4 w-4" aria-hidden />
              Delete
            </Button>
          }
        />
      </div>
    </div>
  );
}
