import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const CHANNELS = [
  { label: "Email", value: "jacopo.dev0@gmail.com", href: "mailto:jacopo.dev0@gmail.com" },
  { label: "Response time", value: "Within 24 hours", href: null },
  { label: "Working with", value: "Founders & small businesses", href: null },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
      setError("Something went wrong — please email me directly at jacopo.dev0@gmail.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
          <div>
            <div className="eyebrow">Contact</div>
            <h2 className="mt-5 max-w-[20ch] text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.08]">
              Tell me the problem in two lines.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.75] text-muted-foreground">
              You get an honest answer — scope, timing, and whether I'm the right person
              for it. No sales sequence, no template reply.
            </p>

            <dl className="mt-10 border-t border-border">
              {CHANNELS.map((c) => (
                <div
                  key={c.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-4"
                >
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {c.label}
                  </dt>
                  <dd className="text-right text-[14px] text-foreground">
                    {c.href ? (
                      <a
                        href={c.href}
                        className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                      >
                        {c.value}
                        <ArrowUpRight
                          size={13}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    ) : (
                      c.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <figure className="mt-10 border-l border-accent pl-5">
              <blockquote className="text-[14.5px] leading-[1.75] text-foreground/85">
                “Cayn understood what we needed before we could explain it. The site was
                online in days and order requests now arrive by email instead of getting
                lost in messages.”
              </blockquote>
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Occhiomininno Agritourism · Ruvo di Puglia
              </figcaption>
            </figure>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="surface p-6 sm:p-9"
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field
                      id="name"
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      placeholder="Your name"
                      maxLength={100}
                    />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                      placeholder="you@company.com"
                      maxLength={255}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      Project
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      maxLength={2000}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="What are you building, and what's blocking it?"
                      className="w-full resize-none border border-border bg-background px-3.5 py-3 text-[14.5px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 hover:border-border-strong focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex w-full items-center justify-center gap-2 bg-foreground px-6 py-3.5 text-[13.5px] font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60 sm:w-auto"
                  >
                    {loading ? "Sending…" : "Send message"}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  {error && (
                    <p role="alert" className="text-[13px] text-destructive">
                      {error}
                    </p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-10"
                >
                  <div className="flex h-11 w-11 items-center justify-center border border-accent">
                    <Check size={18} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-[22px]">Message sent</h3>
                  <p className="mt-3 max-w-[42ch] text-[14.5px] leading-[1.7] text-muted-foreground">
                    Thanks for reaching out — I'll reply within 24 hours from{" "}
                    <a
                      href="mailto:jacopo.dev0@gmail.com"
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      jacopo.dev0@gmail.com
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="mt-7 border border-border-strong px-4 py-2 text-[13px] transition-colors hover:border-accent hover:text-accent"
                  >
                    Send another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        required
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border bg-background px-3.5 py-3 text-[14.5px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 hover:border-border-strong focus:border-accent"
      />
    </div>
  );
}
