import Image from "next/image";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business } from "@/lib/site";

const pillars = [
  { title: "Asesoría integral", text: "Te acompaño desde la elección del estilo hasta el último retoque del gran día." },
  { title: "Equipo entrenado por mí", text: "Atención puntual y coordinada para grupos grandes de damas e invitadas." },
  { title: "Productos de alta gama", text: "Marcas profesionales, fotogénicas y de larga duración en cada servicio." },
];

export function About() {
  return (
    <section id="sobre-anyi" aria-labelledby="about-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative">
          <Reveal className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-[2rem] border border-line">
            <Image
              src={images.anyiAgenda}
              alt="Anyi Trujillo sosteniendo su agenda de citas del Beauty Studio"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 32vw, 75vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={200} className="absolute right-0 bottom-[-6%] w-[62%] overflow-hidden rounded-[1.5rem] border-4 border-ink shadow-2xl">
            <div className="relative aspect-[3/2]">
              <Image
                src={images.workshop}
                alt="Anyi Trujillo en el Workshop Internacional de Novias de Cristina Cuéllar"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 26vw, 60vw"
                className="object-cover"
              />
            </div>
            <p className="bg-ink-2 px-4 py-2.5 text-xs text-sand">Workshop Internacional de Novias · Cristina Cuéllar</p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center pt-10 lg:pt-0">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-nude uppercase">
              <span className="h-px w-8 bg-nude/60" aria-hidden />
              Sobre Anyi
            </p>
            <h2 id="about-title" className="mt-5 font-display text-4xl leading-[1.05] font-light text-balance md:text-6xl">
              Empecé con un sueño y unas brochas. <em className="text-gradient-gold">Hoy vivo de lo que amo.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-7 space-y-4 text-lg leading-relaxed text-sand">
            <p>
              Soy Anyi Trujillo y llevo {business.yearsOfExperience} años dedicada al maquillaje y peinado profesional.
              Me especializo en resaltar la belleza natural de cada mujer, creando looks únicos que reflejan su estilo y
              su personalidad.
            </p>
            <p>
              Para mí, maquillar es mucho más que aplicar producto: es ayudarte a que te mires al espejo y te sientas
              segura, radiante y lista para vivir tu historia.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
            {business.certifications.map((certification) => (
              <span key={certification} className="rounded-full border border-nude/40 bg-nude/5 px-4 py-2 text-sm text-champagne">
                Certificada · {certification}
              </span>
            ))}
          </Reveal>

          <Reveal delay={260} className="mt-10 flex items-center gap-5 rounded-3xl border border-line bg-ink-2 p-5">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
              <Image
                src={images.brideAndDaughter}
                alt=""
                fill
                placeholder="blur"
                sizes="5rem"
                className="object-cover object-[60%_30%]"
              />
            </div>
            <p className="text-sm leading-relaxed text-sand">
              <span className="block font-display text-2xl text-ivory">Un estudio de madre e hija</span>
              Trabajo junto a mi hija, mi compañera de vida y de sueños. Juntas cuidamos cada detalle de tu día.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-page mt-24 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 100} className="bg-ink p-8">
            <span className="font-display text-5xl text-nude/60">0{index + 1}</span>
            <h3 className="mt-4 text-lg font-semibold text-ivory">{pillar.title}</h3>
            <p className="mt-2 text-sand">{pillar.text}</p>
          </Reveal>
        ))}
      </div>

      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-10 w-[40rem] opacity-[0.04]">
        <Logo className="w-full text-champagne" />
      </div>
    </section>
  );
}
