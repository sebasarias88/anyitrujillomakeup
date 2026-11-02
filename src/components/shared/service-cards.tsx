import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { serviceImages } from "@/lib/images";
import { formatCOP, services } from "@/lib/site";

/** Four service cards: photo, "Desde $X", name, one line and a link to the service page. */
export function ServiceCards() {
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
      {services.map((service, index) => {
        const photo = serviceImages[service.path];
        return (
          <Reveal as="li" key={service.path} delay={index * 70} className="shrink-0 basis-[78%] snap-start sm:basis-auto">
            <Link
              href={service.path}
              className="group flex h-full flex-col"
            >
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] shadow-soft">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.05]"
                />
                {service.badge ? (
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[0.7rem] tracking-[0.12em] text-nude-deep uppercase">
                    {service.badge}
                  </span>
                ) : null}
              </span>
              <span className="mt-5 text-[0.78rem] tracking-[0.2em] text-nude-deep uppercase">Desde {formatCOP(service.fromPrice)}</span>
              <span className="mt-1.5 font-display text-[1.75rem] leading-tight">{service.title}</span>
              <span className="mt-2 text-[0.95rem] leading-relaxed font-light text-ink-soft">{service.summary}</span>
              <span className="mt-auto pt-4 text-[0.78rem] tracking-[0.16em] uppercase underline decoration-line-strong underline-offset-[6px] transition-colors group-hover:decoration-nude-deep">
                Ver servicio <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
