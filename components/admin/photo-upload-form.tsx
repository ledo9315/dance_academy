"use client";

import { ArrowLeft, ImageUp, Plus, X } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import LinkComponent from "@/components/ui/link";
import { SubmitButton } from "@/components/ui/submit-button";
import { idleFormState, type FormState } from "@/lib/actions/types";

type SelectedPhoto = {
  name: string;
  size: number;
  previewUrl: string;
};

type PhotoUploadFormProps = {
  albumId: number;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

export function PhotoUploadForm({ albumId, action }: PhotoUploadFormProps) {
  const [state, formAction] = useActionState(action, idleFormState);
  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Object URLs stay valid until they are revoked, so tie them to the preview.
  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, [photos]);

  const readSelection = () => {
    const files = Array.from(inputRef.current?.files ?? []);

    setPhotos(
      files.map((file) => ({
        name: file.name,
        size: file.size,
        previewUrl: URL.createObjectURL(file),
      })),
    );
  };

  const removePhoto = (indexToRemove: number) => {
    const input = inputRef.current;

    if (!input?.files) {
      return;
    }

    const transfer = new DataTransfer();
    Array.from(input.files)
      .filter((_, index) => index !== indexToRemove)
      .forEach((file) => transfer.items.add(file));

    input.files = transfer.files;
    readSelection();
  };

  return (
    <form action={formAction} noValidate className="font-sans">
      <fieldset className="mb-6">
        <legend className="sr-only">Photos</legend>

        <div className="mb-4 sm:mb-6">
          <label className="mb-2 block text-sm sm:text-base" htmlFor="photos">
            Photos{" "}
            <span className="text-accent" aria-label="required">
              *
            </span>
          </label>
          <input
            ref={inputRef}
            id="photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            required
            onChange={readSelection}
            aria-describedby="photo-help"
            className="hidden"
          />
          <label
            htmlFor="photos"
            className="flex min-h-[100px] w-full cursor-pointer items-center justify-center border-2 border-dashed border-border bg-gray-50 p-3 transition-colors duration-300 hover:border-accent hover:bg-accent/10 sm:min-h-[120px] sm:p-4"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 text-3xl sm:text-4xl">
                <ImageUp className="h-8 w-8 text-accent sm:h-10 sm:w-10" aria-hidden="true" />
              </div>
              <p className="text-center text-xs text-text sm:text-sm">
                Click here to select images
              </p>
            </div>
          </label>
          <small id="photo-help" className="mt-1 text-xs">
            Supported formats: JPG, PNG, WebP (max. 10MB each).
          </small>
        </div>
      </fieldset>

      {photos.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h3 className="mb-3 text-base font-medium sm:mb-4 sm:text-lg">
            Selected Photos ({photos.length})
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {photos.map((photo, index) => (
              <div className="group relative" key={photo.previewUrl}>
                <div className="aspect-square overflow-hidden border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local blob: preview */}
                  <img
                    src={photo.previewUrl}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-1 -right-1 cursor-pointer rounded-full bg-red-500 p-0.5 text-white opacity-0 transition-colors duration-200 group-hover:opacity-100 hover:bg-red-600 sm:-top-2 sm:-right-2 sm:p-1"
                  aria-label={`Remove photo ${index + 1}`}
                >
                  <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </button>
                <div className="mt-1 text-xs text-gray-600 sm:mt-2">
                  <p className="truncate">{photo.name}</p>
                  <p>{(photo.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
        <LinkComponent
          variant="outline-button"
          href={`/admin/albums/${albumId}/photos`}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Cancel
        </LinkComponent>
        <SubmitButton pendingLabel="Uploading...">
          <Plus className="mr-1 h-4 w-4" aria-hidden="true" />
          {`Upload ${photos.length} Photo${photos.length === 1 ? "" : "s"}`}
        </SubmitButton>
      </nav>
    </form>
  );
}
