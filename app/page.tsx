import Image from "next/image";

const Page = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-y-6 pt-10">
      <h1 className="sr-only">
        Angela's Dance Academy – Professional Dance Studio in Naples, FL
      </h1>
      <section className="w-full max-w-[800px] flex flex-col items-center mb-16">
        <figure className="mb-16">
          <Image
            src="/home_hero.jpg"
            alt="About our Academy"
            width={800}
            height={530}
          />
        </figure>

        <header className="text-center">
          <h2 className="text-3xl font-light mb-6">About Our Academy</h2>
          <div className="border border-accent w-15 mx-auto mb-8" />
        </header>

        <article className="text-center text-text space-y-10 font-sans">
          <p>
            For over 20 years, we at Angela's Dance Academy have aimed to create
            more than just a dance studio for our students. We strive for an
            environment which flourishes talent, drive and creativity. We offer
            a variety of dance styles which in turn creates many well-rounded
            dancers. Some of the styles we offer at ADA include Ballet, Jazz,
            Hip Hop, Street Jazz, Lyrical, Technique as well as extensive
            stretching and conditioning.
          </p>

          <p>
            Our students are able to showcase their hard work in many ways
            throughout the year. We compete in dance competitions, participate
            in various dance performances within our community and of course our
            Annual Dance Show. Along with all of our performances come our very
            original dance costumes. All of our costumes are custom made and
            designed to complement each dance specifically. Each and every one
            of the costumes are hand made personally by our Director, Angela
            Kirshon. Angela combines the vision of the dance, the music along
            with the choreography to create a beautiful final product.
          </p>
        </article>
      </section>
      <section className="mb-32 max-w-[800px]">
        <h2 className="text-2xl font-light text-center mb-14">
          See Our Academy in Actions
        </h2>
        <iframe
          title="Angela's Dance Academy Video"
          width="800"
          height="450"
          loading="lazy"
          src="https://www.youtube.com/embed/V6akGrZTiDU"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full aspect-video"
        ></iframe>
      </section>
    </main>
  );
};

export default Page;
