import type { CalculatorState, PriceBreakdown } from "./calculatePrice";
import {
  designOptions,
  contentOptions,
  languageOptions,
  deadlineOptions,
  supportOptions,
  findOption,
} from "@/data/pricing";
import { formatCurrency } from "./formatCurrency";

export interface QuoteContact {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface QuotePayload {
  contact: QuoteContact;
  offerType: string; // "Rekomendētais Medium" | "Custom kalkulators"
  websiteType: string;
  packageName: string;
  finalPrice: number;
  marketRange: string;
  includedItems: string[];
  paidExtras: { label: string; price: number }[];
  breakdown: {
    basePrice: number;
    multiplier: number;
    design: string;
    content: string;
    languages: string;
    deadline: string;
    support: string;
    finalPrice: number;
  };
  answers: {
    type: string;
    goal: string;
    sections: string;
    features: string;
    deadline: string;
  };
  recommendationReasons: string[];
}

const NS = "Nav norādīts";

export const buildQuotePayload = (
  contact: QuoteContact,
  state: CalculatorState,
  breakdown: PriceBreakdown,
  goalLabel: string | null,
  sectionLabels: string[],
): QuotePayload => {
  const { websiteType, pkg, paidExtras, includedExtras, finalPrice, marketMin, marketMax } = breakdown;

  const offerType = state.recommendedSelectedId
    ? `Rekomendētais ${pkg?.name ?? ""}`.trim()
    : "Custom kalkulators";

  return {
    contact,
    offerType,
    websiteType: websiteType?.label_lv ?? NS,
    packageName: pkg?.name ?? NS,
    finalPrice,
    marketRange: marketMin && marketMax ? `${formatCurrency(marketMin)}–${formatCurrency(marketMax)}` : NS,
    includedItems: [...(pkg?.includedItems_lv ?? []), ...includedExtras.map((f) => f.label_lv)],
    paidExtras: paidExtras.map((p) => ({ label: p.feature.label_lv, price: p.price })),
    breakdown: {
      basePrice: breakdown.basePrice,
      multiplier: pkg?.multiplier ?? 1,
      design: findOption(designOptions, state.designId)?.label_lv ?? NS,
      content: findOption(contentOptions, state.contentId)?.label_lv ?? NS,
      languages: findOption(languageOptions, state.languageId)?.label_lv ?? NS,
      deadline: findOption(deadlineOptions, state.deadlineId)?.label_lv ?? NS,
      support: findOption(supportOptions, state.supportId)?.label_lv ?? NS,
      finalPrice,
    },
    answers: {
      type: websiteType?.label_lv ?? NS,
      goal: goalLabel ?? NS,
      sections: sectionLabels.length ? sectionLabels.join(", ") : NS,
      features: paidExtras.length || includedExtras.length
        ? [...includedExtras.map((f) => f.label_lv), ...paidExtras.map((p) => p.feature.label_lv)].join(", ")
        : NS,
      deadline: findOption(deadlineOptions, state.deadlineId)?.label_lv ?? NS,
    },
    recommendationReasons: state.recommendedSelectedId
      ? [`Klients izvēlējās rekomendēto ${pkg?.name} paku`]
      : ["Custom kalkulatora aprēķins"],
  };
};

export const buildTelegramMessage = (q: QuotePayload): string => {
  const lines: string[] = [];
  lines.push("🆕 *JAUNS PRICELAB PIEPRASĪJUMS*");
  lines.push("");
  lines.push("*Klients:*");
  lines.push(`Vārds: ${q.contact.name || NS}`);
  lines.push(`Telefons: ${q.contact.phone || NS}`);
  lines.push(`E-pasts: ${q.contact.email || NS}`);
  lines.push("");
  lines.push(`*Izvēlētais variants:* ${q.offerType}`);
  lines.push(`*Mājaslapas tips:* ${q.websiteType}`);
  lines.push(`*Pakete:* ${q.packageName}`);
  lines.push("");
  lines.push(`*Cena:* ${formatCurrency(q.finalPrice)}`);
  lines.push(`*Tipiska tirgus cena:* ${q.marketRange}`);
  lines.push("");
  lines.push("*Iekļauts:*");
  if (q.includedItems.length) q.includedItems.forEach((i) => lines.push(`• ${i}`));
  else lines.push(`• ${NS}`);
  lines.push("");
  lines.push("*Papildu maksas izvēles:*");
  if (q.paidExtras.length) q.paidExtras.forEach((e) => lines.push(`• ${e.label} — ${formatCurrency(e.price)}`));
  else lines.push("• —");
  lines.push("");
  lines.push("*Aprēķina loģika:*");
  lines.push(`• Bāzes cena: ${formatCurrency(q.breakdown.basePrice)}`);
  lines.push(`• Pakete: ${q.packageName}`);
  lines.push(`• Koeficients: ×${q.breakdown.multiplier}`);
  lines.push(`• Dizains: ${q.breakdown.design}`);
  lines.push(`• Saturs: ${q.breakdown.content}`);
  lines.push(`• Valodas: ${q.breakdown.languages}`);
  lines.push(`• Termiņš: ${q.breakdown.deadline}`);
  lines.push(`• Atbalsts: ${q.breakdown.support}`);
  lines.push(`• *Gala cena: ${formatCurrency(q.breakdown.finalPrice)}*`);
  lines.push("");
  lines.push("*Atbildes:*");
  lines.push(`• Tips: ${q.answers.type}`);
  lines.push(`• Mērķis: ${q.answers.goal}`);
  lines.push(`• Sadaļas: ${q.answers.sections}`);
  lines.push(`• Funkcijas: ${q.answers.features}`);
  lines.push(`• Termiņš: ${q.answers.deadline}`);
  lines.push("");
  if (q.contact.message) {
    lines.push("*Komentārs:*");
    lines.push(q.contact.message);
  }
  return lines.join("\n");
};
