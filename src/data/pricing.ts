export interface WebsiteType {
  id: string;
  label_lv: string;
  label_en: string;
  basePrice: number;
  marketMin: number;
  marketMax: number;
  clientMin: number;
  clientMax: number;
  /** feature ids that are most relevant to this type */
  recommendedFeatures: string[];
}

export const websiteTypes: WebsiteType[] = [
  {
    id: "landing",
    label_lv: "Landing page",
    label_en: "Landing page",
    basePrice: 85,
    marketMin: 150,
    marketMax: 350,
    clientMin: 50,
    clientMax: 120,
    recommendedFeatures: ["contact_form", "whatsapp", "social_links", "basic_seo", "landing_cta"],
  },
  {
    id: "business",
    label_lv: "Uzņēmuma mājaslapa",
    label_en: "Business website",
    basePrice: 220,
    marketMin: 400,
    marketMax: 900,
    clientMin: 120,
    clientMax: 350,
    recommendedFeatures: ["contact_form", "services_section", "team_section", "google_maps", "basic_seo"],
  },
  {
    id: "restaurant",
    label_lv: "Restorāns / kafejnīca",
    label_en: "Restaurant / cafe website",
    basePrice: 320,
    marketMin: 600,
    marketMax: 1300,
    clientMin: 180,
    clientMax: 550,
    recommendedFeatures: [
      "menu_section",
      "table_reservation",
      "google_maps_location",
      "opening_hours",
      "food_gallery",
      "google_reviews",
    ],
  },
  {
    id: "salon",
    label_lv: "Frizētava / salons",
    label_en: "Salon / beauty website",
    basePrice: 280,
    marketMin: 500,
    marketMax: 1200,
    clientMin: 160,
    clientMax: 500,
    recommendedFeatures: ["service_catalog", "staff_section", "booking_request", "before_after_gallery", "instagram_gallery"],
  },
  {
    id: "autoservice",
    label_lv: "Auto serviss",
    label_en: "Auto service website",
    basePrice: 340,
    marketMin: 600,
    marketMax: 1400,
    clientMin: 180,
    clientMax: 600,
    recommendedFeatures: ["service_list", "quote_request_form", "repair_booking", "map_location", "phone_cta"],
  },
  {
    id: "portfolio",
    label_lv: "Portfolio / personīgais zīmols",
    label_en: "Portfolio / personal brand",
    basePrice: 190,
    marketMin: 300,
    marketMax: 800,
    clientMin: 100,
    clientMax: 300,
    recommendedFeatures: ["gallery", "case_studies", "social_links", "contact_form", "animations"],
  },
  {
    id: "ecommerce",
    label_lv: "E-veikals",
    label_en: "Online shop",
    basePrice: 700,
    marketMin: 1000,
    marketMax: 3000,
    clientMin: 350,
    clientMax: 1200,
    recommendedFeatures: ["product_catalog", "cart", "checkout", "payments", "delivery_options", "product_filters"],
  },
  {
    id: "booking",
    label_lv: "Booking / pierakstu sistēma",
    label_en: "Booking / reservation system",
    basePrice: 650,
    marketMin: 900,
    marketMax: 2800,
    clientMin: 350,
    clientMax: 1100,
    recommendedFeatures: ["calendar", "booking_form", "time_slots", "automatic_confirmation", "admin_booking_view"],
  },
  {
    id: "education",
    label_lv: "Izglītības / kursu lapa",
    label_en: "Education / courses website",
    basePrice: 520,
    marketMin: 800,
    marketMax: 2200,
    clientMin: 250,
    clientMax: 900,
    recommendedFeatures: ["lead_form", "newsletter", "downloadable_files", "blog", "user_accounts"],
  },
  {
    id: "realestate",
    label_lv: "Nekustamo īpašumu lapa",
    label_en: "Real estate website",
    basePrice: 600,
    marketMin: 1000,
    marketMax: 2600,
    clientMin: 300,
    clientMax: 1000,
    recommendedFeatures: ["product_filters", "product_search", "gallery", "contact_form", "lead_form"],
  },
  {
    id: "event",
    label_lv: "Pasākuma lapa",
    label_en: "Event website",
    basePrice: 300,
    marketMin: 500,
    marketMax: 1300,
    clientMin: 150,
    clientMax: 500,
    recommendedFeatures: ["landing_cta", "lead_form", "google_maps", "social_links", "newsletter"],
  },
  {
    id: "saas",
    label_lv: "SaaS / web aplikācija",
    label_en: "SaaS / web app",
    basePrice: 1400,
    marketMin: 2500,
    marketMax: 7000,
    clientMin: 700,
    clientMax: 2500,
    recommendedFeatures: ["user_accounts", "dashboard", "subscriptions", "admin_panel", "api_integration", "database"],
  },
  {
    id: "custom",
    label_lv: "Custom sistēma",
    label_en: "Custom system",
    basePrice: 1300,
    marketMin: 2000,
    marketMax: 7000,
    clientMin: 600,
    clientMax: 2500,
    recommendedFeatures: ["admin_panel", "database", "api_integration", "custom_web_app", "role_permissions"],
  },
];

