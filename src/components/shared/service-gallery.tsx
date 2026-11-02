import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { gallery, type GalleryCategory } from "@/lib/images";

/** Four photographs of the service's category (the rest of the work fills in when there are fewer). */
export function ServiceGallery({ category, title }: { category: GalleryCategory; title: string }) {
  const own = gallery.filter((item) => item.category === category);
  const fill = gallery.filter((item) => item.category !== category && item.category !== "estudio");
  const photos = [...own, ...fill].slice(0, 4);
  return (
    <section aria-labelledby="service-gallery-title" className="bg-white py-24 md:py-28">
      <div className="container-page">
        <h2 id="service-gallery-title" className="font-display text-[2.2rem] leading-[1.1] md:text-[2.8rem]">
          {title}
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <Reveal as="li" variant="photo" key={photo.id} delay={index * 60} className="relative aspect-[3/4] overflow-hidden rounded-[1rem]">
              <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 18rem, 46vw" className="object-cover" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
