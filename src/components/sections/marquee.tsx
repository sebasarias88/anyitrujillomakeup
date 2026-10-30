import { SparkleIcon } from "@/components/ui/icons";

const items = ["Novias", "Aerógrafo", "XV años", "Peinados", "Grados", "Maquillaje social", "Sesiones de fotos", "Cursos"];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-line bg-ink-2 py-6">
      <div className="flex w-max motion-safe:animate-marquee">
        {row.map((item, index) => (
          <span key={index} className="flex items-center gap-8 pr-8 font-display text-3xl font-light text-ivory/80 italic md:text-4xl">
            {item}
            <SparkleIcon className="size-4 text-nude" />
          </span>
        ))}
      </div>
    </div>
  );
}
