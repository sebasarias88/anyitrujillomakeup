import type { Metadata } from "next";
import { AgendaView } from "@/components/admin/views/agenda";

export const metadata: Metadata = { title: "Agenda" };

export default function Page() {
  return <AgendaView />;
}
