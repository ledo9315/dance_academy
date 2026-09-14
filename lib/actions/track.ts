"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

const trackSchema = z.object({
  from: z.url().max(2048),
  to: z.url().max(2048),
});

/**
 * Records which external site sent a visitor to a given page. Same-origin
 * navigations are filtered out on the client, so every row is a real referral.
 */
export async function trackReferral(input: { from: string; to: string }): Promise<void> {
  const parsed = trackSchema.safeParse(input);

  if (!parsed.success) {
    return;
  }

  if (!checkRateLimit(`track:${parsed.data.from}`, 60, 60 * 1000)) {
    return;
  }

  try {
    await prisma.track.create({ data: parsed.data });
  } catch (error) {
    console.error("Failed to record referral", error);
  }
}
