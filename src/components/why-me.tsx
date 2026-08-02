import { motion } from "framer-motion";
import { Timer, MessagesSquare, Receipt, Cpu, Search, Smartphone } from "lucide-react";

const POINTS = [
  {
    icon: Timer,
    title: "Consegna rapida",
    desc: "Un sito vetrina online in 1–2 settimane, con revisioni incluse e nessuna attesa infinita.",
  },
  {
    icon: MessagesSquare,
    title: "Comunicazione diretta",
    desc: "Parli sempre con chi realizza il sito: nessuna agenzia di mezzo, nessun ticket.",
  },
  {
    icon: Receipt,
    title: "Prezzi trasparenti",
    desc: "Preventivo chiaro prima di iniziare, senza costi nascosti o canoni a sorpresa.",
  },
  {
    icon: Cpu,
    title: "Tecnologie moderne",
    desc: "React, TypeScript e Tailwind: siti veloci, sicuri e facili da far crescere nel tempo.",
  },
  {
    icon: Search,
    title: "SEO inclusa",
    desc: "Struttura, metadati e dati strutturati curati dal primo giorno per farti trovare su Google.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    desc: "Il tuo sito è perfetto su smartphone, dove arriva la maggior parte dei tuoi clienti.",
  },
];

export function WhyMe() {
  return (
    <section id="why-me" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="eyebrow mx-auto mb-5">Perché scegliermi</div>
          <h2 className="font-display text-4xl leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Un partner unico per la </span>
            <span className="text-gradient-brand italic">creazione del tuo sito web.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            Sviluppatore e web designer freelance: realizzo siti web aziendali,
            landing page ed e-commerce per aziende e attività che vogliono crescere online.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="glass-liquid liquid-sheen hover-lift rounded-3xl p-7"
            >
              <div className="glass flex h-11 w-11 items-center justify-center rounded-2xl">
                <p.icon size={18} style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="mt-5 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-liquid mt-8 flex flex-col items-center gap-5 rounded-[32px] p-10 text-center"
        >
          <h3 className="font-display text-2xl sm:text-3xl">
            <span className="text-gradient">Hai un progetto in mente? </span>
            <span className="text-gradient-brand italic">Richiedi un preventivo gratuito.</span>
          </h3>
          <p className="max-w-lg text-sm text-muted-foreground">
            Raccontami la tua attività: ti rispondo con una proposta chiara su tempi, costi e
            risultati attesi.
          </p>
          <a
            href="#contact"
            className="liquid-sheen inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            Richiedi un preventivo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
