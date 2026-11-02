import type { Metadata } from "next";
import { CoursesView } from "@/components/admin/views/courses";

export const metadata: Metadata = { title: "Cursos" };

export default function Page() {
  return <CoursesView />;
}
