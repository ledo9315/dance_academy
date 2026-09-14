"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireSession } from "@/lib/auth";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_BYTES, deleteImages, uploadImage } from "@/lib/blob";
import { prisma } from "@/lib/prisma";
import { errorState, type FormState } from "@/lib/actions/types";

const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, "Please choose an image.")
  .refine((file) => file.size <= MAX_UPLOAD_BYTES, "The image must be smaller than 10 MB.")
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]),
    "Supported formats are JPG, PNG, WebP, AVIF and GIF.",
  );

const titleSchema = z
  .string()
  .trim()
  .min(2, "The title must be at least 2 characters.")
  .max(100, "The title must be at most 100 characters.");

const createAlbumSchema = z.object({
  title: titleSchema,
  coverImage: imageFileSchema,
});

const updateAlbumSchema = z.object({
  title: titleSchema,
  // Browsers submit an empty File when no new image was picked.
  coverImage: imageFileSchema.optional(),
});

function optionalFile(value: FormDataEntryValue | null): File | undefined {
  return value instanceof File && value.size > 0 ? value : undefined;
}

function revalidateAlbums(albumId?: number) {
  revalidatePath("/album");
  revalidatePath("/admin/albums");

  if (albumId !== undefined) {
    revalidatePath(`/album/${albumId}`);
    revalidatePath(`/admin/albums/${albumId}/photos`);
  }
}

export async function createAlbum(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const parsed = createAlbumSchema.safeParse({
    title: formData.get("title"),
    coverImage: formData.get("coverImage"),
  });

  if (!parsed.success) {
    return errorState(
      "Please correct the highlighted fields.",
      z.flattenError(parsed.error).fieldErrors,
    );
  }

  try {
    const cover = await uploadImage(parsed.data.coverImage, "albums");

    await prisma.album.create({
      data: { title: parsed.data.title, coverImage: cover.url },
    });
  } catch (error) {
    console.error("Failed to create album", error);
    return errorState("The album could not be created. Please try again.");
  }

  revalidateAlbums();
  redirect("/admin/albums");
}

export async function updateAlbum(
  albumId: number,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireSession();

  const parsed = updateAlbumSchema.safeParse({
    title: formData.get("title"),
    coverImage: optionalFile(formData.get("coverImage")),
  });

  if (!parsed.success) {
    return errorState(
      "Please correct the highlighted fields.",
      z.flattenError(parsed.error).fieldErrors,
    );
  }

  try {
    const album = await prisma.album.findUnique({
      where: { id: albumId },
      select: { coverImage: true },
    });

    if (!album) {
      return errorState("This album no longer exists.");
    }

    const cover = parsed.data.coverImage
      ? await uploadImage(parsed.data.coverImage, "albums")
      : null;

    await prisma.album.update({
      where: { id: albumId },
      data: {
        title: parsed.data.title,
        ...(cover ? { coverImage: cover.url } : {}),
      },
    });

    if (cover) {
      await deleteImages([album.coverImage]);
    }
  } catch (error) {
    console.error("Failed to update album", { albumId, error });
    return errorState("The album could not be saved. Please try again.");
  }

  revalidateAlbums(albumId);
  redirect("/admin/albums");
}

export async function deleteAlbum(albumId: number): Promise<void> {
  await requireSession();

  const album = await prisma.album.findUnique({
    where: { id: albumId },
    select: { coverImage: true, photos: { select: { url: true } } },
  });

  if (!album) {
    return;
  }

  // Photos are removed by the cascading foreign key.
  await prisma.album.delete({ where: { id: albumId } });
  await deleteImages([album.coverImage, ...album.photos.map((photo) => photo.url)]);

  revalidateAlbums(albumId);
}

export async function uploadPhotos(
  albumId: number,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireSession();

  const files = formData.getAll("photos").filter((entry): entry is File => entry instanceof File);
  const parsed = z
    .array(imageFileSchema)
    .min(1, "Please choose at least one image.")
    .safeParse(files);

  if (!parsed.success) {
    return errorState(parsed.error.issues[0]?.message ?? "Please choose valid images.");
  }

  try {
    const uploads = await Promise.all(
      parsed.data.map((file) => uploadImage(file, `albums/${albumId}`)),
    );

    await prisma.photo.createMany({
      data: uploads.map((upload) => ({
        albumId,
        filename: upload.filename,
        url: upload.url,
        size: upload.size,
        mimeType: upload.mimeType,
      })),
    });
  } catch (error) {
    console.error("Failed to upload photos", { albumId, error });
    return errorState("The photos could not be uploaded. Please try again.");
  }

  revalidateAlbums(albumId);
  redirect(`/admin/albums/${albumId}/photos`);
}

export async function deletePhoto(photoId: number): Promise<void> {
  await requireSession();

  const photo = await prisma.photo.findUnique({
    where: { id: photoId },
    select: { url: true, albumId: true },
  });

  if (!photo) {
    return;
  }

  await prisma.photo.delete({ where: { id: photoId } });
  await deleteImages([photo.url]);

  revalidateAlbums(photo.albumId);
}
