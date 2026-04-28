import { motion } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatRange } from "@/utils/formatCurrency";
import { getRecommendedOffers } from "@/utils/calculatePrice";
import type { Translations } from "@/i18n/translations";
import type { PackageId } from "@/data/packages";
import { cn } from "@/lib/utils";

interface RecommendedOffersProps {
  websiteTypeId: string | null;
  selectedRecommendedId: PackageId | null;
  onSelect: (id: PackageId) => void;
  onCancel: () => void;
  onRequestOffer: (id: PackageId) => void;
  tr: Translations;
  lang: "lv" | "en";
}

export const RecommendedOffers = ({
  websiteTypeId,
  selectedRecommendedId,
  onSelect,
  onCancel,
  onRequestOffer,
  tr,
  lang,
}: RecommendedOffersProps) => {
  const offers = getRecommendedOffers(websiteTypeId);

  return (
    <section id="recommended" className="scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-brand">{tr.recommended.title}</h2>
        <p className="text-muted-foreground mt-3">{tr.recommended.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {offers.map(({ pkg, breakdown }, idx) => {
          const isSelected = selectedRecommendedId === pkg.id;
          const isPopular = pkg.id === "medium";
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className={cn(
                "relative glow-card p-6 flex flex-col gap-5",
                isSelected && "border-primary/70 shadow-glow-lg",
                isPopular && !isSelected && "border-primary/40",
              )}
            >
              {isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wider px-3 py-1 shadow-glow">
                  <Sparkles className="inline h-3 w-3 -mt-0.5 mr-1" />
                  {tr.recommended.popular}
                </span>
              )}

              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Rekomendētais</div>
                <h3 className="text-2xl font-display font-bold mt-1">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{lang === "lv" ? pkg.description_lv : pkg.description_en}</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-display font-bold tabular-nums text-gradient-brand">
                  {websiteTypeId ? formatCurrency(breakdown.finalPrice) : "—"}
                </div>
                {breakdown.marketMin > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {tr.recommended.market}: <span className="tabular-nums">{formatRange(breakdown.marketMin, breakdown.marketMax)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{tr.recommended.bestFor}</div>
                <p className="text-sm text-foreground/85">{lang === "lv" ? pkg.bestFor_lv : pkg.bestFor_en}</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{tr.recommended.includes}</div>
                <ul className="space-y-1.5">
                  {(lang === "lv" ? pkg.includedItems_lv : pkg.includedItems_en).slice(0, 7).map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-col gap-2 pt-2">
                {isSelected ? (
                  <>
                    <Button disabled className="bg-primary/30 text-foreground border border-primary/50 cursor-default h-10">
                      <Check className="h-4 w-4" /> {tr.recommended.chosen}
                    </Button>
                    <Button variant="ghost" onClick={onCancel} className="h-9">
                      <X className="h-4 w-4" /> {tr.recommended.cancel}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => onSelect(pkg.id)} variant="outline" className="border-white/15 hover:border-primary/50 h-10">
                    {tr.recommended.choose}
                  </Button>
                )}
                <Button
                  onClick={() => onRequestOffer(pkg.id)}
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-brand border-0 h-10"
                >
                  {tr.recommended.requestOffer}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
