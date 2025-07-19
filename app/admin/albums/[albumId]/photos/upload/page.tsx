"use client";

import { Button } from "@/components/ui/button";
import LinkComponent from "@/components/ui/link";
import { ArrowLeft, ImageUp, Plus, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
  photo: FileList;
}

export default function UploadPhotos() {
  const { albumId } = useParams<{ albumId: string }>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "onSubmit",
  });

  const photoFiles = watch("photo");

  const photos = photoFiles || null;

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      const formData = new FormData();
      Array.from(photos).forEach((photo) => {
        formData.append("photos", photo);
      });

      formData.append("albumId", albumId);

      const response = await fetch(`/api/albums/${albumId}/photos`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload photos");
      }

      const result = await response.json();
      reset();

      router.push(`/admin/albums/${albumId}/photos`);

      return result;
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };

  const removePhoto = (indexToRemove: number) => {
    if (!photos) return;

    const newPhotos = Array.from(photos).filter((_, i) => i !== indexToRemove);

    const dataTransfer = new DataTransfer();
    newPhotos.forEach((photo) => dataTransfer.items.add(photo));

    setValue("photo", dataTransfer.files);
  };

  const validateFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > 10 * 1024 * 1024) {
        return `File ${file.name} is too large (max 10MB)`;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        return `File ${file.name} is not a valid image type`;
      }
    }

    return true;
  };

  return (
    <main className="container px-4 sm:px-6 lg:px-8" role="main">
      <nav
        className="mb-6 sm:mb-8 md:mb-12 px-4 md:px-0"
        aria-label="Breadcrumb"
      >
        <ol className="flex space-x-1 font-sans text-sm" role="list">
          <li>
            <Link
              className="text-accent"
              href={`/admin/albums/${albumId}/photos`}
            >
              Album Photos
            </Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">
            /
          </li>
          <li aria-current="page">Upload Photos</li>
        </ol>
      </nav>

      <section
        className="border-2 border-border p-4 sm:p-8 md:p-12 lg:p-20 max-w-4xl mx-auto"
        aria-labelledby="album-form-heading"
      >
        <header className="mb-8 sm:mb-10 md:mb-12">
          <h1
            id="album-form-heading"
            className="text-xl sm:text-2xl mb-3 sm:mb-4"
          >
            Upload Photos
          </h1>
          <p className="text-text font-sans text-sm sm:text-base">
            Upload multiple photos to your album. Select one or more images
            below.
          </p>
          <hr className="mt-4 sm:mt-6" />
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="font-sans"
        >
          <fieldset className="mb-6">
            <legend className="sr-only">Photo Information</legend>

            <div className="mb-4 sm:mb-6">
              <label
                className="block mb-2 text-sm sm:text-base"
                htmlFor="photo"
              >
                Photos{" "}
                <span className="text-accent" aria-label="required">
                  *
                </span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  multiple
                  className="hidden"
                  aria-describedby={errors.photo ? "photo-error" : "photo-help"}
                  aria-invalid={errors.photo ? "true" : "false"}
                  {...register("photo", {
                    validate: validateFiles,
                  })}
                />
                <label
                  htmlFor="photo"
                  className="w-full border-2 border-border border-dashed p-3 sm:p-4 cursor-pointer hover:border-accent transition-colors duration-300 flex items-center justify-center min-h-[100px] sm:min-h-[120px] bg-gray-50 hover:bg-accent/10"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-3xl sm:text-4xl mb-2">
                      <ImageUp
                        className="w-8 h-8 sm:w-10 sm:h-10 text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-text text-center">
                      Click here to select photos
                    </p>
                    {photos && photos.length > 0 && (
                      <p className="text-xs text-accent mt-1">
                        {photos.length} photo(s) selected
                      </p>
                    )}
                  </div>
                </label>
                <small id="photo-help" className="text-xs mt-1">
                  Supported formats: JPG, PNG, WebP (max. 10MB each).
                </small>
                {errors.photo && (
                  <p
                    id="photo-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {errors.photo.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Photo Preview Grid */}
          {photos && photos.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                Selected Photos ({photos.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {Array.from(photos).map((photo: File, index: number) => (
                  <div className="relative group" key={index}>
                    <div className="aspect-square overflow-hidden border border-border">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white p-0.5 sm:p-1 rounded-full hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                      aria-label={`Remove photo ${index + 1}`}
                    >
                      <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </button>
                    <div className="mt-1 sm:mt-2 text-xs text-gray-600">
                      <p className="truncate">{photo.name}</p>
                      <p>{(photo.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <hr className="my-6" />

          <nav
            className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4"
            aria-label="Form actions"
          >
            <LinkComponent
              variant="outline-button"
              href={`/admin/albums/${albumId}/photos`}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1" aria-hidden="true" /> Cancel
            </LinkComponent>
            <Button
              type="submit"
              disabled={isSubmitting || !photos || photos.length === 0}
              aria-describedby="submit-status"
            >
              <Plus className="w-4 h-4 mr-1" aria-hidden="true" />
              {isSubmitting
                ? "Uploading..."
                : `Upload ${photos?.length || 0} Photo${
                    photos?.length !== 1 ? "s" : ""
                  }`}
            </Button>
          </nav>

          {isSubmitting && (
            <p id="submit-status" className="sr-only" role="status">
              Uploading photos, please wait...
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
