import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";

interface CalculatorStepProps {
  stepKey: string | number;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const CalculatorStep = ({ stepKey, title, subtitle, children }: CalculatorStepProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-4"
    >
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  </AnimatePresence>
);
