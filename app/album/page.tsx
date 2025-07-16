import { Hero } from "@/components/Hero";
import { GALERY_IMAGES } from "@/data/gallery-images";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GalleryPage = () => {
  return (
    <main className="container">
      <Hero
        imgSrc="/gallery-background.jpg"
        title="Gallery"
        className="mb-24"
      />
      <section className="max-w-3xl mx-auto mb-24">
        <h2 className="text-center text-3xl mb-6">Dance Memories</h2>
        <p className="text-center text-text text-md font-sans">
          Explore our collection of performances, competitions, studio moments,
          and special events from Angela's Dance Academy.
        </p>
      </section>
      <section aria-labelledby="gallery" className="font-sans mb-30">
        <h2 id="gallery" className="sr-only">
          Gallery Overview
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 md:gap-12">
          {GALERY_IMAGES.map((image, index) => (
            <li
              key={index}
              className="overflow-hidden border-transparent border md:border-border flex flex-col h-full bg-white relative group focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={290}
                  height={220}
                  className="w-full h-full transition-all object-cover"
                />
                <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Link
                  href={`/album/${image.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-y-1 text-white text-sm font-sans opacity-0 group-hover:opacity-100 transition-opacity z-30 uppercase"
                >
                  <Eye width={30} height={30} />
                  View Album
                </Link>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-end">
                <h3 className="mb-2">{image.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default GalleryPage;
