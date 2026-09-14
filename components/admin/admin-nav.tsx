"use client";

import { Calendar, LogOut, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import LinkComponent from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function AdminNav() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <nav className="flex w-full flex-col gap-2 font-sans text-sm sm:w-auto sm:flex-row sm:gap-x-4">
      <LinkComponent variant="default-button" href="/admin/albums/add" className="w-full sm:w-auto">
        <Plus className="mr-1 h-4 w-4" />
        Add New Album
      </LinkComponent>
      <LinkComponent variant="default-button" href="/admin/schedule" className="w-full sm:w-auto">
        <Calendar className="mr-2 h-4 w-4" />
        Manage Schedule
      </LinkComponent>
      <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </nav>
  );
}
