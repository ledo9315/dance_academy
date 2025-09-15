import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";

const testimonials = [
  {
    id: 1,
    name: "Renata Carreras",
    role: "Dance Student",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJtnzpyYcQe26UdCnABAeOYDyDO6cEFQzwgKnQ18CEsU4DDIw=s120-c-rp-mo-br100",
    content:
      "I love dance in Angela's dance academy and I love how she teach 💗💗",
    rating: 5,
  },
  {
    id: 2,
    name: "Stephanie Pepper",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocI670jVXEESSnnqixqD_PPXiNTfJgC2Ro50Q0Sed05XT5myOw=s120-c-rp-mo-br100",
    content:
      "Ms. Angela and Ms. Talie are fantastic. My daughter had no experience entering the program and the patience and love shown has been amazing! This program is such a community and all the participants and teachers are so welcoming.",
    rating: 5,
  },
  {
    id: 3,
    name: "Phillip Alexander",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKGCUMyNNoyK90724HQn--03MPzaq6Vslc3-KEKAxgTcPG-2Nc=s120-c-rp-mo-ba4-br100",
    content:
      "Mrs. Angela is very passionate about dance and helping her students excel. We've had our kids enrolled with her for over a year now and have seen a large improvement in their abilities.",
    rating: 5,
  },
  {
    id: 4,
    name: "Daria Snarskaya",
    role: "Adult Student",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjVli3Pq2-utOUezZY8SgFvfSb57km4EVsZAOLbky8w2UdlfHbXeYw=s120-c-rp-mo-ba4-br100",
    content:
      "The best place to learn dance not only for kids but adults class is absolutely amazing.",
    rating: 5,
  },
  {
    id: 5,
    name: "Vadim Akhmetov",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKIKKlQto4g0hKeHftkBwcWNQtpJC7udkWj-kmwQ1y-bB0xmw=s120-c-rp-mo-br100",
    content:
      "My daughter is with Angela, fast and very good not only in dancing but also in concepts and discipline.",
    rating: 5,
  },
  {
    id: 6,
    name: "Lana Angel",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjW9Q8UNZvC4YdHCxj14ScEDnChbwvY0HBb0Vh_hS7pMHomiEws=s120-c-rp-mo-br100",
    content:
      "My son's dream is to appear on broadway and the team at angela dance school are helping him learn the moves he needs to make it there. The instructors are patient and caring which makes me happy.",
    rating: 5,
  },
  {
    id: 7,
    name: "Christian Hernandez",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjXQ86bIllU024QT7R7kTgaEE8mN91ZcLm643yknxFy6MKHAPy8=s120-c-rp-mo-br100",
    content:
      "The instructor here is fun, uplifting, and encouraging too. My daughter was struggling to learn a move and the instructor helped her spent extra time with her until my daughter nailed it. Excellent dance school.",
    rating: 5,
  },
  {
    id: 8,
    name: "Gregory Abugov",
    role: "Dance Student",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLT1BC9r5wEClLdKnIuQhxHIgeIPIGhNv2EUkHeZygtNlCvLA=s120-c-rp-mo-ba2-br100",
    content:
      "Amazing teacher. You can feel the amazing energy as soon as you step foot into the building. One of the best teachers I met so far. Angela never gives up on any of her students.",
    rating: 5,
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

export function TestimonialSection() {
  const googleReviewsUrl =
    "https://www.google.com/search?sca_esv=a1754dd2adcb8a92&hl=de&gl=DE&sxsrf=AE3TifOmOt98lQd3pAbr2jPVlT-0PK_yPw:1755100545853&q=Angela%27s+Dance+Academy,+12840+Tamiami+Trl+N+Suite+300,+Naples,+FL+34110,+Vereinigte+Staaten&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s2T8S0LVkkD6Oiivdbxg09PJiR2B2skEv7CKEjieHl-ZS2xexjUAGSl_kCi5HcD_8bY3BUM%3D&uds=AOm0WdEAA64grrlFWuOz8hk002w9UAlglxXDltbEpvxE4qk52HL8H80nybVtsNfwNczeXkyHTUtGTwjLmFiaiG5wiw0pRVVVMlyXN1FP48kwrR5nYeYey4xJL7hztMglJT3Bmp3LYALPUkMMg0vmXjwn8AJVPRR4KhhkbJg-MTyaogpBbmQJNwLfGQ9JNZYbuLEWXRqg25JnPjS6xGVzu8EEWQMR28g4yg&sa=X&ved=2ahUKEwjHq9KEk4iPAxW2R_EDHQvCGZYQ3PALegQINBAE&biw=1180&bih=928&dpr=2";

  return (
    <section className="w-full max-w-[800px] flex flex-col items-center mb-12 sm:mb-16">
      {/* Header */}
      <header className="text-center mb-10 sm:mb-14">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-sans text-text hover:text-accent transition-colors duration-200"
          >
            Google Rating: 4.9 stars from 30+ reviews
          </a>
        </div>

        <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6">
          What Our Customers Say
        </h2>
        <div className="border border-accent w-15 mx-auto mb-6 sm:mb-8" />

        <p className="text-text text-sm sm:text-base font-sans mb-6 sm:mb-8">
          Join a community of dancers, from beginners to Broadway dreamers
        </p>

        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent font-sans text-sm hover:text-accent-dark transition-colors duration-200"
        >
          View all testimonials
          <ChevronRight className="w-4 h-4" />
        </a>
      </header>

      <div className="relative overflow-hidden w-full">
        <div className="flex gap-4 animate-scroll hover:pause">
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-80 p-4 sm:p-6 bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                  />
                  <AvatarFallback className="text-xs font-medium bg-accent-bg text-accent">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-medium text-foreground text-sm">
                    {testimonial.name}
                  </h3>
                  <p className="text-text text-xs font-sans">
                    {testimonial.role}
                  </p>
                </div>

                <div className="flex gap-0.5 flex-shrink-0">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </div>
              </div>

              <blockquote className="text-text text-xs sm:text-sm leading-relaxed font-sans line-clamp-3">
                "{testimonial.content}"
              </blockquote>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
