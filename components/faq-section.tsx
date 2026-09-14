import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { FAQ_ITEMS, type FaqItem } from "@/content/faq";

type FaqSectionProps = {
  heading?: string;
  description?: string;
  items?: FaqItem[];
};

export function FaqSection({
  heading = "Frequently Asked Questions",
  description = "Find answers to common questions about our dance classes. Have more questions? We'd love to help you!",
  items = FAQ_ITEMS,
}: FaqSectionProps) {
  return (
    <section className="mb-16 w-full py-10 sm:mb-24 sm:py-16">
      <div className="container space-y-16">
        <SectionHeading title={heading} description={description} />

        <Accordion type="single" collapsible className="mx-auto w-full lg:max-w-3xl">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="cursor-pointer transition-opacity duration-200">
                <span className="font-medium sm:py-1 lg:py-2 lg:text-lg">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <p className="text-muted-foreground lg:text-base">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