export const getWebsiteType = (id: string | null) =>
  websiteTypes.find((w) => w.id === id) ?? null;

// Design / content / language / deadline / support options (price in EUR)
export interface PricedOption {
  id: string;
  label_lv: string;
  label_en: string;
  price: number;
}

export const designOptions: PricedOption[] = [
  { id: "design_simple", label_lv: "Vienkāršs dizains", label_en: "Simple design", price: 0 },
  { id: "design_modern", label_lv: "Moderns biznesa dizains", label_en: "Modern business design", price: 80 },
  { id: "design_premium", label_lv: "Premium vizuālais dizains", label_en: "Premium visual design", price: 180 },
  { id: "design_custom", label_lv: "Individuāls custom dizains", label_en: "Custom design", price: 350 },
];

export const contentOptions: PricedOption[] = [
  { id: "content_client", label_lv: "Klients dod visu", label_en: "Client provides everything", price: 0 },
  { id: "content_format", label_lv: "Tekstu sakārtošana", label_en: "Text formatting", price: 50 },
  { id: "content_help", label_lv: "Palīdzība ar tekstiem", label_en: "Help writing texts", price: 120 },
  { id: "content_full", label_lv: "Pilna satura struktūra", label_en: "Full content structure", price: 250 },
];

export const languageOptions: PricedOption[] = [
  { id: "lang_lv", label_lv: "Tikai latviski", label_en: "Latvian only", price: 0 },
  { id: "lang_lv_en", label_lv: "LV + EN", label_en: "LV + EN", price: 120 },
  { id: "lang_lv_en_ru", label_lv: "LV + EN + RU", label_en: "LV + EN + RU", price: 220 },
  { id: "lang_multi", label_lv: "4+ valodas", label_en: "4+ languages", price: 350 },
];

export const deadlineOptions: PricedOption[] = [
  { id: "deadline_flex", label_lv: "Elastīgs termiņš", label_en: "Flexible deadline", price: 0 },
  { id: "deadline_2w", label_lv: "2 nedēļu laikā", label_en: "Within 2 weeks", price: 120 },
  { id: "deadline_urgent", label_lv: "Steidzami", label_en: "Urgent", price: 250 },
];

export const supportOptions: PricedOption[] = [
  { id: "support_none", label_lv: "Bez atbalsta", label_en: "No support", price: 0 },
  { id: "support_basic", label_lv: "Pamata palaišanas atbalsts", label_en: "Basic launch support", price: 50 },
  { id: "support_month", label_lv: "1 mēneša atbalsts", label_en: "1 month support", price: 120 },
];

export const findOption = (list: PricedOption[], id: string | null) =>
  list.find((o) => o.id === id) ?? null;
