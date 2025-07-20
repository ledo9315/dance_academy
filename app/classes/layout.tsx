import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dance Classes & Programs - Angela's Dance Academy Naples, Florida",
  description:
    "Discover our comprehensive dance programs for all ages in Naples, Florida. From pre-dance for toddlers to competitive teams, we offer ballet, jazz, contemporary, and hip hop classes. 4.9★ rated dance academy.",
  keywords: [
    "dance classes Naples FL",
    "ballet classes Naples Florida",
    "jazz dance classes Naples",
    "children dance classes Naples",
    "competitive dance team Naples",
    "dance programs Naples Florida",
    "dance lessons Naples",
    "pre-dance program Naples",
    "toddler dance classes Naples",
    "teen dance classes Naples",
    "dance training Naples FL",
    "ballet lessons Naples",
    "jazz dance Naples",
    "contemporary dance Naples",
    "hip hop dance classes Naples",
    "dance academy programs Naples",
    "dance studio classes Naples Florida",
    "dance education Naples",
    "dance technique Naples",
    "dance performance Naples",
  ],
  openGraph: {
    title: "Dance Classes & Programs - Angela's Dance Academy Naples, Florida",
    description:
      "Comprehensive dance programs for all ages in Naples, Florida. From pre-dance to competitive teams. 4.9★ rated dance academy.",
    images: ["/classes-3.jpg"],
  },
};

export default function ClassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
