import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";

/**
 * The bridal process as three photographs down a falling diagonal. Order is
 * carried by position and by the run-in phrases, never by numbers.
 */
export function Process() {
  return (
    <section aria-labelledby="process-title" className="container-page py-28 md:py-44">
      <div className="grid gap-14 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
        <Reveal variant="photo" className="relative aspect-[3/4] md:col-span-4 md:row-start-1">
          <Image
            src={images.brideMirror}
            alt="Clienta mirándose al espejo del estudio con su peinado terminado"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="md:col-span-6 md:col-start-6 md:row-start-1">
          <Reveal>
            <h2 id="process-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[clamp(2.75rem,4vw,4rem)]">
              Así te acompaño
            </h2>
          </Reveal>
          <Reveal as="p" delay={80} className="mt-8 max-w-[40ch] text-[1.05rem] leading-relaxed">
            <strong>En la prueba,</strong> nos vemos en el estudio para probar maquillaje y peinado. Definimos juntas el
            look según tu vestido, tu piel y lo que sueñas para ese día.
          </Reveal>
        </div>

        <Reveal variant="photo" className="relative aspect-square max-md:ml-auto max-md:w-[62%] md:col-span-3 md:col-start-6 md:row-start-2 md:mt-[220px]">
          <Image
            src={images.brideTerrace}
            alt="Novia con recogido romántico y tiara en una terraza con vista al paisaje cafetero"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 25vw, 62vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal as="p" className="max-w-[36ch] text-[1.05rem] leading-relaxed max-md:ml-auto max-md:w-[62%] md:col-span-3 md:col-start-9 md:row-start-2 md:mt-[220px]">
          <strong>El día de tu boda,</strong> te maquillo y te peino para que llegues lista a la ceremonia, en el estudio o
          donde te arregles.
        </Reveal>

        <Reveal as="p" className="max-w-[36ch] text-[1.05rem] leading-relaxed max-md:order-1 md:col-span-3 md:col-start-4 md:row-start-3 md:mt-[180px] md:self-start">
          <strong>Durante las fotos,</strong> con el paquete Rubí te acompaño hasta 3 horas en la sesión previa a la
          ceremonia, con retoque de maquillaje, retoque final y cambio de peinado.
        </Reveal>
        <Reveal variant="photo" className="relative aspect-[16/10] max-md:w-[78%] md:col-span-5 md:col-start-8 md:row-start-3 md:mt-[180px]">
          <Image
            src={images.brideAndDaughter}
            alt="Novia y acompañante con batas bordadas y peinados elaborados"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 42vw, 78vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
