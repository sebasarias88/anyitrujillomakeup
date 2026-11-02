import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { formatCOP } from "@/lib/site";

/** The bridal offer as one sentence, the price sitting on a painted gold block. */
export function PriceStatement() {
  return (
    <section aria-labelledby="price-title" className="bg-blush py-28 md:py-40">
      <Reveal className="container-page">
        <h2 id="price-title" className="font-display text-[11vw] leading-[0.98] tracking-[-0.03em] md:text-[7.4vw]">
          Tu maquillaje de novia
          <br />
          desde{" "}
          <span className="relative inline-block px-[0.15em]">
            <span aria-hidden className="price-paint absolute inset-0 bg-gold" />
            <span className="relative">{formatCOP(800_000)}</span>
          </span>
        </h2>
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
          <p className="max-w-[46ch] text-[1.15rem] leading-relaxed md:col-span-6">
            Incluye la prueba de maquillaje y peinado en el estudio. Suma a tu mamá y a tus damas, y ve el total al
            instante.
          </p>
          <div className="md:col-span-4 md:col-start-9 md:text-right">
            <ButtonLink href="/novias#cotizador" className="max-md:w-full">
              Cotizar mi boda
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
