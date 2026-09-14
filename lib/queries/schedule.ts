import "server-only";

import { prisma } from "@/lib/prisma";

const scheduleSelect = {
  id: true,
  dayOfWeek: true,
  startsAt: true,
  endsAt: true,
  ageGroup: true,
  className: true,
  isActive: true,
} as const;

/** Slots shown to visitors. */
export function listActiveSchedule() {
  return prisma.schedule.findMany({
    where: { isActive: true },
    orderBy: [{ dayOfWeek: "asc" }, { startsAt: "asc" }],
    select: scheduleSelect,
  });
}

/** Every slot, including deactivated ones, for the admin area. */
export function listSchedule() {
  return prisma.schedule.findMany({
    orderBy: [{ dayOfWeek: "asc" }, { startsAt: "asc" }],
    select: scheduleSelect,
  });
}

export type ScheduleEntry = Awaited<ReturnType<typeof listSchedule>>[number];
