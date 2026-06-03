import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import type { FAQId } from "@/data/faqs";

interface FAQProps {
  items: ReadonlyArray<FAQId>;
  className?: string;
}

export function FAQ({ items, className = "" }: FAQProps) {
  const { t } = useTranslation();
  return (
    <Accordion type="single" collapsible className={`w-full ${className}`}>
      {items.map((id, i) => (
        <AccordionItem key={id} value={`item-${i}`} className="border-border">
          <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
            {t(`faq.items.${id}.q`)}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
            {t(`faq.items.${id}.a`)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
