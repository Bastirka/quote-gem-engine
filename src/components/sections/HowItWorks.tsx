import { motion } from "framer-motion";
import { Layers, Settings2, Send } from "lucide-react";
import type { Translations } from "@/i18n/translations";

export const HowItWorks = ({ tr }: { tr: Translations }) => {
  const icons = [Layers, Settings2, Send];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-display font-bold">{tr.how.title}</h2>
        <p className="text-muted-foreground mt-3">{tr.how.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {tr.how.steps.map((s, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glow-card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-brand">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
