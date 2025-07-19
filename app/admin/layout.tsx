import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then(({ headers }) => headers()),
  });

  if (!session) {
    redirect("/admin/login");
  }

  return <div className="min-h-screen bg-background">{children}</div>;
}
