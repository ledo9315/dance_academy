import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Dance Classes for Kids & Teens 3–18 – Programs | Angela's Dance Academy",
  description:
    "Dance classes for kids & teens ages 3–18 in Naples, FL. Ballet, Jazz, Hip Hop, Contemporary, Technique. Professional instructors and supportive programs.",
  keywords: [
    "dance classes kids teens Naples FL",
    "ballet classes kids Naples",
    "jazz hip hop teens Naples",
    "contemporary dance Naples Florida",
  ],
  alternates: {
    canonical: "/classes",
  },
  openGraph: {
    title: "Dance Classes (Ages 3–18) – Angela's Dance Academy Naples, Florida",
    description:
      "Programs for kids & teens ages 3–18: Ballet, Jazz, Hip Hop, Contemporary, Technique.",
    images: ["/classes-3.jpg"],
  },
};

export default function ClassesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
