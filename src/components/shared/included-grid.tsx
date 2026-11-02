import { CheckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";

/** "What is included": four short cards with a check. */
export function IncludedGrid({ items, title = "Todo lo que necesitas" }: { items: { title: string; text: string }[]; title?: string }) {
  return (
    <section aria-labelledby="included-title" className="bg-white py-24 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="included-title"
          align="center"
          eyebrow="Qué incluye"
          title={
            <>
              {title} <em className="text-nude-deep">en un solo lugar</em>
            </>
          }
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 60} className="rounded-[1.1rem] border border-line p-4 sm:p-7">
              <span className="flex size-9 items-center sm:size-11 justify-center rounded-full bg-marble text-nude-deep">
                <CheckIcon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-[1.1rem] leading-snug sm:mt-5 sm:text-[1.25rem]">{item.title}</h3>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft sm:text-[0.95rem]">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
