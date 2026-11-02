import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { business, pageWhatsappMessage } from "@/lib/site";

export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="container-page max-w-[78rem] py-24 md:py-32">
      <div className="flex flex-wrap items-center justify-between gap-10">
        <Reveal className="max-w-2xl">
          <h2 id="closing-title" className="font-display text-[2.4rem] leading-[1.08] md:text-[3.6rem]">
            ¿Ya tienes fecha? <em className="text-nude-deep">Apartémosla.</em>
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed font-light text-ink-soft">
            Escríbeme con tu fecha y tu evento. Te atiendo en mi estudio o llevo todo a donde te arregles en el Quindío;
            el domicilio se cotiza según el lugar.
          </p>
        </Reveal>
        <Reveal delay={100} className="flex flex-col items-start gap-3">
          <WhatsAppButton message={pageWhatsappMessage["/"]}>Escribir por WhatsApp</WhatsAppButton>
          <span className="tracking-[0.04em]">{business.phoneDisplay}</span>
        </Reveal>
      </div>
    </section>
  );
}
