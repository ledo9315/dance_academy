import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Schedule – Dance Classes for Kids & Teens 3–18 | Angela's Dance Academy",
  description:
    "Weekly class schedule for kids and teens (ages 3–18) at Angela's Dance Academy in Naples, FL. Find ballet, jazz, hip hop, and more.",
  alternates: {
    canonical: "/schedule",
  },
  openGraph: {
    url: "https://angelasdanceacademy.com/schedule",
    title: "Class Schedule – Angela's Dance Academy Naples, FL | Ages 3–18",
    description:
      "View our weekly schedule for dance classes tailored to kids and teens ages 3–18.",
    images: [
      {
        url: "/6.jpg",
        width: 1200,
        height: 630,
        alt: "Dance class schedule – Angela's Dance Academy",
      },
    ],
  },
};

export default function ScheduleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
