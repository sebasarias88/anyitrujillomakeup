import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";

const steps = [
  {
    title: "La prueba",
    text: "Nos vemos en el estudio para probar maquillaje y peinado. Definimos juntas el look según tu vestido, tu piel y lo que sueñas.",
    image: images.brideMirror,
    alt: "Clienta mirándose al espejo del estudio con su peinado terminado",
  },
  {
    title: "El día de tu boda",
    text: "Te maquillo y te peino para que llegues lista a la ceremonia, en el estudio o donde te arregles.",
    image: images.brideTerrace,
    alt: "Novia con recogido romántico en una terraza con vista al paisaje cafetero",
  },
  {
    title: "Durante las fotos",
    text: "Con Novia Rubí te acompaño hasta 3 horas, con retoque de maquillaje, retoque final y cambio de peinado.",
    image: images.brideAndDaughter,
    alt: "Novia y acompañante con batas bordadas y peinados elaborados",
  },
];

/** The bridal process in three illustrated steps. */
export function Process() {
  return (
    <section id="proceso" aria-labelledby="process-title" className="scroll-mt-28 bg-white py-24 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          align="center"
          eyebrow="Así te acompaño"
          title={
            <>
              De la prueba <em className="text-nude-deep">al último baile</em>
            </>
          }
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 80} className="overflow-hidden rounded-[1.25rem] border border-line bg-white">
              <span className="relative block aspect-[4/3]">
                <Image src={step.image} alt={step.alt} fill placeholder="blur" sizes="(min-width: 768px) 24rem, 92vw" className="object-cover" />
                <span className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-full bg-white font-display text-[1.1rem] text-nude-deep">
                  {index + 1}
                </span>
              </span>
              <span className="block p-7">
                <span className="block font-display text-[1.45rem]">{step.title}</span>
                <span className="mt-2 block leading-relaxed text-ink-soft">{step.text}</span>
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
