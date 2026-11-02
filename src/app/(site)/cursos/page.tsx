import { Courses } from "@/components/courses/courses";
import { PageHero } from "@/components/layout/page-hero";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, businessRef, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/cursos",
  title: "Cursos de maquillaje en Armenia, Quindío",
  description:
    "Cursos de maquillaje presenciales y personalizados en Armenia, Quindío, con Anyi Trujillo, certificada por el Instituto Cristina Cuéllar y Tempto New York.",
});

const course = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Cursos de maquillaje con Anyi Trujillo",
  description: "Cursos presenciales y personalizados de maquillaje en Armenia, Quindío.",
  inLanguage: "es-CO",
  provider: businessRef,
};

export default function CoursesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd("/cursos"), course]} />
      <PageHero
        monument="Cursos"
        title="Cursos de maquillaje en Armenia"
        intro={<p>Aprende conmigo en el estudio, en grupo o uno a uno, con las técnicas que uso con mis novias.</p>}
        image={images.workshop}
        imageAlt="Anyi Trujillo ajustando el tocado de una novia en el Workshop Internacional de Novias de Cristina Cuéllar"
      />
      <Courses />
    </>
  );
}
