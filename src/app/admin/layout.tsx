import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/shell";
import type { PortfolioPhoto } from "@/components/admin/store";
import { gallery } from "@/lib/images";

export const metadata: Metadata = {
  title: { default: "Panel · Anyi Trujillo", template: "%s · Panel Anyi Trujillo" },
  robots: { index: false, follow: false },
};

const initialPhotos: PortfolioPhoto[] = gallery.map((item, index) => ({
  id: item.id,
  src: item.src.src,
  caption: item.caption,
  category: item.category,
  featured: index < 4,
}));

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell initialPhotos={initialPhotos}>{children}</AdminShell>;
}
