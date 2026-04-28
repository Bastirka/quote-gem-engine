import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureChipProps {
  selected: boolean;
  included?: boolean;
  onToggle: () => void;
  label: string;
  price: number;
}

export const FeatureChip = ({ selected, included, onToggle, label, price }: FeatureChipProps) => (
  <button
    type="button"
    onClick={onToggle}
    className={cn(
      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm transition-all",
      "backdrop-blur-md",
      included
        ? "border-success/40 bg-success/10 text-foreground"
        : selected
        ? "border-primary/60 bg-primary/15 text-foreground shadow-glow"
        : "border-white/10 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/40",
    )}
  >
    <span
      className={cn(
        "flex h-4 w-4 items-center justify-center rounded-full",
        included ? "bg-success text-white" : selected ? "bg-primary text-primary-foreground" : "bg-white/10",
      )}
    >
      {selected || included ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
    </span>
    <span className="truncate">{label}</span>
    <span className="tabular-nums text-[11px] opacity-80">
      {included ? "iekļauts" : price ? `+${price}€` : "0€"}
    </span>
  </button>
);
