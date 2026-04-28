import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Layers,
  ShieldCheck,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/neflixy-logo.png";

type WebsiteType = { id: string; name: string; basePrice: number; desc: string };
type PackageTier = { id: string; name: string; multiplier: number; perks: string[] };
type Feature = { id: string; name: string; price: number };

const websiteTypes: WebsiteType[] = [
  { id: "landing", name: "Landing page", basePrice: 350, desc: "Single-page focused on conversion" },
  { id: "business", name: "Business website", basePrice: 750, desc: "Multi-page company presence" },
  { id: "ecommerce", name: "E-commerce", basePrice: 1400, desc: "Online store with payments" },
  { id: "webapp", name: "Web application", basePrice: 2200, desc: "Custom dashboards & logic" },
];

const packages: PackageTier[] = [
  {
    id: "starter",
    name: "Starter",
    multiplier: 1,
    perks: ["Responsive design", "Up to 3 sections", "Contact form", "1 revision round"],
  },
  {
    id: "pro",
    name: "Pro",
    multiplier: 1.6,
    perks: ["Custom design", "Up to 8 sections", "CMS integration", "3 revision rounds", "Basic SEO"],
  },
  {
    id: "premium",
    name: "Premium",
    multiplier: 2.4,
    perks: ["Bespoke UI/UX", "Unlimited sections", "Advanced animations", "Unlimited revisions", "Full SEO + analytics"],
  },
];

const features: Feature[] = [
  { id: "seo", name: "Advanced SEO setup", price: 180 },
  { id: "blog", name: "Blog / CMS", price: 220 },
  { id: "i18n", name: "Multi-language", price: 260 },
  { id: "auth", name: "User authentication", price: 320 },
  { id: "payments", name: "Payments integration", price: 380 },
  { id: "telegram", name: "Telegram notifications", price: 120 },
  { id: "analytics", name: "Analytics & dashboards", price: 200 },
  { id: "maintenance", name: "Monthly maintenance", price: 90 },
];

