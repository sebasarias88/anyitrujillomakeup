import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { images } from "@/lib/images";
import { pageWhatsappMessage } from "@/lib/site";

/** Closing invitation used at the end of every page. */
export function CtaBanner({ message = pageWhatsappMessage["/"] }: { message?: string }) {
  return (
    <section aria-labelledby="cta-title" className="container-page pb-24 md:pb-28">
      <Reveal className="grid overflow-hidden rounded-[1.75rem] bg-nude-field md:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h2 id="cta-title" className="font-display text-[2.2rem] leading-[1.1] md:text-[2.9rem]">
            Tu día merece un look <em className="text-nude-deep">inolvidable</em>
          </h2>
          <p className="mt-4 max-w-[44ch] text-[1.05rem] leading-relaxed font-light text-ink-soft">
            Escríbeme con tu fecha y tu evento, y apartemos tu cita.
          </p>
          <WhatsAppButton message={message} className="mt-7 self-start">
            Apartar mi fecha
          </WhatsAppButton>
        </div>
        <div className="relative min-h-64 md:min-h-96">
          <Image
            src={images.brideTerrace}
            alt="Novia en una terraza con vista a las montañas del Quindío"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 30rem, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
