import "server-only";

import { z } from "zod";

/**
 * Server side environment contract. Parsed once at module load so a missing or
 * malformed variable fails the build instead of a random request at runtime.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
  BLOB_READ_WRITE_TOKEN: z.string().min(1, "BLOB_READ_WRITE_TOKEN is required for uploads"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required for the contact form"),
  // Optional overrides; the defaults are the addresses the contact form has
  // always used.
  CONTACT_FROM_EMAIL: z
    .string()
    .min(1)
    .default("Angela's Dance Academy <noreply@angelasdanceacademy.com>"),
  CONTACT_TO_EMAIL: z.email().default("angelasdanceacademy@gmail.com"),
  BETTER_AUTH_URL: z.url().optional(),
});

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map(
    (issue) => `  - ${issue.path.join(".")}: ${issue.message}`,
  );
  throw new Error(`Invalid environment configuration:\n${issues.join("\n")}`);
}

export const env = parsed.data;
