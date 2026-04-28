import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  price?: string;
  badge?: string;
  className?: string;
}

export const OptionCard = ({ selected, onClick, title, description, price, badge, className }: OptionCardProps) => (
  <motion.button
    type="button"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className={cn(
      "group relative text-left w-full rounded-2xl border p-4 sm:p-5 transition-all backdrop-blur-xl",
      "bg-card/60 hover:bg-card/80",
      selected
        ? "border-primary/70 shadow-glow ring-1 ring-primary/40"
        : "border-white/10 hover:border-primary/40",
      className,
    )}
  >
    {badge && (
      <span className="absolute -top-2 left-4 rounded-full bg-gradient-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 shadow-glow">
        {badge}
      </span>
    )}
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="font-semibold text-foreground truncate">{title}</div>
        {description && <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</div>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {price && <span className="text-sm font-semibold text-primary tabular-nums">{price}</span>}
        <span
          className={cn(
            "h-5 w-5 rounded-full border flex items-center justify-center transition-colors",
            selected ? "bg-primary border-primary" : "border-white/20",
          )}
        >
          {selected && <Check className="h-3 w-3 text-primary-foreground" />}
        </span>
      </div>
    </div>
  </motion.button>
);
