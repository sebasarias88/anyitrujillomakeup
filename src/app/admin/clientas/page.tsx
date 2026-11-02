import type { Metadata } from "next";
import { ClientsView } from "@/components/admin/views/clients";

export const metadata: Metadata = { title: "Clientas" };

export default function Page() {
  return <ClientsView />;
}
