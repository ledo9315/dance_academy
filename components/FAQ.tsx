import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  supportHeading?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "What age should a child start dance lessons?",
    answer:
      "Most kids are ready to begin around ages 3–5 in our Pre-Dance program. We focus on movement, rhythm and classroom skills in a playful, age-appropriate setting.",
  },
  {
    id: "faq-2",
    question: "Are dance classes good for kids with ADHD?",
    answer:
      "Yes! Structured dance classes with music and movement can significantly improve focus, self-regulation and coordination. We use clear routines and positive coaching techniques to support each dancer's individual needs.",
  },
  {
    id: "faq-3",
    question: "How many classes per week should my child take?",
    answer:
      "For beginners, 1–2 classes per week build consistency and joy. Competitive or progressing dancers typically take 3+ classes across styles for balanced technique.",
  },
  {
    id: "faq-4",
    question: "Which dance styles are best for kids and teens?",
    answer:
      "We recommend a foundation in Ballet for technique paired with Jazz, Hip Hop and Contemporary to build musicality, strength and expression.",
  },
  {
    id: "faq-5",
    question: "Is it too late to start dancing as a teen?",
    answer:
      "It’s never too late. Teens progress quickly with focused instruction and can join fundamentals tracks designed for motivated beginners.",
  },
  {
    id: "faq-6",
    question: "How do performances and competitions work?",
    answer:
      "We offer studio showcases and optional competitions via our team program. Dancers gain stage experience, confidence and teamwork in a supportive environment.",
  },
  {
    id: "faq-7",
    question: "How do you place students in the right level?",
    answer:
      "Student placement is based on age, previous experience and current technique level. Our qualified instructors continuously monitor progress and may recommend additional styles or levels to ensure steady growth.",
  },
];

const Faq = ({
  heading = "Frequently Asked Questions",
  description = "Find answers to common questions about our dance classes. Have more questions? We'd love to help you!",
  items = faqItems,
}: FaqProps) => {
  return (
    <section className="mb-16 sm:mb-24 w-full py-10 sm:py-16">
      <div className="container space-y-16">
        <header className="flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6">
            {heading}
          </h2>
          <div className="border border-accent w-15 mx-auto mb-6 sm:mb-8" />
          <p className="text-text text-sm sm:text-base font-sans max-w-[680px] px-4 sm:px-0 leading-relaxed">
            {description}
          </p>
        </header>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 cursor-pointer">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-base">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq };
