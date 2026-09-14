"use client";

import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

/**
 * Click-to-play facade. The YouTube player is only loaded once a visitor asks
 * for it, which keeps third-party scripts off the initial page load.
 */
export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="aspect-video w-full"
      />
    );
  }

  return (
    <div className="flex aspect-video flex-col items-center justify-center bg-gray-50 p-4 text-center sm:p-8">
      <Play width={40} height={40} className="text-accent sm:h-[60px] sm:w-[60px]" aria-hidden />
      <h3 className="mt-2 mb-2 text-lg text-gray-800 sm:mt-4 sm:mb-4 sm:text-xl">
        Watch Our Premier Dance Studio Video
      </h3>
      <p className="mb-4 font-sans text-sm text-text sm:mb-6 sm:text-base">
        Experience the energy and passion of our Naples dance studio where students discover the joy
        of dance
      </p>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="inline-flex cursor-pointer items-center bg-accent px-4 py-2 font-sans text-xs text-white transition-colors hover:bg-accent-dark active:translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm"
        >
          <Play width={16} height={16} className="mr-2" aria-hidden />
          Play video
        </button>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-sans text-xs text-accent transition-colors hover:text-accent-dark sm:text-sm"
        >
          <ExternalLink width={16} height={16} className="mr-2" aria-hidden />
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}
