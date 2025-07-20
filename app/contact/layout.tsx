import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contact Us - Angela's Dance Academy Naples, Florida | Dance Classes & Enrollment",
  description:
    "Contact Angela's Dance Academy in Naples, Florida for dance class information, enrollment, and studio visits. Located at 12840 Tamiami Trail N Suite 300. Call (239) 215-2888.",
  keywords: [
    "contact dance academy Naples",
    "dance school contact Naples Florida",
    "enroll dance classes Naples",
    "dance studio Naples FL contact",
    "dance academy phone number Naples",
    "dance classes enrollment Naples",
    "dance studio location Naples",
    "dance academy address Naples Florida",
    "dance school phone Naples",
    "dance studio hours Naples",
    "dance academy contact information Naples",
    "dance classes registration Naples",
    "dance studio visit Naples Florida",
    "dance academy inquiry Naples",
    "dance school information Naples",
  ],
  openGraph: {
    title: "Contact Us - Angela's Dance Academy Naples, Florida",
    description:
      "Contact Angela's Dance Academy in Naples, Florida for dance class information and enrollment. Visit us at 12840 Tamiami Trail N Suite 300.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
