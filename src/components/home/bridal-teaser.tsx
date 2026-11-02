import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { bridalPackages, formatCOP } from "@/lib/site";

/** The main service up front: the three bridal packages with their real prices. */
export function BridalTeaser() {
  return (
    <section aria-labelledby="bridal-teaser-title" className="bg-marble py-24 md:py-32">
      <div className="container-page grid max-w-[78rem] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal variant="photo" className="relative aspect-[4/5] lg:col-span-5">
          <Image
            src={images.brideDressWindow}
            alt="Novia con bata de encaje contemplando su vestido antes de la ceremonia"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 34rem, 92vw"
            className="rounded-3xl object-cover"
          />
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">Novias</p>
            <h2 id="bridal-teaser-title" className="mt-3 font-display text-[2.2rem] leading-[1.1] md:text-[3.1rem]">
              Tu boda, <em className="text-nude-deep">como la soñaste</em>
            </h2>
            <p className="mt-5 max-w-[48ch] leading-relaxed text-ink-soft">
              Todos los paquetes incluyen prueba de maquillaje y peinado en el estudio, y tu look completo el día de la
              boda.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-3">
            {bridalPackages.map((item, index) => (
              <Reveal
                as="li"
                key={item.id}
                delay={index * 70}
                className={`relative flex items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5 ${
                  item.highlight ? "border-[1.5px] border-nude" : "border border-line"
                }`}
              >
                {item.highlight ? (
                  <span className="absolute -top-3 left-5 rounded-full bg-nude px-3 py-0.5 text-[0.66rem] tracking-[0.16em] text-ink uppercase">
                    La experiencia completa
                  </span>
                ) : null}
                <span>
                  <span className="block font-display text-[1.35rem] leading-tight">{item.name}</span>
                  <span className="text-[0.9rem] text-ink-soft">{item.id === "rubi" ? "Te acompaño hasta 3 horas en tus fotos" : item.subtitle}</span>
                </span>
                <span className="font-display text-[1.4rem] whitespace-nowrap">{formatCOP(item.price)}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={240} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="/novias#cotizador">Armar mi cotización</ButtonLink>
            <span className="text-[0.95rem] text-ink-soft">Suma a tu mamá y tus damas, y ve el total al instante.</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
