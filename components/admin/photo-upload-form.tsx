"use client";

import { ArrowLeft, ImageUp, X } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { idleFormState, type FormState } from "@/lib/actions/types";

type PhotoUploadFormProps = {
  albumId: number;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

export function PhotoUploadForm({ albumId, action }: PhotoUploadFormProps) {
  const [state, formAction] = useActionState(action, idleFormState);
  const [previews, setPreviews] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setPreviews(files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })));
  };

  return (
    <form action={formAction} noValidate className="font-sans">
      <div className="mb-6">
        <label className="mb-2 block text-sm sm:text-base" htmlFor="photos">
          Photos <span className="text-accent">*</span>
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          required
          onChange={handleChange}
          className="hidden"
        />
        <label
          htmlFor="photos"
          className="flex min-h-[100px] w-full cursor-pointer items-center justify-center border-2 border-dashed border-border bg-gray-50 p-3 transition-colors duration-300 hover:border-accent hover:bg-accent/10 sm:min-h-[120px] sm:p-4"
        >
          <span className="flex flex-col items-center justify-center">
            <ImageUp className="mb-2 h-8 w-8 text-accent sm:h-10 sm:w-10" aria-hidden />
            <span className="text-center text-xs text-text sm:text-sm">
              Click here to select one or more images
            </span>
          </span>
        </label>
        <small className="mt-1 block text-xs">
          Supported formats: JPG, PNG, WebP, AVIF, GIF (max. 10 MB each).
        </small>
      </div>

      {previews.length > 0 ? (
        <ul className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((preview) => (
            <li key={preview.url} className="border-2 border-border">
              {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URLs cannot be optimised */}
              <img src={preview.url} alt="" className="h-28 w-full object-cover" />
              <p className="truncate p-1 text-xs text-muted-foreground" title={preview.name}>
                {preview.name}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {state.status === "error" && state.message ? (
        <p role="alert" className="mb-6 border border-red-200 bg-red-50 p-4 text-red-800">
          {state.message}
        </p>
      ) : null}

      <hr className="my-6" />

      <div className="flex flex-col justify-end gap-3 sm:flex-row sm:gap-4">
        <Button asChild variant="outline">
          <Link href={`/admin/albums/${albumId}/photos`}>
            <ArrowLeft className="h-4 w-4" aria-hidden /> Cancel
          </Link>
        </Button>
        <SubmitButton pendingLabel="Uploading...">Upload Photos</SubmitButton>
      </div>

      {previews.length > 0 ? (
        <Button type="button" variant="outline" className="mt-4" onClick={() => setPreviews([])}>
          <X className="h-4 w-4" aria-hidden />
          Clear preview
        </Button>
      ) : null}
    </form>
  );
}
