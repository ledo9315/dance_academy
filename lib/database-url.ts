/**
 * `pg` currently treats the SSL modes `prefer`, `require` and `verify-ca` as
 * aliases for `verify-full`, but announces that it will adopt libpq semantics
 * in v9 — where those modes encrypt without verifying the server certificate.
 * Spelling out `verify-full` keeps today's behaviour and makes sure the
 * connection cannot silently weaken on a future upgrade.
 *
 * Connection strings without an `sslmode` (a local server, typically) and
 * `sslmode=disable` are left untouched.
 */
const ALIASED_MODES = new Set(["prefer", "require", "verify-ca"]);

export function withVerifiedTls(connectionString: string): string {
  const url = new URL(connectionString);
  const sslMode = url.searchParams.get("sslmode");

  if (sslMode && ALIASED_MODES.has(sslMode)) {
    url.searchParams.set("sslmode", "verify-full");
  }

  return url.toString();
}
