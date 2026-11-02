import Image from "next/image";
import { ArrowIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business } from "@/lib/site";

const followers = [images.brideTerrace, images.quinceRubyPortrait, images.brideDressWindow];

/** Home opening: the promise, two actions, social proof, and Anyi's best close-up. */
export function Hero() {
  return (
    <section aria-labelledby="home-title" className="bg-gradient-to-b from-blush to-nude-field">
      <div className="container-page grid items-center gap-12 pt-28 pb-16 md:pt-40 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <Reveal as="p" className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-9 bg-nude-deep" />
            Novias · Quinceañeras · Eventos
          </Reveal>
          <Reveal delay={60}>
            <h1 id="home-title" className="mt-5 font-display text-[2.6rem] leading-[1.06] text-balance sm:text-[3.4rem] lg:text-[4.1rem]">
              Maquillaje que <em className="text-nude-deep">enamora</em> en persona y brilla en cada foto
            </h1>
          </Reveal>
          <Reveal as="p" delay={120} className="mt-6 max-w-[46ch] text-[1.12rem] leading-relaxed font-light text-ink-soft">
            {business.yearsOfExperience} años creando looks luminosos y duraderos con aerógrafo. Tú disfrutas tu día; yo me
            encargo de que te veas increíble de principio a fin.
          </Reveal>
          <Reveal delay={180} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#agenda">Reservar mi cita</ButtonLink>
            <ButtonLink href="/portafolio" variant="ink" className="bg-white">
              Ver mi trabajo
            </ButtonLink>
          </Reveal>
          <Reveal delay={240} className="mt-9 flex items-center gap-4">
            <span className="flex">
              {followers.map((photo, index) => (
                <span key={index} className={`relative size-11 overflow-hidden rounded-full border-[3px] border-blush ${index > 0 ? "-ml-3" : ""}`}>
                  <Image src={photo} alt="" fill sizes="44px" className="object-cover" />
                </span>
              ))}
            </span>
            <span className="text-[0.92rem] leading-snug text-ink-soft">
              Más de 15 mil personas siguen
              <br />
              mi trabajo en Instagram
            </span>
          </Reveal>
        </div>

        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lift sm:aspect-[5/4] lg:order-2 lg:aspect-[4/5] lg:max-h-[40rem]">
          <Image
            src={images.glamRoseHero}
            alt="Maquillaje glam rosé con piel luminosa, hecho por Anyi Trujillo"
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 34rem, 92vw"
            className="hero-zoom object-cover object-[50%_25%]"
          />
          <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[0.8rem] tracking-[0.06em]">
            <span aria-hidden className="size-2 rounded-full bg-nude-deep" />
            Reservas abiertas
          </span>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-white/95 px-5 py-4">
            <span className="leading-snug">
              <span className="block font-display text-[1.15rem]">Glam rosé con aerógrafo</span>
              <span className="block text-[0.85rem] text-ink-soft">Piel luminosa que dura todo el día</span>
            </span>
            <ButtonLink href="/portafolio" aria-label="Ver el portafolio" className="size-11 shrink-0 !px-0">
              <ArrowIcon className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
