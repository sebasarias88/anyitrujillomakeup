import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { business, pages, pageWhatsappMessage } from "@/lib/site";

/**
 * The close of every page: a nude field with four short columns and the
 * name returning as a monument from margin to margin.
 */
export function SiteFooter() {
  return (
    <footer id="site-footer" className="bg-nude-field text-ink">
      <div className="container-page flex min-h-[100svh] flex-col pt-14 pb-6 md:pt-20">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-[18ch] font-display text-[2rem] leading-[1.05]">Tu fecha se aparta con tu reserva.</p>
            <WhatsAppButton message={pageWhatsappMessage["/"]} variant="ink" className="mt-6">
              Escríbeme por WhatsApp
            </WhatsAppButton>
          </div>

          <div className="lg:col-span-3 lg:col-start-5">
            <h2 className="font-semibold">El estudio</h2>
            <p className="mt-2 leading-relaxed">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region}
            </p>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline underline-offset-4">
              Cómo llegar
            </a>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-2">
            <h2 className="font-semibold">Páginas</h2>
            <ul className="mt-2 space-y-1.5">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link href={page.path} className="hover:underline hover:underline-offset-4">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-semibold">Horario</h2>
            <ul className="mt-2 space-y-1.5">
              {business.hours.map((item) => (
                <li key={item.days}>
                  {item.days}: {item.time}
                </li>
              ))}
            </ul>
            <h2 className="mt-6 font-semibold">Redes</h2>
            <ul className="mt-2 space-y-1.5">
              <li>
                <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                  Instagram {business.instagramHandle}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="hover:underline hover:underline-offset-4">
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-auto pt-16">
          {/* textLength fits the name to the exact width by adjusting only the spacing, so it never wraps or overflows. */}
          <svg viewBox="0 0 1000 200" role="img" aria-label={business.name} className="block w-full">
            <text
              x="0"
              y="150"
              textLength="1000"
              lengthAdjust="spacing"
              className="fill-ink font-display"
              style={{ fontSize: 190, fontWeight: 300 }}
            >
              Anyi Trujillo
            </text>
          </svg>
          <p className="mt-4 text-[0.95rem]">
            {business.name} · Maquilladora profesional en {business.address.city}, {business.address.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
