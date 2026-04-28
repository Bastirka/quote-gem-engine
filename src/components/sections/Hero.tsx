import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Translations } from "@/i18n/translations";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Hero = ({ tr }: { tr: Translations }) => (
  <section id="home" className="relative overflow-hidden scroll-mt-24">
    <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
    <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />
    <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-primary/30 blur-[140px] pointer-events-none" />
    <div className="absolute -bottom-40 -right-32 w-[420px] h-[420px] rounded-full bg-accent/20 blur-[140px] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 backdrop-blur-md px-3 py-1 text-xs text-muted-foreground"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
        PriceLab • Mājaslapas cenu kalkulators
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight"
      >
        <span className="text-gradient-brand">{tr.hero.title}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground"
      >
        {tr.hero.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="mt-7 flex flex-wrap justify-center gap-2"
      >
        {tr.hero.badges.map((b) => (
          <span key={b} className="rounded-full border border-white/10 bg-card/50 backdrop-blur-md px-3 py-1 text-xs text-foreground/80">
            {b}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.24 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Button
          onClick={() => scrollTo("calculator")}
          size="lg"
          className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-brand border-0 h-12 px-6"
        >
          <Calculator className="h-4 w-4" /> {tr.hero.ctaStart}
        </Button>
        <Button
          onClick={() => scrollTo("request-offer")}
          variant="outline"
          size="lg"
          className="h-12 px-6 border-white/15 hover:border-primary/50"
        >
          {tr.hero.ctaQuote} <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  </section>
);
