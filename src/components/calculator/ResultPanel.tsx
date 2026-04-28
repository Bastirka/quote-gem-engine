import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency, formatRange } from "@/utils/formatCurrency";
import type { PriceBreakdown } from "@/utils/calculatePrice";
import type { Translations } from "@/i18n/translations";
import { tierOrder, type PackageId } from "@/data/packages";

interface ResultPanelProps {
  breakdown: PriceBreakdown;
  tr: Translations;
  lang: "lv" | "en";
  onRequestQuote: () => void;
}

const tierColor = (id: PackageId) =>
  id === "basic" ? "bg-[hsl(var(--tier-basic))]" : id === "medium" ? "bg-[hsl(var(--tier-medium))]" : "bg-[hsl(var(--tier-premium))]";

export const ResultPanel = ({ breakdown, tr, lang, onRequestQuote }: ResultPanelProps) => {
  const { websiteType, pkg, finalPrice, marketMin, marketMax, savingsMin, savingsMax } = breakdown;

  return (
    <div className="glow-card p-5 sm:p-6 space-y-5 sticky top-24">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        {tr.result.title}
      </div>

      {websiteType ? (
        <>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={finalPrice}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-4xl sm:text-5xl font-display font-bold tabular-nums text-gradient-brand"
              >
                {formatCurrency(finalPrice)}
              </motion.div>
            </AnimatePresence>
            <div className="text-xs text-muted-foreground mt-2">
              {lang === "lv" ? websiteType.label_lv : websiteType.label_en}
              {pkg && <> • {pkg.name}</>}
            </div>
          </div>

          {/* Tier bar */}
          <div className="flex gap-1">
            {tierOrder.map((tid) => (
              <div
                key={tid}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all",
                  pkg?.id === tid ? `${tierColor(tid)} shadow-glow` : "bg-white/10",
                )}
              />
            ))}
          </div>

          {/* Market comparison */}
          {marketMin > 0 && (
            <div className="rounded-xl border border-white/10 bg-card/40 p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{tr.result.marketPrice}</span>
                <span className="tabular-nums">{formatRange(marketMin, marketMax)}</span>
              </div>
              {savingsMax > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-success">
                  <TrendingDown className="h-3 w-3" />
                  <span>
                    {tr.result.savings} {formatRange(savingsMin, savingsMax)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Breakdown */}
          <div className="space-y-1.5 text-sm">
            <Row label={tr.result.basePrice} value={formatCurrency(breakdown.basePrice)} />
            {pkg && <Row label={tr.result.package} value={`${pkg.name} ×${pkg.multiplier}`} />}
            {breakdown.paidExtras.length > 0 && (
              <Row
                label={tr.result.paidExtras}
                value={`+${formatCurrency(breakdown.paidExtras.reduce((s, p) => s + p.price, 0))}`}
              />
            )}
            {breakdown.designPrice > 0 && <Row label={tr.result.design} value={`+${formatCurrency(breakdown.designPrice)}`} />}
            {breakdown.contentPrice > 0 && <Row label={tr.result.content} value={`+${formatCurrency(breakdown.contentPrice)}`} />}
            {breakdown.languagesPrice > 0 && <Row label={tr.result.languages} value={`+${formatCurrency(breakdown.languagesPrice)}`} />}
            {breakdown.deadlinePrice > 0 && <Row label={tr.result.deadline} value={`+${formatCurrency(breakdown.deadlinePrice)}`} />}
            {breakdown.supportPrice > 0 && <Row label={tr.result.support} value={`+${formatCurrency(breakdown.supportPrice)}`} />}
            <div className="border-t border-white/10 pt-2 mt-2 flex items-center justify-between font-semibold">
              <span>{tr.result.finalPrice}</span>
              <span className="tabular-nums text-primary">{formatCurrency(finalPrice)}</span>
            </div>
          </div>

          <Button onClick={onRequestQuote} className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-brand border-0 h-11">
            {tr.result.cta} <ArrowRight className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">{tr.result.empty}</p>
      )}
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-muted-foreground">
    <span>{label}</span>
    <span className="tabular-nums text-foreground">{value}</span>
  </div>
);
