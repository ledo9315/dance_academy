import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL ?? site.url,
  trustedOrigins: [env.BETTER_AUTH_URL ?? site.url],
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
