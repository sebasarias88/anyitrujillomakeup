import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { business, navLinks, services } from "@/lib/site";

/** The close of every page: four tidy columns on a light cream field. */
export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-line bg-nude-field text-ink">
      <div className="container-page pt-16 pb-8 md:pt-20">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-16 text-ink" />
            <p className="mt-4 max-w-[28ch] text-[0.95rem] leading-relaxed text-ink-soft">
              {business.role} en {business.address.city}, {business.address.region}. Novias, quinceañeras, eventos y cursos.
            </p>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center text-[0.9rem] tracking-[0.06em] underline decoration-nude-deep underline-offset-4"
            >
              {business.instagramHandle}
            </a>
          </div>

          <nav aria-label="Servicios">
            <h2 className="text-[0.72rem] tracking-[0.18em] uppercase">Servicios</h2>
            <ul className="mt-4 space-y-2 text-ink-soft">
              {services.map((service) => (
                <li key={service.path}>
                  <Link href={service.path} className="hover:text-ink">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.72rem] tracking-[0.18em] uppercase">Estudio</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region}
            </p>
            <ul className="mt-3 space-y-1 text-ink-soft">
              {business.hours.map((item) => (
                <li key={item.days}>
                  {item.days}: {item.time}
                </li>
              ))}
            </ul>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center underline decoration-nude-deep underline-offset-4">
              Cómo llegar
            </a>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="text-[0.72rem] tracking-[0.18em] uppercase">Contacto</h2>
            <ul className="mt-4 space-y-2 text-ink-soft">
              <li>WhatsApp {business.phoneDisplay}</li>
              <li>
                <a href={`mailto:${business.email}`} className="hover:text-ink">
                  {business.email}
                </a>
              </li>
              {navLinks
                .filter((page) => page.path !== "/")
                .map((page) => (
                  <li key={page.path}>
                    <Link href={page.path} className="hover:text-ink">
                      {page.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        <p className="mt-14 border-t border-line-strong pt-6 text-[0.85rem] text-ink-soft">© 2026 {business.name}</p>
      </div>
    </footer>
  );
}
