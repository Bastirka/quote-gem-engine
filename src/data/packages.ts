export type PackageId = "basic" | "medium" | "premium";

export interface Package {
  id: PackageId;
  name: string;
  multiplier: number;
  description_lv: string;
  description_en: string;
  bestFor_lv: string;
  bestFor_en: string;
  includedItems_lv: string[];
  includedItems_en: string[];
  /** feature ids that are bundled inside this package and shouldn't be charged again */
  includedFeatureIds: string[];
}

export const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    multiplier: 1.0,
    description_lv: "Vienkāršs un ātrs risinājums pirmajai mājaslapai.",
    description_en: "Simple and fast solution for a first website.",
    bestFor_lv: "Piemērots vienkāršai klātbūtnei internetā, landing page vai mazam pakalpojumu sniedzējam.",
    bestFor_en: "For a simple online presence, a landing page or a small service provider.",
    includedItems_lv: [
      "Vienkārša lapas struktūra",
      "Responsīvs dizains",
      "Kontaktinformācija",
      "Sociālo tīklu pogas",
      "Pamata SEO",
      "Ātra publicēšana",
    ],
    includedItems_en: [
      "Simple page structure",
      "Responsive design",
      "Contact information",
      "Social links",
      "Basic SEO",
      "Quick launch",
    ],
    includedFeatureIds: ["contact_section", "social_links", "basic_seo"],
  },
  {
    id: "medium",
    name: "Medium",
    multiplier: 1.35,
    description_lv: "Labākā izvēle mazam uzņēmumam, kafejnīcai vai pakalpojumu sniedzējam.",
    description_en: "Best choice for most small businesses.",
    bestFor_lv: "Piemērots uzņēmumiem, kuriem vajag uzticamu izskatu, lokāciju, kontaktformu un skaidru piedāvājumu.",
    bestFor_en: "For businesses that need a trustworthy look, location, contact form and a clear offer.",
    includedItems_lv: [
      "Viss no Basic",
      "Vairākas sadaļas",
      "Kontaktforma",
      "Google Maps / lokācija",
      "Atsauksmju sadaļa",
      "Pakalpojumu vai ēdienkartes sadaļa",
      "Labāka CTA struktūra",
      "Mobilā optimizācija",
      "Uzlabots vizuālais dizains",
    ],
    includedItems_en: [
      "Everything in Basic",
      "Multiple sections",
      "Contact form",
      "Google Maps / location",
      "Reviews section",
      "Services or menu section",
      "Better CTA structure",
      "Mobile optimisation",
      "Improved visual design",
    ],
    includedFeatureIds: [
      "contact_section",
      "social_links",
      "basic_seo",
      "contact_form",
      "google_maps",
      "reviews",
      "services_section",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    multiplier: 1.75,
    description_lv: "Spēcīgāks dizains, vairāk funkciju un labāka konversija.",
    description_en: "Stronger design, more features and better conversion.",
    bestFor_lv: "Piemērots uzņēmumiem, kas grib izskatīties nopietnāk, pārdot vairāk un saņemt kvalitatīvāku digitālo tēlu.",
    bestFor_en: "For businesses that want to look serious, sell more and get a stronger digital image.",
    includedItems_lv: [
      "Viss no Medium",
      "Premium dizaina bloki",
      "Animācijas un mikrointerakcijas",
      "SEO struktūra",
      "Analytics / tracking sagatave",
      "Ātruma optimizācija",
      "Papildu CTA sadaļas",
      "Individuālāka vizuālā pieeja",
      "Prioritāra izstrāde",
    ],
    includedItems_en: [
      "Everything in Medium",
      "Premium design blocks",
      "Animations and microinteractions",
      "SEO structure",
      "Analytics / tracking setup",
      "Speed optimisation",
      "Additional CTA sections",
      "More individual visual approach",
      "Priority development",
    ],
    includedFeatureIds: [
      "contact_section",
      "social_links",
      "basic_seo",
      "contact_form",
      "google_maps",
      "reviews",
      "services_section",
      "animations",
      "seo_structure",
      "analytics",
      "speed_optimization",
    ],
  },
];

export const getPackage = (id: PackageId | null) =>
  packages.find((p) => p.id === id) ?? null;

export const tierOrder: PackageId[] = ["basic", "medium", "premium"];
export const getNextTier = (current: PackageId | null): PackageId | null => {
  if (!current) return null;
  const i = tierOrder.indexOf(current);
  if (i === -1 || i === tierOrder.length - 1) return null;
  return tierOrder[i + 1];
};
