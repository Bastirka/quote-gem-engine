import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { buildQuotePayload, buildTelegramMessage } from "@/utils/buildQuotePayload";
import { calculateBreakdown, type CalculatorState } from "@/utils/calculatePrice";
import { formatCurrency, formatRange } from "@/utils/formatCurrency";
import type { Translations, Lang } from "@/i18n/translations";
import { getPackage } from "@/data/packages";

const schema = z.object({
  name: z.string().trim().max(100).optional(),
  phone: z.string().trim().max(50).optional(),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional(),
});

interface QuoteRequestFormProps {
  state: CalculatorState;
  tr: Translations;
  lang: Lang;
}

type Status = "idle" | "sending" | "success" | "error";

export const QuoteRequestForm = ({ state, tr, lang }: QuoteRequestFormProps) => {
  const breakdown = calculateBreakdown(state);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const parsed = schema.safeParse({ name, phone, email, message });
    if (!parsed.success) {
      setStatus("error");
      setErrorMsg(parsed.error.errors[0]?.message ?? "Invalid input");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setStatus("error");
      setErrorMsg(tr.quote.errorContact);
      return;
    }

    setStatus("sending");

    const goalLabel = tr.calc.goals.find((g) => g.id === state.goalId)?.label ?? null;
    const sectionLabels = (state.sectionIds ?? [])
      .map((id) => tr.calc.sectionList.find((s) => s.id === id)?.label)
      .filter((x): x is string => !!x);

    const payload = buildQuotePayload(
      { name: name.trim(), phone: phone.trim(), email: email.trim(), message: message.trim() },
      state,
      breakdown,
      goalLabel,
      sectionLabels,
    );
    const telegramText = buildTelegramMessage(payload);

    try {
      // Try Lovable Cloud edge function first (works in preview & production)
      const { data, error } = await supabase.functions.invoke("quote-request", {
        body: { contact: payload.contact, telegramText },
      });

      if (error || (data && (data as { error?: string }).error)) {
        // Fallback: try Vercel API route (works after Vercel deploy)
        const res = await fetch("/api/quote-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contact: payload.contact, telegramText }),
        });
        if (!res.ok) throw new Error("Both backends failed");
      }
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(tr.quote.errorGeneric);
    }
  };

  const NS = tr.calc.notSpecified;
  const wt = breakdown.websiteType;
  const pkg = getPackage(state.packageId);

  return (
    <section id="request-offer" className="scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-brand">{tr.quote.title}</h2>
        <p className="text-muted-foreground mt-3">{tr.quote.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glow-card p-6 sm:p-7 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={tr.quote.name}>
              <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="Jānis Bērziņš" />
            </Field>
            <Field label={tr.quote.phone}>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={50}
                placeholder="+371 ..."
                inputMode="tel"
              />
            </Field>
          </div>
          <Field label={tr.quote.email}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              placeholder="jus@example.com"
            />
          </Field>
          <Field label={tr.quote.message}>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={2000}
              rows={4}
              placeholder="…"
            />
          </Field>

          {status === "error" && (
            <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive-foreground">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {status === "success" && (
            <div className="flex items-start gap-2 rounded-xl border border-success/40 bg-success/10 px-3 py-2.5 text-sm">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-success" />
              <span>{tr.quote.success}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-brand border-0 h-11"
          >
            <Send className="h-4 w-4" />
            {status === "sending" ? tr.quote.sending : tr.quote.submit}
          </Button>

          <p className="text-[11px] text-muted-foreground text-center">
            {lang === "lv" ? "Nosūtot pieprasījumu, jūs piekrītat mūsu " : "By submitting you agree to our "}
            <Link to="/privacy-policy" className="underline hover:text-foreground">
              {tr.footer.privacy}
            </Link>
            .
          </p>
        </motion.form>

        <aside className="glow-card p-6 space-y-3 h-fit">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{tr.quote.summaryTitle}</div>
          <SumRow label={tr.quote.offerType} value={state.recommendedSelectedId ? `Rekomendētais ${pkg?.name ?? ""}` : "Custom kalkulators"} />
          <SumRow label={tr.quote.websiteType} value={wt ? (lang === "lv" ? wt.label_lv : wt.label_en) : NS} />
          <SumRow label={tr.quote.packageL} value={pkg?.name ?? NS} />
          <SumRow label={tr.quote.market} value={breakdown.marketMin ? formatRange(breakdown.marketMin, breakdown.marketMax) : NS} />
          <div className="border-t border-white/10 pt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{tr.quote.finalPrice}</span>
            <span className="text-2xl font-display font-bold tabular-nums text-gradient-brand">
              {formatCurrency(breakdown.finalPrice)}
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
    {children}
  </label>
);

const SumRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground text-right">{value}</span>
  </div>
);
