import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

/** Short bridge to the airbrush scene on /servicios. */
export function AirbrushNote() {
  return (
    <section aria-labelledby="airbrush-note-title" className="bg-blush py-24 md:py-32">
      <Reveal className="container-page grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
        <h2 id="airbrush-note-title" className="font-display text-[2.4rem] leading-[1] tracking-[-0.02em] md:col-span-7 md:text-[4.4vw]">
          Con aerógrafo, hasta el último baile
        </h2>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-[1.05rem] leading-relaxed">
            Es mi especialidad: una bruma finísima de producto que resiste el calor, las lágrimas y las horas de fiesta, y
            se ve impecable en fotos y video.
          </p>
          <Link href="/servicios#aerografo" className="mt-5 inline-block min-h-11 py-2 font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">
            Ver cómo funciona
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
