import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { articles } from "../lib/portfolio-data";
import { ReadingProgress } from "../components/ReadingProgress";

export const Route = createFileRoute("/artigos/$slug")({
  loader: ({ params }) => {
    const a = articles.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return { article: a };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    return {
      meta: [
        { title: a ? `${a.title} — Hugo.dev` : "Artigo — Hugo.dev" },
        { name: "description", content: a?.excerpt ?? "Artigo no blog técnico de Hugo." },
        { property: "og:title", content: a?.title ?? "Artigo" },
        { property: "og:description", content: a?.excerpt ?? "" },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">Artigo não encontrado</h1>
      <Link to="/artigos" className="mt-4 inline-flex items-center gap-2 text-primary">
        <ArrowLeft className="size-4" /> Voltar para artigos
      </Link>
    </div>
  ),
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  return (
    <>
      <ReadingProgress />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/artigos" className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition">
          <ArrowLeft className="size-4" /> /artigos
        </Link>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="text-primary">{article.category}</span>
            <span className="flex items-center gap-1"><Calendar className="size-3" />{new Date(article.date).toLocaleDateString("pt-BR")}</span>
            <span className="flex items-center gap-1"><Clock className="size-3" />{article.readTime}</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight">{article.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((t: string) => (
              <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-secondary/10 border border-secondary/30 text-secondary">#{t}</span>
            ))}
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 space-y-5 text-foreground/90 leading-relaxed"
        >
          {article.content.split("\n\n").map((block: string, i: number) => {
            if (block.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold mt-10 text-foreground">{block.replace("## ", "")}</h2>;
            }
            return <p key={i}>{block}</p>;
          })}
        </motion.div>
      </article>
    </>
  );
}
