import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business } from "@/lib/site";

const facts = [
  { value: `${business.yearsOfExperience} años`, label: "De experiencia" },
  { value: "MX · NY", label: "Certificada" },
  { value: "Domicilio", label: "En el Quindío" },
];

/**
 * Home opening: the promise of airbrush makeup on the left, the strongest
 * close-up of Anyi's work on the right in an arched frame (a vanity mirror),
 * with a smaller bridal photograph and a soft nude circle from the brand.
 */
export function Hero() {
  return (
    <section aria-labelledby="home-title" className="border-b border-line bg-gradient-to-b from-paper to-blush pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container-page grid max-w-[78rem] items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal as="p" className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-9 bg-nude" />
            Maquilladora profesional · {business.address.city}, {business.address.region}
          </Reveal>
          <Reveal delay={60}>
            <h1 id="home-title" className="mt-5 font-display text-[2.4rem] leading-[1.1] text-balance sm:text-[3.2rem] lg:text-[4rem]">
              Luce perfecta en persona, <em className="highlight">en cada foto</em> y hasta el último
              baile.
            </h1>
          </Reveal>
          <Reveal as="p" delay={120} className="mt-6 max-w-[46ch] text-[1.1rem] leading-relaxed font-light text-ink-soft">
            Maquillaje y peinado para novias, quinceañeras y eventos con la técnica de aerógrafo: un acabado natural,
            ligero y que dura todo el día.
          </Reveal>
          <Reveal delay={180} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/novias#cotizador">Cotizar mi boda</ButtonLink>
            <ButtonLink href="/portafolio" variant="ink">
              Ver mi trabajo
            </ButtonLink>
          </Reveal>
          <Reveal as="dl" delay={240} className="mt-10 grid max-w-xl grid-cols-3 border-t border-line pt-6">
            {facts.map((fact, index) => (
              <div key={fact.label} className={index > 0 ? "border-l border-line pl-4 sm:pl-6" : "pr-4"}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-display text-[1.1rem] leading-tight whitespace-nowrap sm:text-[1.6rem]">{fact.value}</dd>
                <dd className="mt-1 text-[0.68rem] tracking-[0.14em] text-ink-soft uppercase sm:text-[0.72rem]">{fact.label}</dd>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative order-first mx-auto w-full max-w-[20rem] sm:max-w-[28rem] lg:order-none lg:col-span-5">
          <span aria-hidden className="absolute -top-6 -right-4 size-56 rounded-full bg-nude/25 md:size-72" />
          <div className="relative ml-auto aspect-[3/4] w-[86%] overflow-hidden rounded-t-full rounded-b-3xl">
            <Image
              src={images.glamFront}
              alt="Maquillaje glam en tonos rosa con piel luminosa, hecho por Anyi Trujillo"
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="hero-zoom object-cover object-[50%_30%]"
            />
          </div>
          <div className="absolute bottom-0 left-0 aspect-[4/5] w-[38%] overflow-hidden rounded-2xl border-[6px] border-paper shadow-[0_18px_40px_-20px_rgb(80_50_30/0.45)]">
            <Image
              src={images.brideTerrace}
              alt="Novia con recogido romántico en una terraza con vista al paisaje cafetero"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 11rem, 35vw"
              className="object-cover"
            />
          </div>
          <p className="absolute right-3 bottom-8 rounded-xl bg-white px-4 py-3 leading-snug shadow-[0_14px_30px_-18px_rgb(80_50_30/0.4)]">
            <span className="block font-display text-[1rem] italic">Glam rosé · aerógrafo</span>
            <span className="block text-[0.68rem] tracking-[0.12em] text-ink-soft uppercase">Hecho en mi estudio</span>
          </p>
        </div>
      </div>
    </section>
  );
}
