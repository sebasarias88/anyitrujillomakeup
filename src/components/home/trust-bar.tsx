import { DropIcon, GroupIcon, PinIcon, StarIcon } from "@/components/ui/icons";

const items = [
  { icon: StarIcon, title: "Certificada", text: "México y New York" },
  { icon: DropIcon, title: "Aerógrafo", text: "Resiste calor y lágrimas" },
  { icon: GroupIcon, title: "Equipo para grupos", text: "Mamá, damas e invitadas" },
  { icon: PinIcon, title: "Voy hasta ti", text: "Estudio o domicilio en el Quindío" },
];

export function TrustBar() {
  return (
    <section aria-label="Por qué elegirme" className="border-b border-line bg-white">
      <ul className="container-page grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-marble text-nude-deep sm:size-13">
              <Icon className="size-6" />
            </span>
            <span className="leading-snug">
              <span className="block font-display text-[1.1rem] sm:text-[1.2rem]">{title}</span>
              <span className="block text-[0.85rem] text-ink-soft sm:text-[0.92rem]">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
