import Image, { type StaticImageData } from "next/image";
import { ArrowIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { images } from "@/lib/images";
import { formatCOP, whatsappUrl } from "@/lib/site";

type Service = {
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  badge?: string;
  href: string;
  external?: boolean;
  span: string;
};

const services: Service[] = [
  {
    title: "Novias",
    description: "Prueba, maquillaje y peinado para el día más importante, con acompañamiento hasta el último retoque.",
    image: images.brideTerrace,
    alt: "Novia maquillada por Anyi Trujillo con vista al paisaje cafetero",
    badge: `Desde ${formatCOP(800_000)}`,
    href: "#novias",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "XV años",
    description: "Un look fresco y elegante, pensado para que la quinceañera sea la protagonista.",
    image: images.quinceEmerald,
    alt: "Quinceañera con vestido esmeralda y ondas definidas",
    href: whatsappUrl("Hola Anyi ✨ Quiero información sobre maquillaje y peinado para XV años."),
    external: true,
    span: "",
  },
  {
    title: "Social & grados",
    description: "Para cumpleaños, grados y eventos: un acabado impecable que dura toda la noche.",
    image: images.glamFront,
    alt: "Maquillaje social en tonos rosa con piel luminosa",
    href: whatsappUrl("Hola Anyi ✨ Quiero agendar un maquillaje social / de grado."),
    external: true,
    span: "",
  },
  {
    title: "Sesiones de fotos",
    description: "Maquillaje fotogénico para sesiones de maternidad, retratos y producciones.",
    image: images.brideMirror,
    alt: "Clienta frente al espejo del estudio con su peinado terminado",
    href: whatsappUrl("Hola Anyi ✨ Quiero información sobre maquillaje para una sesión de fotos."),
    external: true,
    span: "",
  },
  {
    title: "Cursos",
    description: "Presenciales y personalizados. Convierte tu pasión en tu profesión.",
    image: images.workshop,
    alt: "Anyi Trujillo maquillando en el workshop internacional de novias de Cristina Cuéllar",
    href: "#cursos",
    span: "",
  },
];

export function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="container-page py-24 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          id="services-title"
          eyebrow="Servicios"
          title={
            <>
              Un look para cada <em className="text-gradient-gold">momento importante</em>
            </>
          }
        />
        <Reveal delay={150} className="max-w-sm text-sand">
          Maquillaje tradicional o con aerógrafo, peinado profesional y productos de alta gama. En el estudio o a
          domicilio en todo el Quindío.
        </Reveal>
      </div>

      <div className="mt-14 grid auto-rows-[22rem] gap-4 md:grid-cols-4 md:auto-rows-[19rem]">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 80} className={service.span}>
            <a
              href={service.href}
              {...(service.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={`${service.title}: ${service.description}`}
              className="group relative block size-full overflow-hidden rounded-3xl border border-line bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude"
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-[1.4s] ease-out group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              {service.badge ? (
                <span className="absolute top-5 left-5 rounded-full bg-ink/70 px-4 py-1.5 text-xs font-semibold text-champagne backdrop-blur">
                  {service.badge}
                </span>
              ) : null}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="font-display text-3xl text-ivory md:text-4xl">{service.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-sand">{service.description}</p>
                </div>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-nude/40 text-nude transition group-hover:bg-nude group-hover:text-ink">
                  <ArrowIcon className="size-4 -rotate-45 transition group-hover:rotate-0" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
