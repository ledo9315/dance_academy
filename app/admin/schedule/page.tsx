import { ScheduleManager } from "@/components/admin/schedule-manager";
import { listSchedule } from "@/lib/queries/schedule";

export default async function AdminSchedulePage() {
  const entries = await listSchedule();

  return (
    <div className="flex-1 p-6">
      <ScheduleManager entries={entries} />
    </div>
  );
}
