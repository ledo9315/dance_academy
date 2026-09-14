/**
 * Creates an admin account.
 *
 *   npx tsx scripts/create-admin.ts "Angela" angela@example.com "a-strong-password"
 *
 * Public sign-up is disabled on the live auth instance, so this script spins up
 * an identical instance with sign-up enabled just long enough to create the user.
 */
import "dotenv/config";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

import { withVerifiedTls } from "../lib/database-url";

import { PrismaClient } from "../lib/generated/prisma/client";

const [name, email, password] = process.argv.slice(2);

if (!name || !email || !password) {
  console.error('Usage: tsx scripts/create-admin.ts "<name>" <email> <password>');
  process.exit(1);
}

if (password.length < 12) {
  console.error("Please choose a password with at least 12 characters.");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: withVerifiedTls(process.env.DATABASE_URL ?? "") }),
});

const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
});

try {
  await auth.api.signUpEmail({ body: { name, email, password } });
  console.log(`Created admin account for ${email}.`);
} catch (error) {
  console.error("Could not create the account:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
