import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Code2, Sparkles, Cpu, Palette, GitBranch, Rocket } from "lucide-react";
import { ParticleField } from "../components/ParticleField";
import { TerminalCard } from "../components/TerminalCard";
import { SectionTitle } from "../components/SectionTitle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hugo.dev — Desenvolvedor Web" },
      { name: "description", content: "Olá, eu sou Hugo. Desenvolvedor Web apaixonado por criar experiências digitais modernas, rápidas e funcionais." },
      { property: "og:title", content: "Hugo.dev — Desenvolvedor Web" },
      { property: "og:description", content: "Transformando ideias em produtos digitais modernos, rápidos e funcionais." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const skills = {
  Frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  Backend: ["Node.js", "APIs REST", "PostgreSQL", "Prisma"],
  Ferramentas: ["Git", "GitHub", "Figma", "VS Code"],
};

const timeline = [
  { year: "2015", title: "Primeira linha de código", desc: "Comecei codando os meus primeiros jogos." },
  { year: "2022", title: "Descobrir que posso trabalhar mundando o mundo", desc: "Entrei na faculdade (Ciência da Computação)." },
  { year: "2023", title: "Full-stack com Node.js", desc: "Aprendi a desenhar APIs e modelar dados." },
  { year: "2025", title: "Foco em produto e UX", desc: "Hoje busco unir engenharia, design e impacto." },
];

const traits = [
  { icon: Sparkles, t: "Curioso", d: "Sempre experimentando uma stack ou ideia nova." },
  { icon: Palette, t: "Olho para UX/UI", d: "Acredito que detalhes mudam tudo." },
  { icon: Code2, t: "Código limpo", d: "Manutenibilidade é amor pelo próximo dev." },
  { icon: Rocket, t: "Builder", d: "Adoro tirar projetos pessoais do papel." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0"><ParticleField /></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero)" }} />

        <motion.pre
          aria-hidden
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 0.45, x: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="hidden lg:block absolute top-24 right-8 font-mono text-[11px] leading-relaxed text-primary/60 animate-float select-none"
        >
{`function Hugo() {
  return (
    <Developer
      curious
      caffeinated
      shipping
    />
  );
}`}
        </motion.pre>

        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center w-full">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs"
            >
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              Disponível para novos projetos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
            >
              Olá, eu sou <span className="text-gradient">Hugo</span>.<br />
              Desenvolvedor Web apaixonado por criar{" "}
              <span className="relative">
                <span className="text-gradient">experiências digitais</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl"
            >
              Transformando ideias em produtos digitais modernos, rápidos e funcionais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/projetos"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-ring hover:opacity-95 transition"
              >
                Ver Projetos
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-5 py-3 text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                <Mail className="size-4" />
                Entrar em Contato
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6 text-xs font-mono text-muted-foreground"
            >
              <div className="flex items-center gap-2"><Cpu className="size-3.5 text-primary" /> 5+ anos codando</div>
              <div className="flex items-center gap-2"><GitBranch className="size-3.5 text-success" /> 30+ commits/mês</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <TerminalCard />
          </motion.div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="relative max-w-6xl mx-auto px-6 py-24">
        <SectionTitle kicker="sobre.md" title="Um pouco sobre mim">
          Engenharia de software com olhar de produto. Eu construo coisas que gosto de usar.
        </SectionTitle>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
            <p>
              Sou um <span className="text-foreground">desenvolvedor web</span> movido por curiosidade.
              Comecei codando desde pequeno, criando soluções para os problemas do cotidiano, e não parei mais.
            </p>
            <p>
              Hoje trabalho com <span className="text-primary">React</span>, <span className="text-primary">Next.js</span> e <span className="text-primary">Node.js</span>,
              mas o que realmente me move é a interseção entre <span className="text-secondary">design</span> e <span className="text-secondary">engenharia</span>:
              transformar requisitos confusos em interfaces claras e código manutenível.
            </p>
            <p>
              Acredito em código limpo, documentação honesta e em mandar pra produção sem drama.
              Nas horas vagas, leio e estudo sobre novas tecnologias, sistemas distribuídos e... mais código.
            </p>

            <div className="pt-4 grid sm:grid-cols-2 gap-3">
              {traits.map((tr) => (
                <div key={tr.t} className="glass-card rounded-lg p-4 hover:-translate-y-0.5 hover:border-primary/40 transition">
                  <tr.icon className="size-5 text-primary mb-2" />
                  <div className="font-medium text-foreground">{tr.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{tr.d}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-success" />
            {timeline.map((it, i) => (
              <motion.div
                key={it.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pb-8 last:pb-0"
              >
                <span className="absolute -left-[18px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="font-mono text-xs text-primary">{it.year}</div>
                <div className="mt-1 font-semibold">{it.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{it.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="relative max-w-6xl mx-auto px-6 py-24">
        <SectionTitle kicker="skills.json" title="Stack & ferramentas">
          O kit que uso para construir produtos do conceito ao deploy.
        </SectionTitle>

        <div className="grid md:grid-cols-3 gap-5">
          {Object.entries(skills).map(([group, items], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mb-4">
                <span className="text-primary">▸</span> {group.toLowerCase()}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 text-sm rounded-md border border-border bg-background/40 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5 transition-all cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl glass-card p-10 md:p-14 text-center"
        >
          <div className="absolute inset-0 -z-0 opacity-50" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative">
            <div className="font-mono text-xs text-primary mb-3">$ ./let-s-build.sh</div>
            <h3 className="text-3xl md:text-4xl font-bold">Tem uma ideia? <span className="text-gradient">Vamos construir.</span></h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Estou aberto para projetos freelance, colaborações e oportunidades full-time.
            </p>
            <Link
              to="/contato"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground glow-ring hover:opacity-95 transition"
            >
              Iniciar conversa <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
