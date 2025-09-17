import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/schedule",
  },
  openGraph: {
    url: "https://angelasdanceacademy.com/schedule",
  },
};

export default function ScheduleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
