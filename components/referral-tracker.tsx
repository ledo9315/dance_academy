"use client";

import { useEffect } from "react";

import { trackReferral } from "@/lib/actions/track";

/**
 * Reports which external site a visitor arrived from, once per page load.
 * Same-origin navigations and direct visits are ignored.
 */
export function ReferralTracker() {
  useEffect(() => {
    const referrer = document.referrer;

    if (!referrer || new URL(referrer).origin === window.location.origin) {
      return;
    }

    void trackReferral({ from: referrer, to: window.location.href });
  }, []);

  return null;
}
