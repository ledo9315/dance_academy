import { ScheduleManager } from "@/components/admin/schedule-manager";
import { listSchedule } from "@/lib/queries/schedule";

export default async function AdminSchedulePage() {
  const entries = await listSchedule();

  return (
    <main className="flex-1 px-4 pb-20 sm:px-6 lg:px-8">
      <ScheduleManager entries={entries} />
    </main>
  );
}
