"use client";

import { Button } from "@/components/ui/button";
import LinkComponent from "@/components/ui/link";
import { ArrowLeft, ImageUp, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  coverImage: FileList;
}

export default function AddAlbum() {
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

  const coverImageFiles = watch("coverImage");
  const coverImage = coverImageFiles?.[0] || null;

  const onSubmit = async (data: FormData) => {
    try {
      reset();
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("coverImage", coverImage);

      const response = await fetch("/api/albums", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create album");
      }

      if (response.ok) {
        router.push("/admin/albums");
      }

      return response.json();
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  return (
    <main className="container px-4 sm:px-6 lg:px-8" role="main">
      <nav
        className="mb-6 sm:mb-8 md:mb-12 px-4 sm:px-0"
        aria-label="Breadcrumb"
      >
        <ol className="flex space-x-1 font-sans text-sm" role="list">
          <li>
            <Link className="text-accent" href="/admin/albums">
              Album Management
            </Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">
            /
          </li>
          <li aria-current="page">Add Album</li>
        </ol>
      </nav>

      <section
        className="md:border-2 md:border-border p-4 sm:p-8 md:p-12 lg:p-20 max-w-4xl mx-auto"
        aria-labelledby="album-form-heading"
      >
        <header className="mb-8 sm:mb-10 md:mb-12">
          <h1
            id="album-form-heading"
            className="text-xl sm:text-2xl mb-3 sm:mb-4"
          >
            Create New Album
          </h1>
          <p className="text-text font-sans text-sm sm:text-base">
            Add a new album to your gallery collection. Fill in the details
            below and upload a cover image.
          </p>
          <hr className="mt-4 sm:mt-6" />
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="font-sans"
        >
          <fieldset className="mb-6">
            <legend className="sr-only">Album Information</legend>

            <div className="mb-4 sm:mb-6">
              <label
                className="block mb-2 text-sm sm:text-base"
                htmlFor="title"
              >
                Album Title{" "}
                <span className="text-accent" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="text"
                id="title"
                className={`w-full border-2 border-border p-2 sm:p-3 text-sm sm:text-base ${
                  errors.title ? "border-red-500" : ""
                }`}
                placeholder="Enter album title..."
                aria-describedby={errors.title ? "title-error" : undefined}
                aria-invalid={errors.title ? "true" : "false"}
                {...register("title", {
                  required: "Album title is required",
                  minLength: {
                    value: 2,
                    message: "Title must be at least 2 characters",
                  },
                })}
              />
              {!errors.title && (
                <small className="text-xs text-text">
                  Choose a descriptive title for your album.
                </small>
              )}
              {errors.title && (
                <p
                  id="title-error"
                  className="text-red-500 text-sm mt-1"
                  role="alert"
                >
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="mb-4 sm:mb-6">
              <label
                className="block mb-2 text-sm sm:text-base"
                htmlFor="coverImage"
              >
                Cover Image{" "}
                <span className="text-accent" aria-label="required">
                  *
                </span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  className="hidden"
                  aria-describedby={
                    errors.coverImage ? "coverImage-error" : "coverImage-help"
                  }
                  aria-invalid={errors.coverImage ? "true" : "false"}
                  {...register("coverImage", {
                    required: "Cover image is required",
                    validate: {
                      fileSize: (files) => {
                        if (files && files[0]) {
                          return (
                            files[0].size <= 10 * 1024 * 1024 ||
                            "File size must be less than 10MB"
                          );
                        }
                        return true;
                      },
                      fileType: (files) => {
                        if (files && files[0]) {
                          const validTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/gif",
                            "image/webp",
                          ];
                          return (
                            validTypes.includes(files[0].type) ||
                            "Please select a valid image file (PNG, JPG, GIF, WEBP)"
                          );
                        }
                        return true;
                      },
                    },
                  })}
                />
                <label
                  htmlFor="coverImage"
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
                      Click here to select an image
                    </p>
                  </div>
                </label>
                <small id="coverImage-help" className="text-xs mt-1">
                  Supported formats: JPG, PNG, WebP (max. 10MB).
                </small>
                {errors.coverImage && (
                  <p
                    id="coverImage-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {errors.coverImage.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {coverImage && (
            <div className="mb-6 relative">
              <div
                onClick={() => setValue("coverImage", null as any)}
                className="absolute right-2 top-2 bg-black/50 p-1 rounded-full text-white/60 hover:text-white hover:translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </div>
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Cover Image"
                className="w-full h-auto"
              />
            </div>
          )}
          <hr className="my-6" />

          <nav
            className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4"
            aria-label="Form actions"
          >
            <LinkComponent
              variant="outline-button"
              href="/admin/albums"
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1" aria-hidden="true" /> Cancel
            </LinkComponent>
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-describedby="submit-status"
            >
              <Plus className="w-4 h-4 mr-1" aria-hidden="true" />
              {isSubmitting ? "Creating..." : "Create Album"}
            </Button>
          </nav>

          {isSubmitting && (
            <p id="submit-status" className="sr-only" role="status">
              Creating album, please wait...
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
