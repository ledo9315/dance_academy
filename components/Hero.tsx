import Image from "next/image";
import cn from "classnames";

interface Props {
  className?: string;
  title: string;
  imgSrc: string;
}

export const Hero = ({ className, title, imgSrc }: Props) => {
  return (
    <section className={cn("flex flex-col items-center w-full", className)}>
      <h1 className="sr-only">{title}</h1>
      <div className="relative w-full h-64 sm:h-80 lg:h-100">
        <Image
          src={imgSrc}
          alt="Ballet Class"
          width={1000}
          height={400}
          className="w-full h-64 sm:h-80 lg:h-100 object-cover mb-6 sm:mb-8"
        />
        <div className="absolute inset-0 flex flex-col gap-y-3 sm:gap-y-5 items-center justify-center">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl z-10 uppercase px-4 text-center">
            {title}
          </h1>
          <div className="border-[1.5px] border-accent w-12 sm:w-15 z-10" />
        </div>
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>
    </section>
  );
};
