import { PlusIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-ink-2 py-24 md:py-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          id="faq-title"
          eyebrow="Preguntas frecuentes"
          title={
            <>
              Resolvemos tus dudas <em className="text-gradient-gold">antes de reservar</em>
            </>
          }
        />
        <Reveal delay={100}>
          <div className="border-t border-line">
            {faqs.map((item) => (
              <details key={item.q} name="faq" className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-ivory transition hover:text-nude [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <PlusIcon className="size-5 shrink-0 text-nude transition duration-300 group-open:rotate-45" />
                </summary>
                <p className="-mt-1 pb-6 leading-relaxed text-sand">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
