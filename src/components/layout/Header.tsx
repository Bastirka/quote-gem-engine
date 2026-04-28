import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Menu, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lang } from "@/i18n/translations";
import type { Translations } from "@/i18n/translations";
import { cn } from "@/lib/utils";

interface HeaderProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Translations;
  onReset: () => void;
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Header = ({ lang, setLang, tr, onReset }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { id: "home", label: tr.nav.home },
    { id: "calculator", label: tr.nav.calculator },
    { id: "recommended", label: tr.nav.recommended },
    { id: "request-offer", label: tr.nav.request },
    { id: "faq", label: tr.nav.faq },
  ];

  const handleNav = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => handleNav("home")} className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-brand">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="text-left leading-none">
            <span className="block font-display font-bold text-lg tracking-tight">PriceLab</span>
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">by Neflixy</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => handleNav(n.id)}
              className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg transition-colors hover:bg-white/5"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-full border border-white/10 bg-card/50 p-0.5 text-xs">
            {(["lv", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-2.5 py-1 rounded-full uppercase font-semibold tracking-wider transition-colors",
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={onReset} className="hidden md:flex" title={tr.nav.reset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handleNav("request-offer")}
            size="sm"
            className="hidden sm:inline-flex bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-brand border-0"
          >
            {tr.nav.request}
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNav(n.id)}
                className="text-left px-3 py-2.5 rounded-lg text-foreground hover:bg-white/5"
              >
                {n.label}
              </button>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-2">
              <div className="flex items-center rounded-full border border-white/10 p-0.5 text-xs">
                {(["lv", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={cn(
                      "px-3 py-1 rounded-full uppercase font-semibold tracking-wider",
                      lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <Button size="sm" variant="ghost" onClick={onReset}>
                <RotateCcw className="h-4 w-4" /> {tr.nav.reset}
              </Button>
            </div>
            <Link to="/privacy-policy" className="text-xs text-muted-foreground px-3 py-2">
              {tr.footer.privacy}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
