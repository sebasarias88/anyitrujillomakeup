import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { formatCOP, whatsappGreeting, type ServiceOption } from "@/lib/site";
import { SectionHeading } from "./section-heading";

/** Prices of a service as cards; the middle one is highlighted. */
export function PriceCards({ service, options, sample }: { service: string; options: ServiceOption[]; sample: boolean }) {
  return (
    <section aria-labelledby="prices-title" className="bg-marble py-24 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="prices-title"
          align="center"
          eyebrow="Precios"
          title={
            <>
              Elige la opción <em className="text-nude-deep">ideal para ti</em>
            </>
          }
          intro={sample ? "Precios de ejemplo para este demo: se reemplazan por los reales." : undefined}
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {options.map((option, index) => {
            const featured = index === 1;
            return (
              <Reveal
                as="li"
                key={option.name}
                delay={index * 70}
                className={`relative flex flex-col rounded-[1.25rem] bg-white p-8 ${featured ? "border-2 border-nude-deep shadow-lift" : "border border-line"}`}
              >
                {featured ? (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-nude-deep px-4 py-1 text-[0.7rem] tracking-[0.16em] whitespace-nowrap text-paper uppercase">
                    Recomendado
                  </span>
                ) : null}
                <h3 className="font-display text-[1.55rem] leading-tight">{option.name}</h3>
                <p className="mt-1 text-[0.95rem] text-ink-soft">{option.detail}</p>
                <p className="mt-6 font-display text-[2.3rem] leading-none">{formatCOP(option.price)}</p>
                <WhatsAppButton
                  message={`${whatsappGreeting} Me interesa ${service}: ${option.name} (${formatCOP(option.price)}). ¿Tienes disponibilidad?`}
                  variant={featured ? "primary" : "ink"}
                  icon={false}
                  className="mt-8 w-full"
                >
                  Lo quiero
                </WhatsAppButton>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
