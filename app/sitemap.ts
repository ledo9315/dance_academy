import type { MetadataRoute } from "next";

import { listAlbums } from "@/lib/queries/albums";
import { site } from "@/lib/site";

const STATIC_ROUTES: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/classes", changeFrequency: "weekly", priority: 0.9 },
  { path: "/schedule", changeFrequency: "weekly", priority: 0.8 },
  { path: "/album", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
];

export const revalidate = 3600;

/** Album URLs are best effort: an unreachable database must not break the build. */
async function albumRoutes() {
  try {
    return await listAlbums();
  } catch (error) {
    console.error("Could not load albums for the sitemap", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const albums = await albumRoutes();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: new URL(route.path, site.url).toString(),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...albums.map((album) => ({
      url: new URL(`/album/${album.id}`, site.url).toString(),
      lastModified: album.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
