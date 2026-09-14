import "server-only";

import { prisma } from "@/lib/prisma";

export function listAlbums() {
  return prisma.album.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, coverImage: true, createdAt: true },
  });
}

export function getAlbum(albumId: number) {
  return prisma.album.findUnique({
    where: { id: albumId },
    select: { id: true, title: true, coverImage: true },
  });
}

export function getAlbumWithPhotos(albumId: number) {
  return prisma.album.findUnique({
    where: { id: albumId },
    select: {
      id: true,
      title: true,
      coverImage: true,
      photos: {
        orderBy: { createdAt: "asc" },
        select: { id: true, filename: true, url: true },
      },
    },
  });
}

export function listPhotos(albumId: number) {
  return prisma.photo.findMany({
    where: { albumId },
    orderBy: { createdAt: "asc" },
    select: { id: true, filename: true, url: true },
  });
}

export type AlbumListItem = Awaited<ReturnType<typeof listAlbums>>[number];
export type AlbumWithPhotos = NonNullable<Awaited<ReturnType<typeof getAlbumWithPhotos>>>;
export type PhotoListItem = Awaited<ReturnType<typeof listPhotos>>[number];
