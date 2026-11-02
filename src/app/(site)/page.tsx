import { Doors } from "@/components/home/doors";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { LookQuiz } from "@/components/home/look-quiz";
import { PriceStatement } from "@/components/home/price-statement";
import { Reviews } from "@/components/home/reviews";
import { PageTransition } from "@/components/layout/page-transition";
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
      <Intro />
      <Doors />
      <PriceStatement />
      <LookQuiz />
      <Reviews />
    </PageTransition>
  );
}
