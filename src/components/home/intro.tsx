import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business } from "@/lib/site";

/** A narrow column of verifiable facts beside the studio's real gold sign. */
export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="container-page py-28 md:py-44">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5 md:col-start-2 lg:col-span-4 lg:col-start-2">
          <Reveal>
            <h2 id="intro-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.75rem]">
              Hola, soy Anyi
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed">
            <Reveal as="p" delay={70} className="font-semibold">
              Hace {business.yearsOfExperience} años maquillo novias, quinceañeras y mujeres que quieren verse como ellas
              mismas en su mejor día.
            </Reveal>
            <Reveal as="p" delay={140}>
              Me formé con el Instituto Cristina Cuéllar en México y con Tempto en Nueva York.
            </Reveal>
            <Reveal as="p" delay={210}>
              Mi especialidad es el aerógrafo: el maquillaje se aplica como una bruma finísima, dura todo el evento y se
              ve impecable en fotos.
            </Reveal>
            <Reveal as="p" delay={280}>
              Mis clientas me califican con {business.google.rating.toFixed(1)} en Google, en {business.google.reviews}{" "}
              reseñas.{" "}
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                Leerlas en Google
              </a>
            </Reveal>
            <Reveal as="p" delay={350}>
              <Link href="/sobre-anyi" className="font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">
                Conoce mi historia
              </Link>
            </Reveal>
          </div>
        </div>

        <Reveal variant="photo" className="relative aspect-[4/5] md:col-span-6 md:col-start-7">
          <Image
            src={images.studioSign}
            alt="Fachada de Anyi Trujillo Beauty Studio con su letrero dorado"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
