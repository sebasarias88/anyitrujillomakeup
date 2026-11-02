import type { Metadata } from "next";
import { SalesView } from "@/components/admin/views/sales";

export const metadata: Metadata = { title: "Ventas y abonos" };

export default function Page() {
  return <SalesView />;
}
