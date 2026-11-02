import type { Metadata } from "next";
import { PortfolioView } from "@/components/admin/views/portfolio";

export const metadata: Metadata = { title: "Portafolio" };

export default function Page() {
  return <PortfolioView />;
}
