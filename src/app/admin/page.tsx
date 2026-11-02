import type { Metadata } from "next";
import { DashboardView } from "@/components/admin/views/dashboard";

export const metadata: Metadata = { title: "Resumen" };

export default function Page() {
  return <DashboardView />;
}
