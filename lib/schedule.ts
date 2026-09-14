import { Weekday } from "@/lib/generated/prisma/enums";

/** Weekdays in calendar order — the order the schedule is rendered in. */
export const WEEKDAYS = [
  Weekday.MONDAY,
  Weekday.TUESDAY,
  Weekday.WEDNESDAY,
  Weekday.THURSDAY,
  Weekday.FRIDAY,
  Weekday.SATURDAY,
  Weekday.SUNDAY,
] as const;

const WEEKDAY_LABELS: Record<Weekday, string> = {
  [Weekday.MONDAY]: "Monday",
  [Weekday.TUESDAY]: "Tuesday",
  [Weekday.WEDNESDAY]: "Wednesday",
  [Weekday.THURSDAY]: "Thursday",
  [Weekday.FRIDAY]: "Friday",
  [Weekday.SATURDAY]: "Saturday",
  [Weekday.SUNDAY]: "Sunday",
};

export function formatWeekday(day: Weekday): string {
  return WEEKDAY_LABELS[day];
}

/** Converts an `HH:MM` input value into minutes since midnight. */
export function parseTimeToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());

  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
}

/** Minutes since midnight as an `HH:MM` value for `<input type="time">`. */
export function formatTimeValue(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/** Minutes since midnight in the 12 hour notation visitors expect, e.g. `5:00 PM`. */
export function formatTimeLabel(minutes: number): string {
  const hours24 = Math.floor(minutes / 60);
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const suffix = hours24 < 12 ? "AM" : "PM";

  return `${hours12}:${String(minutes % 60).padStart(2, "0")} ${suffix}`;
}

export { Weekday };
