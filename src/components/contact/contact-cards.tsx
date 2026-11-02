import type { ReactNode } from "react";
import { ClockIcon, InstagramIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { business, pageWhatsappMessage, whatsappUrl } from "@/lib/site";

type ContactCard = { icon: ReactNode; title: string; lines: string[]; action: { label: string; href: string } | null };

const cards: ContactCard[] = [
  {
    icon: <WhatsAppIcon className="size-5" />,
    title: "WhatsApp",
    lines: [business.phoneDisplay, "Respondo el mismo día"],
    action: { label: "Escribirme", href: whatsappUrl(pageWhatsappMessage["/contacto"]) },
  },
  {
    icon: <PinIcon className="size-5" />,
    title: "El estudio",
    lines: [business.address.street, `${business.address.city}, ${business.address.region}`],
    action: { label: "Cómo llegar", href: business.mapsUrl },
  },
  {
    icon: <ClockIcon className="size-5" />,
    title: "Horario",
    lines: business.hours.map((item) => `${item.days}: ${item.time}`),
    action: null,
  },
  {
    icon: <InstagramIcon className="size-5" />,
    title: "Instagram",
    lines: [business.instagramHandle, "Mis trabajos más recientes"],
    action: { label: "Seguirme", href: business.instagram },
  },
];

/** The four ways to reach Anyi, right under the page title. */
export function ContactCards() {
  return (
    <section aria-label="Datos de contacto" className="bg-white pt-16 md:pt-20">
      <ul className="container-page grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Reveal as="li" key={card.title} delay={index * 60} className="flex flex-col rounded-[1.25rem] border border-line bg-blush p-4 sm:p-6">
            <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-white text-nude-deep shadow-soft">
              {card.icon}
            </span>
            <p className="mt-4 font-display text-[1.15rem] sm:mt-5 sm:text-[1.35rem]">{card.title}</p>
            {card.lines.map((line) => (
              <p key={line} className="mt-1 text-[0.82rem] leading-snug text-ink-soft sm:text-[0.92rem]">
                {line}
              </p>
            ))}
            {card.action ? (
              <a
                href={card.action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-11 items-end pt-3 text-[0.72rem] tracking-[0.14em] sm:text-[0.78rem] uppercase underline decoration-line-strong underline-offset-[6px] hover:decoration-nude-deep"
              >
                {card.action.label} →
              </a>
            ) : null}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
