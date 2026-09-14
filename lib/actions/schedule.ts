"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Weekday, parseTimeToMinutes } from "@/lib/schedule";
import { errorState, successState, type FormState } from "@/lib/actions/types";

const timeSchema = z
  .string()
  .trim()
  .transform((value, ctx) => {
    const minutes = parseTimeToMinutes(value);

    if (minutes === null) {
      ctx.addIssue({ code: "custom", message: "Please enter a time as HH:MM." });
      return z.NEVER;
    }

    return minutes;
  });

const scheduleSchema = z
  .object({
    id: z.coerce.number().int().positive().optional(),
    dayOfWeek: z.enum(Weekday),
    startsAt: timeSchema,
    endsAt: timeSchema,
    ageGroup: z.string().trim().min(2, "Please name an age group.").max(50),
    className: z
      .string()
      .trim()
      .max(100)
      .transform((value) => value || null),
    isActive: z.boolean(),
  })
  .refine((data) => data.endsAt > data.startsAt, {
    message: "The end time must be after the start time.",
    path: ["endsAt"],
  });

function revalidateSchedule() {
  revalidatePath("/schedule");
  revalidatePath("/admin/schedule");
}

/** Creates a class when the form carries no id, otherwise updates that entry. */
export async function saveScheduleEntry(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireSession();

  const parsed = scheduleSchema.safeParse({
    id: formData.get("id") || undefined,
    dayOfWeek: formData.get("dayOfWeek"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
    ageGroup: formData.get("ageGroup"),
    className: formData.get("className") ?? "",
    isActive: formData.get("isActive") !== null,
  });

  if (!parsed.success) {
    return errorState(
      "Please correct the highlighted fields.",
      z.flattenError(parsed.error).fieldErrors,
    );
  }

  const { id, ...data } = parsed.data;

  try {
    if (id) {
      await prisma.schedule.update({ where: { id }, data });
    } else {
      await prisma.schedule.create({ data });
    }
  } catch (error) {
    console.error("Failed to save schedule entry", { id, error });
    return errorState("The class could not be saved. Please try again.");
  }

  revalidateSchedule();
  return successState(id ? "Class updated." : "Class added.");
}

export async function deleteScheduleEntry(scheduleId: number): Promise<void> {
  await requireSession();

  await prisma.schedule.delete({ where: { id: scheduleId } });

  revalidateSchedule();
}
