import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { SectionTitle } from "../components/SectionTitle";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Hugo.dev" },
      { name: "description", content: "Entre em contato com Hugo para projetos freelance, colaborações ou oportunidades." },
      { property: "og:title", content: "Contato — Hugo.dev" },
      { property: "og:description", content: "Vamos construir algo juntos?" },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  subject: z.string().trim().min(3, "Mínimo 3 caracteres").max(150),
  message: z.string().trim().min(10, "Conte um pouco mais").max(1000),
});

type Errs = Partial<Record<keyof z.infer<typeof schema>, string>>;

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const ne: Errs = {};
      r.error.issues.forEach((i) => (ne[i.path[0] as keyof Errs] = i.message));
      setErrs(ne);
      return;
    }
    setErrs({});
    setState("sending");
    await new Promise((res) => setTimeout(res, 1200));
    setState("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setState("idle"), 4000);
  };

  const field = (k: keyof typeof form, label: string, type = "text", textarea = false) => (
    <div>
      <label className="font-mono text-xs text-muted-foreground">
        <span className="text-primary">{">"}</span> {label}
      </label>
      {textarea ? (
        <textarea
          rows={5}
          value={form[k]}
          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          className={`mt-1.5 w-full px-4 py-3 rounded-md bg-card/50 border ${
            errs[k] ? "border-destructive" : "border-border focus:border-primary"
          } focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm`}
        />
      ) : (
        <input
          type={type}
          value={form[k]}
          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          className={`mt-1.5 w-full h-11 px-4 rounded-md bg-card/50 border ${
            errs[k] ? "border-destructive" : "border-border focus:border-primary"
          } focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm`}
        />
      )}
      {errs[k] && <div className="mt-1 text-xs text-destructive font-mono">! {errs[k]}</div>}
    </div>
  );

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <SectionTitle kicker="contato.sh" title="Vamos conversar">
        Projetos, colaborações ou só uma boa conversa sobre tech — fico feliz em responder.
      </SectionTitle>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 md:p-8 space-y-5"
        >
          {field("name", "nome")}
          {field("email", "email", "email")}
          {field("subject", "assunto")}
          {field("message", "mensagem", "text", true)}

          <button
            type="submit"
            disabled={state !== "idle"}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground glow-ring hover:opacity-95 transition disabled:opacity-70 text-sm font-medium"
          >
            {state === "sending" && (<><Loader2 className="size-4 animate-spin" /> Enviando...</>)}
            {state === "sent" && (<><Check className="size-4" /> Mensagem enviada!</>)}
            {state === "idle" && (<><Send className="size-4" /> Enviar mensagem</>)}
          </button>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="glass-card rounded-xl p-5">
            <div className="font-mono text-xs text-primary mb-3">// canais diretos</div>
            <div className="space-y-3">
              {[
                { icon: Mail, label: "hug0.d3v@gmail.com", href: "mailto:hug0.d3v@gmail.com" },
                { icon: Github, label: "github.com/HugoPiresGregorio", href: "https://github.com/HugoPiresGregorio" },
                { icon: Linkedin, label: "linkedin.com/in/hugo-pires-gregorio", href: "https://www.linkedin.com/in/hugo-pires-gregorio/" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-primary hover:bg-primary/5 group transition"
                >
                  <span className="size-9 grid place-items-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <c.icon className="size-4" />
                  </span>
                  <span className="font-mono text-sm truncate">{c.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-5">
            <div className="font-mono text-xs text-muted-foreground space-y-1.5">
              <div><span className="text-primary">$</span> ping hugo.dev</div>
              <div className="pl-3">64 bytes from hugo: time=0.5ms</div>
              <div className="pl-3 text-success">✓ online — geralmente respondo em até 24h</div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
