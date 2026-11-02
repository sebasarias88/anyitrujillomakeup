import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, businessRef, pageMetadata } from "@/lib/seo";
import { business, pageWhatsappMessage } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/sobre-mi",
  title: "Sobre Anyi Trujillo, maquilladora en Armenia",
  description: `Conoce a Anyi Trujillo: ${business.yearsOfExperience} años de experiencia, especialista en novias y aerógrafo, certificada por el Instituto Cristina Cuéllar (México) y Tempto (New York).`,
});

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: business.artist,
  jobTitle: business.role,
  worksFor: businessRef,
  sameAs: [business.instagram],
};

const values = [
  { title: "Te escucho primero", text: "Antes de maquillar, entiendo tu evento, tu vestido y cómo te quieres sentir." },
  { title: "Tu piel, protagonista", text: "Preparo la piel para que el maquillaje se vea natural y dure todo el día." },
  { title: "Puntualidad", text: "Te entrego lista a tiempo, sin carreras ni estrés." },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <JsonLd data={[breadcrumbJsonLd("/sobre-mi"), person]} />
      <PageHero
        crumbs={[{ href: "/sobre-mi", label: "Sobre mí" }]}
        eyebrow="Sobre mí"
        title={
          <>
            Hola, soy Anyi. <em className="text-nude-deep">Bienvenida a mi estudio</em>
          </>
        }
        intro={<p>Maquilladora profesional en Armenia hace {business.yearsOfExperience} años, especialista en novias y aerógrafo.</p>}
        image={images.anyiPortrait}
        imageAlt="Retrato de Anyi Trujillo sonriendo, con blusa blanca"
        imagePosition="50% 15%"
        actions={
          <>
            <WhatsAppButton message={pageWhatsappMessage["/sobre-mi"]}>Escríbeme</WhatsAppButton>
            <ButtonLink href="/servicios" variant="ink" className="bg-white">
              Ver servicios
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="story-title" className="bg-white py-24 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Mi historia</p>
            <h2 id="story-title" className="mt-4 font-display text-[2.2rem] leading-[1.1] md:text-[2.8rem]">
              Maquillar es acompañarte en <em className="text-nude-deep">tus días más importantes</em>
            </h2>
            <p className="mt-6 text-[1.08rem] leading-relaxed font-light">
              Hace {business.yearsOfExperience} años convertí mi pasión en mi profesión. Me especialicé en novias y en maquillaje
              con aerógrafo, una técnica que deja la piel ligera, natural y firme durante todo el evento.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Hoy recibo a mis clientas en mi estudio en {business.address.city}, voy a donde se arreglen en el Quindío y cuento
              con un equipo formado por mí para atender a la mamá, las damas y las invitadas.
            </p>
          </Reveal>
          <Reveal variant="photo" className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
            <Image src={images.workshop} alt="Anyi Trujillo peinando a una novia en un taller de maquillaje" fill placeholder="blur" sizes="(min-width: 1024px) 36rem, 92vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="certs-title" className="bg-marble py-24 md:py-28">
        <div className="container-page">
          <SectionHeading
            id="certs-title"
            align="center"
            eyebrow="Formación"
            title={
              <>
                Certificada en <em className="text-nude-deep">México y New York</em>
              </>
            }
          />
          <ul className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            {business.certifications.map((certification) => {
              const [name, place] = certification.split(" · ");
              return (
                <li key={certification} className="rounded-[1.1rem] bg-white p-8 text-center shadow-soft">
                  <span className="block font-display text-[1.5rem]">{name}</span>
                  <span className="mt-1 block text-[0.78rem] tracking-[0.16em] text-ink-soft uppercase">{place}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-white py-24 md:py-28">
        <div className="container-page">
          <SectionHeading
            id="values-title"
            eyebrow="Cómo trabajo"
            title={
              <>
                Lo que vas a sentir <em className="text-nude-deep">en mi silla</em>
              </>
            }
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={index * 70} className="rounded-[1.1rem] border border-line p-8">
                <span className="font-display text-[2rem] text-nude-deep">0{index + 1}</span>
                <h3 className="mt-3 font-display text-[1.35rem]">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{value.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="studio-title" className="bg-marble py-24 md:py-28">
        <div className="container-page">
          <SectionHeading
            id="studio-title"
            eyebrow="El estudio"
            title={
              <>
                Un espacio pensado <em className="text-nude-deep">para ti</em>
              </>
            }
            intro={`${business.address.street}, ${business.address.city}. ${business.hours[0].days}, de ${business.hours[0].time}`}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { src: images.studioSign, alt: "Letrero dorado de Anyi Trujillo Beauty Studio" },
              { src: images.studioVanity, alt: "Tocador con luces del estudio" },
              { src: images.brideMirror, alt: "Clienta frente al espejo del estudio" },
            ].map((photo, index) => (
              <Reveal as="li" variant="photo" key={photo.alt} delay={index * 70} className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 640px) 30vw, 92vw" className="object-cover" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="bg-white pt-24 md:pt-28">
        <CtaBanner message={pageWhatsappMessage["/sobre-mi"]} />
      </div>
    </PageTransition>
  );
}
