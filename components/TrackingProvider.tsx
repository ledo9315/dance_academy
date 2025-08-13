"use client";

import { PropsWithChildren } from "react";
import useReferrerTracking from "@/hooks/useReferrer";

export function TrackingProvider({ children }: PropsWithChildren) {
  useReferrerTracking();
  return <>{children}</>;
}

export default TrackingProvider;
