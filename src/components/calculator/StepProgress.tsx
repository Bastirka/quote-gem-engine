import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  steps: string[];
  current: number;
  onJump?: (i: number) => void;
}

export const StepProgress = ({ steps, current, onJump }: StepProgressProps) => (
  <div className="w-full">
    <div className="flex items-center gap-1 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
      {steps.map((label, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onJump?.(i)}
            className={cn(
              "group flex items-center gap-2 rounded-full px-3 py-1.5 text-xs whitespace-nowrap transition-all",
              active
                ? "bg-primary/20 text-foreground border border-primary/50"
                : done
                ? "text-foreground/80 hover:text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
                active ? "bg-primary text-primary-foreground" : done ? "bg-success/80 text-white" : "bg-white/10",
              )}
            >
              {i + 1}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
    <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden mt-1">
      <motion.div
        className="h-full bg-gradient-primary"
        initial={{ width: 0 }}
        animate={{ width: `${((current + 1) / steps.length) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  </div>
);
