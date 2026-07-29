import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Check, Send, Mail } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://formsubmit.co/ajax/jacopo.dev0@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New message from ${form.name}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please email me directly at jacopo.dev0@gmail.com.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section id="contact" className="relative px-6 py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.5 0.13 48 / 18%), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="eyebrow">Contact</div>
          <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Let's talk <span className="text-gradient-brand">about your project.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-muted-foreground">
            Two lines about what you need is enough to start. Every message gets a real
            answer within 24 hours — no bots, no templates.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border p-6">
          <p className="font-display text-lg leading-relaxed text-foreground/90">
            “Cayn understood what we needed before we could explain it. The site was
            online in days and we finally get order requests by email instead of
            chasing messages.”
          </p>
          <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
            Occhiomininno Agritourism · Ruvo di Puglia
          </div>
        </div>


        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-liquid relative mt-12 overflow-hidden rounded-2xl p-6 sm:p-10"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.6 0.13 48 / 18%), transparent 70%)" }}
          />

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
                    label="Name"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder="Your name"
                    maxLength={100}
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    placeholder="you@example.com"
                    maxLength={255}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    maxLength={2000}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    className="glass w-full resize-none rounded-2xl px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-ring"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Sending..." : "Send Message"}
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
                  className="glass-liquid flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ boxShadow: "0 0 60px oklch(0.7 0.13 48 / 18%)" }}
                >
                  <Check size={28} className="text-glow-2" />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Thanks for reaching out — I'll get back to you soon at{" "}
                  <a href="mailto:jacopo.dev0@gmail.com" className="text-foreground underline-offset-4 hover:underline">
                    jacopo.dev0@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="glass mt-6 rounded-full px-5 py-2 text-xs text-foreground hover:bg-white/10"
                >
                  Send another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Mail size={12} />
          <a href="mailto:jacopo.dev0@gmail.com" className="hover:text-foreground">
            jacopo.dev0@gmail.com
          </a>
        </div>
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) {
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
        className="glass w-full rounded-2xl px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
