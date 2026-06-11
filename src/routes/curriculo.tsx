import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award, Code2, Mail, MapPin } from "lucide-react";
import { SectionTitle } from "../components/SectionTitle";

export const Route = createFileRoute("/curriculo")({
  head: () => ({
    meta: [
      { title: "Currículo — Hugo.dev" },
      { name: "description", content: "Experiências, formação, certificações e habilidades de Hugo, desenvolvedor web." },
      { property: "og:title", content: "Currículo — Hugo.dev" },
      { property: "og:description", content: "Experiências, formação e habilidades." },
      { property: "og:url", content: "/curriculo" },
    ],
    links: [{ rel: "canonical", href: "/curriculo" }],
  }),
  component: ResumePage,
});

const experiences = [
  { period: "2021 — Atual", role: "Full Stack Developer", company: "Pessoal", desc: "Construção de aplicações web modernas com React, TypeScript e Node.js, ou como de preferência do cliente." },
];

const formacao = [
  { period: "2022 — 2026", title: "Bacharelado em Ciência da Computação", place: "Anhembi Morumbi" },
  { period: "2026", title: "Bootcamp FullStack", place: "Soulcode" },
  { period: "2021 - 2023", title: "Ingês Avançado", place: "MicroCamp" },
];

const certs = ["Html, Css e JavaScript", "Lógica de programação", "React", "Node.js", "TypeScript", "SQL", "Python"];

const habs = {
  Linguagens: ["TypeScript", "JavaScript", "SQL", "Python"],
  Frameworks: ["React", "Next.js", "Node.js", "Tailwind"],
  Outros: ["Git", "Docker", "AWS", "PostgreSQL", "Redis"],
};

function ResumePage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <SectionTitle kicker="curriculum.json" title="Currículo profissional">
        Uma visão estilo dashboard da minha jornada — sem fluff, só sinal.
      </SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 md:p-10 mb-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-primary mb-1">// resumo profissional</div>
            <h2 className="text-3xl font-bold">Hugo <span className="text-gradient">.dev</span></h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Desenvolvedor full-stack com 5+ anos de experiência construindo produtos web modernos.
              Foco em React, TypeScript, Node.js e DX impecável.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="size-3" /> Brasil, SP — remoto global</span>
              <span className="flex items-center gap-1"><Mail className="size-3" /> hug0.d3v@gmail.com</span>
            </div>
          </div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.print(); }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground glow-ring hover:opacity-95 text-sm font-medium transition"
          >
            <Download className="size-4" /> Baixar PDF
          </a>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Anos de XP", value: "5+", icon: Code2 },
          { label: "Projetos entregues", value: "40+", icon: Briefcase },
          { label: "Certificações", value: certs.length.toString(), icon: Award },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-muted-foreground">{s.label}</div>
              <div className="text-3xl font-bold text-gradient mt-1">{s.value}</div>
            </div>
            <s.icon className="size-8 text-primary/60" />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div>
          <h3 className="flex items-center gap-2 font-mono text-sm text-primary mb-5">
            <Briefcase className="size-4" /> experiência.timeline
          </h3>
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-primary/40" />
            {experiences.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pb-8 last:pb-0"
              >
                <span className="absolute -left-[18px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="font-mono text-xs text-muted-foreground">{e.period}</div>
                <div className="mt-1 font-semibold">{e.role}</div>
                <div className="text-sm text-primary">{e.company}</div>
                <div className="mt-1 text-sm text-muted-foreground">{e.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="flex items-center gap-2 font-mono text-sm text-success mb-5">
              <GraduationCap className="size-4" /> formacao[]
            </h3>
            <div className="space-y-4">
              {formacao.map((f, i) => (
                <div key={i} className="glass-card rounded-lg p-4">
                  <div className="font-mono text-xs text-muted-foreground">{f.period}</div>
                  <div className="font-semibold mt-1">{f.title}</div>
                  <div className="text-sm text-muted-foreground">{f.place}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-mono text-sm text-earth mb-5">
              <Award className="size-4" /> certifications[]
            </h3>
            <ul className="space-y-2">
              {certs.map((c) => (
                <li key={c} className="glass-card rounded-lg p-3 text-sm flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-success" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="flex items-center gap-2 font-mono text-sm text-secondary mb-5">
          <Code2 className="size-4" /> habilidades.json
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(habs).map(([k, items]) => (
            <div key={k} className="glass-card rounded-xl p-5">
              <div className="font-mono text-xs text-muted-foreground mb-3">"{k.toLowerCase()}": [</div>
              <div className="flex flex-wrap gap-2 pl-3">
                {items.map((it) => (
                  <span key={it} className="px-2.5 py-1 text-xs rounded border border-border bg-background/40 hover:border-primary hover:text-primary transition">
                    "{it}"
                  </span>
                ))}
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-3">]</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
