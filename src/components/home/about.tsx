import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business } from "@/lib/site";

/** Who Anyi is, right after the hero: she is the brand. Links to her full page. */
export function About() {
  return (
    <section aria-labelledby="about-title" className="bg-white py-24 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <Reveal variant="photo" className="relative pb-8 pl-8 md:pb-10 md:pl-10">
          <span aria-hidden className="absolute bottom-0 left-0 h-[70%] w-[70%] rounded-[1.5rem] bg-nude-field" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <Image src={images.anyiAgenda} alt="Anyi Trujillo con su agenda de citas" fill placeholder="blur" sizes="(min-width: 1024px) 30rem, 90vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p className="eyebrow">Sobre mí</p>
          <h2 id="about-title" className="mt-4 font-display text-[2.2rem] leading-[1.1] text-balance md:text-[3rem]">
            Detrás de cada look, una artista que <em className="text-nude-deep">te escucha</em>
          </h2>
          <p className="mt-6 text-[1.08rem] leading-relaxed font-light">
            Soy {business.artist}. Hace {business.yearsOfExperience} años maquillo novias, quinceañeras y mujeres que quieren
            verse como ellas mismas, pero en su mejor versión. En mi estudio en {business.address.city} te asesoro y
            diseñamos juntas un look que se sienta tuyo.
          </p>
          <ul className="mt-7 grid grid-cols-2 border-y border-line">
            {business.certifications.map((certification, index) => {
              const [name, place] = certification.split(" · ");
              return (
                <li key={certification} className={`py-4 ${index > 0 ? "border-l border-line pl-5" : "pr-5"}`}>
                  <span className="block font-display text-[1.2rem]">{name.replace("Instituto ", "")}</span>
                  <span className="block text-[0.75rem] tracking-[0.12em] text-ink-soft uppercase">Certificación · {place}</span>
                </li>
              );
            })}
          </ul>
          <ButtonLink href="/sobre-mi" className="mt-8">
            Conoce mi historia
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
