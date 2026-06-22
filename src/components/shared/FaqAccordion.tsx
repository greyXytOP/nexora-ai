"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/content/faqs";

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
      {items.map((item, i) => (
        <AccordionItem
          key={item.question}
          value={`item-${i}`}
          className="card-surface overflow-hidden"
        >
          <AccordionTrigger className="gap-6 px-6 py-5 text-left text-base font-medium text-[var(--color-fg)] hover:no-underline md:text-lg">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 text-[var(--color-fg-muted)]">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
