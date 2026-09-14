export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "renata-carreras",
    name: "Renata Carreras",
    role: "Dance Student",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJtnzpyYcQe26UdCnABAeOYDyDO6cEFQzwgKnQ18CEsU4DDIw=s120-c-rp-mo-br100",
    content: "I love dance in Angela's dance academy and I love how she teach 💗💗",
    rating: 5,
  },
  {
    id: "stephanie-pepper",
    name: "Stephanie Pepper",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocI670jVXEESSnnqixqD_PPXiNTfJgC2Ro50Q0Sed05XT5myOw=s120-c-rp-mo-br100",
    content:
      "Ms. Angela and Ms. Talie are fantastic. My daughter had no experience entering the program and the patience and love shown has been amazing! This program is such a community and all the participants and teachers are so welcoming.",
    rating: 5,
  },
  {
    id: "phillip-alexander",
    name: "Phillip Alexander",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKGCUMyNNoyK90724HQn--03MPzaq6Vslc3-KEKAxgTcPG-2Nc=s120-c-rp-mo-ba4-br100",
    content:
      "Mrs. Angela is very passionate about dance and helping her students excel. We've had our kids enrolled with her for over a year now and have seen a large improvement in their abilities.",
    rating: 5,
  },
  {
    id: "daria-snarskaya",
    name: "Daria Snarskaya",
    role: "Adult Student",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjVli3Pq2-utOUezZY8SgFvfSb57km4EVsZAOLbky8w2UdlfHbXeYw=s120-c-rp-mo-ba4-br100",
    content:
      "The best place to learn dance not only for kids but adults class is absolutely amazing.",
    rating: 5,
  },
  {
    id: "vadim-akhmetov",
    name: "Vadim Akhmetov",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKIKKlQto4g0hKeHftkBwcWNQtpJC7udkWj-kmwQ1y-bB0xmw=s120-c-rp-mo-br100",
    content:
      "My daughter is with Angela, fast and very good not only in dancing but also in concepts and discipline.",
    rating: 5,
  },
  {
    id: "lana-angel",
    name: "Lana Angel",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjW9Q8UNZvC4YdHCxj14ScEDnChbwvY0HBb0Vh_hS7pMHomiEws=s120-c-rp-mo-br100",
    content:
      "My son's dream is to appear on broadway and the team at angela dance school are helping him learn the moves he needs to make it there. The instructors are patient and caring which makes me happy.",
    rating: 5,
  },
  {
    id: "christian-hernandez",
    name: "Christian Hernandez",
    role: "Parent",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjXQ86bIllU024QT7R7kTgaEE8mN91ZcLm643yknxFy6MKHAPy8=s120-c-rp-mo-br100",
    content:
      "The instructor here is fun, uplifting, and encouraging too. My daughter was struggling to learn a move and the instructor helped her spent extra time with her until my daughter nailed it. Excellent dance school.",
    rating: 5,
  },
  {
    id: "gregory-abugov",
    name: "Gregory Abugov",
    role: "Dance Student",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLT1BC9r5wEClLdKnIuQhxHIgeIPIGhNv2EUkHeZygtNlCvLA=s120-c-rp-mo-ba2-br100",
    content:
      "Amazing teacher. You can feel the amazing energy as soon as you step foot into the building. One of the best teachers I met so far. Angela never gives up on any of her students.",
    rating: 5,
  },
];

export const AGGREGATE_RATING = {
  value: 4.9,
  count: 30,
} as const;
