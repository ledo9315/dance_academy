export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "start-age",
    question: "What age should a child start dance lessons?",
    answer:
      "Most kids are ready to begin around ages 3–5 in our Pre-Dance program. We focus on movement, rhythm and classroom skills in a playful, age-appropriate setting.",
  },
  {
    id: "adhd",
    question: "Are dance classes good for kids with ADHD?",
    answer:
      "Yes! Structured dance classes with music and movement can significantly improve focus, self-regulation and coordination. We use clear routines and positive coaching techniques to support each dancer's individual needs.",
  },
  {
    id: "classes-per-week",
    question: "How many classes per week should my child take?",
    answer:
      "For beginners, 1–2 classes per week build consistency and joy. Competitive or progressing dancers typically take 3+ classes across styles for balanced technique.",
  },
  {
    id: "styles",
    question: "Which dance styles are best for kids and teens?",
    answer:
      "We recommend a foundation in Ballet for technique paired with Jazz, Hip Hop and Contemporary to build musicality, strength and expression.",
  },
  {
    id: "teen-start",
    question: "Is it too late to start dancing as a teen?",
    answer:
      "It's never too late. Teens progress quickly with focused instruction and can join fundamentals tracks designed for motivated beginners.",
  },
  {
    id: "performances",
    question: "How do performances and competitions work?",
    answer:
      "We offer studio showcases and optional competitions via our team program. Dancers gain stage experience, confidence and teamwork in a supportive environment.",
  },
  {
    id: "placement",
    question: "How do you place students in the right level?",
    answer:
      "Student placement is based on age, previous experience and current technique level. Our qualified instructors continuously monitor progress and may recommend additional styles or levels to ensure steady growth.",
  },
];
