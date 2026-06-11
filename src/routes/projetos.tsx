import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { projects } from "../lib/portfolio-data";
import { SectionTitle } from "../components/SectionTitle";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — Hugo.dev" },
      { name: "description", content: "Seleção de projetos pessoais e profissionais de Hugo: frontend, backend, full stack e estudos." },
      { property: "og:title", content: "Projetos — Hugo.dev" },
      { property: "og:description", content: "Seleção de projetos pessoais e profissionais." },
      { property: "og:url", content: "/projetos" },
    ],
    links: [{ rel: "canonical", href: "/projetos" }],
  }),
  component: ProjectsPage,
});

const filters = ["Todos", "Frontend", "Backend", "Full Stack", "Estudos"] as const;

function ProjectsPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("Todos");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<(typeof projects)[number] | null>(null);

  const list = useMemo(() => {
    return projects.filter((p) => {
      const okCat = active === "Todos" || p.category === active;
      const okQ = !q || (p.name + p.description + p.tech.join(" ")).toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    });
  }, [active, q]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <SectionTitle kicker="projetos.tsx" title="Coisas que construí">
        Cada projeto é um experimento ou um problema real que decidi resolver.
      </SectionTitle>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, descrição ou tecnologia..."
            className="w-full h-11 pl-10 pr-4 rounded-md bg-card/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3 py-2 rounded-md text-sm font-mono border transition-all ${
                active === f
                  ? "bg-primary text-primary-foreground border-primary glow-ring"
                  : "border-border hover:border-primary/50 hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -4 }}
              onClick={() => setOpen(p)}
              className="group cursor-pointer glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-background/80 backdrop-blur border border-primary/30 text-primary">
                  {p.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 text-muted-foreground">+{p.tech.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <div className="text-center py-20 text-muted-foreground font-mono text-sm">
          $ grep "{q}" → no matches
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md grid place-items-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl glass-card rounded-2xl overflow-hidden my-8"
            >
              <div className="relative aspect-video">
                <img src={open.image} alt={open.name} className="size-full object-cover" />
                <button
                  onClick={() => setOpen(null)}
                  className="absolute top-3 right-3 size-9 grid place-items-center rounded-full bg-background/80 backdrop-blur border border-border hover:text-primary"
                  aria-label="Fechar"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="font-mono text-xs text-primary">{open.category}</div>
                <h3 className="mt-1 text-2xl font-bold">{open.name}</h3>
                <p className="mt-3 text-muted-foreground">{open.long}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {open.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a href={open.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:border-primary hover:text-primary text-sm transition">
                    <Github className="size-4" /> Código
                  </a>
                  <a href={open.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground glow-ring text-sm hover:opacity-90 transition">
                    <ExternalLink className="size-4" /> Ver demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
