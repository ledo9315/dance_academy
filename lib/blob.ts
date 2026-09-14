import "server-only";

import { del, put } from "@vercel/blob";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
] as const;

export type UploadedImage = {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
};

/**
 * Stores an image in Vercel Blob under a collision free, randomised name.
 * Validation lives here so every caller gets the same guarantees.
 */
export async function uploadImage(file: File, folder: string): Promise<UploadedImage> {
  if (file.size === 0) {
    throw new Error("The selected file is empty.");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`"${file.name}" is larger than 10 MB.`);
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    throw new Error(`"${file.name}" is not a supported image format.`);
  }

  const blob = await put(`${folder}/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return {
    url: blob.url,
    filename: file.name,
    size: file.size,
    mimeType: file.type,
  };
}

/**
 * Removes blobs that are no longer referenced. Deletion must never break the
 * surrounding transaction, so failures are logged rather than thrown.
 */
export async function deleteImages(urls: string[]): Promise<void> {
  const blobUrls = urls.filter((url) => url.includes(".blob.vercel-storage.com"));

  if (blobUrls.length === 0) {
    return;
  }

  try {
    await del(blobUrls);
  } catch (error) {
    console.error("Failed to delete blobs", { urls: blobUrls, error });
  }
}
