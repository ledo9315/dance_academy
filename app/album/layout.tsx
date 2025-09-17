import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/album",
  },
  openGraph: {
    url: "https://angelasdanceacademy.com/album",
  },
};

export default function AlbumLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
