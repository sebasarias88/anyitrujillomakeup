import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business } from "@/lib/site";

/** Who Anyi is and where she works, in her own voice (absorbs the old /sobre-anyi page). */
export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="scroll-mt-24 bg-marble py-24 md:py-32">
      <div className="container-page grid max-w-[78rem] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Sobre mí</p>
            <h2 id="about-title" className="mt-3 font-display text-[2.2rem] leading-[1.1] md:text-[3.1rem]">
              Hola, soy Anyi. <em className="text-nude-deep">Bienvenida a mi estudio.</em>
            </h2>
            <p className="mt-6 text-[1.08rem] leading-relaxed font-light">
              Hace {business.yearsOfExperience} años maquillo novias, quinceañeras y mujeres que quieren verse como ellas
              mismas en su mejor día. Te escucho, te asesoro y diseñamos juntas un look que se sienta tuyo.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Mi especialidad es el aerógrafo, y cuento con un equipo formado por mí para atender a tu mamá, tus damas y
              tus invitadas.
            </p>
          </Reveal>
          <Reveal as="ul" delay={100} className="mt-8 border-b border-marble-deep">
            {business.certifications.map((certification) => {
              const [name, place] = certification.split(" · ");
              return (
                <li key={certification} className="flex justify-between gap-4 border-t border-marble-deep py-4">
                  <span className="font-medium">{name}</span>
                  <span className="text-ink-soft">{place}</span>
                </li>
              );
            })}
          </Reveal>
          <Reveal as="p" delay={160} className="mt-6 text-[0.95rem] text-ink-soft">
            {business.address.street} · {business.address.city}
          </Reveal>
        </div>
        <div className="grid grid-cols-5 items-end gap-4 lg:col-span-7">
          <Reveal variant="photo" className="relative col-span-3 aspect-[3/4]">
            <Image src={images.anyiAgenda} alt="Anyi Trujillo con su agenda de citas" fill placeholder="blur" sizes="(min-width: 1024px) 26rem, 55vw" className="rounded-3xl object-cover" />
          </Reveal>
          <div className="col-span-2 grid gap-4">
            <Reveal variant="photo" delay={100} className="relative aspect-[4/5]">
              <Image src={images.studioSign} alt="Letrero dorado de Anyi Trujillo Beauty Studio" fill placeholder="blur" sizes="(min-width: 1024px) 17rem, 36vw" className="rounded-3xl object-cover" />
            </Reveal>
            <Reveal variant="photo" delay={180} className="relative aspect-[4/5]">
              <Image src={images.studioVanity} alt="Tocador del estudio con espejo de luces" fill placeholder="blur" sizes="(min-width: 1024px) 17rem, 36vw" className="rounded-3xl object-cover" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
