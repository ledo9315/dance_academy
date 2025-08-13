"use client";

import { useEffect } from "react";

export default function useReferrerTracking() {
  useEffect(() => {
    const from = document.referrer || "direkt";

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: window.location.href,
      }),
    });
  }, []);
}
