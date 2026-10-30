import { About } from "@/components/sections/about";
import { Airbrush } from "@/components/sections/airbrush";
import { Booking } from "@/components/sections/booking";
import { BridalQuote } from "@/components/sections/bridal-quote";
import { Courses } from "@/components/sections/courses";
import { Faq } from "@/components/sections/faq";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { LookQuiz } from "@/components/sections/look-quiz";
import { Marquee } from "@/components/sections/marquee";
import { Reviews } from "@/components/sections/reviews";
import { Services } from "@/components/sections/services";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Airbrush />
        <BridalQuote />
        <LookQuiz />
        <About />
        <Gallery />
        <Courses />
        <Reviews />
        <Booking />
        <Location />
        <Faq />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
