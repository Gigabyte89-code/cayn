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
            "radial-gradient(ellipse at center, oklch(0.5 0.25 300 / 30%), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="eyebrow mx-auto mb-5">Contact</div>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Tell me what you </span>
            <span className="text-gradient-brand italic">need built.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-muted-foreground">
            Two or three lines are enough — what your business does and what the site
            should achieve. I read every message myself and reply with a real timeline
            and a real price, not a brochure.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-liquid relative mt-12 overflow-hidden rounded-[32px] p-6 sm:p-10"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.6 0.25 300 / 60%), transparent 70%)" }}
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
                  {loading ? "Sending..." : "Send it to Cayn"}
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
                  style={{ boxShadow: "0 0 60px oklch(0.7 0.22 300 / 50%)" }}
                >
                  <Check size={28} className="text-glow-2" />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl italic">Got it — thank you.</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Your message is in my inbox and I'll answer it personally, usually
                  within a day. If it is urgent, write me straight at{" "}
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
                  Write another one
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
