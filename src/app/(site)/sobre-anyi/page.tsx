import { About } from "@/components/about/about";
import { PageHero } from "@/components/layout/page-hero";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, businessRef, pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/sobre-anyi",
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

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd("/sobre-anyi"), person]} />
      <PageHero
        monument="Anyi"
        title="Soy Anyi Trujillo"
        intro={<p>Maquilladora profesional en Armenia desde hace {business.yearsOfExperience} años, especialista en novias y aerógrafo.</p>}
        image={images.anyiPortrait}
        imageAlt="Retrato de Anyi Trujillo sonriendo, con blusa blanca"
      />
      <About />
    </>
  );
}
