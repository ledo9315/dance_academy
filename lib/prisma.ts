import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";

import { withVerifiedTls } from "@/lib/database-url";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { env } from "@/lib/env";

const createPrismaClient = () =>
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: withVerifiedTls(env.DATABASE_URL) }),
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

/**
 * Next.js clears the module registry on every hot reload, which would open a new
 * pool of database connections each time. Caching the client on `globalThis`
 * keeps exactly one instance alive in development.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
