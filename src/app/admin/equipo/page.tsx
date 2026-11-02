import type { Metadata } from "next";
import { TeamView } from "@/components/admin/views/team";

export const metadata: Metadata = { title: "Equipo" };

export default function Page() {
  return <TeamView />;
}
