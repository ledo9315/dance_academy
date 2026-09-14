"use client";

import { Clock, Pencil, Plus, Trash2, Users } from "lucide-react";
import { useActionState, useState } from "react";

import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitButton } from "@/components/ui/submit-button";
import { deleteScheduleEntry, saveScheduleEntry } from "@/lib/actions/schedule";
import { idleFormState, type FormState } from "@/lib/actions/types";
import type { ScheduleEntry } from "@/lib/queries/schedule";
import { WEEKDAYS, formatTimeLabel, formatTimeValue, formatWeekday } from "@/lib/schedule";
import { cn } from "@/lib/utils";

const inputClasses = "border-border w-full border-2 px-3 py-2 font-sans text-sm";

type ScheduleDialogProps = {
  entry?: ScheduleEntry;
  trigger: React.ReactNode;
};

function ScheduleDialog({ entry, trigger }: ScheduleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Closing from inside the action keeps the dialog in sync with the result
  // without an effect that would re-render the whole tree.
  const [state, formAction] = useActionState(async (previous: FormState, formData: FormData) => {
    const result = await saveScheduleEntry(previous, formData);

    if (result.status === "success") {
      setIsOpen(false);
    }

    return result;
  }, idleFormState);

  const errors = state.fieldErrors ?? {};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entry ? "Edit class" : "Add class"}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4 font-sans" noValidate>
          {entry ? <input type="hidden" name="id" value={entry.id} /> : null}

          <div>
            <label htmlFor="dayOfWeek" className="mb-1 block text-sm">
              Day
            </label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              defaultValue={entry?.dayOfWeek ?? WEEKDAYS[0]}
              className={cn(inputClasses, "bg-white")}
            >
              {WEEKDAYS.map((day) => (
                <option key={day} value={day}>
                  {formatWeekday(day)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startsAt" className="mb-1 block text-sm">
                Start
              </label>
              <input
                id="startsAt"
                name="startsAt"
                type="time"
                required
                defaultValue={entry ? formatTimeValue(entry.startsAt) : ""}
                className={cn(inputClasses, errors.startsAt && "border-red-500")}
              />
            </div>
            <div>
              <label htmlFor="endsAt" className="mb-1 block text-sm">
                End
              </label>
              <input
                id="endsAt"
                name="endsAt"
                type="time"
                required
                defaultValue={entry ? formatTimeValue(entry.endsAt) : ""}
                className={cn(inputClasses, errors.endsAt && "border-red-500")}
              />
              {errors.endsAt ? (
                <p role="alert" className="mt-1 text-xs text-red-500">
                  {errors.endsAt[0]}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="ageGroup" className="mb-1 block text-sm">
              Age group
            </label>
            <input
              id="ageGroup"
              name="ageGroup"
              type="text"
              required
              placeholder="Ages 8-12"
              defaultValue={entry?.ageGroup}
              className={cn(inputClasses, errors.ageGroup && "border-red-500")}
            />
            {errors.ageGroup ? (
              <p role="alert" className="mt-1 text-xs text-red-500">
                {errors.ageGroup[0]}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="className" className="mb-1 block text-sm">
              Class name (optional)
            </label>
            <input
              id="className"
              name="className"
              type="text"
              placeholder="Ballet"
              defaultValue={entry?.className ?? ""}
              className={inputClasses}
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={entry?.isActive ?? true}
              className="h-4 w-4 accent-accent"
            />
            Visible on the public schedule
          </label>

          {state.status === "error" && state.message ? (
            <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {state.message}
            </p>
          ) : null}

          <DialogFooter>
            <SubmitButton pendingLabel="Saving...">{entry ? "Save" : "Add class"}</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ScheduleManager({ entries }: { entries: ScheduleEntry[] }) {
  const days = WEEKDAYS.map((day) => ({
    day,
    entries: entries.filter((entry) => entry.dayOfWeek === day),
  })).filter(({ entries: dayEntries }) => dayEntries.length > 0);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-light">Schedule Management</h1>
        <ScheduleDialog
          trigger={
            <Button>
              <Plus className="h-4 w-4" aria-hidden />
              Add class
            </Button>
          }
        />
      </div>

      {days.length === 0 ? (
        <p className="font-sans text-text">No classes yet — add the first one.</p>
      ) : (
        <div className="space-y-8">
          {days.map(({ day, entries: dayEntries }) => (
            <section key={day} className="border border-border">
              <h2 className="bg-accent-bg border-b border-border px-6 py-4 text-lg font-light text-accent">
                {formatWeekday(day)}
              </h2>

              <ul className="divide-y divide-border">
                {dayEntries.map((entry) => (
                  <li
                    key={entry.id}
                    className={cn(
                      "flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between",
                      !entry.isActive && "opacity-50",
                    )}
                  >
                    <div className="font-sans text-sm">
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                        {formatTimeLabel(entry.startsAt)} – {formatTimeLabel(entry.endsAt)}
                        {entry.isActive ? null : <span className="text-text">(hidden)</span>}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-text">
                        <Users className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                        {entry.ageGroup}
                        {entry.className ? ` · ${entry.className}` : ""}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <ScheduleDialog
                        entry={entry}
                        trigger={
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" aria-hidden />
                            Edit
                          </Button>
                        }
                      />
                      <ConfirmDeleteDialog
                        title="Delete class"
                        description="This class will be removed from the schedule. This action cannot be undone."
                        confirmLabel="Delete class"
                        onConfirm={() => deleteScheduleEntry(entry.id)}
                        trigger={
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" aria-hidden />
                            Delete
                          </Button>
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
