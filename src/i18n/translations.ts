export type Lang = "lv" | "en";

export const detectLang = (): Lang => {
  if (typeof window === "undefined") return "lv";
  const saved = localStorage.getItem("pricelab-lang");
  if (saved === "lv" || saved === "en") return saved;
  const nav = navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("lv")) return "lv";
  if (nav.startsWith("en")) return "en";
  return "lv";
};

interface NavT {
  home: string; calculator: string; recommended: string; request: string; faq: string; reset: string;
}
interface HeroT {
  title: string; subtitle: string; badges: string[]; ctaStart: string; ctaQuote: string;
}
interface HowStepT { title: string; desc: string; }
interface HowT { title: string; subtitle: string; steps: HowStepT[]; }
interface RecommendedT {
  title: string; subtitle: string; popular: string; choose: string; chosen: string; cancel: string;
  requestOffer: string; bestFor: string; includes: string; market: string;
}
interface CalcT {
  title: string; subtitle: string; next: string; back: string; requestOffer: string;
  step: string; of: string; steps: string[];
  goal: string; sections: string; features: string; ecommerce: string;
  design: string; content: string; languages: string; deadline: string; support: string;
  summary: string; notSpecified: string;
  goals: { id: string; label: string }[];
  sectionList: { id: string; label: string }[];
}
interface ResultT {
  title: string; basePrice: string; package: string; multiplier: string;
  included: string; paidExtras: string; design: string; content: string; languages: string;
  deadline: string; support: string; finalPrice: string; marketPrice: string; savings: string;
  cta: string; empty: string;
}
interface QuoteT {
  title: string; subtitle: string; name: string; phone: string; email: string; message: string;
  submit: string; sending: string; success: string; errorContact: string; errorGeneric: string;
  summaryTitle: string; offerType: string; websiteType: string; packageL: string;
  finalPrice: string; market: string;
}
interface FaqItemT { q: string; a: string; }
interface FaqT { title: string; items: FaqItemT[]; }
interface FooterT {
  disclaimer: string; privacy: string; ctaCalc: string; ctaQuote: string; rights: string;
}
export interface Translations {
  nav: NavT; hero: HeroT; how: HowT; recommended: RecommendedT; calc: CalcT;
  result: ResultT; quote: QuoteT; faq: FaqT; footer: FooterT;
}

