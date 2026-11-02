import { PageTransition } from "@/components/layout/page-transition";
import { Hero } from "@/components/home/hero";
import { LookQuiz } from "@/components/home/look-quiz";
import { Reviews } from "@/components/home/reviews";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Anyi Trujillo | Maquilladora profesional en Armenia, Quindío",
  description:
    "Maquillaje y peinado profesional en Armenia, Quindío. Especialista en novias y maquillaje con aerógrafo, con 9 años de experiencia. En estudio o a domicilio. Agenda por WhatsApp.",
});

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <LookQuiz />
      <Reviews />
    </PageTransition>
  );
}
