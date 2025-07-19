"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import LinkComponent from "@/components/ui/link";
import { LogOut, Plus, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();
  return (
    <nav className="flex flex-col sm:flex-row gap-2 sm:gap-x-4 font-sans text-sm w-full sm:w-auto">
      <LinkComponent
        variant="default-button"
        href="/admin/albums/add"
        className="w-full sm:w-auto"
      >
        <Plus className="w-4 h-4" />
        Add New Album
      </LinkComponent>
      <LinkComponent
        variant="default-button"
        href="/admin/schedule"
        className="w-full sm:w-auto"
      >
        <Calendar className="w-4 h-4" />
        Manage Schedule
      </LinkComponent>
      <Button
        variant="outline"
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/");
              },
            },
          })
        }
        className="w-full sm:w-auto"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </nav>
  );
}
