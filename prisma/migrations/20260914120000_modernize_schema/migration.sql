-- Widen URL columns: blob URLs regularly exceed the previous VARCHAR limits.
ALTER TABLE "albums" ALTER COLUMN "coverImage" TYPE TEXT;
ALTER TABLE "track" ALTER COLUMN "from" TYPE TEXT;
ALTER TABLE "track" ALTER COLUMN "to" TYPE TEXT;

-- Photos: `path` holds a public URL, `originalName` always duplicated `filename`.
ALTER TABLE "photos" RENAME COLUMN "path" TO "url";
ALTER TABLE "photos" ALTER COLUMN "url" TYPE TEXT;
ALTER TABLE "photos" DROP COLUMN "originalName";
ALTER TABLE "photos" ALTER COLUMN "mimeType" TYPE VARCHAR(100);

-- Schedule: weekdays become an enum and times become minutes since midnight so
-- that rows sort chronologically instead of alphabetically.
CREATE TYPE "Weekday" AS ENUM (
  'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
);

ALTER TABLE "schedule" ADD COLUMN "dayOfWeek_new" "Weekday";
UPDATE "schedule" SET "dayOfWeek_new" = UPPER(TRIM("dayOfWeek"))::"Weekday";
ALTER TABLE "schedule" DROP COLUMN "dayOfWeek";
ALTER TABLE "schedule" RENAME COLUMN "dayOfWeek_new" TO "dayOfWeek";
ALTER TABLE "schedule" ALTER COLUMN "dayOfWeek" SET NOT NULL;

ALTER TABLE "schedule" ADD COLUMN "startsAt" INTEGER;
ALTER TABLE "schedule" ADD COLUMN "endsAt" INTEGER;
UPDATE "schedule"
SET "startsAt" =
      EXTRACT(HOUR FROM to_timestamp("startTime", 'HH12:MI AM')) * 60
      + EXTRACT(MINUTE FROM to_timestamp("startTime", 'HH12:MI AM')),
    "endsAt" =
      EXTRACT(HOUR FROM to_timestamp("endTime", 'HH12:MI AM')) * 60
      + EXTRACT(MINUTE FROM to_timestamp("endTime", 'HH12:MI AM'));
ALTER TABLE "schedule" ALTER COLUMN "startsAt" SET NOT NULL;
ALTER TABLE "schedule" ALTER COLUMN "endsAt" SET NOT NULL;
ALTER TABLE "schedule" DROP COLUMN "startTime";
ALTER TABLE "schedule" DROP COLUMN "endTime";
ALTER TABLE "schedule" ALTER COLUMN "ageGroup" TYPE VARCHAR(50);

-- Indexes for the access patterns the app actually uses.
CREATE INDEX "albums_createdAt_idx" ON "albums" ("createdAt" DESC);
CREATE INDEX "photos_albumId_createdAt_idx" ON "photos" ("albumId", "createdAt");
CREATE INDEX "schedule_isActive_dayOfWeek_startsAt_idx" ON "schedule" ("isActive", "dayOfWeek", "startsAt");
CREATE INDEX "track_createdAt_idx" ON "track" ("createdAt" DESC);
CREATE INDEX "session_userId_idx" ON "session" ("userId");
CREATE INDEX "account_userId_idx" ON "account" ("userId");
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");