const Index = () => {
  const [typeId, setTypeId] = useState(websiteTypes[1].id);
  const [packageId, setPackageId] = useState(packages[1].id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["seo"]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const selectedType = websiteTypes.find((t) => t.id === typeId)!;
  const selectedPackage = packages.find((p) => p.id === packageId)!;

  const price = useMemo(() => {
    const base = selectedType.basePrice * selectedPackage.multiplier;
    const extras = features
      .filter((f) => selectedFeatures.includes(f.id))
      .reduce((sum, f) => sum + f.price, 0);
    return Math.round(base + extras);
  }, [selectedType, selectedPackage, selectedFeatures]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({
        title: "Missing information",
        description: "Please provide at least your name and email.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    // Simulate request — backend wiring (Telegram/DB) can be added later
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast({
      title: "Quote request sent",
      description: "Our team will get back to you shortly.",
    });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-surface relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-brand opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-primary opacity-15 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/60 backdrop-blur-sm">
        <div className="container max-w-6xl flex items-center justify-between py-5">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="PriceLab by Neflixy"
              className="h-10 w-10 rounded-xl shadow-brand transition-transform group-hover:scale-105"
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">PriceLab</div>
              <div className="text-xs text-muted-foreground">by Neflixy</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#calculator" className="hover:text-foreground transition-colors">Calculator</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Button asChild size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-brand border-0">
            <a href="#calculator">Get a quote <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 container max-w-6xl pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Transparent pricing in seconds
        </span>
        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto">
          Estimate your <span className="text-gradient-brand">website cost</span> instantly
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          PriceLab helps you scope and price your next website in minutes. Pick a type, choose a
          package, add features — get an instant estimate from the Neflixy team.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-brand border-0">
            <a href="#calculator">Start your estimate <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#features">See what's included</a>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 container max-w-6xl py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Zap, title: "Instant estimates", desc: "Configure your project and see live pricing." },
            { icon: Layers, title: "Modular packages", desc: "Starter to Premium — scale as you grow." },
            { icon: ShieldCheck, title: "No surprises", desc: "Transparent breakdown of every feature." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card/40 p-6 shadow-soft">
              <div className="h-10 w-10 rounded-xl bg-gradient-brand shadow-brand flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold tracking-tight">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="relative z-10 container max-w-6xl py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Build your <span className="text-gradient-brand">quote</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Adjust the options below — your estimated price updates in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Configurator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Website type */}
            <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-soft">
              <h3 className="font-semibold mb-4">1. Website type</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {websiteTypes.map((t) => {
                  const active = t.id === typeId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTypeId(t.id)}
                      className={`text-left rounded-xl border p-4 transition-all ${
                        active
                          ? "border-primary bg-primary/10 shadow-brand"
                          : "border-border bg-background/40 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">from €{t.basePrice}</div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{t.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Package */}
            <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-soft">
              <h3 className="font-semibold mb-4">2. Package</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {packages.map((p) => {
                  const active = p.id === packageId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPackageId(p.id)}
                      className={`text-left rounded-xl border p-4 transition-all ${
                        active
                          ? "border-primary bg-primary/10 shadow-brand"
                          : "border-border bg-background/40 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">×{p.multiplier}</div>
                      </div>
                      <ul className="space-y-1.5">
                        {p.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-soft">
              <h3 className="font-semibold mb-4">3. Additional features</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {features.map((f) => {
                  const active = selectedFeatures.includes(f.id);
                  return (
                    <label
                      key={f.id}
                      className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 cursor-pointer transition-all ${
                        active
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background/40 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={active}
                          onCheckedChange={() => toggleFeature(f.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="text-sm">{f.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">+€{f.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary + form */}
          <aside className="lg:sticky lg:top-6 h-fit space-y-6" id="contact">
            <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-soft">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Estimated price
              </div>
              <div className="mt-2 text-5xl font-bold tracking-tight text-gradient-brand">
                €{price.toLocaleString()}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Final price may vary based on project specifics.
              </p>

              <div className="mt-5 space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>{selectedType.name}</span>
                  <span>€{selectedType.basePrice}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{selectedPackage.name} package</span>
                  <span>×{selectedPackage.multiplier}</span>
                </div>
                {selectedFeatures.length > 0 && (
                  <div className="pt-2 border-t border-border space-y-1.5">
                    {features
                      .filter((f) => selectedFeatures.includes(f.id))
                      .map((f) => (
                        <div key={f.id} className="flex justify-between text-muted-foreground text-xs">
                          <span>{f.name}</span>
                          <span>+€{f.price}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card/80 p-6 shadow-soft space-y-4"
            >
              <h3 className="font-semibold">Request your quote</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-xs">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs">Phone (optional)</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+371 ..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-xs">Message</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us a bit about your project..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-brand border-0"
              >
                {submitting ? "Sending..." : (
                  <>Send request <Send className="ml-1 h-4 w-4" /></>
                )}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                By submitting, you agree to our{" "}
                <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
              </p>
            </form>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 mt-12">
        <div className="container max-w-6xl py-10 grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-8 w-8 rounded-lg shadow-brand" />
              <div>
                <div className="font-semibold">PriceLab</div>
                <div className="text-xs text-muted-foreground">by Neflixy</div>
              </div>
            </div>
            <p className="mt-3 text-muted-foreground text-xs">
              © {new Date().getFullYear()} Neflixy. All rights reserved.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Contact</div>
            <a href="mailto:neflixyteam@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" /> neflixyteam@gmail.com
            </a>
            <a href="tel:+37125610853" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mt-1">
              <Phone className="h-4 w-4" /> +371 25 610 853
            </a>
            <a href="tel:+37126212014" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mt-1">
              <Phone className="h-4 w-4" /> +371 26 212 014
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Legal</div>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