export const t: Record<Lang, Translations> = {
  lv: {
    nav: {
      home: "Sākums",
      calculator: "Kalkulators",
      recommended: "Rekomendētie varianti",
      request: "Pieprasīt piedāvājumu",
      faq: "FAQ",
      reset: "Atiestatīt",
    },
    hero: {
      title: "Cik maksā jūsu mājaslapa?",
      subtitle:
        "Aprēķiniet aptuvenu mājaslapas cenu dažu minūšu laikā. Izvēlieties rekomendētu paku vai salieciet savu variantu pa vienai funkcijai.",
      badges: [
        "Reāllaika aprēķins",
        "Bez saistībām",
        "Caurspīdīga cena",
        "Neflixy Team",
        "Piemērots Latvijas mazajiem uzņēmumiem",
      ],
      ctaStart: "Sākt aprēķinu",
      ctaQuote: "Pieprasīt piedāvājumu",
    },
    how: {
      title: "Kā tas strādā",
      subtitle: "Trīs vienkārši soļi līdz cenai un piedāvājumam.",
      steps: [
        { title: "Izvēlies mājaslapas tipu", desc: "Landing page, biznesa mājaslapa, e-veikals, booking vai custom." },
        { title: "Pievieno funkcijas vai izvēlies rekomendēto paku", desc: "Salieciet savu variantu vai sāciet ar gatavu paku." },
        { title: "Saņem cenu un nosūti pieprasījumu", desc: "Mēs sazināsimies ar jums ar precīzu piedāvājumu." },
      ],
    },
    recommended: {
      title: "Rekomendētie varianti",
      subtitle: "Mūsu populārākās pakas — sāciet ātri un mainiet pēc savām vajadzībām.",
      popular: "Populārākā izvēle",
      choose: "Izvēlēties šo",
      chosen: "Izvēlēts",
      cancel: "Atcelt izvēli",
      requestOffer: "Pieprasīt piedāvājumu",
      bestFor: "Piemērots:",
      includes: "Iekļauts:",
      market: "Tirgus cena",
    },
    calc: {
      title: "Kalkulators",
      subtitle: "Salieciet savu variantu pa vienai funkcijai.",
      next: "Tālāk",
      back: "Atpakaļ",
      requestOffer: "Pieprasīt piedāvājumu",
      step: "Solis",
      of: "no",
      steps: [
        "Mājaslapas tips",
        "Mērķis",
        "Sadaļas",
        "Funkcijas",
        "E-commerce / booking",
        "Dizains / saturs / valodas",
        "Termiņš / atbalsts",
        "Gala pārskats",
      ],
      goal: "Kāds ir jūsu galvenais mērķis?",
      sections: "Kuras sadaļas ir vajadzīgas?",
      features: "Kuras funkcijas vajadzētu?",
      ecommerce: "E-commerce / booking iespējas",
      design: "Dizaina līmenis",
      content: "Saturs / materiāli",
      languages: "Valodas",
      deadline: "Termiņš",
      support: "Atbalsts",
      summary: "Gala pārskats",
      notSpecified: "Nav norādīts",
      goals: [
        { id: "presence", label: "Klātbūtne internetā" },
        { id: "leads", label: "Piesaistīt klientus" },
        { id: "sell", label: "Pārdot online" },
        { id: "book", label: "Pieņemt rezervācijas" },
        { id: "brand", label: "Stiprināt zīmolu" },
      ],
      sectionList: [
        { id: "home", label: "Sākumlapa" },
        { id: "about", label: "Par mums" },
        { id: "services", label: "Pakalpojumi" },
        { id: "portfolio", label: "Portfolio / galerija" },
        { id: "contact", label: "Kontakti" },
        { id: "blog", label: "Blogs / jaunumi" },
        { id: "team", label: "Komanda" },
        { id: "faq", label: "FAQ" },
      ],
    },
    result: {
      title: "Jūsu cena",
      basePrice: "Bāzes cena",
      package: "Pakete",
      multiplier: "Koeficients",
      included: "Iekļauts paketē",
      paidExtras: "Papildu maksas izvēles",
      design: "Dizains",
      content: "Saturs",
      languages: "Valodas",
      deadline: "Termiņš",
      support: "Atbalsts",
      finalPrice: "Gala cena",
      marketPrice: "Tipiska tirgus cena",
      savings: "Jūs ietaupāt",
      cta: "Pieprasīt piedāvājumu",
      empty: "Izvēlieties mājaslapas tipu, lai redzētu cenu.",
    },
    quote: {
      title: "Pieprasīt piedāvājumu",
      subtitle: "Aizpildiet formu — atbildēsim 1 darba dienas laikā.",
      name: "Vārds",
      phone: "Telefons",
      email: "E-pasts",
      message: "Komentārs (nav obligāts)",
      submit: "Nosūtīt pieprasījumu",
      sending: "Sūta...",
      success: "Paldies! Pieprasījums saņemts. Mēs sazināsimies drīzumā.",
      errorContact: "Norādiet vismaz telefonu vai e-pastu.",
      errorGeneric: "Neizdevās nosūtīt. Mēģiniet vēlreiz vai rakstiet uz neflixyteam@gmail.com.",
      summaryTitle: "Jūsu izvēle",
      offerType: "Izvēlētais variants",
      websiteType: "Mājaslapas tips",
      packageL: "Pakete",
      finalPrice: "Gala cena",
      market: "Tirgus cena",
    },
    faq: {
      title: "Biežāk uzdotie jautājumi",
      items: [
        { q: "Vai cena ir galīgā?", a: "Šis ir aptuvens aprēķins. Precīzu cenu apstiprinām pēc detalizētas sarunas." },
        { q: "Kāpēc cena ir zemāka nekā studijās?", a: "Mēs strādājam mazā komandā ar moderniem rīkiem un bez liekām virsbūvēm." },
        { q: "Vai var pasūtīt vienkāršu mājaslapu?", a: "Jā — landing page sākas no aptuveni 80€." },
        { q: "Vai var izveidot restorāna vai kafejnīcas mājaslapu?", a: "Jā, ar ēdienkarti, rezervācijām un Google Maps." },
        { q: "Vai var pieslēgt rezervācijas vai e-veikalu?", a: "Jā, gan booking sistēmu, gan pilnvērtīgu e-veikalu ar maksājumiem." },
        { q: "Vai es varu izvēlēties rekomendēto paku un pēc tam mainīt lietas?", a: "Jā — pēc paketes izvēles varat brīvi pievienot vai noņemt funkcijas." },
        { q: "Vai pieprasījums uzreiz nozīmē pasūtījumu?", a: "Nē. Pieprasījums ir nesaistošs — mēs sazināmies un kopīgi precizējam detaļas." },
      ],
    },
    footer: {
      disclaimer: "Aprēķins ir aptuvens. Precīza cena atkarīga no satura, termiņa un funkcijām.",
      privacy: "Privātuma politika",
      ctaCalc: "Atvērt kalkulatoru",
      ctaQuote: "Pieprasīt piedāvājumu",
      rights: "Visas tiesības aizsargātas.",
    },
  },
  en: {
    nav: {
      home: "Home",
      calculator: "Calculator",
      recommended: "Recommended",
      request: "Request a quote",
      faq: "FAQ",
      reset: "Reset",
    },
    hero: {
      title: "How much does your website cost?",
      subtitle:
        "Estimate the price of your website in minutes. Pick a recommended package or build your own configuration feature by feature.",
      badges: [
        "Real-time estimate",
        "No commitment",
        "Transparent pricing",
        "Neflixy Team",
        "Built for Latvian small businesses",
      ],
      ctaStart: "Start estimate",
      ctaQuote: "Request a quote",
    },
    how: {
      title: "How it works",
      subtitle: "Three simple steps to a price and a proposal.",
      steps: [
        { title: "Choose your website type", desc: "Landing page, business site, e-commerce, booking or custom." },
        { title: "Add features or pick a recommended package", desc: "Build your own or start with a ready package." },
        { title: "Get the price and send a request", desc: "We'll get back to you with a precise quote." },
      ],
    },
    recommended: {
      title: "Recommended packages",
      subtitle: "Our most popular bundles — start fast and adjust to your needs.",
      popular: "Most popular",
      choose: "Choose this",
      chosen: "Selected",
      cancel: "Cancel selection",
      requestOffer: "Request a quote",
      bestFor: "Best for:",
      includes: "Includes:",
      market: "Market price",
    },
    calc: {
      title: "Calculator",
      subtitle: "Build your own configuration feature by feature.",
      next: "Next",
      back: "Back",
      requestOffer: "Request a quote",
      step: "Step",
      of: "of",
      steps: [
        "Website type",
        "Goal",
        "Sections",
        "Features",
        "E-commerce / booking",
        "Design / content / languages",
        "Deadline / support",
        "Summary",
      ],
      goal: "What's your main goal?",
      sections: "Which sections do you need?",
      features: "Which features would you like?",
      ecommerce: "E-commerce / booking options",
      design: "Design level",
      content: "Content / materials",
      languages: "Languages",
      deadline: "Deadline",
      support: "Support",
      summary: "Summary",
      notSpecified: "Not specified",
      goals: [
        { id: "presence", label: "Online presence" },
        { id: "leads", label: "Get more leads" },
        { id: "sell", label: "Sell online" },
        { id: "book", label: "Take bookings" },
        { id: "brand", label: "Strengthen brand" },
      ],
      sectionList: [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "services", label: "Services" },
        { id: "portfolio", label: "Portfolio / gallery" },
        { id: "contact", label: "Contact" },
        { id: "blog", label: "Blog / news" },
        { id: "team", label: "Team" },
        { id: "faq", label: "FAQ" },
      ],
    },
    result: {
      title: "Your price",
      basePrice: "Base price",
      package: "Package",
      multiplier: "Multiplier",
      included: "Included in package",
      paidExtras: "Paid extras",
      design: "Design",
      content: "Content",
      languages: "Languages",
      deadline: "Deadline",
      support: "Support",
      finalPrice: "Final price",
      marketPrice: "Typical market price",
      savings: "You save",
      cta: "Request a quote",
      empty: "Pick a website type to see your price.",
    },
    quote: {
      title: "Request a quote",
      subtitle: "Fill in the form — we'll respond within 1 business day.",
      name: "Name",
      phone: "Phone",
      email: "Email",
      message: "Message (optional)",
      submit: "Send request",
      sending: "Sending...",
      success: "Thanks! Your request has been received. We'll be in touch shortly.",
      errorContact: "Please provide at least a phone or an email.",
      errorGeneric: "Could not send. Please retry or email neflixyteam@gmail.com.",
      summaryTitle: "Your selection",
      offerType: "Selected option",
      websiteType: "Website type",
      packageL: "Package",
      finalPrice: "Final price",
      market: "Market price",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "Is the price final?", a: "It's an estimate. We confirm the exact price after a short discussion." },
        { q: "Why is it cheaper than agencies?", a: "We work in a small team with modern tooling and no overhead." },
        { q: "Can I order a simple website?", a: "Yes — landing pages start at around €80." },
        { q: "Can you build a restaurant or cafe website?", a: "Yes, with menu, reservations and Google Maps." },
        { q: "Can you add bookings or e-commerce?", a: "Yes — both booking systems and full e-commerce with payments." },
        { q: "Can I pick a recommended package and then change things?", a: "Yes — after picking a package you can freely add or remove features." },
        { q: "Does sending a request mean I'm ordering?", a: "No. The request is non-binding — we get in touch and clarify together." },
      ],
    },
    footer: {
      disclaimer: "This is an estimate. The exact price depends on content, deadline and features.",
      privacy: "Privacy Policy",
      ctaCalc: "Open calculator",
      ctaQuote: "Request a quote",
      rights: "All rights reserved.",
    },
  },
};

