import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { business, pages } from "@/lib/site";

/** The close of every page: logo, studio, contact, pages and hours on a white ground. */
export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-line bg-white text-ink">
      <div className="container-page max-w-[78rem] pt-16 pb-8 md:pt-20">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo className="h-16 text-ink" />
            <p className="mt-4 max-w-[26ch] text-[0.95rem] leading-relaxed text-ink-soft">
              {business.role} en {business.address.city}, {business.address.region}.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[0.72rem] tracking-[0.16em] uppercase">Estudio</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region}
            </p>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block min-h-11 py-2 underline decoration-nude underline-offset-4">
              Cómo llegar
            </a>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[0.72rem] tracking-[0.16em] uppercase">Contacto</h2>
            <ul className="mt-3 space-y-1.5 text-ink-soft">
              <li>WhatsApp {business.phoneDisplay}</li>
              <li>
                <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  Instagram {business.instagramHandle}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="hover:text-ink">
                  {business.email}
                </a>
              </li>
            </ul>
            <h2 className="mt-6 text-[0.72rem] tracking-[0.16em] uppercase">Horario</h2>
            <ul className="mt-3 space-y-1.5 text-ink-soft">
              {business.hours.map((item) => (
                <li key={item.days}>
                  {item.days}: {item.time}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-3">
            <h2 className="text-[0.72rem] tracking-[0.16em] uppercase">Páginas</h2>
            <ul className="mt-3 space-y-1.5">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link href={page.path} className="text-ink-soft hover:text-ink">
                    {page.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#sobre-mi" className="text-ink-soft hover:text-ink">
                  Sobre mí
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-14 border-t border-line pt-6 text-[0.85rem] text-ink-soft">© 2026 {business.name}</p>
      </div>
    </footer>
  );
}
