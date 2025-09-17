import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for Angela's Dance Academy staff and instructors.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
