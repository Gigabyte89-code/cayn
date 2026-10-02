import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { useT } from "@/lib/i18n";

export function Contact() {
  const d = useT();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  // Antispam: honeypot invisibile + tempo minimo di compilazione.
  const [honeypot, setHoneypot] = useState("");
  const mountTime = useRef(Date.now());

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);

    // Bot: campo honeypot compilato o invio troppo veloce (< 2s).
    if (honeypot || Date.now() - mountTime.current < 2000) {
      // Simula un invio riuscito per non dare feedback ai bot.
      setSent(true);
      return;
    }


    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(d.contact.missingFields);
      return;
    }

    if (!form.email.includes("@")) {
      setEmailError(d.contact.emailMissingAt);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/jacopo.dev0@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: d.contact.subject(form.name),
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError(d.contact.error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section id="contact" className="relative px-6 py-28 sm:py-36">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 border-t border-border pt-6 lg:grid-cols-[minmax(0,.75fr)_minmax(32rem,1.25fr)] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="label-mono mb-6 flex items-center gap-3"><span className="index-num">01</span>{d.contact.eyebrow}</div>
          <h2 className="font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{d.contact.title1}</span>
            <span className="text-gradient-brand italic">{d.contact.title2}</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            {d.contact.lead}
          </p>
          <div className="mt-10 border-t border-border pt-5">
            <div className="label-mono mb-2">Email</div>
            <a href="mailto:jacopo.dev0@gmail.com" className="text-sm text-foreground transition-colors hover:text-accent">jacopo.dev0@gmail.com</a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          noValidate
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative border-t border-border pt-8"
        >
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label={d.contact.name}
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder={d.contact.namePlaceholder}
                    maxLength={100}
                  />
                  <Field
                    label={d.contact.email}
                    type="email"
                    value={form.email}
                    onChange={(v) => {
                      setForm((f) => ({ ...f, email: v }));
                      if (v.includes("@")) setEmailError(null);
                    }}
                    placeholder={d.contact.emailPlaceholder}
                    maxLength={255}
                    error={emailError}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {d.contact.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    maxLength={2000}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={d.contact.messagePlaceholder}
                    className="form-field min-h-40 w-full resize-none px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                  />
                </div>

                {/* Honeypot antispam: invisibile agli utenti, compilato solo dai bot */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-solid liquid-sheen group w-full justify-center px-7 py-3.5 text-sm disabled:opacity-60 sm:w-auto"
                >
                  {loading ? d.contact.sending : d.contact.send}
                  <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                {error && (
                  <p className="text-xs text-destructive">{error}</p>
                )}
              </motion.div>

            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex flex-col items-center py-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="success-mark flex h-16 w-16 items-center justify-center rounded-full"
                >
                  <Check size={28} className="text-glow-2" />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl italic">{d.contact.successTitle}</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  {d.contact.successBody1}{" "}
                  <a href="mailto:jacopo.dev0@gmail.com" className="text-foreground underline-offset-4 hover:underline">
                    jacopo.dev0@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", message: "" });
                    setEmailError(null);
                    setError(null);
                    setHoneypot("");
                    mountTime.current = Date.now();
                  }}
                  className="btn-outline mt-6 px-5 py-2 text-xs"
                >
                  {d.contact.another}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  error?: string | null;
}) {
  const errorId = error ? `field-${type}-error` : undefined;

  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className="form-field w-full px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent aria-invalid:border-destructive"
      />
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
