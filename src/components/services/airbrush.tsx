import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { AirbrushIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { images } from "@/lib/images";
import { whatsappUrl } from "@/lib/site";

const benefits = [
  {
    title: "Dura toda la celebración",
    text: "Resiste el calor, las lágrimas de emoción y las horas de baile sin perder el acabado.",
  },
  {
    title: "Ligero como una segunda piel",
    text: "El producto se aplica en una bruma finísima: cubre sin sentirse pesado ni verse cargado.",
  },
  {
    title: "Perfecto en foto y video",
    text: "Un acabado uniforme y luminoso que se ve impecable en cámaras de alta definición.",
  },
  {
    title: "Más higiénico",
    text: "La aplicación sin contacto directo sobre la piel es ideal para pieles sensibles.",
  },
];

export function Airbrush() {
  return (
    <section id="aerografo" aria-labelledby="airbrush-title" className="relative overflow-hidden bg-ink-2 py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/3 size-[30rem] rounded-full bg-nude/10 blur-[120px]" />
      </div>

      <div className="container-page relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-last lg:order-first">
          <div className="relative mx-auto aspect-[4/5] max-w-lg overflow-hidden rounded-[2.5rem] border border-line">
            <Image
              src={images.glamProfile}
              alt="Piel luminosa y uniforme lograda con maquillaje de aerógrafo"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            {/* Airbrush "mist" overlay */}
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-soft-light motion-safe:animate-[mist_9s_ease-in-out_infinite]"
              style={{
                background:
                  "radial-gradient(40% 30% at 30% 30%, rgb(241 217 189 / .55), transparent 70%), radial-gradient(35% 25% at 70% 60%, rgb(208 154 115 / .45), transparent 70%)",
              }}
            />
          </div>
          <div className="absolute -right-2 -bottom-6 flex items-center gap-4 rounded-2xl border border-line bg-ink/90 p-5 backdrop-blur-xl sm:right-6 lg:-right-8">
            <span className="flex size-12 items-center justify-center rounded-full bg-nude/15 text-nude">
              <AirbrushIcon className="size-6" />
            </span>
            <p className="text-sm text-sand">
              <span className="block font-display text-2xl text-ivory">Técnica certificada</span>
              Cristina Cuéllar · Tempto NY
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center">
          <SectionHeading
            id="airbrush-title"
            eyebrow="Especialidad"
            title={
              <>
                Maquillaje con <em className="text-gradient-gold">aerógrafo</em>
              </>
            }
            description="La técnica que eligen las novias que quieren verse perfectas desde el primer abrazo hasta el último baile."
          />

          <ol className="mt-12 space-y-0">
            {benefits.map((benefit, index) => (
              <Reveal as="li" key={benefit.title} delay={index * 90} className="flex gap-6 border-t border-line py-6">
                <span className="font-display text-xl text-nude">0{index + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold text-ivory">{benefit.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-sand">{benefit.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200} className="mt-8">
            <ButtonLink
              href={whatsappUrl("Hola Anyi ✨ Quiero saber más sobre el maquillaje con aerógrafo.")}
            >
              <WhatsAppIcon className="size-4" />
              Quiero probar el aerógrafo
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
