import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { EditAlbumForm } from "./EditAlbumForm";

async function getAlbum(albumId: string) {
  try {
    const album = await prisma.album.findUnique({
      where: { id: Number(albumId) },
    });

    if (!album) {
      notFound();
    }

    return album;
  } catch (error) {
    console.error("Error fetching album:", error);
    notFound();
  }
}

export default async function EditAlbum({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const resolvedParams = await params;
  const album = await getAlbum(resolvedParams.albumId);

  return <EditAlbumForm album={album} />;
}
