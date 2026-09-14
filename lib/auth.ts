import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

const baseURL = env.BETTER_AUTH_URL ?? site.url;

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL,
  // BETTER_AUTH_URL points at the live domain in every environment, so local
  // development needs its own origin on the allow list to sign in.
  trustedOrigins: env.NODE_ENV === "production" ? [baseURL] : [baseURL, "http://localhost:3000"],
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    // The admin area is invite-only; accounts are created manually.
    disableSignUp: true,
  },
});

export type Session = typeof auth.$Infer.Session;

/** Returns the current session, or `null` for anonymous visitors. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Guards server components and server actions. Redirects to the login page when
 * no valid session is present.
 */
export async function requireSession() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}
