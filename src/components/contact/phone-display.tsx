import { Reveal } from "@/components/ui/reveal";
import { business, pageWhatsappMessage, whatsappUrl } from "@/lib/site";

/**
 * The WhatsApp number set as display type from margin to margin: the most
 * direct way to reach Anyi. Corners carry the studio, hours and Instagram.
 */
export function PhoneDisplay() {
  return (
    <section aria-labelledby="phone-title" className="bg-blush">
      <div className="container-page grid gap-y-10 py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">WhatsApp</p>
          <h2 id="phone-title" className="mt-3 max-w-[24ch] font-display text-[1.6rem] leading-tight md:text-[2rem]">
            Cuéntame tu fecha y tu evento por WhatsApp
          </h2>
        </Reveal>

        <Reveal className="self-end">
          <a
            href={whatsappUrl(pageWhatsappMessage["/contacto"])}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Escribir por WhatsApp al ${business.phoneDisplay}`}
            className="block pb-[0.18em] font-display text-[13vw] leading-[1] whitespace-nowrap transition-colors duration-200 hover:text-nude-deep md:text-[11vw] xl:text-[9.5rem]"
          >
            {business.phoneDisplay}
          </a>
        </Reveal>

        <div className="grid gap-6 text-[0.95rem] sm:grid-cols-2">
          <p className="leading-relaxed">
            {business.address.street}
            <br />
            {business.address.city}, {business.address.region}
            <br />
            {business.hours.map((item) => `${item.days}: ${item.time}`).join(" · ")}
          </p>
          <p className="leading-relaxed sm:text-right">
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Cómo llegar
            </a>
            <br />
            <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Instagram {business.instagramHandle}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
