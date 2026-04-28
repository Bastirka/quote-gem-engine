import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepProgress } from "@/components/calculator/StepProgress";
import { CalculatorStep } from "@/components/calculator/CalculatorStep";
import { OptionCard } from "@/components/calculator/OptionCard";
import { FeatureChip } from "@/components/calculator/FeatureChip";
import { ResultPanel } from "@/components/calculator/ResultPanel";
import { websiteTypes, designOptions, contentOptions, languageOptions, deadlineOptions, supportOptions } from "@/data/pricing";
import { features, type FeatureCategory } from "@/data/features";
import { calculateBreakdown, type CalculatorState } from "@/utils/calculatePrice";
import { getPackage, packages, type PackageId } from "@/data/packages";
import type { Translations, Lang } from "@/i18n/translations";
import { formatCurrency } from "@/utils/formatCurrency";

interface CalculatorProps {
  tr: Translations;
  lang: Lang;
  state: CalculatorState;
  setState: React.Dispatch<React.SetStateAction<CalculatorState>>;
  onRequestQuote: () => void;
}

const FEATURE_CATEGORIES_PRIMARY: FeatureCategory[] = ["essential", "marketing", "business"];

export const Calculator = ({ tr, lang, state, setState, onRequestQuote }: CalculatorProps) => {
  const [step, setStep] = useState(0);
  const breakdown = useMemo(() => calculateBreakdown(state), [state]);

  const update = (patch: Partial<CalculatorState>) => setState((s) => ({ ...s, ...patch }));

  const toggleFeature = (id: string) => {
    setState((s) => {
      const exists = s.selectedFeatureIds.includes(id);
      return {
        ...s,
        selectedFeatureIds: exists ? s.selectedFeatureIds.filter((x) => x !== id) : [...s.selectedFeatureIds, id],
      };
    });
  };

  const toggleSection = (id: string) => {
    setState((s) => {
      const arr = s.sectionIds ?? [];
      return { ...s, sectionIds: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id] };
    });
  };

  const websiteType = websiteTypes.find((w) => w.id === state.websiteTypeId) ?? null;
  const includedSet = new Set(getPackage(state.packageId)?.includedFeatureIds ?? []);

  // category-specific features (pulled from website type's recommendedFeatures + common ones)
  const ecommerceCategories: FeatureCategory[] = ["ecommerce", "booking", "advanced"];
  const typeSpecificCategories: FeatureCategory[] = websiteType
    ? (["restaurant", "salon", "autoservice"].includes(websiteType.id)
        ? [websiteType.id as FeatureCategory]
        : [])
    : [];

  return (
    <section id="calculator" className="scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-brand">{tr.calc.title}</h2>
        <p className="text-muted-foreground mt-3">{tr.calc.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-6">
        <div className="glow-card p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {tr.calc.step} {step + 1} {tr.calc.of} {tr.calc.steps.length}
            </span>
            <span>{tr.calc.steps[step]}</span>
          </div>
          <StepProgress steps={[...tr.calc.steps]} current={step} onJump={setStep} />

          <div className="min-h-[320px]">
            {step === 0 && (
              <CalculatorStep stepKey="type" title={tr.calc.steps[0]}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {websiteTypes.map((w) => (
                    <OptionCard
                      key={w.id}
                      selected={state.websiteTypeId === w.id}
                      onClick={() => update({ websiteTypeId: w.id })}
                      title={lang === "lv" ? w.label_lv : w.label_en}
                      description={`${formatCurrency(w.basePrice)} ${tr.calc.base}`}
                    />
                  ))}
                </div>
              </CalculatorStep>
            )}

            {step === 1 && (
              <CalculatorStep stepKey="goal" title={tr.calc.goal}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tr.calc.goals.map((g) => (
                    <OptionCard
                      key={g.id}
                      selected={state.goalId === g.id}
                      onClick={() => update({ goalId: g.id })}
                      title={g.label}
                    />
                  ))}
                </div>
              </CalculatorStep>
            )}

            {step === 2 && (
              <CalculatorStep stepKey="sections" title={tr.calc.sections}>
                <div className="flex flex-wrap gap-2">
                  {tr.calc.sectionList.map((s) => (
                    <FeatureChip
                      key={s.id}
                      selected={(state.sectionIds ?? []).includes(s.id)}
                      onToggle={() => toggleSection(s.id)}
                      label={s.label}
                      price={0}
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{tr.calc.package}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {packages.map((p) => (
                      <OptionCard
                        key={p.id}
                        selected={state.packageId === p.id}
                        onClick={() => update({ packageId: p.id })}
                        title={p.name}
                        description={lang === "lv" ? p.description_lv : p.description_en}
                        price={`×${p.multiplier}`}
                      />
                    ))}
                  </div>
                </div>
              </CalculatorStep>
            )}

            {step === 3 && (
              <CalculatorStep stepKey="features" title={tr.calc.features}>
                {FEATURE_CATEGORIES_PRIMARY.concat(typeSpecificCategories).map((cat) => {
                  const fts = features.filter((f) => f.category === cat);
                  if (!fts.length) return null;
                  return (
                    <div key={cat} className="mb-5">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{tr.calc.categories[cat] ?? cat}</div>
                      <div className="flex flex-wrap gap-2">
                        {fts.map((ft) => (
                          <FeatureChip
                            key={ft.id}
                            selected={state.selectedFeatureIds.includes(ft.id)}
                            included={includedSet.has(ft.id) && state.selectedFeatureIds.includes(ft.id)}
                            onToggle={() => toggleFeature(ft.id)}
                            label={lang === "lv" ? ft.label_lv : ft.label_en}
                            price={ft.price}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CalculatorStep>
            )}

            {step === 4 && (
              <CalculatorStep stepKey="ecom" title={tr.calc.ecommerce}>
                {ecommerceCategories.map((cat) => {
                  const fts = features.filter((f) => f.category === cat);
                  return (
                    <div key={cat} className="mb-5">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{tr.calc.categories[cat] ?? cat}</div>
                      <div className="flex flex-wrap gap-2">
                        {fts.map((ft) => (
                          <FeatureChip
                            key={ft.id}
                            selected={state.selectedFeatureIds.includes(ft.id)}
                            included={includedSet.has(ft.id) && state.selectedFeatureIds.includes(ft.id)}
                            onToggle={() => toggleFeature(ft.id)}
                            label={lang === "lv" ? ft.label_lv : ft.label_en}
                            price={ft.price}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CalculatorStep>
            )}

            {step === 5 && (
              <CalculatorStep stepKey="dcl" title={tr.calc.steps[5]}>
                <Block title={tr.calc.design}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {designOptions.map((o) => (
                      <OptionCard
                        key={o.id}
                        selected={state.designId === o.id}
                        onClick={() => update({ designId: o.id })}
                        title={lang === "lv" ? o.label_lv : o.label_en}
                        price={o.price ? `+${formatCurrency(o.price)}` : "0€"}
                      />
                    ))}
                  </div>
                </Block>
                <Block title={tr.calc.content}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contentOptions.map((o) => (
                      <OptionCard
                        key={o.id}
                        selected={state.contentId === o.id}
                        onClick={() => update({ contentId: o.id })}
                        title={lang === "lv" ? o.label_lv : o.label_en}
                        price={o.price ? `+${formatCurrency(o.price)}` : "0€"}
                      />
                    ))}
                  </div>
                </Block>
                <Block title={tr.calc.languages}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {languageOptions.map((o) => (
                      <OptionCard
                        key={o.id}
                        selected={state.languageId === o.id}
                        onClick={() => update({ languageId: o.id })}
                        title={lang === "lv" ? o.label_lv : o.label_en}
                        price={o.price ? `+${formatCurrency(o.price)}` : "0€"}
                      />
                    ))}
                  </div>
                </Block>
              </CalculatorStep>
            )}

            {step === 6 && (
              <CalculatorStep stepKey="ds" title={tr.calc.steps[6]}>
                <Block title={tr.calc.deadline}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {deadlineOptions.map((o) => (
                      <OptionCard
                        key={o.id}
                        selected={state.deadlineId === o.id}
                        onClick={() => update({ deadlineId: o.id })}
                        title={lang === "lv" ? o.label_lv : o.label_en}
                        price={o.price ? `+${formatCurrency(o.price)}` : "0€"}
                      />
                    ))}
                  </div>
                </Block>
                <Block title={tr.calc.support}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {supportOptions.map((o) => (
                      <OptionCard
                        key={o.id}
                        selected={state.supportId === o.id}
                        onClick={() => update({ supportId: o.id })}
                        title={lang === "lv" ? o.label_lv : o.label_en}
                        price={o.price ? `+${formatCurrency(o.price)}` : "0€"}
                      />
                    ))}
                  </div>
                </Block>
              </CalculatorStep>
            )}

            {step === 7 && (
              <CalculatorStep stepKey="summary" title={tr.calc.summary}>
                <div className="space-y-2 text-sm">
                  <Row label={tr.calc.summaryType} value={websiteType ? (lang === "lv" ? websiteType.label_lv : websiteType.label_en) : tr.calc.notSpecified} />
                  <Row label={tr.calc.summaryPackage} value={getPackage(state.packageId)?.name ?? tr.calc.notSpecified} />
                  <Row label={tr.calc.summaryFeatures} value={state.selectedFeatureIds.length ? `${state.selectedFeatureIds.length} ${tr.calc.featuresSelected}` : tr.calc.notSpecified} />
                  <Row label={tr.calc.summaryFinal} value={formatCurrency(breakdown.finalPrice)} highlight />
                </div>
                <Button
                  onClick={onRequestQuote}
                  className="w-full mt-4 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-brand border-0 h-11"
                >
                  <Send className="h-4 w-4" /> {tr.calc.requestOffer}
                </Button>
              </CalculatorStep>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="h-10"
            >
              <ArrowLeft className="h-4 w-4" /> {tr.calc.back}
            </Button>
            {step < tr.calc.steps.length - 1 ? (
              <Button
                onClick={() => setStep((s) => Math.min(tr.calc.steps.length - 1, s + 1))}
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-brand border-0 h-10"
              >
                {tr.calc.next} <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={onRequestQuote}
                className="bg-gradient-accent text-accent-foreground hover:opacity-90 shadow-glow border-0 h-10"
              >
                {tr.calc.requestOffer}
              </Button>
            )}
          </div>
        </div>

        <div>
          <ResultPanel breakdown={breakdown} tr={tr} lang={lang} onRequestQuote={onRequestQuote} />
        </div>
      </div>
    </section>
  );
};

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{title}</div>
    {children}
  </div>
);

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`flex items-center justify-between rounded-xl border border-white/10 bg-card/40 px-3 py-2.5 ${highlight ? "border-primary/50" : ""}`}>
    <span className="text-muted-foreground">{label}</span>
    <span className={`tabular-nums ${highlight ? "text-primary font-semibold" : "text-foreground"}`}>{value}</span>
  </div>
);
