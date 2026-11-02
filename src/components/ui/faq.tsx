import { ChevronIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

type FaqProps = {
  title: string;
  items: readonly { q: string; a: string }[];
};

/**
 * Wide heading, questions indented to the right half. No rules: an open
 * question lays a marble tile behind itself. Native <details>, so it works
 * without JavaScript and with the keyboard; the page adds the FAQPage JSON-LD.
 */
export function Faq({ title, items }: FaqProps) {
  return (
    <section aria-labelledby="faq-title" className="container-page py-28 md:py-44">
      <Reveal>
        <h2 id="faq-title" className="max-w-[16ch] font-display text-[2.4rem] leading-[1] font-normal tracking-[-0.02em] md:text-[4.6rem]">
          {title}
        </h2>
      </Reveal>
      <div className="mt-14 md:mt-20 md:grid md:grid-cols-12">
        <div className="space-y-3 md:col-span-8 md:col-start-5">
          {items.map((item, index) => (
            <Reveal key={item.q} delay={index * 60}>
              <details name="faq" className="faq-item group -mx-4 px-4 open:bg-marble md:-mx-6 md:px-6">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.2rem] md:text-[1.4rem] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronIcon className="size-5 shrink-0 rotate-90 transition-transform duration-200 group-open:-rotate-90" />
                </summary>
                <p className="max-w-[48ch] pb-6 text-[1.05rem] leading-relaxed">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
