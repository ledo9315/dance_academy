import type { Metadata } from "next";

import { AdminNav } from "@/components/admin/admin-nav";
import { requireSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Authoritative guard; the proxy only performs an optimistic cookie check.
  await requireSession();

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center sm:gap-0 sm:py-8 md:py-12">
          <p className="text-2xl sm:text-3xl">Administration</p>
          <AdminNav />
        </header>
      </div>
      {children}
    </div>
  );
}
