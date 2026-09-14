"use client";

import { ArrowLeft, ImageUp, X } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { idleFormState, type FormState } from "@/lib/actions/types";
import { cn } from "@/lib/utils";

type AlbumFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  /** Provided when editing an existing album. */
  album?: { title: string; coverImage: string };
  submitLabel: string;
  pendingLabel: string;
};

export function AlbumForm({ action, album, submitLabel, pendingLabel }: AlbumFormProps) {
  const [state, formAction] = useActionState(action, idleFormState);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(0);

  // Object URLs are only valid until they are revoked, so tie them to the preview.
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const clearFile = () => {
    setPreview(null);
    setFileKey((key) => key + 1);
  };

  const errors = state.fieldErrors ?? {};
  const shownImage = preview ?? album?.coverImage ?? null;

  return (
    <form action={formAction} noValidate className="font-sans">
      <fieldset className="mb-6">
        <legend className="sr-only">Album information</legend>

        <div className="mb-4 sm:mb-6">
          <label className="mb-2 block text-sm sm:text-base" htmlFor="title">
            Album Title <span className="text-accent">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={album?.title}
            aria-describedby={errors.title ? "title-error" : "title-help"}
            className={cn(
              "w-full border-2 border-border p-2 text-sm sm:p-3 sm:text-base",
              errors.title && "border-red-500",
            )}
            placeholder="Enter album title..."
          />
          {errors.title ? (
            <p id="title-error" role="alert" className="mt-1 text-sm text-red-500">
              {errors.title[0]}
            </p>
          ) : (
            <small id="title-help" className="text-xs text-text">
              Choose a descriptive title for your album.
            </small>
          )}
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="mb-2 block text-sm sm:text-base" htmlFor="coverImage">
            Cover Image {album ? null : <span className="text-accent">*</span>}
          </label>
          <input
            key={fileKey}
            id="coverImage"
            name="coverImage"
            type="file"
            accept="image/*"
            required={!album}
            onChange={handleFileChange}
            aria-describedby={errors.coverImage ? "coverImage-error" : "coverImage-help"}
            className="hidden"
          />
          <label
            htmlFor="coverImage"
            className="flex min-h-[100px] w-full cursor-pointer items-center justify-center border-2 border-dashed border-border bg-gray-50 p-3 transition-colors duration-300 hover:border-accent hover:bg-accent/10 sm:min-h-[120px] sm:p-4"
          >
            <span className="flex flex-col items-center justify-center">
              <ImageUp className="mb-2 h-8 w-8 text-accent sm:h-10 sm:w-10" aria-hidden />
              <span className="text-center text-xs text-text sm:text-sm">
                {album ? "Click here to replace the image" : "Click here to select an image"}
              </span>
            </span>
          </label>
          <small id="coverImage-help" className="mt-1 block text-xs">
            Supported formats: JPG, PNG, WebP, AVIF, GIF (max. 10 MB).
          </small>
          {errors.coverImage ? (
            <p id="coverImage-error" role="alert" className="mt-1 text-sm text-red-500">
              {errors.coverImage[0]}
            </p>
          ) : null}
        </div>
      </fieldset>

      {shownImage ? (
        <div className="relative mb-6">
          {preview ? (
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remove selected image"
              className="absolute top-2 right-2 z-10 cursor-pointer rounded-full bg-black/50 p-1 text-white/60 transition-all duration-300 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URLs cannot be optimised */}
          <img src={shownImage} alt="Album cover preview" className="h-auto w-full" />
        </div>
      ) : null}

      {state.status === "error" && state.message ? (
        <p role="alert" className="mb-6 border border-red-200 bg-red-50 p-4 text-red-800">
          {state.message}
        </p>
      ) : null}

      <hr className="my-6" />

      <div className="flex flex-col justify-end gap-3 sm:flex-row sm:gap-4">
        <Button asChild variant="outline">
          <Link href="/admin/albums">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Cancel
          </Link>
        </Button>
        <SubmitButton pendingLabel={pendingLabel}>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
