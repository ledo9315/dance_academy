"use client";

import { Calendar, Images, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function AdminNav() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <nav
      aria-label="Admin"
      className="flex w-full flex-col gap-2 font-sans text-sm sm:w-auto sm:flex-row sm:gap-x-4"
    >
      <Button asChild variant="outline">
        <Link href="/admin/albums">
          <Images className="h-4 w-4" aria-hidden />
          Albums
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/admin/schedule">
          <Calendar className="h-4 w-4" aria-hidden />
          Schedule
        </Link>
      </Button>
      <Button variant="outline" onClick={handleSignOut} disabled={isSigningOut}>
        <LogOut className="h-4 w-4" aria-hidden />
        {isSigningOut ? "Signing out..." : "Logout"}
      </Button>
    </nav>
  );
}
