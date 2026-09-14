import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for Angela's Dance Academy staff and instructors.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ redirectTo?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirectTo } = await searchParams;

  if (await getSession()) {
    redirect("/admin/albums");
  }

  // Only same-site paths are accepted, so the parameter cannot be used for
  // an open redirect.
  const target = redirectTo?.startsWith("/") ? redirectTo : "/admin/albums";

  return (
    <main className="m-24 mx-auto flex w-full max-w-lg flex-col items-center justify-center px-4 py-0 md:border-2 md:border-border md:p-16">
      <header>
        <h1 className="mb-4 text-center text-2xl">Admin Login</h1>
        <p className="mb-12 border-b border-border pb-6 text-center font-sans text-text">
          Access the admin dashboard to manage your gallery.
        </p>
      </header>

      <LoginForm redirectTo={target} />
    </main>
  );
}
