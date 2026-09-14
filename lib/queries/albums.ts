import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/prisma";

export function listAlbums() {
  return prisma.album.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, coverImage: true, createdAt: true },
  });
}

/** Cached per request so `generateMetadata` and the page share one query. */
export const getAlbum = cache((albumId: number) =>
  prisma.album.findUnique({
    where: { id: albumId },
    select: { id: true, title: true, coverImage: true },
  }),
);

export const getAlbumWithPhotos = cache((albumId: number) =>
  prisma.album.findUnique({
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
  }),
);

export const getPhoto = cache((albumId: number, photoId: number) =>
  prisma.photo.findFirst({
    where: { id: photoId, albumId },
    select: { id: true, filename: true, url: true },
  }),
);

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
