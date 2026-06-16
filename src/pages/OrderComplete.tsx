import { useEffect } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/neflixy-logo.png";

const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID;
const GOOGLE_ADS_CONVERSION_LABEL = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL;

const OrderComplete = () => {
  useEffect(() => {
    if (window.location.pathname === "/thank-you") {
      const params = window.location.search;
      window.location.replace(`https://neflixy.com/thank-you${params}`);
      return;
    }

    document.title = "Request Received | PriceLab by Neflixy";

    const metaSelectors = [
      'meta[name="robots"]',
      'meta[name="googlebot"]',
      'meta[name="description"]',
    ];

    const previous = metaSelectors.map((selector) => {
      const existing = document.head.querySelector(selector);
      return existing ? { selector, node: existing, parent: existing.parentNode } : null;
    });

    const applyMeta = (name: string, content: string) => {
      let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    applyMeta("robots", "noindex, nofollow");
    applyMeta("googlebot", "noindex, nofollow");

    const description = "Thank you. We have received your website request and will review it shortly.";
    let descriptionTag = document.head.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", description);

    const params = new URLSearchParams(window.location.search);
    const shouldTrack =
      typeof window !== "undefined" &&
      (sessionStorage.getItem("pricelab_request_submitted") === "true" || params.get("submitted") === "true");
    if (shouldTrack && GOOGLE_ADS_ID && GOOGLE_ADS_CONVERSION_LABEL && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      });
      sessionStorage.removeItem("pricelab_request_submitted");
    }

    return () => {
      document.title = "PriceLab by Neflixy";
      previous.forEach((item) => {
        if (!item) return;
        const current = document.head.querySelector(item.selector);
        if (current && current.parentNode) current.parentNode.removeChild(current);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-page text-foreground">
      <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />

      <header className="relative z-10 border-b border-white/10 bg-background/35 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="PriceLab by Neflixy logo" className="h-10 w-10 rounded-xl shadow-brand" />
            <div className="leading-tight">
              <div className="font-display font-bold text-lg">PriceLab</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">by Neflixy</div>
            </div>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <section className="glow-card p-7 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10 border border-success/30">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-3">Request complete</p>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-gradient-brand">
              Request received successfully
            </h1>
            <p className="mt-4 text-lg text-foreground/85">
              Thank you! We have received your website request and will review it shortly.
            </p>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-7">
              Our team will check the submitted information and contact you as soon as possible with
              the next steps, estimated price, and project details.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              <Button asChild variant="outline" className="h-11 border-white/15 hover:border-primary/50">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Link>
              </Button>
              <Button asChild className="h-11 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-brand border-0">
                <Link to="/#request-offer">
                  <Send className="h-4 w-4" />
                  Submit another request
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrderComplete;
