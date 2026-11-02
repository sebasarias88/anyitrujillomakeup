import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { companionServices, formatCOP } from "@/lib/site";

/** Real companion prices and the team Anyi trained, for groups. */
export function Companions() {
  return (
    <section aria-labelledby="companions-title" className="bg-blush py-28 md:py-40">
      <div className="container-page grid gap-12 md:grid-cols-12 md:gap-6">
        <Reveal variant="photo" className="relative aspect-[3/2] md:col-span-6 md:self-start">
          <Image
            src={images.brideAndDaughter}
            alt="Novia y acompañante con batas bordadas y peinados elaborados"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="md:col-span-5 md:col-start-8">
          <Reveal>
            <h2 id="companions-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.75rem]">
              Para tu mamá, tus damas y tu familia
            </h2>
            <p className="mt-5 max-w-[40ch] text-[1.05rem] leading-relaxed">
              Cuento con un equipo formado por mí para atender grupos con puntualidad y la misma calidad.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <table className="mt-10 w-full text-left">
              <caption className="sr-only">Tarifas por acompañante</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Servicio</th>
                  <th scope="col">Valor por persona</th>
                </tr>
              </thead>
              <tbody>
                {companionServices.map((service, index) => (
                  <tr key={service.id} className={index % 2 === 0 ? "bg-paper/60" : ""}>
                    <th scope="row" className="px-4 py-4 font-normal">
                      {service.label}
                    </th>
                    <td className="px-4 py-4 text-right font-display text-[1.5rem] tabular-nums">{formatCOP(service.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[0.95rem]">Valor por persona.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
