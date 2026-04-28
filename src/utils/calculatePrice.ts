import {
  designOptions,
  contentOptions,
  languageOptions,
  deadlineOptions,
  supportOptions,
  findOption,
  getWebsiteType,
  type WebsiteType,
} from "@/data/pricing";
import { getPackage, packages, type Package, type PackageId } from "@/data/packages";
import { getFeature, type Feature } from "@/data/features";

export interface CalculatorState {
  websiteTypeId: string | null;
  packageId: PackageId | null;
  selectedFeatureIds: string[];
  designId: string | null;
  contentId: string | null;
  languageId: string | null;
  deadlineId: string | null;
  supportId: string | null;
  goalId?: string | null;
  sectionIds?: string[];
  recommendedSelectedId?: PackageId | null;
}

export interface PriceBreakdown {
  websiteType: WebsiteType | null;
  pkg: Package | null;
  basePrice: number;
  paidExtras: { feature: Feature; price: number }[];
  includedExtras: Feature[];
  designPrice: number;
  contentPrice: number;
  languagesPrice: number;
  deadlinePrice: number;
  supportPrice: number;
  subtotal: number;
  finalPrice: number;
  marketMin: number;
  marketMax: number;
  savingsMin: number;
  savingsMax: number;
}

export const calculateBreakdown = (state: CalculatorState): PriceBreakdown => {
  const websiteType = getWebsiteType(state.websiteTypeId);
  const pkg = getPackage(state.packageId);
  const basePrice = websiteType?.basePrice ?? 0;

  const includedSet = new Set(pkg?.includedFeatureIds ?? []);
  const paidExtras: { feature: Feature; price: number }[] = [];
  const includedExtras: Feature[] = [];

  for (const id of state.selectedFeatureIds) {
    const ft = getFeature(id);
    if (!ft) continue;
    if (includedSet.has(id)) includedExtras.push(ft);
    else paidExtras.push({ feature: ft, price: ft.price });
  }

  const designPrice = findOption(designOptions, state.designId)?.price ?? 0;
  const contentPrice = findOption(contentOptions, state.contentId)?.price ?? 0;
  const languagesPrice = findOption(languageOptions, state.languageId)?.price ?? 0;
  const deadlinePrice = findOption(deadlineOptions, state.deadlineId)?.price ?? 0;
  const supportPrice = findOption(supportOptions, state.supportId)?.price ?? 0;

  const featuresTotal = paidExtras.reduce((s, x) => s + x.price, 0);
  const subtotal =
    basePrice + featuresTotal + designPrice + contentPrice + languagesPrice + deadlinePrice + supportPrice;

  const multiplier = pkg?.multiplier ?? 1;
  const finalPrice = websiteType ? Math.round(subtotal * multiplier) : 0;

  const marketMin = websiteType?.marketMin ?? 0;
  const marketMax = websiteType?.marketMax ?? 0;
  const savingsMin = Math.max(0, marketMin - finalPrice);
  const savingsMax = Math.max(0, marketMax - finalPrice);

  return {
    websiteType,
    pkg,
    basePrice,
    paidExtras,
    includedExtras,
    designPrice,
    contentPrice,
    languagesPrice,
    deadlinePrice,
    supportPrice,
    subtotal,
    finalPrice,
    marketMin,
    marketMax,
    savingsMin,
    savingsMax,
  };
};

/** Build the three recommended offers for a given website type */
export const getRecommendedOffers = (websiteTypeId: string | null) => {
  return packages.map((pkg) => {
    const breakdown = calculateBreakdown({
      websiteTypeId,
      packageId: pkg.id,
      selectedFeatureIds: [],
      designId: pkg.id === "premium" ? "design_premium" : pkg.id === "medium" ? "design_modern" : "design_simple",
      contentId: null,
      languageId: null,
      deadlineId: null,
      supportId: pkg.id === "basic" ? null : "support_basic",
    });
    return { pkg, breakdown };
  });
};
