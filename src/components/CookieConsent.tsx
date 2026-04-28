import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "pricelab-cookie-consent";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (value: "all" | "necessary") => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-soft p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand shadow-brand">
            <Cookie className="h-5 w-5 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use cookies to ensure website functionality, analyze traffic, and improve user experience.
            You can accept all cookies or allow only necessary cookies.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => accept("necessary")}>
            Necessary only
          </Button>
          <Button
            size="sm"
            onClick={() => accept("all")}
            className="bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-brand border-0"
          >
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
