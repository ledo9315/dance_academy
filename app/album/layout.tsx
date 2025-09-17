import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery – Dance Classes for Kids & Teens 3–18 | Naples, FL",
  description:
    "Explore our gallery of performances, competitions, and studio moments from Angela's Dance Academy. See kids & teens (ages 3–18) in action.",
  alternates: {
    canonical: "/album",
  },
  openGraph: {
    url: "https://angelasdanceacademy.com/album",
    title: "Gallery – Angela's Dance Academy Naples, FL | Kids & Teens 3–18",
    description:
      "Photos from our dance classes and events featuring kids and teens ages 3–18.",
    images: [
      {
        url: "/gallery-background.jpg",
        width: 1200,
        height: 630,
        alt: "Dance gallery – Angela's Dance Academy",
      },
    ],
  },
};

export default function AlbumLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
