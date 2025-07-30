import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to determine if an image URL is a base64 string
export function isBase64Image(url: string): boolean {
  return url.startsWith("data:image/");
}

// Helper function to get the correct image source
export function getImageSource(url: string): string {
  if (isBase64Image(url)) {
    return url; // Base64 strings work directly
  }
  return url; // Vercel Blob URLs work directly
}
