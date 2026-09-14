import type { Metadata } from "next";

import { requireSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Authoritative guard; the proxy only performs an optimistic cookie check.
  await requireSession();

  return <div className="min-h-screen bg-background">{children}</div>;
}
