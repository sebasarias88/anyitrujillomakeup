import { CheckIcon } from "@/components/ui/icons";
import { bridalPackages, extraHourPrice, formatCOP } from "@/lib/site";

// What every package includes is said once; the table compares only the differences.
const shared = bridalPackages[0].includes.filter((item) => bridalPackages.every((pkg) => pkg.includes.includes(item)));
// "Entrega completamente lista" is listed only under Especial but is not a real
// difference: showing a dash for the others would wrongly imply they lack it.
const notADifference = "Entrega completamente lista para la ceremonia";
const differences = [...new Set(bridalPackages.flatMap((pkg) => pkg.includes))].filter(
  (item) => !shared.includes(item) && item !== notADifference,
);

type PackagesTableProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

/**
 * The three bridal packages side by side in a real table. Rubí sits on the
 * nude field as the complete experience. Phones get stacked blocks instead.
 */
export function PackagesTable({ selectedId, onSelect }: PackagesTableProps) {
  return (
    <section aria-labelledby="packages-title" className="container-page py-28 md:py-40">
      <h2 id="packages-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.75rem]">
        Tres formas de vivir tu día
      </h2>
      <p className="mt-4 max-w-[52ch] text-[1.05rem] leading-relaxed">
        Todos incluyen: {shared.map((item) => item.charAt(0).toLowerCase() + item.slice(1)).join(" y ")}. Ningún
        paquete incluye accesorios como tocados o aretes.
      </p>

      {/* Phones: one block per package listing only what it adds (a narrow table would show dashes first). */}
      <ul className="mt-10 space-y-3 md:hidden">
        {bridalPackages.map((pkg) => {
          const extras = pkg.includes.filter((item) => differences.includes(item));
          const selected = pkg.id === selectedId;
          return (
            <li key={pkg.id} className={`px-5 py-6 ${pkg.highlight ? "bg-nude-field" : "bg-marble"}`}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[1.75rem] leading-none">{pkg.name}</h3>
                <span className="font-display text-[1.6rem] leading-none tabular-nums">{formatCOP(pkg.price)}</span>
              </div>
              <p className="mt-1.5 text-[0.95rem]">{pkg.subtitle}</p>
              {extras.length ? (
                <ul className="mt-4 space-y-2">
                  {extras.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.95rem] leading-snug">
                      <CheckIcon className="mt-0.5 size-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-[0.95rem]">Lo esencial: prueba y tu look el día de la boda.</p>
              )}
              {pkg.id === "rubi" ? (
                <p className="mt-3 text-[0.95rem]">Hasta 3 h de acompañamiento; hora adicional {formatCOP(extraHourPrice)}.</p>
              ) : null}
              <a
                href="#cotizador"
                onClick={() => onSelect(pkg.id)}
                aria-current={selected ? "true" : undefined}
                className="mt-4 inline-flex min-h-11 items-center font-semibold underline decoration-gold decoration-2 underline-offset-[6px]"
              >
                {selected ? "Elegido en tu cotización" : "Cotizar este paquete"}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 max-md:hidden">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Comparación de los paquetes de novia</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[28%] bg-paper" />
              {bridalPackages.map((pkg) => (
                <th
                  key={pkg.id}
                  scope="col"
                  className={`w-[24%] px-5 pt-6 pb-4 align-top font-normal ${pkg.highlight ? "bg-nude-field" : ""}`}
                >
                  <span className="block font-display text-[1.75rem] leading-none">{pkg.name}</span>
                  <span className="mt-1.5 block text-[0.95rem]">{pkg.subtitle}</span>
                  <span className="mt-4 block font-display text-[2rem] leading-none tabular-nums">{formatCOP(pkg.price)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {differences.map((feature, row) => (
              <tr key={feature} className={row % 2 === 0 ? "bg-marble" : ""}>
                <th scope="row" className={`py-4 pr-4 text-[0.95rem] font-normal ${row % 2 === 0 ? "bg-marble" : "bg-paper"}`}>
                  {feature}
                </th>
                {bridalPackages.map((pkg) => {
                  const included = pkg.includes.includes(feature);
                  return (
                    <td key={pkg.id} className={`px-5 py-4 ${pkg.highlight ? "bg-nude-field" : ""}`}>
                      {included ? (
                        <>
                          <CheckIcon className="size-5" />
                          <span className="sr-only">Incluido</span>
                        </>
                      ) : (
                        <span className="text-ink-soft">
                          <span aria-hidden>—</span>
                          <span className="sr-only">No incluido</span>
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <th scope="row" className="bg-paper py-5 pr-4 text-[0.95rem] font-normal">
                Hora adicional de acompañamiento
              </th>
              {bridalPackages.map((pkg) => (
                <td key={pkg.id} className={`px-5 py-5 text-[0.95rem] ${pkg.highlight ? "bg-nude-field" : ""}`}>
                  {pkg.id === "rubi" ? (
                    `${formatCOP(extraHourPrice)} por hora, después de 3 h`
                  ) : (
                    <span className="text-ink-soft">
                      <span aria-hidden>—</span>
                      <span className="sr-only">No aplica</span>
                    </span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="bg-paper" />
              {bridalPackages.map((pkg) => {
                const selected = pkg.id === selectedId;
                return (
                  <td key={pkg.id} className={`px-5 pt-2 pb-6 ${pkg.highlight ? "bg-nude-field" : ""}`}>
                    <a
                      href="#cotizador"
                      onClick={() => onSelect(pkg.id)}
                      aria-current={selected ? "true" : undefined}
                      className={`pressable inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-2 underline-offset-[6px] ${
                        selected ? "decoration-gold" : "decoration-ink/30 hover:decoration-ink"
                      }`}
                    >
                      {selected ? "Elegido en tu cotización" : "Cotizar este paquete"}
                    </a>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
