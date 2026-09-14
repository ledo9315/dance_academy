import { PrismaClient, Weekday } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { withVerifiedTls } from "../lib/database-url";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: withVerifiedTls(process.env.DATABASE_URL ?? "") }),
});

/** Class slots the studio runs by default. Times are minutes since midnight. */
const DEFAULT_SCHEDULE = [
  { dayOfWeek: Weekday.MONDAY, startsAt: 17 * 60, endsAt: 19 * 60, ageGroup: "Ages 8-12" },
  { dayOfWeek: Weekday.TUESDAY, startsAt: 17 * 60, endsAt: 18 * 60, ageGroup: "Ages 4-7" },
  { dayOfWeek: Weekday.TUESDAY, startsAt: 18 * 60, endsAt: 19 * 60 + 30, ageGroup: "Ages 8-11" },
  { dayOfWeek: Weekday.WEDNESDAY, startsAt: 17 * 60, endsAt: 19 * 60, ageGroup: "Ages 8-12" },
  { dayOfWeek: Weekday.THURSDAY, startsAt: 17 * 60, endsAt: 18 * 60, ageGroup: "Ages 4-7" },
  { dayOfWeek: Weekday.THURSDAY, startsAt: 18 * 60, endsAt: 19 * 60 + 30, ageGroup: "Ages 8-11" },
  { dayOfWeek: Weekday.FRIDAY, startsAt: 17 * 60, endsAt: 19 * 60, ageGroup: "Ages 8-12" },
];

async function main() {
  const existing = await prisma.schedule.count();

  if (existing > 0) {
    console.log(`Schedule already contains ${existing} entries — nothing to seed.`);
    return;
  }

  await prisma.schedule.createMany({ data: DEFAULT_SCHEDULE });
  console.log(`Seeded ${DEFAULT_SCHEDULE.length} schedule entries.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
