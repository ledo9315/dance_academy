"use client";

import { useSyncExternalStore, type ReactNode } from "react";

/** The hydration flag never changes, so the store needs no real subscription. */
const subscribe = () => () => {};

/**
 * Renders its children only after hydration. Used for the third-party iframes,
 * which need a JavaScript-enabled browser — the surrounding markup stays the
 * no-script fallback.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const isHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return isHydrated ? <>{children}</> : null;
}
