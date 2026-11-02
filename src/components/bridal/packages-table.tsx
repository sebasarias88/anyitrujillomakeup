import { CheckIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/shared/section-heading";
import { bridalPackages, companionServices, formatCOP } from "@/lib/site";

type PackagesTableProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

/**
 * The three bridal packages as pricing cards. Rubí is highlighted as the
 * complete experience. Choosing a card preselects it in the quote below.
 */
export function PackagesTable({ selectedId, onSelect }: PackagesTableProps) {
  return (
    <section id="paquetes" aria-labelledby="packages-title" className="scroll-mt-28 bg-marble py-24 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="packages-title"
          align="center"
          eyebrow="Paquetes"
          title={
            <>
              Elige tu <em className="text-nude-deep">paquete de novia</em>
            </>
          }
          intro="Todos incluyen prueba de maquillaje y peinado en el estudio. Los accesorios como tocados o aretes no están incluidos."
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {bridalPackages.map((pkg) => {
            const selected = pkg.id === selectedId;
            return (
              <li
                key={pkg.id}
                className={`relative flex flex-col rounded-[1.25rem] bg-white p-8 ${pkg.highlight ? "border-2 border-nude-deep shadow-lift" : "border border-line"}`}
              >
                {pkg.highlight ? (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-nude-deep px-4 py-1 text-[0.7rem] tracking-[0.16em] whitespace-nowrap text-paper uppercase">
                    Experiencia completa
                  </span>
                ) : null}
                <h3 className="font-display text-[1.65rem] leading-tight">{pkg.name}</h3>
                <p className="text-[0.95rem] text-ink-soft">{pkg.id === "rubi" ? "Te acompaño hasta 3 horas" : pkg.subtitle}</p>
                <p className="mt-5 font-display text-[2.5rem] leading-none">{formatCOP(pkg.price)}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-[0.95rem]">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckIcon className="mt-1 size-4 shrink-0 text-nude-deep" />
                      {item}
                    </li>
                  ))}
                  {pkg.note ? <li className="pl-7 text-ink-soft">{pkg.note}</li> : null}
                </ul>
                <a
                  href="#cotizador"
                  onClick={() => onSelect(pkg.id)}
                  aria-current={selected}
                  className={`pressable mt-8 inline-flex min-h-12 items-center justify-center rounded-full text-[0.8rem] tracking-[0.12em] uppercase ${
                    pkg.highlight ? "bg-ink text-paper hover:bg-ink-soft" : "border border-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  {selected ? "Elegido · cotizar" : "Elegir este paquete"}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-center text-[0.95rem] text-ink-soft">
          Acompañantes: {companionServices.map((item) => `${item.label.toLowerCase()} ${formatCOP(item.price)}`).join(" · ")}
        </p>
      </div>
    </section>
  );
}
