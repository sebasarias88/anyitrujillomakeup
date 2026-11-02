import { Authority } from "@/components/courses/authority";
import { CourseBuilder } from "@/components/courses/course-builder";
import { ServicePage } from "@/components/shared/service-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/cursos",
  title: "Cursos de maquillaje en Armenia, Quindío",
  description: "Cursos de maquillaje presenciales y personalizados en Armenia con Anyi Trujillo, certificada por el Instituto Cristina Cuéllar (México) y Tempto (New York).",
});

export default function CoursesPage() {
  return (
    <ServicePage path="/cursos" category="novias" galleryTitle="Lo que aprenderás a lograr">
      <Authority />
      <CourseBuilder />
    </ServicePage>
  );
}
