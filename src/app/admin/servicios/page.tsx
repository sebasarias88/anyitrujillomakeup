import type { Metadata } from "next";
import { CatalogView } from "@/components/admin/views/catalog";

export const metadata: Metadata = { title: "Servicios y precios" };

export default function Page() {
  return <CatalogView />;
}
