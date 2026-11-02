import { About } from "@/components/home/about";
import { BridalTeaser } from "@/components/home/bridal-teaser";
import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { LookQuiz } from "@/components/home/look-quiz";
import { MoreServices } from "@/components/home/more-services";
import { Reviews } from "@/components/home/reviews";
import { WorkMosaic } from "@/components/home/work-mosaic";
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
      <WorkMosaic />
      <BridalTeaser />
      <Reviews />
      <MoreServices />
      <LookQuiz />
      <About />
      <ClosingCta />
    </PageTransition>
  );
}
