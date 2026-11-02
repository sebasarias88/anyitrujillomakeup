import type { Metadata } from "next";
import { AppointmentsView } from "@/components/admin/views/appointments";

export const metadata: Metadata = { title: "Citas" };

export default function Page() {
  return <AppointmentsView />;
}
