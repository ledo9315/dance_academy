"use client";

import { ArrowLeft, ImageUp, Plus, Save, X } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import LinkComponent from "@/components/ui/link";
import { SubmitButton } from "@/components/ui/submit-button";
import { idleFormState, type FormState } from "@/lib/actions/types";
import { cn } from "@/lib/utils";

type AlbumFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  /** Provided when editing an existing album. */
  album?: { title: string; coverImage: string };
};

export function AlbumForm({ action, album }: AlbumFormProps) {
  const [state, formAction] = useActionState(action, idleFormState);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Object URLs stay valid until they are revoked, so tie them to the preview.
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = () => {
    const file = inputRef.current?.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const clearFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setPreview(null);
  };

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="font-sans">
      <fieldset className="mb-6">
        <legend className="sr-only">Album Information</legend>

        <div className="mb-4 sm:mb-6">
          <label className="mb-2 block text-sm sm:text-base" htmlFor="title">
            Album Title{" "}
            <span className="text-accent" aria-label="required">
              *
            </span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={album?.title}
            aria-describedby={errors.title ? "title-error" : undefined}
            aria-invalid={errors.title ? "true" : "false"}
            className={cn(
              "w-full border-2 border-border p-2 text-sm sm:p-3 sm:text-base",
              errors.title && "border-red-500",
            )}
            placeholder="Enter album title..."
          />
          {errors.title ? (
            <p id="title-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.title[0]}
            </p>
          ) : (
            <small className="text-xs text-text">Choose a descriptive title for your album.</small>
          )}
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="mb-2 block text-sm sm:text-base" htmlFor="coverImage">
            Cover Image{" "}
            {album ? null : (
              <span className="text-accent" aria-label="required">
                *
              </span>
            )}
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              id="coverImage"
              name="coverImage"
              type="file"
              accept="image/*"
              required={!album}
              onChange={handleFileChange}
              aria-describedby={errors.coverImage ? "coverImage-error" : "coverImage-help"}
              aria-invalid={errors.coverImage ? "true" : "false"}
              className="hidden"
            />
            <label
              htmlFor="coverImage"
              className="flex min-h-[100px] w-full cursor-pointer items-center justify-center border-2 border-dashed border-border bg-gray-50 p-3 transition-colors duration-300 hover:border-accent hover:bg-accent/10 sm:min-h-[120px] sm:p-4"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2 text-3xl sm:text-4xl">
                  <ImageUp className="h-8 w-8 text-accent sm:h-10 sm:w-10" aria-hidden="true" />
                </div>
                <p className="text-center text-xs text-text sm:text-sm">
                  {album ? "Click here to select a new image" : "Click here to select an image"}
                </p>
              </div>
            </label>
            <small id="coverImage-help" className="mt-1 text-xs">
              Supported formats: JPG, PNG, WebP (max. 10MB).
              {album ? " Leave empty to keep current image." : null}
            </small>
            {errors.coverImage ? (
              <p id="coverImage-error" className="mt-1 text-sm text-red-500" role="alert">
                {errors.coverImage[0]}
              </p>
            ) : null}
          </div>
        </div>
      </fieldset>

      {album && !preview ? (
        <div className="mb-6">
          <p className="mb-2 text-sm text-text">Current cover image:</p>
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element -- unoptimised preview */}
            <img
              src={album.coverImage}
              alt="Current cover image"
              className="h-auto w-full max-w-md"
            />
          </div>
        </div>
      ) : null}

      {preview ? (
        <div className="relative mb-6">
          {album ? <p className="mb-2 text-sm text-text">New cover image preview:</p> : null}
          <div className="relative inline-block">
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remove selected image"
              className="absolute top-2 right-2 cursor-pointer rounded-full bg-black/50 p-1 text-white/60 transition-all duration-300 hover:translate-y-0.5 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element -- local blob: preview */}
            <img
              src={preview}
              alt="Cover Image"
              className={cn("h-auto w-full", album && "max-w-md")}
            />
          </div>
        </div>
      ) : null}

      {state.status === "error" && state.message ? (
        <p role="alert" className="mb-6 border border-red-200 bg-red-50 p-4 text-red-800">
          {state.message}
        </p>
      ) : null}

      <hr className="my-6" />

      <nav
        className="flex flex-col justify-end gap-3 sm:flex-row sm:gap-4"
        aria-label="Form actions"
      >
        <LinkComponent variant="outline-button" href="/admin/albums" className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Cancel
        </LinkComponent>
        <SubmitButton pendingLabel={album ? "Updating..." : "Creating..."}>
          {album ? (
            <Save className="mr-1 h-4 w-4" aria-hidden="true" />
          ) : (
            <Plus className="mr-1 h-4 w-4" aria-hidden="true" />
          )}
          {album ? "Update Album" : "Create Album"}
        </SubmitButton>
      </nav>
    </form>
  );
}
