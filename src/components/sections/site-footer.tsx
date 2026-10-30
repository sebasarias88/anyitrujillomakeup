import { ButtonLink } from "@/components/ui/button-link";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { business, navLinks, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Closing call to action */}
      <div className="container-page py-24 text-center md:py-32">
        <Reveal>
          <Logo className="mx-auto h-28 text-nude md:h-36" />
          <p className="mx-auto mt-8 max-w-3xl font-display text-4xl leading-tight font-light text-ivory md:text-6xl">
            Tu fecha se aparta con tu reserva. <em className="text-gradient-gold">Hablemos de tu look.</em>
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={whatsappUrl("Hola Anyi ✨ Quiero agendar una cita. ¿Me ayudas con la disponibilidad?")} external>
              <WhatsAppIcon className="size-4" />
              Escríbeme por WhatsApp
            </ButtonLink>
            <ButtonLink href={business.instagram} external variant="outline">
              <InstagramIcon className="size-4" />
              {business.instagramHandle}
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-line">
        <div className="container-page grid gap-10 py-14 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-ivory">{business.name}</p>
            <p className="mt-2 text-sm text-sand">{business.tagline}. Armenia, Quindío.</p>
          </div>
          <nav aria-label="Pie de página">
            <ul className="grid grid-cols-2 gap-2 text-sm text-sand">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-nude">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="space-y-2 text-sm text-sand">
            <li>
              <a href={whatsappUrl("Hola Anyi ✨")} target="_blank" rel="noopener noreferrer" className="hover:text-nude">
                WhatsApp {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-nude">
                {business.email}
              </a>
            </li>
            <li>
              {business.address.street}, {business.address.city}
            </li>
          </ul>
        </div>
        <div className="container-page flex flex-col justify-between gap-2 border-t border-line py-6 text-xs text-mute sm:flex-row">
          <p>© {business.name}. Todos los derechos reservados.</p>
          <p>
            Diseño y desarrollo por{" "}
            <a href="https://sebastianarias.dev" target="_blank" rel="noopener noreferrer" className="text-sand hover:text-nude">
              Sebastián Arias
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
