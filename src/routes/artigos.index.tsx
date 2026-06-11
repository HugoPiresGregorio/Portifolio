import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Clock, Tag, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { articles } from "../lib/portfolio-data";
import { SectionTitle } from "../components/SectionTitle";

export const Route = createFileRoute("/artigos/")({
  head: () => ({
    meta: [
      { title: "Artigos — Hugo.dev" },
      { name: "description", content: "Reflexões e tutoriais sobre desenvolvimento web, React, TypeScript, carreira e tecnologia." },
      { property: "og:title", content: "Artigos — Hugo.dev" },
      { property: "og:description", content: "Reflexões e tutoriais sobre desenvolvimento web." },
      { property: "og:url", content: "/artigos" },
    ],
    links: [{ rel: "canonical", href: "/artigos" }],
  }),
  component: ArticlesPage,
});

const cats = ["Todas", "JavaScript", "React", "Desenvolvimento Web", "Carreira", "Tecnologia", "IA"] as const;

function ArticlesPage() {
  const [active, setActive] = useState<(typeof cats)[number]>("Todas");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      articles.filter((a) => {
        const okCat = active === "Todas" || a.category === active;
        const okQ = !q || (a.title + a.excerpt + a.tags.join(" ")).toLowerCase().includes(q.toLowerCase());
        return okCat && okQ;
      }),
    [active, q],
  );

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionTitle kicker="artigos.mdx" title="Pensamentos & tutoriais">
        Sobre código, design, carreira e o que mais me interessa naquela semana.
      </SectionTitle>

      <div className="flex flex-col gap-4 mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar artigo..."
            className="w-full h-11 pl-10 pr-4 rounded-md bg-card/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono border transition ${
                active === c ? "bg-secondary text-secondary-foreground border-secondary" : "border-border hover:border-secondary/50 hover:text-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {list.map((a, i) => (
          <motion.article
            key={a.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to="/artigos/$slug"
              params={{ slug: a.slug }}
              className="group block glass-card rounded-xl p-6 hover:border-primary/50 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-2">
                <time>{new Date(a.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</time>
                <span className="size-1 rounded-full bg-muted-foreground" />
                <span className="flex items-center gap-1"><Clock className="size-3" /> {a.readTime}</span>
                <span className="size-1 rounded-full bg-muted-foreground" />
                <span className="text-primary">{a.category}</span>
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20">
                      <Tag className="size-2.5" />{t}
                    </span>
                  ))}
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </motion.article>
        ))}
        {list.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">
            $ grep "{q}" → no articles found
          </div>
        )}
      </div>
    </section>
  );
}
