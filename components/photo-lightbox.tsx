"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type LightboxPhoto = {
  id: number;
  filename: string;
  url: string;
};

type PhotoLightboxProps = {
  albumId: number;
  photos: LightboxPhoto[];
  currentPhotoId: number;
};

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

/** Full screen photo viewer used by the intercepted gallery route. */
export function PhotoLightbox({ albumId, photos, currentPhotoId }: PhotoLightboxProps) {
  const router = useRouter();
  const [zoom, setZoom] = useState(1);

  const currentIndex = photos.findIndex((photo) => photo.id === currentPhotoId);
  const photo = photos[currentIndex];

  const close = useCallback(() => router.back(), [router]);

  const goTo = useCallback(
    (offset: number) => {
      const target = photos[currentIndex + offset];

      if (target) {
        setZoom(1);
        router.replace(`/album/${albumId}/${target.id}`);
      }
    },
    [albumId, currentIndex, photos, router],
  );

  const changeZoom = useCallback((delta: number) => {
    setZoom((current) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, current + delta)));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const actions: Record<string, () => void> = {
        ArrowLeft: () => goTo(-1),
        ArrowRight: () => goTo(1),
        Escape: close,
        "+": () => changeZoom(ZOOM_STEP),
        "=": () => changeZoom(ZOOM_STEP),
        "-": () => changeZoom(-ZOOM_STEP),
        "0": () => setZoom(1),
      };

      const action = actions[event.key];

      if (action) {
        event.preventDefault();
        action();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [changeZoom, close, goTo]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!photo) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.filename}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
    >
      <div className="absolute top-0 right-0 left-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-white">
            <span className="text-sm opacity-80">
              {currentIndex + 1} of {photos.length}
            </span>
            <span aria-hidden className="text-xs opacity-60">
              |
            </span>
            <span className="text-xs opacity-60">{photo.filename}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeZoom(-ZOOM_STEP)}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              className="cursor-pointer rounded p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-50"
            >
              <ZoomOut className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => changeZoom(ZOOM_STEP)}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              className="cursor-pointer rounded p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-50"
            >
              <ZoomIn className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="cursor-pointer rounded p-2 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {currentIndex > 0 ? (
        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Previous image"
          className="absolute top-1/2 left-4 z-50 -translate-y-1/2 cursor-pointer rounded bg-black/50 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
      ) : null}

      {currentIndex < photos.length - 1 ? (
        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Next image"
          className="absolute top-1/2 right-4 z-50 -translate-y-1/2 cursor-pointer rounded bg-black/50 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      ) : null}

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Image
          key={photo.id}
          src={photo.url}
          alt={photo.filename}
          width={1600}
          height={1200}
          sizes="100vw"
          priority
          style={{ transform: `scale(${zoom})` }}
          className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 ease-in-out"
        />
      </div>

      {zoom !== 1 ? (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-sm text-white backdrop-blur-sm">
          {Math.round(zoom * 100)}%
        </p>
      ) : null}
    </div>
  );
}
