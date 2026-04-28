export type FeatureCategory =
  | "essential"
  | "marketing"
  | "business"
  | "restaurant"
  | "salon"
  | "autoservice"
  | "ecommerce"
  | "booking"
  | "advanced";

export interface Feature {
  id: string;
  label_lv: string;
  label_en: string;
  category: FeatureCategory;
  description_lv?: string;
  description_en?: string;
  price: number;
}

const f = (
  id: string,
  label_lv: string,
  label_en: string,
  category: FeatureCategory,
  price: number,
): Feature => ({ id, label_lv, label_en, category, price });

export const features: Feature[] = [
  // Essential
  f("contact_form", "Kontaktforma", "Contact form", "essential", 30),
  f("whatsapp", "WhatsApp poga", "WhatsApp button", "essential", 20),
  f("google_maps", "Google Maps", "Google Maps", "essential", 25),
  f("gallery", "Galerija", "Gallery", "essential", 40),
  f("reviews", "Atsauksmes", "Reviews", "essential", 35),
  f("google_reviews", "Google atsauksmes", "Google reviews", "essential", 40),
  f("social_links", "Sociālo tīklu pogas", "Social links", "essential", 15),
  f("faq", "FAQ sadaļa", "FAQ section", "essential", 30),
  f("contact_section", "Kontaktu sadaļa", "Contact section", "essential", 20),
  f("basic_seo", "Pamata SEO", "Basic SEO", "essential", 40),

  // Marketing
  f("animations", "Animācijas", "Animations", "marketing", 60),
  f("multilang", "Daudzvalodu atbalsts", "Multilanguage support", "marketing", 100),
  f("blog", "Blogs", "Blog", "marketing", 90),
  f("landing_cta", "Landing CTA bloks", "Landing CTA block", "marketing", 40),
  f("lead_form", "Lead forma", "Lead form", "marketing", 50),
  f("newsletter", "Newsletter", "Newsletter", "marketing", 60),
  f("analytics", "Analytics setup", "Analytics setup", "marketing", 40),
  f("meta_pixel", "Meta Pixel", "Meta Pixel", "marketing", 35),
  f("google_analytics", "Google Analytics", "Google Analytics", "marketing", 35),
  f("seo_structure", "SEO struktūra", "SEO structure", "marketing", 90),
  f("speed_optimization", "Ātruma optimizācija", "Speed optimisation", "marketing", 70),

  // Business
  f("services_section", "Pakalpojumu sadaļa", "Services section", "business", 50),
  f("pricing_section", "Cenu sadaļa", "Pricing section", "business", 40),
  f("team_section", "Komandas sadaļa", "Team section", "business", 40),
  f("testimonials", "Klientu atsauksmes", "Testimonials", "business", 40),
  f("portfolio", "Portfolio", "Portfolio", "business", 60),
  f("case_studies", "Case studies", "Case studies", "business", 90),
  f("downloadable_files", "Lejupielādējami faili", "Downloadable files", "business", 40),
  f("appointment_request", "Pieraksta pieprasījums", "Appointment request", "business", 60),
  f("custom_forms", "Individuālas formas", "Custom forms", "business", 80),

  // Restaurant
  f("menu_section", "Ēdienkartes sadaļa", "Menu section", "restaurant", 70),
  f("daily_offer", "Dienas piedāvājums", "Daily offer", "restaurant", 30),
  f("table_reservation", "Galdiņu rezervācijas", "Table reservation", "restaurant", 120),
  f("google_maps_location", "Google Maps lokācija", "Google Maps location", "restaurant", 25),
  f("facebook_reviews", "Facebook atsauksmes", "Facebook reviews", "restaurant", 35),
  f("opening_hours", "Darba laiks", "Opening hours", "restaurant", 20),
  f("takeaway_cta", "Takeaway CTA", "Takeaway CTA", "restaurant", 30),
  f("messenger_order", "Messenger pasūtījumi", "Messenger orders", "restaurant", 40),
  f("food_gallery", "Ēdienu galerija", "Food gallery", "restaurant", 50),
  f("daily_lunch_offer", "Dienas pusdienu piedāvājums", "Daily lunch offer", "restaurant", 30),

  // Salon
  f("service_catalog", "Pakalpojumu katalogs", "Service catalog", "salon", 60),
  f("staff_section", "Speciālistu sadaļa", "Staff section", "salon", 50),
  f("booking_request", "Pieraksta pieprasījums", "Booking request", "salon", 80),
  f("before_after_gallery", "Pirms / pēc galerija", "Before / after gallery", "salon", 50),
  f("price_list", "Cenrādis", "Price list", "salon", 30),
  f("instagram_gallery", "Instagram galerija", "Instagram gallery", "salon", 40),

  // Autoservice
  f("service_list", "Pakalpojumu saraksts", "Service list", "autoservice", 50),
  f("car_brand_sections", "Auto marku sadaļas", "Car brand sections", "autoservice", 60),
  f("quote_request_form", "Tāmes pieprasījums", "Quote request form", "autoservice", 60),
  f("repair_booking", "Remonta pieraksts", "Repair booking", "autoservice", 90),
  f("map_location", "Karte / lokācija", "Map / location", "autoservice", 25),
  f("phone_cta", "Zvana CTA", "Call CTA", "autoservice", 15),
  f("service_gallery", "Servisa galerija", "Service gallery", "autoservice", 40),

  // E-commerce
  f("product_catalog", "Produktu katalogs", "Product catalog", "ecommerce", 200),
  f("cart", "Grozs", "Cart", "ecommerce", 90),
  f("checkout", "Checkout", "Checkout", "ecommerce", 120),
  f("payments", "Maksājumi (Stripe)", "Payments (Stripe)", "ecommerce", 180),
  f("delivery_options", "Piegādes opcijas", "Delivery options", "ecommerce", 80),
  f("promo_codes", "Promo kodi", "Promo codes", "ecommerce", 60),
  f("order_notifications", "Pasūtījumu paziņojumi", "Order notifications", "ecommerce", 60),
  f("inventory_basic", "Pamata noliktava", "Basic inventory", "ecommerce", 100),
  f("product_filters", "Produktu filtri", "Product filters", "ecommerce", 80),
  f("product_search", "Meklēšana", "Search", "ecommerce", 60),
  f("customer_accounts", "Klientu konti", "Customer accounts", "ecommerce", 150),

  // Booking
  f("calendar", "Kalendārs", "Calendar", "booking", 120),
  f("booking_form", "Booking forma", "Booking form", "booking", 90),
  f("time_slots", "Laika sloti", "Time slots", "booking", 80),
  f("automatic_confirmation", "Automātiska apstiprināšana", "Automatic confirmation", "booking", 70),
  f("admin_booking_view", "Admin pieskatīšana", "Admin booking view", "booking", 100),
  f("telegram_booking_notification", "Telegram paziņojumi", "Telegram notifications", "booking", 50),
  f("email_booking_notification", "E-pasta paziņojumi", "Email notifications", "booking", 40),
  f("cancellation_flow", "Atcelšanas plūsma", "Cancellation flow", "booking", 60),

  // Advanced
  f("admin_panel", "Admin panelis", "Admin panel", "advanced", 250),
  f("user_accounts", "Lietotāju konti", "User accounts", "advanced", 200),
  f("login_system", "Login sistēma", "Login system", "advanced", 150),
  f("dashboard", "Dashboard", "Dashboard", "advanced", 220),
  f("crm_integration", "CRM integrācija", "CRM integration", "advanced", 180),
  f("file_uploads", "Failu augšupielāde", "File uploads", "advanced", 120),
  f("database", "Datubāze", "Database", "advanced", 200),
  f("api_integration", "API integrācija", "API integration", "advanced", 180),
  f("telegram_bot", "Telegram bots", "Telegram bot", "advanced", 200),
  f("email_automation", "E-pasta automatizācija", "Email automation", "advanced", 150),
  f("custom_web_app", "Custom web aplikācija", "Custom web app", "advanced", 400),
  f("subscriptions", "Abonementi", "Subscriptions", "advanced", 220),
  f("role_permissions", "Lomu sistēma", "Role permissions", "advanced", 150),
  f("reporting_dashboard", "Atskaites", "Reporting dashboard", "advanced", 200),
];

export const featureMap: Record<string, Feature> = features.reduce(
  (acc, ft) => ((acc[ft.id] = ft), acc),
  {} as Record<string, Feature>,
);

export const getFeature = (id: string) => featureMap[id];

export const featuresByCategory = (cat: FeatureCategory) =>
  features.filter((ft) => ft.category === cat);
