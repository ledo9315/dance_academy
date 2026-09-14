"use client";

import { Clock, Edit, Plus, Trash2, Users } from "lucide-react";
import { useActionState, useState, useTransition } from "react";

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

const fieldClasses = "w-full p-2 border border-border bg-background";
const labelClasses = "block text-sm font-medium mb-1";

type ScheduleFormProps = {
  entry?: ScheduleEntry;
  onSaved: () => void;
};

function ScheduleForm({ entry, onSaved }: ScheduleFormProps) {
  // Closing from inside the action keeps the dialog in sync with the result
  // without an effect that would re-render the whole tree.
  const [state, formAction] = useActionState(async (previous: FormState, formData: FormData) => {
    const result = await saveScheduleEntry(previous, formData);

    if (result.status === "success") {
      onSaved();
    }

    return result;
  }, idleFormState);

  return (
    <form action={formAction} className="space-y-4">
      {entry ? <input type="hidden" name="id" value={entry.id} /> : null}

      <div>
        <label htmlFor="dayOfWeek" className={labelClasses}>
          Day of Week
        </label>
        <select
          id="dayOfWeek"
          name="dayOfWeek"
          defaultValue={entry?.dayOfWeek ?? WEEKDAYS[0]}
          className={fieldClasses}
          required
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
          <label htmlFor="startsAt" className={labelClasses}>
            Start Time
          </label>
          <input
            id="startsAt"
            name="startsAt"
            type="time"
            defaultValue={entry ? formatTimeValue(entry.startsAt) : ""}
            className={fieldClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="endsAt" className={labelClasses}>
            End Time
          </label>
          <input
            id="endsAt"
            name="endsAt"
            type="time"
            defaultValue={entry ? formatTimeValue(entry.endsAt) : ""}
            className={fieldClasses}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="ageGroup" className={labelClasses}>
          Age Group
        </label>
        <input
          id="ageGroup"
          name="ageGroup"
          type="text"
          placeholder="Ages 8-12"
          defaultValue={entry?.ageGroup}
          className={fieldClasses}
          required
        />
      </div>

      <div>
        <label htmlFor="className" className={labelClasses}>
          Class Name (Optional)
        </label>
        <input
          id="className"
          name="className"
          type="text"
          placeholder="Ballet, Jazz, etc."
          defaultValue={entry?.className ?? ""}
          className={fieldClasses}
        />
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {state.message}
        </p>
      ) : null}

      <DialogFooter>
        <SubmitButton pendingLabel="Saving...">{entry ? "Save" : "Create"}</SubmitButton>
      </DialogFooter>
    </form>
  );
}

function EditEntryDialog({ entry }: { entry: ScheduleEntry }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Edit class">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        <ScheduleForm entry={entry} onSaved={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function DeleteEntryDialog({ entry }: { entry: ScheduleEntry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Delete class">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Class</DialogTitle>
        </DialogHeader>
        <div className="border border-border p-4">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            <span className="font-sans text-sm">
              {formatTimeLabel(entry.startsAt)} - {formatTimeLabel(entry.endsAt)}
            </span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-accent" />
            <span className="font-sans text-sm text-text">{entry.ageGroup}</span>
          </div>
          <div className="font-sans text-sm text-text">{formatWeekday(entry.dayOfWeek)}</div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await deleteScheduleEntry(entry.id);
                setIsOpen(false);
              })
            }
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ScheduleManager({ entries }: { entries: ScheduleEntry[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-light">Schedule Management</h1>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <ScheduleForm onSaved={() => setIsAddOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {WEEKDAYS.map((day) => {
          const dayEntries = entries.filter((entry) => entry.dayOfWeek === day);

          if (dayEntries.length === 0) {
            return null;
          }

          return (
            <div key={day} className="border border-border">
              <div className="bg-accent-bg border-b border-border px-6 py-4">
                <h2 className="text-lg font-light text-accent">{formatWeekday(day)}</h2>
              </div>

              <div className="divide-y divide-border">
                {dayEntries.map((entry) => (
                  <div key={entry.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span className="font-sans text-sm">
                            {formatTimeLabel(entry.startsAt)} - {formatTimeLabel(entry.endsAt)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-accent" />
                          <span className="font-sans text-sm text-text">{entry.ageGroup}</span>
                        </div>

                        {entry.className ? (
                          <span className="font-sans text-sm text-text">{entry.className}</span>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2">
                        <EditEntryDialog entry={entry} />
                        <DeleteEntryDialog entry={entry} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
