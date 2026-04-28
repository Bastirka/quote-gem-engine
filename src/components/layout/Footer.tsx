import { Sparkles, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Translations } from "@/i18n/translations";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Footer = ({ tr }: { tr: Translations }) => (
  <footer className="border-t border-white/10 bg-background/60 backdrop-blur-md mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-brand">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="leading-none">
            <span className="block font-display font-bold text-lg">PriceLab</span>
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">by Neflixy</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-4 max-w-xs">{tr.footer.disclaimer}</p>
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Kontakti</div>
        <a href="mailto:neflixyteam@gmail.com" className="flex items-center gap-2 text-sm text-foreground/85 hover:text-foreground">
          <Mail className="h-4 w-4" /> neflixyteam@gmail.com
        </a>
        <a href="tel:+37125610853" className="flex items-center gap-2 text-sm text-foreground/85 hover:text-foreground">
          <Phone className="h-4 w-4" /> +371 25 610 853
        </a>
        <a href="tel:+37126212014" className="flex items-center gap-2 text-sm text-foreground/85 hover:text-foreground">
          <Phone className="h-4 w-4" /> +371 26 212 014
        </a>
        <Link to="/privacy-policy" className="block text-sm text-muted-foreground hover:text-foreground mt-2">
          {tr.footer.privacy}
        </Link>
      </div>

      <div className="space-y-3">
        <Button
          onClick={() => scrollTo("calculator")}
          variant="outline"
          className="w-full border-white/15 hover:border-primary/50"
        >
          {tr.footer.ctaCalc}
        </Button>
        <Button
          onClick={() => scrollTo("request-offer")}
          className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-brand border-0"
        >
          {tr.footer.ctaQuote}
        </Button>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Neflixy. {tr.footer.rights}</span>
        <span>PriceLab v1.0</span>
      </div>
    </div>
  </footer>
);
