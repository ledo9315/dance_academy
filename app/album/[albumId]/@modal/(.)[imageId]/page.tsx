"use client";

import Image from "next/image";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

const InterceptedImageModal = ({
  params,
}: {
  params: Promise<{ albumId: string; imageId: string }>;
}) => {
  const { albumId, imageId } = use(params);
  const router = useRouter();
  const [photo, setPhoto] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoRes = await fetch(
          `/api/albums/${albumId}/photos/${imageId}`
        );
        const photoData = await photoRes.json();

        const photosRes = await fetch(`/api/albums/${albumId}/photos`);
        const photosData = await photosRes.json();

        setPhoto(photoData.photo);
        setPhotos(photosData.photos);
      } catch (error) {
        console.error("Error fetching photo data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [albumId, imageId]);

  const handleClose = () => {
    setZoom(1);
    router.back();
  };

  const currentIndex = photos.findIndex((p) => p.id === parseInt(imageId));

  const navigateToImage = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setZoom(1);
      router.replace(`/album/${albumId}/${photos[currentIndex - 1].id}`);
    } else if (direction === "next" && currentIndex < photos.length - 1) {
      setZoom(1);
      router.replace(`/album/${albumId}/${photos[currentIndex + 1].id}`);
    }
  };

  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in" && zoom < 3) {
      setZoom((prev) => Math.min(prev + 0.5, 3));
    } else if (direction === "out" && zoom > 0.5) {
      setZoom((prev) => Math.max(prev - 0.5, 0.5));
    }
  };

  const resetView = () => {
    setZoom(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateToImage("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateToImage("next");
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoom("in");
      } else if (e.key === "-") {
        e.preventDefault();
        handleZoom("out");
      } else if (e.key === "0") {
        e.preventDefault();
        resetView();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, photos, albumId, router, zoom]);

  const LoadingOrError = (message: string) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-white text-xl font-medium bg-black/50 px-6 py-4 rounded-lg backdrop-blur-sm">
        {message}
      </div>
    </div>
  );

  if (loading) return LoadingOrError("Loading...");
  if (!photo) return LoadingOrError("Photo not found");

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      {/* Header mit Steuerungen */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <span className="text-sm opacity-80">
              {currentIndex + 1} of {photos.length}
            </span>
            <span className="text-xs opacity-60">|</span>
            <span className="text-xs opacity-60">{photo.filename}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleZoom("out")}
              disabled={zoom <= 0.5}
              className="text-white hover:bg-white/20 p-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom("in")}
              disabled={zoom >= 3}
              className="text-white hover:bg-white/20 p-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 p-2 rounded transition-colors cursor-pointer"
              title="Close (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={() => navigateToImage("prev")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm p-3 rounded transition-colors cursor-pointer"
          title="Previous Image (←)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button
          onClick={() => navigateToImage("next")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm p-3 rounded transition-colors cursor-pointer"
          title="Next Image (→)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Bild Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <img
          src={photo.path}
          alt={photo.filename}
          className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
          style={{
            transform: `scale(${zoom})`,
            cursor: zoom > 1 ? "grab" : "default",
          }}
          draggable={zoom > 1}
        />
      </div>

      {/* Zoom Indicator */}
      {zoom !== 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {Math.round(zoom * 100)}%
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity">
        <div className="font-medium mb-1">Keyboard Shortcuts:</div>
        <div>← → Navigation</div>
        <div>+ - Zoom</div>
        <div>0 Reset</div>
        <div>ESC Close</div>
      </div>
    </div>
  );
};

export default InterceptedImageModal;
