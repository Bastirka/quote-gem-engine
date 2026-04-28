import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Calculator } from "@/components/sections/Calculator";
import { RecommendedOffers } from "@/components/sections/RecommendedOffers";
import { QuoteRequestForm } from "@/components/sections/QuoteRequestForm";
import { FAQ } from "@/components/sections/FAQ";
import { useLang } from "@/hooks/useLang";
import type { CalculatorState } from "@/utils/calculatePrice";
import type { PackageId } from "@/data/packages";

const initialState: CalculatorState = {
  websiteTypeId: "business",
  packageId: "medium",
  selectedFeatureIds: [],
  designId: "design_modern",
  contentId: "content_client",
  languageId: "lang_lv",
  deadlineId: "deadline_flex",
  supportId: "support_basic",
  goalId: null,
  sectionIds: [],
  recommendedSelectedId: null,
};

const STORAGE_KEY = "pricelab-state-v1";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Index = () => {
  const { lang, setLang, tr } = useLang();
  const [state, setState] = useState<CalculatorState>(() => {
    if (typeof window === "undefined") return initialState;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...initialState, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return initialState;
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const reset = () => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
    scrollTo("home");
  };

  const handleSelectRecommended = (id: PackageId) => {
    setState((s) => ({ ...s, packageId: id, recommendedSelectedId: id }));
  };
  const handleCancelRecommended = () => {
    setState((s) => ({ ...s, recommendedSelectedId: null }));
  };
  const handleRequestRecommended = (id: PackageId) => {
    setState((s) => ({ ...s, packageId: id, recommendedSelectedId: id }));
    setTimeout(() => scrollTo("request-offer"), 50);
  };
  const handleRequestQuote = () => scrollTo("request-offer");

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} tr={tr} onReset={reset} />

      <main className="flex-1">
        <Hero tr={tr} />

        <HowItWorks tr={tr} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
          <RecommendedOffers
            websiteTypeId={state.websiteTypeId}
            selectedRecommendedId={state.recommendedSelectedId ?? null}
            onSelect={handleSelectRecommended}
            onCancel={handleCancelRecommended}
            onRequestOffer={handleRequestRecommended}
            tr={tr}
            lang={lang}
          />

          <Calculator
            tr={tr}
            lang={lang}
            state={state}
            setState={setState}
            onRequestQuote={handleRequestQuote}
          />

          <QuoteRequestForm state={state} tr={tr} lang={lang} />
        </div>

        <FAQ tr={tr} />
      </main>

      <Footer tr={tr} />
    </div>
  );
};

export default Index;
