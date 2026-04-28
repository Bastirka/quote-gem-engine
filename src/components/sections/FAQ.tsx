import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Translations } from "@/i18n/translations";

export const FAQ = ({ tr }: { tr: Translations }) => (
  <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24">
    <div className="text-center mb-8">
      <h2 className="text-3xl sm:text-4xl font-display font-bold">{tr.faq.title}</h2>
    </div>
    <Accordion type="single" collapsible className="glow-card p-2 sm:p-4">
      {tr.faq.items.map((it, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
          <AccordionTrigger className="text-left text-base font-medium px-3">
            {it.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground px-3">{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);
