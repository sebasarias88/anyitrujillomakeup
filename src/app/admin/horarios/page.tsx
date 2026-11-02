import type { Metadata } from "next";
import { ScheduleView } from "@/components/admin/views/schedule";

export const metadata: Metadata = { title: "Horarios" };

export default function Page() {
  return <ScheduleView />;
}
